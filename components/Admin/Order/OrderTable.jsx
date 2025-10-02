
"use client";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pagination } from "@/components/ui/pagination"; // if you have shadcn pagination, otherwise make custom

export default function OrdersPage({ allOrder }) {
  const [orders, setOrders] = useState(allOrder || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // items per page
  const [selectedOrder, setSelectedOrder] = useState(null);

  
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(selectedOrder)

  // pagination logic
  const totalPages = Math.ceil(orders.length / pageSize);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleEdit = (order) => {
    console.log("Edit order:", order);
    // 👉 open edit modal / navigate to edit page
  };
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this order? This action cannot be undone."
  );
  if (!confirmDelete) return;

  try {
    await fetch(`/api/Order/${id}`, { method: "DELETE" });
    setOrders((prev) => prev.filter((o) => o._id !== id));
  } catch (error) {
    console.error("Delete failed:", error);
  }
};


  return (
    <div className="p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Delivery</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-gray-500 py-6"
                    >
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOrders.map((order, index) => (
                    <TableRow key={order._id} className="hover:bg-muted/40">
                      <TableCell className="font-medium">
                        {(currentPage - 1) * pageSize + (index + 1)}
                      </TableCell>
                      <TableCell>
                        {order.customer.firstName} {order.customer.lastName}
                      </TableCell>
                      <TableCell>{order.customer.phone}</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        ${order.totalPrice.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : order.paymentStatus === "failed"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-yellow-100 text-yellow-700 border-yellow-200"
                          }
                        >
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            order.deliveryStatus === "delivered"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : order.deliveryStatus === "shipped"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                          }
                        >
                          {order.deliveryStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {moment(order.createdAt).format("MMM DD, YYYY")}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleView(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleEdit(order)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDelete(order._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
          {/* pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Order Details #{selectedOrder?._id?.slice(-6)}
            </DialogTitle>
            <DialogDescription>
              Placed on {moment(selectedOrder?.createdAt).format("MMM DD, YYYY")}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold">Customer</h3>
                <p>
                  {selectedOrder.customer.firstName}{" "}
                  {selectedOrder.customer.lastName}
                </p>
                <p>{selectedOrder.customer.phone}</p>
                <p>{selectedOrder.customer.email}</p>
                <p>
                  {selectedOrder.customer.address},{" "}
                  {selectedOrder.customer.city},{" "}
                  {selectedOrder.customer.country} -{" "}
                  {selectedOrder.customer.postal}
                </p>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-semibold">Items</h3>
                <ul className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between border p-2 rounded"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Totals */}
              <div className="border-t pt-2">
                <p>Subtotal: ${selectedOrder?.subtotal?.toFixed(2)}</p>
                {selectedOrder.coupon?.discountAmount > 0 && (
                  <p>
                    Discount: -${selectedOrder.coupon.discountAmount.toFixed(2)}{" "}
                    ({selectedOrder.coupon.code})
                  </p>
                )}
                <p className="font-bold text-lg">
                  Total: ${selectedOrder.totalPrice.toFixed(2)}
                </p>
              </div>

              {/* Status */}
              <div className="flex gap-4">
                <Badge>{selectedOrder.paymentStatus}</Badge>
                <Badge>{selectedOrder.deliveryStatus}</Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

