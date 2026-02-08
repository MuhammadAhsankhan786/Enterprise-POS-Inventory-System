import React, { useState } from 'react';
import { Search, AlertTriangle, TrendingDown } from 'lucide-react';
import { mockProducts, Product } from '../data/mockData';

export function Inventory() {
  const [products] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGodown, setFilterGodown] = useState<string>('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.articleCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.fabricDescription.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGodown = filterGodown === 'all' || product.godown === filterGodown;
    
    return matchesSearch && matchesGodown;
  });

  const lowStockItems = products.filter(p => p.currentStock < p.minStockLevel);
  const totalStockValue = products.reduce((sum, p) => sum + (p.currentStock * p.saleRate), 0);

  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl text-slate-800">Inventory / Stock Management</h1>
        <p className="text-sm text-slate-500 mt-1">Monitor stock levels and warehouse inventory</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs text-slate-500 uppercase tracking-wide">Total Stock Value</h3>
          </div>
          <p className="text-2xl text-slate-900">Rs. {totalStockValue.toLocaleString('en-PK')}</p>
          <p className="text-xs text-slate-500 mt-2">Across all godowns</p>
        </div>

        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs text-slate-500 uppercase tracking-wide">Low Stock Items</h3>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl text-red-600">{lowStockItems.length}</p>
          <p className="text-xs text-slate-500 mt-2">Below minimum level</p>
        </div>

        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs text-slate-500 uppercase tracking-wide">Total Products</h3>
          </div>
          <p className="text-2xl text-slate-900">{products.length}</p>
          <p className="text-xs text-slate-500 mt-2">Active SKUs in system</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by article code or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
            />
          </div>

          <select
            value={filterGodown}
            onChange={(e) => setFilterGodown(e.target.value)}
            className="px-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
          >
            <option value="all">All Godowns</option>
            <option value="Godown A">Godown A</option>
            <option value="Godown B">Godown B</option>
            <option value="Godown C">Godown C</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Article Code</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Fabric Description</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Color</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Godown</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Current Stock</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Min Level</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Unit</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Stock Value</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProducts.map((product) => {
                const isLowStock = product.currentStock < product.minStockLevel;
                const stockValue = product.currentStock * product.saleRate;

                return (
                  <tr key={product.id} className={`hover:bg-slate-50 ${isLowStock ? 'bg-red-50' : ''}`}>
                    <td className="px-4 py-3 text-sm text-slate-900">{product.articleCode}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{product.fabricDescription}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{product.color}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{product.godown}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={isLowStock ? 'text-red-600' : 'text-slate-900'}>
                        {product.currentStock.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{product.minStockLevel.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{product.unitOfMeasure}</td>
                    <td className="px-4 py-3 text-sm text-slate-900">Rs. {stockValue.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {isLowStock ? (
                        <div className="flex items-center gap-1 text-red-600">
                          <TrendingDown className="w-4 h-4" />
                          <span className="text-xs">Low Stock</span>
                        </div>
                      ) : (
                        <span className="text-xs text-green-700 bg-green-100 px-2 py-1">Normal</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-600">
            Showing <span className="text-slate-900">{filteredProducts.length}</span> of <span className="text-slate-900">{products.length}</span> items
          </p>
        </div>
      </div>

      {/* Low Stock Alert Panel */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm text-red-900 mb-2">Low Stock Alert</h3>
              <p className="text-sm text-red-700 mb-3">
                The following items are below minimum stock level and require immediate attention:
              </p>
              <div className="space-y-1">
                {lowStockItems.map(item => (
                  <div key={item.id} className="text-sm text-red-800">
                    • {item.articleCode} - {item.fabricDescription} ({item.color}) - Current: {item.currentStock} {item.unitOfMeasure}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Stock Adjustment (Manager Level) */}
      <div className="bg-white border border-slate-200 p-6">
        <h3 className="text-sm text-slate-800 uppercase tracking-wide mb-4">Manual Stock Adjustment</h3>
        <p className="text-sm text-slate-600 mb-4">Manager-level authorization required for manual stock adjustments</p>
        
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-slate-600 uppercase mb-2">Article Code</label>
            <input type="text" className="w-full px-3 py-2 border border-slate-300 text-sm" placeholder="e.g., KHD-001" />
          </div>
          <div>
            <label className="block text-xs text-slate-600 uppercase mb-2">Adjustment Type</label>
            <select className="w-full px-3 py-2 border border-slate-300 text-sm">
              <option>Increase</option>
              <option>Decrease</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-600 uppercase mb-2">Quantity</label>
            <input type="number" className="w-full px-3 py-2 border border-slate-300 text-sm" placeholder="0" />
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-slate-800 text-white hover:bg-slate-700 text-sm">
              Apply Adjustment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
