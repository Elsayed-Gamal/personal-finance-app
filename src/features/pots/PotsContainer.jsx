import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { getPots } from "../../services/apiPots";
import Pot from "./Pot";
import Loading from "../../ui/Loading";
import Message from "../../ui/Message";
import Menus from "../../ui/Menus";

const parentVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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
      <Menus>
        <AnimatePresence mode="popLayout">
          {pots.map((pot) => (
            <motion.div
              key={pot.name}
              variants={itemVariant}
              layout
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Pot pot={pot} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Menus>
    </motion.div>
  );
}

export default PotsContainer;
