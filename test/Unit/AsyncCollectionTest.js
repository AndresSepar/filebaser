const assert = require("chai").assert;

const FileBaser = require("./../../src/FileBaser"),
  Collection = require("./../../src/Collection/Collection");

describe("AsyncCollectionTest", () => {
  let db = new FileBaser("file-baser.json");

  before(() => {
    let collection = db.addCollection("datalist");
    collection.insert({ name: "Google Chrome", rate: 4.8 });
    collection.insert({ name: "Mozilla Firefox", rate: 4.9 });
    collection.insert({ name: "Opera", rate: 3.9 });
    collection.insert({ name: "Internet Explorer", rate: 2.1 });
    collection.flush();
  });

  describe("Doing something async way", () => {
    it("Should find data asynchronously", done => {
      db.getCollectionAsync("datalist").then(collection => {
        assert.instanceOf(collection, Collection);

        assert.equal(4, collection.find().count());

        done();
      });
    });
  });
});