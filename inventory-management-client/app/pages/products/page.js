'use client'
import ProtectedRoute from '@/app/components/ProtectedRoute/ProtectedRoute';
import { useAuth } from '@/app/components/context/AuthContext';
import useApiUrl from '@/app/hooks/useApiUrl';
import useFirebase from '@/app/hooks/useFirebase';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Products = () => {
    const [apiURL] = useApiUrl();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const router = useRouter();
    console.log("user from product page", user);

    useEffect(() => {

        if (user?.email) {
            axios.get(`${apiURL}/api/products?email=${user?.email}`)
                .then(res => {
                    console.log(res.data.products);
                    setProducts(res.data.products);
                    setIsLoading(false);
                })
                .catch(err => console.error(err));
        }
    }, [apiURL, user?.email]);



    return (
        <ProtectedRoute router={router}>
            <div className='lg:p-6 p-2 relative min-h-[100vh] w-full bg-[#F7F7F9] '>
                <div>
                    {isLoading ? <div className='flex items-center justify-center gap-2 w-full'>
                        <p className='text-xl font-bold'>Loading</p>
                        <RotatingLines
                            strokeColor="#5A66F1"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="25"
                            visible={true}
                        />
                    </div> :

                        !products?.length ? <div className='text-center pt-16'>
                            <p className='w-full mx-auto text text-red-400 text-5xl'>No Product Found!</p>
                        </div> :
                            <div className='border bg-white p-2'>
                                {
                                    products.map((product, idx) => <div key={product._id}
                                        className='flex gap-2'>
                                        <p>{idx + 1}</p>
                                        <p>{product.productName}</p>
                                    </div>)
                                }
                            </div>
                    }
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default Products