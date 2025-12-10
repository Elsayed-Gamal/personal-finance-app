import { motion } from "motion/react";

function Pot({ pot }) {
  return (
    <motion.div className="flex flex-col gap-8 rounded-xl bg-white p-6">
      <div className="flex items-center gap-4">
        <span
          className="inline-block h-4 w-4 rounded-full"
          style={{ backgroundColor: pot.theme }}
        ></span>
        <h2
          className={`text-grey-900`}
          style={{ font: "var(--text-preset-2)" }}
        >
          {pot.name}
        </h2>
      </div>

      <div className="flex flex-col gap-4 py-[10.5px]">
        <div className="flex justify-between">
          <h3
            className="text-grey-500"
            style={{ font: "var(--text-preset-4)" }}
          >
            Total Saved
          </h3>
          <span
            className="text-grey-900"
            style={{ font: "var(--text-preset-1)" }}
          >
            {pot.total}
          </span>
        </div>
        <div className="flex flex-col gap-[13px]">
          <div className="bg-beige-100 h-2 w-full rounded-full">
            <div
              className={`h-2 rounded-full`}
              style={{
                width: `${(pot.total / pot.target) * 100}%`,
                backgroundColor: pot.theme,
              }}
            ></div>
          </div>
          <div className="flex justify-between">
            <span
              className="text-grey-500"
              style={{ font: "var(--text-preset-5-bold)" }}
            >
              {(pot.total / pot.target) * 100}%
            </span>
            <span
              className="text-grey-500"
              style={{ font: "var(--text-preset-5)" }}
            >
              Target of {pot.target}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <button
          className="bg-beige-100 text-grey-900 h-[53px] w-[50%] cursor-pointer rounded-lg p-4"
          style={{ font: "var(--text-preset-4-bold)" }}
        >
          +Add Money
        </button>
        <button
          className="bg-beige-100 text-grey-900 h-[53px] w-[50%] cursor-pointer rounded-lg p-4"
          style={{ font: "var(--text-preset-4-bold)" }}
        >
          Withdraw
        </button>
      </div>
    </motion.div>
  );
}

export default Pot;
