import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Inventory } from './pages/Inventory';
import { POSBilling } from './pages/POSBilling';
import { FBRInvoicing } from './pages/FBRInvoicing';
import { Reports } from './pages/Reports';
import { Users } from './pages/Users';

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex bg-slate-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header />

          {/* Page Content */}
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/pos" element={<POSBilling />} />
              <Route path="/fbr" element={<FBRInvoicing />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
