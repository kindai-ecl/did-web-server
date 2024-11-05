const document = window.indexedDB.open("didDocument", 1);  
var db;

document.onupgradeneeded = function(event) {
    console.log("Upgrade needed: " + event.target.result);

    var db = event.target.result;
    const did = db.createObjectStore("dids", { keyPath: "id" });
    const keys = db.createObjectStore("keys", { keyPath: "id" });

    did.createIndex("location", "location", { unique: true });
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
    db.version;
    useDatabase(db);

    db.close();
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
