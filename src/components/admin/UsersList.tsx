'use client';
import { USER } from '@/constants/endpoints';
import ApiService from '@/lib/apiService';
import React from 'react';

const UsersList: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [users, setUsers] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ApiService.get(USER.GET_PAGINATION({ limit, page }));
        setUsers(response.data);
        setPage(response.currentPage);
        setTotalPages(response.totalPages);
      } catch (error) {
        setUsers([]);
        console.error('Error fetchingusers:', error);
      }
    };

    fetchUsers();
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Manage Users</h2>
      <div className="mt-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!users || users.length === 0 ? (
              <tr>
                <td colSpan={5} className="border px-4 py-2 text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user: any) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user._id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role?.name}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-red-500 text-white px-2 pb-0.5 rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 mx-1 bg-slate-500 text-white rounded cursor-pointer disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1  cursor-pointer ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-50'} rounded`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 mx-1 bg-slate-500 text-white cursor-pointer rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
