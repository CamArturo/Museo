export const fetchCollections = () => {
  return fetch('/api/v1/collections')
    .then(results => result.json())
    .then(data => data)
};