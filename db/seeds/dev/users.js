const {usersData} = require("./data/data.js");

exports.seed = function (knex, Promise) {
  return knex("users").del()
    .then(() => {
      const unresolvedUserPromises = usersData.map(user => {
        return knex("users").insert({
          name: user.name,
          email: user.email
        }, "id")
          .then(id => {
            const unresolvedPromises = user.comments.map(comment => {
              return knex("posts").select().where("comment", comment)
                .update({author_id: parseInt(id)});
            });

            return Promise.all(unresolvedPromises);
          });
      });
      return Promise.all(unresolvedUserPromises);
    });
};