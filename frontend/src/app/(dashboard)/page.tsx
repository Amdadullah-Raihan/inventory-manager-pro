"use client";

import { useState } from "react";
import { useGetSalesDataQuery } from "@/redux/api/api";
import { Card, CardContent } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { PageLoader } from "@/components/ui/Spinner";
import {
  TrendingUp,
  ShoppingCart,
  DollarSign,
  PiggyBank,
  Package,
  FileText,
} from "lucide-react";

const timeOptions = [
  { value: "daily", label: "Today" },
  { value: "weekly", label: "This Week" },
  { value: "monthly", label: "This Month" },
  { value: "yearly", label: "This Year" },
  { value: "all", label: "All Time" },
];

export default function DashboardPage() {
  const [interval, setInterval] = useState("weekly");
  const { data, isLoading } = useGetSalesDataQuery(interval);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-IN").format(n);

  const stats = [
    {
      title: "Total Sales",
      value: data?.data?.totalSold ?? 0,
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Total Purchases",
      value: data?.data?.totalPurchased ?? 0,
      icon: ShoppingCart,
      color: "text-orange-600",
      bg: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      title: "Revenue",
      value: data?.data?.totalSold ?? 0,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Profit",
      value: (data?.data?.totalSold ?? 0) - (data?.data?.totalPurchased ?? 0),
      icon: PiggyBank,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];

  if (isLoading) return <PageLoader />;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <Select
          options={timeOptions}
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="w-40"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      ৳{formatCurrency(stat.value)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <QuickLink
          href="/pages/invoice/new"
          icon={FileText}
          title="Create Invoice"
          description="Generate a new invoice for your customer"
        />
        <QuickLink
          href="/pages/products/new"
          icon={Package}
          title="Add Product"
          description="Add a new product to your inventory"
        />
      </div>
    </div>
  );
}

function QuickLink({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}
