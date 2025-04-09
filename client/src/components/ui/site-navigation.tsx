
import * as React from "react";
import { useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export function SiteNavigation() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  const menuItems = [
    { label: "About Advocatr", path: "/about" },
    { label: "How to Use", path: "/how-to-use" },
    { label: "Exercises", path: "/dashboard" },
    { label: "Resources", path: "/resources" },
    { label: "Feedback", path: "/feedback" },
    { label: "Contact", path: "/contact" },
    { label: "Terms & Privacy", path: "/terms" },
  ];

  const NavigationItems = () => (
    <nav className="flex gap-1">
      {menuItems.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          className="text-sm font-medium transition-colors hover:text-primary"
          onClick={() => setLocation(item.path)}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <div className="flex flex-col gap-2 pt-6">
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
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden md:block">
      <NavigationItems />
    </div>
  );
}
