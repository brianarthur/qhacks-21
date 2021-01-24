import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { spotifyAuthenticateUrl } from '../utils/constants';

const AuthenticateView = () => {
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

export default AuthenticateView;