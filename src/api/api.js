export const fetchCollections = () => {
  return fetch('/api/v1/collections')
    .then(results => results.json())
    .then(data => data)
};

// export const sendCommentToDB = (comment) => {
//   return fetch('/api/v1/comments', {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       author_id: 999,
//       artwork_id: 999,
//       comment
//     })
//   })
// }

