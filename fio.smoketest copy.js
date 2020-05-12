require('mocha')
const { expect } = require('chai')
const {FIOSDK } = require('@fioprotocol/FIOSDK')
const fioData = require('./serverResponses');
const fiojs = require("@fioprotocol/fiojs");
const Transactions_2 = require("@fioprotocol/FIOSDK/lib/transactions/Transactions")
let transaction = new Transactions_2.Transactions

// Erics fio utils
const utils = require('./fioutils');
const null_json = {};
fio = new utils.fioUtils();


//import { fiojs } from '@fioprotocol/fiojs'
//Fio.accountHash(publicKey)

fetch = require('node-fetch')

//const fetchJson = async (uri, opts = {}) => {
//  const res = await fetch(uri, opts)
//  return res.json()
//}

const fetchJson = async (uri, opts = {}) => {
  return fetch(uri, opts)
}

/*
 * Set your private/public keys and existing fio Addresses
 */
// Dev environment:
let faucetPrivateKey = '5KF2B21xT5pE5G3LNA6LKJc6AP2pAd2EnfpAUrJH12SFV8NtvCD', 
  faucetPublicKey = 'FIO6zwqqzHQcqCc2MB4jpp1F73MXpisEQe2SDghQFSGQKoAPjvQ3H'
  //actor = qhh25sqpktwh
//const baseUrl = 'http://dev2.fio.dev:8889/v1/'
const baseUrl = 'http://localhost:8889/v1/'

//Testnet environment:
//let faucetPrivateKey = '5JjvapHBQTWnHrWhu99KTQNFGB4NQR1nTDEq1VWnEBuqkgpath4', 
//  faucetPublicKey = 'FIO8BEejqRLamNUnjXpTj1UwefqSbXbCQ25XDtkkxvpaPKMBEVWbv'
  //actor = lxneazklqoit
//const baseUrl = 'http://testnet.fioprotocol.io/v1/'

const mockBaseUrl = ''
const fioTestnetDomain = 'dapix'
const fioTokenCode = 'FIO'
const defaultFee = 50000000000
const randStr = Math.random().toString(26).substr(2, 8)
const happyMnemonic = 'happy health mine over uncover someone gain powder urge slot property ' + randStr
const sadMnemonic = 'sad health mine over uncover someone gain powder urge slot property ' + randStr
const walletMnemonic = 'wallet health mine over uncover someone gain powder urge slot property ' + randStr
const walletUserMnemonic = 'walletuser health mine over uncover someone gain powder urge slot property ' + randStr
const producerMnemonic = 'producer health mine over uncover someone gain powder urge slot property ' + randStr
const smoketestMnemonic = 'test health mine over uncover someone gain powder urge slot property ' + randStr
const ramuserMnemonic = 'test health mine over uncover someone gain powder urge slot property ' + randStr
const exampleMnemonic = 'valley alien library bread worry brother bundle hammer loyal barely dune brave'

let fioTestDomain, fioTestAddress
let happy, sad, smoketest, producer
let block_num_or_id, chain, FEE_register_fio_domain, FEE_register_fio_address, FEE_renew_fio_domain, FEE_renew_fio_address, FEE_add_pub_address
let FEE_transfer_tokens_pub_key, FEE_new_funds_request, FEE_reject_funds_request, FEE_record_obt_data, FEE_set_fio_domain_public
let FEE_register_producer, FEE_register_proxy, FEE_unregister_proxy, FEE_unregister_producer, FEE_proxy_vote, FEE_vote_producer, FEE_add_to_whitelist, FEE_remove_from_whitelist, FEE_submit_bundled_transaction

const generateTestingFioAddress = (customDomain = fioTestnetDomain) => {
  return `testing${Math.random().toString(26).substr(2, 8)}@${customDomain}`
}

const generateTestingFioDomain = () => {
  return `testing-domain-${Math.random().toString(26).substr(2, 8)}`
}

const timeout = async (ms) => {
  await new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

before(async () => {

  
  faucet = new FIOSDK(
    faucetPrivateKey,
    faucetPublicKey,
    baseUrl,
    fetchJson
  )

  await timeout(1000)
  let happyPrivateKeyRes = await FIOSDK.createPrivateKeyMnemonic(happyMnemonic)
  happyPrivateKey = happyPrivateKeyRes.fioKey
  let happyPublicKeyRes = FIOSDK.derivedPublicKey(happyPrivateKey)
  happyPublicKey = happyPublicKeyRes.publicKey

  happy = new FIOSDK(
    happyPrivateKey,
    happyPublicKey,
    baseUrl,
    fetchJson
  )

  await timeout(1000)
  let sadPrivateKeyRes = await FIOSDK.createPrivateKeyMnemonic(sadMnemonic)
  sadPrivateKey = sadPrivateKeyRes.fioKey
  let sadPublicKeyRes = FIOSDK.derivedPublicKey(sadPrivateKey)
  sadPublicKey = sadPublicKeyRes.publicKey

  sad = new FIOSDK(
    sadPrivateKey,
    sadPublicKey,
    baseUrl,
    fetchJson
  )

  await timeout(1000)
  let walletPrivateKeyRes = await FIOSDK.createPrivateKeyMnemonic(walletMnemonic)
  walletPrivateKey = walletPrivateKeyRes.fioKey
  let walletPublicKeyRes = FIOSDK.derivedPublicKey(walletPrivateKey)
  walletPublicKey = walletPublicKeyRes.publicKey

  wallet = new FIOSDK(
    walletPrivateKey,
    walletPublicKey,
    baseUrl,
    fetchJson
  )

  await timeout(1000)
  let walletUserPrivateKeyRes = await FIOSDK.createPrivateKeyMnemonic(walletUserMnemonic)
  walletUserPrivateKey = walletUserPrivateKeyRes.fioKey
  let walletUserPublicKeyRes = FIOSDK.derivedPublicKey(walletUserPrivateKey)
  walletUserPublicKey = walletUserPublicKeyRes.publicKey

  walletUser = new FIOSDK(
    walletUserPrivateKey,
    walletUserPublicKey,
    baseUrl,
    fetchJson
  )

  await timeout(1000)
  let producerPrivateKeyRes = await FIOSDK.createPrivateKeyMnemonic(producerMnemonic)
  producerPrivateKey = producerPrivateKeyRes.fioKey
  let producerPublicKeyRes = FIOSDK.derivedPublicKey(producerPrivateKey)
  producerPublicKey = producerPublicKeyRes.publicKey
  producerAccount = transaction.getActor(producerPublicKey)

  producer = new FIOSDK(
    producerPrivateKey,
    producerPublicKey,
    baseUrl,
    fetchJson
  )

  await timeout(1000)
  let smoketestPrivateKeyRes = await FIOSDK.createPrivateKeyMnemonic(smoketestMnemonic)
  smoketestPrivateKey = smoketestPrivateKeyRes.fioKey
  let smoketestPublicKeyRes = FIOSDK.derivedPublicKey(smoketestPrivateKey)
  smoketestPublicKey = smoketestPublicKeyRes.publicKey
  smoketestAccount = transaction.getActor(smoketestPublicKey)

  smoketest = new FIOSDK(
    smoketestPrivateKey,
    smoketestPublicKey,
    baseUrl,
    fetchJson
  )

  await timeout(1000)
  //ramuserPrivateKey = "5KN6CMXD3b2wLQGqRUWM3PDTfznR6DwosHncefDJkEfeRHz2z7d"
  //ramuserPublicKey = "FIO6jCQ8CnXpDkaw6q4T8H5gCs85jpzGsLyohfzVop2AzkBDUXigj"
  //ramuserAccount = "mesmbcwxayfi"
  
  let ramuserPrivateKeyRes = await FIOSDK.createPrivateKeyMnemonic(ramuserMnemonic)
  ramuserPrivateKey = ramuserPrivateKeyRes.fioKey
  let ramuserPublicKeyRes = FIOSDK.derivedPublicKey(ramuserPrivateKey)
  ramuserPublicKey = ramuserPublicKeyRes.publicKey
  ramuserAccount = transaction.getActor(ramuserPublicKey)

  ramuser = new FIOSDK(
    ramuserPrivateKey,
    ramuserPublicKey,
    baseUrl,
    fetchJson
  )

  await timeout(1000)

})

// NOT NEEDED. CODE ALREADY THERE
describe.only('Test Code', () => {
  fioTestDomain = generateTestingFioDomain()
  fioTestAddress = generateTestingFioAddress(fioTestDomain)

  it(`keytest`, async () => {
    let keytest = FIOSDK.derivedPublicKey('5HwvMtAEd7kwDPtKhZrwA41eRMdFH5AaBKPRim6KxkTXcg5M9L5')
    newkey = keytest.publicKey
    console.log('keytest', newkey)
  })

  it(`get_info via API with fioutils`, async () => {
    let examplerivateKeyRes = await FIOSDK.createPrivateKeyMnemonic(exampleMnemonic)
    examplePrivateKey = examplerivateKeyRes.fioKey
    //console.log('examplePrivateKey: ', examplePrivateKey)
  })

  it(`get_info via API with fioutils`, async () => {
    const result = await fio.callFioApi("get_info", null_json)
    //console.log('eb util get info result: ', result)
  })

  it(`get_info via clio command line with fioutils`, async () => {
    //const result = await fio.runClio("get info")
    const result = await fio.runCmd("../fio.devtools/bin/clio -u http://localhost:8889 get info")
    //console.log('eb util get info command line result: ', result)
  })

  it(`get local directory with fioutils`, async () => {
    const result = await fio.runCmd("ls -la")
    //console.log('test of runCmd ls: ', result)
  })

  it(`get_info`, async () => {
    const result = await transaction.getChainInfo()
    //console.log('result: ', result)
  })

  it(`get_actor`, async () => {
    const result = transaction.getActor(smoketestPublicKey)
    //console.log('result: ', result)
  })
  
  //Transfer funds to test account
  it(`Transfer 400000000000 to smoketestPublicKey`, async () => {
    const result = await faucet.genericAction('transferTokens', {
      payeeFioPublicKey: smoketestPublicKey,
      amount: 400000000000,
      maxFee: defaultFee,
    })
    //console.log('Result: ', result)
    //console.log('happyMnemonic = ' + happyMnemonic)
    //console.log('happyPublicKey = ' + happyPublicKey)
    //console.log('sadMnemonic = ' + sadMnemonic)
    //console.log('sadPublicKey = ' + sadPublicKey)
    //console.log('smoketestPublicKey = ' + smoketestPublicKey)
    //console.log('faucetPublicKey = ' + faucetPublicKey)
    //console.log('happyPrivateKey = ' + happyPrivateKey)
    //console.log('sadPrivateKey = ' + sadPrivateKey)
    //console.log('smoketestPrivateKey = ' + smoketestPrivateKey)
    //console.log('faucetPrivateKey = ' + faucetPrivateKey)
    //console.log('fioTestDomain = ' + fioTestDomain)
    //console.log('fioTestAddress = ' + fioTestAddress)
    expect(result).to.have.all.keys('transaction_id', 'block_num', 'status', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

    //Transfer funds to wallet account
    it(`Transfer 200000000000 to smoketestPublicKey`, async () => {
      const result = await faucet.genericAction('transferTokens', {
        payeeFioPublicKey: walletPublicKey,
        amount: 200000000000,
        maxFee: defaultFee,
      })
      //console.log('Result: ', result)
      expect(result).to.have.all.keys('transaction_id', 'block_num', 'status', 'fee_collected')
      expect(result.status).to.be.a('string')
      expect(result.fee_collected).to.be.a('number')
    })

})

// PORTED
describe('Test Transaction Fees', () => {
  fioFeeTestDomain = generateTestingFioDomain()
  fioFeeTestAddress = generateTestingFioAddress(fioFeeTestDomain)

  it(`Transfer 4000000000000 to smoketestPublicKey`, async () => {
    const result = await faucet.genericAction('transferTokens', {
      payeeFioPublicKey: smoketestPublicKey,
      amount: 4000000000000,
      maxFee: fioData.fees.FEE_transfer_tokens_pub_key
    })
    //console.log('Result: ', result)
    expect(result.status).to.equal('OK')
  })

  it(`Register fee test domain: ${fioFeeTestDomain}`, async () => {
    const result = await smoketest.genericAction('registerFioDomain', { 
      fioDomain: fioFeeTestDomain, 
      maxFee: fioData.api.register_fio_domain.fee,
      //walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result.status).to.equal('OK')
  })

  it(`Register fee test address: ${fioFeeTestAddress}`, async () => {
    const result = await smoketest.genericAction('registerFioAddress', {
      fioAddress: fioFeeTestAddress,
      maxFee: fioData.api.register_fio_address.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result.status).to.equal('OK')
  })
  
  it(`Test all fees`, async () => {
    for (fioEndpoint in fioData.api) {
      //console.log('fioEndpoint: ', fioEndpoint)
      //console.log('bundledEligible: ', fioData.api[fioEndpoint].bundledEligible)
      if (fioData.api[fioEndpoint].bundledEligible) {
        const result = await smoketest.genericAction('getFee', {
          endPoint: fioEndpoint, 
          fioAddress: fioFeeTestAddress,
        })
        //console.log('Returned fee: ', result)
        expect(result.fee).to.equal(0)
      } else {
        const result = await smoketest.genericAction('getFee', {
          endPoint: fioEndpoint,
          fioAddress: ''
        })
        //console.log('Returned fee: ', result)
        expect(result.fee).to.equal(fioData.api[fioEndpoint].fee)
      }
    }
  })
})

// PORTED
describe('Confirming account data', () => {

  it('getFioPublicKey for Happy returns a valid key', async () => {
    const result = await happy.genericAction('getFioPublicKey', { })
    //console.log('happyPublicKey: ', result)
    expect(result).to.equal(happyPublicKey)   
  })

  it(`getFioBalance for happyPublicKey returns: ${fioData.error.keyNotFound}`, async () => {
    try {
      const result = await happy.genericAction('getFioBalance', {
        fioPublicKey: happyPublicKey
      }) 
    } catch (err) {
      expect(err.json.message).to.equal(fioData.error.keyNotFound)
    }
  })

  it('getFioPublicKey for Sad returns a valid key', async () => {
    const result = await sad.genericAction('getFioPublicKey', { })
    //console.log('Result: ', result)
    expect(result).to.equal(sadPublicKey)   
  })

  it(`getFioBalance for sadPublicKey returns: ${fioData.error.keyNotFound}`, async () => {
    try {
      const result = await sad.genericAction('getFioBalance', {
        fioPublicKey: sadPublicKey
      }) 
    } catch (err) {
      expect(err.json.message).to.equal(fioData.error.keyNotFound)
    }
  })
})

// PORTED
describe('Transferring tokens to Happy', () => {
  const fundsAmount = 1000000000000

  it(`getFioBalance for happy returns: ${fioData.error.keyNotFound}`, async () => {
    try {
      const result = await happy.genericAction('getFioBalance', { }) 
    } catch (err) {
      expect(err.json.message).to.equal(fioData.error.keyNotFound)
    } 
  })
    
  it(`Transfer ${fundsAmount} FIO to Happy's FIO public key`, async () => {
      const result = await faucet.genericAction('transferTokens', {
      payeeFioPublicKey: happyPublicKey,
      amount: fundsAmount,
      maxFee: fioData.api.transfer_tokens_pub_key.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('transaction_id', 'block_num', 'status', 'fee_collected')
  })

  it(`Happy's FIO public key has ${fundsAmount} FIO`, async () => {
    const result = await happy.genericAction('getFioBalance', {})
    //console.log('Result: ', result)
    expect(result.balance).to.equal(fundsAmount)
  })

  it(`Transfer ${.5*fundsAmount} to Happy`, async () => {
    const result = await faucet.genericAction('transferTokens', {
      payeeFioPublicKey: happyPublicKey,
      amount: .5*fundsAmount,
      maxFee: fioData.api.transfer_tokens_pub_key.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('transaction_id', 'block_num', 'status', 'fee_collected')
  })

  it(`Happy's FIO public key has ${1.5*fundsAmount} FIO`, async () => {
    const result = await happy.genericAction('getFioBalance', {})
    //console.log('Result: ', result)
    expect(result.balance).to.equal(1.5*fundsAmount) 
  })

})

// PORTED
describe('Transfer Tokens Sad', () => {
  const sadFioDomain = generateTestingFioDomain()
  const sadFioAddress = generateTestingFioAddress(sadFioDomain)
  const fundsAmount = 100000000000
  let sadFioBalance = 0

  it(`getFioBalance for Sad pre transfer returns ${fioData.error.keyNotFound}`, async () => {
    try {
      const result = await sad.genericAction('getFioBalance', {
        fioPublicKey: sadPublicKey
      }) 
    } catch (err) {
      expect(err.json.message).to.equal(fioData.error.keyNotFound)
    } 
  })

  it(`Transfer to empty public key returns: ${fioData.error.invalidKey}`, async () => {
    try {
      const result = await faucet.genericAction('transferTokens', {
        payeeFioPublicKey: '',
        amount: fundsAmount,
        maxFee: fioData.api.transfer_tokens_pub_key.fee,
        walletFioAddress: ''
      })
    } catch (err) {
      //console.log('Error: ', err.json)
      expect(err.json.fields[0].error).to.equal(fioData.error.invalidKey)
    } 
  })

  it(`Transfer ${100000000000000000/1000000000} returns: ${fioData.error.insufficientBalance}`, async () => {
    try {
      const result = await faucet.genericAction('transferTokens', {
        payeeFioPublicKey: sadPublicKey,
        amount: 100000000000000000,
        maxFee: fioData.api.transfer_tokens_pub_key.fee,
        walletFioAddress: ''
      })
    } catch (err) {
      //console.log('Error: ', err.json)
      expect(err.json.fields[0].error).to.equal(fioData.error.insufficientBalance)
    } 
  })

  it(`Transfer without enough FEE returns ${fioData.error.feeExceedsMax}`, async () => {
    try {
      const result = await faucet.genericAction('transferTokens', {
        payeeFioPublicKey: sadPublicKey,
        amount: fundsAmount,
        maxFee: fioData.api.transfer_tokens_pub_key.fee - 1000000,
        walletFioAddress: ''
      })
    } catch (err) {
      //console.log('Error: ', err.json)
      expect(err.json.fields[0].error).to.equal(fioData.error.feeExceedsMax)
    } 
  })
  
  it(`Transfer to invalid public key returns ${fioData.error.invalidKey}`, async () => {
    try {
      const result = await faucet.genericAction('transferTokens', {
        payeeFioPublicKey: 'EOS8k9vgu2YEWWACcEaNMvX5BvoHD8NEq1NgNAW7v1d37axaNEuLB',
        amount: fundsAmount,
        maxFee: fioData.api.transfer_tokens_pub_key.fee,
        walletFioAddress: ''
      })
    } catch (err) {
      //console.log('Error: ', err.json)
      expect(err.json.fields[0].error).to.equal(fioData.error.invalidKey)
    } 
  })

  it(`Transfer -100 returns ${fioData.error.invalidAmount}`, async () => {
    try {
      const result = await faucet.genericAction('transferTokens', {
        payeeFioPublicKey: sadPublicKey,
        amount: -100,
        maxFee: fioData.api.transfer_tokens_pub_key.fee,
        walletFioAddress: ''
      })
    } catch (err) {
      //console.log('Error: ', err.json)
      expect(err.json.fields[0].error).to.equal(fioData.error.invalidAmount)
    } 
  })
})

describe('Register Names Happy', () => {
  
  const happyFioDomain1 = generateTestingFioDomain()
  const happyFioAddress1 = generateTestingFioAddress(happyFioDomain1)
  const sadFioAddressOnHappyDomain = generateTestingFioAddress(happyFioDomain1)
  const fundsAmount = 1000000000000

  it(`Transfer ${fundsAmount} FIO to Happy's FIO public key`, async () => {
    const result = await faucet.genericAction('transferTokens', {
      payeeFioPublicKey: happyPublicKey,
      amount: fundsAmount,
      maxFee: fioData.api.transfer_tokens_pub_key.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('transaction_id', 'block_num', 'status', 'fee_collected')
  })

  it(`Domain is not registered: ${happyFioDomain1}`, async () => {
    const result = await happy.genericAction('isAvailable', {
      fioName: happyFioDomain1,
    })
    //console.log('Result: ', result)
    expect(result.is_registered).to.equal(0)
  })

  it(`Happy register domain: ${happyFioDomain1}`, async () => {
    const result = await happy.genericAction('registerFioDomain', { 
      fioDomain: happyFioDomain1, 
      maxFee: fioData.api.register_fio_domain.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'expiration', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.expiration).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

  it(`Domain is registered: ${happyFioDomain1}`, async () => {
    const result = await happy.genericAction('isAvailable', {
      fioName: happyFioDomain1,
    })
    //console.log('Result: ', result)
    expect(result.is_registered).to.equal(1)
  })

  it(`Address is not registered: ${happyFioAddress1}`, async () => {
    const result = await happy.genericAction('isAvailable', {
      fioName: happyFioAddress1,
    })
    //console.log('Result: ', result)
    expect(result.is_registered).to.equal(0)
  })

  it(`Happy register address: ${happyFioAddress1}`, async () => {
    const result = await happy.genericAction('registerFioAddress', {
      fioAddress: happyFioAddress1,
      maxFee: fioData.api.register_fio_address.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'expiration', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.expiration).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

  it(`Address is registered: ${happyFioAddress1}`, async () => {
    const result = await happy.genericAction('isAvailable', {
      fioName: happyFioAddress1,
    })
    //console.log('Result: ', result)
    expect(result.is_registered).to.equal(1)
  })
  
  it(`get_fio_names for Happy; Confirm ${happyFioDomain1} is not public`, async () => {
    const result = await happy.genericAction('getFioNames', { fioPublicKey: happyPublicKey })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('fio_domains', 'fio_addresses')
    expect(result.fio_domains).to.be.a('array')
    expect(result.fio_addresses).to.be.a('array')
    expect(result.fio_domains[0].fio_domain).to.equal(happyFioDomain1)
    expect(result.fio_domains[0].is_public).to.equal(0)
    expect(result.fio_addresses[0].fio_address).to.equal(happyFioAddress1)
  })

  it(`Pre avail_check of Sad address on Happy domain: ${sadFioAddressOnHappyDomain}`, async () => {
    const result = await sad.genericAction('isAvailable', {
      fioName: sadFioAddressOnHappyDomain,
    })
    //console.log('Result: ', result)
    expect(result.is_registered).to.equal(0)
  })
  
  //This is required to get the correct error in next call. Should return a better error.
  it(`Transfer FIO to Sads's FIO public key`, async () => {
    const result = await faucet.genericAction('transferTokens', {
      payeeFioPublicKey: sadPublicKey,
      amount: fundsAmount,
      maxFee: fioData.api.transfer_tokens_pub_key.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('transaction_id', 'block_num', 'status', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })


  it(`Register Sad address ${sadFioAddressOnHappyDomain} on Happy domain (pre public): returns ${fioData.error.domainNotPublic}`, async () => {
    try {
      const result = await sad.genericAction('registerFioAddress', {  //TODO setting this to "happy" gives 409 error which is wierd
        fioAddress: sadFioAddressOnHappyDomain,
        maxFee: fioData.api.register_fio_address.fee,
        walletFioAddress: ''
      })
    } catch (err) {
      //console.log('Error: ', err.json)
      expect(err.json.fields[0].error).to.equal(fioData.error.domainNotPublic)
    } 
  })

  it(`setFioDomainVisibility true for Happy domain: ${happyFioDomain1}`, async () => {
    const result = await happy.genericAction('setFioDomainVisibility', {
      fioDomain: happyFioDomain1,
      isPublic: true,
      maxFee: fioData.api.set_fio_domain_public.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

  it(`Register Sad address ${sadFioAddressOnHappyDomain} on Happy domain (post public)`, async () => {
    const result = await sad.genericAction('registerFioAddress', {
      fioAddress: sadFioAddressOnHappyDomain,
      maxFee: fioData.api.register_fio_address.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'expiration', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.expiration).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

  it(`Post avail_check: ${sadFioAddressOnHappyDomain}`, async () => {
    const result = await sad.genericAction('isAvailable', {
      fioName: sadFioAddressOnHappyDomain,
    })
    //console.log('Result: ', result)
    expect(result.is_registered).to.equal(1)
  })
  
/*
  it(`get_fio_names for Happy (pre renew)`, async () => {
    const result = await happy.genericAction('getFioNames', { fioPublicKey: happyPublicKey })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('fio_domains', 'fio_addresses')
    expect(result.fio_domains).to.be.a('array')
    expect(result.fio_addresses).to.be.a('array')
    expect(result.fio_domains[0].fio_domain).to.equal(happyFioDomain1)
    expect(result.fio_domains[0].is_public).to.equal(0)
    expect(result.fio_addresses[0].fio_address).to.equal(happyFioAddress1)
  })
  
  it(`Renew fio address`, async () => {
    const result = await happy.genericAction('renewFioAddress', { 
      fioAddress: happyFioAddress1, 
      maxFee: FEE_renew_fio_address ,
      walletFioAddress: ''
    })
    expect(result).to.have.all.keys('status', 'expiration', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.expiration).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

  it(`get_fio_names for Happy (post renew)`, async () => {
    const result = await happy.genericAction('getFioNames', { fioPublicKey: happyPublicKey })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('fio_domains', 'fio_addresses')
    expect(result.fio_domains).to.be.a('array')
    expect(result.fio_addresses).to.be.a('array')
    expect(result.fio_domains[0].fio_domain).to.equal(happyFioDomain1)
    expect(result.fio_domains[0].is_public).to.equal(0)
    expect(result.fio_addresses[0].fio_address).to.equal(happyFioAddress1)
  })

  //TODO: add renewfioaddress once it is added to list of generic actions.
*/
})

// PORTED
describe.skip('Test address mapping', () => {
  const fundsAmount = 1000000000000

  it(`Transfer ${fundsAmount} FIO to Happy's FIO public key`, async () => {
      const result = await faucet.genericAction('transferTokens', {
      payeeFioPublicKey: happyPublicKey,
      amount: fundsAmount,
      maxFee: fioData.api.transfer_tokens_pub_key.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('transaction_id', 'block_num', 'status', 'fee_collected')
  })

  it(`Add public addresses`, async () => {
    const result = await fioSdk.genericAction('addPublicAddresses', {
      fioAddress: newFioAddress,
      publicAddresses: [
        {
          chain_code: fioChainCode,
          token_code: fioTokenCode,
          public_address: '1PMycacnJaSqwwJqjawXBErnLsZ7RkXUAg',
        },
        {
          chain_code: fioChainCode,
          token_code: fioTokenCode,
          public_address: publicKey,
        }
      ],
      maxFee: defaultFee,
      walletFioAddress: ''
    })

    expect(result).to.have.all.keys('status', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

  it(`Add public addresses`, async () => {
    const result = await happy.genericAction('addPublicAddresses', {
      fioAddress: happyFioAddress1,
      publicAddresses: [
        {
          chain_code: 'FIO',
          token_code: 'FOP',
          public_address: '1PMycacnJaSqwwJqjawXBErnLsZ7RkXUAg',
        } /*,
        {
          chain_code: fioChainCode,
          token_code: fioTokenCode,
          public_address: publicKey,
        }*/
      ],
      maxFee: fioData.api.add_pub_address.fee,
      walletFioAddress: ''
    })

    expect(result).to.have.all.keys('status', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

})

// PORTED
describe('Register domain for other user', () => {
  const newFioDomain = generateTestingFioDomain()
  const user1Mnemonic = 'user1 health mine over uncover someone gain powder urge slot property ' + randStr
  let user1PrivateKey, user1PublicKey

  it(`Create Prod public/private keys`, async () => {
    user1PrivateKeyRes = await FIOSDK.createPrivateKeyMnemonic(user1Mnemonic)
    user1PrivateKey = user1PrivateKeyRes.fioKey
    user1PublicKeyRes = FIOSDK.derivedPublicKey(user1PrivateKey)
    user1PublicKey = user1PublicKeyRes.publicKey
  })

  it(`Transfer 50 FIO to user1PublicKey to create account`, async () => {
    const result = await faucet.genericAction('transferTokens', {
      payeeFioPublicKey: user1PublicKey,
      amount: 50000000000,
      maxFee: fioData.api.transfer_tokens_pub_key.fee,
    })
    //console.log('Result: ', result)
    expect(result.status).to.equal('OK')
  })

  it(`Transfer 2000 FIO to walletPublicKey to ensure funds`, async () => {
    const result = await faucet.genericAction('transferTokens', {
      payeeFioPublicKey: walletPublicKey,
      amount: 2000000000000,
      maxFee: fioData.api.transfer_tokens_pub_key.fee,
    })
    //console.log('Result: ', result)
    expect(result.status).to.equal('OK')
  })

  it(`Wallet account registers domain for user1PublicKey: ${newFioDomain}`, async () => {
    const result = await wallet.genericAction('pushTransaction', {
      action: 'regdomain',
      account: 'fio.address',
      data: {
        fio_domain: newFioDomain,
        owner_fio_public_key: user1PublicKey,
        max_fee: fioData.api.register_fio_domain.fee,
        tpid: ''
      }
    })
    //console.log('Result: ', result)
    expect(result.status).to.equal('OK')
  })

  it(`get_fio_names for user1PublicKey; Confirm ${newFioDomain}`, async () => {
    const result = await happy.genericAction('getFioNames', { fioPublicKey: user1PublicKey })
    //console.log('Result: ', result)
    expect(result.fio_domains[0].fio_domain).to.equal(newFioDomain)
  })

})


// PORTED
describe('Check domain and address format', () => {
  const fiftyfiveChars = "0123456789012345678901234567890123456789012345678901234"
  const domain0Bad = ""
  const domain1Good = Math.random().toString(26).substr(2, 1)
  const domain2Good = Math.random().toString(26).substr(2, 2)
  const domain62Good = fiftyfiveChars + Math.random().toString(26).substr(2, 7)
  const domain63Bad = fiftyfiveChars + Math.random().toString(26).substr(2, 8)
  const address1at62Good = Math.random().toString(26).substr(2, 1) + "@" + domain62Good
  const address2at62Bad = Math.random().toString(26).substr(2, 2) + "@" + domain62Good
  const address62at1Good = fiftyfiveChars + Math.random().toString(26).substr(2, 7) + "@" + domain1Good
  const address62at2Bad = fiftyfiveChars + Math.random().toString(26).substr(2, 8) + "@" + domain2Good

  it(`Transfer 3000 FIO to Happy's FIO public key`, async () => {
    const result = await faucet.genericAction('transferTokens', {
    payeeFioPublicKey: happyPublicKey,
    amount: 3000000000000,
    maxFee: fioData.api.transfer_tokens_pub_key.fee,
    walletFioAddress: ''
  })
  //console.log('Result: ', result)
  expect(result).to.have.all.keys('transaction_id', 'block_num', 'status', 'fee_collected')
  expect(result.status).to.be.a('string')
  expect(result.fee_collected).to.be.a('number')
})

  it(`Register domain of length 0 returns error.`, async () => {
    try {
      const result = await happy.genericAction('registerFioDomain', { 
        fioDomain: domain0Bad, 
        maxFee: fioData.api.register_fio_domain.fee,
        walletFioAddress: ''
      })
      //console.log('Result: ', result))
    } catch (err) {
      //console.log('Error: ', err)
      expect(err.json.fields[0].error).to.equal(fioData.error.invalidDomain)
    } 
  })

  it(`Register domain of length 1 succeeds: ${domain1Good}`, async () => {
    const result = await happy.genericAction('registerFioDomain', { 
      fioDomain: domain1Good, 
      maxFee: fioData.api.register_fio_domain.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result.status).to.equal('OK')
  })

  it(`Register domain of length 2 succeeds: ${domain2Good}`, async () => {
    const result = await happy.genericAction('registerFioDomain', { 
      fioDomain: domain2Good, 
      maxFee: fioData.api.register_fio_domain.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result.status).to.equal('OK')
  })

  it(`Register domain of length 62 succeeds: ${domain62Good}`, async () => {
    const result = await happy.genericAction('registerFioDomain', { 
      fioDomain: domain62Good, 
      maxFee: fioData.api.register_fio_domain.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result.status).to.equal('OK')
  })

  it(`Register domain of length 63 fails: ${domain63Bad}`, async () => {
    const result = await happy.genericAction('registerFioDomain', { 
      fioDomain: domain63Bad, 
      maxFee: fioData.api.register_fio_domain.fee,
      walletFioAddress: ''
    }).catch(function(err) {
      //console.log('fiosdk Error: ', err.name)
      expect(err.name).to.equal(fioData.error.validationError)
    });
  })

  it(`Register domain of fails: "##asdf#"`, async () => {
    try {
      const result = await happy.genericAction('registerFioDomain', { 
        fioDomain: "##asdf#", 
        maxFee: fioData.api.register_fio_domain.fee,
        walletFioAddress: ''
      })
      //console.log('Result: ', result)
    } catch (err) {
      //console.log('Error: ', err)
      expect(err.json.fields[0].error).to.equal(fioData.error.invalidDomain)
    } 
  })

  it(`Register address length 1@62 succeeds: ${address1at62Good}`, async () => {
    const result = await happy.genericAction('registerFioAddress', {
      fioAddress: address1at62Good,
      maxFee: fioData.api.register_fio_address.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result.status).to.equal('OK')
  })

  it(`Register address length 2@62 fails: ${address2at62Bad}`, async () => {
    const result = await happy.genericAction('registerFioAddress', {
      fioAddress: address2at62Bad,
      maxFee: fioData.api.register_fio_address.fee,
      walletFioAddress: ''
    }).catch(function(err) {
      //console.log('fiosdk Error: ', err.name)
      expect(err.name).to.equal(fioData.error.validationError)
    });
  })

  it(`Register address length 62@1 succeeds: ${address62at1Good}`, async () => {
    const result = await happy.genericAction('registerFioAddress', {
      fioAddress: address62at1Good,
      maxFee: fioData.api.register_fio_address.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    //console.log('Address: ', address62at1Good)
    expect(result.status).to.equal('OK')
  })

  it(`Register address length 62@2 fails: ${address62at2Bad}`, async () => {
    const result = await happy.genericAction('registerFioAddress', {
      fioAddress: address62at2Bad,
      maxFee: fioData.api.register_fio_address.fee,
      walletFioAddress: ''
    }).catch(function(err) {
      //console.log('fiosdk Error: ', err.name)
      expect(err.name).to.equal(fioData.error.validationError)
    });
  })

})


// PORTED
describe('Test bad FIO addresses', () => {
  
  const badFioAddresses = ["-dash@notatstart", "two@at@isinvalid", "old:shouldntwork", "dash@notending-"]

  badFioAddresses.forEach(function (fioAddress, index) {
    it(`Register address ${fioAddress} fails`, async () => {
      try {
        const result = await wallet.genericAction('isAvailable', {
          fioName: fioAddress,
        })
        //console.log('Result: ', result)
      } catch (err) {
        //console.log('Error: ', err)
        expect(err.json.fields[0].error).to.equal(fioData.error.invalidFioName)
      } 
    })
  })

})

// PORTED
describe('Try to re-register the same domain using different case', () => {
  const domain1 = generateTestingFioDomain()
  const domain2 = domain1.charAt(0).toUpperCase() + domain1.slice(1)
 
  it(`Domain is not registered: ${domain1}`, async () => {
    const result = await happy.genericAction('isAvailable', {
      fioName: domain1,
    })
    //console.log('Result: ', result)
    //console.log('happyFioDomain1 = ', happyFioDomain1)
    expect(result.is_registered).to.equal(0)
  })

  it(`Register domain: ${domain1} succeeds`, async () => {
    const result = await happy.genericAction('registerFioDomain', { 
      fioDomain: domain1, 
      maxFee: fioData.api.register_fio_domain.fee ,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'expiration', 'fee_collected')
  })

  
  it(`Register same domain with uppercase first letter: ${domain2} returns: ${fioData.error.domainRegistered}`, async () => {
    await timeout(2000) //To avoid this getting flagged as duplicate transaction
    try {
      const result = await happy.genericAction('registerFioDomain', { 
        fioDomain: domain1, 
        maxFee: fioData.api.register_fio_domain.fee ,
        walletFioAddress: ''
      })
      //console.log('Result: ', result)
    } catch (err) {
      //console.log('Error: ', err)
      expect(err.json.fields[0].error).to.equal(fioData.error.domainRegistered)
    } 
  })

})

describe('Wallet pays for users address', () => {
  const walletDomain = generateTestingFioDomain()
  const walletUserAddress = generateTestingFioAddress(walletDomain)
  const walletTpidAddress = "rewards@" + walletDomain
  const userIsStupidAddress = "user-is-stupid@" + walletDomain

  it(`Wallet domain is not registered: ${walletDomain}`, async () => {
    const result = await wallet.genericAction('isAvailable', {
      fioName: walletDomain,
    })
    //console.log('Result: ', result)
    //console.log('walletDomain = ', walletDomain)
    expect(result.is_registered).to.equal(0)
  })

  it(`Register wallet domain: ${walletDomain}`, async () => {
    const result = await wallet.genericAction('registerFioDomain', { 
      fioDomain: walletDomain, 
      maxFee: fioData.api.register_fio_domain.fee ,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'expiration', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.expiration).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

  it(`Register TPID rewards address: rewards@${walletDomain}`, async () => {
    const result = await wallet.genericAction('registerFioAddress', {
      fioAddress: walletTpidAddress,
      maxFee: fioData.api.register_fio_address.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'expiration', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.expiration).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

  it(`Happy address on wallet domain is not registered: ${walletUserAddress}`, async () => {
    const result = await wallet.genericAction('isAvailable', {
      fioName: walletUserAddress,
    })
    //console.log('Result: ', result)
    expect(result.is_registered).to.equal(0)
  })

  it(`Wallet account registers address for Happy on wallet domain: ${walletUserAddress}`, async () => {
    const result = await wallet.genericAction('pushTransaction', {
      action: 'regaddress',
      account: 'fio.address',
      data: {
        fio_address: walletUserAddress,
        owner_fio_public_key: walletUserPublicKey,
        max_fee: defaultFee,
        tpid: walletTpidAddress
      }
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'expiration', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.expiration).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

  it(`Confirm that ${walletUserAddress} is associated with walletUser public key`, async () => {
    const result = await walletUser.genericAction('getFioNames', { fioPublicKey: walletUserPublicKey })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('fio_domains', 'fio_addresses')
    expect(result.fio_domains).to.be.a('array')
    expect(result.fio_addresses).to.be.a('array')
    expect(result.fio_addresses[0].fio_address).to.equal(walletUserAddress)
  })

  it(`setFioDomainVisibility true for wallet domain: ${walletDomain}`, async () => {
    const result = await wallet.genericAction('setFioDomainVisibility', {
      fioDomain: walletDomain,
      isPublic: true,
      maxFee: fioData.api.set_fio_domain_public.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

  it(`Sad registers user-is-stupid address for User on wallet domain: ${userIsStupidAddress}`, async () => {
    const result = await sad.genericAction('pushTransaction', {
      action: 'regaddress',
      account: 'fio.address',
      data: {
        fio_address: userIsStupidAddress,
        owner_fio_public_key: walletUserPublicKey,
        max_fee: defaultFee,
        tpid: walletTpidAddress
      }
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'expiration', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.expiration).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

  it(`Confirm that ${userIsStupidAddress} is associated with walletUser public key`, async () => {
    const result = await walletUser.genericAction('getFioNames', { fioPublicKey: walletUserPublicKey })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('fio_domains', 'fio_addresses')
    expect(result.fio_domains).to.be.a('array')
    expect(result.fio_addresses).to.be.a('array')
    expect(result.fio_addresses[1].fio_address).to.equal(userIsStupidAddress)
  })

/*
  it(`Confirm that wallet got funds ${walletTpidAddress} for registering address`, async () => {
    const result = await wallet.genericAction('getFioBalance', { fioPublicKey: walletPublicKey })
    console.log('Result: ', result)
    expect(result).to.have.all.keys('fio_domains', 'fio_addresses')
    expect(result.fio_domains).to.be.a('array')
    expect(result.fio_addresses).to.be.a('array')
  })
*/
})

describe.skip('Skipped: Burn_expired testing', () => {
  const expiredDomain = generateTestingFioDomain()
  const expiredAddress = generateTestingFioAddress(expiredDomain)

  it(`Call burn_expired with no expired domains`, async () => {
    const result = await wallet.genericAction('pushTransaction', {
      action: 'burnexpired',
      account: 'fio.address',
      data: {}
    })
    //console.log('Result: ', result)
    expect(result.fields[0].error).to.equal('No work.')
  })

  it(`Register domain: ${expiredDomain}`, async () => {
    const result = await wallet.genericAction('registerFioDomain', { 
      fioDomain: expiredDomain, 
      maxFee: fioData.api.register_fio_domain.fee ,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'expiration', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.expiration).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

    // ********* need to get access to account/actor. See accountname.js in fiojs. Maybe try to link to that.

  it(`Burn domain: ${expiredDomain}`, async () => {
    const result = await wallet.genericAction('pushTransaction', {
      action: 'expdomain', //expdomain is only used for testing, will be removed
      account: 'fio.address',
      data: {
        "actor":fiojs.accountHash(walletPublicKey),
        "domain":expiredDomain
      }
    })
    console.log('Result: ', result)
    expect(result.fee_collected).to.be.a('number')
  })

/*
  it(`Call burn_expired with a burned domain`, async () => {
    const result = await wallet.genericAction('pushTransaction', {
      action: 'burnexpired',
      account: 'fio.address',
      data: {}
    })
    console.log('Result: ', result)
    expect(result.fee_collected).to.be.a('number')
  })
  */
})

// PORTED
describe('Record OBT data', () => {
  
  const testDomain = generateTestingFioDomain()
  const rsTestFioAddress1 = generateTestingFioAddress(testDomain)
  const rsTestFioAddress2 = generateTestingFioAddress(testDomain)

  it(`TODO: recordSend`, async () => {
    /*
    const result = await happy.genericAction('recordObtData', { 
      fioRequestId: requestId,
      payerFIOAddress: rsTestFioAddress1,
      payeeFIOAddress: rsTestFioAddress2,
      payerTokenPublicAddress: happyPublicKey,
      payeeTokenPublicAddress: sadPublicKey,
      amount: fundsAmount,
      tokenCode: fioTokenCode,
      status: 'sent_to_blockchain',
      obtId: '',
      maxFee: FEE_record_send,
      walletFioAddress: "",
      payeeFioPublicKey: "",
      memo: "",
      hash: "",
      offLineUrl: ""
    })
    console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
    */
  })
})

// NOT NEEDED
describe('Register Producer', () => {
  const prod1Mnemonic = 'prod1 health mine over uncover someone gain powder urge slot property ' + randStr

  it(`get_producers`, async () => {
    const result = await fio.callFioApi("get_producers", null_json)
    //console.log('get_producers: ', result)
  })

  it(`Create Prod public/private keys`, async () => {
    prod1PrivateKeyRes = await FIOSDK.createPrivateKeyMnemonic(prod1Mnemonic)
    prod1PrivateKey = prod1PrivateKeyRes.fioKey
    prod1PublicKeyRes = FIOSDK.derivedPublicKey(prod1PrivateKey)
    prod1PublicKey = prod1PublicKeyRes.publicKey
    prod1FioDomain = generateTestingFioDomain()
    prod1FioAddress = generateTestingFioAddress(prod1FioDomain)
    prod1Account = transaction.getActor(prod1PublicKey)

    smokeFioDomain = generateTestingFioDomain()
    smokeFioAddress = generateTestingFioAddress(smokeFioDomain)
  })

  // Make sure there is a smoketest funded account.
  it(`Transfer 4000000000000 to smoketestPublicKey`, async () => {
    const result = await faucet.genericAction('transferTokens', {
      payeeFioPublicKey: smoketestPublicKey,
      amount: 4000000000000,
      maxFee: fioData.fees.FEE_transfer_tokens_pub_key
    })
    //console.log('Result: ', result)
    expect(result.status).to.equal('OK')
  })

  it(`Transfer FIO to producerPublicKey to fund producer account`, async () => {
    const result = await faucet.genericAction('transferTokens', {
      payeeFioPublicKey: producerPublicKey,
      amount: 2000000000000,
      maxFee: fioData.api.transfer_tokens_pub_key.fee,
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('transaction_id', 'block_num', 'status', 'fee_collected')
  })

  it(`Register Prod1 domain: prod1FioDomain`, async () => {
    const result = await producer.genericAction('registerFioDomain', { 
      fioDomain: prod1FioDomain, 
      maxFee: fioData.api.register_fio_domain.fee ,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'expiration', 'fee_collected')
  })

  it(`Register Prod1 address: prod1FioAddress`, async () => {
    const result = await producer.genericAction('registerFioAddress', { 
      fioAddress: prod1FioAddress,
      maxFee: fioData.api.register_fio_address.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result.status).to.equal('OK')  
  })

  it(`Register as producer: prod1FioAddress`, async () => {
    try {
      const result = await producer.genericAction('pushTransaction', {
        action: 'regproducer',
        account: 'eosio',
        data: {
          fio_address: prod1FioAddress,
          fio_pub_key: producerPublicKey,
          url: "https://mywebsite.io/",
          location: 80,
          actor: producerAccount,
          max_fee: fioData.api.register_producer.fee
        }
      })
      //console.log('Result: ', result)
      expect(result.fee_collected).to.be.a('number')
    } catch (err) {
      console.log('Error: ', err.json)
    } 
  })

  it(`Register domain for smoketest`, async () => {
    const result = await smoketest.genericAction('registerFioDomain', { 
      fioDomain: smokeFioDomain, 
      maxFee: fioData.api.register_fio_domain.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result.fee_collected).to.be.a('number')
  })

  it(`Register address for smoketest (required to vote for a producer...)`, async () => {
    const result = await smoketest.genericAction('registerFioAddress', {
      fioAddress: smokeFioAddress,
      maxFee: fioData.api.register_fio_address.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('status', 'expiration', 'fee_collected')
  })

  it(`Vote smoketest tokens for producer: prod1FioAddress`, async () => {
    try {
      const result = await smoketest.genericAction('pushTransaction', {
        action: 'voteproducer',
        account: 'eosio',
        data: {
          "producers": [
            prod1FioAddress
            //"BP2",
            //"BP3"
          ],
          "fio_address": smokeFioAddress,
          "actor": smoketestAccount,
          "max_fee": fioData.api.vote_producer.fee
        }
      })
      //console.log('Result: ', result)
      //console.log('smokeFioAddress: ', smokeFioAddress)
      expect(result.fee_collected).to.be.a('number')
    } catch (err) {
      console.log('Error: ', err.json)
    } 
  })

  it(`getFioBalance for smoketest`, async () => {
    try {
      const result = await smoketest.genericAction('getFioBalance', {
        fioPublicKey: smoketestPublicKey
      }) 
      //console.log('Result: ', result)
      expect(result.balance).to.be.a('number')
    } catch (err) {
      console.log('Error: ', err.json)
    }
  })

  it('Bug: fioaddress for voter is blank in voters table') , async () => {
    // ./clio -u http://localhost:8889 get table eosio eosio voters
  }

})

// NOT NEEDED
describe('Get ABI', () => {

  it(`getAbi for eosio`, async () => {
    const result = await wallet.genericAction('getAbi', { accountName: 'eosio' })
    //console.log('Result: ', result)
    expect(result).to.have.all.keys('account_name', 'code_hash', 'abi_hash', 'abi')
    expect(result.account_name).to.be.a('string')
    expect(result.code_hash).to.be.a('string')
    expect(result.abi_hash).to.be.a('string')
    expect(result.abi).to.be.a('string')
  })

})

//NOT NEEDED
describe.skip('Todo: Bundle test', () => {

  it(`burnaction`, async () => {
  //Only removes 100 expired items. 
  //With no more work to be done it throws an error. One table read to throw the error.
  })

  it(`Length of address/domain. Roadmap says 64 for domain and 64 for address + domain?`, async () => {
  })

  it(`What happens after bundles run out?`, async () => {
  })
  
})

//NOT NEEDED
describe.skip('Return a lot of FIO names hits limit', () => {

  it(`Return a lot of FIO names hits limit`, async () => {
    const result = await happy.genericAction('getFioNames', { 
      fioPublicKey: "FIO7WUm6fWGeqHeP9DPriPemdtY1eWZRG9VAhDEWuEX46whAQYLA6" 
    })
    for (i = 0; i < result.fio_domains.length; i++) { 
      console.log('Result ' +  i + " : " + result.fio_domains[i].fio_domain)
    }
  })

})

//NOT NEEDED
describe.skip('Test utils', () => {
  let newAddress, newDomain
  // Make account
  // Make sure there is a smoketest funded account.
  it(`Make sure there is a smoketest funded account.`, async () => {
    const result = await fio.ensureAccount(4000000000000, faucet, smoketestPublicKey)
    console.log('Result: ', result)
  })

  it(`Create Domain`, async () => {
    newDomain = await fio.registerDomain(smoketest)
    console.log('newDomain: ', newDomain)
  })

  it(`Create Address`, async () => {
    try{
      newAddress = await fio.registerAddress(smoketest, newDomain)
    } catch (err) {
      console.log('Error: ', err.json)
    }
    console.log('newAddress: ', newAddress)
  })

  // Get RAM, confirm it is default
  // Regdomain, confirm RAM increase
  // Regaddress, confirm RAM increase
})

// PORTED
describe('Test RAM Consumption', () => {
  // Make sure there is a smoketest funded account.
  const ramuserMnemonic = 'prod1 health mine over uncover someone gain powder urge slot property ' + randStr
  let actualRAMUsage, expectedRAMQuota, actualRAMQuota, blockNum
  let RAM
  //var userRAM = new fioData.userRAM(ramuserAccount, 0, 0, 0)
  

  it(`Create ramuser public/private keys`, async () => {
    ramuserFioDomain = generateTestingFioDomain()
    ramuserFioAddress = generateTestingFioAddress(ramuserFioDomain)
    ramuserFioDomain2 = generateTestingFioDomain()
    ramuserFioAddress2 = generateTestingFioAddress(ramuserFioDomain2)
    //console.log('ramuserAccount: ', ramuserAccount)
    //console.log('ramuserPublicKey: ', ramuserPublicKey)
    //console.log('ramuserPrivateKey: ', ramuserPrivateKey)
    ramLog = new utils.RAM(ramuserAccount);
    
  })

  it(`Transfer FIO to ramuserPublicKey to fund account`, async () => {
    const result = await faucet.genericAction('transferTokens', {
      payeeFioPublicKey: ramuserPublicKey,
      amount: 2000000000000,
      maxFee: fioData.api.transfer_tokens_pub_key.fee,
    })  
    //console.log('Result', result)
    expect(result).to.have.all.keys('transaction_id', 'block_num', 'status', 'fee_collected')
  })

  it(`Set RAM info`, async () => {
    const result = await ramLog.setRAMData('INITIALACCOUNTRAM', ramLog)
    expect(result.txnQuota).to.equal(fioData.RAM.INITIALACCOUNTRAM)
  })

  /*
  // Get RAM, confirm it is default
  it(`get RAM data via clio`, async () => {
    const result = await fio.runCmd("../fio.devtools/bin/clio -u http://localhost:8889 get account " + ramuserAccount + " -j")
    jsonResult = JSON.parse(result) 
    actualRAMUsage = jsonResult.ram_usage
    actualRAMQuota = jsonResult.ram_quota
    expectedRAMQuota = actualRAMQuota

    //RAM.addRAMEntry("Transfer tokens to account", fioData.RAM.INITIALACCOUNTRAM, jsonResult.ram_usage, jsonResult.ram_quota, fioData.RAM.INITIALACCOUNTRAM)

    RAMEntry = {
      txnType: "Transfer tokens to account",
      txnQuota: fioData.RAM.INITIALACCOUNTRAM,
      actualRAMUsage: jsonResult.ram_usage, 
      actualRAMQuota: jsonResult.ram_quota, 
      expectedRAMQuota: fioData.RAM.INITIALACCOUNTRAM
    }
    RAM.ramUsage.push(RAMEntry);
    expect(jsonResult.ram_quota).to.be.greaterThan(fioData.RAM.INITIALACCOUNTRAM)
  })
*/

  it(`Register domain: ramuserFioDomain`, async () => {
    const result = await ramuser.genericAction('registerFioDomain', { 
      fioDomain: ramuserFioDomain, 
      maxFee: fioData.api.register_fio_domain.fee ,
      walletFioAddress: ''
    })
    //console.log('Result', result)
    expect(result).to.have.all.keys('status', 'expiration', 'fee_collected')
  })

  it(`Set RAM info`, async () => {
    const result = await ramLog.setRAMData('REGDOMAINRAM', ramLog)
    expect(result.txnQuota).to.be.greaterThan(0)
  })
/*
  // Get RAM, confirm it is updated
  it(`get updated RAM`, async () => {
    const result = await fio.runCmd("../fio.devtools/bin/clio -u http://localhost:8889 get account " + ramuserAccount + " -j")
    jsonResult = JSON.parse(result) 
    prevActualRAMUsage = actualRAMUsage
    actualRAMUsage = jsonResult.ram_usage
    prevActualRAMQuota = actualRAMQuota
    actualRAMQuota = jsonResult.ram_quota
    expectedRAMQuota += fioData.RAM.REGDOMAINRAM

    RAMEntry = {
      txnType: "REGDOMAINRAM",
      txnQuota: fioData.RAM.REGDOMAINRAM,
      actualRAMUsage: jsonResult.ram_usage, 
      actualRAMQuota: jsonResult.ram_quota, 
      expectedRAMQuota: expectedRAMQuota
    }
    RAM.ramUsage.push(RAMEntry);
    
    expect(actualRAMQuota).to.equal(expectedRAMQuota)
  })
*/
  
  it(`Register address: ramuserFioAddress`, async () => {
    const result = await ramuser.genericAction('registerFioAddress', { 
      fioAddress: ramuserFioAddress,
      maxFee: fioData.api.register_fio_address.fee,
      walletFioAddress: ''
    })
    //console.log('Result: ', result)
    expect(result.status).to.equal('OK')  
  })

  it(`Set RAM info`, async () => {
    const result = await ramLog.setRAMData('REGADDRESSRAM', ramLog)
    expect(result.txnQuota).to.be.greaterThan(0)
  })
/*
  // Get RAM, confirm it is updated
  it(`get updated RAM`, async () => {
    const result = await fio.runCmd("../fio.devtools/bin/clio -u http://localhost:8889 get account " + ramuserAccount + " -j")
    jsonResult = JSON.parse(result) 
    prevActualRAMUsage = actualRAMUsage
    actualRAMUsage = jsonResult.ram_usage
    prevActualRAMQuota = actualRAMQuota
    actualRAMQuota = jsonResult.ram_quota
    expectedRAMQuota += fioData.RAM.REGADDRESSRAM

    RAMEntry = {
      txnType: "REGADDRESSRAM",
      txnQuota: fioData.RAM.REGADDRESSRAM,
      actualRAMUsage: jsonResult.ram_usage, 
      actualRAMQuota: jsonResult.ram_quota, 
      expectedRAMQuota: expectedRAMQuota
    }
    RAM.ramUsage.push(RAMEntry);
   
    expect(actualRAMQuota).to.equal(expectedRAMQuota)
  })
*/

  it(`Add public addresses`, async () => {
    const result = await ramuser.genericAction('addPublicAddresses', {
      fioAddress: ramuserFioAddress,
      publicAddresses: [
        {
          chain_code: 'FIO',
          token_code: 'FIO',
          public_address: '1PMycacnJaSqwwJqjawXBErnLsZadsfasdf7RkXUAg',
        },
        {
          chain_code: 'BTC',
          token_code: 'BTC',
          public_address: '1PMycacnJaSqwsdfsdfwJqjawXBErnLsZ7RkXUAg',
        }
      ],
      maxFee: fioData.api.add_pub_address.fee,
      walletFioAddress: ''
    })
    expect(result).to.have.all.keys('status', 'fee_collected')
    expect(result.status).to.be.a('string')
    expect(result.fee_collected).to.be.a('number')
  })

  it(`Set RAM info`, async () => {
    const result = await ramLog.setRAMData('ADDADDRESSRAM', ramLog)
    expect(result.txnQuota).to.be.greaterThan(0)
  })
/*
  // Get RAM, confirm it is updated
  it(`get updated RAM`, async () => {
    const result = await fio.runCmd("../fio.devtools/bin/clio -u http://localhost:8889 get account " + ramuserAccount + " -j")
    jsonResult = JSON.parse(result) 
    prevActualRAMUsage = actualRAMUsage
    actualRAMUsage = jsonResult.ram_usage
    prevActualRAMQuota = actualRAMQuota
    actualRAMQuota = jsonResult.ram_quota
    expectedRAMQuota += fioData.RAM.ADDADDRESSRAM

    RAMEntry = {
      txnType: "ADDADDRESSRAM",
      txnQuota: fioData.RAM.ADDADDRESSRAM,
      actualRAMUsage: jsonResult.ram_usage, 
      actualRAMQuota: jsonResult.ram_quota, 
      expectedRAMQuota: expectedRAMQuota
    }
    RAM.ramUsage.push(RAMEntry);
    
    expect(actualRAMQuota).to.equal(expectedRAMQuota)
  })
*/
  it(`Register domain using pushTransaction`, async () => {
    try {
      const result = await ramuser.genericAction('pushTransaction', {
        action: 'regdomain',
        account: 'fio.address',
        data: {
          fio_domain: ramuserFioDomain2,
          owner_fio_public_key: ramuserPublicKey,
          max_fee: fioData.api.register_fio_domain.fee,
          tpid: ''
        }
      })
      //console.log('Result: ', result)
      expect(result.status).to.equal('OK')
    } catch (err) {
      console.log('Error: ', err.json)
    }
  })

  it(`Set RAM info`, async () => {
    const result = await ramLog.setRAMData('REGDOMAINRAM', ramLog)
    expect(result.txnQuota).to.be.greaterThan(0)
  })


  it(`Request funds`, async () => {
    try {
      const result = await ramuser.genericAction('requestFunds', { 
        payerFioAddress: ramuserFioAddress, 
        payeeFioAddress: ramuserFioAddress,
        payeeTokenPublicAddress: 'asdfasweredddawerqewrffasdfwer',
        amount: 10000000000,
        chainCode: 'FIO',
        tokenCode: 'FIO',
        memo: 'asdf asdf asdf asdf asdf asdf asdf qwpoiqewporiadsflllads 333 sa',
        maxFee: fioData.api.new_funds_request.fee,
        payerFioPublicKey: "FIO7ARVsgqixGwXnpp8Voc2ZDerkUcjHJrdM87ScGdE6DZDx6s9VX",
        walletFioAddress: '',
        hash: 'fmwazjvmenfz',
        offlineUrl: ''
      })    
      //console.log('Result: ', result)
      expect(result).to.have.all.keys('status', 'fio_request_id', 'fee_collected')
    } catch (err) {
      console.log('Error: ', err.json)
    }
  })

  it(`Set RAM info`, async () => {
    const result = await ramLog.setRAMData('NEWFUNDSREQUESTRAM', ramLog)
    expect(result.txnQuota).to.be.greaterThan(0)
  })

  it(`Print RAM Usage`, async () => {
    for (entry in ramLog.ramUsage) {
      console.log('Entry: ', ramLog.ramUsage[entry])
    }
  })

})


