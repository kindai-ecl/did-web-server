
const didjwt = require('did-jwt');
const didResolver = require('did-resolver');
const webdidResolver = require('web-did-resolver');

async function testDID(jwt){
    const decoded = didjwt.decodeJWT(jwt)
    console.log('\n//// JWT Decoded:\n',decoded)
    
    const webResolver = webdidResolver.getResolver()
    const resolver = new didResolver.Resolver({
      ...webResolver
    })
    
    didjwt.verifyJWT(jwt, {
      resolver,
      audience: 'did:web:did.lcyou.org'
    }).then(({ payload, didResolutionResult, did, signer, jwt }) => {
      console.log('\n//// Verified:\n', payload)
      console.log(didResolutionResult.didDocument)
      console.log(signer)
      console.log(jwt)
      return true
    }).catch(err => {
      console.error(err)
    })

    return false
}

exports.testDID = testDID;