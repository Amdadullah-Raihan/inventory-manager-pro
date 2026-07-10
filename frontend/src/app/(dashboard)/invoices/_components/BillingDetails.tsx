"use client";
import React, { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { ToWords } from "to-words";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateInvoice } from "@/redux/slices/invoiceSlice";

const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Rupee",
      plural: "Taka",
      symbol: "",
      fractionalUnit: {
        name: "Paisa",
        plural: "Paise",
        symbol: "",
      },
    },
  },
});

const BillingDetails = () => {
  const invoice = useAppSelector((s) => s.invoice);
  const dispatch = useAppDispatch();

  const [totalInWords, setTotalInWords] = useState("");

  const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateInvoice({
        paymentDetails: {
          ...invoice.paymentDetails,
          discount: Number(e.target.value),
        },
      }),
    );
  };

  const handleTotalPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateInvoice({
        paymentDetails: {
          ...invoice.paymentDetails,
          totalPaid: Number(e.target.value),
        },
      }),
    );
  };

  // Auto-calculate subtotal from products
  useEffect(() => {
    let newSubtotal = 0;
    invoice.productDetails.products.forEach((product) => {
      newSubtotal += product.unitPrice * product.quantity;
    });

    dispatch(
      updateInvoice({
        paymentDetails: {
          ...invoice.paymentDetails,
          subtotal: newSubtotal,
        },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice.productDetails.products]);

  // Auto-calculate total from subtotal - discount
  useEffect(() => {
    const newTotal =
      invoice.paymentDetails.subtotal - invoice.paymentDetails.discount;
    dispatch(
      updateInvoice({
        paymentDetails: {
          ...invoice.paymentDetails,
          total: newTotal,
        },
      }),
    );
    setTotalInWords(toWords.convert(newTotal));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice.paymentDetails.subtotal, invoice.paymentDetails.discount]);

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:justify-between gap-6  py-2 dark:text-gray-400          ">
      {/* left */}
      <div className="w-full text-gray-500 dark:text-gray-400          ">
        <div className="mb-[150px]">
          <h4 className="text-gray-700 mb-2 dark:text-gray-400          ">
            Billing&apos;s Details
          </h4>
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-2">
              <p>Total Paid:</p>
              <input
                type="number"
                className="input w-full input-bordered input-xs  dark:bg-secondary"
                value={
                  invoice.paymentDetails.totalPaid === 0
                    ? ""
                    : invoice.paymentDetails.totalPaid
                }
                onChange={handleTotalPaidChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <p>Total Due:</p>
              <div className="text-gray-700 flex items-center dark:text-gray-400          ">
                <TbCurrencyTaka className="" />
                <p>
                  {invoice.paymentDetails.total -
                    invoice.paymentDetails.totalPaid}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="inline border-t text-gray-500 dark:text-gray-400          ">
            Sales Person&apos;s Signature
          </p>
        </div>
      </div>

      {/* right */}
      <div className="w-full text-gray-500 dark:text-gray-400          ">
        <div className="flex justify-between mb-2">
          <p>Subtotal:</p>
          <p className="flex items-center text-gray-700 dark:text-gray-400          ">
            <TbCurrencyTaka />
            {invoice.paymentDetails.subtotal}
          </p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Discount:</p>
          <p className="flex items-center text-gray-700 dark:text-gray-400          ">
            <TbCurrencyTaka />
            <input
              type="number"
              className="input w-full input-bordered input-xs  dark:bg-secondary"
              value={
                invoice.paymentDetails.discount === 0
                  ? " "
                  : invoice.paymentDetails.discount
              }
              onChange={handleDiscount}
            />
          </p>
        </div>
        <div className="flex justify-between border-b dark:border-b-gray-500  mb-2">
          <p>Tax/Vat:</p>
          <p className="flex items-center text-gray-700 dark:text-gray-400          ">
            0%
          </p>
        </div>
        <div className="flex justify-between">
          <p>Total:</p>
          <p className="flex items-center text-gray-700 dark:text-gray-400          ">
            <TbCurrencyTaka />
            {invoice.paymentDetails.total}
          </p>
        </div>
        <div className="mt-[93px] ">
          <p>{totalInWords}</p>
          <div className="flex  justify-end lg:justify-between border-t">
            <p>Total In Words</p>
            <p className="flex items-center text-gray-700 dark:text-gray-400          ">
              <TbCurrencyTaka />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
