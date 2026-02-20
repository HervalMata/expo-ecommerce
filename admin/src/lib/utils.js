export const capitalizeText = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export const getOrderStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
        case "pending":
            return "badge-warning";
        case "processing":
            return "badge-info";
        case "shipped":
            return "badge-primary";
        case "delivered":
            return "badge-success";
        default:
            return "badge-secondary";
    }
}

export const getStockStatusBadge = (stock) => {
    if (stock === 0) return { text: "Out of Stock", className: "badge-error" };
    if (stock < 20) return { text: "Low Stock", className: "badge-warning" };
    return { text: "In Stock", className: "badge-success" };
}

export const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
}