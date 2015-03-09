# kakku-lru-cache-store

[![Build Status](https://travis-ci.org/jussi-kalliokoski/kakku-lru-cache-store.svg)](https://travis-ci.org/jussi-kalliokoski/kakku-lru-cache-store)
[![Coverage Status](https://img.shields.io/coveralls/jussi-kalliokoski/kakku-lru-cache-store.svg)](https://coveralls.io/r/jussi-kalliokoski/kakku-lru-cache-store)

An [lru-cache](https://github.com/isaacs/node-lru-cache)-backed in memory store for [kakku](https://github.com/jussi-kalliokoski/kakku-lru-cache-store).

## Usage

```javascript
var LRU = require("lru-cache");
var Kakku = require("kakku").Kakku;
var LruCacheStore = require("kakku-lru-cache-store").LruCacheStore;

var kakku = new Kakku({
    ...
    store: new LruCacheStore({ client: new LRU({ max: 500 }) }),
});
```

### Development

Development is pretty straightforward, it's all JS and the standard node stuff works:

To install dependencies:

```bash
$ npm install
```

To run the tests:

```bash
$ npm test
```

Then just make your awesome feature and a PR for it. Don't forget to file an issue first, or start with an empty PR so others can see what you're doing and discuss it so there's a a minimal amount of wasted effort.
