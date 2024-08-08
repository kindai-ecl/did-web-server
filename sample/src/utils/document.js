export const getKeys = async () => {
    const keys = await fetch(
      '/host/v0/api/keys'
      , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then( res => {
      console.log(res);
      return res.json();
    }).catch( err => {
      console.log(err);
      return { msg: 'error occured' };
    });
    return keys;
  };

export const writeDoc = async (jwk) => {
    // const result = await fetch(
    //     '/host/v0/api/doc'
    //     , {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(doc)
    //     }
    // ).then( res => {
    //     console.log(res);
    //     return res.json();
    // }).catch( err => {
    //     console.log(err);
    //     return { msg: 'error occured' };
    // });
    // return result;
    
    //set timeout to 1 second
    await new Promise(r => setTimeout(r, 3000));
    return jwk;
}

export const postDoc = async (doc) => {
    const result = 'test';
    await new Promise(r => setTimeout(r, 3000));
    return doc;
}

export const verifyJWK = async (jwk) => {
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
    return "completed";
}