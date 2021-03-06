//insere a tabela
exports.up = function(knex) {
    //cria a tabela com seus campos
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.timestamps();
      })
};

//deleta a tabela
exports.down = function(knex) {
    return knex.schema.dropTable('ongs')
};
