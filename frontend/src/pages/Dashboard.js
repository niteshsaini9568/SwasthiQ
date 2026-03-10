import React, { useState } from 'react';
import { FiPackage, FiAlertCircle, FiShoppingCart, FiDollarSign } from 'react-icons/fi';
import { LoadingSpinner, ErrorMessage } from '../components/index';
import { useFetch } from '../hooks/useFetch';
import { dashboardAPI, inventoryAPI } from '../services/api';

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, iconBg, label, value, badge, badgeColor }) => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-3 md:p-5 flex flex-col gap-2 md:gap-3">
        <div className="flex items-center justify-between">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${iconBg} shadow-sm`}>
                <Icon size={16} className="text-white md:hidden" />
                <Icon size={20} className="text-white hidden md:block" />
            </div>
            {badge && (
                <span className={`text-xs font-semibold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full ${badgeColor} truncate max-w-[90px] md:max-w-none`}>
                    {badge}
                </span>
            )}
        </div>
        <div>
            <p className="text-lg md:text-2xl font-bold text-slate-900 truncate">{value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium leading-tight">{label}</p>
        </div>
    </div>
);

// ─── Sale Row ────────────────────────────────────────────────────────────────
const SaleRow = ({ invoice, name, items, method, amount, date, status }) => (
    <div className="flex items-center gap-2 md:gap-3 py-3 md:py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors px-2 rounded">
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
            <FiShoppingCart size={14} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-semibold text-slate-900 truncate">{invoice}</p>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
                {name}
                <span className="hidden sm:inline"> · {items} · {method}</span>
            </p>
        </div>
        <div className="text-right flex-shrink-0">
            <p className="text-xs md:text-sm font-bold text-slate-900">{amount}</p>
            <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">{date}</p>
        </div>
        <span className="ml-1 text-xs font-semibold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex-shrink-0 hidden xs:flex">
            {status}
        </span>
    </div>
);

// ─── Sales Tab ────────────────────────────────────────────────────────────────
const SalesTab = () => {
    const { data: salesData, loading, error } = useFetch(() => dashboardAPI.getSalesSummary(), []);

    return (
        <div>
            {/* Make a Sale */}
            <div className="bg-slate-50 rounded-xl p-3 md:p-5 mb-4 md:mb-5 border border-slate-200">
                <p className="text-sm font-bold text-slate-800 mb-0.5">Make a Sale</p>
                <p className="text-xs text-slate-500 mb-3">Select medicines from inventory</p>

                {/* Input row — stack vertically on mobile */}
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Patient Id"
                        className="sm:w-32 md:flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-slate-700 placeholder-slate-400"
                    />
                    <div className="relative flex-1">
                        <svg className="absolute left-3 top-2.5 text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search medicines..."
                            className="w-full pl-8 pr-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-slate-700 placeholder-slate-400"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors shadow-sm font-medium">
                            Enter
                        </button>
                        <button className="flex-1 sm:flex-none px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm rounded-lg transition-colors shadow-sm font-medium">
                            Bill
                        </button>
                    </div>
                </div>

                {/* Table headers — hidden on mobile, shown md+ */}
                <div className="hidden md:grid grid-cols-9 gap-2 px-1">
                    {['MEDICINE NAME', 'GENERIC NAME', 'BATCH NO', 'EXPIRY DATE', 'QUANTITY', 'MRP / PRICE', 'SUPPLIER', 'STATUS', 'ACTIONS'].map(h => (
                        <p key={h} className="text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</p>
                    ))}
                </div>
                {/* Mobile note */}
                <p className="md:hidden text-xs text-slate-400 text-center py-2 border border-dashed border-slate-200 rounded-lg">
                    Add medicines by searching above
                </p>
            </div>

            {/* Recent Sales */}
            <div>
                <p className="text-sm font-bold text-slate-800 mb-3">Recent Sales</p>
                {loading ? <LoadingSpinner /> : error ? <ErrorMessage message={error} /> : (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 md:p-3">
                        <SaleRow invoice="INV-2024-1234" name="Rajesh Kumar" items="3 items" method="Card"  amount="₹540" date="2024-11-08" status="Completed" />
                        <SaleRow invoice="INV-2024-1235" name="Sunil Smith"  items="2 items" method="Cash"  amount="₹140" date="2024-11-08" status="Completed" />
                        <SaleRow invoice="INV-2024-1236" name="Mohan Johnson" items="5 items" method="UPI" amount="₹625" date="2024-11-08" status="Completed" />
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Purchase Tab ─────────────────────────────────────────────────────────────
const PurchaseTab = () => {
    const { data, loading, error } = useFetch(() => dashboardAPI.getPurchaseOrderSummary(), []);
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    return (
        <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between p-4 md:p-5 bg-indigo-50 rounded-xl border border-indigo-100">
                <span className="text-sm font-semibold text-slate-700">Pending Orders</span>
                <span className="text-xl md:text-2xl font-bold text-indigo-700">{data?.pending_orders || 0}</span>
            </div>
            <div className="flex items-center justify-between p-4 md:p-5 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="text-sm font-semibold text-slate-700">Delivered</span>
                <span className="text-xl md:text-2xl font-bold text-emerald-700">{data?.delivered_orders || 0}</span>
            </div>
            <div className="p-4 md:p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
                <p className="text-sm text-slate-600">
                    Total Pending Qty:{' '}
                    <span className="font-bold text-slate-900 text-base md:text-lg">{data?.total_quantity_pending || 0}</span>
                </p>
            </div>
        </div>
    );
};

// ─── Inventory Tab ────────────────────────────────────────────────────────────
const InventoryTab = () => {
    const { data, loading, error } = useFetch(() => inventoryAPI.getInventoryStats(), []);
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    return (
        <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="p-4 md:p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Medicines</p>
                <p className="text-2xl md:text-3xl font-bold text-slate-800 mt-1 md:mt-2">{data?.total_medicines || 0}</p>
            </div>
            <div className="p-4 md:p-5 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Active</p>
                <p className="text-2xl md:text-3xl font-bold text-emerald-700 mt-1 md:mt-2">{data?.active_medicines || 0}</p>
            </div>
            <div className="p-4 md:p-5 bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm col-span-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Stock Value</p>
                <p className="text-2xl md:text-3xl font-bold text-indigo-700 mt-1 md:mt-2">
                    ₹{(data?.total_stock_value || 0).toFixed(2)}
                </p>
            </div>
        </div>
    );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('sales');

    const { data: salesData }    = useFetch(() => dashboardAPI.getSalesSummary(), []);
    const { data: itemsData }    = useFetch(() => dashboardAPI.getTotalItemsSold(), []);
    const { data: lowStockData } = useFetch(() => dashboardAPI.getLowStockItems(), []);
    const { data: purchaseData } = useFetch(() => dashboardAPI.getPurchaseOrderSummary(), []);

    const tabs = [
        { key: 'sales',     label: '🛒 Sales' },
        { key: 'purchase',  label: '📦 Purchase' },
        { key: 'inventory', label: '📋 Inventory' },
    ];

    return (
        <div>
            {/* Stat Cards — 2 cols on mobile, 4 on lg */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
                <StatCard
                    icon={FiDollarSign}
                    iconBg="bg-gradient-to-br from-emerald-500 to-teal-600"
                    label="Today's Sales"
                    value={`₹${(salesData?.total_sales || 124580).toLocaleString('en-IN')}`}
                    badge="↑ 12.5%"
                    badgeColor="bg-emerald-50 text-emerald-700 border border-emerald-100"
                />
                <StatCard
                    icon={FiShoppingCart}
                    iconBg="bg-gradient-to-br from-blue-500 to-indigo-600"
                    label="Items Sold Today"
                    value={itemsData?.total_items_sold ?? 156}
                    badge={`${purchaseData?.pending_orders ?? 10} Orders`}
                    badgeColor="bg-blue-50 text-blue-700 border border-blue-100"
                />
                <StatCard
                    icon={FiAlertCircle}
                    iconBg="bg-gradient-to-br from-amber-500 to-orange-500"
                    label="Low Stock Items"
                    value={lowStockData?.length ?? 12}
                    badge="Action Needed"
                    badgeColor="bg-amber-50 text-amber-700 border border-amber-100"
                />
                <StatCard
                    icon={FiPackage}
                    iconBg="bg-gradient-to-br from-violet-500 to-purple-600"
                    label="Purchase Orders"
                    value={`₹${(purchaseData?.total_value || 96250).toLocaleString('en-IN')}`}
                    badge={`${purchaseData?.pending_orders ?? 5} Pending`}
                    badgeColor="bg-violet-50 text-violet-700 border border-violet-100"
                />
            </div>

            {/* Tabs + action buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                {/* Scrollable tabs on mobile */}
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto flex-shrink-0">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-md font-semibold transition-all whitespace-nowrap ${
                                activeTab === tab.key
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/60'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-sm rounded-lg transition-colors shadow-sm font-medium">
                        + New Sale
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 border border-slate-200 text-slate-600 text-xs md:text-sm rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all whitespace-nowrap">
                        + New Purchase
                    </button>
                </div>
            </div>

            {/* Tab content */}
            <div>
                {activeTab === 'sales'     && <SalesTab />}
                {activeTab === 'purchase'  && <PurchaseTab />}
                {activeTab === 'inventory' && <InventoryTab />}
            </div>
        </div>
    );
};

export default Dashboard;