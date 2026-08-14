import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
} from "./sidebar"
import {
  UtensilsCrossed,
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
} from "lucide-react"

const meta: Meta<typeof Sidebar> = {
  title: "UI/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  render: () => (
    <div className="flex h-screen bg-slate-50">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 text-orange-600">
            <UtensilsCrossed className="h-5 w-5" />
            <span>Rangoo Admin</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarItem isActive>
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </SidebarItem>
          
          <SidebarItem>
            <ShoppingCart className="h-4 w-4" />
            <span>Orders</span>
          </SidebarItem>
          
          <SidebarItem>
            <Users className="h-4 w-4" />
            <span>Customers</span>
          </SidebarItem>
          
          <SidebarItem>
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </SidebarItem>
        </SidebarContent>

        <SidebarFooter>
          <SidebarItem className="w-full text-slate-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </SidebarItem>
        </SidebarFooter>
      </Sidebar>
      
      {/* Mocking the rest of the application area */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Area</h1>
        <p className="mt-4 text-slate-500">
          This is where the main content of the dashboard goes.
        </p>
      </main>
    </div>
  ),
}
