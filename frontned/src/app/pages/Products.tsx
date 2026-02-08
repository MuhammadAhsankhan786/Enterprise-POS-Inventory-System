import React, { useState } from 'react';
import { Search, Plus, Edit2, Filter } from 'lucide-react';
import { mockProducts, Product } from '../data/mockData';

export function Products() {
  const [products] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUnit, setFilterUnit] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.articleCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.fabricDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.color.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterUnit === 'all' || product.unitOfMeasure === filterUnit;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-slate-800">Products / Fabric Master</h1>
          <p className="text-sm text-slate-500 mt-1">Manage fabric articles and inventory catalog</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-slate-800 text-white px-6 py-2.5 flex items-center gap-2 hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by article code, description, or color..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
            />
          </div>

          {/* Unit Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={filterUnit}
              onChange={(e) => setFilterUnit(e.target.value)}
              className="px-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
            >
              <option value="all">All Units</option>
              <option value="Meter">Meter</option>
              <option value="Roll">Roll</option>
              <option value="Piece">Piece</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Article Code</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Fabric Description</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Color</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Unit</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Sale Rate</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">GST</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Stock Balance</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Godown</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-900">{product.articleCode}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{product.fabricDescription}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{product.color}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{product.unitOfMeasure}</td>
                  <td className="px-4 py-3 text-sm text-slate-900">Rs. {product.saleRate.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 text-xs ${product.gstApplicable ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>
                      {product.gstApplicable ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={product.currentStock < product.minStockLevel ? 'text-red-600' : 'text-slate-900'}>
                      {product.currentStock.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{product.godown}</td>
                  <td className="px-4 py-3">
                    <button className="text-slate-600 hover:text-slate-900">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-600">
            Showing <span className="text-slate-900">{filteredProducts.length}</span> of <span className="text-slate-900">{products.length}</span> products
          </p>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg text-slate-800">Add New Product</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 uppercase mb-2">Article Code</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-300 text-sm" placeholder="e.g., KHD-001" />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 uppercase mb-2">Color</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-300 text-sm" placeholder="e.g., White" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-600 uppercase mb-2">Fabric Description</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-300 text-sm" placeholder="e.g., Khaddar Premium Quality 100% Cotton" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 uppercase mb-2">Unit of Measure</label>
                  <select className="w-full px-3 py-2 border border-slate-300 text-sm">
                    <option>Meter</option>
                    <option>Roll</option>
                    <option>Piece</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 uppercase mb-2">Sale Rate (Rs.)</label>
                  <input type="number" className="w-full px-3 py-2 border border-slate-300 text-sm" placeholder="450" />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 uppercase mb-2">Current Stock</label>
                  <input type="number" className="w-full px-3 py-2 border border-slate-300 text-sm" placeholder="2500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 uppercase mb-2">Godown / Location</label>
                  <select className="w-full px-3 py-2 border border-slate-300 text-sm">
                    <option>Godown A</option>
                    <option>Godown B</option>
                    <option>Godown C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 uppercase mb-2">Min Stock Level</label>
                  <input type="number" className="w-full px-3 py-2 border border-slate-300 text-sm" placeholder="500" />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-sm text-slate-700">GST Applicable</span>
                </label>
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 bg-slate-800 text-white hover:bg-slate-700"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
