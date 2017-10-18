import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';


export class DeviceRegistration extends React.Component{
    constructor() {
        super();
        this.state = { secretKey: "", originalID:""  };
        this.generateSecretKey = this.generateSecretKey.bind(this);
        this.generateOriginalDeviceID = this.generateOriginalDeviceID.bind(this);
       
    }
    generateSecretKey() {
        let newThis = this;
        axios.get("/api/Device/GetDeviceSecretKey").then(res => {
            newThis.setState({ secretKey: res.data });
        })

    }
    generateOriginalDeviceID() {
        let newThis = this;
        axios.get("/api/Device/GetDeviceOriginalID").then(res => {
            newThis.setState({ originalID: res.data });
        })

    }
     render() {
       
        return <div>
            <div className="col-md-5">
                <button type="button" onClick={this.generateSecretKey} className="btn btn-success">Generate secret key</button>
                <input className="form-control" value={this.state.secretKey} />
            </div>
            <div className="col-md-3">
                <button type="button" onClick={this.generateOriginalDeviceID} className="btn btn-success">Generate original device ID</button>
                <input className="form-control" value={this.state.originalID} />
            </div>
            <div className="col-md-3">
                <div>Select user</div>
            </div>
            <div className="col-md-3">
                <div>Select car</div>
            </div>

        </div>;
    }

    
}


