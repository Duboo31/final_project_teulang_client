import React, { useEffect, useState } from "react";
import DeleteAccount from "../../component/DeleteAccount";
import { useDispatch, useSelector } from "react-redux";
import { userModify } from "../../api/user/PUT/modify";
import { useMutation } from "react-query";
import { modify } from "../../redux/modules/users";
import { useForm } from "react-hook-form";
import { PWD_REGEX } from "../../js/validation";

const Update = () => {
  const [isNicknameBtnActive, setIsNicknameBtnActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);

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

  console.log(watchProfile);

  // 리덕스 스토어의 현재 계정 정보
  const user = useSelector(({ users }) => {
    return users;
  });

  const { mutate } = useMutation(userModify, {
    onSuccess: (result) => {
      if (result.status === 200) {
        console.log("회원정보 수정 완료", result);
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

  return (
    <div>
      <div>회원정보 수정 페이지</div>
      <form onSubmit={handleSubmit(onClickUserModifyHandler)}>
        <img
          src={
            user.userProfile === "/media/user_defalt.jpg"
              ? `${process.env.REACT_APP_SERVER_LOCAL_URL}/media/user_defalt.jpg`
              : `${process.env.REACT_APP_SERVER_LOCAL_URL}${user.userProfile}`
          }
          alt="프로필 이미지"
        />
        <input type="file" {...register("profile")} />
        <input
          type="submit"
          value="프로필 변경"
          disabled={profileActive ? false : true}
        />
        <div>{errors?.profile?.message}</div>
        <div>아이디(이메일): {user.userEmail}</div>
        <div>
          <div>닉네임: {user.userNickname}</div>
          {isNicknameBtnActive ? (
            <div>
              <input
                type="text"
                {...register("nickname", {
                  maxLength: {
                    value: 12,
                    message: "닉네임은 12 글자 이내로 작성하세요.",
                    shouldFocus: true,
                  },
                  minLength: {
                    value: 2,
                    message: "닉네임은 두글자 이상 입력해주세요.",
                  },
                })}
              />
              <input
                type="submit"
                value="닉네임 변경"
                disabled={watchNickname ? false : true}
              />
              <div>{errors?.nickname?.message}</div>
            </div>
          ) : (
            ""
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsNicknameBtnActive((cur) => !cur);
            }}
          >
            {isNicknameBtnActive ? "닉네임 변경 취소" : "닉네임 변경하기"}
          </button>
          <div>
            <div>비밀번호 변경</div>
            <div>새 비밀번호</div>
            <input
              type="password"
              {...register("password", {
                pattern: {
                  value: PWD_REGEX,
                  message:
                    "패스워드는 문자, 숫자, 특수문자 조합 8글자 이상을 사용하세요.",
                  shouldFocus: true,
                },
              })}
            />
            <div>{errors?.password?.message}</div>
            <div>새 비밀번호 확인</div>
            <input
              type="password"
              {...register("passwordConfirm", {
                pattern: {
                  value: PWD_REGEX,
                  message:
                    "패스워드는 문자, 숫자, 특수문자 조합 8글자 이상을 사용하세요.",
                  shouldFocus: true,
                },
              })}
            />
            <div>{errors?.passwordConfirm?.message}</div>
            <input
              type="submit"
              value="비밀번호 변경"
              disabled={watchPassword === "" ? true : false}
            />
          </div>
        </div>
      </form>
      <DeleteAccount />
    </div>
  );
};

export default Update;
