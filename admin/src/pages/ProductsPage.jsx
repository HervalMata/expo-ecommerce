import { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { productApi } from "../lib/api";
import { PlusIcon, PencilIcon, Trash2Icon, XIcon, ImageIcon } from "lucide-react";
import { getStockStatusBadge } from "../lib/utils";

function ProductsPage() {
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
    });
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const queryClient = useQueryClient();

    const { data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: productApi.getAll,
    });

    const createProductMutation = useMutation({
        mutationFn: productApi.create,
        onSuccess: () => {
            closeModal();
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const updateProductMutation = useMutation({
        mutationFn: productApi.update,
        onSuccess: () => {
            closeModal();
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const deleteProductMutation = useMutation({
        mutationFn: productApi.delete,
        onSuccess: () => {
            closeModal();
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setFormData({
            name: "",
            category: "",
            price: "",
            stock: "",
            description: "",
        });
        setImages([]);
        setImagePreviews([]);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price.toString(),
            stock: product.stock.toString(),
            description: product.description,
        });
        setImagePreviews(product.images);
        setShowModal(true);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 3) {
            alert("You can upload up to 5 images.");
            return;
        }
        imagePreviews.forEach((url) => {
            if (url.startsWith("blob:")) {
                URL.revokeObjectURL(url);
            }
        });
        setImages(files);
        setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!editingProduct && imagePreviews.length === 0) {
            alert("Please upload at least one image.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("stock", formData.stock);
        formDataToSend.append("description", formData.description);

        if (images.length > 0) {
            images.forEach((image) => {
                formDataToSend.append("images", image);
            }
        );

        if (editingProduct) {
            updateProductMutation.mutate({
                id: editingProduct._id,
                data: formDataToSend,
            });
        } else {
            createProductMutation.mutate(formDataToSend);
        }
    };
}

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Produtos</h1>
                    <p className="text-base-content/70 mt-1">Gerencie seu produto</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn btn-primary gap-2">
                    <PlusIcon className="w-5 h-5" />
                    Adicionar Produto
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {products.map((product) => {
                    const status = getStockStatusBadge(product.stock);

                    return (
                        <div key={product._id} className="card bg-base-100 shadow-xl">
                            <div className="card-base">
                                <div className="flex items-center gap-6">
                                    <div className="avatar">
                                        <div className="w-20 rounded-xl">
                                            <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="card-title">{product.name}</h3>
                                                <p className="text-base-content/70 text-sm">{product.category}</p>
                                            </div>
                                            <div className={`image ${status.class}`}>
                                                {status.text}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 mt-4">
                                            <div>
                                                <p className="text-xs text-base-content/70">Preço</p>
                                                <p className="font-bold text-lg">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                            </div>
                                             <div>
                                                <p className="text-xs text-base-content/70">Estoque</p>
                                                <p className="font-bold text-lg">{product.stock}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-actions">
                                        <button
                                            className="btn btn-square btn-ghost"
                                            onClick={() => handleEdit(product)}
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button>
                                            {deleteProductMutation.isLoading ? (
                                                <span className="loading loading-spinner loading-sm"></span>
                                            ) : (
                                                <Trash2Icon className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <input type="checkbox" className="modal-toggle" checked={showModal} />

            <div className="modal">
                <div className="modal-box max-w-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3>{editingProduct ? "Editando Produto" : "Novo Produto"}</h3>
                        <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost">
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">Nome do Produto</label>
                                <input 
                                    type="text"
                                    placeholder="Digite o nome do produto"
                                    className="input input-bordered"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">Categoria do Produto</label>
                                <select 
                                    className="select select-bordered"
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    <option value="Eletrônicos">Eletrônicos</option>
                                    <option value="Roupas">Roupas</option>
                                    <option value="Esportes">Esportes</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">Preço do Produto</label>
                                <input 
                                    type="number"
                                    step="0.01"
                                    placeholder="0,00"
                                    className="input input-bordered"
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">Quantidade em Estoque</label>
                                <input 
                                    type="number"
                                    placeholder="0"
                                    className="input input-bordered"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control flex flex-col gap-2">
                            <label className="label">Descrição do Produto</label>
                            <textarea 
                                className="textarea textarea-bordered h-24 w-full"
                                placeholder="Digite a descrição do produto"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                required
                            ></textarea>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5" />
                                    Imagens do Produto
                                </span>
                            </label>
                            <input 
                                type="file"
                                accept="image/*"
                                className="file-input file-input-bordered file-input-primary w-full"
                                onChange={handleImageChange}
                                multiple
                                required={!editingProduct}
                            />

                            {editingProduct && (
                                <p className="text-xs text-base-content/60 mt-2 text-center">
                                    Deixe em branco para manter as imagens atuais
                                </p>
                            )}

                            {imagePreviews.length > 0 && (
                                <div className="flex gap-1 mt-2">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="avatar">
                                            <div className="w-20 rounded-lg">
                                                <img src={preview} alt={`Preview ${index + 1}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="modal-action">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="btn"
                                disabled={createProductMutation.isPending || updateProductMutation.isPending}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={createProductMutation.isPending || updateProductMutation.isPending}
                            >
                                {createProductMutation.isPending || updateProductMutation.isPending ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : editingProduct ? ("Atualizando...") : ("Criar Produto")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>    
        </div>
    );
}

export default ProductsPage;