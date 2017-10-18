import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';

interface TailState {
    records: Record[];
    pidCodes: string[];
    pidNames: string[];
    pids: string[];
    deviceIdValue: string;
    recordsAmount: number;
    deviceIDList: string[];
    amounts: number[];
}
interface Record{
    recordTime: string;
    pidCode: string;
    value: string;
}
export class Tail extends React.Component{
    
    constructor() {
        super();
        this.state = {
            records: [],
            pidCodes: [],
            pidNames: [],
            pids:[],
            deviceIdValue: '',
            recordsAmount: 0,
            deviceIDList: [],
            amounts: [50, 100, 1000, 10000]
        }
        this.setDeviceId = this.setDeviceId.bind(this);
        this.setRecordsAmount = this.setRecordsAmount.bind(this);
    }
     setDeviceId(event) {
        var newThis = this;
        this.setState({ deviceIdValue: event.target.value }, () => {

            newThis.getData();
        });

    }
    setRecordsAmount(event) {
        var newThis = this;
        this.setState({ recordsAmount: event.target.value }, () => {

            newThis.getData();
        });

    }
    componentDidMount() {
        this.getIdList();
    }
     getIdList() {
        let newThis = this;
        axios.get("/api/tail/getdeviceidlist").then((res) => {
             console.log(res)
            newThis.setState({ deviceIDList: res.data }, () => {
                newThis.setState({ deviceIdValue: newThis.state.deviceIDList[0], 
                    recordsAmount: newThis.state.amounts[0] })
            })
        }).catch((error) => {
            console.error(error)
        })
    }
     getData() {
        var id = this.state.deviceIdValue;
        var amount = this.state.recordsAmount;
        var newThis = this;
        console.log(this.state)
        axios.get("/api/Tail/GetRecords", { params: { deviceID: id, limit: amount } }).then((res) => {
            console.log(res.data)

            newThis.setState({ pidNames:res.data.pidNames, pidCodes: res.data.pidCodes,  records: res.data.pids })
        }).catch((error) => {
            console.error(error)
        })
    }
    render(){
        return  <div>

                <h2>Tail </h2>
                <div className="filters">
                    <label htmlFor="">Car serial id</label>
                    <select name="" id="" className="form-control tail-select" value={this.state.deviceIdValue}
                        onChange={this.setDeviceId}>
                        {
                            this.state.deviceIDList.map((id, index) => {
                                return <option value={id} key={index}>{id}</option>
                            })
                        }
                    </select>
                    <label htmlFor="">Last N records</label>
                    <select name="" id="" className="form-control tail-select"
                        value={this.state.recordsAmount} onChange={this.setRecordsAmount}>
                        {
                            this.state.amounts.map((amount, index) => {
                                return <option value={amount} key={index}>{amount}</option>
                            })
                        }
                    </select>
                </div>
                <div className="overflow">
                    {
                        this.state.pidNames.length !== 0  &&
                        <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                {
                                    this.state.pidNames.map((pidName, index) => {
                                        
                                        return <th key={index}>{pidName}</th>
                                    })
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {
                               
                                this.state.records.map((record:Record, index) => {
                                    return <tr key={index}>
                                        <td key={index}>
                                            {
                                                record.recordTime
                                                
                                                }
                                        </td>
                                        {
                                            this.state.pidCodes.map((pidCode, index)=>{
                                                var x="";
                                                if(record.pidCode == pidCode){
                                                  
                                                   x = <td key={index}>{record.value}</td>
                                                }
                                                else{
                                                   x = <td key={index}></td>
                                                }
                                                return x;

                                            })
                                        }


                                    </tr>
                                })
                            }

                        </tbody>

                    </table>
                    }
                    
                </div>

            </div>
    }

}