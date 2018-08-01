import React from "react";
import { ArtWork } from "./ArtWork";
import { shallow, mount } from "enzyme";

describe("ArtWork", () => {
  let wrapper;
  let mockProps = {
    title: "Cats",
    id: 9,
    artist: "gundy"
  };

  beforeEach(() => {
    const match = {params: {category: "asian"}};

    wrapper = shallow(
      <ArtWork
        artwork={mockProps}
        match={{match}}
      />
    );
  });

  it("should call handleChange when button of handle-change is called", () => {
    const spy = spyOn(wrapper.instance(), "handleChange");

    wrapper.instance().forceUpdate();

    wrapper.find(".handle-change-btn").simulate("click");

    expect(spy).toHaveBeenCalled();
  });
});

// user name is changing state
// test component did mount
// mouch functions/// handle change sendComment
// handleChange
// test sendComment