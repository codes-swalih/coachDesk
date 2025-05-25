import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
function SensaiDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar className="dark" />
        <SidebarInset>
          <div className=" p-10">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default SensaiDashboardLayout;
