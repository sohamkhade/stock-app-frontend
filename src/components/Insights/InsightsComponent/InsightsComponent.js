import React, {useEffect, useState} from 'react';
import Insights_column_chart from "../Insights_column_chart/Insights_column_chart";
import Insights_spline_chart from "../Insights_spline_chart/Insights_spline_chart";

function InsightsComponent(props) {
    const [insights, setInsights] = useState(props.insights);
    const [ticker, setTicker] = useState(props.ticker);
    const [spline, setSpline] = useState(props.spline);
    const [companyName, setCompanyName] = useState(props.companyName);
    useEffect(() => {
        setInsights(props.insights);
        setTicker(props.ticker);
    }, [props.insights, [props.ticker]]);
    useEffect(() => {
        setCompanyName(props.companyName);
    }, [props.companyName]);
    return (
        <div className={'d-flex flex-column col-12 '}>
            {
                insights && (
                    <div className={'d-flex flex-column justify-content-center align-items-center mt-3'}>
                        <p className={'fs-3 fw-medium'}>Insider Sentiments</p>
                        <table className={'col-lg-6 col-10 text-center border-bottom border-black border-opacity-10'}>
                            <tr className={'border-bottom border-black border-opacity-10 '}>
                                <th className={'pb-1'}>{companyName}</th>
                                <th className={'pb-1'}>MSPR</th>
                                <th className={'pb-1'}>Change</th>
                            </tr>
                            <tr className={'border-bottom border-black border-opacity-10'}>
                                <td className={'fw-bold'}>Total</td>
                                <td className={'pb-1'}>{insights.totalMSPR}</td>
                                <td className={'pb-1'}>{insights.totalChange}</td>
                            </tr>
                            <tr className={'border-bottom border-black border-opacity-10'}>
                                <td className={'fw-bold'}>Positive</td>
                                <td className={'pb-1'}>{insights.positiveMSPR}</td>
                                <td className={'pb-1'}>{insights.positiveChange}</td>
                            </tr>
                            <tr className={'border-bottom border-black border-opacity-10'}>
                                <td className={'fw-bold'}>Negative</td>
                                <td className={'pb-1'}>{insights.negativeMSPR}</td>
                                <td className={'pb-1'}>{insights.negativeChange}</td>
                            </tr>
                        </table>
                    </div>
                )
            }
            {/* Add additional content for tab 2 if needed */}
            <div className={'d-flex flex-lg-row mt-4 flex-column justify-content-center align-items-center'}>
                <div className={'col-lg-6 col-11'}><Insights_column_chart ticker ={ticker}/></div>
                <div className={'col-lg-6  col-11'}><Insights_spline_chart  ticker ={ticker} spline={spline}/></div>
            </div>
        </div>
    );
}

export default InsightsComponent;