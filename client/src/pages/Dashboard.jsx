import React  from 'react'
import { useAuth } from "../auth/AuthProvider";
import CustomerPanel from "../dashboard/CustomerPanel";
import OwnerPanel from "../dashboard/OwnerPanel";
import DriverPanel from "../dashboard/DriverPanel";
import AdminPanel from "../dashboard/AdminPanel";

export default function Dashboard() {
  const { user } = useAuth();

  switch (user?.role) {
    case "customer":
      return <CustomerPanel />;
    case "owner":
      return <OwnerPanel />;
    case "driver":
      return <DriverPanel />;
    case "admin":
      return <AdminPanel />;
    default:
      return (
        <div className="p-6">
          <h1 className="text-xl font-bold">Unknown role</h1>
        </div>
      );
  }
}
