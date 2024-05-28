import { createSlice } from "@reduxjs/toolkit";

interface AppNotification {
  message: string;
  link: string;
  time: string;
  date: string;
  type: string;
}

interface NotificationsState {
  data: AppNotification[];
  count: number;
}

const initialState: NotificationsState = {
  data: [],
  count: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const { data } = action.payload;
      state.data.push(data);
      state.count = state.count + 1;
    },
    readedNotification: (state) => {
      state.count = 0;
      state.data = [];
    },
  },
});

export const { addNotification, readedNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
