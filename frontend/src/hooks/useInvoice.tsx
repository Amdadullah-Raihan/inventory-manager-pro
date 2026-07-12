"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetLatestInvoiceNumberQuery } from "@/redux/api/invoiceApi";
import { updateInvoice } from "@/redux/slices/invoiceSlice";

const useInvoice = () => {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

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

      dispatch(
        updateInvoice({
          invoiceNumber: newInvoiceNumber,
          userEmail: user.email as string,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email, latestInvoiceData, currentYear, currentMonth, currentDay]);
};

export default useInvoice;
