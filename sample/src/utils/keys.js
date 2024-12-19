import { reactive } from "vue";

export const KeyPairs = reactive({
  privateKey: "",
  publicKeyJwk: {},
  setkey(key) {
    key = JSON.parse(key); 
    if ( key.hasOwnProperty('private') && key.hasOwnProperty('publicKeyJwk')) {
      this.publicKeyJwk = key.publicKeyJwk;
      this.privateKey = key.private;
      return true;
    }
    console.error('Invalid key object');
    return false;
  },
  init() {
    this.privateKey = "";
    this.publicKeyJwk = {};
  }
});

export const getKeys = async () => {
  try {
    const response = await fetch('/host/api/keys', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
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
};
