import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('account', table => {
        table.decimal('balance', 15, 2).alter()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('account', table => {
        table.decimal('balance', 2).alter()
    })
}

