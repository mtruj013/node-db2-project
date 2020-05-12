
exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    //primary key  
    tbl.increments();

    tbl.string("VIN").notNullable().unique();
    tbl.string("brand").notNullable();
    tbl.string("make").notNullable();
    tbl.float("mileage").notNullable();
    tbl.string("trans-type");
    tbl.string("title-status");

    tbl.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
