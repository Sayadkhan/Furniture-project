"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const tabs = [
  { id: "description", label: "Description" },
  { id: "reviews", label: "Reviews(1)" },
  { id: "size", label: "Size Chart" },
  { id: "image", label: "Image Gallery" },
];

const ProductsTabs = ({ product }) => {
  const [active, setActive] = useState("image");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);
  const imageRef = useRef(null);

  const images = product?.images || [];

  const openModal = (img) => {
    setSelectedImage(img);
    setModalOpen(true);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setDragStart(null);
  };

  // Drag Handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!dragStart) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setDragStart(null);

  // Touch handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }
  };

  const handleTouchMove = (e) => {
    if (!dragStart) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => setDragStart(null);

  return (
    <div className="pb-10">
      <div className="border rounded-md bg-white">
        {/* Tabs */}
        <div className="flex border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-5 py-3 text-[20px] whitespace-nowrap transition-colors ${
                active === tab.id
                  ? "border-b-2 border-black font-medium text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {active === "description" && <div>{product?.desc}</div>}
          {active === "reviews" && (
            <p className="text-gray-700">1 customer review goes here.</p>
          )}
          {active === "size" && <p className="text-gray-700">Size chart content.</p>}
          {active === "image" && images.length > 0 && (
            <div
              className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
              style={{ columnGap: "16px" }}
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="mb-4 break-inside-avoid relative overflow-hidden rounded-lg shadow-sm cursor-pointer hover:scale-105 transform transition duration-300"
                  onClick={() => openModal(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name}-image-${idx}`}
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
          {active === "image" && images.length === 0 && (
            <p className="text-gray-500">No images available.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white z-50 p-2 rounded-full bg-black/50 hover:bg-black/70"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 flex gap-2 z-50">
              <button
                onClick={() => setZoom((prev) => Math.min(prev + 0.5, 5))}
                className="bg-white px-3 py-1 rounded-md shadow hover:bg-gray-100"
              >
                +
              </button>
              <button
                onClick={() => setZoom((prev) => Math.max(prev - 0.5, 1))}
                className="bg-white px-3 py-1 rounded-md shadow hover:bg-gray-100"
              >
                -
              </button>
            </div>

            {/* Image */}
            <div
              className="overflow-hidden rounded-lg touch-pan-x touch-pan-y"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{ cursor: zoom > 1 ? "grab" : "default" }}
            >
              <Image
                ref={imageRef}
                src={selectedImage}
                alt="Product Large"
                width={800}
                height={800}
                style={{
                  transform: `scale(${zoom}) translate(${position.x / zoom}px, ${
                    position.y / zoom
                  }px)`,
                  transition: dragStart ? "none" : "transform 0.3s",
                }}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsTabs;
