import { sql } from 'drizzle-orm'
import {
  boolean,
  check,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'
import { organizations, users } from './auth-schema'

export * from './auth-schema'

export const ownerTypes = ['user', 'organization'] as const
export type OwnerType = (typeof ownerTypes)[number]
export const owners = pgTable(
  'owners',
  {
    id: uuid().defaultRandom().primaryKey(),
    type: text().$type<OwnerType>().notNull().default('user'),
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    organizationId: text('organization_id').references(() => organizations.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('owners_user_personal_uidx')
      .on(table.userId)
      .where(sql`${table.organizationId} IS NULL`),

    uniqueIndex('owners_user_organization_uidx')
      .on(table.userId, table.organizationId)
      .where(sql`${table.organizationId} IS NOT NULL`),

    index('owners_organization_id_idx').on(table.organizationId),

    check(
      'owners_type_check',
      sql`(
        (${table.type} = 'user'
          AND ${table.organizationId} IS NULL)
        OR
        (${table.type} = 'organization'
          AND ${table.organizationId} IS NOT NULL)
      )`,
    ),
  ],
)

export const todos = pgTable('todos', {
  id: uuid().defaultRandom().primaryKey(),
  ownerId: uuid().references(() => owners.id),
  title: text().notNull(),
  done: boolean().notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
})
