import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './views/CreatePlaylistView';
import Play from './views/Play';
import Auth from './views/AuthenticateView';
import PageNotFound from "./views/PageNotFound";


const Router = () => {
	return (
        <Switch>
            <Route path="/play/:playlistId" component={Play} />
            <Route path="/auth" component={Auth} />
            <Route exact path="/" component={Home} />
            <Route path="*"><PageNotFound /></Route>
        </Switch>
	);
}

export default Router;