import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { useRef } from "react";

const MainModal = ({ modalOpen, setModalOpen, children }) => {
  const cancelButtonRef = useRef();
  return (
    <>
      <Transition show={modalOpen} appear>
        <Dialog
          // open={modalOpen}
          transition
          className="fixed inset-0 z-30 overflow-y-auto text-center transition duration-300 ease-in data-[closed]:opacity-0"
          initialFocus={cancelButtonRef}
          onClose={() => setModalOpen(false)}
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/60 duration-300 ease-out data-[closed]:opacity-0"
          />
          <div className="min-h-screen">
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <TransitionChild className="relative z-30">
              {children}
            </TransitionChild>
            <div className="absolute right-5 top-5 z-30">
              <button
                onClick={() => setModalOpen(false)}
                type="button"
                className="inline-flex transitions justify-center px-4 py-2 text-base font-medium text-white bg-subMain rounded-full hover:bg-white hover:text-subMain"
              >
                X
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MainModal;
