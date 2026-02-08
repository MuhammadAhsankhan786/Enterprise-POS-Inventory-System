import React, { useState } from 'react';
import { Search, Plus, Edit2, UserCheck, UserX } from 'lucide-react';
import { mockUsers, User } from '../data/mockData';

export function Users() {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    const styles = {
      'Owner': 'bg-purple-100 text-purple-800',
      'Manager': 'bg-blue-100 text-blue-800',
      'Cashier': 'bg-green-100 text-green-800',
      'Accountant': 'bg-yellow-100 text-yellow-800'
    };
    
    return styles[role as keyof typeof styles] || 'bg-slate-100 text-slate-800';
  };

  const activeUsers = users.filter(u => u.status === 'active').length;

  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-slate-800">Users & Roles</h1>
          <p className="text-sm text-slate-500 mt-1">Manage system users and access permissions</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-slate-800 text-white px-6 py-2.5 flex items-center gap-2 hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6">
          <h3 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Total Users</h3>
          <p className="text-3xl text-slate-900">{users.length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-6">
          <h3 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Active Users</h3>
          <p className="text-3xl text-green-700">{activeUsers}</p>
        </div>
        <div className="bg-white border border-slate-200 p-6">
          <h3 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Managers</h3>
          <p className="text-3xl text-slate-900">{users.filter(u => u.role === 'Manager').length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-6">
          <h3 className="text-xs text-slate-500 uppercase tracking-wide mb-3">Cashiers</h3>
          <p className="text-3xl text-slate-900">{users.filter(u => u.role === 'Cashier').length}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
          >
            <option value="all">All Roles</option>
            <option value="Owner">Owner</option>
            <option value="Manager">Manager</option>
            <option value="Cashier">Cashier</option>
            <option value="Accountant">Accountant</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Permissions</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-900">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {user.status === 'active' ? (
                        <>
                          <UserCheck className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-700">Active</span>
                        </>
                      ) : (
                        <>
                          <UserX className="w-4 h-4 text-slate-400" />
                          <span className="text-xs text-slate-500">Inactive</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.slice(0, 2).map((perm, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs">
                          {perm === 'all' ? 'All Access' : perm.replace('_', ' ')}
                        </span>
                      ))}
                      {user.permissions.length > 2 && (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs">
                          +{user.permissions.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
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

        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-600">
            Showing <span className="text-slate-900">{filteredUsers.length}</span> of <span className="text-slate-900">{users.length}</span> users
          </p>
        </div>
      </div>

      {/* Role Permissions Reference */}
      <div className="bg-white border border-slate-200 p-6">
        <h3 className="text-sm text-slate-800 uppercase tracking-wide mb-4">Role Permissions Reference</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="mb-3">
              <span className={`px-2 py-1 text-xs ${getRoleBadge('Owner')}`}>Owner</span>
              <p className="text-sm text-slate-700 mt-2">Full system access and control</p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 ml-4">
              <li>• All permissions enabled</li>
              <li>• User management</li>
              <li>• System configuration</li>
              <li>• Financial reports access</li>
            </ul>
          </div>

          <div>
            <div className="mb-3">
              <span className={`px-2 py-1 text-xs ${getRoleBadge('Manager')}`}>Manager</span>
              <p className="text-sm text-slate-700 mt-2">Operational and inventory control</p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 ml-4">
              <li>• View and edit inventory</li>
              <li>• Manage products</li>
              <li>• View reports</li>
              <li>• User management</li>
            </ul>
          </div>

          <div>
            <div className="mb-3">
              <span className={`px-2 py-1 text-xs ${getRoleBadge('Cashier')}`}>Cashier</span>
              <p className="text-sm text-slate-700 mt-2">Point of sale operations</p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 ml-4">
              <li>• Create invoices</li>
              <li>• View products</li>
              <li>• Process sales</li>
              <li>• Print receipts</li>
            </ul>
          </div>

          <div>
            <div className="mb-3">
              <span className={`px-2 py-1 text-xs ${getRoleBadge('Accountant')}`}>Accountant</span>
              <p className="text-sm text-slate-700 mt-2">Financial and reporting access</p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 ml-4">
              <li>• View all reports</li>
              <li>• View invoices</li>
              <li>• FBR integration</li>
              <li>• GST reports</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg text-slate-800">Add New User</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 uppercase mb-2">Full Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-300 text-sm" placeholder="e.g., Ahmed Khan" />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 uppercase mb-2">Email Address</label>
                  <input type="email" className="w-full px-3 py-2 border border-slate-300 text-sm" placeholder="email@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 uppercase mb-2">Role</label>
                  <select className="w-full px-3 py-2 border border-slate-300 text-sm">
                    <option>Owner</option>
                    <option>Manager</option>
                    <option>Cashier</option>
                    <option>Accountant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 uppercase mb-2">Status</label>
                  <select className="w-full px-3 py-2 border border-slate-300 text-sm">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-600 uppercase mb-2">Password</label>
                <input type="password" className="w-full px-3 py-2 border border-slate-300 text-sm" placeholder="Enter secure password" />
              </div>

              <div>
                <label className="block text-xs text-slate-600 uppercase mb-3">Permissions</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-slate-700">Create Invoice</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-slate-700">View Products</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-slate-700">Manage Inventory</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-slate-700">View Reports</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-slate-700">FBR Integration</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-slate-700">Manage Users</span>
                  </label>
                </div>
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
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
