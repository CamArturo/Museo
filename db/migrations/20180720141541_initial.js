exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable("collection", table => {
      table.increments("id").primary();
      table.string("title");
      table.string("artist");
      table.string("year");
      table.string("category");
      table.string("page_link");
      table.string("image_link");
    }),

    knex.schema.createTable("users", table => {
      table.increments("id").primary();
      table.string("name");
      table.string("email");
    }),

    knex.schema.createTable("posts", table => {
      table.increments("id").primary();
      table.string("comment");
      table.integer("artwork_id").unsigned();
      table.foreign("artwork_id")
        .references("collection.id");
      table.integer("author_id").unsigned();
      table.foreign("author_id")
        .references("users.id");

      table.timestamps(true, true);
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable("posts"),
    knex.schema.dropTable("collection"),
    knex.schema.dropTable("users")
  ]);
};
