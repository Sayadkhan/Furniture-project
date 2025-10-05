"use client";
import React, { useState, Suspense } from "react";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";

const ProductRow = ({ product, index, startIndex, loadingId, handleToggle, handleDelete }) => {
  return (
    <TableRow
      key={product._id}
      className="hover:bg-amber-50/40 transition-colors"
    >
      <TableCell>{startIndex + index + 1}</TableCell>
      <TableCell>
        {product.images?.[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={70}
            height={70}
            className="rounded-xl object-cover shadow-sm"
          />
        )}
      </TableCell>
      <TableCell className="font-semibold text-gray-800">{product.name}</TableCell>
      <TableCell className="text-gray-600">{product.category?.name || "—"}</TableCell>
      <TableCell className="text-gray-900 font-semibold">${product.price}</TableCell>

      {/* Switches */}
      <TableCell>
        <Switch
          checked={product.featured}
          disabled={loadingId === product._id}
          onCheckedChange={(val) => handleToggle(product._id, "featured", val)}
        />
      </TableCell>
      <TableCell>
        <Switch
          checked={product.newarrivable}
          disabled={loadingId === product._id}
          onCheckedChange={(val) => handleToggle(product._id, "newarrivable", val)}
        />
      </TableCell>
      <TableCell>
        <Switch
          checked={product.topsell}
          disabled={loadingId === product._id}
          onCheckedChange={(val) => handleToggle(product._id, "topsell", val)}
        />
      </TableCell>

      {/* Actions */}
      <TableCell className="flex gap-2 items-center justify-center text-center">
        <Link href={`/admin/product/edit/${product._id}`}>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50 rounded-lg"
          >
            <Pencil className="w-4 h-4" /> Edit
          </Button>
        </Link>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50 rounded-lg"
          onClick={() => handleDelete(product._id)}
        >
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

// ✅ Skeleton Row with shimmer animation
const ProductRowSkeleton = () => (
  <TableRow className="animate-pulse">
    {[...Array(9)].map((_, i) => (
      <TableCell key={i}>
        <div className="h-6 w-full bg-gray-200 rounded-lg animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      </TableCell>
    ))}
  </TableRow>
);

const ProductTable = ({ products }) => {
  const [productsData, setProductsData] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loadingId, setLoadingId] = useState(null);
  const productsPerPage = 5;

  const handleToggle = async (id, field, value) => {
    setLoadingId(id);
    setProductsData((prev) =>
      prev.map((p) => (p._id === id ? { ...p, [field]: value } : p))
    );
    try {
      const res = await fetch(`/api/product/${id}/features`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch (err) {
      console.error(err);
      setProductsData((prev) =>
        prev.map((p) => (p._id === id ? { ...p, [field]: !value } : p))
      );
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const prevProducts = [...productsData];
    setProductsData((prev) => prev.filter((p) => p._id !== id));

    try {
      const res = await fetch(`/api/product/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");

      toast.success("✅ Product deleted successfully!");

      // Adjust current page if needed
      const filteredProductsCount = filteredProducts.length - 1;
      const newTotalPages = Math.ceil(filteredProductsCount / productsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Could not delete product. Please try again.");
      setProductsData(prevProducts);
    }
  };

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "all" || product.category?.name === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen rounded-2xl shadow-lg border border-gray-200">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
        🪑 Furniture Products
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 items-center">
        <Input
          placeholder="🔍 Search furniture..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs bg-white border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-400"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[220px] bg-white border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-400">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {[...new Set(productsData.map((p) => p.category?.name))].map(
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
      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white">
        <Table>
          <TableHeader className="bg-amber-50">
            <TableRow>
              <TableHead className="text-gray-700">#</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>New Arrival</TableHead>
              <TableHead>Top Sell</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product, index) => (
              <Suspense key={product._id} fallback={<ProductRowSkeleton />}>
                <ProductRow
                  product={product}
                  index={index}
                  startIndex={startIndex}
                  loadingId={loadingId}
                  handleToggle={handleToggle}
                  handleDelete={handleDelete}
                />
              </Suspense>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          variant="outline"
          className="bg-white rounded-lg shadow-sm hover:bg-amber-50"
        >
          ← Previous
        </Button>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          variant="outline"
          className="bg-white rounded-lg shadow-sm hover:bg-amber-50"
        >
          Next →
        </Button>
      </div>
    </div>
  );
};

export default ProductTable;
