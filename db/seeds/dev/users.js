const usersData = [
  {name: 'Gene Belcher', email: 'queenoffarts@gmail.com'},
  {name: 'Louise Belcher', email: 'mcsheisty@gmail.com'},
  {name: 'Tina Belcher', email: 'zombiebutts@gmail.com'}
]

exports.seed = function (knex, Promise) {
  return knex("users").del()
    .then(() => {
      const unresolvedUserPromises = usersData.map(user => {
        return knex("users").insert({
          name: user.name,
          email: user.email
        }, "id")
          .then(id => {
            if (user.comments) {
              const unresolvedCommentsPromises = user.comments.map(comment => {
                return knex("posts").select().where("comment", comment)
                  .update({author_id: parseInt(id)});
              });
              return Promise.all(unresolvedCommentsPromises);
            }

          })
          .catch(error => console.log(`OOPS!: ${error}`));
      });
      return Promise.all(unresolvedUserPromises);
    })
    .catch(error => console.log(`OOPS!: ${error}`));
};
