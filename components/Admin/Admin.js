"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Tag,
  Layers,
  Ticket,
} from "lucide-react";

export const metadata = {
  title: "Admin Panel | Furniture Brand",
  description: "Manage products, orders, and customers from one place",
};

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
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
      { href: "/admin/coupons", label: "All Coupons" },
      { href: "/admin/coupons/add", label: "Add Coupon" },
    ],
  },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Admin({ children }) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold text-gray-800">Furniture Admin</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map(({ href, label, icon: Icon, children }) => {
            const isActive = pathname === href;
            const isMenuOpen = openMenus[label];

            return (
              <div key={label}>
                {children ? (
                  <>
                    {/* Parent Button */}
                    <button
                      onClick={() => toggleMenu(label)}
                      className={`flex w-full items-center justify-between p-3 rounded-xl transition 
                      ${
                        isMenuOpen
                          ? "bg-gray-900 text-white shadow"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} />
                        <span>{label}</span>
                      </div>
                      {isMenuOpen ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </button>

                    {/* Submenu */}
                    {isMenuOpen && (
                      <div className="ml-8 mt-1 space-y-1">
                        {children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-3 py-2 rounded-lg text-sm transition
                              ${
                                pathname === child.href
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-600 hover:bg-gray-200"
                              }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={href}
                    className={`flex items-center gap-3 p-3 rounded-xl transition
                      ${
                        isActive
                          ? "bg-gray-900 text-white shadow"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center gap-3 text-red-600 hover:text-red-800 transition">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">Hello, Admin</span>
            <img
              src="/admin-avatar.png"
              alt="Admin"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 flex-1">{children}</div>
      </main>
    </div>
  );
}
