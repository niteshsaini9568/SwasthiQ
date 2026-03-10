import React from 'react';

export const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-2xl shadow-lg p-4 md:p-6 ring-1 ring-gray-100 ${className}`}>
        {children}
    </div>
);

export const CardHeader = ({ title, subtitle, className = '' }) => (
    <div className={`mb-4 ${className}`}>
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-base md:text-xl font-semibold text-gray-900">{title}</h3>
                {subtitle && <p className="text-xs md:text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
        </div>
    </div>
);

export const CardBody = ({ children, className = '' }) => (
    <div className={className}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
    <div className={`pt-4 border-t border-gray-200 ${className}`}>
        {children}
    </div>
);

export const Badge = ({ children, variant = 'default', className = '' }) => {
    const variantStyles = {
        default: 'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
        success: 'bg-green-50 text-green-700 ring-1 ring-green-100',
        warning: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-100',
        error: 'bg-red-50 text-red-700 ring-1 ring-red-100',
        gray: 'bg-gray-50 text-gray-700 ring-1 ring-gray-100',
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>
            {children}
        </span>
    );
};

export const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-6 md:p-8">
        <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
);

export const ErrorMessage = ({ message }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
        <p className="text-red-800 text-sm font-medium">Error</p>
        <p className="text-red-600 text-xs md:text-sm mt-1">{message}</p>
    </div>
);

export const EmptyState = ({ title, description, icon: Icon }) => (
    <div className="text-center py-8 md:py-12">
        {Icon && <Icon className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-300 mb-4" />}
        <h3 className="text-base md:text-lg font-medium text-gray-900">{title}</h3>
        {description && <p className="mt-2 text-xs md:text-sm text-gray-500">{description}</p>}
    </div>
);

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className = '',
    ...props
}) => {
    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 shadow-sm',
        secondary: 'bg-gray-50 border border-gray-200 text-gray-900 hover:bg-gray-100 disabled:bg-gray-100',
        success: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400 shadow-sm',
        danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 shadow-sm',
        ghost: 'text-gray-600 hover:bg-gray-100 disabled:text-gray-400',
    };

    const sizeStyles = {
        sm: 'px-2.5 py-1.5 text-xs md:px-3 md:py-1.5 md:text-sm',
        md: 'px-3 py-2 text-sm md:px-4 md:py-2 md:text-base',
        lg: 'px-4 py-2.5 text-base md:px-6 md:py-3 md:text-lg',
    };

    return (
        <button
            className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <span className="mr-2">⏳</span>}
            {children}
        </button>
    );
};

export const Input = ({ label, error, className = '', ...props }) => (
    <div className="mb-3 md:mb-4">
        {label && <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <input
            className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''} ${className}`}
            {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export const Select = ({ label, options, error, className = '', ...props }) => (
    <div className="mb-3 md:mb-4">
        {label && <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <select
            className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''} ${className}`}
            {...props}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export const Modal = ({ isOpen, onClose, title, children, className = '' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
            <div className={`bg-white rounded-t-2xl sm:rounded-xl shadow-xl w-full sm:max-w-lg mx-0 sm:mx-4 max-h-[90vh] overflow-y-auto ${className}`}>
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-1"
                    >
                        ×
                    </button>
                </div>
                <div className="p-4 md:p-6">{children}</div>
            </div>
        </div>
    );
};

export const Table = ({ headers, rows, loading, error, empty }) => {
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!rows || rows.length === 0) return <EmptyState title="No data" description={empty} />;

    return (
        <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="w-full min-w-max md:min-w-0">
                <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                        {headers.map((header) => (
                            <th key={header.key} className="px-3 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                                {header.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            {headers.map((header) => (
                                <td key={header.key} className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-700 whitespace-nowrap">
                                    {header.render ? header.render(row) : row[header.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const Stat = ({ label, value, change, icon: Icon }) => (
    <div className="flex items-center justify-between gap-3 md:gap-4">
        <div>
            <p className="text-xs md:text-sm font-medium text-gray-500">{label}</p>
            <p className="mt-1 md:mt-2 text-xl md:text-3xl font-semibold text-gray-900">{value}</p>
            {change && (
                <p className={`mt-1 md:mt-2 text-xs md:text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
                </p>
            )}
        </div>
        {Icon && <div className="p-2 rounded-lg bg-gray-50 flex-shrink-0"><Icon className="h-5 w-5 md:h-6 md:w-6 text-gray-500" /></div>}
    </div>
);