//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  Login,
  postJwtLogin,
  postSocialLogin,
  postVerifyOtp,
} from "../../../helpers/fakebackend_helper";

import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag, updateLoading } from './reducer';
import axios from "axios";
import { update } from "lodash";

// const fireBaseBackend = getFirebaseBackend();

export const loginUser = (user, history) => async (dispatch) => {
  dispatch(updateLoading(true))
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      let fireBaseBackend = getFirebaseBackend();
      response = fireBaseBackend.loginUser(
        user.email,
        user.password
      );
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      response = postJwtLogin({
        email: user.email,
        password: user.password
      });

    } else if (process.env.REACT_APP_API_URL) {
      response = postFakeLogin({
        email: user.email,
        password: user.password,
      });
    }
    // } else if (process.env.REACT_APP_API_URL) {
    //   response = Login({
    //     email: user.email,
    //     password: user.password,
    //   });
    // }

    var data = await response;
    const token = data.token
// console.log("datathunktoken", token) //we r using
    if (data.status) {
      // sessionStorage.setItem("authUser", JSON.stringify(data));
      if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
        var finallogin = JSON.stringify(data);
        finallogin = JSON.parse(finallogin)
        // data = finallogin.data;
        if (finallogin.status) {
          localStorage.setItem("authUser", JSON.stringify(finallogin.responseData));
          dispatch(loginSuccess(data));
          history('/admin/dashboard')
          // history('/dashboard')
        } else {
          dispatch(apiError(finallogin));
        }
      } else {
        dispatch(loginSuccess(data));
      }
    }
    else{
      dispatch(apiError(data));
    }
  } catch (error) {
   console.log("error",error)
   dispatch(apiError(error));
  }
  
};

export const submitOtp = (email,otp, history) => async (dispatch) => {
  try {
    let response;
    response = postVerifyOtp({
      email:email,
      otp:otp
    });
    // } else if (process.env.REACT_APP_API_URL) {
    //   response = Login({
    //     email: user.email,
    //     password: user.password,
    //   });
    // }

    var data = await response;
    const token = data.token
// console.log("datathunktoken", token) //we r using
    if (data.status) {
      // sessionStorage.setItem("authUser", JSON.stringify(data));
      if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
        var finallogin = JSON.stringify(data);
        finallogin = JSON.parse(finallogin)
        // data = finallogin.data;
        if (finallogin.status) {
          sessionStorage.setItem("authUser", JSON.stringify(finallogin.responseData));
          dispatch(loginSuccess(data));
          history('/dashboard')
        } else {
          dispatch(apiError(finallogin));
        }
      } else {
        dispatch(loginSuccess(data));
        // history('/dashboard')
      }
    }
    else {
      dispatch(apiError(data));
    }
  } catch (error) {
    console.log("error",error)
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("authUser");
  try {
    let fireBaseBackend = getFirebaseBackend();
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(logoutUserSuccess(response));
    } else {
      dispatch(logoutUserSuccess(true));
    }

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const socialLogin = (type, history) => async (dispatch) => {
  try {
    let response;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      response = fireBaseBackend.socialLoginUser(type);
    }
    //  else {
      //   response = postSocialLogin(data);
      // }
      
      const socialdata = await response;
      // console.log("socialdata", socialdata)
    if (socialdata) {
      // sessionStorage.setItem("authUser", JSON.stringify(response));
      dispatch(loginSuccess(response));
      history('/dashboard')
    }

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch) => {
  localStorage.removeItem("authUser")
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};