import React, { useEffect, useState } from "react";
import { postLogin } from "../../api/user/POST/login";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/modules/users";
import { getUserInfoInLocalStorage } from "../../js/isLoginUser";
import { EMAIL_REGEX } from "../../js/validation";

// css
import logo from "../../image/logo.png";
import "../../styles/form/form.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [loginUserImg, setLoginUserImg] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const users = useSelector(({ users }) => {
    return users;
  });

  useEffect(() => {
    if (users.isAuthorized) {
      navigate("/");
    }
  }, [users]);

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
            userProfile: "/media/user_defalt.jpg",
          })
        );
        navigate("/");
        window.location.reload();
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

  return (
    <div>
      {!users.isAuthorized ? (
        <div className="form-wrap">
          <div className="form-container">
            <Link to="/" className="logo-box">
              <img className="logo-img_register" src={logo} alt="로고" />
            </Link>
            <form onSubmit={handleSubmit(onSubmitLoginHandler)}>
              <div className="input-box noCheck">
                <FontAwesomeIcon className="form-icon" icon={faEnvelope} />
                <input
                  placeholder="아이디(이메일)"
                  type="text"
                  {...register("email", {
                    required: "이메일: 필수 정보입니다.",
                    pattern: {
                      value: EMAIL_REGEX,
                      message: "이메일 형식을 맞춰서 작성하세요.",
                      shouldFocus: true,
                    },
                  })}
                />
              </div>

              <div className="error-text">{errors?.email?.message}</div>
              <div className="input-box noCheck">
                <FontAwesomeIcon className="form-icon" icon={faLock} />
                <input
                  placeholder="password"
                  type="password"
                  {...register("password", {
                    required: "비밀번호: 필수 정보입니다.",
                    shouldFocus: true,
                  })}
                />
              </div>

              <div className="error-text">{errors?.password?.message}</div>
              <input className="submit-btn" type="submit" value="로그인" />
            </form>
            <div className="link-box">
              계정이 없으신가요?
              <Link to="/register">회원가입</Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
