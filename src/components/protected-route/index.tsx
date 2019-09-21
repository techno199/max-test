import React from 'react';
import { AuthState } from '../../store/auth/types';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { withStyles } from '@material-ui/styles';

const styles = { }

interface Props {
  classes: any;
  component: React.ComponentType;
  path: string;
  auth: AuthState;
}

const ProtectedRoute = (props: Props) => {
  const { auth, component, ...rest } = props;

  return (
    auth.isLoggedIn
      ? <Route {...rest} render={() => React.createElement(component)}/> 
      : <Route {...rest} render={() => <Redirect to="/login" />} />
  )
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

const ProtectedRouteStyled = connect(mapStateToProps)(withStyles(styles)(ProtectedRoute));

export { ProtectedRouteStyled as ProtectedRoute }