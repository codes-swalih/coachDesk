import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ThemeProvider } from '@/components/theme-provider';
function SensaiDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SidebarProvider>
          <AppSidebar className="dark" />
          <SidebarInset>
            <div className=" p-10">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}

export default SensaiDashboardLayout;
