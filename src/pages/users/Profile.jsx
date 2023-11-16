import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPorfile } from "../../api/user/GET/profile";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

const Profile = () => {
  // 프로필 페이지에서 현재 로그인 유저와 페이지의 유저가 같은 유저인지 확인
  const [isMyAccount, setIsMyAccount] = useState(false);

  // 리덕스 스토어의 현재 계정 정보
  const user = useSelector(({ users }) => {
    return users;
  });

  const navigate = useNavigate();

  // url에서 가져온 계정 번호
  const { userId } = useParams();

  useEffect(() => {
    setIsMyAccount(user.userId === Number(userId));
  }, [userId, user]);

  const { data, isSuccess } = useQuery(["user", userId], () =>
    getPorfile(userId)
  );

  const onClickProfileUpdateBtnHandler = () => {
    navigate(`/profile/userModify/`);
  };

  console.log("data: ", data);

  return (
    <div>
      <div>프로필 페이지</div>
      <div>
        {isSuccess && (
          <div>
            <img
              src={`${process.env.REACT_APP_SERVER_LOCAL_URL}${data?.data?.user_img}`}
              alt="프로필 이미지"
            />
            <div>{data?.data?.email}</div>
            <div>{data?.data?.nickname}</div>
          </div>
        )}
      </div>

      <div>
        {isMyAccount && (
          <button onClick={onClickProfileUpdateBtnHandler}>프로필 수정</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
