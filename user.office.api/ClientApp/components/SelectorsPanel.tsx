import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { CarSelector } from './CarSelector'
import { TrackSelector } from './TrackSelector'
import { Datepickers } from './Datepickers'
interface SelectorsPanelState {
    cars: Car[];
    selectedCarID: string;
    tracks: ITrack[];
    selectedTrack: number;
    userID: string;
    startDate: Date;
    endDate: Date;
}

class Car {
    id: number;
    name: string;
}
interface ITrack {
    start: any;
    end: any;
}
class Track implements ITrack {
    constructor(Start, End) {
        this.start = Start;
        this.end = End;
    }
    start: Date;
    end: Date;
}
interface IRequestParams {
    id: string;
    startDate: Date;
    endDate: Date

}
class RequestParams implements IRequestParams {
    id: string;
    startDate: Date;
    endDate: Date

}
export class SelectorsPanel extends React.Component<any, SelectorsPanelState> {
    constructor() {
        super();
        this.state = {
            cars: [],
            tracks: [],
            selectedTrack: 0,
            userID: "1",
            selectedCarID: "",
            startDate: new Date(),
            endDate: new Date()
        };
        this.selectCarID = this.selectCarID.bind(this);
    }
    componentDidMount() {
        this.getCars();
    }
    getCars() {
        var newThis = this;
        axios.get('/api/chart/GetUserCars/' + this.state.userID).then((res) => {
            newThis.setState({ cars: res.data, selectedCarID: res.data[0].id }, () => {
            })
        });
    }
    toUTCConvert(date: Date) {
        return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    }
    formParamsObj() {
        let params = new RequestParams();
        params.startDate = this.state.startDate;
        params.endDate = this.state.endDate;
        params.id = this.state.selectedCarID;
        console.log(params)
        return params;

    }
    getTracks(requestParams:any) {
      
        let newThis = this;
        axios.get('/api/chart/GetTracks/' + requestParams.id, { params: requestParams }).then((res) => {

            var buf = [];

            for (var i = 0; i < res.data.length; i++) {
                buf.push(new Track(newThis.toUTCConvert(new Date(res.data[i].start * 1000)), newThis.toUTCConvert(new Date(res.data[i].end * 1000))))
            }
            newThis.setState({ tracks: buf, selectedTrack: buf[0] }, () => { console.log("state set") });
        });
    }
    selectCarID(carID: any) {
        this.setState({ selectedCarID: carID }, () => {
            this.getTracks(this.formParamsObj());
        })
    }
    selectTrack(track: any) {
        this.setState({ startDate: this.state.tracks[track].start, endDate: this.state.tracks[track].end, selectedTrack: track }, () => {
            //this.getData(this.formParamsObj());
        })
        
    }
    
    selectDates(startdate, enddate) {
        this.setState({ startDate: startdate, endDate: enddate }, () => {
            this.getTracks(this.formParamsObj())
        });


    }
    public render() {
        return <div>
            <CarSelector cars={this.state.cars} selectCarID={this.selectCarID.bind(this)} />
            <Datepickers selectDates={this.selectDates.bind(this)} />
            <TrackSelector tracks={this.state.tracks} selectTrack={this.selectTrack.bind(this)} />
          </div>

   
    }

   
}
