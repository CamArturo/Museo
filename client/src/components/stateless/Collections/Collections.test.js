import React from "react";
import { shallow } from "enzyme";
import { Collections, mapStateToProps } from "./Collections";

describe("collections", () => {
  it("should return the prop object with collections as a key", () => {

    const mockState = {
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

    const mappedProps = mapStateToProps(mockState);

    const expected = {collections: mockState.collections};

    expect(mappedProps).toEqual(expected);
  });

  it("should render the prop object keys", () => {
    const mockCollections = {a: "A", b: "B", c: "C"};

    const wrapper = shallow(<Collections
      collections={mockCollections}
    />);

    expect(wrapper.find(".nav").length).toEqual(3);
  });

  it.skip("should replaces the key with spaces with underscores", () => {
    const mockCollections = {"A a": "A"};

    const wrapper = shallow(<Collections
      collections={mockCollections}
    />);

    const nav = wrapper.find(".nav");
    console.log(nav.html());
    expect(nav.text()).to.equal("OK");

    // expect(wrapper.find('button[class="btn btn-primary"]').text()).to.equal('OK');
    // expect(wrapper.find(".nav").text()).to.equal('OK');
  });
});