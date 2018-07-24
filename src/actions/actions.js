export const getCollections = (collections) => ({
  type: 'GET_COLLECTION',
  collections
});

export const collectionsIsLoading = (bool) => ({
  type: 'COLLECTIONS_IS_LOADING',
  bool
});

export const collectionsHasErrored = (error) => ({
  type: 'COLLECTIONS_HAS_ERRORED',
  error
});

