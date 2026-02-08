# Textile Mill POS Inventory System

## Enterprise-Grade ERP System for Textile Mills & Wholesalers in Pakistan

### System Overview
A comprehensive, web-based Point of Sale and Inventory Management System designed specifically for textile mills and wholesalers operating in Pakistan. Built with React, TypeScript, and Tailwind CSS.

### Key Features

#### 1. Dashboard
- Real-time KPIs (Today's Sales, Total Invoices, GST Amount, FBR Status)
- Daily sales trend chart (7-day view)
- Inventory movement summary by fabric category
- Low stock alerts and active user count

#### 2. Products / Fabric Master
- Complete product catalog management
- Article codes, fabric descriptions, colors
- Units of measure (Meter, Roll, Piece)
- Sale rates and GST applicability
- Stock levels and godown/warehouse locations
- Search and filter functionality
- Add/Edit product modal

#### 3. Inventory / Stock Management
- Real-time stock monitoring across all godowns
- Low stock alerts with visual indicators
- Stock value calculation
- Godown-wise filtering
- Manual stock adjustment (Manager-level authorization)

#### 4. POS Billing (Most Critical Screen)
- Fast, keyboard-friendly product search
- Real-time cart management
- Customer information capture
- Automatic GST calculation (18%)
- Professional invoice preview
- Print-ready invoices (A4 and thermal)
- Clear/Cancel and Hold invoice options

#### 5. FBR Digital Invoicing
- Federal Board of Revenue integration status
- Invoice submission tracking (Sent/Pending/Failed)
- Error detail viewing and retry functionality
- NTN and GST registration status
- Bulk sync capability

#### 6. Reports & Accounting
- Daily/Monthly sales reports
- GST/Tax summary reports
- Product-wise sales analysis
- Export to PDF and Excel
- Detailed invoice listings
- Interactive charts and graphs

#### 7. Users & Roles
- User management with role-based access
- Four role types: Owner, Manager, Cashier, Accountant
- Permission-based system access
- Active/Inactive user status
- Complete permission reference

### Technical Stack
- **Frontend**: React 18.3.1 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Hooks

### Design Principles
- **Enterprise-Grade**: Serious, corporate, factory-oriented interface
- **Professional Color Scheme**: Charcoal grey, slate, dark navy
- **Data-Dense**: Optimized for long working hours
- **Desktop-First**: Minimum width 1366px
- **No Playful Elements**: Clean, structured, professional
- **Textile-Specific**: Built for fabric wholesalers and mills

### Security & Compliance
- Role-based access control
- FBR digital invoicing integration
- GST/Tax calculation and reporting
- Audit trail ready
- Manager-level authorization for critical operations

### Pakistani Textile Business Features
- Support for local units (Meter, Roll, Piece)
- FBR invoice compliance
- GST @ 18% calculation
- Urdu-friendly interface (English currently)
- Pakistani currency formatting (Rs.)
- NTN and GST registration tracking

### Navigation Structure
```
├── Dashboard (/)
├── Products / Fabric Master (/products)
├── Inventory / Stock (/inventory)
├── POS Billing (/pos)
├── FBR Invoicing (/fbr)
├── Reports (/reports)
└── Users & Roles (/users)
```

### Mock Data Included
- 10 sample textile products (Khaddar, Lawn, Silk, Denim, etc.)
- 3 sample invoices with different statuses
- 5 sample users with various roles
- Sales trend data (7 days)
- Inventory movement data

### Ready for Client Approval
✅ All pages functional and clickable
✅ Complete navigation system
✅ Professional invoice printing
✅ Search and filter on all tables
✅ Modal forms for data entry
✅ Responsive charts and graphs
✅ Enterprise-grade visual design
✅ Textile-specific workflows

---

**Company**: Al-Kareem Textile Mills (Pvt) Ltd
**Location**: Faisalabad, Pakistan
**System Version**: 1.0.0
**Last Updated**: February 7, 2026
