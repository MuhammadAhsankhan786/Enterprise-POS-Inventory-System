import React, { useState } from 'react';
import { Search, Plus, Trash2, Printer, X } from 'lucide-react';
import { mockProducts, Product, InvoiceItem } from '../data/mockData';

interface CartItem extends InvoiceItem {
  id: string;
}

export function POSBilling() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);

  const GST_RATE = 0.18; // 18% GST

  const filteredProducts = mockProducts.filter(product => {
    const search = searchTerm.toLowerCase();
    return (
      product.articleCode.toLowerCase().includes(search) ||
      product.fabricDescription.toLowerCase().includes(search) ||
      product.color.toLowerCase().includes(search)
    );
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.productId === product.id);
    
    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      const newItem: CartItem = {
        id: `CART-${Date.now()}`,
        productId: product.id,
        articleCode: product.articleCode,
        fabricDescription: product.fabricDescription,
        color: product.color,
        quantity: 1,
        rate: product.saleRate,
        gst: 0,
        lineTotal: 0
      };
      
      const subtotal = newItem.quantity * newItem.rate;
      newItem.gst = product.gstApplicable ? subtotal * GST_RATE : 0;
      newItem.lineTotal = subtotal + newItem.gst;
      
      setCart([...cart, newItem]);
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(cart.map(item => {
      if (item.id === itemId) {
        const subtotal = newQuantity * item.rate;
        const product = mockProducts.find(p => p.id === item.productId);
        const gst = product?.gstApplicable ? subtotal * GST_RATE : 0;
        return {
          ...item,
          quantity: newQuantity,
          gst,
          lineTotal: subtotal + gst
        };
      }
      return item;
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const totalGST = cart.reduce((sum, item) => sum + item.gst, 0);
  const grandTotal = subtotal + totalGST;

  const completeSale = () => {
    if (cart.length === 0) {
      alert('Cart is empty. Please add items to the cart.');
      return;
    }
    if (!customerName) {
      alert('Please enter customer name.');
      return;
    }
    setShowInvoicePreview(true);
  };

  const clearCart = () => {
    if (confirm('Are you sure you want to clear the cart?')) {
      setCart([]);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
    }
  };

  return (
    <div className="p-8 h-[calc(100vh-80px)] flex flex-col">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl text-slate-800">POS Billing</h1>
        <p className="text-sm text-slate-500 mt-1">Create new invoice and process sales</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Side - Product Search */}
        <div className="flex-1 bg-white border border-slate-200 flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by article code or fabric name... (Press Enter)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
                autoFocus
              />
            </div>
          </div>

          {/* Product List */}
          <div className="flex-1 overflow-y-auto p-4">
            {searchTerm && (
              <div className="space-y-2">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => addToCart(product)}
                      className="p-4 border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-slate-800 text-white text-xs">{product.articleCode}</span>
                            <span className="text-xs text-slate-500">{product.color}</span>
                          </div>
                          <p className="text-sm text-slate-800 mb-2">{product.fabricDescription}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-600">
                            <span>Stock: {product.currentStock} {product.unitOfMeasure}</span>
                            <span>Location: {product.godown}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg text-slate-900">Rs. {product.saleRate}</p>
                          <p className="text-xs text-slate-500">per {product.unitOfMeasure}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <p className="text-sm">No products found</p>
                  </div>
                )}
              </div>
            )}

            {!searchTerm && (
              <div className="text-center py-12 text-slate-500">
                <Search className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-sm">Start typing to search for products</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Cart & Customer Info */}
        <div className="w-[480px] bg-white border border-slate-200 flex flex-col">
          {/* Customer Info */}
          <div className="p-4 border-b border-slate-200 space-y-3">
            <h3 className="text-xs text-slate-600 uppercase tracking-wide">Customer Information</h3>
            <input
              type="text"
              placeholder="Customer Name *"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 text-sm focus:outline-none focus:border-slate-500"
            />
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs text-slate-600 uppercase tracking-wide mb-3">Cart Items</h3>
            
            {cart.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="text-sm">Cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="border border-slate-200 p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-xs text-slate-900">{item.articleCode}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{item.fabricDescription}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.color}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 border border-slate-300 hover:bg-slate-50"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 border border-slate-300 text-center"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 border border-slate-300 hover:bg-slate-50"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-900">Rs. {item.lineTotal.toLocaleString()}</p>
                        <p className="text-slate-500">@ Rs. {item.rate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="border-t border-slate-200 p-4 space-y-2 bg-slate-50">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal:</span>
              <span className="text-slate-900">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">GST (18%):</span>
              <span className="text-slate-900">Rs. {totalGST.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg pt-2 border-t border-slate-300">
              <span className="text-slate-800">Grand Total:</span>
              <span className="text-slate-900">Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-slate-200 p-4 space-y-2">
            <button
              onClick={completeSale}
              disabled={cart.length === 0}
              className="w-full py-3 bg-slate-800 text-white hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              Complete Sale
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={clearCart}
                className="py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm"
              >
                Clear / Cancel
              </button>
              <button className="py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm">
                Hold Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Preview Modal */}
      {showInvoicePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg text-slate-800">Invoice Preview</h2>
              <button
                onClick={() => setShowInvoicePreview(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invoice Content */}
            <div className="p-8 print-content">
              <div className="border border-slate-300 p-8">
                {/* Company Header */}
                <div className="text-center border-b-2 border-slate-800 pb-4 mb-6">
                  <h1 className="text-2xl text-slate-900">Al-Kareem Textile Mills (Pvt) Ltd</h1>
                  <p className="text-sm text-slate-600 mt-1">Plot 45-48, Industrial Area, Faisalabad, Pakistan</p>
                  <p className="text-sm text-slate-600">NTN: 1234567-8 | GST Registered</p>
                  <p className="text-sm text-slate-600 mt-1">Tel: +92-41-1234567 | Email: info@alkareemtextiles.pk</p>
                </div>

                {/* Invoice Details */}
                <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
                  <div>
                    <p className="text-xs text-slate-500 uppercase mb-1">Invoice To:</p>
                    <p className="text-slate-900">{customerName}</p>
                    <p className="text-slate-600">{customerPhone}</p>
                    <p className="text-slate-600">{customerAddress}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase mb-1">Invoice Details:</p>
                    <p className="text-slate-900">Invoice #: TM-2026-0004</p>
                    <p className="text-slate-600">Date: {new Date().toLocaleDateString('en-PK')}</p>
                    <p className="text-slate-600">Time: {new Date().toLocaleTimeString('en-PK')}</p>
                  </div>
                </div>

                {/* Items Table */}
                <table className="w-full mb-6 text-sm">
                  <thead className="border-b-2 border-slate-800">
                    <tr>
                      <th className="text-left py-2 text-xs">Article</th>
                      <th className="text-left py-2 text-xs">Description</th>
                      <th className="text-right py-2 text-xs">Qty</th>
                      <th className="text-right py-2 text-xs">Rate</th>
                      <th className="text-right py-2 text-xs">GST</th>
                      <th className="text-right py-2 text-xs">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2 text-slate-900">{item.articleCode}</td>
                        <td className="py-2 text-slate-700">{item.fabricDescription} - {item.color}</td>
                        <td className="py-2 text-right text-slate-900">{item.quantity}</td>
                        <td className="py-2 text-right text-slate-900">{item.rate.toLocaleString()}</td>
                        <td className="py-2 text-right text-slate-900">{item.gst.toLocaleString()}</td>
                        <td className="py-2 text-right text-slate-900">{item.lineTotal.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-64 space-y-2 text-sm">
                    <div className="flex justify-between pb-2">
                      <span className="text-slate-600">Subtotal:</span>
                      <span className="text-slate-900">Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-slate-600">GST (18%):</span>
                      <span className="text-slate-900">Rs. {totalGST.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t-2 border-slate-800">
                      <span className="text-slate-900">Grand Total:</span>
                      <span className="text-slate-900">Rs. {grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-slate-300 text-xs text-center text-slate-500">
                  <p>Thank you for your business!</p>
                  <p className="mt-1">This is a computer-generated invoice and does not require a signature.</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowInvoicePreview(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-2 bg-slate-800 text-white hover:bg-slate-700 flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}