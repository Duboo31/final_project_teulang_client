import React from "react";
import { postLogin } from "../../api/user/POST/login";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/modules/users";
import { getUserInfoInLocalStorage } from "../../js/isLoginUser";

const Login = () => {
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  const users = useSelector(({ users }) => {
    return users;
  });

  // useForm - 폼 데이터의 정보 받기 및 유효성 검사
  const {
    register,
    handleSubmit,
    // formState: { errors },
    // setError,
    // watch,
  } = useForm();

  const { mutate } = useMutation(postLogin, {
    onSuccess: () => {
      console.log("로그인 성공");
      const { userId, userEmail, nickname } = getUserInfoInLocalStorage();
      console.log("정보 가져옴?: ", userId, userEmail, nickname);
      dispatch(
        login({ userEmail: userEmail, userNickname: nickname, userId: userId })
      );
    },
    onError: () => {
      console.log("로그인 실패");
    },
  });

  const onSubmitLoginHandler = ({ email, password }) => {
    const loginData = {
      email,
      password,
    };
    mutate(loginData);
  };

  console.log("login redux data: ", users);

  return (
    <div>
      {!users.isAuthorized ? (
        <>
          <h1>login page</h1>
          <form onSubmit={handleSubmit(onSubmitLoginHandler)}>
            <input placeholder="email" type="text" {...register("email")} />
            <input
              placeholder="password"
              type="text"
              {...register("password")}
            />
            <input type="submit" value="로그인" />
          </form>
          <div>
            회원정보 없음?
            <Link to="/register">회원가입</Link>
          </div>
        </>
      ) : (
        <div>이미 로그인 상태입니다</div>
      )}
    </div>
  );
};

export default Login;
