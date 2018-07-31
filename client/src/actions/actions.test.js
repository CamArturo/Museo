import { getCollections, collectionsIsLoading, collectionsHasErrored } from "./actions.js";

describe("should pass all actions tests", () => {
  describe("getCollections action", () => {
    it("should have a type of GET_COLLECTIONS and return a payload of COLLECTIONS", () => {
      const mockData = [{"id": 1},{"id": 2}];

      const expected = {
        type: "GET_COLLECTIONS",
        collections: mockData
      };

      const actual = getCollections(mockData);

      expect(expected).toEqual(actual);
    });
  });
  describe("getCollections action", () => {
    it("should have a type of COLLECTIONS_IS_LOADING and return a payload of boolean", () => {
      const mockData = true;

      const expected = {"bool": true, "type": "COLLECTIONS_IS_LOADING"}

      const actual = collectionsIsLoading(mockData);

      expect(expected).toEqual(actual);
    });
  });
  describe("getCollections action", () => {
    it("should have a type of GET_COLLECTIONS and return a payload of COLLECTIONS", () => {
      const mockData = true;

      const expected = {"error": true, "type": "COLLECTIONS_HAS_ERRORED"};

      const actual = collectionsHasErrored(mockData);

      expect(expected).toEqual(actual);
    });
  });
});