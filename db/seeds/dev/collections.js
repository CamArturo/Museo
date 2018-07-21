const {collectionsData} = require("./data/data.js");


// 'architecture, design and graphics' , 41 pages, https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1301&page=
//
// 'asian', 11 pages, https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1094&page=
//
// 'modern and contemporary art', 39 pages, https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1231&page=
//
// 'native arts', 37 pages, https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1073&page=
//
// 'new world', 161 pages, https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1115&page=
//
// 'painting and sculpture, 21 pages, https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1068&page=
//
// 'petrie institute of western american art', 41 pages, https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1061&page=
//
// 'photography', 85 pages, https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1121&page=
//
// 'textile art', 10 pages, https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1178&page=



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
