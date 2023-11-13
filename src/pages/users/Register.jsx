import React, { useEffect, useState } from "react";
import { postRegister } from "../../api/user/POST/register";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// 유효성 검사
import { EMAIL_REGEX, PWD_REGEX } from "../../js/validation";
import { isDuplicateEmail } from "../../api/user/POST/duplicateEmailCheck";
import { isDuplicateNickname } from "../../api/user/POST/duplicateNicknameCheck";

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
    watch,
  } = useForm();

  const navigate = useNavigate();

  // 제어 컴포넌트로 이메일, 닉네임 중복 검사를 위한 실시간 확인
  const watchEmail = watch("email");
  const watchNickname = watch("nickname");

  const { mutate } = useMutation(postRegister, {
    onSuccess: (result) => {
      // api "요청!!"이 성공했을 경우
      // 의미는 값을 받아오기를 실패해도 요청을 "보내는 것"을 성공
      // 했을 경우 err 혹은 response을 받아옵니다.
      console.log("회원가입 '요청' 성공", result);
      alert(`가입한 이메일로 인증 요청을 보냈습니다.
이메일을 확인하세요.`);
      navigate("/login");
      // if (status === 400) {
      // 이 부분에서 에러 메세지를 화면에 뿌려주면 됨
      // 즉, data를 뿌려주면 됨
      // }
    },
    onError: (result) => {
      console.log("회원가입 요청을 실패했습니다.: ", result);
    },
  });

  // useEffect로 실시간으로 이메일을 확인해서 유효성 검사를 실시한 뒤
  // 그에 맞는 불리언 값을 상태 값으로 저장
  useEffect(() => {
    const isValidEmail = EMAIL_REGEX.test(watchEmail);
    setIsValidEmail(isValidEmail);
  }, [watchEmail]);

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
    <div>
      <h1>Register page</h1>
      <form onSubmit={handleSubmit(onSubmitRegisterHandler)}>
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
        <button
          onClick={(e) => {
            e.preventDefault();
            onClickEmailCheckHandler();
          }}
        >
          이메일 중복 검사
        </button>
        <div>{errors?.email?.message}</div>
        <input
          placeholder="nickname"
          type="text"
          {...register("nickname", {
            required: "닉네임을 필수로 입력해주세요.",
            maxLength: {
              value: 12,
              message: "닉네임은 12 글자 이내로 작성하세요.",
              shouldFocus: true,
            },
          })}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onClickNicknameCheckHandler();
          }}
        >
          닉네임 중복 검사
        </button>
        <div>{errors?.nickname?.message}</div>
        <input
          placeholder="password"
          type="text"
          {...register("password", {
            required: "비밀번호를 필수로 입력해주세요.",
            pattern: {
              value: PWD_REGEX,
              message:
                "패스워드는 문자, 숫자, 특수문자 조합 8글자 이상을 사용하세요.",
              shouldFocus: true,
            },
          })}
        />
        <div>{errors?.password?.message}</div>
        <input
          placeholder="password"
          type="text"
          {...register("passwordConfirm", {
            required: "비밀번호를 체크를 확인하세요.",
            pattern: {
              value: PWD_REGEX,
              message: "패스워드는 문자, 숫자 조합 8글자 이상을 사용하세요.",
              shouldFocus: true,
            },
          })}
        />
        <div>{errors?.passwordConfirm?.message}</div>
        <input type="submit" value="회원가입" />
      </form>
      <div>
        계정있음?
        <Link to="/login">로그인하기</Link>
      </div>
    </div>
  );
};

export default Register;
