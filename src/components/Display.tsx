import { useSelector } from "react-redux";
import { OrderProp } from "../types";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import Modal from "./Modal";

const Display = () => {
  // State for controlling modal visibility and type
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | "">(
    ""
  );

  // Selecting the single selected order from Redux store
  const { singleSelected } = useSelector(
    (data: { orders: OrderProp[]; selectedOrder: OrderProp }) => {
      return {
        orders: data.orders,
        singleSelected: data.selectedOrder,
      };
    }
  );

  return (
    <div className="flex-1 justify-start bg-slate-900 w-full flex-col md:p-8 p-4 rounded-xl flex items-center gap-12 relative max-h-full overflow-y-auto">
      <div className="relative w-full text-white">
        {/* Title and buttons for creating, editing, and deleting orders */}
        <h1 className="text-center relative md:top-8 font-bold text-4xl md:pt-4 py-8 w-full">
          Order Details
        </h1>
        <div className="flex justify-between items-center">
          <button
            className="border rounded-md px-2 p-1 hover:scale-105 transition-all hover:border-sky-600 hover:text-sky-500 text-[1rem] max-md:block cursor-pointer md:absolute static top-0 left-0"
            onClick={() => {
              setModalOpen(true);
              setModalType("add");
            }}
          >
            Create New Order
          </button>
          {/* Buttons for editing and deleting the selected order */}
          {singleSelected && (
            <div className="md:absolute static w-full justify-end top-0 right-0 flex gap-4">
              <MdDeleteForever
                className="cursor-pointer hover:scale-110 hover:text-sky-600 transition-all"
                onClick={() => {
                  setModalOpen(true);
                  setModalType("delete");
                }}
              />
              <FaEdit
                className="cursor-pointer hover:scale-110 hover:text-sky-600 transition-all"
                onClick={() => {
                  setModalOpen(true);
                  setModalType("edit");
                }}
              />
            </div>
          )}
        </div>
      </div>
      {/* Displaying the details of the selected order */}
      {singleSelected && (
        <div className="flex flex-col items-center w-full">
          <div className="text-white text-justify rounded-md p-4 w-full justify-center px-4 py-6 md:grid md:grid-cols-3 md:gap-4 flex flex-col gap-4 place-items-center md:px-0">
            <dt className="text-lg md:text-2xl text-md font-medium leading-6">
              Order ID:
            </dt>
            <dd className="mt-1 truncate w-full text-center md:text-2xl text-md leading-6 md:col-span-2 md:mt-0">
              {singleSelected.id}
            </dd>
            <dt className="text-lg md:text-2xl text-md font-medium leading-6">
              Customer Name:
            </dt>
            <dd className="mt-1 md:text-2xl text-md leading-6 md:col-span-2 md:mt-0">
              {singleSelected.customer_name}
            </dd>
            <dt className="text-lg md:text-2xl text-md font-medium leading-6">
              Product Name:
            </dt>
            <dd className="mt-1 md:text-2xl text-md leading-6 md:col-span-2 md:mt-0">
              {singleSelected.product}
            </dd>
            <dt className="text-lg md:text-2xl text-md font-medium leading-6">
              Product Quantity:
            </dt>
            <dd className="mt-1 md:text-2xl text-md leading-6 md:col-span-2 md:mt-0">
              {singleSelected.quantity}
            </dd>
          </div>
        </div>
      )}

      {/* Modal for adding, editing, or deleting orders */}
      {modalOpen && <Modal type={modalType} setShow={setModalOpen} />}
    </div>
  );
};

export default Display;
