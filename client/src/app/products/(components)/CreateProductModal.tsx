import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";
import { useAppSelector } from "@/app/redux";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  // Access isDarkMode from Redux state
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const modalBgClass = isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300";
  const overlayBgClass = isDarkMode ? "bg-gray-800" : "bg-gray-600";
  const textColorClass = isDarkMode ? "text-gray-300" : "text-gray-700";
  const inputBgClass = isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-500";
  const buttonPrimaryClass = isDarkMode ? "bg-blue-500 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600";
  const buttonSecondaryClass = isDarkMode ? "bg-gray-500 hover:bg-gray-600" : "bg-gray-500 hover:bg-gray-700";

  return (
    <div
      className={`fixed inset-0 bg-opacity-50 overflow-y-auto h-full w-full z-20 ${overlayBgClass}`}
    >
      <div
        className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${modalBgClass}`}
      >
        {/* Header with enhanced styling */}
        <h2 className={`text-2xl font-bold mb-4 ${textColorClass}`}>
          Create New Product
        </h2>
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={`block text-sm font-medium ${textColorClass}`}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={`block w-full mb-2 p-2 border-2 rounded-md ${inputBgClass}`}
            required
          />

          {/* PRICE */}
          <label htmlFor="productPrice" className={`block text-sm font-medium ${textColorClass}`}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={`block w-full mb-2 p-2 border-2 rounded-md ${inputBgClass}`}
            required
          />

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={`block text-sm font-medium ${textColorClass}`}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={`block w-full mb-2 p-2 border-2 rounded-md ${inputBgClass}`}
            required
          />

          {/* RATING */}
          <label htmlFor="rating" className={`block text-sm font-medium ${textColorClass}`}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            className={`block w-full mb-2 p-2 border-2 rounded-md ${inputBgClass}`}
            required
          />

          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className={`mt-4 px-4 py-2 text-white rounded ${buttonPrimaryClass}`}
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className={`ml-2 px-4 py-2 text-white rounded ${buttonSecondaryClass}`}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;