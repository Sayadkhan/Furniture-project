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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Payment & Delivery colors
const paymentColors = {
  paid: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  failed: "bg-red-100 text-red-700 border-red-200",
};

const deliveryColors = {
  delivered: "bg-green-100 text-green-700 border-green-200",
  shipped: "bg-blue-100 text-blue-700 border-blue-200",
  processing: "bg-gray-100 text-gray-700 border-gray-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

export default function OrdersPage({ allOrder }) {
  const [orders, setOrders] = useState(allOrder || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(orders)

  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [deliveryFilter, setDeliveryFilter] = useState("all");

  const totalPages = Math.ceil(orders.length / pageSize);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      order._id.toLowerCase().includes(search.toLowerCase());

    const matchesPayment =
      paymentFilter === "all" || order.paymentStatus === paymentFilter;

    const matchesDelivery =
      deliveryFilter === "all" || order.deliveryStatus === deliveryFilter;

    return matchesSearch && matchesPayment && matchesDelivery;
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleEdit = (order) => console.log("Edit order:", order);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await fetch(`/api/Order/${id}`, { method: "DELETE" });
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await fetch(`/api/Order/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryStatus: "cancelled" }),
      });
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, deliveryStatus: "cancelled" } : o))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrderStatus = async (id, field, value) => {
    try {
      const res = await fetch(`/api/Order/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      const data = await res.json();

      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, [field]: value } : o))
        );
        if (selectedOrder && selectedOrder._id === id) {
          setSelectedOrder((prev) => ({ ...prev, [field]: value }));
        }
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };


  return (
    <div className="p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by customer or order ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg p-2 flex-1"
            />
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="border rounded-lg p-2"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={deliveryFilter}
              onChange={(e) => setDeliveryFilter(e.target.value)}
              className="border rounded-lg p-2"
            >
              <option value="all">All Deliveries</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Order ID</TableHead>
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
                    <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOrders.map((order, index) => (
                    <TableRow key={order._id} className="hover:bg-muted/40">
                      <TableCell>{(currentPage - 1) * pageSize + (index + 1)}</TableCell>
                      <TableCell className="font-mono text-xs">#{order._id.slice(-6)}</TableCell>
                      <TableCell>{order.customer.firstName} {order.customer.lastName}</TableCell>
                      <TableCell>{order.customer.phone}</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        ${order.totalPrice.toFixed(2)}
                      </TableCell>

                      {/* Payment Dropdown */}
                      <TableCell>
                        <Select
                          value={order.paymentStatus}
                          onValueChange={(val) =>
                            updateOrderStatus(order._id, "paymentStatus", val)
                          }
                        >
                          <SelectTrigger className={`w-[100px] ${paymentColors[order.paymentStatus]} rounded-lg`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paid" className={paymentColors.paid}>Paid</SelectItem>
                            <SelectItem value="pending" className={paymentColors.pending}>Pending</SelectItem>
                            <SelectItem value="failed" className={paymentColors.failed}>Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>

             <TableCell>
                  <Select
                    value={order.deliveryStatus === "pending" ? "processing" : order.deliveryStatus}
                    onValueChange={(val) =>
                      updateOrderStatus(order._id, "deliveryStatus", val)
                    }
                  >
                    <SelectTrigger
                      className={`w-[120px] ${
                        deliveryColors[
                          order.deliveryStatus === "pending"
                            ? "processing"
                            : order.deliveryStatus
                        ]
                      } rounded-lg`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="processing"
                        className={deliveryColors.processing}
                      >
                        Processing
                      </SelectItem>
                      <SelectItem
                        value="shipped"
                        className={deliveryColors.shipped}
                      >
                        Shipped
                      </SelectItem>
                      <SelectItem
                        value="delivered"
                        className={deliveryColors.delivered}
                      >
                        Delivered
                      </SelectItem>
                      <SelectItem
                        value="cancelled"
                        className={deliveryColors.cancelled}
                      >
                        Cancelled
                      </SelectItem>
                    </SelectContent>
                  </Select>
          </TableCell>
                      <TableCell className="text-gray-500">
                        {moment(order.createdAt).format("MMM DD, YYYY")}
                      </TableCell>

                      <TableCell className="text-right space-x-2">
                        <Button size="icon" variant="outline" onClick={() => handleView(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={() => handleEdit(order)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="destructive" onClick={() => handleDelete(order._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        {order.deliveryStatus !== "cancelled" && (
                          <Button size="icon" variant="outline" className="text-red-600 border-red-300" onClick={() => handleCancel(order._id)}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</Button>
              <span>Page {currentPage} of {totalPages}</span>
              <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
<div className="">
        <Dialog className="" open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="min-w-5xl h-[85vh] space-y-6 bg-gray-50 rounded-xl shadow-xl overflow-y-scroll">
          {selectedOrder && (
            <>
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <DialogTitle className="text-2xl font-bold text-gray-800">
                    Order #{selectedOrder._id.slice(-6)}
                  </DialogTitle>
                  <p className="text-gray-500 text-sm mt-1">
                    Placed on {moment(selectedOrder.createdAt).format("MMM DD, YYYY")}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
              </div>

       

              {/* Customer & Payment Info */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Customer Info Card */}
                <div className="bg-white shadow-md rounded-xl p-5 space-y-3 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Customer Info</h3>
                  <div>
                    <p className="font-medium text-gray-700">{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                    <p className="text-gray-500 text-sm">{selectedOrder.customer.email}</p>
                    <p className="text-gray-500 text-sm">{selectedOrder.customer.phone}</p>
                  </div>
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Shipping Address</h4>
                    <p className="text-gray-600 text-sm">
                      {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.country} - {selectedOrder.customer.postal}
                    </p>
                  </div>
                </div>

                {/* Payment & Shipping Card */}
                <div className="bg-white shadow-md rounded-xl p-5 space-y-4 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Payment & Shipping</h3>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Payment Method:</span>
                      <span className="font-medium text-gray-700">{selectedOrder.paymentMethod ?? selectedOrder.payment?.method ?? "N/A"}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Payment Status:</span>
                      <Select
                        value={selectedOrder.paymentStatus}
                        onValueChange={(val) => updateOrderStatus(selectedOrder._id, "paymentStatus", val)}
                      >
                        <SelectTrigger className={`w-[120px] ${paymentColors[selectedOrder.paymentStatus]} rounded-lg`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paid" className={paymentColors.paid}>Paid</SelectItem>
                          <SelectItem value="pending" className={paymentColors.pending}>Pending</SelectItem>
                          <SelectItem value="failed" className={paymentColors.failed}>Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Delivery Status:</span>
                      <Select
                        value={selectedOrder.deliveryStatus}
                        onValueChange={(val) => updateOrderStatus(selectedOrder._id, "deliveryStatus", val)}
                      >
                        <SelectTrigger className={`w-[140px] ${deliveryColors[selectedOrder.deliveryStatus]} rounded-lg`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="processing" className={deliveryColors.processing}>Processing</SelectItem>
                          <SelectItem value="shipped" className={deliveryColors.shipped}>Shipped</SelectItem>
                          <SelectItem value="delivered" className={deliveryColors.delivered}>Delivered</SelectItem>
                          <SelectItem value="cancelled" className={deliveryColors.cancelled}>Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedOrder.trackingNumber && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Tracking:</span>
                        <span className="font-medium text-gray-700">{selectedOrder.trackingNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Items</h3>
                <div className="grid gap-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-white shadow rounded-xl border border-gray-200">
                      <img src={item.image || '/placeholder.png'} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-700">{item.name}</p>
                        <p className="text-gray-500 text-sm">{item.quantity} × ${item.price}</p>
                      </div>
                      <p className="font-semibold text-gray-800">${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-white shadow-md rounded-xl p-5 mt-6 border border-gray-200 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${selectedOrder.subtotal?.toFixed(2)}</span>
                </div>
                {selectedOrder.coupon?.discountAmount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Discount ({selectedOrder.coupon.code})</span>
                    <span>- ${selectedOrder.coupon.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2 text-gray-800">
                  <span>Total</span>
                  <span>${selectedOrder.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
</div>
    </div>
  );
}
