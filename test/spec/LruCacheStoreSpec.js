"use strict";

var LRU = require("lru-cache");
var { LruCacheStore } = require("../..");

describe("LruCacheStore", function () {
    var client;
    var store;
    var result;

    beforeEach(function () {
        client = LRU();
        store = new LruCacheStore({ client });
    });

    describe("when initialized without a client", function () {
        var error;

        beforeEach(function () {
            try {
                new LruCacheStore({});
            } catch (err) {
                error = err;
            }
        });

        it("should throw an error", function () {
            error.should.be.an.instanceOf(Error);
        });
    });

    describe(".set()", function () {
        beforeEach(function () {
            return store.set("foo", {
                data: { bar: "meow" },
                ttl: 1000,
            }).then(function () {
                result = client.get("foo");
            });
        });

        it("should assign expires", function () {
            result.expires.should.be.at.least(Date.now());
            result.expires.should.be.at.most(Date.now() + 1000);
        });

        it("should put in the correct data", function () {
            result.data.bar.should.equal("meow");
        });
    });

    describe(".get()", function () {
        describe("when there is data", function () {
            beforeEach(function () {
                client.set("foo", {
                    data: { bar: "meow" },
                    expires: Date.now() + 1000,
                });
                return store.get("foo").then(function (data) {
                    result = data;
                });
            });

            it("should return the correct data", function () {
                result.data.bar.should.equal("meow");
            });

            it("should return a ttl", function () {
                result.ttl.should.be.gt(0);
                result.ttl.should.be.at.most(1000);
            });

            it("should return LruCacheStore as the source", function () {
                result.source.should.equal("LruCacheStore");
            });
        });

        describe("when there is no data", function () {
            beforeEach(function () {
                return store.get("foo").then(function (data) {
                    result = data;
                });
            });

            it("should return null", function () {
                expect(result).to.equal(null);
            });
        });
    });
});
