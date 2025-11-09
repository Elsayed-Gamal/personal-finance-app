import { Outlet } from "react-router";

function Layout() {
  return (
    <div
      className="bg-beige-100 grid"
      style={{
        gridTemplateColumns: "20% 80%",
      }}
    >
      <aside className="min-h-screen rounded-tr-xl rounded-br-xl bg-gray-900 p-4">
        Sidebar
      </aside>
      <main className="px-10 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
