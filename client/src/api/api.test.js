import { fetchCollections, fetchComments, sendCommentToDB } from './api';

describe('fetchCollections', () => {
  let mockResults;

  beforeEach(() => {
    mockResults = [
      {
        "artist": "Tord Boontje",
        "image_link": "https://s3.amazonaws.com/damcollections/68bd2286_8890/2000/2000_medium.jpg",
        "page_link": "https://denverartmuseum.org/object/2006.218",
        "title": "Horse with Flowers Drinking Glass from the Table Stories Dinnerware",
        "year": "2005",
        "category": "architecture design and graphics"
      },
      {
        "artist": "India, southern",
        "image_link": "https://s3.amazonaws.com/damcollections/85422afb_509/2000/2000_medium.jpg",
        "page_link": "https://denverartmuseum.org/object/1991.1012",
        "title": "Monkey God (Hanuman)",
        "year": "19th Century",
        "category": "asian"
      }
    ];

    window.fetch = jest.fn().mockImplementation(()=> Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockResults)
    }));
  });

  it('should call fetch with the correct params', () => {
    const expected = '/api/v1/collections';

    fetchCollections();

    expect(window.fetch).toHaveBeenCalledWith(expected);
  });

  it('should return the array data as an object with categories as keys, if status code is ok', async () => {
    const expected =  {
      "architecture design and graphics": 
        [{
          "artist": "Tord Boontje", 
          "category": "architecture design and graphics", 
          "image_link": "https://s3.amazonaws.com/damcollections/68bd2286_8890/2000/2000_medium.jpg",
          "page_link": "https://denverartmuseum.org/object/2006.218", 
          "title": "Horse with Flowers Drinking Glass from the Table Stories Dinnerware", 
          "year": "2005"}], 
      "asian": 
        [{
          "artist": "India, southern", 
          "category": "asian", 
          "image_link": "https://s3.amazonaws.com/damcollections/85422afb_509/2000/2000_medium.jpg", 
          "page_link": "https://denverartmuseum.org/object/1991.1012", 
          "title": "Monkey God (Hanuman)", 
          "year": "19th Century"}]
    }

    await expect(fetchCollections()).resolves.toEqual(expected)
  });

  it('should throw an error if the status code is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({status:500}));

    const expected = 'results.json is not a function';

    await expect(fetchCollections()).resolves.toEqual(expected);
  });
});

describe('fetchComments', () => {
  let mockResults;

  beforeEach(() => {
    mockResults = [
      {
        "comment": "Lovely!",
        "artwork_id": 1,
        "author_id": 3
      },
      {
        "comment": "Hmmm...",
        "artwork_id": 2,
        "author_id": 4
      }
    ];

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockResults)
    }));
  });

  it('should call fetch with the correct params', () => {
    const expected = '/api/v1/comments';

    fetchComments();

    expect(window.fetch).toHaveBeenCalledWith(expected);
  });

  it('should return the array of comment objects if status is ok', async () => {
    const expected = mockResults;

    await expect(fetchComments()).resolves.toEqual(expected);
  });

  it('should throw an error if the status is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({status: 500}));

    const expected = 'results.json is not a function';

    await expect(fetchCollections()).resolves.toEqual(expected);
  });
});

describe('sendCommentToDB', () => {
  let mockComment;

  beforeEach(() => {
    mockComment = {
      author_id: '1',
      artwork_id: 5,
      comment: 'Ah!'
    }

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 201,
      json: () => Promise.resolve({
         message: 'Comment was added to art with id: 5'
      })
    }))
  });

  it('should call fetch with the correct params', () => {
    const expected = ['/api/v1/comments', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockComment)
    }];

    sendCommentToDB("Ah!", 5);

    expect(window.fetch).toHaveBeenCalledWith(...expected)
  });

  it('throws an error if status code is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({status: 500}));

    const expected = 'results.json is not a function';

    await expect(sendCommentToDB("Ah!", 5)).resolves.toEqual(expected);
  });

});
