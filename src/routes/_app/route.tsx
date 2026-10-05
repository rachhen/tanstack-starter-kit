import { AppSidebar } from '#/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '#/components/ui/sidebar'
import { auth } from '#/lib/auth'
import { authClient } from '#/lib/auth-client'
import { ensureSession } from '@better-auth-ui/core'
import { ensureSessionServer } from '@better-auth-ui/core/server'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'

export const Route = createFileRoute('/_app')({
  async beforeLoad({ context: { queryClient }, location }) {
    const ensureSessionIso = createIsomorphicFn()
      .server(() =>
        ensureSessionServer(queryClient, auth, {
          headers: getRequestHeaders(),
        }),
      )
      .client(() => ensureSession(queryClient, authClient))

    const session = await ensureSessionIso()
    if (!session) {
      throw redirect({
        to: '/auth/$path',
        params: { path: 'sign-in' },
        search: { redirectTo: location.href },
      })
    }

    return { session }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
