import React, { useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import queryString from 'query-string'
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { login } from '../store/actions/tracks';
import { spotifyAuthenticateUrl } from '../utils/constants';

const AuthenticateView = ({ token, login }) => {
  const history = useHistory();
  const location = useLocation();
  const parsedHash = queryString.parse(location.hash);
  const parsedRedirect = queryString.parse(location.search);
  const redirectUrl = parsedRedirect.r ? parsedRedirect.r : '/';

  useEffect(() => {
    if (parsedHash.access_token) {
      login(parsedHash.access_token);
      
    }
  }, []);

  useEffect(() => {
    if (token) {
      history.push(redirectUrl);
    }
  }, [token]);

  return (
    <div className="not-authenticated">
      <Card className="not-authenticated-card">
        <CardContent>
          <Typography gutterBottom variant="h5">
            Not authenticated with Spotify.
          </Typography>
        </CardContent>
        <CardContent className="not-authenticated-card-btn">
          <CardActions>
            <Button size="small" color="primary" href={spotifyAuthenticateUrl}>
              Authenticate
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

const mapStateToProps = ({ token }) => {
  return {
    token,
  }
}

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateView);