import{ useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "../lib/api";

function OrdersPage() {
    const querClient = useQueryClient();

    const { data: ordersData, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: orderApi.getAll,
    });

    const updateOrderStatusMutation = useMutation({
        mutationFn: orderApi.updateStatus,
        onSuccess: () => {
            querClient.invalidateQueries({ queryKey: ['orders'] });
            querClient.invalidateQueries({ queryKey: ['dashboardStats'] });
        }
    });

    const handleStatusChange = (orderId, newStatus) => {
        updateOrderStatusMutation.mutate({ orderId, status: newStatus });
    };

    const orders = ordersData?.orders || [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Ordens</h1>
                <p className="text-base-content/70">Gerencie as ordens de compra do sistema</p>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-12 text-base-content/60">
                            <p className="text-xl font-semibold">Nenhuma ordem encontrada</p>
                            <p className="text-sm">Tente criar uma nova ordem</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ORDEM ID</th>
                                        <th>Cliente</th>
                                        <th>Itens</th>
                                        <th>Valor</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => {
                                        const totalQuantity = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);


                                        return (
                                            <tr key={order.id}>
                                                <td>
                                                    <span className="font-medium">{order._id.slice(-8).toUpperCase()}</span>
                                                </td>
                                                <td>
                                                    <div className="font-medium">{order.shippingAddress?.fullName}</div>
                                                    <div className="text-sm opacity-60">{order.shippingAddress?.city}, {order.shippingAddress?.state}</div>
                                                </td>
                                                <td>
                                                    <div className="font-medium">{totalQuantity}</div>
                                                    <div className="text-sm opacity-60">
                                                        {order.orderItems[0]?.name}
                                                        {order.orderItems.length > 1 && ` +${order.orderItems.length - 1} mais itens`}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="font-semibold">
                                                        R$ {order.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                    </span>
                                                </td>
                                                <td>
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                        className="select select-sm select-bordered"
                                                        disabled={updateOrderStatusMutation.isPending}
                                                    >
                                                        <option value="pending">Pendente</option>
                                                        <option value="processing">Processando</option>
                                                        <option value="shipped">Enviado</option>
                                                        <option value="delivered">Entregue</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <span className="text-sm opacity-60">{order.createdAt.toLocaleDateString}</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrdersPage;