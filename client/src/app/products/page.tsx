"use client";
import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState, useMemo } from "react";
import CreateProductModal from "./(components)/CreateProductModal";
import Header from "../(components)/Header";
import Rating from "../(components)/Rating";
import { useAppSelector } from "../redux";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: allProducts, isLoading, isError } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();

  // Access isDarkMode from Redux state
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredProducts = useMemo(() => {
    return allProducts?.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allProducts, searchTerm]);

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !allProducts) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Create Product
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            className={`w-full py-2 px-4 pl-10 pr-4 rounded-full border-2 transition duration-300
              ${isDarkMode ? 'bg-gray-900 text-white border-gray-700 focus:border-blue-500' : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'}`}
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.map((product) => (
          <div
            key={product.productId}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
          >
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Stock: {product.stockQuantity}
                </span>
                {product.rating && (
                  <div className="flex items-center">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
