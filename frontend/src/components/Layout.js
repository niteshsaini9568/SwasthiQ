import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiPackage, FiSettings, FiMenu, FiX } from 'react-icons/fi';

export const Navbar = ({ children }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* ── Desktop Sidebar ── */}
            <aside className="hidden md:flex w-16 lg:w-20 bg-white border-r border-gray-200 flex-col items-center py-6 shadow-lg flex-shrink-0">
                <Link to="/" className="mb-6 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-xs lg:text-sm">SQ</span>
                    </div>
                </Link>
                <nav className="flex-1 flex flex-col items-center space-y-3 mt-4">
                    <Link
                        to="/"
                        className={`p-3 rounded-lg transition-all ${isActive('/') ? 'bg-green-100 text-green-700 shadow-md' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
                        title="Dashboard"
                    >
                        <FiHome size={20} />
                    </Link>
                    <Link
                        to="/inventory"
                        className={`p-3 rounded-lg transition-all ${isActive('/inventory') ? 'bg-green-100 text-green-700 shadow-md' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
                        title="Inventory"
                    >
                        <FiPackage size={20} />
                    </Link>
                </nav>
                <button className="p-3 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-colors" title="Settings">
                    <FiSettings size={18} />
                </button>
            </aside>

            {/* ── Mobile Bottom Nav ── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex items-center justify-around py-2 shadow-lg">
                <Link
                    to="/"
                    className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-lg ${isActive('/') ? 'text-green-600' : 'text-gray-400'}`}
                >
                    <FiHome size={20} />
                    <span className="text-xs font-medium">Home</span>
                </Link>
                <Link
                    to="/inventory"
                    className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-lg ${isActive('/inventory') ? 'text-green-600' : 'text-gray-400'}`}
                >
                    <FiPackage size={20} />
                    <span className="text-xs font-medium">Inventory</span>
                </Link>
                <button className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-lg text-gray-400">
                    <FiSettings size={20} />
                    <span className="text-xs font-medium">Settings</span>
                </button>
            </nav>

            {/* ── Main Content ── */}
            <div className="flex-1 p-3 md:p-6 overflow-auto pb-20 md:pb-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-5 md:mb-8 gap-3">
                            <div>
                                <h1 className="text-xl md:text-3xl font-bold text-gray-900">Pharmacy CRM</h1>
                                <p className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1 hidden sm:block">
                                    Manage inventory, sales, and purchase orders
                                </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {/* Export — hide label on small screens */}
                                <button className="hidden sm:flex items-center gap-1.5 px-3 md:px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs md:text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                    <span className="hidden md:inline">Export</span>
                                </button>
                                <Link
                                    to="/inventory"
                                    className="flex items-center gap-1 md:gap-1.5 px-3 md:px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-xs md:text-sm hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-semibold whitespace-nowrap"
                                >
                                    <span className="text-base leading-none">+</span>
                                    <span className="hidden sm:inline">Add Medicine</span>
                                    <span className="sm:hidden">Add</span>
                                </Link>
                            </div>
                        </div>

                        {/* Page content */}
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Layout = ({ children }) => <Navbar>{children}</Navbar>;