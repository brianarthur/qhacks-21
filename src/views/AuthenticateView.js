import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { spotifyAuthenticateUrl } from '../utils/constants';

let clientID = "0413ac0616dc44fb99939db92ba465f3"
let redirect = "http://localhost:3000/"
let scopes = ["playlist-modify-public", "user-read-private", "user-top-read"]
const url = `${spotifyAuthenticateUrl}?client_id=${clientID}&response_type=token&redirect_uri=${redirect}&scope=${scopes.join("%20")}`;


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
                <Button size="small" color="primary" href={url}>
                  Authenticate
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </div>
    );
}

export default AuthenticateView;