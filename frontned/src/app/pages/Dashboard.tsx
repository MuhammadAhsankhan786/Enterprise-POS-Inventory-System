import React from 'react';
import { TrendingUp, FileText, DollarSign, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDashboardKPIs, getSalesTrendData, getInventoryMovementData } from '../data/mockData';

export function Dashboard() {
  const kpis = getDashboardKPIs();
  const salesTrend = getSalesTrendData();
  const inventoryMovement = getInventoryMovementData();

  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-PK')}`;
  };

  return (
    <div className="p-8 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Enterprise overview and key metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        {/* Today's Sales */}
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-slate-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-slate-700" />
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Today's Sales</p>
            <p className="text-2xl text-slate-900">{formatCurrency(kpis.todaySales)}</p>
          </div>
        </div>

        {/* Total Invoices */}
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-slate-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-700" />
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Invoices Generated</p>
            <p className="text-2xl text-slate-900">{kpis.totalInvoices}</p>
          </div>
        </div>

        {/* GST Amount */}
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-slate-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-slate-700" />
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">GST / Tax Amount</p>
            <p className="text-2xl text-slate-900">{formatCurrency(kpis.gstAmount)}</p>
          </div>
        </div>

        {/* FBR Status */}
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-slate-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-slate-700" />
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">FBR Pending / Failed</p>
            <p className="text-2xl text-slate-900">{kpis.fbrPendingCount}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white border border-slate-200 p-6">
          <div className="mb-6">
            <h3 className="text-sm text-slate-800 uppercase tracking-wide">Daily Sales Trend</h3>
            <p className="text-xs text-slate-500 mt-1">Last 7 days performance</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={salesTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#64748b' }}
                stroke="#cbd5e1"
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                stroke="#cbd5e1"
                tickFormatter={(value) => `${(value / 1000)}K`}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#475569" 
                strokeWidth={2}
                dot={{ fill: '#475569', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Movement Chart */}
        <div className="bg-white border border-slate-200 p-6">
          <div className="mb-6">
            <h3 className="text-sm text-slate-800 uppercase tracking-wide">Inventory Movement Summary</h3>
            <p className="text-xs text-slate-500 mt-1">Movement by fabric category (Meters)</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={inventoryMovement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="category" 
                tick={{ fontSize: 12, fill: '#64748b' }}
                stroke="#cbd5e1"
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                stroke="#cbd5e1"
              />
              <Tooltip 
                formatter={(value: number) => `${value} meters`}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="movement" fill="#64748b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6">
          <h4 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Low Stock Items</h4>
          <p className="text-3xl text-slate-900">1</p>
          <p className="text-xs text-slate-500 mt-2">Requires immediate attention</p>
        </div>

        <div className="bg-white border border-slate-200 p-6">
          <h4 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Total Active Products</h4>
          <p className="text-3xl text-slate-900">10</p>
          <p className="text-xs text-slate-500 mt-2">In fabric master catalog</p>
        </div>

        <div className="bg-white border border-slate-200 p-6">
          <h4 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Active Users</h4>
          <p className="text-3xl text-slate-900">4</p>
          <p className="text-xs text-slate-500 mt-2">Currently logged in system</p>
        </div>
      </div>
    </div>
  );
}
