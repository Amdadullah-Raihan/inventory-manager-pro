"use client";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useAuth } from "@/providers/AuthContext";
import { useCreateProductMutation } from "@/redux/api/productApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsBagPlus, BsFillBagPlusFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { AiOutlineScan } from "react-icons/ai";

const CreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const [createProduct] = useCreateProductMutation();

  const [product, setProduct] = useState({
    user: user?.email,
    productName: "",
    barCode: "",
    brand: "",
    purchasedFrom: {
      shopName: "",
      shopNumber: "",
      shopAddress: "",
      purchasingPrice: 0,
      sellingPrice: 0,
      purchasingDate: new Date().toISOString(),
    },
    stock: "",
    warranty: "",
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createProduct(product).unwrap();
      if (result.success) {
        toast.success("Product added successfully!", { duration: 3000 });
        setIsLoading(false);
        setProduct({
          user: user?.email,
          productName: "",
          barCode: "",
          brand: "",
          purchasedFrom: {
            shopName: "",
            shopNumber: "",
            shopAddress: "",
            purchasingPrice: 0,
            sellingPrice: 0,
            purchasingDate: new Date().toISOString(),
          },
          stock: "",
          warranty: "",
        });
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err?.message || "Error adding product", { duration: 3000 });
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute router={router}>
      {/* <BarcodeReader onScan={handleScan} /> */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:p-6 p-2 relative min-h-[100vh] w-full bg-[#F7F7F9] dark:bg-secondary  "
      >
        <form onSubmit={(e) => handleAddProduct(e)}>
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
                          purchasingPrice: Number(e.target.value),
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
                          sellingPrice: Number(e.target.value),
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
                    className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none bg-primary text-accent hover:bg-primary/90 h-10 px-4 text-sm  border-none w-full bg-[#5A66F1] text-white  hover:bg-secondary"
                  >
                    <BsBagPlus className="" />
                    Add Product
                  </button>
                  <Toaster />
                </div>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </ProtectedRoute>
  );
};

export default CreateProduct;
