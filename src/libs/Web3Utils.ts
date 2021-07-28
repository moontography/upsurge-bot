// import assert from "assert";
import Web3 from 'web3'

export default function Web3Utils(httpProviderUrl: string) {
  return {
    web3: new Web3(
      new Web3.providers.HttpProvider(httpProviderUrl)
      // new Web3.providers.WebsocketProvider(wsProvUrl, {
      //   reconnect: {
      //     auto: true,
      //     delay: 5000,
      //     maxAttempts: 1e8,
      //   },
      //   clientConfig: {
      //     keepalive: true,
      //     keepaliveInterval: 60000,
      //   },
      // })
    ),

    setPrimaryAddressFromPrivateKey(privateKey: string) {
      const account = this.web3.eth.accounts.privateKeyToAccount(
        `0x${privateKey}`
      )
      this.web3.eth.accounts.wallet.add(account)
      this.web3.eth.defaultAccount = account.address
    },
  }
}
