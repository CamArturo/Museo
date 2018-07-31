const collection =
  [
    {
      "artist": "Tord Boontje",
      "image_link": "https://s3.amazonaws.com/damcollections/68bd2286_8890/2000/2000_medium.jpg",
      "page_link": "https://denverartmuseum.org/object/2006.218",
      "title": "Horse with Flowers Drinking Glass from the Table Stories Dinnerware",
      "year": "2005",
      "category": "architecture design and graphics",
      "comments": [{author_id: 1, comment: "That's a glass!"},{author_id: 2, comment: "I'd drink from that."}]
    },
    {
      "artist": "India, southern",
      "image_link": "https://s3.amazonaws.com/damcollections/85422afb_509/2000/2000_medium.jpg",
      "page_link": "https://denverartmuseum.org/object/1991.1012",
      "title": "Monkey God (Hanuman)",
      "year": "19th Century",
      "category": "asian",
      "comments": [{author_id: 3, comment: "I dig it."}]
    }
  ];

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
                return knex("posts").insert(Object.assign(comment, {artwork_id: id[0]}));
            });
            return Promise.all(unresolvedPostPromises);
          })
          .catch(error => console.log(`OOPS!: ${error}`));
      });
      return Promise.all(unresolvedCollectionPromises);
    })
    .catch(error => console.log(`OOPS!: ${error}`));
};
