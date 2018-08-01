import React from "react";
import { shallow } from "enzyme";
import { CollectionPage, mapStateToProps } from "./CollectionPage";

describe("CollectionPage", () => {
  let wrapper;
  let mockState;

  beforeEach(() => {
    mockState = {
      collections: {
        "architecture design and graphics": [{
          "id": 1,
          "title": "Horse with Flowers Drinking Glass from the Table Stories Dinnerware",
          "artist": "Tord Boontje",
          "year": "2005",
          "category": "architecture design and graphics",
          "page_link": "https://denverartmuseum.org/object/2006.218",
          "image_link": "https://s3.amazonaws.com/damcollections/68bd2286_8890/2000/2000_medium.jpg"
        }],
        "asian": [{
          "id": 2,
          "title": "Monkey God (Hanuman)",
          "artist": "India, southern",
          "year": "19th Century",
          "category": "asian",
          "page_link": "https://denverartmuseum.org/object/1991.1012",
          "image_link": "https://s3.amazonaws.com/damcollections/85422afb_509/2000/2000_medium.jpg"
        }]
      }
    };

    const match = {params: {category: "asian"}};

    wrapper = shallow(<CollectionPage
      collections={mockState.collections}
      match={match}
    />);

  });

  it("should return the prop object", () => {
    const expected = {collections: mockState.collections};

    const actual = mapStateToProps(mockState);

    expect(actual).toEqual(expected);
  });

  it("should render the correct amount of art pieces based data passed in props", () => {

    expect(wrapper.find(".artwork-item").length).toEqual(1);
  });

  it("should have all necessary props in order to render (id, artist, title, year, image_link, page_link", () => {

    expect(wrapper.find(".artwork-artist-tag").text()).toEqual("artist");
    expect(wrapper.find(".artwork-artist").text()).toEqual("India, southern");
    expect(wrapper.find(".artwork-title").text()).toEqual("Monkey God (Hanuman)");
    expect(wrapper.find(".artwork-year").text()).toEqual("19th Century");
    expect(wrapper.find("img").prop("src")).toEqual("https://s3.amazonaws.com/damcollections/85422afb_509/2000/2000_medium.jpg");

  });

  it("should not call displayCollection if there are no collections", () => {
    const match = {params: {category: "asian"}};
    
    wrapper = shallow(<CollectionPage
      collections={[]}
      match={match}
    />);

    expect(wrapper.find(".collection-page-container").length).toEqual(0)
  })
});
