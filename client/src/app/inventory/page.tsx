"use client";
import { useGetProductsQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../(components)/Header";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200, flex: 1 },
  {
    field: "price",
    headerName: "Price ($)",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `${row.price.toFixed(2)}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating.toFixed(1) : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock",
    width: 110,
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div className="py-4 text-center">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full mx-auto pb-5 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <Header name="Inventory" />
      <div className="flex-grow mt-6">
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.productId}
          checkboxSelection
          className="bg-white shadow-lg rounded-lg border-none !text-gray-700"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f8fafc',
              color: '#1e293b',
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
            },
            '& .MuiCheckbox-root': {
              color: '#3b82f6',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#45D443',
              color: '#000',
            },
          }}
        />
      </div>
    </div>
  );
};

export default Inventory;