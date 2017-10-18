import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import dateformat from 'dateformat';
import Cookies from 'universal-cookie';
declare var $: any;
declare var moment: any;
declare var google: any;

interface ChartState {
    deviceIDs: string[];
    cars: Car[];
    tracks: ITrack[];
    selectedTrack: number;
    selectedDeviceID: string;
    selectedCarID: string;
    userID: string;
    startDate: Date;
    endDate: Date;
    showNoGPSDataMessage: boolean,
    showNoIMUDataMessage: boolean,
    showNoOBDDataMessage: boolean,
    showCancelOBDZoomButton: boolean,
    showCancelIMUZoomButton: boolean
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
export class Chart extends React.Component<RouteComponentProps<{}>, ChartState> {
    cookies: Cookies;
    plot: any;
    OBDplot: any;
    IMUplot: any;
    OBDoverview: any;
    IMUoverview: any;
    obdContainer: any;
    obdOverview: any;
    obdChoices: any;
    imuContainer: any;
    imuOverview: any;
    imuChoices: any;
    constructor() {
        super();
        
        this.state = {
            deviceIDs: [],
            cars: [],
            tracks: [],
            selectedTrack: 0,
            userID: "1",
            selectedDeviceID: '',
            selectedCarID: "",
            startDate: new Date(),
            endDate: new Date(),
            showNoGPSDataMessage: false,
            showNoIMUDataMessage: false,
            showNoOBDDataMessage: false, 
            showCancelOBDZoomButton: false,
            showCancelIMUZoomButton: false
        };
        this.selectDeviceID = this.selectDeviceID.bind(this);
        this.selectTrack = this.selectTrack.bind(this);
        this.selectCarID = this.selectCarID.bind(this);
        this.formParamsObj = this.formParamsObj.bind(this);
        this.cancelOBDZoom = this.cancelOBDZoom.bind(this);
        this.cancelIMUZoom = this.cancelIMUZoom.bind(this);
        this.cookies = new Cookies();
        this.buildChart = this.buildChart.bind(this);
    }
    
    componentDidMount() {
        this.getCars();
        this.renderDatetimepicker();
        this.obdContainer = $("#obd-chart");
        this.imuContainer = $("#imu-chart");
        this.obdOverview = $("#obd-overview");
        this.imuOverview = $("#imu-overview");
        this.obdChoices = $("#obd-choices");
        this.imuChoices = $("#imu-choices");
        //this.buildChart();
        //this.initMap();
    }

    transformChartData(datasets) {
        var buf = [];
        datasets.forEach((item, i, arr) => {
            buf.push({
                label: item.label,
                data: formArrays(item.data),
                yaxis: i + 1
            })
           
        })

        function formArrays(objs) {
            var bufArr = [];

            objs.forEach((items, i, arr) => {
                bufArr.push([items.date/1000, items.value]);
            });

            return bufArr;
        }
        //buf.push({ label: "GPS", data: [[1501888954213799, 1], [1501888956752573, 1], [1501889097148538, 1]], yaxis: datasets.length + 2 });

        return buf
    }
 

    buildChart(datasets, container, overviewContainer, choices) {
        
        var newThis = this;
        var choiceContainer = choices;
        $("<div id='tooltip'></div>").css({
            position: "absolute",
            display: "none",
            border: "1px solid #fdd",
            padding: "2px",
            "background-color": "#fee",
            opacity: 0.80
        }).appendTo("body");
       
        if ($(container).children().length !== 0) {
            $.plot(container, []);
        }
        $(choiceContainer).empty();

        var i = 0;
        $.each(datasets, function (key:any, val:any) {
            val.color = i;
            ++i;
        });
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; 
        }
        function renderCheckboxes(datasets, choiceContainer){
           
           $.each(datasets, function (key: any, val: any) {

               var idRND = getRandomInt(0, 100000);
               $(choiceContainer).append("<div class='col-md-3'><input type='checkbox' name='" + key +
                   "' checked='checked' id='id" + idRND + "'></input>" +
                   "<label for='id" + idRND + "'><span></span>"
                   + val.label + "</label></div>");
           });
           $(choiceContainer).find("input").click(plotAccordingToChoices);
        }
       renderCheckboxes(datasets, choiceContainer);
       
        function plotAccordingToChoices() {
            var data: any[] = [];
            var yaxes = [];
            
            $(choiceContainer).find("input:checked").each(function () {
                var key = $(this).attr("name");
                if (key && datasets[key]) {
                    data.push(datasets[key]);
                }
            });
            $.each(data, function (i, e) {
                yaxes.push({
                    position: 'left'
                });
            });
            var position = "left";
            if (data.length > 0) {
                var plot = $.plot($(container), data, {
                    
                    series: {
                        lines: { show: true, zero: true },
                        
                    },
                    xaxis: {
                        mode: "time",
                        tickLength: 5
                   
                    },
                    
                    selection: {
                        mode: "xy"
                    },
                    grid: {
                        hoverable: true,
                        clickable: true
                    },
                    yaxes: yaxes,
                    legend: { position: "nw" }
                });
                var overview = $.plot($(overviewContainer), data, {
                    legend: {
                        show: false
                    },
                    series: {
                        lines: {
                            show: true,
                            lineWidth: 1
                        },
                        shadowSize: 0
                    },
                    xaxis: {
                        ticks: 4,
                        mode: "time"
                    },
                    yaxis: {
                        ticks: [],
                        min: 0,
                        autoscaleMargin: 0.1
                    },
                    selection: {
                        mode: "x"
                    }
                });

                if ($(container).attr('id') === "obd-chart") {
                    newThis.OBDplot = plot;
                    newThis.OBDoverview = overview;
                }
                else {
                    newThis.IMUplot = plot;
                    newThis.IMUoverview = overview;
                }
                $(container).bind("plotclick", function (event, pos, item) {
                    if (item) {
                        console.warn(newThis.toUTCConvert(new Date(pos.x1)));
                        newThis.getSectionMapData(newThis.state.selectedCarID, newThis.toUTCConvert(new Date(pos.x1)));
                    }                   
                });
                $(container).bind("plothover", function (event, pos, item) {
                    if (item) {
                        var datetime = moment.utc(item.datapoint[0]);
                        var x = datetime.format('HH:mm:ss.SSS');
                        var y = item.datapoint[1].toFixed(2);

                        $("#tooltip").html(item.series.label + ": " + x + " = " + y)
                            .css({ top: item.pageY + 5, left: item.pageX + 5 })
                            .fadeIn(200);
                    } else {
                        $("#tooltip").hide();
                    }
                });
                var dateHolder = [];
                $(container).bind("plotselected", function (event, ranges) {
                   
                    // do the zooming
                    $.each(plot.getXAxes(), function (_, axis) {
                        var opts = axis.options;
                        opts.min = ranges.xaxis.from;
                        opts.max = ranges.xaxis.to;

                        $("#selectedFrom").html("<b>Selected start date</b> "+moment(ranges.xaxis.from).format('MMMM Do YYYY, h:mm:ss a'));
                        $("#selectedTo").html("<b>Selected end date</b> " + moment(ranges.xaxis.to).format('MMMM Do YYYY, h:mm:ss a'));


                        if (dateHolder[0] !== ranges.xaxis.from && dateHolder[1] !== ranges.xaxis.to) {
                            dateHolder.push(ranges.xaxis.from, ranges.xaxis.to);
                            
                            newThis.setState({ startDate: new Date(ranges.xaxis.from), endDate: new Date(ranges.xaxis.to) }, () => {
                                var params = newThis.formParamsObj();

                                newThis.getMapData(newThis.formParamsObj())
                            });
                           
                        }
                      
                    });

                    if (plot.getYAxes().length === 1) {
                        $.each(plot.getYAxes(), function (_, axis) {
                            var opts = axis.options;
                            opts.min = ranges.yaxis.from;
                            opts.max = ranges.yaxis.to;
                        });
                    }
                    
                    plot.setupGrid();
                    plot.draw();
                    plot.clearSelection();

                    // don't fire event on the overview to prevent eternal loop
                  
                    overview.setSelection(ranges, true);
                });

                $(overviewContainer).bind("plotselected", function (event, ranges) {
                    if ($(event.target).attr == "obd-overview") {
                        newThis.IMUplot.setSelection(ranges);
                        newThis.OBDplot.setSelection(ranges);
                    }
                    else {
                        newThis.OBDplot.setSelection(ranges);
                        newThis.IMUplot.setSelection(ranges);
                        
                    }
                        
                    
                    
                });
            }
        }
        plotAccordingToChoices();
    }
    selectDeviceID(event: any) {
        this.setState({ selectedDeviceID: event.target.value }, () => {
            this.getTracks(this.formParamsObj());
          
        });
    }
    selectCarID(event: any) {
        this.setState({ selectedCarID: event.target.value }, () => {
            this.getTracks(this.formParamsObj());

        });
    }
    selectTrack(event) {
       
      
        this.setState({ startDate: this.state.tracks[event.target.value].start, endDate: this.state.tracks[event.target.value].end, selectedTrack: event.target.value }, () => {
            var p = this.formParamsObj();
            console.warn(p);
            this.getData(p);

        });
    }
    cancelOBDZoom() {
        this.buildChart(this.OBDplot.getData(), this.obdContainer, this.obdOverview, this.obdChoices);

    }
    cancelIMUZoom() {
        this.buildChart(this.IMUplot.getData(), this.imuContainer, this.imuOverview, this.imuChoices);

    }


    getCars() {
        var newThis = this;
        axios.get('/api/chart/GetUserCars/' + this.state.userID).then((res) => {
            newThis.setState({ cars: res.data, selectedCarID: res.data[0].id }, () => {
                newThis.getTracks(newThis.formParamsObj());
            })
        });
    }
    yesterdayGenerator() {
        var today = new Date();
        var yesterday = new Date(today);
        return yesterday.setDate(today.getDate() - 1);
    }
    toUTCConvert(date:Date) {
        return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    }
    renderDatetimepicker() {
        let newthis = this;
        var yesterday = new Date(newthis.yesterdayGenerator());
        var now = new Date();
        var utc = newthis.toUTCConvert(now)
        var yutc = newthis.toUTCConvert(yesterday)
        this.setState({ startDate: yutc, endDate: utc });
        $(function () {

            $('#datetimepicker6').datetimepicker({ defaultDate: yutc });
            $('#datetimepicker7').datetimepicker({
                defaultDate: utc,
                useCurrent: false 
            });
            $("#datetimepicker6").on("dp.change", function (e) {
            $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
            newthis.setState({ startDate: e.date._d, endDate: $('#datetimepicker7').data("DateTimePicker").date()._d }, () => {
                console.warn(e.date._d)
                    var params = newthis.formParamsObj();
                    newthis.getTracks(params);
                });
                
            });
            $("#datetimepicker7").on("dp.change", function (e) {
                $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
                newthis.setState({ endDate: e.date._d, startDate: $('#datetimepicker6').data("DateTimePicker").date()._d  }, () => {
                        var params = newthis.formParamsObj();
                        newthis.getTracks(params);
                });
                
            });
        });
    }
    formParamsObj() {
        let params = new RequestParams();
        params.startDate = this.state.startDate;
        params.endDate = this.state.endDate;
        params.id = this.state.selectedCarID;
        console.log(params)
        return params;

    }
    getOBDChartData(requestParams?: RequestParams) {
        var jwtToken = this.cookies.get('JWT-Cookie');
        let newThis = this;
        $("#selectedFrom, #selectedTo").text("");
        axios.get('/api/chart/GetOBDChartData/' + requestParams.id, { params: requestParams, headers: { "Authorization": "Bearer " + jwtToken } }).then((res) => {
            $(newThis.obdContainer).empty();
            $(newThis.obdOverview).empty();
            if (res.data.length !== 0) {
                this.setState({ showNoOBDDataMessage: false, showCancelOBDZoomButton: true })
           
                newThis.buildChart(newThis.transformChartData(res.data), newThis.obdContainer, newThis.obdOverview, newThis.obdChoices);
            }
            else {
                this.setState({ showNoOBDDataMessage: true, showCancelOBDZoomButton: false })
                $(newThis.obdChoices).empty();
            }

        });
    }
    getIMUChartData(requestParams?: RequestParams) {
        var jwtToken = this.cookies.get('JWT-Cookie');
        let newThis = this;
        $("#selectedFrom, #selectedTo").text("");
        axios.get('/api/chart/GetIMUChartData/' + requestParams.id, { params: requestParams, headers: { "Authorization": "Bearer " + jwtToken } }).then((res) => {
            $(newThis.imuOverview).empty();
            $(newThis.imuContainer).empty();
            if (res.data.length !== 0) {
                this.setState({ showNoIMUDataMessage: false, showCancelIMUZoomButton: true })
                console.log(res.data)
                newThis.buildChart(newThis.transformChartData(res.data), newThis.imuContainer, newThis.imuOverview, newThis.imuChoices);
            }
            else {
                this.setState({ showNoIMUDataMessage: true, showCancelIMUZoomButton: false })
                $(newThis.imuChoices).empty();
            }

        });
    }
    
    getMapData(requestParams?: RequestParams) {
        let newThis = this;
        axios.get('/api/map/GetDirectionCoords/' + requestParams.id, { params: requestParams }).then((res) => {
            if (res.data.length !== 0) {
                newThis.initMap(res.data);
                this.setState({ showNoGPSDataMessage: false});
            } else {
                this.setState({ showNoGPSDataMessage: true});
                $("#map_canvas").empty();
            }
        });
    }

    getSecondMapData(requestParams?: RequestParams) {
        let newThis = this;
        axios.get('/api/map/getallcoords/' + requestParams.id, { params: requestParams }).then((res) => {
            if (res.data.length !== 0) {
                newThis.initSecondMap(res.data);
                this.setState({ showNoGPSDataMessage: false });
            } else {
                this.setState({ showNoGPSDataMessage: true });
                $("#map").empty();
            }
        });
    }

    getSectionMapData(id:any, selectedDate:any) {
        let newThis = this;
        axios.get('/api/map/getsectioncoords/' + id, { params: { date: selectedDate } }).then((res) => {
            if (res.data.length !== 0) {
                newThis.initMap(res.data);
                newThis.initSecondMap(res.data);
                console.log("result");
                console.log(res.data);
                newThis.setState({ showNoGPSDataMessage: false });
            } else {
                newThis.setState({ showNoGPSDataMessage: true });
                $("#map_canvas").empty();
                $("#map").empty();
            }
        });
    }


    getData(requestParams?: RequestParams) {
        this.getOBDChartData(requestParams);
        this.getIMUChartData(requestParams);
        this.getMapData(requestParams);
        this.getSecondMapData(requestParams);
    }
    getTracks(requestParams?: RequestParams) {
        var jwtToken = this.cookies.get('JWT-Cookie');
        let newThis = this;
        axios.get('/api/chart/GetTracks/' + requestParams.id, { params: requestParams, headers: { "Authorization": "Bearer " + jwtToken } }).then((res) => {
            
            var buf = [];
            
            for (var i = 0; i < res.data.length; i++) {
                buf.push(new Track(newThis.toUTCConvert(new Date(res.data[i].start * 1000)), newThis.toUTCConvert(new Date(res.data[i].end * 1000))))
            }
            newThis.setState({ tracks: buf, selectedTrack: buf[0], startDate: newThis.toUTCConvert(new Date(res.data[0].start * 1000)), endDate: newThis.toUTCConvert(new Date(res.data[0].end * 1000)) }, () => {
                newThis.getData(newThis.formParamsObj());
            });
        });
    }

    //second map
    initSecondMap(coords) {
        var overlay;
        USGSOverlay.prototype = new google.maps.OverlayView();

        function initsMap() {
            var map = new google.maps.Map(document.getElementById("map"),
                {
                    zoom: 15,
                    center: new google.maps.LatLng(49.236011, 28.419528)
                });
            setMarkers(map);
        }

        var beaches = coords;
        console.warn(beaches);

        function setMarkers(map) {
            var image = {
                url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                size: new google.maps.Size(20, 32),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 32)
            };
            
            var shape = {
                coords: [1, 1, 1, 20, 18, 20, 18, 1],
                type: "poly"
            };

            for (var i = 0; i < beaches.length; i++) {
                var beach = beaches[i];
                var marker = new google.maps.Marker({
                    position: { lat: beach.lat, lng: beach.lng},
                    map: map,
                    icon: image,
                    shape: shape,
                    title: "i",
                    zIndex: i
                });
            }
        }

        /** @constructor */
        function USGSOverlay(bounds, image, map) {
            this.bounds_ = bounds;
            this.image_ = image;
            this.map_ = map;
            this.div_ = null;
            this.setMap(map);
        }

        USGSOverlay.prototype.onAdd = function () {
            var div = document.createElement('div');
            div.style.borderStyle = 'none';
            div.style.borderWidth = '0px';
            div.style.position = 'absolute';

            var img = document.createElement("img");
            img.src = this.image_;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.position = 'absolute';
            div.appendChild(img);

            this.div_ = div;
            var panes = this.getPanes();
            panes.overlayLayer.appendChild(div);
        };

        USGSOverlay.prototype.draw = function () {
            var overlayProjection = this.getProjection();
            var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
            var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

            var div = this.div_;
            div.style.left = sw.x + 'px';
            div.style.top = ne.y + 'px';
            div.style.width = (ne.x - sw.x) + 'px';
            div.style.height = (sw.y - ne.y) + 'px';
        };

        USGSOverlay.prototype.onRemove = function () {
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
        };

        initsMap();
    }


    initMap(coords) {
        function gDirRequest(service, waypoints, userFunction, waypointIndex, path) {

            let s: Array<any>;
            // set defaults
            waypointIndex = typeof waypointIndex !== 'undefined' ? waypointIndex : 0;
            path = typeof path !== 'undefined' ? path : [];

            // get next set of waypoints
            s = gDirGetNextSet(waypoints, waypointIndex);

            // build request object
            var startl = s[0].shift()["location"];
            var endl = s[0].pop(); //fix bug(Uncaught type error cannot read property location of undefined)
            var request = {
                origin: startl,
                destination: endl,
                waypoints: s[0],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                optimizeWaypoints: false,
                provideRouteAlternatives: false,
                avoidHighways: false,
                avoidTolls: false
            };
            console.log(request);

            service.route(request, function (response, status) {

                if (status == google.maps.DirectionsStatus.OK) {

                    path = path.concat(response.routes[0].overview_path);

                    if (s[1] != null) {
                        gDirRequest(service, waypoints, userFunction, s[1], path)
                    } else {
                        userFunction(path);
                    }

                } else {
                    console.log(status);
                }

            });
        }


        function gDirGetNextSet(waypoints, startIndex) {
            var MAX_WAYPOINTS_PER_REQUEST = 8;

            var w = [];    // array of waypoints to return

            if (startIndex > waypoints.length - 1) { return [w, null]; } // no more waypoints to process

            var endIndex = startIndex + MAX_WAYPOINTS_PER_REQUEST;

            // adjust waypoints, because Google allows us to include the start and destination latlongs for free!
            endIndex += 2;

            if (endIndex > waypoints.length - 1) { endIndex = waypoints.length; }

            // get the latlongs
            for (var i = startIndex; i < endIndex; i++) {
                w.push(waypoints[i]);
            }

            if (endIndex != waypoints.length) {
                return [w, endIndex -= 1];
            } else {
                return [w, null];
            }
        }

        function main() {

            // initalise directions service
            var directionsService = new google.maps.DirectionsService();
            var travelWaypoints = [];

            for (var i = 0; i < coords.length; i++) {
                travelWaypoints.push({ location: new google.maps.LatLng(coords[i].lat, coords[i].lng) });
            }
            //console.log(travelWaypoints);
            
            // get directions and draw on map
            gDirRequest(directionsService, travelWaypoints, function drawGDirLine(path) {
                var line = new google.maps.Polyline({
                    clickable: false, map: map, path: path, strokeOpacity: 0.4,
                    strokeWeight: 5, strokeColor: "#0000FF" });
            }, undefined, undefined);
        }

        var map;
        function initialize() {
            var myOptions = {
                zoom: 17,
                center: new google.maps.LatLng(coords[0].lat, coords[0].lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

            google.maps.event.addListenerOnce(map, 'idle', function () {
                main();
            });
        }
        initialize();
       // google.maps.event.addDomListener(window, 'load', initialize);
    }
    transformChartResponse(data) {
        var buf = {};
        data.forEach((item, i, arr) => {

            buf[item.label] = {
                label: item.label,
                data: formArrays(item.data),
                yaxis: i+1
            };
        })
        
        function formArrays(objs) {
            var bufArr = [];
           
            objs.forEach((items, i, arr) => {
                bufArr.push([items.date/1000000, items.value]);
            });
       
            return bufArr;
        }
        buf["GPS"] = { label: "GPS", data: [[1501888954213799, 1], [1501888956752573, 1], [1501889097148538, 1]], yaxis:data.length + 2 };
        return buf
    }
    public render() {
       
        return <div>
            <div className="container-fluid">
                <div className="row">
                    <div className='col-md-3'>
                        <label>Select car</label>
                    <select name="" id="" className="form-control" value={this.state.selectedCarID}
                        onChange={this.selectCarID}>
                        {
                                this.state.cars.map((car, index) => {
                                    return <option value={car.id} key={index}>{car.name}</option>
                            })
                        }
                    </select>    
                </div>
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
                {
                    this.state.tracks.length > 0
                    &&

                    <div className='col-md-3'>
                        <label>Select track</label>
                        <select name="" id="" className="form-control" value={this.state.selectedTrack}
                            onChange={this.selectTrack}>
                            {
                                this.state.tracks.map((track, index) => {
                                    return <option value={index} key={index}>{moment(track.start).format('MMMM Do YYYY, h:mm:ss a') + "-" + moment(track.end).format('MMMM Do YYYY, h:mm:ss a')}</option>
                                })
                            }
                        </select>
                    </div>
                }
                </div>
                
                
                </div>
            
            <div className="container-fluid">
                
                {
                    this.state.showNoOBDDataMessage && <div className="bg-primary">No OBD data for this device and time range</div>
                }
                {
                    this.state.showNoGPSDataMessage && <div className="bg-primary">No GPS data for this device and time range</div>
                }
               
                {
                    this.state.showNoIMUDataMessage && <div className="bg-primary">No IMU data for this device and time range</div>
                }
                <div className="row">
                    <div id="selectedFrom" className="col-md-3"></div>
                    <div id="selectedTo" className="col-md-3"></div>
                </div>


                <div id="obd-chart" className="chart-holder" style={{ height: "600px", width: "100%" }}></div>
                <div className="zoomBlockHolder">

                    <div id="obd-overview" style={{ height: "100px", width: "100%" }}> </div>
                    {
                        this.state.showCancelOBDZoomButton && <button type="button" onClick={this.cancelOBDZoom} className="btn btn-primary">Cancel zoom</button>
                    }
                </div>
                <div id="obd-choices" className="choices row"></div>

                <div id="imuData-chart" className="chart-holder" style={{ height: "600px", width: "100%" }}></div>
                <div className="zoomBlockHolder">

                    <div id="imuData-overview" style={{ height: "100px", width: "100%" }}> </div>
                    {
                        this.state.showCancelIMUZoomButton && <button type="button" onClick={this.cancelIMUZoom} className="btn btn-primary">Cancel zoom</button>
                    }
                </div>

                
               <div id="imuData-choices" className="choices row"></div>
               
               <div id="map_canvas"></div>

                <div id="map"></div>

                <div id="directions_panel"></div>
            </div>
        </div>
    }
}

