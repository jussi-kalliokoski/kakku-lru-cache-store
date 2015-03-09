"use strict";

const NAME = "LruCacheStore";

class LruCacheStore {
    constructor ({ client }) {
        if ( !client ) {
            throw new Error("An instance of LRU is required as a `client`");
        }

        this.client = client;
    }

    set (key, value) {
        return new Promise((resolve) => {
            this.client.set(key, {
                data: value.data,
                expires: Date.now() + value.ttl,
            });
            resolve();
        });
    }

    get (key) {
        return new Promise((resolve) => {
            if ( this.client.has(key) ) {
                let value = this.client.get(key);
                resolve({
                    source: NAME,
                    data: value.data,
                    ttl: value.expires - Date.now(),
                });
                return;
            }

            resolve(null);
        });
    }
}

export { LruCacheStore };
