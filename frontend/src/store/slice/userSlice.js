import { createSlice} from "@reduxjs/toolkit";



const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
   
  },
  extraReducers: () => {
    
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
