"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../public/assets/img/logo.png";
import {
  LayoutDashboard,
  GraduationCap,
  CreditCard,
  Landmark,
  LibraryBig,
  Globe,
  UserRound,
  AppWindow,
  Sliders,
} from "lucide-react";

import Image from "next/image";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const routes = [
    {
      href: "/overview",
      label: "Overview",
      active: pathname === "/overview",
      icon: <LayoutDashboard size={20} />,
    },
    {
      href: "/students",
      label: "Students",
      active: pathname === "/students",
      icon: <GraduationCap size={20} />,
    },
    {
      href: "/payments",
      label: "Payments",
      active: pathname === "/payments",
      icon: <CreditCard size={20} />,
    },
    {
      href: "/universities",
      label: "Universities",
      active: pathname === "/universities",
      icon: <Landmark size={20} />,
    },
    {
      href: "/courses",
      label: "Courses",
      active: pathname === "/courses",
      icon: <LibraryBig size={20} />,
    },
    {
      href: "/countries",
      label: "Countries",
      active: pathname === "/countries",
      icon: <Globe size={20} />,
    },
    {
      href: "/agents",
      label: "Agents",
      active: pathname === "/agents",
      icon: <UserRound size={20} />,
    },
    {
      href: "/applications",
      label: "Applications",
      active: pathname === "/applications",
      icon: <AppWindow size={20} />,
    },
    {
      href: "/settings",
      label: "Settings",
      active: pathname === "/settings",
      icon: <Sliders size={20} />,
    },
  ];
  return (
    <nav className={cn("bg-[#FFE49B] pt-8", className)}>
      <div className="bg-white w-28 h-28 mx-auto text-center rounded-full relative mb-8 shadow-xl">
        <Image
          src={logo}
          className="mx-auto absolute top-2/4 translate-y-[-50%] left-0 right-0"
          alt="logo"
        />
      </div>
      <ul className="w-full py-2 ml-4">
        {routes.map((route) => (
          <li
            key={route.href}
            className={cn(
              "py-2 my-1 px-4 rounded-l-3xl",
              route.active ? "bg-white" : ""
            )}
          >
            <Link
              href={route.href}
              className={cn(
                "text-lg font-medium transition-colors hover:text-black flex items-center self-center",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-forground"
              )}
            >
              <span className="pr-2 text-sm">{route.icon}</span>
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
