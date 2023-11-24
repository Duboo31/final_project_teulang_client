import React from "react";
import { useLocation } from "react-router-dom";
import ArticleCreateForm from "../../component/ArticleCreateForm";

export default function ArticleUpdatePage() {
  const { state } = useLocation();
  console.log("state.freeArticleDetail: ", state.freeArticleDetail);
  const freeArticleDetail = state.freeArticleDetail;

  // article_id = "",
  // title = "",
  // content = "",
  // category = "chat",
  // article_imgs = [],
  // isForUpdate = false,

  return (
    <div>
      <ArticleCreateForm
        article_id={freeArticleDetail.id}
        title={freeArticleDetail.title}
        content={freeArticleDetail.content}
        category={freeArticleDetail.category}
        cur_article_imgs={freeArticleDetail.images !== null && freeArticleDetail.images}
        isForUpdate={true}
      />
    </div>
  );
}
