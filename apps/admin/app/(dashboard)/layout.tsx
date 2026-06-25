import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar";
import { Separator } from "@workspace/ui/components/separator";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#fafafa]">
        <AppSidebar />
        <div className="flex flex-col w-full flex-1 min-w-0 overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-neutral-200/60 bg-white/50 backdrop-blur-md px-6 z-10 sticky top-0">
            <SidebarTrigger className="text-neutral-500 hover:text-neutral-900 transition-colors" />
            <Separator orientation="vertical" className="h-4 mx-2 bg-neutral-200" />
            <div className="text-sm font-medium text-neutral-600">Syon Admin Portal</div>
          </header>
          <main className="flex-1 overflow-auto p-6 md:p-8">
            <div className="mx-auto max-w-6xl w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
