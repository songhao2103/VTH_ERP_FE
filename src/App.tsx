import { useEffect, useState } from "react";
import "./App.css";
import { initTheme } from "./lib/theme";
import MainLayout from "@/components/layout/MainLayout";
import PrivateLayout from "@/components/layout/PrivateLayout";

function App() {
  useEffect(() => {
    initTheme();
  }, []);

  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <MainLayout>
      <PrivateLayout>
        <div className="">
          <button onClick={toggle} className="">
            {dark ? "Dark" : "Light"}
          </button>
        </div>
      </PrivateLayout>
    </MainLayout>
  );
}

export default App;
