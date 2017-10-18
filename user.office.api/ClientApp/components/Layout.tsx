import * as React from 'react';
import { NavMenu } from './NavMenu';
declare var Widget: any;
import Cookies from 'universal-cookie';
export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    componentDidMount() {
        const cookies = new Cookies();

        cookies.set('myCat', 'Pacman', { path: '/' });
        console.log(cookies.get('myCat'));
//var w = new Widget();
    }

    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'>
                    <NavMenu />
                </div>
                <div className='col-sm-10'>
                    <div id="auth-widget"></div>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
