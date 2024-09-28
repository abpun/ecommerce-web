import React from 'react';
import { Button } from '../ui/button';

const AdminHeader: React.FC = () => {
  return (
    <div className="bg-white w-full p-4 py-2 shadow flex justify-between items-center">
      <h1 className="text-lg font-bold">Dashboard</h1>

      <Button size="lg">Logout</Button>
    </div>
  );
};

export default AdminHeader;
