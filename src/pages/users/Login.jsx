import React from "react";
import { postLogin } from "../../api/user/POST/login";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/modules/users";
import { getUserInfoInLocalStorage } from "../../js/isLoginUser";
import { EMAIL_REGEX } from "../../js/validation";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const users = useSelector(({ users }) => {
    return users;
  });

  // useForm - 폼 데이터의 정보 받기 및 유효성 검사
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { mutate } = useMutation(postLogin, {
    onSuccess: (result) => {
      console.log("result: ", result);
      if (result.status === 200) {
        const { userId, userEmail, nickname } = getUserInfoInLocalStorage();
        dispatch(
          login({
            userEmail: userEmail,
            userNickname: nickname,
            userId: userId,
          })
        );
        navigate("/");
      } else if (result.response.status === 401) {
        setError("password", { message: `${result.response.data.detail}` });
      } else if (result.response.status === 404) {
        setError("password", { message: `등록된 사용자가 아닙니다.` });
      }
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
            <input
              placeholder="email"
              type="text"
              {...register("email", {
                required: "이메일을 필수로 입력해주세요.",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "이메일 형식을 맞춰서 작성하세요.",
                  shouldFocus: true,
                },
              })}
            />
            <div>{errors?.email?.message}</div>
            <input
              placeholder="password"
              type="password"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
                shouldFocus: true,
              })}
            />
            <div>{errors?.password?.message}</div>
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
