import { Link, useNavigate } from '@tanstack/react-router'
import { ThemeProvider, useTheme } from 'next-themes'
import type { ReactNode } from 'react'

import { authClient } from '#/lib/auth-client'
import { deleteUserPlugin } from '#/lib/auth/delete-user-plugin'
import { lastLoginMethodPlugin } from '#/lib/auth/last-login-method-plugin'
import { organizationPlugin } from '#/lib/auth/organization-plugin'
import { themePlugin } from '#/lib/auth/theme-plugin'

import { organizationPermissions } from '#/lib/organization-access'
import { AuthProvider } from './auth/auth-provider'
import { Toaster } from './ui/sonner'
import { TooltipProvider } from './ui/tooltip'

export function Providers({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider
        authClient={authClient}
        redirectTo="/dashboard"
        socialProviders={[]}
        emailAndPassword={{ requireEmailVerification: false }}
        navigate={navigate}
        plugins={[
          themePlugin({ useTheme }),
          deleteUserPlugin(),
          lastLoginMethodPlugin(),
          organizationPlugin({
            allowMultipleRoles: false,
            dynamicAccessControl: {
              enabled: true,
              permissions: organizationPermissions,
            },
          }),
        ]}
        Link={({ href, ...props }) => <Link to={href} {...props} />}
      >
        <TooltipProvider>{children}</TooltipProvider>

        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}
