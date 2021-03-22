import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { UserStore } from './contexts/UserContext';
import { CalendarStore } from "./contexts/CalendarContext";


import * as ROUTES from '../constants/routes';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import LandingPage from './landingPage/LandingPage';
import GithubAuth from './landingPage/GithubAuth';
import HomePage from './homePage/HomePage';
import GlobalStyles from '../styles/Global';
import 'antd/dist/antd.css';


const App = () => {
	return (
		<BrowserRouter>
			<CookiesProvider>
				<UserStore>
					<CalendarStore>
						<GlobalStyles />
						<Switch>
							<PublicRoute exact path={ROUTES.LANDING} component={LandingPage} />
							<Route exact path={`${ROUTES.GITHUB_AUTH}/:code`} component={GithubAuth} />
							<Route path={ROUTES.HOME} exact render={() => <Redirect to={`${ROUTES.HOME}${ROUTES.DASHBOARD}`} />} />
							<PrivateRoute path={ROUTES.HOME} component={HomePage} />
						</Switch>
					</CalendarStore>
				</UserStore>
			</CookiesProvider>
		</BrowserRouter>
	)
};

export default App;
