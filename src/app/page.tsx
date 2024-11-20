"use client"
import React, { useState } from "react";
import CarsList from "../components/carsList/carsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <CarsList />
      </div>
    </QueryClientProvider>


  );
}
