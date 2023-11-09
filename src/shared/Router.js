import { BrowserRouter, Route, Routes } from "react-router-dom";
// pages
import Login from "../pages/users/Login";
import Main from "../pages/recipe/Main";
import Register from "../pages/users/Register";

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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
