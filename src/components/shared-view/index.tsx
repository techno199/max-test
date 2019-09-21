import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar'
import { Tabs, Tab, Grid, Button, useMediaQuery, Theme } from '@material-ui/core';
import { Route, Redirect, withRouter, RouteComponentProps } from 'react-router';
import { AppState } from '../../store';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { AuthState } from '../../store/auth/types';
import { NewsFeed } from '../news-feed';
import { ProtectedRoute } from '../protected-route';
import { Login } from '../login';
import { Profile } from '../profile';
import { setLoginAction } from '../../store/auth/actions';
import { SharedViewLoader } from './shared-view-loader';
import { LoadingState } from '../../store/loading/types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme: any) => ({ 
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    position: 'relative'
  },
  appBar: {
    justifyContent: 'center'
  },
  contentWrap: {
    height: '100%',
    overflow: 'auto'
  },
  content: {
    padding: '10px 12px',
  },
  loginBtn: {
    color: 'inherit !important',
    position: 'absolute !important',
    right: '12px'
  },
  loader: {
    position: 'absolute',
    right: 'calc(50% - 45px)',
    bottom: 'calc(50% - 45px)',
    [theme.breakpoints.up('md')]: {
      right: 0,
      bottom: 0
    }
  }
})

interface Props extends RouteComponentProps { 
  classes: any;
  auth: AuthState;
  loading: LoadingState;
  setLogin: (isLoggedIn: boolean) => void;
}

const SharedView = (props: Props) => {
  const [tabValue, setTabValue] = useState("news");
  const xsUp = useMediaQuery('(min-width: 960px');

  // Подписка на изменение роута для работы меню навигации
  useEffect(() => {
    setTabValue(props.history.location.pathname);

    props.history.listen((location, action) => {
      setTabValue(location.pathname);
    });
  }, []);

  const handleTabChange = (event: ChangeEvent<{}>, route: string) => {
    props.history.push(route);
  }

  const handleLoginClick = () => {
    if (props.auth.isLoggedIn) {
      props.setLogin(false);
    } else {
      props.history.push("/login");
    }
  }

  return (
    <div className={props.classes.root}>
      <AppBar position='static' className={props.classes.appBar}>
        <Tabs centered={xsUp} value={tabValue} onChange={handleTabChange}>
          <Tab label="Новости" value="./news" />
          <Tab label="Профиль" value="./profile" />
        </Tabs>

        <Button className={props.classes.loginBtn} onClick={handleLoginClick}>
          {
            props.auth.isLoggedIn ?
              "Выйти" :
              "Войти"
          }
        </Button>
      </AppBar>
      <Grid container justify="center" className={props.classes.contentWrap}>
        <Grid item xs={10} md={5} xl={4} className={props.classes.content}>
          <Route path="/" exact render={() => <Redirect to="/news" />}/>
          <Route path="/login" component={Login} />
          <Route path="/news" component={NewsFeed} />
          <ProtectedRoute path="/profile" component={Profile} />
        </Grid>
        {
          props.loading.loadingResourcesCount > 0
            ? <SharedViewLoader className={props.classes.loader} />
            : null
        }
      </Grid>
    </div>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    auth: state.auth,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  setLogin: (isLoggedIn: boolean) => {
    dispatch(setLoginAction(isLoggedIn));
  }
})

// @ts-ignore
const SharedViewStyled = withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SharedView)));

export { SharedViewStyled as SharedView }