import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { getPots } from "../../services/apiPots";
import Pot from "./Pot";
import Loading from "../../ui/Loading";
import Message from "../../ui/Message";

const parentVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function PotsContainer() {
  const {
    data: pots,
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ["pots"],
    queryFn: () => getPots(),
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Message type="error">{error.message}</Message>;
  }

  return (
    <motion.div
      className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-6"
      variants={parentVariant}
      initial="hidden"
      animate="visible"
    >
      {pots.map((pot) => (
        <motion.div key={pot.name} variants={itemVariant}>
          <Pot pot={pot} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default PotsContainer;
