// import React, {useEffect, useState} from 'react';
// import Highcharts from 'highcharts/highstock';
// import HighchartsReact from 'highcharts-react-official';



/* global Highcharts */
/*
import React from 'react';
import { useState, useEffect } from 'react';

const Charts_OHLC_Vol_SMA = ( props) => {
    // States
    const [result, setResult] = useState(props.charts.results);
    const [ticker, setTicker] = useState(props.charts.ticker);
    const [volume, setVolume] = useState(result.map((item) => { return [item.t, item.v]}));
    const [ohlc, setOHLC] = useState(result.map((item) =>{return [item.t, item.o, item.h, item.l, item.c]}));

    const groupingUnits = [[
        'week',                         // unit name
        [1]                             // allowed multiples
    ], [
        'month',
        [1, 2, 3, 4, 6]
    ]];

    useEffect(() => {
        setResult(props.charts.results);
        setTicker(props.charts.ticker);
        setVolume(result.map((item) => { return [item.t, item.v]}));
        setOHLC(result.map((item) =>{return [item.t, item.o, item.h, item.l, item.c]}));
        Highcharts.stockChart('high-charts-vol-sma', {
            chart: {
                backgroundColor: '#f2f2f2',
            },
            rangeSelector: {
                selected: 2,
                buttons: [
                    {
                        type: 'month',
                        count: 1,
                        text: '1M',
                        dataGrouping: {
                            forced: true,
                            units: [['day', [1]]],
                        },
                    },
                    {
                        type: 'month',
                        count: 3,
                        text: '3M',
                        dataGrouping: {
                            forced: true,
                            units: [['day', [1]]],
                        },
                    },
                    {
                        type: 'month',
                        count: 6,
                        text: '6M',
                        dataGrouping: {
                            forced: true,
                            units: [['day', [1]]],
                        },
                    },
                    {
                        type: 'ytd',
                        text: 'YTD',
                    },
                    {
                        type: 'year',
                        count: 1,
                        text: '1Y',
                        dataGrouping: {
                            forced: true,
                            units: [['day', [1]]],
                        },
                    },
                    {
                        type: 'all',
                        text: 'All',
                        dataGrouping: {
                            forced: true,
                            units: [['day', [1]]],
                        },
                    },
                ],

            },

            title: {
                text: ticker +" "+"Historical"
            },
            subtitle: {
                text: "With SMA and Volume by Price Technical Indicators"
            },
            tooltip: {
                split: true
            },
            yAxis: [
                {
                    title: {
                        text: 'OHLC'
                    },
                    height: '60%',
                    lineWidth: 2,
                    tickAmount: 7,
                    startOnTick: false,
                    endOnTick: false,
                    labels: {
                        align: 'right',
                        x: -3,
                    },
                },
                {
                    title: {
                        text: 'Volume'
                    },
                    top: '70%',
                    height: '30%',
                    offset: 0,
                    lineWidth: 2,
                    tickAmount: 4,
                    labels: {
                        align: 'right',
                        x: -3
                    },
                }
            ],
            plotOptions: {
                series: {
                    dataGrouping: {
                        units: groupingUnits
                    }
                }
            },
            series: [
                {
                    type: 'candlestick',
                    name: ticker,
                    id: 'mapping-id',
                    zIndex: 2,
                    data: ohlc
                },
                {
                    type: 'column',
                    name: 'Volume',
                    id: 'volume',
                    data: volume,
                    yAxis: 1
                },
                {
                    type: 'vbp',
                    linkedTo: 'mapping-id',
                    params: {
                        volumeSeriesID: 'volume'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    zoneLines: {
                        enabled: false
                    }
                },
                {
                    type: 'sma',
                    linkedTo: 'mapping-id',
                    marker: {
                        enabled: false
                    },
                    zIndex: 1,
                }
            ]
        });
    }, [props.charts.results]);

    return (
        <div className={'d-flex col-12 justify-content-center'} style={{height: "70vh"}}>
            <div id="high-charts-vol-sma" className='d-flex col-lg-12 col-11' style={{height:"70vh"}}>
            </div>
        </div>

    );
}

export default Charts_OHLC_Vol_SMA;

 */


import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

require('highcharts/indicators/indicators')(Highcharts);
require('highcharts/indicators/volume-by-price')(Highcharts);

const Charts_OHLC_Vol_SMA = (props) => {

    // States
    const [results, setResults] = useState(props.charts.results);
    const [ticker, setTicker] = useState(props.charts.ticker);
    const [volumeData, setVolumeData] = useState([]);
    const [ohlc, setOHLC] = useState([]);
    const [zoomValue, setZoomValue] = useState(0);

    useEffect(() => {
        setVolumeData(results.map(item => [item.t, item.v]));
        setOHLC(results.map(item => [item.t, item.o, item.h, item.l, item.c]));
    }, []);

    const options = {
        chart: {
            type: 'stock',
            verticalAlign: 'top',
            backgroundColor: '#f2f2f2'
        },
        plotOptions: {
            series: {
                dataGrouping: {
                    units: [['week', [1]], ['month', [1, 2, 3, 4, 6]]],
                },
            },
        },
        rangeSelector: {
            selected: 2,
            buttons: [
                {
                    type: 'month',
                    count: 1,
                    text: '1m',
                    dataGrouping: {
                        forced: true,
                        units: [['day', [1]]],
                    },
                    events: {
                        click: () => setZoomValue(0),
                    },
                },
                {
                    type: 'month',
                    count: 3,
                    text: '3m',
                    dataGrouping: {
                        forced: true,
                        units: [['day', [1]]],
                    },
                    events: {
                        click: () => setZoomValue(1),
                    },
                },
                {
                    type: 'month',
                    count: 6,
                    text: '6m',
                    dataGrouping: {
                        forced: true,
                        units: [['day', [1]]],
                    },
                    events: {
                        click: () => setZoomValue(2),
                    },
                },
                {
                    type: 'ytd',
                    text: 'YTD',
                    events: {
                        click: () => setZoomValue(3),
                    },
                },
                {
                    type: 'year',
                    count: 1,
                    text: '1y',
                    dataGrouping: {
                        forced: true,
                        units: [['day', [1]]],
                    },
                    events: {
                        click: () => setZoomValue(4),
                    },
                },
                {
                    type: 'all',
                    text: 'All',
                    dataGrouping: {
                        forced: true,
                        units: [['day', [1]]],
                    },
                    events: {
                        click: () => setZoomValue(5),
                    },
                },
            ],

        },
        title: {
            text: ticker +' Historical',
        },

        subtitle: {
            text: 'With SMA and Volume by Price technical indicators'
        },
        xAxis: {
            type: 'datetime',
        },
        yAxis: [
            {
                startOnTick: false,
                endOnTick: false,
                labels: {
                    align: 'right',
                    x: -3,
                    formatter: function () {
                        if (this.isFirst || this.isLast) {
                            return '';
                        }
                        return this.value;
                    },
                },

                title: {
                    text: 'OHLC',
                },
                height: '60%',
                lineWidth: 2,
                tickAmount: 7,
                resize: {
                    enabled: true,
                },
            },
            {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume',
                },
                top: '70%',
                height: '30%',
                offset: 0,
                lineWidth: 2,
                tickAmount: 4,
            },
        ],
        tooltip: {
            split: true
        },
        series: [
            {
                type: 'candlestick',
                name: ticker,
                id: 'mapping-id',
                zIndex: 4,
                data: ohlc
            },
            {
                type: 'column',
                name: 'Volume',
                id: 'volume',
                data: volumeData,
                yAxis: 1
            },
            {
                type: 'vbp',
                linkedTo: 'mapping-id',
                params: {
                    volumeSeriesID: 'volume'
                },
                dataLabels: {
                    enabled: false
                },
                zoneLines: {
                    enabled: false
                }
            },
            {
                type: 'sma',
                linkedTo: 'mapping-id',
                zIndex: 1,
                marker: {
                    enabled: false
                }
            }
        ],

    };

    return (
        <div className='d-flex col-lg-12 col-11' style={{ height: '80vh' }} >
            <HighchartsReact constructorType={"stockChart"} highcharts={Highcharts} options={options} containerProps={{ style: { height: "100%", width: "100%" } }}/>
        </div>
    );
};

export default Charts_OHLC_Vol_SMA;

