"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch"; // ✅ Add Switch

const ProductTable = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loadingId, setLoadingId] = useState(null);

  // Update field handler
  const handleToggle = async (id, field, value) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/product/${id}/features`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      if (!res.ok) throw new Error("Failed to update product");

      // Optimistic UI update
      products = products.map((p) =>
        p._id === id ? { ...p, [field]: value } : p
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "all" || product.category?.name === category;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        🪑 Furniture Products
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <Input
          placeholder="🔍 Search furniture..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs bg-white border-gray-300"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[220px] bg-white border-gray-300">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {[...new Set(products.map((p) => p.category?.name))].map(
              (cat) =>
                cat && (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                )
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>New Arrivable</TableHead>
              <TableHead>Top Sell</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product, index) => (
              <TableRow key={product._id} className="hover:bg-gray-50">
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell>
                  {product.images?.[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                  )}
                </TableCell>
                <TableCell className="font-semibold text-gray-800">
                  {product.name}
                </TableCell>
                <TableCell className="text-gray-600">
                  {product.category?.name || "—"}
                </TableCell>
                <TableCell className="text-gray-800 font-medium">
                  ${product.price}
                </TableCell>

                {/* Featured Switch */}
                <TableCell>
                  <Switch
                    checked={product.featured}
                    disabled={loadingId === product._id}
                    onCheckedChange={(val) =>
                      handleToggle(product._id, "featured", val)
                    }
                  />
                </TableCell>

                {/* New Arrivable Switch */}
                <TableCell>
                  <Switch
                    checked={product.newarrivable}
                    disabled={loadingId === product._id}
                    onCheckedChange={(val) =>
                      handleToggle(product._id, "newarrivable", val)
                    }
                  />
                </TableCell>

                {/* Top Sell Switch */}
                <TableCell>
                  <Switch
                    checked={product.topsell}
                    disabled={loadingId === product._id}
                    onCheckedChange={(val) =>
                      handleToggle(product._id, "topsell", val)
                    }
                  />
                </TableCell>

                {/* Actions */}
                <TableCell className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Link href={`/admin/product/edit/${product._id}`}>
                      <Pencil className="w-4 h-4" /> Edit
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          variant="outline"
          className="bg-white"
        >
          ← Previous
        </Button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          variant="outline"
          className="bg-white"
        >
          Next →
        </Button>
      </div>
    </div>
  );
};

export default ProductTable;
