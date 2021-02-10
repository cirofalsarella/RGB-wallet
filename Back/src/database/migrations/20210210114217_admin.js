const { table } = require("../connection");

exports.up = function(knex) {
    return knex.schema.createTable('admin', (table) => {
        table.string('username').primary();
        table.string('password').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('admin');
};
