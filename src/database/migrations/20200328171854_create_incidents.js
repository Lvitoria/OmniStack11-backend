//insere a tabela
exports.up = function(knex) {
    //cria a tabela com seus campos
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        //chave segundaria
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');
        table.timestamps();
      })
};

//deleta a tabela
exports.down = function(knex) {
    return knex.schema.dropTable('incidents')
};
