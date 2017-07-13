import { combineReducers } from "redux";

import gameReducer from "./gameReducer";
import navigationReducer from "./navigationReducer";
import flickrReducer from "./flickrReducer";

export default combineReducers({
  game: gameReducer,
  navigation: navigationReducer,
  flickr: flickrReducer
});
