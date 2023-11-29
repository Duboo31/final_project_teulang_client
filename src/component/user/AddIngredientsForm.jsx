import React from "react";
import { useForm } from "react-hook-form";

// api
import { createIngredient } from "../../api/user/POST/ingredient";
import { useMutation } from "react-query";

const AddIngredientsForm = ({ setIsAddInputActive, userId }) => {
  // useForm - 폼 데이터의 정보 받기 및 유효성 검사
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(createIngredient, {
    onSuccess: (result) => {
      console.log("result: 요청", result);
      if (result.status === 201) {
        console.log("성공!");
        setIsAddInputActive(false);
      }
    },
    onError: () => {
      console.log("재료 생성 실패");
    },
  });

  const sendIngredientData = ({ title, amount, expiration_date }) => {
    const ingredientData = {
      title,
      amount,
      expiration_date,
      userId,
    };
    console.log("추가버튼 클릭");
    mutate(ingredientData);
  };

  return (
    <form
      className="ingredients-form"
      onSubmit={handleSubmit(sendIngredientData)}
    >
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
        <input type="submit" value="추가" />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsAddInputActive(false);
          }}
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default AddIngredientsForm;
