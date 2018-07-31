import collectionsReducer from "./collectionsReducer";
import { getCollections, collectionsIsLoading, collectionsHasErrored } from "../actions/actions";

describe("collectionsReducer", () => {
  let mockState;

  beforeEach(() => {
    mockState = {};
  });

  it("should return initialState if there is no given state", () => {
    const actual = collectionsReducer(undefined, {});

    expect(actual).toEqual(mockState);
  });

  it("should return the collections object when it receives the correct action", () => {
    const payload = {
      "architecture design and graphics":
        [{
          "artist": "Tord Boontje",
          "category": "architecture design and graphics",
          "image_link": "https://s3.amazonaws.com/damcollections/68bd2286_8890/2000/2000_medium.jpg",
          "page_link": "https://denverartmuseum.org/object/2006.218",
          "title": "Horse with Flowers Drinking Glass from the Table Stories Dinnerware",
          "year": "2005"
        }],
      "asian":
        [{
          "artist": "India, southern",
          "category": "asian",
          "image_link": "https://s3.amazonaws.com/damcollections/85422afb_509/2000/2000_medium.jpg",
          "page_link": "https://denverartmuseum.org/object/1991.1012",
          "title": "Monkey God (Hanuman)",
          "year": "19th Century"
        }]
    };

    const actual = collectionsReducer(mockState, getCollections(payload));

    expect(actual).toEqual(payload);
  });

  it("should return a boolean when it receives the correct action", () => {
    const expected = {collectionsIsLoading: true};

    const actual = collectionsReducer(mockState, collectionsIsLoading(true));

    expect(actual).toEqual(expected);
  });

  it("should return the error when it receives the correct action", () => {
    const expected = {collectionsHasErrored: "error message"};

    const actual = collectionsReducer(mockState, collectionsHasErrored("error message"));

    expect(actual).toEqual(expected);
  });
});
