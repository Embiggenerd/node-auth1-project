
exports.up = function (knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments()

            tbl.text('name', 256)
                .notNullable()
                .unique()

            tbl.text('password', 256)
                .notNullable()
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('users')
};
