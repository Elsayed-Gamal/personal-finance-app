import { Outlet } from "react-router";
import Sidebar from "../ui/Sidebar";

function Layout() {
  return (
    <div
      className="bg-beige-100 grid"
      style={{ gridTemplateColumns: "20% 80%" }}
    >
      <Sidebar />
      <main className="px-10 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
