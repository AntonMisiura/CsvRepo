import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
declare var moment: any;
interface TrackSelectorState {
    tracks: any;
    selectedTrack: any;

}
interface TrackSelectorProps {
    tracks: any;
    selectTrack(carID: any):void;
}
//class Car {
//    id: number;
//    name: string;
//}

export class TrackSelector extends React.Component<TrackSelectorProps, TrackSelectorState> {
    constructor(props) {
        super(props);
        this.state = { tracks: [], selectedTrack:''  };
        this.selectTrack = this.selectTrack.bind(this);
    }
    
    selectTrack(event: any) {
        var id = event.target.value;
        this.setState({ selectedTrack: id }, () => {
            this.props.selectTrack(id);

        });
    }
    public render() {
        return <div>
           
            <label>Select track</label>
            <select name="" id="" className="form-control" value={this.state.selectedTrack}
                onChange={this.selectTrack}>
                {
                    this.props.tracks.map((track, index) => {
                        return <option value={index} key={index}>{moment(track.start).format('MMMM Do YYYY, h:mm:ss a') + "-" + moment(track.end).format('MMMM Do YYYY, h:mm:ss a')}</option>
                    })
                }
            </select>
                </div>
            ;
    }

   
}
