import { db } from '#/db'
import * as schema from '#/db/schema'
import { drizzleAdapter } from '@better-auth/drizzle-adapter' // you can use relation-v2
import { betterAuth } from 'better-auth'
import { lastLoginMethod } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema,
  }),
  advanced: {
    database: {
      joins: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [lastLoginMethod(), tanstackStartCookies()],
})
