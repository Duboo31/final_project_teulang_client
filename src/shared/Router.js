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

// components
import Navigation from "../component/Navigation";
import NotFound from "../component/NotFound";
import UpdatePage from "../pages/recipe/UpdatePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigation />}>
          <Route index element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/update" element={<UpdatePage />} />
          <Route path="/recipe/:recipeId" element={<DetailPage />} />
          <Route path="/multi" element={<MultiViewPage />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profile/userModify" element={<Update />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
