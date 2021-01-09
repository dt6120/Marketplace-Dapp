/* eslint-disable no-undef */
const Marketplace = artifacts.require('Marketplace');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('Marketplace', ([deployer, seller, buyer]) => {
    let marketplace, productCount;

    beforeEach(async () => {
        marketplace = await Marketplace.deployed();
        productCount = await marketplace.productCount();
    });

    describe('deployment', () => {
        it('deploys successfully', async () => {
            const address = await marketplace.address;
            assert.notEqual(address, '0x0');
        });

        it('has a name', async () => {
            const name = await marketplace.name();
            assert.equal(name, 'My Marketplace');
        });
    });

    describe('createProduct()', () => {
        it('creates a product', async () => {
            let result = await marketplace.createProduct('New Product', web3.utils.toWei('1', 'Ether'), { from: seller });
            productCount = await marketplace.productCount();

            assert.equal(productCount.toNumber(), 1);

            const event = result.logs[0].args;

            assert.equal(event.id.toNumber(), productCount);
            assert.equal(event.name, 'New Product');
            assert.equal(event.price, web3.utils.toWei('1', 'Ether'));
            assert.equal(event.owner, seller);
            assert.equal(event.purchased, false);

            await marketplace.createProduct('', '1000', { from: seller }).should.be.rejected;
            await marketplace.createProduct('Test Product', '0', { from: seller }).should.be.rejected;
        });

        it('lists the product', async () => {
            const product = await marketplace.products(productCount);

            assert.equal(product.id.toNumber(), productCount);
            assert.equal(product.name, 'New Product');
            assert.equal(product.price, web3.utils.toWei('1', 'Ether'));
            assert.equal(product.owner, seller);
            assert.equal(product.purchased, false);
        });
    });

    describe('purchaseProduct()', () => {
        it('purchases a product', async () => {
            await marketplace.purchaseProduct(100, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
            await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;

            let oldSellerbalance = new web3.utils.BN(await web3.eth.getBalance(seller));

            result = await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') });

            const event = result.logs[0].args;

            assert.equal(event.id.toNumber(), productCount);
            assert.equal(event.seller, seller);
            assert.equal(event.buyer, buyer);
            assert.equal(event.purchased, true);

            let newSellerBalance = new web3.utils.BN(await web3.eth.getBalance(seller));

            assert.equal(newSellerBalance - oldSellerbalance, web3.utils.toWei('1', 'Ether'));

            await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
        });
    })
})
