import { BrowserRouter, Route, Routes } from "react-router-dom";
// pages
import Login from "../pages/users/Login";
import Main from "../pages/recipe/Main";
import Register from "../pages/users/Register";
import SearchPage from "../pages/recipe/SearchPage";
import DetailPage from "../pages/recipe/DetailPage";
import CreatePage from "../pages/recipe/CreatePage";

// components
import Navigation from "../component/Navigation";
import NotFound from "../component/NotFound";

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
          <Route path="/recipe/:recipeId" element={<DetailPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;