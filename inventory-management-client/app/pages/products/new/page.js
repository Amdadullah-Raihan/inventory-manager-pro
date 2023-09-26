'use client'
import ProtectedRoute from '@/app/components/ProtectedRoute/ProtectedRoute';
import { useAuth } from '@/app/components/context/AuthContext';
import useApiUrl from '@/app/hooks/useApiUrl';
import useFirebase from '@/app/hooks/useFirebase';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiOutlineScan } from 'react-icons/ai'
import { BsBagPlus, BsFillBagPlusFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProduct = () => {
    const [apiURL] = useApiUrl();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuth();
    const router = useRouter();



    const [product, setProduct] = useState({
        user: '',
        productName: "",
        barCode: "",
        brand: "",
        purchasedFrom: {
            shopName: "",
            shopNumber: "",
            shopAddress: "",
            purchasingPrice: 0,
            sellingPrice: 0,
            purchasingDate: new Date().toDateString(),
        },
        stock: "",
        warranty: "",

    });
    // Use useEffect to update the product state when user data becomes available
    useEffect(() => {
        if (user && user.email) {
            // Update the product state with the user's email
            setProduct({ ...product, user: user.email });
        }
    }, [user]);

    console.log("user from add product page", user);
    // console.log("product", product);
    // console.log("shop name", product.purchasedFrom.shopName);
    // console.log("node_env", process.ene.NODE_ENV);


    const handleAddProduct = (e) => {
        e.preventDefault()
        setIsLoading(true);

        axios.post(`${apiURL}/api/products/new`, product)
            .then((result) => {

                if (result.data.success) {

                    toast.success('Product added successfully!', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000, // Close the toast after 3 seconds (optional)
                    });
                    setIsLoading(false);
                    // Reset the form after a successful submission
                    setProduct({
                        user: user.email,
                        productName: "",
                        barCode: "",
                        brand: "",
                        purchasedFrom: {
                            shopName: "",
                            shopNumber: "",
                            shopAddress: "",
                            purchasingPrice: 0,
                            sellingPrice: 0,
                            purchasingDate: new Date().toDateString(),
                        },
                        stock: "",
                        warranty: "",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                toast.success(`${error.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000, // Close the toast after 3 seconds (optional)
                });
            });
    };

    const successToast = () => {
    }

    return (
        <ProtectedRoute router={router}>
            <div className='lg:p-6 p-2 relative min-h-[100vh] w-full bg-[#F7F7F9] '>
                <form onSubmit={(e) => handleAddProduct(e)}>
                    <div className="bg-white shadow lg:p-6 p-2 rounded-lg max-w-[900px] mx-auto">
                        <p className='uppercase font-bold text-2xl w-full text-center text-[#5A66F1] flex justify-center gap-2'><BsFillBagPlusFill /> Add a New Product </p>

                        <div className='mt-6'>
                            <p className='border-b font-bold mb-4 text-lg'>Products Details</p>
                            <div className=' grid lg:grid-cols-2 gap-y-3 gap-x-4
                '>


                                <div>
                                    <p>Title</p>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Product's Title"
                                        className='border rounded-md  h-[48px]  w-full px-4'
                                        required
                                        onChange={(e) => setProduct({ ...product, productName: e.target.value })} />

                                </div>
                                <div>
                                    <p>Brand</p>
                                    <input
                                        type="text"
                                        name="brand"
                                        placeholder="Product's Brand"
                                        className='border rounded-md  h-[48px]  w-full px-4'
                                        required
                                        onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <p>Scan Serial No.</p>
                                    <div className='flex items-center relative'>
                                        <input
                                            type="text"
                                            name="barCode"
                                            placeholder="Write Serial No."
                                            className='border rounded-md  h-[48px]  w-full px-4'
                                            required
                                            onChange={(e) => setProduct({ ...product, barCode: e.target.value })} />

                                        <AiOutlineScan className='absolute text-3xl text-[#5A66F1] right-2 bg-white' />
                                    </div>
                                </div>
                                <div>
                                    <p>Stock</p>
                                    <input
                                        type="number"
                                        name="stock"
                                        placeholder="Product's Stock"
                                        className='border rounded-md  h-[48px]  w-full px-4'
                                        required
                                        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <p>Warranty</p>
                                    <input
                                        type="text"
                                        name="warranty"
                                        placeholder="Product's Warranty (ex: 2 years, 3 months etc.)"
                                        className='border rounded-md  h-[48px]  w-full px-4'
                                        required
                                        onChange={(e) => setProduct({ ...product, warranty: e.target.value })}
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Puchasing Details */}
                        <div className='mt-6'>
                            <p className='border-b mb-4 font-bold text-lg'>Purchasing Details</p>
                            <div className='grid lg:grid-cols-2 gap-4'>
                                <div>
                                    <p>Shop Name </p>
                                    <input
                                        type="text" name="shopName"
                                        placeholder="Shop Name"
                                        className='border rounded-md  h-[48px]  w-full px-4'
                                        required
                                        onChange={(e) => setProduct({ ...product, purchasedFrom: { ...product.purchasedFrom, shopName: e.target.value } })}
                                    />
                                </div>

                                <div>
                                    <p>Shop Number </p>
                                    <input
                                        type="text" name="shopNumber"
                                        placeholder="Shop Number"
                                        className='border rounded-md  h-[48px]  w-full px-4'
                                        required
                                        onChange={(e) => setProduct({ ...product, purchasedFrom: { ...product.purchasedFrom, shopNumber: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <p>Shop Address </p>
                                    <input
                                        type="text" name="shopAddress"
                                        placeholder="Shop Address"
                                        className='border rounded-md  h-[48px]  w-full px-4'
                                        required
                                        onChange={(e) => setProduct({ ...product, purchasedFrom: { ...product.purchasedFrom, shopAddress: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <p>Purchasing Price </p>
                                    <input
                                        type="number" name="purchasingPrice"
                                        placeholder="Purchasing Price in Taka"
                                        className='border rounded-md  h-[48px]  w-full px-4'
                                        required
                                        onChange={(e) => setProduct({ ...product, purchasedFrom: { ...product.purchasedFrom, purchasingPrice: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <p>Selling Price </p>
                                    <input
                                        type="number" name="sellingPrice"
                                        placeholder="Selling Price in Taka"
                                        className='border rounded-md h-[48px]  w-full px-4'
                                        required
                                        onChange={(e) => setProduct({ ...product, purchasedFrom: { ...product.purchasedFrom, sellingPrice: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <p className='text-white hidden lg:block'>.</p>
                                    <button type='submit' className='btn w-full bg-[#5A66F1] text-white  hover:bg-blue-400'><BsBagPlus className='' />Add Product</button>
                                    <ToastContainer />
                                </div>

                            </div>
                        </div>
                    </div>
                </form>

            </div >
        </ProtectedRoute>
    )
}

export default CreateProduct