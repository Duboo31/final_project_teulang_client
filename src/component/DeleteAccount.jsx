import React, { useState } from "react";
import { useForm } from "react-hook-form";

const DeleteAccount = () => {
  // 삭제 버튼 활성화
  const [isBtnActve, setIsBtnActive] = useState(false);

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

  // const { mutate } = useMutation(postRegister, {
  //   onSuccess: (result) => {
  //     // api "요청!!"이 성공했을 경우
  //     // 의미는 값을 받아오기를 실패해도 요청을 "보내는 것"을 성공
  //     // 했을 경우 err 혹은 response을 받아옵니다.
  //     console.log("회원탈퇴 성공", result);
  //     // if (status === 400) {
  //     // 이 부분에서 에러 메세지를 화면에 뿌려주면 됨
  //     // 즉, data를 뿌려주면 됨
  //     // }
  //   },
  //   onError: (result) => {
  //     console.log("회원탈퇴 실패: ", result);
  //   },
  // });

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
    console.log(checkBtn, password);
    alert("ㅋㅋ");
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
