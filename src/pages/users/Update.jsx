import React, { useState } from "react";
import DeleteAccount from "../../component/DeleteAccount";
import { useDispatch, useSelector } from "react-redux";
import { userModify } from "../../api/user/PUT/modify";
import { useMutation } from "react-query";
import { modify } from "../../redux/modules/users";
import { saveLocalStorageToken } from "../../api/user/saveLocalToken";

const Update = () => {
  const [isNicknameBtnActive, setIsNicknameBtnActive] = useState(false);
  const [nickname, setNickname] = useState("");

  const dispatch = useDispatch();

  // 리덕스 스토어의 현재 계정 정보
  const user = useSelector(({ users }) => {
    return users;
  });

  const { mutate } = useMutation(userModify, {
    onSuccess: (result) => {
      if (result.status === 200) {
        console.log("닉네임 변경 성공", result);
        const { nickname } = result.data;
        dispatch(
          modify({
            userNickname: nickname,
          })
        );
        localStorage.setItem("nickname", nickname);
      }
      setNickname("");
      setIsNicknameBtnActive(false);
    },
    onError: () => {
      console.log("유저 정보 업데이트 요청 실패");
    },
  });

  const onClickUserModifyNicknameHandler = () => {
    mutate({ nickname, userId: user.userId });
  };

  return (
    <div>
      <div>회원정보 수정 페이지</div>
      <div>
        <img
          src={`${process.env.REACT_APP_SERVER_LOCAL_URL}/media/user_defalt.jpg`}
          alt="프로필 이미지"
        />
        <div>아이디(이메일): {user.userEmail}</div>
        <div>
          <div>닉네임: {user.userNickname}</div>
          {isNicknameBtnActive ? (
            <div>
              <input
                type="text"
                onChange={(e) => setNickname(e.target.value)}
              />
              <button onClick={onClickUserModifyNicknameHandler}>
                닉네임 변경
              </button>
            </div>
          ) : (
            ""
          )}
          <button
            onClick={() => {
              setIsNicknameBtnActive((cur) => !cur);
            }}
          >
            {isNicknameBtnActive ? "닉네임 변경 취소" : "닉네임 변경하기"}
          </button>
        </div>
      </div>
      <DeleteAccount />
    </div>
  );
};

export default Update;
