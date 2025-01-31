// pages/ingatlan/[id].tsx
"use client";

import { useEffect, useState } from "react";
import useIngatlan from "../../hooks/useIngatlan";
import IngatlanDetails from "../../components/IngatlanDetails";

interface IngatlanDetailProps {
  params: Promise<{ id: string }>;
}

const IngatlanDetail = ({ params }: IngatlanDetailProps) => {
  const [paramsUnwrapped, setParamsUnwrapped] = useState<{ id: string } | null>(
    null
  );

  useEffect(() => {
    params.then((unwrappedParams) => setParamsUnwrapped(unwrappedParams));
  }, [params]);

  const { ingatlan, loading } = useIngatlan(paramsUnwrapped?.id || null);

  if (loading) return <div>Loading...</div>;

  return ingatlan ? (
    <IngatlanDetails ingatlan={ingatlan} />
  ) : (
    <div>No data found.</div>
  );
};

export default IngatlanDetail;
