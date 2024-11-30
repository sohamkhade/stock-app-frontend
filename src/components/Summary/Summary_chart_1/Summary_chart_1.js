import React, {useEffect, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const Summary_chart_1 = (props) => {
    const [ticker, setTicker] = useState(props.ticker);
    const [charts, setCharts] = useState(props.summaryChart);
    const [market_status, setMarket_status] = useState(props.market_status);
    // useEffect(() => {
    //     fetch(`https://assignment-3-backend-418623.uc.r.appspot.com/summary/charts/${ticker}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             const arr = data.results;
    //             const data_time_curr = arr.map(item => [item.t, item.c]);
    //             // setCharts(data_time_curr.slice(0, 24));
    //             setCharts(data_time_curr.slice(-24));
    //             console.log("Summary Charts Data", charts);
    //             setMarket_status(props.market_status);
    //         }).catch(err => {
    //             console.log("Fetching summary charts data getting error", err);
    //     });
    // }, []);

    const options = {
        title: {
            text: `${ticker.toUpperCase()} Hourly Price Validation`
        },
        xAxis: {
            type: 'datetime', // Set the type to datetime
            showInLegend: false,
            scrollbar: {
                enabled: true
            },
            dateTimeLabelFormats: {
                hour: '%H:%M'
            },
            tickInterval: 6 * 3600 * 1000 // Set tick interval to 6 hours
        },
        yAxis: {
            title: {
                text: ''
            },
            showInLegend: false,
            opposite: true
        },
        chart: {
            backgroundColor: '#f2f2f2'
        },
        series: [
            {
                data: charts.map(item => [new Date(item[0]).getTime(), item[1]]), // Convert timestamp to milliseconds
                showInLegend: false,
                marker: {
                    enabled: false // Disable markers (dots)
                },
                color: market_status === 'open' ? 'green' : 'red'
            }
        ]
    };


    return (<div className={'col-11'}>
            <HighchartsReact highcharts={Highcharts} options={options}/>
        </div>
    );
};

export default Summary_chart_1;
