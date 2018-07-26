export const fetchCollections = () => {
  return fetch('/api/v1/collections')
    .then(results => results.json())
    .then(data => data)
    .catch(error => error.message)
};

export const fetchComments = () => {
  return fetch('/api/v1/comments')
    .then(results => results.json())
    .then(data => data)
    .catch(error => error.message)
}

export const sendCommentToDB = (comment) => {
  const request = {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      author_id: '1',
      artwork_id: '999',
      comment
    })
  }

  return fetch('/api/v1/comments', request)
  .then(results => results.json())
  .then(data => console.log(data))
  .catch(error => error.message)
}
