
import * as React from "react";
import { useLocation } from "wouter";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function SiteNavigation() {
  const [, setLocation] = useLocation();

  const menuItems = [
    { label: "About Advocatr", path: "/about" },
    { label: "How to Use", path: "/how-to-use" },
    { label: "Exercises", path: "/dashboard" },
    { label: "Resources", path: "/resources" },
    { label: "Feedback", path: "/feedback" },
    { label: "Contact", path: "/contact" },
    { label: "Terms & Privacy", path: "/terms" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={() => setLocation(item.path)}
            >
              {item.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
