import { Suspense } from "react";
import ReceiptClient from "./ReceiptClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Generating receipt...
        </div>
      }
    >
      <ReceiptClient />
    </Suspense>
  );
}
