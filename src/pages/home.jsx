import React from 'react';
import Button from '../components/button'
import Form from '../components/form'
import Background from '../components/background'
import CreditCard from '../components/credit-card'
import Blockchain from '../functions/blockchain'
import networks from '../networks.json'
import Web3 from 'web3'
import covalent from '../functions/covalent'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blockchian: undefined,
            testFunction: undefined,
            currency: 'Covalent',
            balance: '0.00',
            ticker: 'SELECT',
            transactions: undefined
        }
        this.displayWallet = this.displayWallet.bind(this)
        this.displayUseExistingWallet = this.displayUseExistingWallet.bind(this)
        this.useExistingWalletFormData = this.useExistingWalletFormData.bind(this)
    }
    componentDidMount() {
        const networkJsonRPC = networks.rinkeby.jsonRpcUrl
        const web3 = new Web3(networkJsonRPC)
        const blockchain = new Blockchain(web3)
        const testFunction = blockchain.test
        const createWalletFunction = blockchain.createAccount.bind(blockchain)
        const getWalletReceiptFunction = blockchain.getWalletReceipt.bind(blockchain)
        this.setState({ blockchain, web3, testFunction, createWalletFunction, getWalletReceiptFunction })
    }

    async displayWallet() {
        const walletReceipt = this.state.getWalletReceiptFunction()
        const {data} = await covalent.getData(walletReceipt.address)
        console.log(data)
        this.setState({ address: walletReceipt.address, privateKey: walletReceipt.privateKey, data })
    }

    displayUseExistingWallet() {
        this.setState({ addingWallet: true, formInputs: 'Wallet Address 0x...' })
    }

    async useExistingWalletFormData(result) {
        console.log(result, 'result')
        this.setState({ address: result, addingWallet: false })
        const {data} = await covalent.getData(result)
        console.log(data)
        this.setState({ data })
    }

    render() {
        const addingWallet = this.state.addingWallet && !this.state.address ? (<div><Form inputs={this.state.formInputs} callback={this.useExistingWalletFormData} /></div>) : undefined
        const createAccount = !this.state.address ? (<div><Button name="Create Card" function={this.state.createWalletFunction} next={this.displayWallet} />
            <Button name="Use Existing Card" function={this.displayUseExistingWallet} /></div>) : undefined
        const creditCard = this.state.address ? <CreditCard currency={this.state.currency} balance={this.state.balance} ticker={this.state.ticker} address={this.state.address} privateKey={this.state.privateKey}/> : undefined
        const items = this.state.data ? this.state.data.items : []
        const transactions = this.state.transactions ? this.state.transactions.data.items : []
        console.log(transactions)
        return (<div>
            <div>
                <div className="nav">
                    <h3>COVALENT CARD</h3>
                </div>
                <div className="create-login">
                    {createAccount}
                    {addingWallet}
                </div>
                <Background />
                <div className="center">
                    {creditCard}
                </div>
                    <h3 className="currency-header" style={{textAlign:'center'}}>Currency</h3>
                <div className="transactions">
                    <br></br>
                    { items.map((currency, index) =>  currency.contract_name ? <li onClick={()=>{ this.setState({balance: parseInt(currency.balance) / Math.pow(10, currency.contract_decimals), currency: currency.contract_name, ticker: currency.contract_ticker_symbol, contractAddress: currency.contract_address}); covalent.getTransactions(this.state.address, currency.contract_address).then((result)=>{this.setState({transactions: result})}) }} key={currency.contract_name + index}><span style={{color: '#f52c8a'}}>{currency.contract_name}</span></li>: undefined ) }
                    <br></br>
                </div>
                    <h3 className="transaction-header" style={{textAlign:'center'}}>Transaction History</h3>
                <div className="currency">
                    { transactions.map((transaction)=> <div><li>Transfer: {transaction.transfers[0].transfer_type}</li><li>Amount: ${transaction.transfers[0].delta_quote}</li><li>Date: {transaction.transfers[0].block_signed_at.split('T')[0]}</li></div> ) }
                </div>
            </div>
        </div>)
    }
}

export default Home