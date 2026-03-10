import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiDownload } from 'react-icons/fi';
import {
    Button,
    Input,
    Modal,
    LoadingSpinner,
    ErrorMessage,
} from '../components/index';
import { useFetch } from '../hooks/useFetch';
import { inventoryAPI } from '../services/api';

// ─── Inventory Overview Tile ──────────────────────────────────────────────────
const OverviewTile = ({ label, icon, fetcher, field, isCurrency = false, highlight }) => {
    const { data, loading } = useFetch(() => fetcher(), []);
    const value = data ? data[field] : null;

    const displayValue = loading
        ? '—'
        : isCurrency
        ? `₹${Number(value || 0).toLocaleString('en-IN')}`
        : value ?? 0;

    const finalHighlight = highlight || 'border-slate-700 bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg';

    return (
        <div className={`flex items-center gap-3 p-3 md:p-5 rounded-xl border ${finalHighlight} transition-all hover:scale-[1.02] hover:shadow-xl`}>
            <div className="text-xl md:text-2xl opacity-90 flex-shrink-0">{icon}</div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-white/60 font-semibold uppercase tracking-wide truncate">{label}</p>
                <p className="text-xl md:text-2xl font-bold mt-1 text-white truncate">{displayValue}</p>
            </div>
        </div>
    );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
const getStatusBadge = (medicine) => {
    if (medicine.is_active === 0) {
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">Inactive</span>;
    }
    if (medicine.stock_quantity === 0) {
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">Out of Stock</span>;
    }
    if (medicine.stock_quantity <= medicine.reorder_level) {
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">Low Stock</span>;
    }
    return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Active</span>;
};

// ─── Medicine Card (mobile) ───────────────────────────────────────────────────
const MedicineCard = ({ medicine, onEdit, onMarkExpired }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-sm truncate">{medicine.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{medicine.generic_name || '—'} · {medicine.category}</p>
            </div>
            {getStatusBadge(medicine)}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
            <div>
                <p className="text-slate-400 font-medium">Qty</p>
                <p className={`font-bold mt-0.5 ${medicine.stock_quantity <= medicine.reorder_level ? 'text-amber-600' : 'text-slate-800'}`}>
                    {medicine.stock_quantity}
                </p>
            </div>
            <div>
                <p className="text-slate-400 font-medium">MRP</p>
                <p className="font-bold text-slate-800 mt-0.5">₹{Number(medicine.price || 0).toFixed(2)}</p>
            </div>
            <div>
                <p className="text-slate-400 font-medium">Batch</p>
                <p className="font-mono text-slate-600 mt-0.5 truncate">{medicine.batch_no || '—'}</p>
            </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-400">{medicine.manufacturer}</p>
            <div className="flex gap-1">
                <button onClick={() => onEdit(medicine)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                    <FiEdit2 size={14} />
                </button>
                {medicine.is_active === 1 && (
                    <button onClick={() => onMarkExpired(medicine.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Mark Expired">
                        <FiTrash2 size={14} />
                    </button>
                )}
            </div>
        </div>
    </div>
);

// ─── Medicine Modal ───────────────────────────────────────────────────────────
const MedicineModal = ({ isOpen, onClose, onSave, medicine = null, loading = false, error = '' }) => {
    const [formData, setFormData] = useState(
        medicine || {
            name: '', description: '', price: '', stock_quantity: '',
            reorder_level: '', category: '', manufacturer: '', expiry_date: '',
        }
    );
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.stock_quantity) newErrors.stock_quantity = 'Stock quantity is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        if (!formData.manufacturer.trim()) newErrors.manufacturer = 'Manufacturer is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={medicine ? 'Edit Medicine' : 'Add New Medicine'}>
            {error && <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-sm text-rose-700">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <Input label="Medicine Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="e.g., Paracetamol 500mg" />
                <Input label="Description" name="description" value={formData.description} onChange={handleChange} placeholder="Medicine description" />
                <div className="grid grid-cols-2 gap-3">
                    <Input label="Price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} error={errors.price} placeholder="0.00" />
                    <Input label="Stock Qty" name="stock_quantity" type="number" value={formData.stock_quantity} onChange={handleChange} error={errors.stock_quantity} placeholder="0" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <Input label="Reorder Level" name="reorder_level" type="number" value={formData.reorder_level} onChange={handleChange} placeholder="50" />
                    <Input label="Category" name="category" value={formData.category} onChange={handleChange} error={errors.category} placeholder="e.g., Pain Relief" />
                </div>
                <Input label="Manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} error={errors.manufacturer} placeholder="Manufacturer name" />
                <Input label="Expiry Date" name="expiry_date" type="datetime-local" value={formData.expiry_date} onChange={handleChange} />
                <div className="flex gap-3 pt-2">
                    <button type="button" onClick={onClose} disabled={loading}
                        className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-60">
                        Cancel
                    </button>
                    <button type="submit" disabled={loading}
                        className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors disabled:opacity-60 font-semibold shadow-sm">
                        {loading ? 'Saving...' : (medicine ? 'Update' : 'Add')} Medicine
                    </button>
                </div>
            </form>
        </Modal>
    );
};

// ─── Inventory Page ───────────────────────────────────────────────────────────
export const Inventory = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMedicine, setEditingMedicine] = useState(null);
    const [saveError, setSaveError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const { data: medicinesData, loading: medicinesLoading, error: medicinesError } = useFetch(
        () => inventoryAPI.getMedicines((page - 1) * limit, limit, category || null, search || null),
        [page, limit, category, search, refreshKey]
    );

    const { data: categoriesData } = useFetch(() => inventoryAPI.getCategories(), []);

    const handleAddClick = () => { setEditingMedicine(null); setSaveError(''); setIsModalOpen(true); };
    const handleEditClick = (medicine) => { setEditingMedicine(medicine); setSaveError(''); setIsModalOpen(true); };

    const handleSave = async (formData) => {
        setIsSaving(true);
        setSaveError('');
        try {
            if (editingMedicine) {
                await inventoryAPI.updateMedicine(editingMedicine.id, formData);
                alert('Medicine updated successfully!');
            } else {
                await inventoryAPI.addMedicine(formData);
                alert('Medicine added successfully!');
            }
            setIsModalOpen(false);
            setEditingMedicine(null);
            setRefreshKey(prev => prev + 1);
        } catch (error) {
            console.error('Error saving medicine:', error);
            setSaveError(error.response?.data?.detail || 'Failed to save medicine. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleMarkExpired = async (id) => {
        if (window.confirm('Mark this medicine as expired?')) {
            try {
                await inventoryAPI.markExpired(id);
                window.location.reload();
            } catch (error) {
                console.error('Error marking expired:', error);
            }
        }
    };

    const categoryOptions = [
        { label: 'All Categories', value: '' },
        ...(categoriesData?.categories || []).map(cat => ({ label: cat, value: cat })),
    ];

    const tableHeaders = [
        { key: 'name',         label: 'Medicine Name' },
        { key: 'generic_name', label: 'Generic Name',  render: (row) => <span className="text-slate-500">{row.generic_name || '—'}</span> },
        { key: 'category',     label: 'Category',      render: (row) => <span className="text-slate-500">{row.category}</span> },
        { key: 'batch_no',     label: 'Batch No',      render: (row) => <span className="text-slate-500 font-mono text-xs">{row.batch_no || '—'}</span> },
        {
            key: 'expiry_date', label: 'Expiry Date',
            render: (row) => row.expiry_date
                ? <span className="text-slate-500 text-xs">{new Date(row.expiry_date).toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                : <span className="text-slate-400">—</span>
        },
        {
            key: 'stock_quantity', label: 'Qty',
            render: (row) => (
                <span className={`font-semibold ${row.stock_quantity <= row.reorder_level ? 'text-amber-600' : 'text-slate-800'}`}>
                    {row.stock_quantity}
                </span>
            )
        },
        { key: 'price',        label: 'Cost',     render: (row) => <span className="text-slate-600">₹{Number(row.cost_price || 0).toFixed(2)}</span> },
        { key: 'mrp',          label: 'MRP',      render: (row) => <span className="font-semibold text-slate-800">₹{Number(row.price || 0).toFixed(2)}</span> },
        { key: 'manufacturer', label: 'Supplier', render: (row) => <span className="text-slate-500 text-xs">{row.manufacturer}</span> },
        { key: 'status',       label: 'Status',   render: (row) => getStatusBadge(row) },
        {
            key: 'actions', label: 'Actions',
            render: (row) => (
                <div className="flex gap-1">
                    <button onClick={() => handleEditClick(row)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                        <FiEdit2 size={14} />
                    </button>
                    {row.is_active === 1 && (
                        <button onClick={() => handleMarkExpired(row.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Mark Expired">
                            <FiTrash2 size={14} />
                        </button>
                    )}
                </div>
            )
        },
    ];

    return (
        <div>
            {/* Overview Tiles — 2 cols mobile, 4 cols lg */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
                <OverviewTile label="Total Items"  icon="📦" fetcher={inventoryAPI.getInventoryStats} field="total_medicines"
                    highlight="border-slate-700  bg-gradient-to-br from-slate-700  to-slate-800  shadow-lg" />
                <OverviewTile label="Active Stock" icon="✅" fetcher={inventoryAPI.getInventoryStats} field="active_medicines"
                    highlight="border-emerald-700 bg-gradient-to-br from-emerald-600 to-teal-700   shadow-lg" />
                <OverviewTile label="Low Stock"    icon="⚠️" fetcher={inventoryAPI.getInventoryStats} field="low_stock_count"
                    highlight="border-amber-600   bg-gradient-to-br from-amber-500   to-orange-600 shadow-lg" />
                <OverviewTile label="Total Value"  icon="💰" fetcher={inventoryAPI.getInventoryStats} field="total_stock_value" isCurrency
                    highlight="border-indigo-700  bg-gradient-to-br from-indigo-600  to-violet-700 shadow-lg" />
            </div>

            {/* Section header */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm md:text-base font-bold text-slate-800">Complete Inventory</h2>
                <div className="flex gap-1 md:gap-2">
                    <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs md:text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all font-medium">
                        <FiFilter size={12} /> Filter
                    </button>
                    <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs md:text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all font-medium">
                        <FiDownload size={12} /> Export
                    </button>
                </div>
            </div>

            {/* Search & filter bar */}
            <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    <input
                        type="text"
                        placeholder="Search medicines..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white transition-all text-slate-700 placeholder-slate-400"
                    />
                </div>
                <select
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                    className="hidden sm:block px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white text-slate-600 transition-all"
                >
                    {categoryOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <button
                    onClick={handleAddClick}
                    className="flex items-center gap-1 md:gap-1.5 px-3 md:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-sm rounded-lg transition-colors shadow-sm font-semibold whitespace-nowrap"
                >
                    <FiPlus size={14} />
                    <span className="hidden sm:inline">Add Medicine</span>
                    <span className="sm:hidden">Add</span>
                </button>
            </div>

            {/* Mobile: category filter below search */}
            <div className="sm:hidden mb-3">
                <select
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-slate-600"
                >
                    {categoryOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            {/* Mobile: Card list | Desktop: Table */}
            {medicinesLoading ? (
                <LoadingSpinner />
            ) : medicinesError ? (
                <ErrorMessage message={medicinesError} />
            ) : medicinesData && medicinesData.length > 0 ? (
                <>
                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-3">
                        {medicinesData.map((medicine) => (
                            <MedicineCard
                                key={medicine.id}
                                medicine={medicine}
                                onEdit={handleEditClick}
                                onMarkExpired={handleMarkExpired}
                            />
                        ))}
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    {tableHeaders.map(header => (
                                        <th key={header.key} className="px-3 lg:px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                                            {header.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {medicinesData.map((medicine) => (
                                    <tr key={medicine.id} className="hover:bg-indigo-50/40 transition-colors">
                                        {tableHeaders.map(header => (
                                            <td key={header.key} className="px-3 lg:px-4 py-3 text-sm text-slate-700 whitespace-nowrap">
                                                {header.render ? header.render(medicine) : medicine[header.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="text-center py-10 md:py-12 border border-slate-200 rounded-xl bg-white">
                    <p className="text-slate-400 text-sm">No medicines found</p>
                </div>
            )}

            {/* Pagination */}
            {medicinesData && medicinesData.length === limit && (
                <div className="flex items-center justify-center gap-3 mt-4">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        ← Prev
                    </button>
                    <span className="text-sm text-slate-500">Page {page}</span>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Next →
                    </button>
                </div>
            )}

            {/* Modal */}
            <MedicineModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingMedicine(null); setSaveError(''); }}
                onSave={handleSave}
                medicine={editingMedicine}
                loading={isSaving}
                error={saveError}
            />
        </div>
    );
};

export default Inventory;