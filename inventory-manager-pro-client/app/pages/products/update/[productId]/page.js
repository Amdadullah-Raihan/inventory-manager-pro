"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { BsBagPlus, BsFillBagPlusFill } from "react-icons/bs";
import { AiOutlineScan } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import useApiUrl from "@/app/hooks/useApiUrl";
import { TbShoppingBagEdit } from "react-icons/tb";
import ProtectedRoute from "@/app/components/ProtectedRoute/ProtectedRoute";

const UpdateProduct = () => {
  const { productId } = useParams();
  const [apiUrl] = useApiUrl();
  const router = useRouter();

  const [product, setProduct] = useState({
    user: "",
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

  // Funtion to update a product
  const handleUpdateProduct = (e) => {
    e.preventDefault();

    axios
      .put(`${apiUrl}/api/products/update/${productId}`, product)
      .then((response) => {
        if (response.data.success) {
          toast.success("Product updated successfully");
          setProduct(response.data.product);
        } else {
          toast.error("Failed to update product");
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        toast.error("An error occurred while updating the product");
      });
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/products/product/${productId}`)
      .then((res) => {
        // console.log(res);
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [apiUrl, productId]);

  return (
    <ProtectedRoute router={router}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:p-6 p-2 relative min-h-[100vh] w-full bg-[#F7F7F9] dark:bg-secondary  "
      >
        <ToastContainer />
        <form onSubmit={(e) => handleUpdateProduct(e)}>
          <div className="bg-white dark:bg-neutral dark:text-gray-400   shadow lg:p-6 p-2 rounded-lg max-w-[900px] mx-auto">
            <p className="uppercase font-bold text-2xl w-full text-center text-primary flex justify-center gap-2">
              <BsFillBagPlusFill /> Add a New Product{" "}
            </p>

            <div className="mt-6">
              <p className="border-b dark:border-b-gray-500   font-bold mb-4 text-lg">
                Products Details
              </p>
              <div
                className=" grid lg:grid-cols-2 gap-y-3 gap-x-4
                "
              >
                <div>
                  <p>Title</p>
                  <input
                    type="text"
                    name="title"
                    placeholder="Product's Name"
                    value={product.productName}
                    required
                    className="border rounded-md  h-[48px]  w-full px-4 dark:bg-secondary dark:border-none"
                    onChange={(e) =>
                      setProduct({ ...product, productName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <p>Brand</p>
                  <input
                    type="text"
                    name="brand"
                    placeholder="Product's Brand"
                    value={product.brand}
                    required
                    className="border rounded-md  h-[48px]  w-full px-4 dark:bg-secondary dark:border-none"
                    onChange={(e) =>
                      setProduct({ ...product, brand: e.target.value })
                    }
                  />
                </div>
                <div>
                  <p>Scan Serial No.</p>
                  <div className="flex items-center relative">
                    <input
                      type="text"
                      name="barCode"
                      placeholder="Write Serial No."
                      value={product.barCode}
                      required
                      className="border rounded-md  h-[48px]  w-full px-4 dark:bg-secondary dark:border-none"
                      onChange={(e) =>
                        setProduct({ ...product, barCode: e.target.value })
                      }
                    />

                    <AiOutlineScan className="absolute text-3xl text-primary right-2 bg-white dark:bg-secondary" />
                  </div>
                </div>
                <div>
                  <p>Stock</p>
                  <input
                    type="number"
                    name="stock"
                    placeholder="Product's Stock"
                    value={product.stock}
                    required
                    className="border rounded-md  h-[48px]  w-full px-4 dark:bg-secondary dark:border-none"
                    onChange={(e) =>
                      setProduct({ ...product, stock: e.target.value })
                    }
                  />
                </div>
                <div>
                  <p>Warranty</p>
                  <input
                    type="text"
                    name="warranty"
                    placeholder="Product's Warranty (ex: 2 years, 3 months etc.)"
                    value={product.warranty}
                    required
                    className="border rounded-md  h-[48px]  w-full px-4 dark:bg-secondary dark:border-none"
                    onChange={(e) =>
                      setProduct({ ...product, warranty: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Puchasing Details */}
            <div className="mt-6">
              <p className="border-b dark:border-b-gray-500 mb-4 font-bold text-lg">
                Purchasing Details
              </p>
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <p>Shop Name </p>
                  <input
                    type="text"
                    name="shopName"
                    placeholder="Shop Name"
                    value={product.purchasedFrom.shopName}
                    required
                    className="border rounded-md  h-[48px]  w-full px-4 dark:bg-secondary dark:border-none"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        purchasedFrom: {
                          ...product.purchasedFrom,
                          shopName: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div>
                  <p>Shop Number </p>
                  <input
                    type="text"
                    name="shopNumber"
                    placeholder="Shop Number"
                    value={product.purchasedFrom.shopNumber}
                    required
                    className="border rounded-md  h-[48px]  w-full px-4 dark:bg-secondary dark:border-none"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        purchasedFrom: {
                          ...product.purchasedFrom,
                          shopNumber: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <p>Shop Address </p>
                  <input
                    type="text"
                    name="shopAddress"
                    placeholder="Shop Address"
                    value={product.purchasedFrom.shopAddress}
                    required
                    className="border rounded-md  h-[48px]  w-full px-4 dark:bg-secondary dark:border-none"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        purchasedFrom: {
                          ...product.purchasedFrom,
                          shopAddress: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <p>Purchasing Price </p>
                  <input
                    type="number"
                    name="purchasingPrice"
                    placeholder="Purchasing Price in Taka"
                    value={
                      product.purchasedFrom.purchasingPrice === 0
                        ? ""
                        : product.purchasedFrom.purchasingPrice
                    }
                    required
                    className="border rounded-md  h-[48px]  w-full px-4 dark:bg-secondary dark:border-none"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        purchasedFrom: {
                          ...product.purchasedFrom,
                          purchasingPrice: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <p>Selling Price </p>
                  <input
                    type="number"
                    name="sellingPrice"
                    placeholder="Selling Price in Taka"
                    value={
                      product.purchasedFrom.sellingPrice === 0
                        ? ""
                        : product.purchasedFrom.sellingPrice
                    }
                    required
                    className="border rounded-md h-[48px]  w-full px-4 dark:bg-secondary dark:border-none"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        purchasedFrom: {
                          ...product.purchasedFrom,
                          sellingPrice: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <p className="text-white hidden lg:block dark:text-neutral">
                    .
                  </p>
                  <button
                    type="submit"
                    className="btn  border-none w-full bg-[#5A66F1] text-white  hover:bg-secondary"
                  >
                    <TbShoppingBagEdit className="text-lg" />
                    Update Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </ProtectedRoute>
  );
};

export default UpdateProduct;
