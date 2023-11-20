"use client";
import React, { useEffect, useState } from "react";
import { TbCurrencyTaka, TbFileDownload } from "react-icons/tb";
import { AiFillPrinter, AiOutlineSend } from "react-icons/ai";
import { RiFileEditFill, RiSave3Fill } from "react-icons/ri";
import { FaArrowRotateRight, FaPlus } from "react-icons/fa6";
import ProtectedRoute from "@/app/components/ProtectedRoute/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ToWords } from "to-words";
import useInvoice from "@/app/hooks/useInvoice";
import { useInvoiceContext } from "@/app/context/InvoiceContext";
import Link from "next/link";
import InvoiceHeader from "@/app/components/Invoice/CreateInvoice/InvoiceHeader";
import InvoiceTo from "@/app/components/Invoice/CreateInvoice/InvoiceTo";
import AddProductDetails from "@/app/components/Invoice/CreateInvoice/AddProductDetails";
import BillingDetails from "@/app/components/Invoice/CreateInvoice/BillingDetails";
import { GrPowerReset } from "react-icons/gr";
import NotePreview from "@/app/components/Invoice/Preview/NotePreview";
import { motion } from "framer-motion";

const CreateInvoice = () => {
  const { invoice, setInvoice } = useInvoiceContext();
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true);

  // console.log('customerDetails', invoice.customerDetails);
  // console.log('invoice', invoice);
  // console.log('paymentDetails', invoice.paymentDetails);

  const issuedDate = new Date().toISOString().split("T")[0];

  const handleReset = (resetOption) => {
    if (resetOption === "all") {
      setInvoice({
        userEmail: "",
        invoiceNumber: "",
        issuedDate: issuedDate,
        customerDetails: {
          customerName: "",
          customerAddress: "",
          customerPhoneNo: "",
          customerEmail: "",
        },
        productDetails: {
          products: [
            {
              productName: "",
              warranty: "",
              quantity: 0,
              unitPrice: 0,
            },
          ],
        },
        paymentDetails: {
          subtotal: 0,
          discount: 0,
          total: 0,
          totalPaid: 0,
          totalDue: 0,
        },
      });
    } else if (resetOption === "customer") {
      setInvoice((prevInvoice) => ({
        ...prevInvoice,
        invoiceNumber: "",
        customerDetails: {
          customerName: "",
          customerAddress: "",
          customerPhoneNo: "",
          customerEmail: "",
        }, // Reset customerDetails to an empty object
      }));
    } else if (resetOption === "product") {
      setInvoice((prevInvoice) => ({
        ...prevInvoice,
        invoiceNumber: "",
        productDetails: {
          products: [
            {
              productName: "",
              warranty: "",
              quantity: 0,
              unitPrice: 0,
            },
          ],
        }, // Reset productsDetails to an empty object
      }));
      setInvoice((prevInvoice) => ({
        ...prevInvoice,
        invoiceNumber: "",
        paymentDetails: {
          subtotal: 0,
          discount: 0,
          total: 0,
          totalPaid: 0,
          totalDue: 0,
        }, // Reset paymentDetails to an empty object
      }));
    }
  };

  //validate invoice details
  useEffect(() => {
    const { productDetails, customerDetails, paymentDetails } = invoice;

    let disabled = false;

    // console.log(paymentDetails);

    if (
      !customerDetails.customerName ||
      !customerDetails.customerAddress ||
      !customerDetails.customerPhoneNo ||
      paymentDetails.total === 0
    ) {
      disabled = true;
    } else if (productDetails && productDetails.products) {
      for (const product of productDetails.products) {
        if (
          !product.productName ||
          !product.warranty ||
          product.quantity === 0 ||
          product.unitPrice === 0
        ) {
          disabled = true;
          break; // Break the loop if any product is invalid
        }
      }
    }

    setIsDisabled(disabled);
  }, [invoice]);

  console.log("isDisabled", isDisabled);

  return (
    <>
      <div className="w-full bg-[#F7F7F9] dark:bg-secondary lg:flex justify-center items-start flex-col lg:flex-row gap-y-2 lg:gap-x-6 min-h-[100vh] p-2 lg:p-4 capitalize">
        {/* Invoice Starts */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-[700px]  bg-white dark:bg-neutral dark:text-gray-400  shadow p-2 lg:p-4 rounded-md"
        >
          <InvoiceHeader invoice={invoice} />
          <InvoiceTo />
          <AddProductDetails />
          <BillingDetails />
          <NotePreview />
        </motion.div>
        {/* Invoice ends */}

        {/* right btn  */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="max-h-[300px] w-full lg:max-w-[400px] bg-white dark:bg-neutral rounded-md shadow-md mt-2 lg:mt-0 p-2 lg:p-4 flex flex-col gap-y-2 lg:gap-y-4"
        >
          <Link
            href={isDisabled ? "" : "/pages/invoice/preview"}
            className="flex items-center gap-2"
          >
            <button
              disabled={isDisabled}
              className="btn border-none w-full bg-[#5a66f1] text-white hover:text-black disabled:dark:bg-base-200"
            >
              <RiSave3Fill className="text-xl" />
              See Preview
            </button>
          </Link>

          {process.env.NODE_ENV === "development" && (
            <>
              <button
                className="btn border-none w-full bg-orange-500 text-white hover:text-black"
                onClick={() => handleReset("customer")}
              >
                Reset customer details
              </button>

              <button
                className="btn border-none w-full bg-blue-500 text-white hover:text-black"
                onClick={() => handleReset("product")}
              >
                Reset Product Details
              </button>
            </>
          )}

          <button
            className="btn border-none w-full bg-rose-500 text-white hover:text-black"
            onClick={() => handleReset("all")}
          >
            <FaArrowRotateRight className="text-xl" />
            Reset All
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default CreateInvoice;
