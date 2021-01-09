// eslint-disable-next-line no-undef
const Marketplace = artifacts.require('Marketplace');

module.exports = (deployer, network, accounts) => {
    deployer.deploy(Marketplace);
}
