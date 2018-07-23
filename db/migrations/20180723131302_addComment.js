
exports.up = function(knex, Promise) {
  return knex.schema.table("collection", table => {
    table.specificType('comments', 'text ARRAY');
  })
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable("posts"),
    knex.schema.dropTable("collection"),
    knex.schema.dropTable("users")
  ]);
};