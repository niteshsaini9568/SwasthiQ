import apiClient from './apiClient';

// Dashboard APIs
export const dashboardAPI = {
    getSalesSummary: async () => {
        const response = await apiClient.get('/api/dashboard/sales-summary');
        return response.data;
    },

    getTotalItemsSold: async () => {
        const response = await apiClient.get('/api/dashboard/total-items-sold');
        return response.data;
    },

    getLowStockItems: async () => {
        const response = await apiClient.get('/api/dashboard/low-stock-items');
        return response.data;
    },

    getPurchaseOrderSummary: async () => {
        const response = await apiClient.get('/api/dashboard/purchase-order-summary');
        return response.data;
    },
};

// Inventory APIs
export const inventoryAPI = {
    getMedicines: async (skip = 0, limit = 10, category = null, search = null) => {
        const params = { skip, limit };
        if (category) params.category = category;
        if (search) params.search = search;

        const response = await apiClient.get('/api/inventory/medicines', { params });
        return response.data;
    },

    getMedicineById: async (id) => {
        const response = await apiClient.get(`/api/inventory/medicines/${id}`);
        return response.data;
    },

    addMedicine: async (medicineData) => {
        const response = await apiClient.post('/api/inventory/medicines', medicineData);
        return response.data;
    },

    updateMedicine: async (id, medicineData) => {
        const response = await apiClient.put(`/api/inventory/medicines/${id}`, medicineData);
        return response.data;
    },

    markExpired: async (id) => {
        const response = await apiClient.patch(`/api/inventory/medicines/${id}/mark-expired`);
        return response.data;
    },

    markOutOfStock: async (id) => {
        const response = await apiClient.patch(`/api/inventory/medicines/${id}/mark-out-of-stock`);
        return response.data;
    },

    getMedicinesByCategory: async (category, skip = 0, limit = 10) => {
        const response = await apiClient.get(`/api/inventory/medicines/by/category/${category}`, {
            params: { skip, limit },
        });
        return response.data;
    },

    searchMedicines: async (searchTerm, skip = 0, limit = 10) => {
        const response = await apiClient.get(`/api/inventory/medicines/search/${searchTerm}`, {
            params: { skip, limit },
        });
        return response.data;
    },

    getCategories: async () => {
        const response = await apiClient.get('/api/inventory/categories');
        return response.data;
    },

    getInventoryStats: async () => {
        const response = await apiClient.get('/api/inventory/stats');
        return response.data;
    },

    recordSale: async (saleData) => {
        const response = await apiClient.post('/api/inventory/sales', saleData);
        return response.data;
    },
};

export default {
    dashboardAPI,
    inventoryAPI,
};
