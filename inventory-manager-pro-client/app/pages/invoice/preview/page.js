"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInvoiceContext } from "@/app/context/InvoiceContext";
import { AiFillPrinter } from "react-icons/ai";
import { RiFileEditFill, RiSave3Fill } from "react-icons/ri";
import { TbCurrencyTaka, TbFileDownload } from "react-icons/tb";
import InvoiceHeader from "@/app/components/Invoice/CreateInvoice/InvoiceHeader";
import BillingDetails from "@/app/components/Invoice/CreateInvoice/BillingDetails";
import ProductDetailsPreview from "@/app/components/Invoice/Preview/ProductDetailsPreview";
import BillingDetailsPreview from "@/app/components/Invoice/Preview/BillingDetailsPreview";
import axios from "axios";
import useApiUrl from "@/app/hooks/useApiUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import ReactToPrint from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import NotePreview from "@/app/components/Invoice/Preview/NotePreview";
import { motion } from "framer-motion";
import Link from "next/link";
import ProtectedRoute from "@/app/components/ProtectedRoute/ProtectedRoute";

const InvoicePreview = () => {
  //states will go here
  const [isSuccess, setIsSuccess] = useState(false);
  const { invoice } = useInvoiceContext();
  const [apiUrl] = useApiUrl();
  const router = useRouter();
  const componentRef = useRef();

  const handleSaveInvoice = () => {
    axios
      .post(`${apiUrl}/api/invoice/new`, invoice)
      .then((result) => {
        if (result.data.success) {
          toast.success("Invoice added successfully!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Close the toast after 3 seconds (optional)
          });
          setIsSuccess(true);
        }
      })
      .catch((err) => {
        console.log("error creating invoice", err);
        alert("Error creating invoice");
      });
  };

  const handleDownloadPDF = () => {
    const input = componentRef.current;

    //store and define shadow
    const originalBoxShadow = input.style.boxShadow;
    input.style.boxShadow = "none";

    html2canvas(input).then((canvas) => {
      input.style.boxShadow = originalBoxShadow;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = pdfWidth - imgWidth * ratio;
      const imgY = 0;
      pdf.addImage(
        imgData,
        "png",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(
        `${invoice.customerDetails.customerName}-invoice-${invoice.invoiceNumber}.pdf`
      );
    });
  };

  return (
    <ProtectedRoute router={router}>
      <div className="w-full h-screen bg-[#F7F7F9] dark:bg-secondary dark:text-gray-400          lg:flex justify-center items-start flex-col lg:flex-row gap-y-2 lg:gap-x-6 min-h-[100vh] p-2 lg:p-4 capitalize">
        <ToastContainer />
        {/* start invoice */}
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          ref={componentRef}
          id="printable-content"
          className="max-w-[700px]  bg-white dark:bg-neutral dark:text-gray-400 shadow p-2 lg:p-4 rounded-md "
        >
          <InvoiceHeader invoice={invoice} />
          <ProductDetailsPreview invoice={invoice} />
          <BillingDetailsPreview invoice={invoice} />
          <NotePreview />
        </motion.div>

        {/* right btns */}
        <motion.div
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          className="max-h-[300px] w-full lg:max-w-[400px] bg-white dark:bg-neutral dark:text-gray-400 rounded-lg shadow-md mt-2 lg:mt-0 p-2 lg:p-4 flex flex-col gap-y-2 lg:gap-y-4 "
        >
          <button
            className={`btn border-none w-full bg-[#5a66f1] text-white hover:text-black dark:disabled:bg-gray-500 dark:disabled:text-gray-400`}
            disabled={isSuccess}
            onClick={handleSaveInvoice}
          >
            <RiSave3Fill className="text-xl" />
            Save Invoice
          </button>
          <Link href="/pages/invoice/new">
            <button className="btn btn-outline w-full border-[#5a66f1] text-primary hover:text-white dark:disabled:bg-gray-500 dark:disabled:text-gray-400">
              <RiFileEditFill className="text-xl" />
              Edit Invoice
            </button>
          </Link>
          <ReactToPrint
            trigger={() => {
              return (
                <button
                  className="btn btn-outline w-full border-[#5a66f1] text-primary hover:text-white dark:disabled:bg-gray-500 dark:disabled:text-gray-400"
                  disabled={!isSuccess}
                >
                  <AiFillPrinter className="text-xl" />
                  Print
                </button>
              );
            }}
            content={() => componentRef.current}
            documentTitle="Invoice"
            printStyle="print"
            target="_self"
          />

          <button
            className="btn btn-outline w-full border-[#5a66f1] text-primary hover:text-white dark:disabled:bg-gray-500 dark:disabled:text-gray-400"
            disabled={!isSuccess}
            onClick={handleDownloadPDF}
          >
            <TbFileDownload className="text-xl" />
            Download
          </button>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
};

export default InvoicePreview;
