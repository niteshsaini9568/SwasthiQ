# SwasthiQ Pharmacy - Frontend

Modern React-based frontend for the SwasthiQ Pharmacy Management System with real API integration.

## Features

### Dashboard Page
- **Sales Summary Card**: Display today's total sales and transaction count
- **Items Sold Card**: Show all-time items sold count
- **Inventory Overview**: Total medicines and stock value
- **Low Stock Indicator**: Alert for medicines below reorder level
- **Purchase Order Summary**: Pending and delivered orders tracking

### Inventory Page
- **Complete Medicines Table**: List all medicines with detailed information
- **Search & Filter**: Search by name, description, manufacturer; filter by category
- **Status Indicators**: Active, Low Stock, Out of Stock, Expired statuses
- **Add/Edit Functionality**: Modal form to add or update medicines
- **Pagination**: Navigate through large datasets
- **Real-time Updates**: All data from backend APIs

## Tech Stack

- **Framework**: React 18 with Functional Components & Hooks
- **Routing**: React Router v6
- **State Management**: React Hooks (useState, useEffect, useContext)
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Date Handling**: date-fns
- **Build Tool**: Create React App

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── index.js          (Reusable UI components)
│   │   └── Layout.js         (Navbar and Layout)
│   ├── pages/
│   │   ├── Dashboard.js      (Dashboard page)
│   │   └── Inventory.js      (Inventory page)
│   ├── services/
│   │   ├── apiClient.js      (Axios instance)
│   │   └── api.js            (API endpoints)
│   ├── hooks/
│   │   └── useFetch.js       (Custom data fetching hooks)
│   ├── styles/
│   │   └── globals.css       (Global styles)
│   ├── App.js                (Main app with routing)
│   └── index.js              (React entry point)
├── .env                      (Environment variables)
├── .env.example              (Example env file)
├── package.json              (Dependencies)
├── tailwind.config.js        (Tailwind configuration)
├── postcss.config.js         (PostCSS configuration)
└── README.md                 (This file)
```

## Installation

### Prerequisites
- Node.js v14 or higher
- npm or yarn

### Setup Steps

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your backend API URL:
   ```
   REACT_APP_API_URL=http://localhost:8000
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   
   The app will open at `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   ```

## Available Scripts

### `npm start`
Runs the app in development mode with hot reload.

### `npm run build`
Builds the app for production to the `build/` folder.

### `npm test`
Launches the test runner.

### `npm run eject`
Exposes the build configuration (irreversible).

## API Integration

All backend API calls are handled through the `services/api.js` file. The API client is configured in `services/apiClient.js`.

### Available APIs

**Dashboard Endpoints:**
- `GET /api/dashboard/sales-summary` - Today's sales
- `GET /api/dashboard/total-items-sold` - All-time items sold
- `GET /api/dashboard/low-stock-items` - Low stock alert
- `GET /api/dashboard/purchase-order-summary` - Order status

**Inventory Endpoints:**
- `GET /api/inventory/medicines` - List medicines (with pagination & filtering)
- `GET /api/inventory/medicines/{id}` - Get medicine details
- `POST /api/inventory/medicines` - Add new medicine
- `PUT /api/inventory/medicines/{id}` - Update medicine
- `PATCH /api/inventory/medicines/{id}/mark-expired` - Mark as expired
- `GET /api/inventory/categories` - Get all categories
- `GET /api/inventory/stats` - Inventory statistics

## Reusable Components

### UI Components
- **Card**: Container component with header support
- **Badge**: Status/label indicator with variants
- **Button**: Styled button with loading state
- **Input**: Form input with label and error handling
- **Select**: Dropdown select with options
- **Table**: Data table with headers and custom rendering
- **Modal**: Dialog for forms and confirmations
- **LoadingSpinner**: Loading indicator
- **ErrorMessage**: Error display component
- **Stat**: Statistics display component

### Custom Hooks
- **useFetch**: Hook for data fetching with loading/error states
- **useAsync**: Hook for async operations with status tracking

## State Management

The app uses React Hooks for state management:
- `useState` for component-level state
- `useEffect` for side effects and data fetching
- Custom hooks for common patterns

## Features Implementation

### Loading States
All pages show a spinner while loading data from the API.

### Error Handling
Proper error messages are displayed when API calls fail.

### Pagination
Inventory page supports pagination for large datasets.

### Search & Filter
- Search by medicine name, description, or manufacturer
- Filter by medicine category
- Real-time filtering on input change

### Form Validation
Add/Edit medicine form includes:
- Required field validation
- Inline error messages
- Submit button disabled during save

### Responsive Design
All pages are fully responsive using Tailwind CSS:
- Mobile-first approach
- Works on tablets and desktops
- Touch-friendly button sizes

## Color Scheme

The UI uses a blue-based color scheme:
- **Primary**: Blue (#0284c7)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#eab308)
- **Error**: Red (#ef4444)
- **Gray**: Neutral grays (#111827 to #f3f4f6)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Component code splitting via React Router
- Lazy loading for routes
- Memoization where necessary
- Efficient re-renders with proper dependency arrays

## Troubleshooting

### API Connection Error
Ensure the backend API is running on `http://localhost:8000` and the `REACT_APP_API_URL` is correctly set in `.env`.

### Module Not Found
Run `npm install` to ensure all dependencies are installed.

### Port Already in Use
If port 3000 is already in use, React will prompt to use a different port.

### CORS Issues
Ensure the backend has CORS enabled for your frontend URL.

## Environment Variables

Create a `.env` file in the frontend directory with:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:8000
```

## Future Enhancements

- Authentication and authorization
- Advanced filtering options
- Data export to CSV/Excel
- Charts and analytics
- Prescription management
- Customer management
- Batch operations
- Dark mode support
- Internationalization (i18n)
- Unit and integration tests

## License

MIT License

## Support

For issues or questions, contact the development team.
