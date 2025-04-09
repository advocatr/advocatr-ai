
import * as React from "react";
import { useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUser } from "@/hooks/use-user";

export function SiteNavigation() {
  const [, setLocation] = useLocation();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { user, logout } = useUser();
  
  const menuItems = user ? [
    { label: "Exercises", path: "/dashboard" },
    { label: "Resources", path: "/resources" },
    { label: "Profile", path: "/profile" },
    ...(user.isAdmin ? [{ label: "Admin", path: "/admin/exercises" }] : []),
    { label: "Logout", onClick: () => logout(), variant: "ghost" as const }
  ] : [
    { label: "About Advocatr", path: "/about" },
    { label: "How to Use", path: "/how-to-use" },
    { label: "Resources", path: "/resources" },
    { label: "Contact", path: "/contact" },
    { label: "Sign In", path: "/auth", variant: "ghost" as const },
    { label: "Get Started", path: "/auth" }
  ];

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[200px] sm:w-[240px]">
          <nav className="flex flex-col gap-2 pt-4">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="justify-start"
                onClick={() => setLocation(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden md:flex items-center gap-1">
      {menuItems.map((item) => (
        <Button
          key={item.path || item.label}
          variant={item.variant || "ghost"}
          size="sm"
          onClick={item.onClick || (() => setLocation(item.path))}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
}
