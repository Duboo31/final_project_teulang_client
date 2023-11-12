import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { deleteUserAccount } from "../api/user/DELETE/account";

const DeleteAccount = () => {
  // 삭제 버튼 활성화
  const [isBtnActve, setIsBtnActive] = useState(false);

  const user = useSelector(({ users }) => {
    return users;
  });

  // useForm - 폼 데이터의 정보 받기 및 유효성 검사
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onClickDeleteAccountBtnHandler = () => {
    setIsBtnActive((cur) => !cur);
  };

  const { mutate } = useMutation(deleteUserAccount, {
    onSuccess: (result) => {
      console.log("회원탈퇴 요청 성공", result);
    },
    onError: (result) => {
      console.log("회원탈퇴 실패: ", result);
    },
  });

  const sendDeleteAccountBtnHandler = ({ checkBtn, password }) => {
    if (!checkBtn) {
      setError("checkBtn", {
        message: "탈퇴 처리사항 안내 확인에 동의하세요.",
      });
      return;
    }
    if (password === "") {
      setError(
        "password",
        { message: "비밀번호를 입력하세요" },
        { shouldFocus: true }
      );
      return;
    }
    const userInfo = {
      password,
      userId: user.userId,
    };
    mutate(userInfo);
  };

  return (
    <>
      {isBtnActve && (
        <>
          <div>
            <ul>
              <li>회원탈퇴 시 회원전용 웹 서비스 이용이 불가합니다.</li>
              <li>
                회원탈퇴 후 털랭에 입력하신 리뷰, 댓글은 삭제되지 않으며,
                회원정보 삭제로 인해 작성자 본인을 확인할 수 없어 편집 및
                삭제처리가 원천적으로 불가능 합니다.
              </li>
              <li>
                리뷰, 댓글 삭제를 원하시는 경우에는 먼저 해당 게시물을 삭제하신
                후 탈퇴를 신청하시기 바랍니다.
              </li>
            </ul>
            <form onSubmit={handleSubmit(sendDeleteAccountBtnHandler)}>
              <input type="checkbox" {...register("checkBtn")} />
              <p>
                상기 털랭 회원탈퇴 시 처리사항 안내를 확인하였음에 동의합니다.
              </p>
              <div>{errors?.checkBtn?.message}</div>
              <div>회원탈퇴를 위해 회원님의 비밀번호를 확인 합니다.</div>
              <div>
                <input type="password" {...register("password")} />
                <div>{errors?.password?.message}</div>
              </div>
              <input type="submit" value="회원탈퇴" />
            </form>
          </div>
        </>
      )}
      <button onClick={onClickDeleteAccountBtnHandler}>
        {isBtnActve ? "회원탈퇴 취소" : "회원탈퇴"}
      </button>
    </>
  );
};

export default DeleteAccount;
