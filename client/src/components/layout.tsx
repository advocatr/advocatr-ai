
import { Logo } from "@/components/ui/logo";
import { SiteNavigation } from "@/components/ui/site-navigation";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center cursor-pointer hover:opacity-90 transition-opacity shrink-0">
              <Logo className="mr-2" />
              <h1 className="text-xl font-bold">Advocatr</h1>
            </a>
            <SiteNavigation />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Advocatr. All rights reserved.</p>
          <a href="/terms" className="text-sm hover:text-gray-700 transition-colors mt-2 inline-block">
            Terms & Privacy
          </a>
        </div>
      </footer>
    </div>
  );
}
