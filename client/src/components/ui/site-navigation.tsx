
import * as React from "react";
import { useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function SiteNavigation() {
  const [, setLocation] = useLocation();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { label: "About Advocatr", path: "/about" },
    { label: "How to Use", path: "/how-to-use" },
    { label: "Exercises", path: "/dashboard" },
    { label: "Resources", path: "/resources" },
    { label: "Feedback", path: "/feedback" },
    { label: "Contact", path: "/contact" },
    { label: "Terms & Privacy", path: "/terms" },
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
          key={item.path}
          variant="ghost"
          size="sm"
          onClick={() => setLocation(item.path)}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
}
