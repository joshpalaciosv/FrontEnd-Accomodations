import Modal from "@mui/joy/Modal";
import { motion, AnimatePresence } from "framer-motion";
import { ModalClose, Sheet } from "@mui/joy";

interface MainModalProps {
  isOpen: boolean;
  handleModal: () => void;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  content: React.ReactNode;
}

const FadeModal = ({
  isOpen,
  handleModal,
  ariaDescribedBy,
  ariaLabelledBy,
  content,
}: MainModalProps) => {
  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <Modal
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            open={isOpen}
            onClose={handleModal}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)", // Optional: adds a background blur
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
            >
              <Sheet
                variant="outlined"
                sx={{
                  maxWidth: {
                    xs: "90vw",
                  },
                  borderRadius: "md",
                  p: 3,
                  boxShadow: "lg",
                }}
              >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                {content}
              </Sheet>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FadeModal;
