"use client";
import InvoicePreview from "../_components/InvoicePreview";
import { useGetSingleInvoiceQuery } from "@/redux/api/invoiceApi";
import { useParams } from "next/navigation";
import React from "react";

const SingleInvoice = () => {
  const { id: invoiceId } = useParams();
  const { data: singleInvoice = {}, isLoading } = useGetSingleInvoiceQuery(
    invoiceId as string,
    { skip: !invoiceId },
  );

  return (
    <div className="mb-2 w-full md:flex gap-x-4 bg-[#F7F7F9] dark:bg-secondary p-2 lg:p-6">
      <InvoicePreview invoice={singleInvoice} isLoading={isLoading} />
    </div>
  );
};

export default SingleInvoice;
