# Management Systems — TP5

Two self-contained front-end management applications: an Accounting Management System and a Real Estate Housing Management System.

## Applications

### 1. Accounting Management System (`index.html`)

A single-page CRUD application for managing agencies, accountants, and agricultural operations.

**Features:**
- Tab-based navigation between Agencies, Accountants, and Operations
- Dashboard statistics with entity counts
- Full CRUD via modal forms (add, edit, delete)
- Search/filter functionality
- Nested drill-down views (accountants per agency, operations per accountant)
- Cascading deletes (deleting an agency removes its accountants and operations)
- Data persistence via localStorage
- Toast notifications

### 2. Real Estate Housing Management (`twoindex.html`)

A CRUD application for managing rental housing, communes, neighborhoods, and tenants.

**Features:**
- Manage communes, neighborhoods, housing types, and housing units
- Tenant management with rental contracts
- Dynamic dropdowns showing only available units
- Calculated total rent = base rent + flat-rate charges
- Status indicators: "Loué par..." (rented) vs "Libre" (vacant)

## Technologies

| Technology | Usage |
|------------|-------|
| HTML5 | Page structure |
| CSS3 | CSS variables, Grid, Flexbox, animations, media queries |
| JavaScript (ES6+) | Arrow functions, template literals, array methods, DOM manipulation |
| Font Awesome 6.4.0 | Icons (CDN) |

## How to Use

- **Accounting System:** Open `index.html` directly in a browser
- **Housing System:** Open `twoindex.html` directly in a browser
