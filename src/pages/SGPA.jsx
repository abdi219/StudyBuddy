import { useState } from "react";
import { SGPAHeader } from "../components/SGPAHeader";
import { FourScale } from "./subPages/FourScale";
import { FiveScale } from "./subPages/FiveScale";
import { TenPoints } from "./subPages/TenPoints";

export function SGPA() {
  const [page, setPage] = useState("4");

  return (
    <div>
      <SGPAHeader onChange={setPage} />
      {page === "4" && <FourScale />}
      {page === "5" && <FiveScale />}
      {page === "10" && <TenPoints />}
    </div>
  );
}
