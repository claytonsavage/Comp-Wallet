const APIKEY = 'onemillionwallets';

const covalent = {
    async getData(address){
        console.log(address)
        const url = new URL(`https://api.covalenthq.com/v1/1/address/${address}/balances_v2`);
        url.search = new URLSearchParams({
            key: APIKEY
        })
        const data = await fetch(url)
        return data.json()
    },

    async getTransactions(address, contract_address){
        const url = new URL(`https://api.covalenthq.com/v1/1/address/${address}/transfers_v2`);
        url.search = new URLSearchParams({
            key: APIKEY,
            "contract-address": contract_address
        })
        const data = await fetch(url)
        return data.json()
    }
}

export default covalent