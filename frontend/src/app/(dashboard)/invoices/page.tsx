"use client";
import { useAuth } from "@/providers/AuthContext";
import {
  useGetInvoicesQuery,
  useDeleteInvoiceMutation,
  useDeleteManyInvoicesMutation,
} from "@/redux/api/invoiceApi";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineFolderView, AiOutlinePlus } from "react-icons/ai";
import { TbTrash } from "react-icons/tb";
import { RotatingLines } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa6";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

const Invoice = () => {
  const { user } = useAuth();
  const [partialQuery, setPartialQuery] = useState("");
  const [id, setId] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { data: invoiceList = [], isLoading } = useGetInvoicesQuery(
    {
      userEmail: user?.email as string,
      partialQuery: partialQuery || undefined,
    },
    { skip: !user?.email },
  );

  const [deleteInvoice] = useDeleteInvoiceMutation();
  const [deleteManyInvoices] = useDeleteManyInvoicesMutation();

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(invoiceList.map((item) => item._id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (itemId) => {
    const updatedSelectedItems = [...selectedItems];
    if (updatedSelectedItems.includes(itemId)) {
      updatedSelectedItems.splice(updatedSelectedItems.indexOf(itemId), 1);
    } else {
      updatedSelectedItems.push(itemId);
    }
    setSelectedItems(updatedSelectedItems);
  };

  const handleDeleteSelected = async () => {
    try {
      const response = await deleteManyInvoices(selectedItems).unwrap();
      if (response.success) {
        toast.success(response.message);
        setSelectedItems([]);
        setSelectAll(false);
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err?.message || "Error deleting invoices");
    }
  };

  const handleDeleteInvoice = async (invoiceId: string) => {
    try {
      const res = await deleteInvoice(invoiceId).unwrap();
      if (res.success) {
        toast.success("Invoice deleted successfully");
      }
    } catch {
      // error handled by RTK Query
    }
  };

  return (
    <ProtectedRoute>
      <div className="w-full py-4 lg:p-4  bg-[#F7F7F9] dark:bg-secondary dark:text-gray-400 min-h-[100vh] capitalize">
        <Toaster />

        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md lg:max-w-none dark:bg-neutral ">
          <div className="flex flex-col-reverse gap-2 px-4 py-6 lg:flex-row lg:justify-between">
            {selectedItems.length > 0 ? (
              <div className="flex items-center justify-between w-full px-4 text-gray-700 rounded-lg lg:max-w-xs bg-base-200 dark:text-accent dark:bg-secondary">
                <p className="text-[14px]">Actions</p>
                <button onClick={handleDeleteSelected}>
                  <FaTrash className="text-rose-500" />
                </button>
              </div>
            ) : (
              <select
                className="w-full select select-bordered dark:bg-secondary lg:max-w-xs dark:border-none"
                disabled
              >
                <option disabled selected>
                  Actions
                </option>
              </select>
            )}
            <div className="flex items-center gap-2 lg:flex-row">
              <input
                type="text"
                className="w-full input input-bordered lg:mr-2 dark:bg-secondary"
                placeholder="Search Invoice"
                onChange={(e) => setPartialQuery(e.target.value)}
              />

              <Link
                href="/invoices/new"
                className="btn border-none bg-[#5A5FE0] text-white hover:bg-secondary"
              >
                <AiOutlinePlus className="" />{" "}
                <span className="hidden lg:inline">Create Invoice</span>
              </Link>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center gap-1 pb-8">
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
            <div className="overflow-x-auto ">
              <motion.table
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="table"
              >
                <thead className="bg-base-200 dark:bg-secondary dark:text-white">
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
                    <th>Invoic ID</th>
                    <th>Customer </th>
                    <th>Issued Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceList?.length > 0 ? (
                    invoiceList?.map((invoice, idx) => (
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        key={invoice._id}
                      >
                        <td>
                          <label>
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(invoice._id)}
                              onChange={() => handleCheckboxChange(invoice._id)}
                              className="checkbox dark:border-gray-600"
                            />
                          </label>
                        </td>
                        <td className="text-[#5A5FE0] font-semibold">
                          #{invoice.invoiceNumber}
                        </td>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="font-bold">
                                {invoice.customerDetails.customerName}
                              </div>
                              <div className="text-sm opacity-50">
                                {invoice.customerDetails.customerEmail}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          {invoice.issuedDate ? (
                            <span>
                              {
                                new Date(invoice.issuedDate)
                                  .toISOString()
                                  .split("T")[0]
                              }{" "}
                            </span>
                          ) : (
                            <span>No Date Found!</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="border-none btn btn-ghost btn-xs"
                            onClick={() => {
                              (
                                document.getElementById(
                                  "my_modal_3",
                                ) as HTMLDialogElement
                              ).showModal();
                              setId(invoice._id);
                            }}
                          >
                            <TbTrash className="text-2xl text-rose-500" />
                          </button>
                          <Link href={`/invoices/${invoice._id}`}>
                            <button className="border-none btn btn-ghost btn-xs">
                              <AiOutlineFolderView className="text-2xl text-[#5A5FE0]" />
                            </button>
                          </Link>
                        </td>

                        {/* modal  */}
                        <dialog id="my_modal_3" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="absolute border-none btn btn-sm btn-circle btn-ghost right-2 top-2">
                                ✕
                              </button>
                            </form>
                            <h3 className="font-bold uppercase text-l">
                              Are you sure want to{" "}
                              <span className="text-rose-500">delete</span> the
                              invoice?
                            </h3>
                            <div>
                              <div className="modal-action">
                                <form method="dialog">
                                  <button className="mr-2 text-white bg-green-500 border-none btn hover:text-green-500">
                                    Cancel
                                  </button>
                                  <button
                                    className="text-white border-none btn bg-rose-500 hover:text-rose-500"
                                    onClick={() => handleDeleteInvoice(id)}
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
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "100%" }}
                      transition={{ duration: 0.5 }}
                      className="w-full my-16 text-xl text-center uppercase text-rose-500 dark:text-rose-400"
                    >
                      No Invoice Found!
                    </motion.div>
                  )}
                </tbody>
              </motion.table>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Invoice;
