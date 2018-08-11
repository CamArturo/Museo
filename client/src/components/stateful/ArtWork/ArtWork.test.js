import React from "react";
import { ArtWork } from "./ArtWork";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

describe("ArtWork", () => {
  let wrapperMount;
  let wrapperShallow;
  let mockCategory;
  let mockArtwork;
  let mockComments;

  beforeEach(() => {
    mockCategory = "asian";
    mockArtwork = {
      artist: "China",
      category: "asian",
      id: 504,
      image_link: "https://s3.amazonaws.com/damcollections/416ebee8_8298/2000/2000_protected.jpg",
      page_link: "https://denverartmuseum.org/object/1992.559",
      title: "Silkworm",
      year: "n.d."
    };
    mockComments = [
      {artwork_id: 504, author_id: 2, comment: "hello"},
      {artwork_id: 3, author_id: 4, comment: "goodbye"}
    ];

    // wrapperMount = mount(
    //   // initialEntries feeds a location
    //   <MemoryRouter initialEntries={["/asian/502"]}>
    //     <ArtWork artwork={mockArtwork} category={mockCategory} />
    //   </MemoryRouter>
    // );

    wrapperShallow = shallow(
      <ArtWork
        artwork={mockArtwork}
        category={mockCategory}
      />, { disableLifecycleMethods: true }
    );
  });

  it.skip(" componentDidMount", async () => {
    wrapperShallow.setState({messages: ""});

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: () => Promise.resolve(mockComments)}));

    await wrapperShallow.instance().componentDidMount();

    expect(wrapperShallow.state("messages")).toBe(mockComments);
  });

  it.skip("should call handleFavorite when Add to favorites button is clicked", () => {
    const spy = spyOn(wrapperMount.instance(), "handleChange");

    wrapperMount.instance().forceUpdate();
    wrapperMount.find("button").simulate("click");

    expect(spy).toHaveBeenCalled();
  });

  it("should render all the elements", () => {
    expect(wrapperShallow.find(".artwork-page-container").length).toEqual(1);
  });
});
