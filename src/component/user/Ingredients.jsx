import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import AddBtn from "./AddBtn";
import AddIngredientsForm from "./AddIngredientsForm";
import UpdateIngredient from "./UpdateIngredient";

// api
import { getMyIngredients } from "../../api/user/GET/ingredients";
import { deleteIngredient } from "../../api/user/DELETE/ingredient";

// css
import "../../styles/user/ingredient.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Ingredients = () => {
  const [isAddBtnActive, setIsAddBtnActive] = useState(false);
  const [isAddInputActive, setIsAddInputActive] = useState(false);

  const [clickEditId, setClickEditId] = useState("");
  const [delBtnAction, setDelBtnAction] = useState(false);

  const users = useSelector(({ users }) => {
    return users;
  });

  const { data, isLoading, isSuccess, refetch } = useQuery(
    ["ingredients", users.userId],
    () => getMyIngredients(users.userId),
    {
      onSuccess: (result) => {
        console.log(result);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [isAddInputActive, clickEditId, delBtnAction]);

  const { mutate } = useMutation(deleteIngredient, {
    onSuccess: () => {
      setDelBtnAction((cur) => !cur);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onClickDeleteIngredient = (id, userId) => {
    const delData = {
      id,
      userId,
    };
    const isDelete = window.confirm("재료를 삭제하시겠습니까?");
    if (isDelete) {
      mutate(delData);
    }
  };

  const getStateText = (num) => {
    if (num === 1) {
      return "경고";
    } else if (num === 2) {
      return "주의";
    } else if (num === 3) {
      return "안전";
    }
  };

  return (
    <div className="my-ingredient-wrap">
      <div className="recipe-banner">
        <div>
          {data?.data?.recommend_data.length === 0 && isSuccess ? (
            <div>추천 레시피가 없어요!</div>
          ) : (
            <>
              <div>
                {data?.data?.recommend_data.warning_state_ingredients.map(
                  (item) => {
                    return <span>{item}</span>;
                  }
                )}
              </div>
              <div>
                <p>
                  활용한
                  <Link
                    to={`/recipe/${data?.data?.recommend_data.recommand_recipe_id}`}
                  >
                    레시피 보기
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
        <div>
          <p
            className="add-btn"
            onClick={() => {
              setIsAddBtnActive((cur) => !cur);
              setIsAddInputActive(true);
            }}
          >
            재료추가
          </p>
        </div>
      </div>
      <ul className="header-chart header-chart_list">
        <li>재료명</li>
        <li>용량</li>
        <li>소비기한</li>
        <li>등록일</li>
        <li>수정</li>
        <li>삭제</li>
        <li>상태</li>
      </ul>

      {isLoading && <div>재료 가져오는 중...</div>}
      {isSuccess &&
        data?.data?.frige_serializer_data?.map((ingredient) => {
          return (
            <div className="list-wrap" key={ingredient.id}>
              <ul
                className={
                  clickEditId === ingredient.id
                    ? "header-chart clicked"
                    : "header-chart"
                }
              >
                <li>{ingredient.title}</li>
                <li>
                  {ingredient.amount === "" ? "미기입" : ingredient.amount}
                </li>
                <li>{ingredient.expiration_date.slice(2, 10)}</li>
                <li>{ingredient.created_at.slice(2, 10)}</li>
                <li
                  onClick={() => {
                    setClickEditId(ingredient.id);
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </li>
                <li
                  onClick={() => {
                    onClickDeleteIngredient(ingredient.id, ingredient.user_id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </li>
                <li className={`state state${ingredient.state}`}>
                  <div>{getStateText(ingredient.state)}</div>
                </li>
              </ul>
              {clickEditId === ingredient.id && (
                <UpdateIngredient
                  setClickEditId={setClickEditId}
                  id={ingredient.id}
                  userId={ingredient.user_id}
                />
              )}
            </div>
          );
        })}
      {isAddInputActive && (
        <AddIngredientsForm
          setIsAddInputActive={setIsAddInputActive}
          userId={users.userId}
        />
      )}
    </div>
  );
};

export default Ingredients;
