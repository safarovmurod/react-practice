import { Suspense } from "react";
import type { ReactNode } from "react";
import PageLoading from "./PageLoading";
export default function PageLoader({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoading />}>{children}</Suspense>;
}
