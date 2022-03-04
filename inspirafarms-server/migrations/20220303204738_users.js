
exports.up = function(knex) {
    return knex.schema.createTable('userData', function(table) {
        table.increments();
        table.string('userName');
        table.string('companyName');
        table.string('coldRoomName');
        table.timestamps(true,true);
});
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('userData') 
};
