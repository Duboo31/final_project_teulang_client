import React, { useEffect, useState } from "react";
import requests from "../../api/recipes/requests";
import axios from "../../api/recipes/axios";
import Loading from "../../component/Loading";
import default_thumbnail from "../../images/default_thumbnail.jpg";
import urls from "../../shared/url";
import { useNavigate } from "react-router-dom";

export default function FreeAllPage() {
  const [freeArticlesList, setFreeArticlesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFreeArticlesList();
  }, []);

  const fetchFreeArticlesList = async () => {
    const request = await axios.get(requests.fetchFreeList);
    console.log(
      "fetchFreeArticlesList-pagenation_data: ",
      request.data.pagenation_data
    );
    console.log(
      "fetchFreeArticlesList-serializer_data: ",
      request.data.serializer_data
    );
    setFreeArticlesList(request.data.serializer_data);
    // setRecipes(request.data);
  };

  return (
    <div>
      {freeArticlesList.length > 0 ? (
        <div>
          {freeArticlesList.map((article) => {
            console.log("article", article);
            return (
              <div
                onClick={() => {
                  navigate(`/article/${article.id}`);
                }}
              >
                <p>title : {article.title}</p>
                <img
                  src={
                    article.images
                      ? urls.baseURL + article.images[0].free_image
                      : default_thumbnail
                  }
                  style={{ width: "200px" }}
                />
                <span>author: {article.user_data.nickname}</span>
                <br />
                <span>category: {article.category}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
}
