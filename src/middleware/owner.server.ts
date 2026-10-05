import { createMiddleware } from '@tanstack/react-start'
import { and, eq, isNull } from 'drizzle-orm'

import { db, schema } from '#/db'
import { authMiddleware } from './auth'

export const ownerMiddleware = createMiddleware()
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    const userId = context.session.userId
    const organizationId = context.session.activeOrganizationId

    const owner = await getOrCreateOwner(userId, organizationId)

    return next({ context: { owner } })
  })

export async function getOrCreateOwner(
  userId: string,
  organizationId?: string | null,
) {
  const existing = await db.query.owners.findFirst({
    where: organizationId
      ? and(
          eq(schema.owners.userId, userId),
          eq(schema.owners.organizationId, organizationId),
        )
      : and(
          eq(schema.owners.userId, userId),
          isNull(schema.owners.organizationId),
        ),
  })

  console.log(existing)

  if (existing) {
    return existing
  }

  const [owner] = await db
    .insert(schema.owners)
    .values({
      userId,
      organizationId: organizationId ?? null,
      type: organizationId ? 'organization' : 'user',
    })
    .returning()

  return owner
}
