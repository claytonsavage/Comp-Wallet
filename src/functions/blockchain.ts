class Blockchain {
    web3: any;
    eth: any;
    walletDetails: any = false;
    constructor(web3: any) {
        this.web3 = web3;
    }

    async createAccount() {
        if (!this.walletDetails) {
            const account = await this.web3.eth.accounts.create();
            this.walletDetails = account
        }
    }

    getWalletReceipt() {
        return this.walletDetails
    }

    test() {
        alert('This is a test')
    }
}

export default Blockchain