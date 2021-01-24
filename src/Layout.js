import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { autoLogin } from './store/actions/tracks';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Layout = ({ children, autoLogin }) => {
  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

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

const mapDispatchToProps = { autoLogin };

export default connect(null, mapDispatchToProps)(Layout);
