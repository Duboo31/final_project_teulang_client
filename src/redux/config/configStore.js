import { configureStore } from "@reduxjs/toolkit";

import users from "../modules/users";
import recipe from "../modules/recipe";
import searchValue from "../modules/searchValue";

const store = configureStore({
  reducer: {
    users,
    recipe,
    searchValue,
  },
});

export default store;
