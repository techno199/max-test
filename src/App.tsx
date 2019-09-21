import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import classes from '*.module.scss';
import { SharedView } from './components/shared-view';
import { withStyles } from '@material-ui/core/styles';
import { setLoginAction } from './store/auth/actions';
import { connect } from 'react-redux';

const styles = {
  root: {
    height: '100vh',
    background: '#282c34',
    display: 'flex'
  }
}

interface Props {
  classes: any;
  setLogin: (isLoggedIn: boolean) => void;
}

function App(props: Props) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <SharedView />
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  setLogin: (isLoggedIn: boolean) => dispatch(setLoginAction(isLoggedIn))
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(App));
