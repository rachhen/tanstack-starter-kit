import { OrganizationSwitcher } from './auth/organization/organization-switcher'

export const AppHeader = () => {
  return (
    <div className="px-4 py-1 border-b">
      <OrganizationSwitcher />
    </div>
  )
}
