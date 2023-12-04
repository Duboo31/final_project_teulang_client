import React, { useEffect, useRef, useState } from "react";
import { postRegister } from "../../api/user/POST/register";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// 유효성 검사
import { EMAIL_REGEX, PWD_REGEX } from "../../js/validation";
import { isDuplicateEmail } from "../../api/user/POST/duplicateEmailCheck";
import { isDuplicateNickname } from "../../api/user/POST/duplicateNicknameCheck";

// css
import logo from "../../image/logo.png";
import "../../styles/form/form.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faCircleUser,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  // 중복 검사 통과 확인을 위한 훅
  const [isPassedEmail, setIsPassedEmail] = useState(false);
  const [isPassedNickname, setIsPassedNickname] = useState(false);

  // 이메일 중복 검사 때 유효한 이메일인지 확인하기 위한 훅
  const [isValidEmail, setIsValidEmail] = useState(false);

  // useForm - 폼 데이터의 정보 받기 및 유효성 검사
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm();

  const navigate = useNavigate();

  // 제어 컴포넌트로 이메일, 닉네임 중복 검사를 위한 실시간 확인
  const watchEmail = watch("email");
  const watchNickname = watch("nickname");
  const watchPassword = watch("password");

  const { mutate } = useMutation(postRegister, {
    onSuccess: (result) => {
      if (result.status === 201) {
      }
      navigate("/login");
      // if (status === 400) {
      // 이 부분에서 에러 메세지를 화면에 뿌려주면 됨
      // 즉, data를 뿌려주면 됨
      // }
    },

    onMutate: (result) => {
      alert(`${result.email} 로 인증 요청을 보냈습니다.
이메일을 확인하세요.`);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // useEffect로 실시간으로 이메일을 확인해서 유효성 검사를 실시한 뒤
  // 그에 맞는 불리언 값을 상태 값으로 저장
  useEffect(() => {
    const isValidEmail = EMAIL_REGEX.test(watchEmail);
    const isValidPassword = PWD_REGEX.test(watchPassword);

    if (isValidPassword) {
      clearErrors("password");
    } else if (watchPassword !== undefined) {
      setError(
        "password",
        { message: "문자, 숫자, 특수문자 조합 8글자 이상을 사용하세요." },
        { shouldFocus: true }
      );
    }

    setIsValidEmail(isValidEmail);
  }, [watchEmail, watchPassword]);

  // 이메일 중복 검사 api 요청 함수
  const onClickEmailCheckHandler = async () => {
    if (!isValidEmail) {
      setError(
        "email",
        { message: "이메일 형식을 맞춰서 작성하세요." },
        { shouldFocus: true }
      );
      return;
    }
    const result = await isDuplicateEmail(watchEmail);
    if (!result) {
      setError(
        "email",
        { message: "이미 존재하는 이메일 입니다." },
        { shouldFocus: true }
      );
      return;
    } else {
      setIsPassedEmail(true);
      setError(
        "email",
        { message: "사용가능한 이메일입니다." },
        { shouldFocus: false }
      );
    }
  };

  // 닉네임 체크 api 요청
  const onClickNicknameCheckHandler = async () => {
    if (!watchNickname) {
      setError(
        "nickname",
        { message: "닉네임 입력하세요." },
        { shouldFocus: true }
      );
      return;
    }
    const result = await isDuplicateNickname(watchNickname);
    if (!result) {
      setError(
        "nickname",
        { message: "이미 존재하는 닉네임 입니다." },
        { shouldFocus: true }
      );
      return;
    } else {
      setIsPassedNickname(true);
      setError(
        "nickname",
        { message: "사용가능한 닉네임입니다." },
        { shouldFocus: false }
      );
    }
  };

  const onSubmitRegisterHandler = ({
    email,
    nickname,
    password,
    passwordConfirm,
  }) => {
    // 이메일/닉네임 둘다 중복확인을 통과했으면
    if (isPassedEmail && isPassedNickname) {
      // 패스워드가 서로 일치하는지 확인
      if (password !== passwordConfirm) {
        setError(
          "passwordConfirm",
          { message: "비밀번호가 일치하지 않습니다." },
          { shouldFocus: true }
        );
        return;
      }

      const registerData = {
        email,
        nickname,
        password,
        password_check: passwordConfirm,
      };

      mutate(registerData);
    } else if (!isPassedEmail) {
      setError(
        "email",
        { message: "이메일 중복 체크를 확인하세요." },
        { shouldFocus: true }
      );
    } else if (!isPassedNickname) {
      setError(
        "nickname",
        { message: "닉네임 중복 체크를 확인하세요." },
        { shouldFocus: true }
      );
    }
  };

  return (
    <div className="form-wrap">
      <div className="form-container">
        <Link to="/" className="logo-box">
          <img className="logo-img_register" src={logo} alt="로고" />
        </Link>
        <p>회원가입 정보를 입력해주세요</p>
        <form onSubmit={handleSubmit(onSubmitRegisterHandler)}>
          <div
            className={`${
              isPassedEmail ? "input-box valid" : "input-box invalid"
            }`}
          >
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
                onClickEmailCheckHandler();
              }}
            >
              중복 체크
            </button>
          </div>
          <div className="error-text">{errors?.email?.message}</div>
          <div
            className={`${
              isPassedNickname ? "input-box valid" : "input-box invalid"
            }`}
          >
            <FontAwesomeIcon className="form-icon" icon={faCircleUser} />
            <input
              placeholder="이름(닉네임)"
              type="text"
              {...register("nickname", {
                required: "닉네임: 필수 정보입니다.",
                maxLength: {
                  value: 10,
                  message: "닉네임: 2글자 이상, 10글자 이하",
                  shouldFocus: true,
                },
                minLength: {
                  value: 2,
                  message: "닉네임: 2글자 이상, 10글자 이하",
                  shouldFocus: true,
                },
              })}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                onClickNicknameCheckHandler();
              }}
              className="confirm-btn"
            >
              중복 체크
            </button>
          </div>
          <div className="error-text">{errors?.nickname?.message}</div>
          <div className="input-box noCheck">
            <FontAwesomeIcon className="form-icon" icon={faLock} />
            <input
              placeholder="비밀번호"
              type="password"
              {...register("password", {
                required: "비밀번호를 필수로 입력해주세요.",
                pattern: {
                  value: PWD_REGEX,
                  message: "문자, 숫자, 특수문자 조합 8글자 이상을 사용하세요.",
                  shouldFocus: true,
                },
              })}
            />
          </div>

          <div className="error-text">{errors?.password?.message}</div>
          <div className="input-box noCheck">
            <FontAwesomeIcon className="form-icon" icon={faLock} />
            <input
              placeholder="비밀번호 확인"
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
          <div className="error-text">{errors?.passwordConfirm?.message}</div>
          <input className="submit-btn" type="submit" value="가입하기" />
        </form>
        <div className="link-box">
          계정이 있으신가요?
          <Link to="/login">로그인하기</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
