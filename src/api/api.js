export const fetchCollections = () => {
  return fetch('/api/v1/collections')
    .then(results => results.json())
    .then(data => data)
};

