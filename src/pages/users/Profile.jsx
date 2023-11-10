import React from "react";
import { useParams } from "react-router-dom";
import { getPorfile } from "../../api/user/GET/profile";
import { useQuery } from "react-query";

const Profile = () => {
  const { userId } = useParams();

  const { data } = useQuery(["user", userId], () => getPorfile(userId));

  console.log("?: ", data);

  return <div>프로필 페이지</div>;
};

export default Profile;

// *은진님
// 레시피 / (게시물 미정) 등에 있는 닉네임에 온클릭을 걸어서 해당 닉네임에 맞는 유저아이디로
// 네비게이션 훅을 써서 프로필 페이지로 이동

// 프로필 페이지에서는
// 1. 현재 로그인한 유저인지 확인
// 1 - 1 로그인한 유저와 url parma으로 받은 값이 일치하면 본인 페이지
// 본인 페이지는 프로필 수정 / 회원 탈퇴 등 로직이 추가로 들어감

// parma으로 받아온 유저 아이디 값으로 회원 정보 api 요청
// 받아온 데이터로 페이지 구성
