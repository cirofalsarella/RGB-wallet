exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.string('user_name').primary();
        table.string('name').notNullable();
        table.boolean('sold').notNullable();
        table.boolean('working').notNullable();
        table.integer('weeks_10h').notNullable();
        table.decimal('sum').notNullable();
        
    });
};

exports.down = function(knex) {
  knex.schema.dropTable('users');
};
