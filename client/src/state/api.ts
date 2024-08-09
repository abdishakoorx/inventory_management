import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changedPercentage?: number;
  date: string;
}

interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changedPercentage?: number;
  date: string;
}

interface ExpensesSummary {
  expensesSummaryId: string;
  totalExpenses: number;
  date: string;
}

interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

interface DashoardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expensesSummary: ExpensesSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashoardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
  }),
});

export const { useGetDashboardMetricsQuery } = api;