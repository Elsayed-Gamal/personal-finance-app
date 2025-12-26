import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import CloseModalIcon from "../assets/images/icon-close-modal.svg?react";
import { AnimatePresence, motion } from "motion/react";

export const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(opens),
  });
}

function Content({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const content = useRef();
  const isOpen = openName === name;

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e) {
      if (content.current && !content.current.contains(e.target)) close();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close, isOpen]);

  // if (openName !== name) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex h-full w-full items-center justify-center scroll-auto bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-[560px] rounded-xl bg-white p-8"
            ref={content}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <CloseModalIcon
              className="absolute top-[38px] right-[38px] cursor-pointer"
              onClick={close}
            />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Content = Content;

export default Modal;
