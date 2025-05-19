import * as RequestFromServer from './adminCRUD';
import { adminLoginFailed, adminLoginVerification, adminLogout } from './adminSlice';



export const LoginVerification = (data) => async (dispatch) => {
  try {
    const response = await RequestFromServer.LoginVerification(data);
    console.log(response);
    const payload={
      data:response.data,
      status:response.status
    }
    sessionStorage.setItem('jwtToken', response.data.token);
    sessionStorage.setItem('adminUsername', response.data.userName);
    dispatch(adminLoginVerification(payload));
  } catch (err) {
    console.log("Login error:", err);
    dispatch(
      adminLoginFailed({
        status: err.response?.status || 500,
        message: err.response?.data || "Something went wrong",
      })
    );
  }
};

export const logoutAdmin = () => (dispatch) => {
  sessionStorage.clear();
  dispatch(adminLogout());
};
