import React, { useState } from 'react';
import { Calendar, Download, FileText } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockInvoices, mockProducts } from '../data/mockData';

export function Reports() {
  const [reportType, setReportType] = useState<'sales' | 'gst' | 'product'>('sales');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('month');

  // Calculate report data
  const calculateSalesReport = () => {
    const total = mockInvoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
    const totalInvoices = mockInvoices.length;
    const avgInvoiceValue = total / totalInvoices;
    
    return { total, totalInvoices, avgInvoiceValue };
  };

  const calculateGSTReport = () => {
    const totalGST = mockInvoices.reduce((sum, inv) => sum + inv.gstAmount, 0);
    const totalSales = mockInvoices.reduce((sum, inv) => sum + inv.subtotal, 0);
    const gstPercentage = (totalGST / totalSales) * 100;
    
    return { totalGST, totalSales, gstPercentage };
  };

  // Product-wise sales data
  const productSalesData = [
    { product: 'KHD-001', sales: 225000, quantity: 500 },
    { product: 'LWN-012', sales: 170000, quantity: 200 },
    { product: 'SLK-089', sales: 125000, quantity: 50 },
    { product: 'GRG-078', sales: 145000, quantity: 100 },
    { product: 'CRP-056', sales: 92000, quantity: 80 }
  ];

  // Daily sales data
  const dailySalesData = [
    { date: '01 Feb', sales: 1250000, invoices: 18 },
    { date: '02 Feb', sales: 980000, invoices: 14 },
    { date: '03 Feb', sales: 1450000, invoices: 22 },
    { date: '04 Feb', sales: 1120000, invoices: 16 },
    { date: '05 Feb', sales: 1680000, invoices: 25 },
    { date: '06 Feb', sales: 1350000, invoices: 19 },
    { date: '07 Feb', sales: 587050, invoices: 3 }
  ];

  const salesReport = calculateSalesReport();
  const gstReport = calculateGSTReport();

  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl text-slate-800">Reports & Accounting</h1>
        <p className="text-sm text-slate-500 mt-1">Financial reports and business analytics</p>
      </div>

      {/* Report Controls */}
      <div className="bg-white border border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="px-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
            >
              <option value="sales">Sales Report</option>
              <option value="gst">GST / Tax Summary</option>
              <option value="product">Product-wise Sales</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="px-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            <div className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-sm">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700">Feb 1, 2026 - Feb 7, 2026</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Sales Report */}
      {reportType === 'sales' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6">
              <h3 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Total Sales</h3>
              <p className="text-3xl text-slate-900">Rs. {salesReport.total.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">Period: This Month</p>
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <h3 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Total Invoices</h3>
              <p className="text-3xl text-slate-900">{salesReport.totalInvoices}</p>
              <p className="text-xs text-slate-500 mt-2">Completed transactions</p>
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <h3 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Avg Invoice Value</h3>
              <p className="text-3xl text-slate-900">Rs. {Math.round(salesReport.avgInvoiceValue).toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">Per transaction</p>
            </div>
          </div>

          {/* Daily Sales Chart */}
          <div className="bg-white border border-slate-200 p-6">
            <h3 className="text-sm text-slate-800 uppercase tracking-wide mb-6">Daily Sales Trend</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={dailySalesData}>
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
                  formatter={(value: number) => `Rs. ${value.toLocaleString()}`}
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

          {/* Detailed Sales Table */}
          <div className="bg-white border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="text-sm text-slate-800 uppercase tracking-wide">Invoice Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Invoice #</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Items</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Subtotal</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">GST</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {mockInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-900">{invoice.invoiceNumber}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">
                        {new Date(invoice.date).toLocaleDateString('en-PK')}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700">{invoice.customerName}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{invoice.items.length}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">Rs. {invoice.subtotal.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">Rs. {invoice.gstAmount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">Rs. {invoice.grandTotal.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* GST Report */}
      {reportType === 'gst' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6">
              <h3 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Total GST Collected</h3>
              <p className="text-3xl text-slate-900">Rs. {gstReport.totalGST.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">18% standard rate</p>
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <h3 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Taxable Sales</h3>
              <p className="text-3xl text-slate-900">Rs. {gstReport.totalSales.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">Before GST</p>
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <h3 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Effective Rate</h3>
              <p className="text-3xl text-slate-900">{gstReport.gstPercentage.toFixed(2)}%</p>
              <p className="text-xs text-slate-500 mt-2">Average across all sales</p>
            </div>
          </div>

          {/* GST Breakdown Table */}
          <div className="bg-white border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="text-sm text-slate-800 uppercase tracking-wide">GST Breakdown by Invoice</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Invoice #</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Subtotal</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">GST @ 18%</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Grand Total</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">FBR Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {mockInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-900">{invoice.invoiceNumber}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">
                        {new Date(invoice.date).toLocaleDateString('en-PK')}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700">{invoice.customerName}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">Rs. {invoice.subtotal.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">Rs. {invoice.gstAmount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">Rs. {invoice.grandTotal.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs uppercase ${
                          invoice.fbrStatus === 'sent' ? 'bg-green-100 text-green-800' :
                          invoice.fbrStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {invoice.fbrStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Product-wise Report */}
      {reportType === 'product' && (
        <div className="space-y-6">
          {/* Product Sales Chart */}
          <div className="bg-white border border-slate-200 p-6">
            <h3 className="text-sm text-slate-800 uppercase tracking-wide mb-6">Top Products by Sales</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={productSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="product" 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  stroke="#cbd5e1"
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  stroke="#cbd5e1"
                  tickFormatter={(value) => `${(value / 1000)}K`}
                />
                <Tooltip 
                  formatter={(value: number) => `Rs. ${value.toLocaleString()}`}
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="sales" fill="#64748b" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Product Details Table */}
          <div className="bg-white border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="text-sm text-slate-800 uppercase tracking-wide">Product Sales Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Article Code</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Quantity Sold</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Total Sales</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Avg Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {productSalesData.map((product, index) => {
                    const avgRate = product.sales / product.quantity;
                    return (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-900">{product.product}</td>
                        <td className="px-4 py-3 text-sm text-slate-700">
                          {mockProducts.find(p => p.articleCode === product.product)?.fabricDescription || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-900">{product.quantity}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">Rs. {product.sales.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">Rs. {Math.round(avgRate).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
