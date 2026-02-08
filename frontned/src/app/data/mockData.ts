// Mock data for Textile Mill POS System

export interface Product {
  id: string;
  articleCode: string;
  fabricDescription: string;
  color: string;
  unitOfMeasure: 'Meter' | 'Roll' | 'Piece';
  saleRate: number;
  gstApplicable: boolean;
  currentStock: number;
  godown: string;
  minStockLevel: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  status: 'completed' | 'pending' | 'cancelled';
  fbrStatus: 'sent' | 'pending' | 'failed';
  fbrError?: string;
}

export interface InvoiceItem {
  productId: string;
  articleCode: string;
  fabricDescription: string;
  color: string;
  quantity: number;
  rate: number;
  gst: number;
  lineTotal: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Manager' | 'Cashier' | 'Accountant';
  status: 'active' | 'inactive';
  permissions: string[];
}

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'P001',
    articleCode: 'KHD-001',
    fabricDescription: 'Khaddar Premium Quality 100% Cotton',
    color: 'White',
    unitOfMeasure: 'Meter',
    saleRate: 450,
    gstApplicable: true,
    currentStock: 2500,
    godown: 'Godown A',
    minStockLevel: 500
  },
  {
    id: 'P002',
    articleCode: 'LWN-012',
    fabricDescription: 'Lawn Swiss Voile Printed',
    color: 'Red',
    unitOfMeasure: 'Meter',
    saleRate: 850,
    gstApplicable: true,
    currentStock: 1800,
    godown: 'Godown B',
    minStockLevel: 300
  },
  {
    id: 'P003',
    articleCode: 'LWN-013',
    fabricDescription: 'Lawn Swiss Voile Printed',
    color: 'Blue',
    unitOfMeasure: 'Meter',
    saleRate: 850,
    gstApplicable: true,
    currentStock: 1650,
    godown: 'Godown B',
    minStockLevel: 300
  },
  {
    id: 'P004',
    articleCode: 'KTN-045',
    fabricDescription: 'Cotton Karandi Fabric',
    color: 'Black',
    unitOfMeasure: 'Meter',
    saleRate: 620,
    gstApplicable: true,
    currentStock: 3200,
    godown: 'Godown A',
    minStockLevel: 600
  },
  {
    id: 'P005',
    articleCode: 'SLK-089',
    fabricDescription: 'Pure Silk Chiffon',
    color: 'Ivory',
    unitOfMeasure: 'Meter',
    saleRate: 2500,
    gstApplicable: true,
    currentStock: 450,
    godown: 'Godown C',
    minStockLevel: 100
  },
  {
    id: 'P006',
    articleCode: 'DMM-034',
    fabricDescription: 'Denim Heavy Weight',
    color: 'Navy Blue',
    unitOfMeasure: 'Roll',
    saleRate: 18500,
    gstApplicable: true,
    currentStock: 85,
    godown: 'Godown A',
    minStockLevel: 20
  },
  {
    id: 'P007',
    articleCode: 'GRG-078',
    fabricDescription: 'Georgette Embroidered',
    color: 'Maroon',
    unitOfMeasure: 'Meter',
    saleRate: 1450,
    gstApplicable: true,
    currentStock: 890,
    godown: 'Godown C',
    minStockLevel: 200
  },
  {
    id: 'P008',
    articleCode: 'KHD-002',
    fabricDescription: 'Khaddar Medium Quality',
    color: 'Cream',
    unitOfMeasure: 'Meter',
    saleRate: 320,
    gstApplicable: true,
    currentStock: 180,
    godown: 'Godown A',
    minStockLevel: 500
  },
  {
    id: 'P009',
    articleCode: 'CRP-056',
    fabricDescription: 'Crepe Silk Blend',
    color: 'Peach',
    unitOfMeasure: 'Meter',
    saleRate: 1150,
    gstApplicable: true,
    currentStock: 1420,
    godown: 'Godown B',
    minStockLevel: 250
  },
  {
    id: 'P010',
    articleCode: 'VLT-022',
    fabricDescription: 'Velvet Crush Finish',
    color: 'Green',
    unitOfMeasure: 'Meter',
    saleRate: 1850,
    gstApplicable: true,
    currentStock: 680,
    godown: 'Godown C',
    minStockLevel: 150
  }
];

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: 'INV001',
    invoiceNumber: 'TM-2026-0001',
    date: '2026-02-07',
    customerName: 'Ahmed Textiles (Pvt) Ltd',
    customerPhone: '0300-1234567',
    customerAddress: 'Plot 45, Industrial Area, Faisalabad',
    items: [
      {
        productId: 'P001',
        articleCode: 'KHD-001',
        fabricDescription: 'Khaddar Premium Quality 100% Cotton',
        color: 'White',
        quantity: 500,
        rate: 450,
        gst: 40500,
        lineTotal: 265500
      },
      {
        productId: 'P002',
        articleCode: 'LWN-012',
        fabricDescription: 'Lawn Swiss Voile Printed',
        color: 'Red',
        quantity: 200,
        rate: 850,
        gst: 15300,
        lineTotal: 185300
      }
    ],
    subtotal: 395000,
    gstAmount: 55800,
    grandTotal: 450800,
    status: 'completed',
    fbrStatus: 'sent'
  },
  {
    id: 'INV002',
    invoiceNumber: 'TM-2026-0002',
    date: '2026-02-07',
    customerName: 'Karachi Garments',
    customerPhone: '0321-9876543',
    customerAddress: 'Shop 12, Tariq Road, Karachi',
    items: [
      {
        productId: 'P005',
        articleCode: 'SLK-089',
        fabricDescription: 'Pure Silk Chiffon',
        color: 'Ivory',
        quantity: 50,
        rate: 2500,
        gst: 11250,
        lineTotal: 136250
      }
    ],
    subtotal: 125000,
    gstAmount: 11250,
    grandTotal: 136250,
    status: 'completed',
    fbrStatus: 'pending'
  },
  {
    id: 'INV003',
    invoiceNumber: 'TM-2026-0003',
    date: '2026-02-06',
    customerName: 'Lahore Fashion House',
    customerPhone: '0333-4567890',
    customerAddress: 'Liberty Market, Lahore',
    items: [
      {
        productId: 'P007',
        articleCode: 'GRG-078',
        fabricDescription: 'Georgette Embroidered',
        color: 'Maroon',
        quantity: 100,
        rate: 1450,
        gst: 13050,
        lineTotal: 158050
      },
      {
        productId: 'P009',
        articleCode: 'CRP-056',
        fabricDescription: 'Crepe Silk Blend',
        color: 'Peach',
        quantity: 80,
        rate: 1150,
        gst: 8280,
        lineTotal: 100280
      }
    ],
    subtotal: 237000,
    gstAmount: 21330,
    grandTotal: 258330,
    status: 'completed',
    fbrStatus: 'failed',
    fbrError: 'Invalid CNIC format in customer details'
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'U001',
    name: 'Muhammad Ali Khan',
    email: 'ali.khan@textilemills.pk',
    role: 'Owner',
    status: 'active',
    permissions: ['all']
  },
  {
    id: 'U002',
    name: 'Fatima Hassan',
    email: 'fatima@textilemills.pk',
    role: 'Manager',
    status: 'active',
    permissions: ['view_reports', 'manage_inventory', 'manage_users']
  },
  {
    id: 'U003',
    name: 'Ahmed Raza',
    email: 'ahmed.raza@textilemills.pk',
    role: 'Cashier',
    status: 'active',
    permissions: ['create_invoice', 'view_products']
  },
  {
    id: 'U004',
    name: 'Ayesha Malik',
    email: 'ayesha@textilemills.pk',
    role: 'Accountant',
    status: 'active',
    permissions: ['view_reports', 'view_invoices', 'fbr_integration']
  },
  {
    id: 'U005',
    name: 'Bilal Ahmed',
    email: 'bilal@textilemills.pk',
    role: 'Cashier',
    status: 'inactive',
    permissions: ['create_invoice', 'view_products']
  }
];

// Dashboard KPIs
export const getDashboardKPIs = () => {
  const today = new Date().toISOString().split('T')[0];
  const todayInvoices = mockInvoices.filter(inv => inv.date === today);
  
  return {
    todaySales: todayInvoices.reduce((sum, inv) => sum + inv.grandTotal, 0),
    totalInvoices: todayInvoices.length,
    gstAmount: todayInvoices.reduce((sum, inv) => sum + inv.gstAmount, 0),
    fbrPendingCount: mockInvoices.filter(inv => inv.fbrStatus === 'pending' || inv.fbrStatus === 'failed').length
  };
};

// Sales trend data (last 7 days)
export const getSalesTrendData = () => {
  return [
    { date: '01 Feb', sales: 1250000 },
    { date: '02 Feb', sales: 980000 },
    { date: '03 Feb', sales: 1450000 },
    { date: '04 Feb', sales: 1120000 },
    { date: '05 Feb', sales: 1680000 },
    { date: '06 Feb', sales: 1350000 },
    { date: '07 Feb', sales: 587050 }
  ];
};

// Inventory movement data
export const getInventoryMovementData = () => {
  return [
    { category: 'Khaddar', movement: 1500 },
    { category: 'Lawn', movement: 1200 },
    { category: 'Silk', movement: 450 },
    { category: 'Denim', movement: 850 },
    { category: 'Georgette', movement: 680 },
    { category: 'Others', movement: 920 }
  ];
};
