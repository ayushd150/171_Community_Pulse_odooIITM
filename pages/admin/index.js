import React from 'react';
import Layout from '@/components/layout/Layout';

export default function AdminDashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin! Use the navigation to manage events and users.</p>
    </Layout>
  );
}