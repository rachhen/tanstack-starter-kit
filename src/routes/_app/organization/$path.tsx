import { Organization } from '#/components/auth/organization/organization'
import { organizationPlugin } from '#/lib/auth/organization-plugin'
import { createFileRoute, notFound } from '@tanstack/react-router'

const validOrganizationPaths = Object.values(
  organizationPlugin().viewPaths.organization,
)

export const Route = createFileRoute('/_app/organization/$path')({
  beforeLoad({ params: { path } }) {
    if (!validOrganizationPaths.includes(path)) {
      throw notFound()
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { path } = Route.useParams()

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
      <Organization path={path} />
    </div>
  )
}
