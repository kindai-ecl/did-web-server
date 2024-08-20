import { reactive } from 'vue'
import { KeyPairs } from '@/utils/keys';
import { createJWT, ES256KSigner, hexToBytes } from 'did-jwt';

export const DIDDoc = reactive ({
  URL:"",
});

export const writeDoc = async ( jwk, controller="" ) => {
    // ! caution
    // DID Documents should have more freedom of choice 
    // of encryption method, authentication, and authoraization
    // at the choice of each individual.

  const reqBody = {
    publicKeyJwk : jwk,
    controller : controller
  };
    
  try {
    const response = await fetch('/host/v0/api/did', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }  
    const keys = await response.json();
    return keys;
  } catch (err) {
    console.error('Fetch error:', err);
    return null;
  }
}

export const verifyJWK = async () => {
  const key = KeyPairs.private;
  const signer = ES256KSigner(hexToBytes(key))

  // Create a signed JWT
  const jwt = await createJWT(
    { aud: VITE_DID_HOST_URL, name: 'Bob Smith' },
    { issuer: VITE_DID_HOST_URL, signer },
    { alg: 'ES256K' }
  )
    await new Promise(r => setTimeout(r, 3000));
    // const result = await fetch(
    //     '/host/v0/api/verify'
    //     , {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(jwk)
    //     }
    // ).then( res => {
    //     console.log(res);
    //     return res.json();
    // }).catch( err => {
    //     console.log(err);
    //     return { msg: 'error occured' };
    // });
    // return result;
    return jwt;
}