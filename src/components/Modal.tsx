import React, { useRef } from "react";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder } from "../redux/slice";
import { OrderProp } from "../types";

// Props type for Modal component
type Props = {
  type: "add" | "edit" | "delete" | ""; // Type of modal: add, edit, delete, or empty
  setShow: React.Dispatch<React.SetStateAction<boolean>>; // Function to control modal visibility
};

const Modal = ({ type, setShow }: Props) => {
  // Refs for inner and outer divs of the modal
  const inner = useRef(null);
  const outer = useRef(null);

  // Redux dispatch hook
  const dispatch = useDispatch();

  // Select the currently selected order from Redux store
  const { selectedOrder } = useSelector(
    (data: { selectedOrder?: OrderProp }) => {
      return { selectedOrder: data.selectedOrder };
    }
  );

  // Function to handle order deletion
  const handleDelete = () => {
    // Dispatch deleteOrder action with the id of the selected order
    dispatch(deleteOrder(selectedOrder?.id));
    // Hide the modal
    setShow(false);
  };

  // Function to handle cancellation or closing of the modal
  const handleCancel = () => {
    setShow(false); // Hide the modal
  };

  // Function to handle click outside the modal to close it
  const handleOuterClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // If the click occurs outside the inner div (modal content), close the modal
    if (e.target === outer.current) {
      handleCancel();
    }
  };

  // Render the component
  return (
    <div
      className="bg-[#0000007f] w-full h-screen overflow-auto pt-12  fixed inset-0  flex items-center justify-center "
      ref={outer} // Ref to the outer div of the modal
      onClick={(e) => handleOuterClick(e)} // Handle click outside the modal
    >
      <div
        className="rounded-2xl my-8 bg-slate-200 max-w-lg  w-full text-black text-[1.5rem]  flex flex-col gap-8"
        ref={inner} // Ref to the inner div of the modal
      >
        {/* Render content based on the type of modal */}
        {type === "delete" && (
          <div className="p-4 flex flex-col gap-4">
            <h1 className="text-center font-extrabold text-3xl">
              Delete Contact???
            </h1>
            <div className="flex justify-between gap-2 w-full md:px-8 ">
              {/* Cancel button */}
              <button
                className=" rounded-lg bg-gray-900 text-white px-4 py-2 cursor-pointer hover:bg-gray-800"
                onClick={handleCancel} // Handle cancel action
              >
                CANCEL
              </button>
              {/* Delete button */}
              <button
                className=" rounded-lg bg-red-900  text-white px-4 py-2 cursor-pointer hover:bg-red-800"
                onClick={handleDelete} // Handle delete action
              >
                DELETE
              </button>
            </div>
          </div>
        )}
        {type === "edit" && (
          <div className="flex flex-col gap-2 p-4 ">
            <h1 className="text-center font-extrabold text-3xl">
              Edit Contact
            </h1>
            <Form type="edit" setShow={setShow} />{" "}
            {/* Render form for editing contact */}
          </div>
        )}
        {type === "add" && (
          <div className="flex flex-col gap-2 p-4">
            <h1 className="text-center font-extrabold text-3xl">
              Add New Contact
            </h1>
            <Form type="add" setShow={setShow} />{" "}
            {/* Render form for adding new contact */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
