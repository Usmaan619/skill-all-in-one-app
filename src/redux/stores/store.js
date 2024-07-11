// store.js

import { rootReducer } from "../root.reducers";
import { createStore } from "redux";

// The store now has the ability to accept thunk functions in `dispatch`
const store = createStore(rootReducer);
export default store;
