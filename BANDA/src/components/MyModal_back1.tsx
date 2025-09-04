import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }} // 처음 나타날 때의 스타일
          animate={{ opacity: 1 }} // 나타난 후의 스타일
          exit={{ opacity: 0 }}   // 사라질 때의 스타일
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h2>팝업 내용</h2>
            <button onClick={onClose}>닫기</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;