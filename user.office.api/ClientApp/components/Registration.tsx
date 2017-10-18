import * as React from 'react';
import { RouteComponentProps } from 'react-router';
declare var Widget: any;
export class Registration extends React.Component<RouteComponentProps<{}>, {}> {
componentDidMount(){
//var w = new Widget();
}
    public render() {
        return <div>
            <div id="registration" className="login-reg-form"></div>
            
        </div>;

    }
}
