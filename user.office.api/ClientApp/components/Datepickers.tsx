import * as React from 'react';
import { RouteComponentProps } from 'react-router';
declare var $: any;

interface DatepickersState {
    cars: Car[];
    selectedCarID: number;
}
interface DatepickersProps {
    selectDates(startDate, endDate): void;
}
class Car {
    id: number;
    name: string;
}

export class Datepickers extends React.Component<DatepickersProps, DatepickersState> {
    constructor(props) {
        super(props);
        this.state = { cars: [], selectedCarID:0  };
       
    }
    componentDidMount() {
        this.renderDatetimepicker();
    }
    
   
    yesterdayGenerator() {
        var today = new Date();
        var yesterday = new Date(today);
        return yesterday.setDate(today.getDate() - 1);
    }
    toUTCConvert(date: Date) {
        return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    }
    renderDatetimepicker() {
        let newthis = this;
        var yesterday = new Date(newthis.yesterdayGenerator());
        var now = new Date();
        var utc = newthis.toUTCConvert(now)
        var yutc = newthis.toUTCConvert(yesterday)
       // this.setState({ startDate: yutc, endDate: utc });
        $(function () {

            $('#datetimepicker6').datetimepicker({ defaultDate: yutc });
            $('#datetimepicker7').datetimepicker({
                defaultDate: utc,
                useCurrent: false
            });
            $("#datetimepicker6").on("dp.change", function (e) {
                $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
               /* newthis.setState({ startDate: e.date._d, endDate: $('#datetimepicker7').data("DateTimePicker").date()._d }, () => {
                    
                    
                    
                });*/
               newthis.props.selectDates(e.date._d, $('#datetimepicker7').data("DateTimePicker").date()._d);

            });
            $("#datetimepicker7").on("dp.change", function (e) {
                $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
               /* newthis.setState({ endDate: e.date._d, startDate: $('#datetimepicker6').data("DateTimePicker").date()._d }, () => {
                   
                });*/
                newthis.props.selectDates($('#datetimepicker6').data("DateTimePicker").date()._d, e.date._d);
            });
        });
    }

    public render() {
        return <div className='col-md-6'>
            <div className='row'>
            <div className='col-md-3'>
                <div className="form-group">
                    <label>Select start date</label>
                    <div className='input-group date' id='datetimepicker6'>
                        <input type='text' className="form-control" />
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className="form-group">
                    <label>Select end date</label>
                    <div className='input-group date' id='datetimepicker7'>
                        <input type='text' className="form-control" />
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
            </div>
            </div> 
          </div>
            ;
    }

   
}
