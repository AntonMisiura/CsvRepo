import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
interface CarSelectorState {
    cars: Car[];
    selectedCarID: string;
}
interface CarSelectorProps {
    cars: Car[];
    selectCarID(carID: any):void;
}
class Car {
    id: number;
    name: string;
}

export class CarSelector extends React.Component<CarSelectorProps, CarSelectorState> {
    constructor(props) {
        super(props);
        this.state = { cars: [], selectedCarID:''  };
        this.selectCarID = this.selectCarID.bind(this);
    }
    
    selectCarID(event: any) {
        var id = event.target.value;
        this.setState({ selectedCarID: id }, () => {
            this.props.selectCarID(id);

        });
    }
    public render() {
        return <div>
           
                    <label>Select car</label>
                    <select name="" id="" className="form-control" value={this.state.selectedCarID}
                        onChange={this.selectCarID}>
                        {
                            this.props.cars.map((car, index) => {
                                return <option value={car.id} key={index}>{car.name}</option>
                            })
                        }
                    </select>
                </div>
            ;
    }

   
}
