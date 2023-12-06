import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

// 유효성 검사
import { isDuplicateNickname } from "../../api/user/POST/duplicateNicknameCheck";

// css
import logo from "../../image/logo.png";
import "../../styles/form/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

// api
import { socialLogin } from "../../api/user/POST/socialLogin";

const SocialNicknameCheck = () => {
  // 중복 검사 통과 확인을 위한 훅
  const [isPassedNickname, setIsPassedNickname] = useState(false);

  // url 파라미터로 받은 값을 로컬에서 정재하기 위함
  const [paramEmail, setParamEmail] = useState("");
  const [paramNickname, setParamNickname] = useState("");
  const [paramSocialId, setParamSocialId] = useState("");
  const [paramIsVerified, setIsParamVerified] = useState(false);

  useEffect(() => {
    let searchParma = window.location.search;

    let resultParam = searchParma
      .split("&")
      .join(" ")
      .split("=")
      .join(" ")
      .split(" ");
    setParamEmail(resultParam[1]);
    setParamNickname(decodeURI(resultParam[3]));
    setParamSocialId(resultParam[5]);
    setIsParamVerified(resultParam[7] === "True" ? true : false);
  }, []);

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

  // 제어 컴포넌트로 닉네임 중복 검사를 위한 실시간 확인
  const watchNickname = watch("nickname");

  const { mutate } = useMutation(socialLogin, {
    onSuccess: (result) => {
      if (result.status === 200) {
        navigate("/login");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 닉네임 체크 api 요청
  const onClickNicknameCheckHandler = async () => {
    let checkNickname;

    if (watchNickname === "") {
      checkNickname = paramNickname;
    } else {
      checkNickname = watchNickname;
    }
    const result = await isDuplicateNickname(checkNickname);
    if (!result) {
      setError(
        "nickname",
        { message: "이미 존재하는 닉네임 입니다." },
        { shouldFocus: true }
      );
      setIsPassedNickname(false);
      return;
    } else {
      setIsPassedNickname(true);
      clearErrors("nickname");
    }
  };

  const onSubmitSocialRegisterHandler = ({ nickname }) => {
    if (!isPassedNickname) {
      setError(
        "nickname",
        { message: "이메일 중복 체크를 확인하세요." },
        { shouldFocus: true }
      );
      return;
    } else {
      const socialInfo = {
        email: paramEmail,
        email_verified: paramIsVerified,
        social_id: paramSocialId,
      };

      if (nickname !== "") {
        socialInfo.nickname = nickname;
      } else {
        socialInfo.nickname = paramNickname;
      }
      mutate(socialInfo);
    }
  };

  return (
    <div className="form-wrap">
      <div className="form-container">
        <Link to="/" className="logo-box">
          <img className="logo-img_register" src={logo} alt="로고" />
        </Link>
        <p>털랭에서 사용할 닉네임을 설정하세요.</p>
        <form onSubmit={handleSubmit(onSubmitSocialRegisterHandler)}>
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
              defaultValue={paramNickname}
              {...register("nickname", {
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
              className={`${
                isPassedNickname ? "confirm-btn valid" : "confirm-btn invalid"
              }`}
            >
              중복 체크
            </button>
          </div>
          <div className="error-text">{errors?.nickname?.message}</div>
          <input className="submit-btn" type="submit" value="가입하기" />
        </form>
      </div>
    </div>
  );
};

export default SocialNicknameCheck;
