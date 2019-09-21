import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { fetchLogin, setLoginAction, setUserIdAction } from '../../store/auth/actions';
import { connect } from 'react-redux';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { withRouter, RouterProps } from 'react-router';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    height: '100%'
  },
  loginWrap: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    maxWidth: '400px',
    '& .MuiTextField-root': {
      marginBottom: '12px'
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  errorMsg: {
    color: '#f44336',
    marginBotton: '12px'
  }
}

interface Props extends RouterProps {
  classes: any;
  fetchLogin: (email: string, password: string) => Observable<AxiosResponse<any>>;
  /** Выполняет вход в систему и сохраняет id */
  saveUserInfo: (userId: number) => void;
}

const Login = (props: Props) => {
  const initialErrors: any = {};
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errors, setErrors] = useState(initialErrors);
  const [isFetching, setIsFetching] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.trim();
    setLoginValue(email);

    var emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegexp.test(email)) {
      const { email, ...otherErrors } = errors;
      setErrors({ ...otherErrors });
    } else {
      setErrors({ ...errors, email: 'Указан неверный email' });
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  }

  const handleLoginClick = () => {
    setIsFetching(true);

    props.fetchLogin(loginValue, passwordValue)
      .subscribe(res => {
        setIsFetching(false);

        switch (res.data.status) {
          case 'ok':
            props.saveUserInfo(res.data.data.id);
            props.history.push('/profile');
            break;
          case 'err':
            setErrors({ ...errors, loginError: getLoginErrorMessage(res.data.message) });
            break;
        }
      }, err => {
        setIsFetching(false);
        setErrors({ ...errors, loginError: 'Сервер недоступен' })
      });
  }

  return (
    <Grid container justify="center" alignItems="center" className={props.classes.root}>
      <form className={props.classes.loginWrap} noValidate>
        <TextField variant="filled" label="Логин" type="email" error={errors.email} value={loginValue} onChange={handleLoginChange} />
        <TextField variant="filled" label="Пароль" type="password" value={passwordValue} onChange={handlePasswordChange} />
        <div className={props.classes.buttons}>
          <Button variant="outlined" disabled={isFetching} onClick={handleLoginClick}>Войти</Button>
        </div>
      </form>
    </Grid>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchLogin: (email: string, password: string) => {
    return dispatch(fetchLogin(email, password));
  },
  saveUserInfo: (userId: number) => {
    dispatch(setLoginAction(true));
    dispatch(setUserIdAction(userId));
  },
})

const LoginStyled = withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(Login)));

export { LoginStyled as Login }

const loginErrorMessages: { serverCode: string; value: string }[] = [
  {
    serverCode: 'wrong_email_or_password',
    value: 'Введены неверные email или пароль'
  }
] 

/** Возвращает текст сообщения об ошибке в зависимости от кода ответа сервера */
const getLoginErrorMessage = (serverErrorCode: string) => {
  for (let knownErrorMsg of loginErrorMessages) {
    if (serverErrorCode === knownErrorMsg.serverCode) {
      return knownErrorMsg.value;
    }
  }

  return 'Произошла ошибка при попытке войти в систему';
}