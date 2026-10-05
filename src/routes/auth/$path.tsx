import { Auth } from '#/components/auth/auth'
import { viewPaths } from '@better-auth-ui/core'
import { createFileRoute, redirect } from '@tanstack/react-router'

const validAuthPathSegments = new Set([
  ...Object.values(viewPaths.auth),
  // magicLinkPlugin().viewPaths.auth.magicLink,
])

export const Route = createFileRoute('/auth/$path')({
  beforeLoad({ params: { path } }) {
    if (!validAuthPathSegments.has(path)) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { path } = Route.useParams()

  return (
    <div className="flex justify-center items-center p-4 md:p-6 h-screen">
      <Auth path={path} />
    </div>
  )
}
