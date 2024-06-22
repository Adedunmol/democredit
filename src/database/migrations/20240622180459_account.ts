import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('account', table => {
        table.increments('id')
        table.decimal('balance', 2)
        table.bigInteger('user_id').references('id').inTable('users')
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('account')
}

