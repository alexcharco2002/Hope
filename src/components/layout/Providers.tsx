"use client";

import { ReactNode } from "react";
import { ImageModalProvider } from "@/context/ImageModalContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ImageModalProvider>
      {children}
    </ImageModalProvider>
  );
}
