import assert from 'assert'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import Web3Utils from './libs/Web3Utils'
import Web3SURGE from './libs/Web3SURGE'
import { exponentialBackoff, sleep } from './libs/Utils'
;(async function checkAndUpserge() {
  try {
    const accountPk = process.env.ACCOUNT_PK
    const surgeCont =
      process.env.SURGE_CONTRACT || `0xa15272c90f928da7c420c8b19e528b21ad634eb8`
    assert(accountPk, 'account not provided')
    const bscRpcUrl = `https://bsc-dataseed1.defibit.io/`
    const web3Utils = Web3Utils(bscRpcUrl)
    web3Utils.setPrimaryAddressFromPrivateKey(accountPk)

    const accountToSendTxn = web3Utils.web3.eth.defaultAccount
    const contract = Web3SURGE(web3Utils.web3, surgeCont)

    const [lastCalledUnix, cooldownSeconds] = await Promise.all([
      contract.methods.getLatest().call(),
      contract.methods.getCooldown().call(),
    ])

    let needToWait = true
    while (needToWait) {
      const now = dayjs()
      const minCanCall = dayjs(
        new BigNumber(lastCalledUnix)
          .plus(cooldownSeconds)
          .times(1e3)
          .toNumber()
      )

      if (now.unix() < minCanCall.unix()) {
        // return console.log(
        //   `It's currently ${now.toISOString()} and we can't call upsurge until ${minCanCall.toISOString()}`
        // )
        console.log(
          `Waiting ${
            minCanCall.unix() - now.unix()
          } seconds until we try to upsurge!`
        )
        await sleep(3000)
      } else {
        needToWait = false
      }
    }

    const txnReceipt = await exponentialBackoff(async () => {
      const upsurgeTxn = contract.methods.upsurge()
      const gas = await upsurgeTxn.estimateGas()
      return await upsurgeTxn.send({
        from: accountToSendTxn,
        gas: new BigNumber(gas).times(3).div(2).toNumber(),
      })
    })

    console.log(`Successfully upsurged: (${txnReceipt.transactionHash})`)
  } catch (err) {
    console.error(`Error checking and upserging`, err)
  } finally {
    process.exit()
  }
})()
