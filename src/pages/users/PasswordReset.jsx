import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { EMAIL_REGEX, PWD_REGEX } from "../../js/validation";

// components
import AuthTimer from "../../component/user/AuthTimer";

// api
import {
  checkCodeNumber,
  passwordResetEmailCheck,
  resetPassword,
} from "../../api/user/POST/passwordReset";

// css
import logo from "../../image/logo.png";
import "../../styles/form/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "react-query";
import "../../styles/user/passwordReset.css";

const PasswordReset = () => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isPasswordInputActive, setIsPasswordInputActive] = useState(false);
  const [order, setOrder] = useState(1);
  const [isCodeSend, setIsCodeSend] = useState(false);

  const navigate = useNavigate();

  // useForm - 폼 데이터의 정보 받기 및 유효성 검사
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const watchEmail = watch("email");

  const sendEmail = useMutation(passwordResetEmailCheck, {
    onSuccess: (result) => {
      if (result.status === 200) {
        setIsTimerActive(true);
        setError("email", { message: "인증 코드를 발송했습니다." });
        setOrder(2);
        setIsCodeSend(true);
      } else if (result.response.status === 404) {
        setError(
          "email",
          { message: "해당 이메일을 찾을 수 없습니다." },
          { shouldFocus: true }
        );
        setIsTimerActive(false);
        return;
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const sendCode = useMutation(checkCodeNumber, {
    onSuccess: (result) => {
      if (result.status === 200) {
        setIsTimerActive(false);
        setIsPasswordInputActive(true);
        setOrder(3);
        setError("code", { message: "인증 코드 확인" }, { shouldFocus: true });
      } else if (result.response.status === 400) {
        setIsPasswordInputActive(false);
        setError(
          "code",
          { message: "인증 코드가 유효하지 않습니다." },
          { shouldFocus: true }
        );
        return;
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const passwordReset = useMutation(resetPassword, {
    onSuccess: (result) => {
      if (result.status === 200) {
        alert(`비밀번호를 변경했습니다.
로그인 페이지로 이동합니다.`);
        navigate("/login");
      } else if (result.response.status === 400) {
        alert("비밀번호 변경을 실패했습니다.");
        return;
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onClickSendCodeBtnHandler = () => {
    sendEmail.mutate(watchEmail);
  };

  const onClickNextBtnHandler = ({
    email,
    code,
    password,
    passwordConfirm,
  }) => {
    if (isPasswordInputActive) {
      const codeData = {
        email,
        code,
        password,
        passwordConfirm,
      };
      passwordReset.mutate(codeData);
    } else {
      const codeData = {
        email,
        code,
      };
      sendCode.mutate(codeData);
    }
  };

  return (
    <div>
      <div className="form-wrap">
        <div className="form-container">
          <Link to="/" className="logo-box">
            <img className="logo-img_register" src={logo} alt="로고" />
          </Link>
          <h1 className="hr-line">비밀번호 재설정</h1>
          <ul className="order-list">
            <li className={order === 1 ? "on" : ""}>
              01. 아이디 입력 <span>{">"}</span>
            </li>
            <li className={order === 2 ? "on" : ""}>
              02. 인증 코드 입력 <span>{">"}</span>
            </li>
            <li className={order === 3 ? "on" : ""}>03. 비밀번호 재설정</li>
          </ul>
          <h1 className={order === 1 ? "view" : "noView"}>
            비밀번호를 찾고자하는
            <br /> 아이디(이메일)를 입력해주세요.
          </h1>
          <h1 className={order === 2 ? "view" : "noView"}>
            인증 코드를 입력하세요.
          </h1>
          <h1 className={order === 3 ? "view" : "noView"}>
            새로운 비밀번호를 입력하세요.
            <AuthTimer timer={10} />
          </h1>
          <form onSubmit={handleSubmit(onClickNextBtnHandler)}>
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
              <button
                className="confirm-btn"
                onClick={(e) => {
                  e.preventDefault();
                  onClickSendCodeBtnHandler();
                }}
              >
                코드 발송
              </button>
            </div>
            <div className="error-text">{errors?.email?.message}</div>
            {isTimerActive && (
              <>
                <div className="code-box">
                  <input
                    placeholder="인증코드 6자리"
                    type="text"
                    {...register("code", {
                      required: "인증 코드를 입력하세요.",
                    })}
                  />
                  <AuthTimer timer={3} />
                </div>
                <div className="error-text">{errors?.code?.message}</div>
              </>
            )}
            {isPasswordInputActive && (
              <>
                <div className="input-box noCheck">
                  <FontAwesomeIcon className="form-icon" icon={faLock} />
                  <input
                    placeholder="새로운 비밀번호"
                    type="password"
                    {...register("password", {
                      required: "비밀번호를 필수로 입력해주세요.",
                      pattern: {
                        value: PWD_REGEX,
                        message:
                          "문자, 숫자, 특수문자 조합 8글자 이상을 사용하세요.",
                        shouldFocus: true,
                      },
                    })}
                  />
                </div>

                <div className="error-text">{errors?.password?.message}</div>
                <div className="input-box noCheck">
                  <FontAwesomeIcon className="form-icon" icon={faLock} />
                  <input
                    placeholder="새로운 비밀번호 확인"
                    type="password"
                    {...register("passwordConfirm", {
                      required: "비밀번호를 체크를 확인하세요.",
                      pattern: {
                        value: PWD_REGEX,
                        message: "문자, 숫자 조합 8글자 이상을 사용하세요.",
                        shouldFocus: true,
                      },
                    })}
                  />
                </div>
              </>
            )}
            <input
              disabled={!isCodeSend}
              className={isCodeSend ? "submit-btn" : "submit-btn noSend"}
              type="submit"
              value={isPasswordInputActive ? "비밀번호 재설정" : "다음"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
