import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Description } from "../sections/Home Sections/Desciption";
import { Home } from "../sections/Home Sections/Home";
import { Featuring } from "../sections/Home Sections/Featuring";
import { About } from "../sections/Home Sections/About";

export function HomePage() {
  // Ensure page always starts at top on full reload / fresh mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // explicitly reset scroll on mount so full reload starts at top
      window.scrollTo({ top: 0, left: 0 });
      // set focus to the top section for keyboard users
      const first = document.getElementById("home");
      if (first) first.focus({ preventScroll: true });
    }
  }, []);
  return (
    <main>
      <NavBar />
      <Home />
      <Description />
      <Featuring />
      <About />
    </main>
  );
}
