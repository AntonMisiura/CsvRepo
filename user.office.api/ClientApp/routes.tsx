import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Chart } from './components/Chart';
import { LoginComp } from './components/LoginComp';
import { Map } from './components/Map';
import { Registration } from './components/Registration';
import { RestorePassword } from './components/RestorePassword';
import { SelectorsPanel } from './components/SelectorsPanel';
export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/chart' component={Chart} />
    <Route path='/loginpage' component={LoginComp} />
    <Route path='/registration' component={Registration} />
    <Route path='/restorepassword' component={RestorePassword} />
    <Route path='/panel' component={SelectorsPanel} />
    <Route path='/map' component={Map} />
</Layout>;
