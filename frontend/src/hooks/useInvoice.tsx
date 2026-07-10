"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthContext";
import { useGetLatestInvoiceNumberQuery } from "@/redux/api/invoiceApi";

const useInvoice = () => {
  const { user } = useAuth();

  const issuedDate = new Date().toISOString().split("T")[0];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const [invoice, setInvoice] = useState({
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

  const { data: latestInvoiceData } = useGetLatestInvoiceNumberQuery();

  // Generate a new invoice Number
  useEffect(() => {
    if (!user?.email) return;

    if (latestInvoiceData?.greatestInvoiceNumber) {
      const greatestInvoiceNumber = parseInt(
        latestInvoiceData.greatestInvoiceNumber,
      );

      const newInvoiceNumber = `CN-${currentYear}${currentMonth}${currentDay}-${String(
        greatestInvoiceNumber + 1,
      ).padStart(3, "0")}`;

      setInvoice((prevInvoice) => ({
        ...prevInvoice,
        invoiceNumber: newInvoiceNumber,
        userEmail: user.email as string,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email, latestInvoiceData, currentYear, currentMonth, currentDay]);

  return {
    invoice,
    setInvoice,
  };
};

export default useInvoice;
