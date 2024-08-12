"use client";
import { useGetUsersQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../(components)/Header";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200, flex: 1 },
  { field: "email", headerName: "Email", width: 250, flex: 1 },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <div className="py-4 text-center">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col h-full mx-auto pb-5 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <Header name="Users" />
      <div className="flex-grow mt-6">
        <DataGrid
          rows={users}
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