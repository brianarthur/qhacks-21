import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { autoLogin } from './store/actions/tracks';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Layout = ({ children, token, attemptedLogin, autoLogin }) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    autoLogin();
  }, []);

  useEffect(() => {
    if (attemptedLogin && !token) {
      history.push(`/auth?r=${location.pathname}`);
    }
  }, [token, attemptedLogin]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h6'>
            Power Hour Buddy
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
}

const mapStateToProps = ({ token, attemptedLogin }) => {
  return { token, attemptedLogin };
}

const mapDispatchToProps = { autoLogin };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
