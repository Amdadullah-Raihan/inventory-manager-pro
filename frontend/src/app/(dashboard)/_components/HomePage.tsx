"use client";
import React from "react";
import {
  FaBangladeshiTakaSign,
  FaChartLine,
  FaChartSimple,
  FaCircleDot,
  FaDollarSign,
  FaSackDollar,
} from "react-icons/fa6";
import LineChartDemo from "@/components/charts/LineChart";
import { useAppSelector } from "@/redux/hooks";
import { useGetSalesDataQuery } from "@/redux/api/featureApi";
import { motion } from "framer-motion";

const HomePage = () => {
  const { user } = useAppSelector((s) => s.auth);
  const timeInterval = useAppSelector((s) => s.timeInterval.timeInterval);

  const { data: salesData } = useGetSalesDataQuery(
    { userEmail: user?.email as string, timeInterval },
    { skip: !user?.email },
  );

  const totalSold = salesData?.totalSold || 0;
  const totalPurchased = salesData?.totalPurchased || 0;

  // Function to format numbers with commas
  const formatNumberWithCommas = (number: number) => {
    return number.toLocaleString("en-IN");
  };

  const cardData = [
    {
      title: "Sales Overview",
      icon: <FaChartSimple className="text-2xl text-primary" />,
      value: totalSold,
      label: "Total Sales: ",
    },
    {
      title: "Purchase Overview",
      icon: <FaDollarSign className="text-2xl text-primary" />,
      value: totalPurchased,
      label: "Total Purchased: ",
    },
    {
      title: "Revenue Overview",
      icon: <FaChartLine className="text-2xl text-primary" />,
      value: totalSold,
      label: "Total Revenue: ",
    },
    {
      title: "Profit Overview",
      icon: <FaSackDollar className="text-2xl text-primary" />,
      value: totalSold - totalPurchased,
      label: "Total Profit:",
    },
  ];

  return (
    <motion.div className="bg-[#F7F7F9] dark:bg-secondary overflow-hidden w-full min-h-[100vh] p-2 lg:p-6  dark:text-accent">
      <motion.div className="grid grid-cols-1 gap-2 mb-2 lg:gap-6 md:grid-cols-2 xl:grid-cols-4 lg:mb-6">
        {cardData.map((data, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            key={index}
            className="p-4 bg-white rounded-md shadow dark:bg-neutral"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-bold ">{data.title}</h3>
                {data.icon}
              </div>
              <div className="flex justify-between">
                <div className="leading-3">
                  <p className="mb-1 dark:text-accent">{data.label}</p>
                  <small className="text-gray-500">In Last Week</small>
                </div>
                <div className="flex items-center">
                  <FaBangladeshiTakaSign className="text-lg" />
                  <p className="text-lg font-bold">
                    {formatNumberWithCommas(data.value)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-[100%] bg-white dark:bg-neutral p-2 lg:p-6 shadow-md rounded-lg pr-4"
      >
        <div className="flex gap-6 mb-6 ml-6">
          <div className="flex items-center gap-2">
            <FaCircleDot className="text-primary" />
            <p>Total Sales</p>
          </div>
          <div className="flex items-center gap-2">
            <FaCircleDot className="text-[#82ca9d]" />
            <p>Total Expenses</p>
          </div>
        </div>
        <LineChartDemo />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
