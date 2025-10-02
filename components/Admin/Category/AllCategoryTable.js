"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AllCategoryTable = ({ category }) => {
  const [categories, setCategories] = useState(category || []);

  const handleToggle = async (id, field, value) => {
    // Optimistic update
    setCategories((prev) =>
      prev.map((cat) => (cat._id === id ? { ...cat, [field]: value } : cat))
    );

    try {
      await fetch(`/api/category/${id}/features`, {
        method: "PATCH",
        body: JSON.stringify({ [field]: value }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
      // revert on error
      setCategories((prev) =>
        prev.map((cat) => (cat._id === id ? { ...cat, [field]: !value } : cat))
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    // Optimistic update
    const previousCategories = [...categories];
    setCategories((prev) => prev.filter((cat) => cat._id !== id));

    try {
      const res = await fetch(`/api/category/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete category");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete category");
      // revert on error
      setCategories(previousCategories);
    }
  };

  return (
    <Card className="overflow-hidden shadow-md border rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">New Arrivable</TableHead>
              <TableHead className="text-center">Featured</TableHead>
              <TableHead className="text-center">Top Category</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow
                key={category._id}
                className="hover:bg-muted/20 transition-colors"
              >
                <TableCell className="text-center font-medium">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={category.image || "/placeholder.png"}
                      alt={category.name}
                      width={45}
                      height={45}
                      className="rounded-md border object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{category.name}</TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={category.new_arrivable}
                    onCheckedChange={(checked) =>
                      handleToggle(category._id, "new_arrivable", checked)
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={category.featured}
                    onCheckedChange={(checked) =>
                      handleToggle(category._id, "featured", checked)
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={category.top_category}
                    onCheckedChange={(checked) =>
                      handleToggle(category._id, "top_category", checked)
                    }
                  />
                </TableCell>
                <TableCell className="flex justify-center gap-2">
                  <Link href={`/admin/categories/edit/${category._id}`}>
                    <Button size="sm" variant="outline" className="rounded-lg">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="rounded-lg"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No categories found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AllCategoryTable;
