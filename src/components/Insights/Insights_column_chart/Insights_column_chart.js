import React, {useEffect, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const Insights_column_chart = (props) => {
    const [ticker, setTicker] = useState(props.ticker);
    const [recommendations, setRecommendations] = useState([]);


    const options = {
        chart: {
            type: 'column',
            backgroundColor: "#f8f4f4"
        },
        title: {
            text: 'Recommendation Trends',
            align: 'center'
        },
        xAxis: {
            categories: recommendations.map(item => item.period)
        },
        yAxis: {
            min: 0,
            title: {
                text: '#Analysis'
            },
            stackLabels: {
                enabled: true
            }
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Strong Buy',
            data: recommendations.map(item => item.strongBuy),
            color: "#146b34",
        }, {
            name: 'Buy',
            data: recommendations.map(item => item.buy),
            color: "#1cba53",
        }, {
            name: 'Hold',
            data: recommendations.map(item => item.hold),
            color: "#b98a1d",
        },{
            name: 'Sell',
            data: recommendations.map(item => item.sell),
            color: "#f45b5a",
        },{
            name: 'Strong Sell',
            data: recommendations.map(item => item.strongSell),
            color: "#813131",
        }]
    };

    useEffect(() => {
        setTicker(props.ticker);
        fetchColumnChart();
    }, [props.ticker]);

    const fetchColumnChart = () => {
        fetch(`https://stock-web-app-node-backend.vercel.app/company/recommendations/${ticker}`)
            .then( res => res.json())
            .then( data => {
                const mappedData = data.map(item => ({
                    ticker: item.ticker,
                    strongBuy: item.strongBuy,
                    buy: item.buy,
                    hold: item.hold,
                    sell: item.sell,
                    strongSell: item.strongSell,
                    period: item.period
                }));
                setRecommendations(mappedData);
            }).catch(err => {
            console.log("Recommendation error, ", err);
        });
    }

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
};

export default Insights_column_chart;
