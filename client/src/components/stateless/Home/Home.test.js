import React from "react";
import { shallow } from "enzyme";
import { Home } from "./Home";
import { Collections } from "../Collections/Collections";

describe("Home", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it("should have cta", () => {
    expect(wrapper.find(".cta").length).toEqual(1);
  });
  it("should have login", () => {
    expect(wrapper.find(".login").length).toEqual(1);
  });
  it("should have art-museum", () => {
    expect(wrapper.find(".art-museum").length).toEqual(1);
  });
  it("should have info-box", () => {
    expect(wrapper.find(".info-box").length).toEqual(1);
  });
  it("should have search-collections element", () => {
    expect(wrapper.find(".search-collections").length).toEqual(1);
  });
  it.skip("typing in .search-titles-input should update state", () => {
    const expected = "Face Maze";
    const mockEvent = {target: {value: "Face Maze"}};
    wrapper.find(".search-titles-input").simulate("change", mockEvent);
    expect(wrapper.state("userInputSearch")).toEqual(expected);
  });
  it.skip("should setState if suggestions exist", () => {
    const suggestions = [ 'face maze: tera' ];

  });
});


