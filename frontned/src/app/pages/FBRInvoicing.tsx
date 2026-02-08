import React, { useState } from 'react';
import { Search, RefreshCw, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { mockInvoices, Invoice } from '../data/mockData';

export function FBRInvoicing() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || invoice.fbrStatus === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      sent: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    
    return styles[status as keyof typeof styles] || 'bg-slate-100 text-slate-800';
  };

  const statusCounts = {
    total: invoices.length,
    sent: invoices.filter(inv => inv.fbrStatus === 'sent').length,
    pending: invoices.filter(inv => inv.fbrStatus === 'pending').length,
    failed: invoices.filter(inv => inv.fbrStatus === 'failed').length
  };

  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl text-slate-800">FBR Digital Invoicing</h1>
        <p className="text-sm text-slate-500 mt-1">Federal Board of Revenue integration and compliance</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6">
          <h3 className="text-xs text-slate-500 uppercase tracking-wide mb-2">Total Invoices</h3>
          <p className="text-3xl text-slate-900">{statusCounts.total}</p>
        </div>
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <h3 className="text-xs text-slate-500 uppercase tracking-wide">Sent to FBR</h3>
          </div>
          <p className="text-3xl text-green-700">{statusCounts.sent}</p>
        </div>
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-600" />
            <h3 className="text-xs text-slate-500 uppercase tracking-wide">Pending</h3>
          </div>
          <p className="text-3xl text-yellow-700">{statusCounts.pending}</p>
        </div>
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <h3 className="text-xs text-slate-500 uppercase tracking-wide">Failed</h3>
          </div>
          <p className="text-3xl text-red-700">{statusCounts.failed}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by invoice number or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
          >
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Invoice Number</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Total Amount</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">GST Amount</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">FBR Status</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-900">{invoice.invoiceNumber}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {new Date(invoice.date).toLocaleDateString('en-PK')}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{invoice.customerName}</td>
                  <td className="px-4 py-3 text-sm text-slate-900">Rs. {invoice.grandTotal.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">Rs. {invoice.gstAmount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invoice.fbrStatus)}
                      <span className={`px-2 py-1 text-xs uppercase ${getStatusBadge(invoice.fbrStatus)}`}>
                        {invoice.fbrStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {(invoice.fbrStatus === 'pending' || invoice.fbrStatus === 'failed') && (
                      <button 
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-slate-600 hover:text-slate-900 text-sm flex items-center gap-1"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Retry
                      </button>
                    )}
                    {invoice.fbrStatus === 'failed' && (
                      <button 
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-red-600 hover:text-red-800 text-sm ml-3"
                      >
                        View Error
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-600">
            Showing <span className="text-slate-900">{filteredInvoices.length}</span> of <span className="text-slate-900">{invoices.length}</span> invoices
          </p>
        </div>
      </div>

      {/* Failed Invoices Alert */}
      {statusCounts.failed > 0 && (
        <div className="bg-red-50 border border-red-200 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm text-red-900 mb-2">FBR Submission Failures</h3>
              <p className="text-sm text-red-700 mb-3">
                {statusCounts.failed} invoice(s) failed to submit to FBR. Review the error details and retry submission.
              </p>
              <div className="space-y-2">
                {invoices.filter(inv => inv.fbrStatus === 'failed').map(invoice => (
                  <div key={invoice.id} className="bg-white border border-red-200 p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">{invoice.invoiceNumber} - {invoice.customerName}</p>
                        <p className="text-xs text-red-700 mt-1">Error: {invoice.fbrError}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-xs text-red-700 hover:text-red-900 flex items-center gap-1 ml-4"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Retry
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FBR Integration Info */}
      <div className="bg-white border border-slate-200 p-6">
        <h3 className="text-sm text-slate-800 uppercase tracking-wide mb-4">FBR Integration Settings</h3>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-xs text-slate-500 uppercase mb-1">FBR Portal Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-slate-900">Connected & Active</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase mb-1">Last Sync</p>
            <p className="text-slate-900">{new Date().toLocaleString('en-PK')}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase mb-1">Business NTN</p>
            <p className="text-slate-900">1234567-8</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase mb-1">GST Registration</p>
            <p className="text-slate-900">Active & Verified</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <button className="px-6 py-2 bg-slate-800 text-white hover:bg-slate-700 text-sm flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync All Pending Invoices
          </button>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg text-slate-800">Invoice Details</h2>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-slate-500 uppercase mb-1">Invoice Number</p>
                  <p className="text-slate-900">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase mb-1">Customer</p>
                  <p className="text-slate-900">{selectedInvoice.customerName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase mb-1">Total Amount</p>
                  <p className="text-slate-900">Rs. {selectedInvoice.grandTotal.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase mb-1">FBR Status</p>
                  <span className={`px-2 py-1 text-xs uppercase ${getStatusBadge(selectedInvoice.fbrStatus)}`}>
                    {selectedInvoice.fbrStatus}
                  </span>
                </div>
              </div>

              {selectedInvoice.fbrError && (
                <div className="bg-red-50 border border-red-200 p-4">
                  <p className="text-xs text-red-600 uppercase mb-2">Error Details</p>
                  <p className="text-sm text-red-800">{selectedInvoice.fbrError}</p>
                </div>
              )}

              <div className="bg-slate-50 p-4 text-sm">
                <p className="text-xs text-slate-500 uppercase mb-2">Resolution Steps</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>Verify customer CNIC/NTN format is correct</li>
                  <li>Ensure all tax calculations are accurate</li>
                  <li>Check FBR portal connectivity</li>
                  <li>Contact support if error persists</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-6 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              {(selectedInvoice.fbrStatus === 'pending' || selectedInvoice.fbrStatus === 'failed') && (
                <button
                  onClick={() => {
                    alert('Retrying FBR submission...');
                    setSelectedInvoice(null);
                  }}
                  className="px-6 py-2 bg-slate-800 text-white hover:bg-slate-700 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry Submission
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
