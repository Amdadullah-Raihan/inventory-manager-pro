"use client";
import { useAuth } from "@/app/context/AuthContext";
import useApiUrl from "@/app/hooks/useApiUrl";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineFolderView, AiOutlinePlus } from "react-icons/ai";
import { TbShoppingBagEdit, TbTrash } from "react-icons/tb";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa6";
import ProtectedRoute from "@/app/components/ProtectedRoute/ProtectedRoute";
import { useRouter } from "next/navigation";

const Products = () => {
  const [apiUrl] = useApiUrl();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [productsList, setproductsList] = useState([]);
  const [partialQuery, setPartialQuery] = useState("");
  const [id, setId] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const router = useRouter();
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNum: 1,
  });

  // Animation properties for the table and rows.
  const tableVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };
  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // Function to select or deselect all items.
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(productsList.map((item) => item._id));
    } else {
      setSelectedItems([]);
    }
  };

  // Function to handle changes in checkbox selection.
  const handleCheckboxChange = (itemId) => {
    const updatedSelectedItems = [...selectedItems];
    if (updatedSelectedItems.includes(itemId)) {
      updatedSelectedItems.splice(updatedSelectedItems.indexOf(itemId), 1);
    } else {
      updatedSelectedItems.push(itemId);
    }
    setSelectedItems(updatedSelectedItems);
  };

  // Function to delete selected items.
  const handleDeleteSelected = () => {
    axios
      .delete(`${apiUrl}/api/products/delete/many`, {
        data: { ids: selectedItems },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          const newData = productsList.filter(
            (item) => !selectedItems.includes(item._id)
          );
          setproductsList(newData);
          setSelectedItems([]);
          setSelectAll(false);
        }
      })
      .catch((error) => {
        console.error("Error deleting products:", error);
        toast.error("Error deleting products");
      });
  };

  // Effect for loading product data.
  useEffect(() => {
    setIsLoading(true);
    let url;
    if (partialQuery) {
      url = `${apiUrl}/api/products/${user?.email}?partialQuery=${partialQuery}`;
    } else {
      url = `${apiUrl}/api/products/${user?.email}`;
    }
    if (user?.email) {
      axios
        .get(url)
        .then((products) => {
          setproductsList(products.data.products);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user?.email, apiUrl, partialQuery]);

  // Function to delete a single product by ID.
  const handleDeleteProduct = (productId) => {
    axios
      .delete(`${apiUrl}/api/products/${productId}`)
      .then((res) => {
        if (res.data.success) {
          toast.success("Product deleted successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        const newproductsList = productsList.filter(
          (products) => products._id !== productId
        );
        setproductsList(newproductsList);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Product deletion failed");
      });
  };

  return (
    <ProtectedRoute router={router}>
      <div className="w-full p-2 lg:p-4  bg-[#F7F7F9] dark:bg-secondary dark:text-gray-400 min-h-[100vh] ">
        <ToastContainer />
        <div className="max-w-sm lg:max-w-none mx-auto bg-white dark:bg-neutral shadow-md rounded-lg ">
          <div className="flex flex-col lg:flex-row gap-2  lg:justify-between py-6 px-4 ">
            {selectedItems.length > 0 ? (
              <div className="w-full lg:max-w-xs flex items-center justify-between bg-base-200 text-gray-700 dark:text-accent dark:bg-secondary px-4 rounded-lg">
                <p className="text-[14px]">Actions</p>
                <button onClick={handleDeleteSelected}>
                  <FaTrash className="text-rose-500" />
                </button>
              </div>
            ) : (
              <select
                className="select select-bordered w-full dark:bg-secondary lg:max-w-xs dark:border-none"
                disabled
              >
                <option disabled selected>
                  Actions
                </option>
              </select>
            )}
            <div className="flex gap-2  items-center">
              <input
                type="text"
                className="w-full input input-bordered lg:mr-2 dark:bg-secondary"
                placeholder="Search products"
                onChange={(e) => setPartialQuery(e.target.value)}
              />

              <Link
                href="/pages/products/new"
                className="btn border-none btn-primary text-white hover:bg-secondary"
              >
                <AiOutlinePlus className="" />
                <p className="hidden lg:inline">Add product</p>
              </Link>
            </div>
          </div>
          {isLoading ? (
            <div className="flex gap-1 justify-center pb-8">
              <p className="text-lg font-bold">Loading</p>
              <RotatingLines
                strokeColor="#5A5FE0"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            </div>
          ) : (
            <div>
              <motion.table
                initial="hidden"
                animate="visible"
                variants={tableVariants}
                transition={{ duration: 0.5 }}
                className="table capitalize "
              >
                {/* head */}
                <thead className="bg-base-200 dark:bg-secondary dark:text-gray-300">
                  <tr>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="checkbox dark:border-gray-500"
                        />
                      </label>
                    </th>
                    <th>Product</th>
                    <th>Stock</th>
                    <th>Warranty</th>
                    <th>Purchased From</th>
                    <th>Purchasing/Selling Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList?.length > 0 ? (
                    productsList?.map((product, idx) => (
                      <motion.tr
                        variants={rowVariants}
                        transition={{ duration: 0.3 }}
                        key={product._id}
                      >
                        <td>
                          <label>
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(product._id)}
                              onChange={() => handleCheckboxChange(product._id)}
                              className="checkbox dark:border-gray-600"
                            />
                          </label>
                        </td>

                        <td>
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="font-bold text-primary ">
                                {product.productName}
                              </div>
                              <div className="text-sm opacity-50 ">
                                #{product.barCode}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{product.stock}</td>
                        <td>{product.warranty}</td>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="font-bold">
                                {product.purchasedFrom.shopName}
                              </div>
                              <div className="text-sm opacity-50">
                                {product.purchasedFrom.shopAddress}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="font-bold">
                                {product.purchasedFrom.purchasingPrice}
                              </div>
                              <div className="text-sm opacity-50">
                                {product.purchasedFrom.sellingPrice}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <button
                            className="btn border-none btn-ghost btn-xs"
                            onClick={() => {
                              document.getElementById("my_modal_3").showModal();
                              setId(product._id);
                            }}
                          >
                            <TbTrash className="text-2xl text-rose-500" />
                          </button>
                          <Link
                            href={`/pages/products/update/${product._id}`}
                            className="dark:text-accent"
                          >
                            <button className="btn border-none btn-ghost btn-xs ">
                              <TbShoppingBagEdit className="text-2xl " />
                            </button>
                          </Link>
                        </td>

                        {/* delete confirmation modal */}
                        <dialog id="my_modal_3" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn border-none btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>
                            <h3 className="font-bold text-l uppercase">
                              Are you sure want to{" "}
                              <span className="text-rose-500">delete</span> the
                              invoice?
                            </h3>
                            <div>
                              <div className="modal-action">
                                <form method="dialog">
                                  <button className="btn border-none bg-green-500 text-white mr-2 hover:text-green-500">
                                    Cancel
                                  </button>
                                  <button
                                    className="btn border-none bg-rose-500 text-white hover:text-rose-500"
                                    onClick={() => handleDeleteProduct(id)}
                                  >
                                    Delete
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </dialog>
                      </motion.tr>
                    ))
                  ) : (
                    <div className="my-16 text-center text-xl uppercase text-rose-500">
                      {" "}
                      No products Found!{" "}
                    </div>
                  )}
                  {
                    <tr>
                      <td>
                        <select
                          value={pagination.pageSize}
                          onChange={(e) =>
                            setPagination({
                              ...pagination,
                              pageSize: parseInt(e.target.value),
                            })
                          }
                          className="select select-sm dark:bg-neutral dark:border-gray-500"
                        >
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={30}>30</option>
                          <option value={40}>40</option>
                          <option value={50}>50</option>
                        </select>
                      </td>
                      <td>Row Per Page</td>
                      <td colSpan={5} className="text-end">
                        <div className="join border-none">
                          {productsList.map((btn, idx) => (
                            <button
                              key={idx}
                              className="btn join-item bg-primary text-accent border-none hover:bg-secondary"
                              onClick={() =>
                                setPagination({
                                  ...pagination,
                                  pageNum: idx + 1,
                                })
                              }
                            >
                              {idx + 1}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </motion.table>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Products;
