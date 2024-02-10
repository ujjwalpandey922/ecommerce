import { useState } from "react";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { OrderProp } from "../types";
import { editOrder, selectOrder } from "../redux/slice";

const Side = () => {
  // State to manage the search query
  const [query, setQuery] = useState("");

  // Extracting data from Redux store using useSelector
  const { orders, singleSelected } = useSelector(
    // Selector function to extract relevant data from the Redux store
    (data: { orders: OrderProp[]; selectedOrder: OrderProp }) => {
      return {
        orders: data.orders, // List of orders
        singleSelected: data.selectedOrder, // Currently selected order
      };
    }
  );

  // Array containing keys of OrderProp that need to be searched
  const keyNameArray: (keyof OrderProp)[] = [
    "customer_name",
    "customer_email",
    "product",
  ];

  // Filtered values based on the search query
  const filteredValues = orders?.filter((singleInfo: OrderProp) => {
    // Convert query to lowercase for case-insensitive search
    const queryLowerCase = query.toLowerCase();
    // Iterate through each key in keyNameArray to search for the query
    return keyNameArray?.some((property) => {
      // Get the value of the property
      const propertyValue = singleInfo?.[property];
      // If the property value is a string, perform case-insensitive search
      if (typeof propertyValue === "string") {
        return propertyValue.toLowerCase().includes(queryLowerCase);
      }
      return false;
    });
  });

  // Redux dispatch hook
  const dispatch = useDispatch();

  // Function to handle selection of an order
  const handleSelected = (singleOrder: OrderProp) => {
    // Dispatch action to select the order
    dispatch(selectOrder(singleOrder));
    // Check if there is any edited order in localStorage
    const editedOrderString = localStorage.getItem("editedOrder");
    if (editedOrderString) {
      // Parse the edited order from JSON
      const editedOrder: OrderProp = JSON.parse(editedOrderString);
      // Dispatch action to edit the order
      dispatch(editOrder(editedOrder));
    }
  };

  // Render the component
  return (
    <div className=" w-full bg-slate-900 md:w-72 p-4 rounded-xl max-h-[75vh] ">
      {/* Search component */}
      <Search query={query} setQuery={setQuery} />
      <div className="flex flex-col gap-4 p-4 h-[90%] w-full overflow-y-auto">
        {/* Render filtered order items */}
        {filteredValues &&
          filteredValues?.map((singleContact: OrderProp) => (
            <div
              key={singleContact?.id}
              className={`rounded-md bg-sky-100 hover:scale-105 cursor-pointer px-4 py-2 flex  transition-all  text-black items-center h-full border w-full gap-1 lg:gap-4 justify-between 
              ${
                singleContact.id == singleSelected?.id
                  ? " bg-sky-600 border-black shadow-lg scale-105  cursor-default"
                  : ""
              }
              `}
              // Handle click event to select an order
              onClick={() => handleSelected(singleContact)}
            >
              <div className="w-full flex flex-col ">
                <h1 className=" truncate font-bold  text-xl text-left ">
                  {singleContact.customer_name}
                </h1>
                <h2 className=" truncate font-medium  text-lg text-left">
                  {singleContact.customer_email}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Side;
