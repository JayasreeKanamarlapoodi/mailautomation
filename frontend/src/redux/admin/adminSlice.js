import { createSlice } from '@reduxjs/toolkit';

const initialAdminState = {
  userName: null,
  password: null,
  status: false,
  message: '',
  error: null,
  token:null
};

const AdminSlice = createSlice({
  name: "admin",
  initialState: initialAdminState,
  reducers: {
    // Login success
    adminLoginVerification: (state, action) => {
      console.log("action.payload", action.payload);
      state.userName = action.payload.data.userName;
      if(action.payload.status==200)
      state.status = true;
      state.message = action.payload.data.message;
      state.error = null;
      state.token=action.payload.data.token;
    },
    // Login failed
    adminLoginFailed: (state, action) => {
      state.status = false;
      state.error = action.payload.message;
      state.message = '';
      state.userName = null;
      state.password = null;
    },
    //logout
    adminLogout:(state)=>
    {  
      sessionStorage.clear();
      state.userName = null;
      state.token = null;
      state.status = false;
    }
  }
});

export const { adminLoginVerification, adminLoginFailed,adminLogout } = AdminSlice.actions;
export default AdminSlice.reducer;
