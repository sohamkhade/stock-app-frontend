import React, {useEffect, useState} from 'react';
import Summary_chart_1 from "../Summary_chart_1/Summary_chart_1";

function SummaryComponent(props) {
    const [summaryData, setSummaryData] = useState(props.summaryData);
    useEffect(() => {
        setSummaryData(props.summaryData);
    }, [props.summaryData]);
    return (
        <div className={"d-flex flex-lg-row flex-column "}>
            <div className={"d-flex flex-column col-lg-6 col-12"}>
                <div className={"d-flex flex-column ms-lg-5 mt-3"}>
                    <p className={'ms-lg-4 mb-1 text-lg-start text-center'}><span
                        className={'fw-bold'}>High Price:</span> {summaryData.high_price}</p>
                    <p className={'ms-lg-4 mb-1 text-lg-start text-center'}><span
                        className={'fw-bold'}>Low Price:</span> {summaryData.low_price}</p>
                    <p className={'ms-lg-4 mb-1 text-lg-start text-center'}><span
                        className={'fw-bold'}>Open Price:</span> {summaryData.open_price}</p>
                    <p className={'ms-lg-4 mb-1 text-lg-start text-center'}><span
                        className={'fw-bold'}>Prev. Close:</span> {summaryData.previous_close}</p>
                </div>
                <div className={"d-flex flex-column justify-content-center align-items-center mt-2"}>
                    <p className={'fw-bold'}> About the company</p>
                    <p><span className={'fw-bold'}>IPO Start Date:</span> {summaryData.ipo}</p>
                    <p><span className={'fw-bold'}>Industry:</span> {summaryData.industry}</p>
                    <p><span className={'fw-bold'}>Webpage:</span> <a
                        href={`${summaryData.weburl}`}>{summaryData.weburl}</a></p>
                    <p><span className={'fw-bold'}>Company Peers:</span></p>
                    <p className={'text-center'}>
                        {summaryData.peers.map((peer, index) => (
                            <a key={index} href={`/search/${peer}`} target=""
                               rel="noopener noreferrer" onClick={() => {window.localStorage.clear()}}>{peer}, </a>
                        ))}
                    </p>

                </div>
            </div>
            <div className={"d-flex col-lg-6 col-12 justify-content-center align-content-center"}>
                <Summary_chart_1 ticker = {props.ticker} summaryChart={props.summaryChart}  market_status={props.market_status}/>
            </div>
        </div>
    );
}

export default SummaryComponent;