import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {},
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
  loginMsg:"",
  token : JSON.parse(sessionStorage.getItem("authUser"))?.jwtToken ?? null,
  role:JSON.parse(sessionStorage.getItem("authUser"))?.role ?? null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateLoading(state,action) {
      state.loading = action.payload
    },
    apiError(state, action) {
      state.error = action.payload.message ?? "Something went wrong";
      state.loading = false;
      state.isUserLogout = false;
      state.errorMsg = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload.responseData
      state.loading = false;
      state.error= false
      state.errorMsg = false;
      state.loginMsg = action.payload.message
    },
    verifyOtpSuccess(state, action) {
      state.loginMsg = action.payload.message
      state.error=false
      state.loading = false;
      state.errorMsg = false;
      state.token= JSON.parse(sessionStorage.getItem("authUser"))?.jwtToken
      state.role= JSON.parse(sessionStorage.getItem("authUser"))?.role
    },
    logoutUserSuccess(state, action) {
      state.error = null
      state.loading = false;
      state.errorMsg = false;
      state.loginMsg = false;
      state.isUserLogout = true
      state.token = null;
      state.user=null;
      state.role=null
    },
    reset_login_flag(state) {
      state.error = null
      state.loading = false;
      state.errorMsg = false;
      state.loginMsg = false;
      state.token = null;
      state.user=null
      state.role=null
    },
  },
});

export const {
  apiError,
  loginSuccess,
  logoutUserSuccess,
  reset_login_flag,
  updateLoading
} = loginSlice.actions

export default loginSlice.reducer;