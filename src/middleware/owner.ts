import { createMiddleware } from '@tanstack/react-start'

import { getOrCreateOwner } from '#/server/owner.server'
import { authMiddleware } from './auth'

export const ownerMiddleware = createMiddleware()
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    const userId = context.session.userId
    const organizationId = context.session.activeOrganizationId

    const owner = await getOrCreateOwner(userId, organizationId)

    return next({ context: { owner } })
  })
