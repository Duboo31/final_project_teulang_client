import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAccount } from "../api/user/DELETE/account";

// css
import "../../src/styles/user/delete.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/modules/users";

const DeleteAccount = ({
  isBtnActve,
  setIsBtnActive,
  onClickDeleteAccountBtnHandler,
}) => {
  // 삭제 버튼 활성화

  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const { mutate } = useMutation(deleteUserAccount, {
    onSuccess: (result) => {
      console.log("회원탈퇴 요청 성공", result);
      if (result.status === 204) {
        alert("회원탈퇴 완료");
        navigate("/");
        dispatch(logout());
      } else if (result.response.status === 403) {
        setError(
          "password",
          { message: "비밀번호가 일치하지 않습니다." },
          { shouldFocus: true }
        );
        return;
      }
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
    const isDelete = window.confirm("회원탈퇴를 진행하시겠습니까?");
    if (isDelete) {
      mutate(userInfo);
    } else if (!isDelete) {
      alert("회원탈퇴 취소");
    }
  };

  return (
    <>
      {isBtnActve && (
        <>
          <div>
            <p className="notice">
              탈퇴 신청에 앞서 반드시 아래 내용을 확인해주세요.
            </p>
            <ul className="chekc-msg">
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
              <span className="confirm-box">
                <input type="checkbox" {...register("checkBtn")} />
                <p>
                  (필수)상기 털랭 회원탈퇴 시 처리사항 안내를 확인하였음에
                  동의합니다.
                </p>
              </span>
              <div className="delete-err">{errors?.checkBtn?.message}</div>
              <p className="checkPW-text">
                (필수)회원탈퇴를 위해 회원님의 비밀번호를 확인 합니다.
              </p>
              <div className="pw-check-box">
                <input
                  placeholder="비밀번호"
                  type="password"
                  {...register("password")}
                />
                <input type="submit" value="회원탈퇴" />
              </div>
              <div className="delete-err">{errors?.password?.message}</div>
            </form>
          </div>
          <button className="del-user" onClick={onClickDeleteAccountBtnHandler}>
            {isBtnActve ? "회원탈퇴 취소" : "회원탈퇴"}
          </button>
        </>
      )}
    </>
  );
};

export default DeleteAccount;
