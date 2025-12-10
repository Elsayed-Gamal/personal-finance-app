import { NavLink } from "react-router";
import OverviewIcon from "../assets/images/icon-nav-overview.svg?react";
import TransactionsIcon from "../assets/images/icon-nav-transactions.svg?react";
import PotsIcon from "../assets/images/icon-nav-pots.svg?react";

function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    ` flex items-center gap-4 px-8 py-4 w-[90%] rounded-tr-xl rounded-br-xl ${isActive ? "bg-beige-100 text-grey-900 border-l-4 border-green" : "text-grey-300"}`;

  const iconClass = (isActive) =>
    ` ${isActive ? "fill-green" : "fill-grey-300"}`;

  return (
    <aside className="min-h-screen rounded-tr-xl rounded-br-xl bg-gray-900">
      <img
        src="/assets/images/logo-large.svg"
        alt="Logo"
        className="px-8 py-10"
      />
      <nav>
        <ul className="flex list-none flex-col">
          <li>
            <NavLink
              to="/"
              className={navLinkClass}
              style={{ font: "var(--text-preset-3)" }}
            >
              {({ isActive }) => (
                <>
                  <OverviewIcon className={iconClass(isActive)} />
                  Overview
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transactions"
              className={navLinkClass}
              style={{ font: "var(--text-preset-3)" }}
            >
              {({ isActive }) => (
                <>
                  <TransactionsIcon className={iconClass(isActive)} />
                  Transactions
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pots"
              className={navLinkClass}
              style={{ font: "var(--text-preset-3)" }}
            >
              {({ isActive }) => (
                <>
                  <PotsIcon className={iconClass(isActive)} />
                  Pots
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
