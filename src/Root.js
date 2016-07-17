/**
 * THIS IS THE React web app ENTRY POINT.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { IntlProvider } from 'react-intl';
import * as i18n from './i18n';

import getRoutes from './routes';

function getRootChildren(rootProps, routes) {
  const { client } = rootProps;

  const bindReduxAsyncConnect = (props) =>
    <ReduxAsyncConnect {...props} helpers={{ client }} />;

  const rootChildren = [
    <Router key="router" render={bindReduxAsyncConnect} history={browserHistory} routes={routes}/>
  ];

  return rootChildren;
}


export default class Root extends Component {

  static propTypes = {
    client: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  //This step make a routes as a constant. This is a solution that a IntlProvider refresh Router routes.
  // about issue: https://github.com/rackt/react-router/issues/2704
  componentWillMount() {
    this.setState({
      routes: getRoutes(this.context.store)
    });
  }

  render() {

    // Key reloadedNum is used for issue that Router reload page for logout. https://github.com/reactjs/react-router/issues/1982
    // This is also related with routes. reloadedNum.
    return (
      <div key="root">{getRootChildren(this.props, this.state.routes)}</div>
    );
  }
}
