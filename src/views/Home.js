import React, { useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import queryString from 'query-string'
import { connect } from 'react-redux';

import { login } from '../store/actions/tracks';

import AuthenticateView from './AuthenticateView';
import CreatePlaylistView from './CreatePlaylistView';

const Home = ({ token, login }) => {
  const history = useHistory();
  const location = useLocation();
  const parsedHash = queryString.parse(location.hash);

  useEffect(() => {
    if (parsedHash.access_token) {
      login(parsedHash.access_token);
      history.push('/');
    }
  }, []);

  return (
    <div>
      {!token && <AuthenticateView />}
      {token && <CreatePlaylistView />}
    </div>
  );
}

const mapStateToProps = ({ token }) => {
  return {
    token,
  }
}

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Home);