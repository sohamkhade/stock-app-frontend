// import React, {Component} from 'react';
// import './DisplayDetails.css';
// import Charts_OHLC_Vol_SMA from "../Charts_OHLC_Vol_SMA/Charts_OHLC_Vol_SMA";
// import InsightsComponent from "../Insights/InsightsComponent/InsightsComponent";
// import TopNewsComponent from "../TopNews/TopNewsComponent/TopNewsComponent";
// import SummaryComponent from "../Summary/SummaryComponent/SummaryComponent";
//
// class DisplayDetails extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             activeTab: 'summary-tab', // Set default active tab
//             ticker: this.props.name,
//             summary_data: this.props.summaryData,
//             top_news_data: this.props.topNewsData,
//             charts: this.props.charts,
//             insights: this.props.insights,
//         };
//     }
//
//     componentDidUpdate(prevProps) {
//         // Check if stockDetails prop has changed
//         if (prevProps.summaryData !== this.props.summaryData) {
//             this.setState({summary_data: this.props.summaryData});
//         }
//         if (prevProps.topNewsData !== this.props.topNewsData) {
//             this.setState({top_news_data: this.props.topNewsData});
//         }
//         if (prevProps.charts !== this.props.charts) {
//             this.setState({charts: this.props.charts});
//         }
//         if (prevProps.insights !== this.props.insights) {
//             this.setState({insights: this.props.insights});
//         }
//     }
//
//
//     // componentDidMount() {
//     //     // this.getSummmaryData();
//     //     // this.getNewsData();
//     //     // this.getInsigtsData();
//     //     this.setState({summary_data: this.props.summaryData});
//     // }
//
//
//     // Function to handle tab click
//     handleTabClick = (tabName) => {
//         this.setState({activeTab: tabName});
//     }
//
//
//     render() {
//         const {summary_data} = this.state;
//         const {top_news_data} = this.state;
//         const {insights} = this.state;
//         const {charts} = this.state;
//         console.log(summary_data);
//         console.log(top_news_data);
//         console.log(insights);
//         console.log(charts);
//         return (
//             <div className={"d-flex flex-column w-75"}>
//                 <ul className="nav nav-tabs" style={{border: 0}}>
//                     <li className="nav-item w-25">
//                         <button
//                             className={`pt-1 pb-1 w-100 fw-bold ${this.state.activeTab === 'summary-tab' ? 'active border-bottom border-black ' : ''}`}
//                             onClick={() => this.handleTabClick('summary-tab')}>Summary
//                         </button>
//                     </li>
//                     <li className="nav-item w-25">
//                         <button
//                             className={`pt-1 pb-1 w-100  fw-bold ${this.state.activeTab === 'news-tab' ? 'active  border-bottom border-black' : ''}`}
//                             onClick={() => this.handleTabClick('news-tab')}>Top News
//                         </button>
//                     </li>
//                     <li className="nav-item w-25">
//                         <button
//                             className={` pt-1 pb-1 w-100  fw-bold ${this.state.activeTab === 'charts-tab' ? 'active  border-bottom border-black' : ''}`}
//                             onClick={() => this.handleTabClick('charts-tab')}>Charts
//                         </button>
//                     </li>
//                     <li className="nav-item w-25">
//                         <button
//                             className={`pt-1 pb-1 w-100  fw-bold ${this.state.activeTab === 'insights-tab' ? 'active  border-bottom border-black' : ''}`}
//                             onClick={() => this.handleTabClick('insights-tab')}>Insights
//                         </button>
//                     </li>
//                     {/* Add more buttons for additional tabs if needed */}
//                 </ul>
//                 {
//                     summary_data && <div className="tab-content">
//                         <div className={`tab-pane ${this.state.activeTab === 'summary-tab' ? 'active' : ''}`}>
//                             {/*/!* Content for tab 1 *!/*/}
//                             <SummaryComponent summaryData = {summary_data} />
//                         </div>
//                         <div className={`w-100 tab-pane ${this.state.activeTab === 'news-tab' ? 'active' : ''}`}>
//                             {/* Content for tab 2 */}
//                             <TopNewsComponent topNewsData = {this.state.top_news_data} />
//                         </div>
//                         <div className={`tab-pane ${this.state.activeTab === 'charts-tab' ? 'active' : ''}`}>
//                             {/* Content for tab 3 */}
//                             Tab 3
//                             {this.props.name}
//                             <Charts_OHLC_Vol_SMA/>
//                         </div>
//                         <div className={`tab-pane ${this.state.activeTab === 'insights-tab' ? 'active' : ''}`}>
//                             {/* Content for tab 4 */}
//                             <InsightsComponent insights = {this.state.insights} ticker = {this.state.ticker} />
//                         </div>
//                         {/* Add more divs for additional tabs if needed */}
//                     </div>
//                 }
//             </div>
//         );
//     }
// }
//
// export default DisplayDetails;


import React, {useEffect, useRef, useState} from 'react';
import './DisplayDetails.css';
import Charts_OHLC_Vol_SMA from "../Charts_OHLC_Vol_SMA/Charts_OHLC_Vol_SMA";
import InsightsComponent from "../Insights/InsightsComponent/InsightsComponent";
import TopNewsComponent from "../TopNews/TopNewsComponent/TopNewsComponent";
import SummaryComponent from "../Summary/SummaryComponent/SummaryComponent";

import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';


const DisplayDetails = (props) => {
    const [activeTab, setActiveTab] = useState('summary-tab');
    const [ticker] = useState(props.name);
    const [summaryData, setSummaryData] = useState(props.summaryData);
    const [topNewsData, setTopNewsData] = useState(props.topNewsData);
    const [charts, setCharts] = useState(props.charts);
    const [insights, setInsights] = useState(props.insights);
    const [spline, setSpline] = useState(props.spline);
    const [market_status, setMarketStatus] = useState(props.market_status);
    const [summaryChart, setSummaryChart] = useState(props.summaryChart);
    const [companyName, setCompanyName] = useState(props.company_name);


    const [value, setValue] = useState('1');

    const [buttons, setButtons] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setButtons(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize); // Listen for window resize events

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize); // Remove the event listener on component unmount
        };
    }, []);

    useEffect(() => {
        if(window.innerWidth < 768)
            setButtons(true);
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    useEffect(() => {
        setSummaryData(props.summaryData);
    }, [props.summaryData]);

    useEffect(() => {
        setTopNewsData(props.topNewsData);
    }, [props.topNewsData]);

    useEffect(() => {
        setCharts(props.charts);
    }, [props.charts]);

    useEffect(() => {
        setInsights(props.insights);
    }, [props.insights]);

    useEffect(() => {
        setCompanyName(props.company_name);
    }, [props.company_name]);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    }

    return (
        <div className={"d-flex flex-column col-lg-9 col-12"}>
                {/*<ul className="nav nav-tabs col-12" style={{border: 0}}>*/}
                {/*    <li className="nav-item w-25 col-lg-3 col-3">*/}
                {/*        <button*/}
                {/*            className={`pt-2 pb-2 w-100 fw-medium ${activeTab === 'summary-tab' ? 'active border-bottom border-primary main-color' : 'opacity-50'}`}*/}
                {/*            onClick={() => handleTabClick('summary-tab')}>Summary*/}
                {/*        </button>*/}
                {/*    </li>*/}
                {/*    <li className="nav-item w-25 col-lg-3 col-3 ">*/}
                {/*        <button*/}
                {/*            className={`pt-2 pb-2 w-100  fw-medium ${activeTab === 'news-tab' ? 'active  border-bottom border-primary main-color' : 'opacity-50'}`}*/}
                {/*            onClick={() => handleTabClick('news-tab')}>Top News*/}
                {/*        </button>*/}
                {/*    </li>*/}
                {/*    <li className="nav-item w-25 col-lg-3 col-3">*/}
                {/*        <button*/}
                {/*            className={` pt-2 pb-2 w-100  fw-medium ${activeTab === 'charts-tab' ? 'active  border-bottom border-primary main-color' : 'opacity-50'}`}*/}
                {/*            onClick={() => handleTabClick('charts-tab')}>Charts*/}
                {/*        </button>*/}
                {/*    </li>*/}
                {/*    <li className="nav-item w-25 col-lg-3 col-3">*/}
                {/*        <button*/}
                {/*            className={`pt-2 pb-2 w-100  fw-medium ${activeTab === 'insights-tab' ? 'active  border-bottom border-primary main-color' : 'opacity-50'}`}*/}
                {/*            onClick={() => handleTabClick('insights-tab')}>Insights*/}
                {/*        </button>*/}
                {/*    </li>*/}

                {/*</ul>*/}

            <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                    <Box>
                        <TabList
                            onChange={handleChange}
                            aria-label='Tabs example'
                            textColor={`primary`}
                            indicatorColor={`primary`}
                            variant='scrollable'
                            allowScrollButtonsMobile
                            scrollButtons={buttons}
                            sx={{
                                '& .Mui-disabled': {
                                    opacity: 0.5,
                                },
                                '& .Mui-selected': {
                                    color: '#2729b3',
                                    borderColor: '#2729b3',
                                },
                            }}
                        >
                            <Tab
                                label='Summary'
                                value='1'
                                className = {'col-lg-3 col-4 text-capitalize '}
                            />
                            <Tab label='Top News ' value='2'  className = {'col-lg-3 col-4 text-capitalize '} />
                            <Tab label='Charts' value='3'  className = {'col-lg-3 col-4 text-capitalize '} />
                            <Tab label='Insights' value='4'  className = {'col-lg-3 col-4 text-capitalize '}  />
                        </TabList>
                    </Box>

                    {
                        summaryData && (<Box>
                            <TabPanel value='1' className={'p-0 pt-2'}>  <SummaryComponent summaryData={summaryData} summaryChart={summaryChart} ticker={ticker}
                                                                    market_status={market_status}/> </TabPanel>
                            <TabPanel value='2' className={'p-0 pt-2'}><TopNewsComponent topNewsData={topNewsData}/></TabPanel>
                            <TabPanel value='3' className={'p-0 pt-2'}>
                                <div className={'d-flex col-12 justify-content-center'}>
                                    <Charts_OHLC_Vol_SMA charts={charts}/>
                                </div>
                            </TabPanel >
                            <TabPanel value='4' className={'p-0 pt-2'}> <InsightsComponent insights={insights} ticker={ticker} companyName={companyName} spline={spline}/></TabPanel>
                        </Box>)
                    }
                </TabContext>
            </Box>

            {/*{*/}
            {/*    summaryData && <div className="tab-content">*/}
            {/*        <div className={`tab-pane w-100 ${activeTab === 'summary-tab' ? 'active' : ''}`}>*/}
            {/*            <SummaryComponent summaryData={summaryData} summaryChart={summaryChart} ticker={ticker}*/}
            {/*                              market_status={market_status}/>*/}
            {/*        </div>*/}
            {/*        <div className={`w-100 tab-pane ${activeTab === 'news-tab' ? 'active' : ''}`}>*/}
            {/*            <TopNewsComponent topNewsData={topNewsData}/>*/}
            {/*        </div>*/}
            {/*        <div className={`tab-pane ${activeTab === 'charts-tab' ? 'active' : ''}`}>*/}
            {/*            <div className={'d-flex col-12 justify-content-center'}>*/}
            {/*                <Charts_OHLC_Vol_SMA charts={charts}/>*/}
            {/*            </div>*/}

            {/*        </div>*/}
            {/*        <div className={`tab-pane ${activeTab === 'insights-tab' ? 'active' : ''}`}>*/}
            {/*            <InsightsComponent insights={insights} ticker={ticker} companyName={companyName} spline={spline}/>*/}
            {/*        </div>*/}
            {/*        /!* Add more divs for additional tabs if needed *!/*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    );
}

export default DisplayDetails;


// TABS code from https://github.com/gopinav/React-MUI-Tutorials/blob/master/react-mui-demo/src/components/MuiTabs.tsx

// Previous code from W3Schools.com


