import React, {useEffect, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';


const Insights_spline_chart = (props) => {
    const [ticker, setTicker] = useState(props.ticker);
    const [spline, setSpline] = useState(props.spline)
    // useEffect(() => {
    //     fetchSplineData();
    // }, [props.ticker]);
    // const fetchSplineData = () => {
    //     fetch(`https://assignment-3-backend-418623.uc.r.appspot.com/company/earnings/${ticker}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setSpline(data);
    //         }).catch(err => {
    //        console.log("Earnings Data error", err);
    //     });
    // }
    const options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Historical EPS Surprises'
        },
        xAxis: {
            categories: spline.map(item => `<span>${item.period.substring(0, 10)}</span><br/><span>Surprise: ${item.surprise}</span>`)
        },
        yAxis: {
            title: {
                text: 'Quarterly EPS'
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: 'Actual',
            marker: {
                symbol: 'circle',
            },
            data: spline.map(item => item.actual)
        }, {
            name: 'Estimate',
            marker: {
                symbol: 'diamond'
            },
            data: spline.map(item => item.estimate)
        }]
    };

    return (
        spline.length !== 0 &&
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
};

export default Insights_spline_chart;
