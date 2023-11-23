import axios from "axios";

const passwordResetEmailCheck = async (email) => {
  const emailData = {
    email,
  };

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/reset-password-email/`,
    data: emailData,
  };

  try {
    const response = await axios.request(config);
    console.log("이메일 보내기 성공 : ", response.data);
    return response;
  } catch (err) {
    return err;
  }
};

const checkCodeNumber = async (codeData) => {
  console.log("codeData: 코드 보내기", codeData);
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/verify-email-password/`,
    data: codeData,
  };

  try {
    const response = await axios.request(config);
    console.log("인증 성공 : ", response.data);
    return response;
  } catch (err) {
    return err;
  }
};

const resetPassword = async (codeData) => {
  const newPassword = {
    email: codeData.email,
    code: codeData.code,
    new_password: codeData.password,
    new_password_check: codeData.passwordConfirm,
  };

  console.log("codeData: 코드 보내기", codeData);
  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/reset-password/`,
    data: newPassword,
  };

  try {
    const response = await axios.request(config);
    console.log("비번 변경 성공 : ", response.data);
    return response;
  } catch (err) {
    return err;
  }
};

export { passwordResetEmailCheck, checkCodeNumber, resetPassword };
