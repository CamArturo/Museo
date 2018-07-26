const collection = require('../../data')

exports.seed = function (knex, Promise) {
  return knex("posts").del()
    .then(() => knex("collection").del())
    .then(() => {
      const unresolvedCollectionPromises = collection.map(artWork => {
        return knex("collection").insert({
          title: artWork.title,
          artist: artWork.artist,
          year: artWork.year,
          category: artWork.category,
          page_link: artWork.page_link,
          image_link: artWork.image_link
        }, "id")
          .then(id => {
            if (artWork.comments) {
              const unresolvedPostPromises = artWork.comments.map(comment => {
                return knex("posts").insert({
                  comment,
                  artwork_id: id[0]
                });
              });
              return Promise.all(unresolvedPostPromises);
            }
          })
          .catch(error => console.log(`OOPS!: ${error}`));
      });
      return Promise.all(unresolvedCollectionPromises);
    })
    .catch(error => console.log(`OOPS!: ${error}`));
};