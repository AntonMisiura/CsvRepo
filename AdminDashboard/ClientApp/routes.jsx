import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { JWTGenerator } from './components/JWTGenerator';
import { Tail } from './components/Tail';
import { DeviceRegistration } from './components/DeviceRegistration';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={ FetchData } />
    <Route path='/jwt' component={ JWTGenerator } />
     <Route path='/tail' component={ Tail } />
     <Route path='/deviceRegistration' component={DeviceRegistration } />
</Layout>;
