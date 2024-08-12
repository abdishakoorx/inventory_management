"use client";
import { useGetUsersQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../(components)/Header";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "../redux";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200, flex: 1 },
  { field: "email", headerName: "Email", width: 250, flex: 1 },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) {
    return <div className="py-4 text-center">Loading...</div>;
  }
  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full mx-auto pb-5 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <Header name="Users" />
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            className={`w-full py-2 px-4 pl-10 pr-4 rounded-full border-2 transition duration-300
              ${isDarkMode ? 'bg-gray-900 text-white border-gray-700 focus:border-blue-500' : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'}`}
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className="flex-grow mt-6">
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          getRowId={(row) => row.userId}
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
              color: '#031839',
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

export default Users;