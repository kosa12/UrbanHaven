// app/upload/page.tsx

"use client";

import { useRouter } from "next/navigation";
import IngatlanForm from "./../components/IngatlanForm";

export default function UploadPage() {
  const router = useRouter();

  return (
    <div>
      <IngatlanForm router={router} />
    </div>
  );
}
