import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
declare var moment: any;
declare var $: any;
interface ChartHolderState {
    tracks: any;
    selectedTrack: any;

}
interface ChartHolderProps {
    tracks: any;
    selectTrack(carID: any):void;
}
//class Car {
//    id: number;
//    name: string;
//}

export class ChartHolder extends React.Component<ChartHolderProps, ChartHolderState> {
    OBDplot: any;
    IMUplot: any;
    OBDoverview: any;
    IMUoverview: any;
    constructor(props) {
        super(props);
        this.state = { tracks: [], selectedTrack:''  };
        
    }
    transformChartResponse(data) {
        var buf = {};
        data.forEach((item, i, arr) => {

            buf[item.label] = {
                label: item.label,
                data: formArrays(item.data),
                yaxis: i + 1
            };
        })

        function formArrays(objs) {
            var bufArr = [];

            objs.forEach((items, i, arr) => {
                bufArr.push([items.date / 1000000, items.value]);
            });

            return bufArr;
        }
       
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
        $.each(datasets, function (key: any, val: any) {
            val.color = i;
            ++i;
        });
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        function renderCheckboxes(datasets, choiceContainer) {

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

                        $("#selectedFrom").html("<b>Selected start date</b> " + moment(ranges.xaxis.from).format('MMMM Do YYYY, h:mm:ss a'));
                        $("#selectedTo").html("<b>Selected end date</b> " + moment(ranges.xaxis.to).format('MMMM Do YYYY, h:mm:ss a'));


                        if (dateHolder[0] !== ranges.xaxis.from && dateHolder[1] !== ranges.xaxis.to) {
                            dateHolder.push(ranges.xaxis.from, ranges.xaxis.to);
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

    public render() {
        return <div>
            <div id="obd-chart" className="chart-holder" style={{ height: "600px", width: "100%" }}></div>

                </div>
            ;
    }

   
}
