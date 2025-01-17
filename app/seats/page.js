import { Suspense } from "react";
import Seats from "../components/SeatComponent";

export default function SeatsPage({}) {
  return (
    <Suspense>
      <Seats />
    </Suspense>
  );
}
