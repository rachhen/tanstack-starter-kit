import { Link } from '@tanstack/react-router'
import {
  BookOpenIcon,
  BotIcon,
  LayoutDashboardIcon,
  Settings2Icon,
} from 'lucide-react'
import type { ComponentProps } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '#/components/ui/sidebar.tsx'
import { UserButton } from './auth/user/user-button'
import { Logo } from './logo'

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: <LayoutDashboardIcon />,
  },
  {
    title: 'Models',
    url: '#',
    icon: <BotIcon />,
  },
  {
    title: 'Documentation',
    url: '#',
    icon: <BookOpenIcon />,
  },
  {
    title: 'Settings',
    url: '/settings/account',
    icon: <Settings2Icon />,
  },
]

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    render={<Link to={item.url} />}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton side="right" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
