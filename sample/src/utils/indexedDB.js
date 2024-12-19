const document = window.indexedDB.open("didDocument", 1);  
var db;

document.onupgradeneeded = function(event) {
    console.log("Upgrade needed: " + event.target.result);

    var db = event.target.result;
    const did = db.createObjectStore("dids", { autoIncrement: true });
    const keys = db.createObjectStore("keys", { autoIncrement: true });

    did.createIndex("uri", "uri", { unique: true });

    keys.createIndex("privateKey", "privateKey", { unique: true });
};

document.onerror = function(event) {
    console.log("Database Error: " + event.target.error?.message);
    // VER_ERR?
};

document.onsuccess = function(event) {
    console.log("Success: " + event.target.result);
    db = event.target.result;
    return ;
};


function useDatabase(db) {
    db.onversionchange = (event) => {
        db.close();
        console.log(
            "A new version of this page is ready. Please reload or close this tab!",
        );
    };
    
    console.log("do stuff with database!");
}

export function addDid(location, uri) {
    const transaction = db.transaction(["dids"], "readwrite");
    const store = transaction.objectStore("dids");
    const request = store.add({ location: location, uri: uri });
    request.onsuccess = function(event) {
        console.log("Did added: " + event.target.result);
    };

    transaction.onerror = (event) => {
        // エラー制御を忘れずに!
        console.error(event);
        return;
    };
}

export function getDid() {
    const transaction = db.transaction(["dids"], "readonly");
    const store = transaction.objectStore("dids");
    const request = store.count();
    request.onsuccess = () =>{
        console.log(request.result);
        return request.result;
    };

    transaction.onerror = (event) => {
        console.error(event);
        return 0;
    };
}

// export function getAll() {
//     const transaction = db.transaction(["dids"], "readonly");
//     const store = transaction.objectStore("dids");
//     const request = store.getAll();
//     request.onsuccess = () =>{
//         console.log(request.result);
//         return request.result;
//     };

//     transaction.onerror = (event) => {
//         console.error(event);
//         return 0;
//     };
// }

export function addKey(privateKey) {
    const transaction = db.transaction(["keys"], "readwrite");
    const store = transaction.objectStore("keys");
    const request = store.add({ privateKey: privateKey });
    request.onsuccess = function(event) {
        console.log("Key added: " + event.target.result);
    };

    transaction.onerror = (event) => {
        // エラー制御を忘れずに!
        console.error(event);
        return;
    };
}

export const getAll = () => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('dids', 'readonly');
        const store = transaction.objectStore('dids');
        const request = store.getAll();
  
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('Failed to get data');
    });
  };
  