const {collectionsData} = require("./data/data.js");

exports.seed = function (knex, Promise) {
  return knex("posts").del()
    .then(() => knex("collection").del())
    .then(() => {
      const unresolvedCollectionPromises = collectionsData.map(artWork => {
        return knex("collection").insert({
          title: artWork.title,
          artist: artWork.artist,
          year: artWork.year,
          category: artWork.category,
          page_link: artWork.page_link,
          image_link: artWork.image_link
        }, "id")
          .then(id => {
            const unresolvedPostPromises = artWork.comments.map(comment => {
              return knex("posts").insert({
                comment: comment,
                artwork_id: id[0]
              });
            });
            return Promise.all(unresolvedPostPromises);
          });
      });
      return Promise.all(unresolvedCollectionPromises);
    });
};
