/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { GlobalStyle } from '../styles/global-styles';

import Routes from './routes';
import MainLayout from './layouts/main-layout';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <MainLayout>
        <Routes />
      </MainLayout>
      <GlobalStyle />
    </BrowserRouter>
  );
}
