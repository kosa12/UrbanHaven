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
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      window.location.href = "/login"; // Redirect to login if no userId
    }
  }, []);

  useEffect(() => {
    params.then((unwrappedParams) => setParamsUnwrapped(unwrappedParams));
  }, [params]);

  const { ingatlan, loading } = useIngatlan(paramsUnwrapped?.id || null);

  if (loading) return <div>Loading...</div>;

  const isOwner =
    userId && ingatlan ? ingatlan.tulajdonos.id.toString() === userId : false;

  return ingatlan ? (
    <IngatlanDetails ingatlan={ingatlan} isOwner={isOwner} />
  ) : (
    <div>No data found.</div>
  );
};

export default IngatlanDetail;
