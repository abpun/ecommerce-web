import React from 'react';

const UsersList: React.FC = () => {
  // Sample user data (replace with real API data)
  const users = [
    { id: 1, email: 'user1@example.com', role: 'Admin' },
    { id: 2, email: 'user2@example.com', role: 'User' },
    { id: 3, email: 'user3@example.com', role: 'User' },
  ];

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
            {users.map(user => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 text-white px-2 pb-0.5 rounded hover:bg-yellow-600 mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 pb-0.5 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
