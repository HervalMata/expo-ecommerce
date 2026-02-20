import { useQuery } from "@tanstack/react-query";
import { customerApi } from "../lib/api";
import { formatDate } from "../lib/utils";

function CustomersPage() {
    const { data: customersData, isLoading } = useQuery({
        queryKey: ['customers'],
        queryFn: customerApi.getAll,
    });
    const customers = customersData?.customers || [];

    return (
    <div className="space-y-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Clientes</h1>
            <p className="text-base-content/70 mt-1">Gerencie os clientes do sistema</p>
        </div>

        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : customers.length === 0 ? (
                    <div className="text-center py-12 text-base-content/60">
                        <p className="text-xl font-semibold">Nenhum cliente encontrado</p>
                        <p className="text-sm">Tente criar um novo cliente</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Lista de Desejos</th>
                                    <th>Data de Criação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(customer => (
                                    <tr key={customer.id}>
                                        <td className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-primary text-primary-content rounded-full w-12">
                                                    <img src={customer.imageUrl} alt={customer.name} className="w-12 h-12 rounded-full object-cover" />
                                                </div>
                                            </div>
                                            <div className="ml-2">
                                                <p className="font-semibold">{customer.name}</p>
                                            </div>
                                        </td>
                                        <td>{customer.name}</td>
                                        <td>
                                            <div className="badge badge-ghost">{customer.email}</div>
                                        </td>
                                        <td>
                                            <div className="badge badge-ghost">{customer.wishlistCount || 0}</div>
                                        </td>
                                        <td>
                                            <span className="text-sm opacity-60">{formatDate(customer.createdAt)}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>)}
            </div>
        </div>
    </div>);
}

export default CustomersPage;