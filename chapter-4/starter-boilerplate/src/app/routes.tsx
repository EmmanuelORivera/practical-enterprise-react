import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import Dashboard from './layouts/dashboard-layout';
import Home from './views/pages/Home';
import NotFoundPage from './views/pages/NotFoundPage';

const Routes = () => {
  return (
    <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/about"
          component={lazy(() => import('./views/pages/AboutPage'))}
        />
        <Route
          path={'/dashboard'}
          render={({ match: { path } }) => (
            <Dashboard>
              <Switch>
                <Route
                  exact
                  path={path + '/'}
                  component={lazy(() =>
                    import('./views/dashboard/dashboard-default-content'),
                  )}
                />
                <Route
                  path={path + '/list-products'}
                  exact
                  component={lazy(() =>
                    import('./views/dashboard/product/ProductListView'),
                  )}
                />
                <Route
                  exact
                  path={path + '/create-product'}
                  component={lazy(() =>
                    import('./views/dashboard/product/ProductCreateView'),
                  )}
                />
              </Switch>
            </Dashboard>
          )}
        />
        <Route exact path="/not-found" component={NotFoundPage} />
        <Redirect from={'*'} to={'/not-found'} exact />
      </Switch>
    </Suspense>
  );
};

export default Routes;
