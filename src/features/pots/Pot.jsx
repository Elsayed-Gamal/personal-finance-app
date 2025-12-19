import { motion } from "motion/react";
import { formatCurrency, formatPercentage } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import AddWithdrawMoney from "./AddWithdrawMoney";
import EllipsisIcon from "../../assets/images/icon-ellipsis.svg?react";
import Menus from "../../ui/Menus";

function Pot({ pot }) {
  return (
    <motion.div className="flex flex-col gap-8 rounded-xl bg-white p-6">
      <div className="flex items-center justify-between">
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
        <Menus.Toggle id={pot.name}>
          <EllipsisIcon />
        </Menus.Toggle>
      </div>
      <Menus.List id={pot.name}>
        <Menus.Button
        // onClick={() => console.log(`Edit ${pot.name} pot`)}
        >
          Edit Pot
        </Menus.Button>
        <div className="bg-grey-100 h-px w-full"></div>
        <Menus.Button
          type="delete"
          // onClick={() => console.log(`Delete ${pot.name} pot`)}
        >
          Delete Pot
        </Menus.Button>
      </Menus.List>

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
            {formatCurrency(pot.total)}
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
              {formatPercentage(pot.total / pot.target)}
            </span>
            <span
              className="text-grey-500"
              style={{ font: "var(--text-preset-5)" }}
            >
              Target of {formatCurrency(pot.target, 0)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <Modal>
          <Modal.Open opens="add-money">
            <button
              className="bg-beige-100 text-grey-900 h-[53px] w-[50%] cursor-pointer rounded-lg p-4"
              style={{ font: "var(--text-preset-4-bold)" }}
            >
              +Add Money
            </button>
          </Modal.Open>
          <Modal.Content name="add-money">
            <AddWithdrawMoney type="add" pot={pot} />
          </Modal.Content>

          <Modal.Open opens="withdraw-money">
            <button
              className="bg-beige-100 text-grey-900 h-[53px] w-[50%] cursor-pointer rounded-lg p-4"
              style={{ font: "var(--text-preset-4-bold)" }}
            >
              Withdraw
            </button>
          </Modal.Open>
          <Modal.Content name="withdraw-money">
            <AddWithdrawMoney type="withdraw" pot={pot} />
          </Modal.Content>
        </Modal>
      </div>
    </motion.div>
  );
}

export default Pot;
