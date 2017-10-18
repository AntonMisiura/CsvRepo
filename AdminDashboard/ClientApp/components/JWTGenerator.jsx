import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';

export class JWTGenerator extends React.Component{
   
    constructor() {
        super();
        this.state = { deviceID: '', token: '', loading: true };
        this.getToken = this.getToken.bind(this)
        this.handleDeviceIDChange = this.handleDeviceIDChange.bind(this)
    }
    getToken() {
        if (this.state.deviceID !== "") {
            var newThis = this;

            axios.get("api/JWTGenerator/GetToken", { params: { deviceID: this.state.deviceID } }).then((res) => {
                console.log(res.data)

                newThis.setState({ token: res.data })
            }).catch((error) => {
                console.error(error)
            })
        }
        else return
         
    }
   handleDeviceIDChange(event: any){
        this.setState({deviceID: event.target.value});
   }
     render(){
        return <div>
                <h2>Token generator</h2>
                <label>Device ID</label>
                <input type="text" value={this.state.deviceID} onChange={this.handleDeviceIDChange} 
                        className="form-control device-id-input" />
                <button  onClick={this.getToken} className="btn btn-success">Get Token By ID</button>
                <h3>Token</h3>
                <textarea className="form-control"  style={{width: 650+'px', height: 100+'px'}} readOnly value={this.state.token}></textarea>
            </div>
    }
}