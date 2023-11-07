import { configureStore } from "@reduxjs/toolkit";

import users from "../modules/users";
import recipe from "../modules/recipe";

const store = configureStore({
  reducer: {
    users,
    recipe,
  },
});

export default store;
