import { createSlice } from "@reduxjs/toolkit";
import { OrderProp } from "../types";
import DummyData from "../../DummyData.json";
type CourseState = {
  orders: OrderProp[];
  selectedOrder: OrderProp | null;
};

const initialState: CourseState = {
  orders: DummyData,
  selectedOrder: null,
};
const Slice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // Add Order to the top of the list
      state.orders.unshift(action.payload);
    },
    selectOrder: (state, action) => {
      // Set selectedOrder to the payload (selected order)
      state.selectedOrder = action.payload;
    },
    editOrder: (state, action) => {
      const editedOrder = action.payload;
      // Find the order from orders list
      const index = state.orders.findIndex(
        (order) => order.id === editedOrder.id
      );
      // If we find any such Id
      if (index !== -1) {
        state.orders[index] = editedOrder;
      }
      // We also change the selected order to the new one
      if (state.selectedOrder?.id === editedOrder.id) {
        state.selectedOrder = editedOrder;
      }
    },
    deleteOrder: (state, action) => {
      const orderId = action.payload;
      //remove from orders
      state.orders = state.orders.filter((order) => order.id !== orderId);
      //empty Selected
      if (state.selectedOrder?.id === orderId) {
        state.selectedOrder = null;
      }
    },
  },
});
export const { addOrder, selectOrder, editOrder, deleteOrder } = Slice.actions;
export default Slice.reducer;
