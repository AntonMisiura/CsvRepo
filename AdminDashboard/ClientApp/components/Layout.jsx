import * as React from 'react';
import { NavMenu } from './NavMenu';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
     render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'>
                    <NavMenu />
                </div>
                <div className='col-sm-10'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
