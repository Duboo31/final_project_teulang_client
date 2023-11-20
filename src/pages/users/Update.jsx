import React, { useEffect, useState } from "react";
import DeleteAccount from "../../component/DeleteAccount";
import { useDispatch, useSelector } from "react-redux";
import { userModify } from "../../api/user/PUT/modify";
import { useMutation } from "react-query";
import { modify } from "../../redux/modules/users";
import { useForm } from "react-hook-form";
import { PWD_REGEX } from "../../js/validation";

// css
import "../../styles/user/modify.css";

const Update = () => {
  const [isNicknameBtnActive, setIsNicknameBtnActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);

  // 회원탈퇴 버튼
  const [isBtnActve, setIsBtnActive] = useState(false);

  const fileInputRef = React.useRef(null); // 파일 입력 엘리먼트의 ref

  const handleCustomButtonClick = () => {
    fileInputRef.current.click();
  };

  const dispatch = useDispatch();
  // useForm - 폼 데이터의 정보 받기 및 유효성 검사
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset,
  } = useForm();

  const watchProfile = watch("profile");
  const watchNickname = watch("nickname");
  const watchPassword = watch("password");

  useEffect(() => {
    if (watchProfile === undefined) {
      setProfileActive(true);
    } else if (watchProfile.length > 0) {
      setProfileActive(true);
    } else {
      setProfileActive(false);
    }
  }, [watchProfile]);

  // 리덕스 스토어의 현재 계정 정보
  const user = useSelector(({ users }) => {
    return users;
  });

  const { mutate } = useMutation(userModify, {
    onSuccess: (result) => {
      if (result.status === 200) {
        reset({
          nickname: "",
          password: "",
          passwordConfirm: "",
          profile: "",
        });
        const { nickname, user_img } = result.data;
        dispatch(
          modify({
            userNickname: nickname,
            userProfile: user_img,
          })
        );
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("profileImg", user_img);
      }
      setIsNicknameBtnActive(false);
    },
    onError: () => {
      console.log("유저 정보 업데이트 요청 실패");
    },
  });

  const onClickUserModifyHandler = ({
    nickname,
    profile,
    password,
    passwordConfirm,
  }) => {
    if (password !== passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
      return;
    } else {
      mutate({
        nickname,
        profile,
        password,
        passwordConfirm,
        userId: user.userId,
      });
    }
  };

  const onClickDeleteAccountBtnHandler = () => {
    setIsBtnActive((cur) => !cur);
  };

  return (
    <div className="modify-wrap">
      <h1 className="hr-line">{isBtnActve ? "회원탈퇴" : "프로필  수정"}</h1>
      {isBtnActve ? (
        <>
          <DeleteAccount
            isBtnActve={isBtnActve}
            setIsBtnActive={setIsBtnActive}
            onClickDeleteAccountBtnHandler={onClickDeleteAccountBtnHandler}
          />
        </>
      ) : (
        <>
          <form
            className="updata-container"
            onSubmit={handleSubmit(onClickUserModifyHandler)}
          >
            <div>
              {watchProfile && watchProfile.length > 0 ? (
                <img src={`${URL.createObjectURL(watchProfile[0])}`} />
              ) : (
                <img
                  src={
                    user.userProfile === "/media/user_defalt.jpg"
                      ? `${process.env.REACT_APP_SERVER_LOCAL_URL}/media/user_defalt.jpg`
                      : `${process.env.REACT_APP_SERVER_LOCAL_URL}${user.userProfile}`
                  }
                  alt="프로필 이미지"
                />
              )}
            </div>
            <input
              type="file"
              {...register("profile")}
              ref={(el) => {
                fileInputRef.current = el;
                register("profile").ref(el);
              }}
              style={{ display: "none" }}
            />
            <div className="picture-box">
              <button type="button" onClick={handleCustomButtonClick}>
                사진 선택
              </button>
              <input
                type="submit"
                value="프로필 변경"
                disabled={profileActive ? false : true}
              />
            </div>
            <div>{errors?.profile?.message}</div>
            <h1 className="hr-line">회원정보</h1>
            <div className="user-info">
              <div>아이디(이메일)</div>
              <div>{user.userEmail}</div>
            </div>
            <div>
              <div className="user-info">
                <div>닉네임</div>
                <div>{user.userNickname}</div>
              </div>
              {isNicknameBtnActive ? (
                <>
                  <div className="nickname-box">
                    <input
                      placeholder="새로운 닉네임"
                      className="info-input"
                      type="text"
                      {...register("nickname", {
                        maxLength: {
                          value: 8,
                          message: "닉네임은 8 글자 이내로 작성하세요.",
                          shouldFocus: true,
                        },
                        minLength: {
                          value: 2,
                          message: "닉네임은 두글자 이상 입력해주세요.",
                        },
                      })}
                    />
                    <input
                      className="input-submit"
                      type="submit"
                      value="닉네임 변경"
                      disabled={watchNickname ? false : true}
                    />
                  </div>
                  <div>{errors?.nickname?.message}</div>
                </>
              ) : (
                ""
              )}
              <button
                className="input-btn_submit"
                onClick={(e) => {
                  e.preventDefault();
                  setIsNicknameBtnActive((cur) => !cur);
                }}
              >
                {isNicknameBtnActive ? "닉네임 변경 취소" : "닉네임 변경하기"}
              </button>
              <div>
                <div>
                  <h1 className="hr-line">비밀번호 변경</h1>
                  <input
                    className="info-input pw"
                    placeholder="새 비밀번호"
                    type="password"
                    {...register("password", {
                      pattern: {
                        value: PWD_REGEX,
                        message:
                          "문자, 숫자, 특수문자 조합 8글자 이상을 사용하세요.",
                        shouldFocus: true,
                      },
                    })}
                  />
                  <div className="err-pw">{errors?.password?.message}</div>
                  <input
                    className="info-input pw"
                    placeholder="새 비밀번호 확인"
                    type="password"
                    {...register("passwordConfirm", {
                      pattern: {
                        value: PWD_REGEX,
                        message:
                          "문자, 숫자, 특수문자 조합 8글자 이상을 사용하세요.",
                        shouldFocus: true,
                      },
                    })}
                  />
                  <div className="err-pw">
                    {errors?.passwordConfirm?.message}
                  </div>
                  <input
                    className="input-btn_submit"
                    type="submit"
                    value="비밀번호 변경"
                    disabled={watchPassword === "" ? true : false}
                  />
                </div>
              </div>
            </div>
          </form>
          <button className="del-user" onClick={onClickDeleteAccountBtnHandler}>
            {isBtnActve ? "회원탈퇴 취소" : "회원탈퇴"}
          </button>
        </>
      )}
    </div>
  );
};

export default Update;
