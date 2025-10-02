"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Tag,
  Layers,
  Ticket,
  User,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    label: "Products",
    icon: Package,
    children: [
      { href: "/admin/product/all", label: "All Products" },
      { href: "/admin/product/add", label: "Add Product" },
    ],
  },
  {
    label: "Categories",
    icon: Tag,
    children: [
      { href: "/admin/categories/all", label: "All Categories" },
      { href: "/admin/categories/add", label: "Add Category" },
    ],
  },
  {
    label: "Subcategories",
    icon: Layers,
    children: [
      { href: "/admin/subcategories/all", label: "All Subcategories" },
      { href: "/admin/subcategories/add", label: "Add Subcategory" },
    ],
  },
  {
    label: "Coupons",
    icon: Ticket,
    children: [
      { href: "/admin/coupons/all", label: "All Coupons" },
      { href: "/admin/coupons/add", label: "Add Coupon" },
    ],
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    children: [{ href: "/admin/order/all", label: "All Orders" }],
  },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function SidebarItem({ item, pathname, isOpen, toggleMenu }) {
  const { href, label, icon: Icon, children } = item;
  const active = pathname === href;

  if (children) {
    return (
      <div>
        <button
          onClick={() => toggleMenu(label)}
          className={`flex w-full items-center justify-between px-3 py-2 rounded-lg transition-all
            ${
              isOpen
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
        >
          <div className="flex items-center gap-3">
            <Icon size={20} />
            <span>{label}</span>
          </div>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        <div
          className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-40" : "max-h-0"
          }`}
        >
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`block px-3 py-2 rounded-md text-sm transition
                ${
                  pathname === child.href
                    ? "bg-gray-800 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
        ${
          active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
        }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
}

export default function Admin({ children }) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleMenu = (label) =>
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));

  // Check if it's the login page
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    // Just render the login page content without sidebar/topbar
    return <div className="min-h-screen w-full">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col border-r">
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-lg font-bold text-gray-800">Furniture Admin</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              pathname={pathname}
              isOpen={openMenus[item.label]}
              toggleMenu={toggleMenu}
            />
          ))}
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center gap-3 text-red-600 hover:text-red-800 transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6 border-b">
          <h2 className="text-base font-semibold text-gray-800">Admin Panel</h2>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2"
            >
              <img
                src="/admin-avatar.png"
                alt="Admin"
                className="w-9 h-9 rounded-full border"
              />
              <span className="text-sm text-gray-700 hidden sm:inline">
                Admin
              </span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border">
                <Link
                  href="/admin/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <User size={16} /> Profile
                </Link>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-gray-100 text-red-600">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 flex-1">{children}</div>
      </main>
    </div>
  );
}
