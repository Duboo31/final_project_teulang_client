import React from "react";
import { postRegister } from "../../api/user/register";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

const Register = () => {
  // useForm - 폼 데이터의 정보 받기 및 유효성 검사
  const {
    register,
    handleSubmit,
    // formState: { errors },
    // setError,
    // watch,
  } = useForm();

  // 쿼리로 서버 데이터 받아오기
  // const { isLoading, isError, data, isSuccess } = useQuery("users", getUsers);e

  // const queryClient = useQueryClient();
  const { mutate } = useMutation(
    postRegister
    // {
    // onSuccess: () => {
    //   // queryClient.invalidateQueries("users");
    //   console.log("회원가입 요청 성공");
    // },
    // }
  );

  const onSubmitRegisterHandler = ({
    email,
    nickname,
    password,
    passwordConfirm,
  }) => {
    const registerData = {
      email,
      nickname,
      password,
      password_check: passwordConfirm,
    };

    mutate(registerData);
  };

  // console.log(isLoading, isError, data);

  return (
    <div>
      <h1>Register page</h1>
      <form onSubmit={handleSubmit(onSubmitRegisterHandler)}>
        <input placeholder="email" type="text" {...register("email")} />
        <input placeholder="nickname" type="text" {...register("nickname")} />
        <input placeholder="password" type="text" {...register("password")} />
        <input
          placeholder="password"
          type="text"
          {...register("passwordConfirm")}
        />
        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
};

export default Register;
