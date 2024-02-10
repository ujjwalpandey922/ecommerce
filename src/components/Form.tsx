import { useDispatch, useSelector } from "react-redux";
import { OrderProp } from "../types";
import { Dispatch, FormEventHandler, useState } from "react";
import { addOrder, editOrder } from "../redux/slice";

const Form = ({
  type,
  setShow,
}: {
  type: "add" | "edit";
  setShow: Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Redux hooks to access the state and dispatch actions
  const { selectedOrder } = useSelector(
    (data: { orders?: OrderProp[]; selectedOrder?: OrderProp }) => {
      return { orders: data.orders, selectedOrder: data.selectedOrder };
    }
  );

  // Set initial state for form fields and errors
  const initialContact: OrderProp =
    type === "edit" && selectedOrder
      ? {
          id: selectedOrder.id || "",
          customer_name: selectedOrder.customer_name || "",
          customer_email: selectedOrder.customer_email || "",
          product: selectedOrder.product || "",
          quantity: selectedOrder.quantity || 0,
        }
      : {
          id: "",
          customer_name: "",
          customer_email: "",
          product: "",
          quantity: 1,
        };

  const [errors, setErrors] = useState({
    customer_name: "",
    customer_email: "",
    product: "",
    quantity: "",
  });
  const [info, setInfo] = useState<OrderProp>(initialContact);

  // Function to handle changes in form fields
  const handleChange: React.ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = (e) => {
    const { value, name } = e.target;

    // Validate fields based on name
    if (name === "customer_name") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value.length < 3 ? "Name should be more than 3 characters" : "",
      }));
    } else if (name === "customer_email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: !emailRegex.test(value) ? "Invalid email address" : "",
      }));
    } else if (name === "product") {
      const validProducts = ["Product 1", "Product 2", "Product 3"];
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validProducts.includes(value) ? "" : "Invalid product",
      }));
    } else if (name === "quantity") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]:
          parseInt(value) <= 0
            ? "Quantity must be a number greater than 0"
            : "",
      }));
    }
    setInfo((pre) => ({ ...pre, [name]: value }));
  };

  // Check if there are any errors in the form
  const hasErrors = Object.values(errors).some((error) => error !== "");

  // Redux dispatch hook
  const dispatch = useDispatch();

  // Function to handle saving updated data locally
  const saveUpdatedDataLocally = (info: OrderProp) => {
    localStorage.setItem("editedOrder", JSON.stringify(info)); // Save edited order to localStorage
  };

  // Function to handle form submission
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (type == "add") {
      const id = Date.now(); // Generate unique ID
      const infoWithId = { ...info, id }; // Combine info with the generated ID
      dispatch(addOrder(infoWithId)); // Dispatch action to add order
      localStorage.setItem("addedOrder", JSON.stringify(infoWithId)); // Save added order to localStorage
      setShow(false); // Close the form modal
      console.log("add", info);
    } else {
      dispatch(editOrder(info)); // Dispatch action to edit order
      saveUpdatedDataLocally(info); // Save edited order to localStorage
      setShow(false); // Close the form modal
      console.log("edit", info);
    }
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Display Order ID for editing */}
      {type == "edit" && (
        <div className="mb-4">
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700"
          >
            Order ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={info.id}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            readOnly
          />
        </div>
      )}
      {/* Form fields for customer details */}
      <div className="mb-4">
        <label
          htmlFor="customer_name"
          className="block text-sm font-medium text-gray-700"
        >
          Customer Name
        </label>
        <input
          type="text"
          id="customer_name"
          name="customer_name"
          value={info.customer_name}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.customer_name && (
          <p className="text-red-500 text-sm">{errors.customer_name}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="customer_email"
          className="block text-sm font-medium text-gray-700"
        >
          Customer Email
        </label>
        <input
          type="email"
          id="customer_email"
          name="customer_email"
          value={info.customer_email}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.customer_email && (
          <p className="text-red-500 text-sm">{errors.customer_email}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="product"
          className="block text-sm font-medium text-gray-700"
        >
          Product Name
        </label>
        <select
          id="product"
          name="product"
          value={info.product}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Select Product</option>
          <option value="Product 1">Product 1</option>
          <option value="Product 2">Product 2</option>
          <option value="Product 3">Product 3</option>
        </select>
        {errors.product && (
          <p className="text-red-500 text-sm">{errors.product}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700"
        >
          Product Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={info.quantity}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity}</p>
        )}
      </div>
      {/* Submit button */}
      <div className="w-full">
        <button
          type="submit"
          className={`bg-blue-600 text-white px-4 py-2 w-full hover:bg-blue-500 cursor-pointer rounded-lg ${
            hasErrors && "opacity-50 cursor-not-allowed"
          }`}
          disabled={hasErrors}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Form;
