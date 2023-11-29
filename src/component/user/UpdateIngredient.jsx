import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

// api
import { editIngredient } from "../../api/user/PUT/ingredient";

const UpdateIngredient = ({ setClickEditId, id, userId }) => {
  // useForm - 폼 데이터의 정보 받기 및 유효성 검사
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(editIngredient, {
    onSuccess: (result) => {
      console.log("result: 요청", result);
      setClickEditId("");
    },
    onError: () => {
      console.log("재료 생성 실패");
    },
  });

  const sendEditIngredient = ({ title, amount, expiration_date }) => {
    const editData = {
      title,
      amount,
      expiration_date,
      id,
      userId,
    };
    mutate(editData);
  };

  return (
    <form onSubmit={handleSubmit(sendEditIngredient)}>
      <div>
        <input
          {...register("title", {
            required: "재료명: 필수 정보입니다.",
            shouldFocus: true,
          })}
          type="text"
          placeholder="재료명"
        />
        <input
          {...register("amount")}
          type="text"
          placeholder="용량: g, ml, 개..."
        />
        <input
          {...register("expiration_date")}
          type="text"
          placeholder="소비기한: YYYY-MM-DD"
        />
      </div>
      <div>{errors?.title?.message}</div>
      <div>
        <input type="submit" value="수정하기" />
        <button
          onClick={(e) => {
            e.preventDefault();
            setClickEditId("");
          }}
        >
          수정취소
        </button>
      </div>
    </form>
  );
};

export default UpdateIngredient;
