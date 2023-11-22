import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { EMAIL_REGEX } from "../../js/validation";

// css
import logo from "../../image/logo.png";
import "../../styles/form/form.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const PasswordReset = () => {
  // useForm - 폼 데이터의 정보 받기 및 유효성 검사
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  return (
    <div>
      <div className="form-wrap">
        <div className="form-container">
          <Link to="/" className="logo-box">
            <img className="logo-img_register" src={logo} alt="로고" />
          </Link>
          <h1>
            비밀번호를 찾고자하는
            <br /> 아이디(이메일)를 입력해주세요.
          </h1>
          <form onSubmit={handleSubmit}>
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
            <input className="submit-btn" type="submit" value="다음" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
