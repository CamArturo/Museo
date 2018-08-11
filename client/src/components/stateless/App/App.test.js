import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import { shallow } from 'enzyme';
import {App, mapStateToProps, mapDispatchToProps } from './App';
import { getCollections } from '../../../actions/actions';

describe('mSTP, mSTD', () => {
  it('should return collections objects', () => {
    const mockState = {
      collections: {
        category: 'art'
      }
    };
    const expected = {collections: {category: 'art'}};
    const actual = mapStateToProps(mockState);

    expect(actual).toEqual(expected);

  });

  it('calls dispatch with getCollections action', () => {
    const dispatch = jest.fn();
    const actionToDispatch = getCollections();
    const mappedProps = mapDispatchToProps(dispatch);

    mappedProps.getCollections()

    expect(dispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});

describe('App', () => {
  let wrapper;
  let mockCollections;
  let mockGetCollections;

  beforeEach(() => {
    mockCollections = { category: 'art' };
    mockGetCollections = jest.fn();

    wrapper = shallow(<App 
      collections={mockCollections} 
      getCollections={mockGetCollections}/>
    );
  }); 


  describe('componentDidMount', () => {
    it('should call getCollections on componentDidMount', async ()=> {

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({status: 200}));

      await wrapper.instance().componentDidMount();

      expect(mockGetCollections).toHaveBeenCalled();
    });
  });

  describe('Render Elements', () => {
    it(' should render all the elements', () => {
      expect(wrapper.find('.App').length).toBe(1);
      expect(wrapper.find('.App-header').length).toBe(1);
      expect(wrapper.find('.home-link').length).toBe(1);
      expect(wrapper.find('.app-title').length).toBe(1);
    });

    it("should wait until props.collections is defined to return the switch", () => {
      wrapper = shallow(<App 
        collections={[]} 
        getCollections={jest.fn()}/>
      );

      expect(wrapper.find('Switch').length).toEqual(0);
   });
  });
});
