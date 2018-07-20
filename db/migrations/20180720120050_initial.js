exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable("authors", function (table) {
      table.increments("id").primary();
      table.string("name");
      table.string("email");
      table.timestamps(true, true);
    }),
    knex.schema.createTable("collections", function (table) {
      table.increments("id").primary();
      table.string("title");
      table.string("artist");
      table.string("category");
      table.string("year");
      table.string("page_link");
      table.string("image_link");
      table.timestamps(true, true);
    }),
    knex.schema.createTable("posts", function (table) {
      table.increments("id").primary();
      table.string("comment");
      table.string("");
      table.integer("author_id").unsigned();

      table.foreign("author_id")
        .references("authors.id");

      table.integer("collections_id").unsigned();

      table.foreign("collections_id")
        .references("collections.id");
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("posts"),
    knex.schema.dropTable("collections"),
    knex.schema.dropTable("authors")
  ]);
};