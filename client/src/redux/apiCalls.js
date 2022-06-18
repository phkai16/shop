import { publicRequest, userRequest } from "../requestMethods";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "./userSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log(res);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const updateUser = async (dispatch, id, user, accessToken) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.put(`users/${id}`, user);
    dispatch(updateSuccess({ ...res.data, accessToken }));
    // window.location.reload();
  } catch (err) {
    dispatch(updateFailure());
  }
};

export const logout = async (dispatch, user) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess(user));
  } catch (err) {
    dispatch(logoutFailure());
  }
};
