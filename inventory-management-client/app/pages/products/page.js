'use client'
import { useAuth } from '@/app/components/context/AuthContext';
import useApiUrl from '@/app/hooks/useApiUrl';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiOutlineFolderView, AiOutlinePlus } from 'react-icons/ai';
import { TbTrash } from 'react-icons/tb';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

const Products = () => {
    const [apiUrl] = useApiUrl();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [productsList, setproductsList] = useState([]);
    const [partialQuery, setPartialQuery] = useState('');
    const [id, setId] = useState('');

    // console.log("productsList", productsList);

    useEffect(() => {
        setIsLoading(true);
        let url;
        if (partialQuery) {
            url = `${apiUrl}/api/products/${user?.email}?partialQuery=${partialQuery}`
        }
        else {
            url = `${apiUrl}/api/products/${user?.email}`
        }
        if (user?.email) {
            axios.get(url)
                .then((products) => {
                    // console.log(products.data);
                    setproductsList(products.data.products);
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [user?.email, apiUrl, partialQuery]);


    const handleDeleteProduct = (productId) => {
        console.log(productId);
        axios.delete(`${apiUrl}/api/products/${productId}`)
            .then(res => {
                console.log("deleted product", res);
                if (res.data.success) {
                    toast.success("Product deleted successfully", {
                        position: toast.POSITION.TOP_RIGHT
                    })

                }
                const newproductsList = productsList.filter(products => products._id !== productId)
                setproductsList(newproductsList)
            })
            .catch(err => {

            });
    };

    return (
        <div className='p-2 lg:p-4  bg-[#F7F7F9] min-h-[100vh] '>
            <ToastContainer />
            <div className="bg-white shadow-md rounded-lg ">
                <div className='flex  justify-between py-6 px-4'>
                    <select className="select select-bordered w-full max-w-xs" disabled>
                        <option disabled selected>Actions</option>

                    </select>
                    <div className='flex  items-center'>
                        <input type="text" className='input input-bordered mr-2' placeholder='Search products' onChange={(e) => setPartialQuery(e.target.value)} />
                        <Link href='/pages/products/new' className='btn bg-[#5A5FE0] text-white hover:text-gray-700'>
                            <AiOutlinePlus className='' /> Add product
                        </Link>
                    </div>
                </div>
                {
                    isLoading ? <div className='flex gap-1 justify-center pb-8'>
                        <p className='text-lg font-bold'>Loading</p>
                        <RotatingLines
                            strokeColor="#5A5FE0"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                    </div> :
                        <div className="overflow-x-auto ">

                            <table className="table capitalize">
                                {/* head */}
                                <thead className='bg-base-200'>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <th>Serial Number</th>
                                        <th>Product Name</th>
                                        <th>Stock</th>
                                        <th>Purchased From</th>
                                        <th>Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}

                                    {



                                        productsList?.length > 0 ? productsList?.map((product, idx) =>

                                            <tr key={product._id}>
                                                <td>
                                                    <label>
                                                        <input type="checkbox" className="checkbox" />
                                                    </label>
                                                </td>
                                                <td className='text-[#5A5FE0] font-semibold'>
                                                    #{product.barCode}
                                                </td>


                                                <td>
                                                    {product.productName}
                                                </td>
                                                <td>{product.stock}</td>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div>
                                                            <div className="font-bold">{product.purchasedFrom.shopName}</div>
                                                            <div className="text-sm opacity-50">{product.purchasedFrom.shopAddress}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-ghost btn-xs"
                                                        onClick={() => {
                                                            document.getElementById('my_modal_3').showModal();
                                                            setId(product._id);
                                                        }}
                                                    >
                                                        <TbTrash className='text-2xl text-rose-500' />
                                                    </button>
                                                    <button className="btn btn-ghost btn-xs">
                                                        <AiOutlineFolderView className='text-2xl text-[#5A5FE0]' />
                                                    </button>
                                                </td>
                                                {/* delete confirmation modal */}
                                                <dialog id="my_modal_3" className="modal">
                                                    <div className="modal-box">
                                                        <form method="dialog">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                        </form>
                                                        <h3 className="font-bold text-l uppercase">Are you sure want to <span className='text-rose-500'>delete</span> the invoice?</h3>
                                                        <div>
                                                            <div className="modal-action">
                                                                <form method="dialog">

                                                                    <button className="btn bg-green-500 text-white mr-2 hover:text-green-500" >Cancel</button>
                                                                    <button className='btn bg-rose-500 text-white hover:text-rose-500' onClick={() => handleDeleteProduct(id)}>Delete</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </dialog>
                                            </tr>

                                        ) :
                                            <div className='my-16 text-center text-xl uppercase text-rose-500'> No products Found! </div>
                                    }


                                </tbody>


                            </table>
                        </div>
                }
            </div>
        </div>
    )
}

export default Products