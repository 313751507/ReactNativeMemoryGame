import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import store from '@memory_game_store';
import { AppNavigator } from '@memory_game_components/AppNavigator';

class App extends Component
{
  render()
  {
    return (
      <AppNavigator navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })} />
    );
  }
}

const mapStateToProps = (store) => ({
  nav: store.navigation
});
const AppWithNavigationState = connect(mapStateToProps)(App);

class Root extends Component
{
  constructor()
  {
    super();
  }

  render()
  {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default Root;
