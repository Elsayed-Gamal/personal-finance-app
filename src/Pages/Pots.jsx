import PotsContainer from "../features/pots/PotsContainer.jsx";

function Pots() {
  return (
    <div>
      <h1
        className="mb-8 text-gray-900"
        style={{
          font: "var(--text-preset-1)",
        }}
      >
        Pots
      </h1>
      <PotsContainer />
    </div>
  );
}

export default Pots;
