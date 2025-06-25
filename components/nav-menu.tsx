"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Twitter, Linkedin, GitHub } from "@/components/icons/icons";

const components = [
  {
    name: "GitHub",
    href: "https://github.com/yashrajvrma",
    icon: GitHub,
    description: "Check out our open-source projects and works",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/theyashrajverma/",
    icon: Linkedin,
    description: "Connect with us professionally to stay updated",
  },
  {
    name: "Twitter",
    href: "https://x.com/yashrajvrma",
    icon: Twitter,
    description: "Follow us for the latest update and announcement",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-x-4">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="border-none bg-transparent text-muted-foreground hover:text-foreground">
            Platform
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/about" title="About">
                Learn more about Breeze and our mission.
              </ListItem>
              <ListItem href="/privacy" title="Privacy">
                Read our privacy policy and data handling practices.
              </ListItem>
              <ListItem href="/terms" title="Terms of Service">
                Review our terms of service and usage guidelines.{" "}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="border-none bg-transparent text-muted-foreground hover:text-foreground">
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.name}
                  title={component.name}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger className="border-none bg-transparent text-muted-foreground hover:text-foreground">
            FAQ
          </NavigationMenuTrigger>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, href, title, children, ...props }, ref) => {
  return (
    <li>
      {/* <NavigationMenuLink asChild> */}
      <Link href={href!} legacyBehavior>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </Link>
      {/* </NavigationMenuLink> */}
    </li>
  );
});
ListItem.displayName = "ListItem";
