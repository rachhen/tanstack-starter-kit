import { db, schema } from '#/db'
import { and, eq, isNull } from 'drizzle-orm'

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
