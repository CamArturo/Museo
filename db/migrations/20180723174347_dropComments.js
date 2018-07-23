exports.up = function (knex, Promise) {
  return knex.schema.table("collection", table => {
    table.dropColumn("comments");
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.table("collection", table => {
    table.string("comments");
  })
};