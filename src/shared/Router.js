import { BrowserRouter, Route, Routes } from "react-router-dom";
// pages
import Login from "../pages/users/Login";
import Main from "../pages/recipe/Main";
import Register from "../pages/users/Register";
import SearchPage from "../pages/recipe/SearchPage";
import DetailPage from "../pages/recipe/DetailPage";
import CreatePage from "../pages/recipe/CreatePage";
import MultiViewPage from "../pages/recipe/MultiViewPage";
import Profile from "../pages/users/Profile";
import Update from "../pages/users/Update";
import UpdatePage from "../pages/recipe/UpdatePage";
import FreeAllPage from "../pages/recipe/FreeAllPage";
import FreeDetailPage from "../pages/recipe/FreeDetailPage";
import ArticleCreatePage from "../pages/recipe/ArticleCreatePage";
import ArticleUpdatePage from "../pages/recipe/ArticleUpdatePage";

// components
import Navigation from "../component/Navigation";
import NotFound from "../component/NotFound";
import PasswordReset from "../pages/users/PasswordReset";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/pwReset" element={<PasswordReset />} />
        <Route element={<Navigation />}>
          <Route index element={<Main />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/update" element={<UpdatePage />} />
          <Route path="/recipe/:recipeId" element={<DetailPage />} />
          <Route path="/multi" element={<MultiViewPage />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profile/userModify" element={<Update />} />
          <Route path="/article" element={<FreeAllPage />} />
          <Route path="/article/:articleId" element={<FreeDetailPage />} />
          <Route path="/article/create" element={<ArticleCreatePage />} />
          <Route path="/article/update" element={<ArticleUpdatePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
