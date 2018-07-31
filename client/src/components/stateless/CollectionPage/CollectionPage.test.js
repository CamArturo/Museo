import React from 'react';
import { shallow } from 'enzyme';
import CollectionPage, { mapStateToProps } from './CollectionPage';

describe('CollectionPage', () => {
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
    
    wrapper = shallow(<CollectionPage collections={mockState.collections}/>)
  });

  it('should return the prop object', () => {
    const expected = {collections: mockState.collections}

    const actual = mapStateToProps(mockState);

    expect(actual).toEqual(expected);
 
  });

  it('should render the data passed in props', () => {
    
  });
});
