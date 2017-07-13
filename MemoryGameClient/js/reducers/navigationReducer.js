import { BackAndroid } from 'react-native';
import { AppNavigator } from '@memory_game_components/AppNavigator';

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Landing')
);

export default function reducer(state = initialState, action)
{
  if(action.type === "Navigation/BACK" && state.routes.length === 1)
  {
    BackAndroid.exitApp();
  }

  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
