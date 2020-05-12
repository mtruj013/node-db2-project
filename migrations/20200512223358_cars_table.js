
exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    //primary key  
    tbl.increments();

    tbl.string("VIN").notNullable().unique();
    tbl.string("brand").notNullable();
    tbl.string("make").notNullable();
    tbl.float("mileage").notNullable();

    tbl.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
