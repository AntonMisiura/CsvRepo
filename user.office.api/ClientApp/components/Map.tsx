import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
declare var google: any;
declare var $: any;
import { ChartRequestParams as RequestParams } from '../Models/ChartRequestParams'
export class Map extends React.Component<RouteComponentProps<{}>, {}> {
    constructor() {
        super();
        this.state = { forecasts: [], loading: true };
    }
    componentDidMount() {

    }

    getMapData(requestParams?: RequestParams) {
        let newThis = this;


        axios.get('/api/map/GetDirectionCoords/' + requestParams.id, { params: requestParams }).then((res) => {
            if (res.data.length !== 0) {
                newThis.initMap(res.data);
                console.log("result");
                console.log(res.data);
                this.setState({ showNoGPSDataMessage: false })
            } else {
                this.setState({ showNoGPSDataMessage: true })
                $("#map").empty();
            }

        });
    }
    getSectionMapData(id: any, selectedDate: any) {
        let newThis = this;
        axios.get('/api/map/getsectioncoords/' + id, { params: { date: selectedDate } }).then((res) => {
            if (res.data.length !== 0) {
                newThis.initMap(res.data);
                console.log("result");
                console.log(res.data);
                newThis.setState({ showNoGPSDataMessage: false })
            } else {
                newThis.setState({ showNoGPSDataMessage: true })
                $("#map").empty();
            }
        });
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
            var endl = s[0].pop()["location"];
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


        /*
        *    Return an array containing:
        *    1) the next set of waypoints to send to Google, given the start index, and 
        *    2) then next waypoint to start from after this set, or null if there is no more.
        *
        *    @param {google.maps.DirectionsService} service
        *    @param {array} waypoints
        *    @returns {array}
        */
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
                    strokeWeight: 4, strokeColor: "#0000FF"
                });
            }, undefined, undefined);
        }

        var map;
        var midllecoord = coords.length / 2;
        function initialize() {
            var myOptions = {
                zoom: 13,
                center: new google.maps.LatLng(coords[midllecoord].lat, coords[midllecoord].lng),
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



    public render() {
        return <div>
            <div id="map_canvas" style={{ height: "300px", width: "100%" }}></div>
            <div id="directions_panel"></div>
        </div>
    }

}


