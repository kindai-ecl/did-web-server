// キーの発行
// https://did.lcyou.org/v0/api/keysにGETリクエストを送ると鍵を生成してくれるのでその鍵情報を表示する

const getKeys = async () => {
  const keys = await fetch(
    '/api/v0/api/keys'
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

export default getKeys;