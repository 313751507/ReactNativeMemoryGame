import { applyMiddleware, createStore } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import reducer from "@memory_game_reducers";

const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (e) {
    // Handle error!
    console.log('Error middleware triggered!', e);
  }
};

const middleware = applyMiddleware(promise(), thunk, createLogger({}), error);

export default createStore(reducer, middleware);
