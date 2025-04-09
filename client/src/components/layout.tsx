
import { Logo } from "@/components/ui/logo";
import { SiteNavigation } from "@/components/ui/site-navigation";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center gap-4">
            <a href="/" className="flex items-center cursor-pointer hover:opacity-90 transition-opacity shrink-0">
              <Logo className="mr-2" />
              <h1 className="text-xl font-bold">Advocatr</h1>
            </a>
            <div className="flex-1 flex justify-end">
              <SiteNavigation />
            </div>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
