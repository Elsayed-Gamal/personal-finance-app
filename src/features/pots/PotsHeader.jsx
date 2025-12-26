import Modal from "../../ui/Modal";
import AddEditPot from "./AddEditPot";

function PotsHeader() {
  return (
    <div className="mb-8 flex h-14 items-center justify-between">
      <h1
        className="text-gray-900"
        style={{
          font: "var(--text-preset-1)",
        }}
      >
        Pots
      </h1>
      <Modal>
        <Modal.Open opens="create-pot">
          <button
            className="bg-grey-900 h-[53px] cursor-pointer rounded-lg px-4 py-2 text-white"
            style={{ font: "var(--text-preset-4-bold)" }}
            onClick={() => console.log("Create new pot")}
          >
            + Add New Pot
          </button>
        </Modal.Open>
        <Modal.Content name="create-pot">
          <AddEditPot type="add" />
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default PotsHeader;
