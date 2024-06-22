import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user', table => {
        table.increments('id')
        table.string('email').notNullable().unique()
        table.string('username').notNullable()
        table.string('password').notNullable()
        table.string('pin').notNullable()
        table.timestamps(true, true)
    })
    .createTable('account', table => {
        table.increments('id')
        table.decimal('balance', 2)
        table.integer('user_id').unsigned().references('user.id')
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user').dropTable('account')
}
