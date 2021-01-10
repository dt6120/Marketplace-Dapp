import React, { Component } from 'react';
import Web3 from 'web3';
import Marketplace from '../ethereum/build/Marketplace.json';
import Header from './HeaderComponent';
import Create from './CreateComponent';
import Products from './ListComponent';

class Main extends Component {
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('Non-Ethereum browser detected. Try using MetaMask!');
        }
    }

    async loadBlockchainData() {
        this.setState.loading = true;

        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();

        const marketplaceData = Marketplace.networks[networkId];

        if (marketplaceData) {
            const marketplace = new web3.eth.Contract(Marketplace.abi, marketplaceData.address);
            const productCount = await marketplace.methods.productCount().call();
            this.setState({ marketplace, productCount });

            for (let i=1; i<=this.state.productCount; i++) {
                const product = await marketplace.methods.products(i).call();
                this.setState({ products: [...this.state.products, product] });
            }
        } else {
            window.alert('Contract not deployed on given network!');
        }

        this.setState({ account: accounts[0], loading: false });
    }

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    createProduct(name, price) {
        this.setState({ loading: true });
        
        this.state.marketplace.methods.createProduct(name, price)
            .send({ from: this.state.account })
            .once('receipt', (receipt) => {
                this.setState({ loading: false });
            });
    }

    purchaseProduct(id, price) {
        this.setState({ loading: true });

        this.state.marketplace.methods.purchaseProduct(id)
            .send({ from: this.state.account, value: price })
            .once('receipt', (receipt) => {
                this.setState({ loading: false });
            });
    }

    constructor(props) {
        super(props);

        this.state = {
            account: '0x0',
            marketplace: '',
            productCount: 0,
            products: [],
            loading: true,
        };

        this.createProduct = this.createProduct.bind(this);
        this.purchaseProduct = this.purchaseProduct.bind(this);
    }

    render() {
        let products;

        if (this.state.loading) {
            products = [];
        } else {
            products = this.state.products;
        }
        return (
            <div>
                <Header account={this.state.account} />
                <Create createProduct={this.createProduct} />
                <Products products={products} purchaseProduct={this.purchaseProduct} />
            </div>
        )
    }
}

export default Main;
