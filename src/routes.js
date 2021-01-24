import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './views/Home';
import Play from './views/Play';

const Router = () => {
	return (
        <Switch>
            <Route path="/play/:playlistId" component={Play} />
            <Route exact path="/" component={Home} />
        </Switch>
	);
}

export default Router;