// import React, {Component} from 'react';
// import NavBar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
// import SearchField from "../components/SearchField/SearchField";
// import StockDetails from "../components/StockDetails/StockDetails";
// import DisplayDetails from "../components/DisplayDetails/DisplayDetails";
//
// class SearchPage extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             tickerName: "",
//             stockDetails: null,
//             loading: false,
//             summaryData: null,
//             topNewsData: null,
//             charts: null,
//             insights: null,
//         }
//     }
//
//     componentDidMount() {
//         // Fetch stock details initially
//         // Fetch stock details every 15 seconds
//         // if(this.state.tickerName !== "")
//         // this.interval = setInterval(this.getStockDetails, 15000);
//         if(this.state.tickerName !== "")
//             this.getData(this.state.tickerName);
//
//     }
//
//     clearData = (data) => {
//         console.log("clear triggered");
//         this.setState({tickerName: "", stockDetails: null, loading: false, summaryData: null, topNewsData: null, charts:null, insights: null}, () => {
//             clearInterval(this.interval);
//         });
//
//     }
//
//     getData = (data) => {
//         if(data !== ""){
//             console.log("Parent :", data);
//             this.setState({ loading: true });
//             this.setState({tickerName: data}, () => {
//                 console.log("ticker name", this.state.tickerName);
//                 this.getStockDetails();
//                 this.interval = setInterval(this.getStockDetails, 15000);
//                 this.getSummmaryData();
//                 this.getNewsData();
//                 this.getInsigtsData();
//             });
//             setTimeout(() => {
//                 this.setState({ loading: false });
//             }, 3000);
//         }
//     }
//
//     getStockDetails = () => {
//         console.log("Function running");
//         fetch(`/stock-details/${this.state.tickerName}`)
//             .then(res => res.json())
//             .then(data => {
//             this.setState({stockDetails: data}, ()=>{
//                 console.log("Stock Details: updated", this.state.stockDetails);
//             });
//         });
//     }
//
//     getSummmaryData = () => {
//         fetch(`/company/summary-data/${this.state.tickerName}`).then( res => res.json())
//             .then(data => {
//                 console.log(data);
//                 this.setState({summaryData: data}, () => {
//                     console.log("Summary State",this.state);
//                     console.log("Summary Details: updated", this.state.summaryData);
//                 });
//             }).catch(e => {
//             console.log("fetched error", e);
//         })
//     }
//
//     getNewsData = () => {
//         fetch(`/company-news/${this.state.tickerName}`).then(res => res.json())
//             .then(data => {
//                 console.log("Top News",data);
//                 this.setState({topNewsData: data});
//             }).catch( e => {
//             console.log("fetch error in news call",e);
//         });
//     }
//
//     getInsigtsData = () => {
//         fetch(`/company/sentiment/${this.state.tickerName}`).then(res => res.json())
//             .then(data => {
//                 // console.log("Top News",data);
//                 this.setState({insights: data});
//             }).catch( e => {
//             console.log("fetch error in insights call",e);
//         });
//     }
//
//     render() {
//         return (
//             <div className={'h-100'}>
//                 <NavBar></NavBar>
//                 <SearchField onSumbit={this.getData} onClear={this.clearData}></SearchField>
//                 {
//                     this.state.loading === true &&
//                     <div className={'d-flex justify-content-center align-items-center mt-4'}>
//                         <div className="spinner-border">
//                         <span className="sr-only"></span>
//                     </div>
//                     </div>
//                 }
//                 {
//                     this.state.tickerName !== "" && this.state.loading === false &&
//                     <div className={"d-flex flex-column justify-content-center align-items-center w-100"}>
//                         <StockDetails name={this.state.tickerName} stockDetails={this.state.stockDetails}/>
//                         {/*<div>Ticker Name: {this.state.tickerName}</div>*/}
//                         <DisplayDetails name={this.state.tickerName} summaryData = {this.state.summaryData}
//                                         topNewsData = {this.state.topNewsData}  charts = {this.state.charts}
//                                         insights= {this.state.insights}/>
//                     </div>
//                 }
//                 <Footer></Footer>
//             </div>
//         );
//     }
// }
//
// export default SearchPage;

import React, {useEffect, useState} from 'react';
import SearchField from "../components/SearchField/SearchField";
import StockDetails from "../components/StockDetails/StockDetails";
import DisplayDetails from "../components/DisplayDetails/DisplayDetails";
import {useParams} from "react-router-dom";
import TabsComponent from "../components/TabsComponent/TabsComponent";

const SearchPage = () => {
    const [tickerName, setTickerName] = useState(JSON.parse(window.localStorage.getItem("ticker")) || "");
    const [stockDetails, setStockDetails] = useState(JSON.parse(window.localStorage.getItem("stockDetails")) || null);
    const [loading, setLoading] = useState(false);
    const [summaryData, setSummaryData] = useState(JSON.parse(window.localStorage.getItem("summaryData")) || null);
    const [topNewsData, setTopNewsData] = useState(JSON.parse(window.localStorage.getItem("topNewsData")) || null);
    const [charts, setCharts] = useState(JSON.parse(window.localStorage.getItem("charts")) || null);
    const [insights, setInsights] = useState(JSON.parse(window.localStorage.getItem("insights")) || null);
    const [refresh, setRefresh] = useState(false);
    const [intervalId, setIntervalId] = useState(null); // Store interval ID
    const [spline, setSpline] = useState(JSON.parse(window.localStorage.getItem("spline")) || []);
    const [summaryChart, setSummaryChart] = useState(JSON.parse(window.localStorage.getItem("summaryChart")) || []);
    const params = useParams();

    // useEffect(() => {
    //     window.localStorage.clear();
    //     window.location.reload();
    // }, []);

    // useEffect(() => {
    //     const clearStorageFlag = localStorage.getItem('clearStorageFlag');
    //
    //     if (clearStorageFlag) {
    //         // Clear localStorage
    //         localStorage.clear();
    //         // Remove the flag
    //         localStorage.removeItem('clearStorageFlag');
    //         // Reload the page
    //         // window.location.reload();
    //     } else {
    //         // Set the flag for next reload
    //         localStorage.setItem('clearStorageFlag', 'true');
    //     }
    // }, []);

    useEffect(() => {
        if(window.localStorage.getItem("ticker") === null || window.localStorage.getItem("ticker") === undefined)
            getData(tickerName);
        if (tickerName === "") {
            console.log("closed Interval.....");
            clearInterval(intervalId);
        }
        if(tickerName !== "") {
            window.localStorage.setItem("ticker", JSON.stringify(tickerName));
        }
    }, [tickerName]);
    useEffect(() => {
        if (stockDetails !== null && stockDetails.market_status2 === "close") {
            console.log("closed Interval.....");
            clearInterval(intervalId);
        }
        if (tickerName !== "" && stockDetails !== null && stockDetails.market_status2 === "open") {
            const id = setInterval(() => {
                console.log("Interval started......");
                getStockDetails();
                getSummmaryData();
            }, 15000);
            setIntervalId(id);
        }
        if (stockDetails === null) {
            console.log("closed Interval......");
            clearInterval(intervalId);
        }
        if(stockDetails !== null){
            window.localStorage.setItem("stockDetails", JSON.stringify(stockDetails));
        }
    }, [stockDetails]);



    useEffect(() => {
        if(summaryData !== null)
            window.localStorage.setItem("summaryData", JSON.stringify(summaryData));
    }, [summaryData]);

    useEffect(() => {
        if(summaryChart !== [])
            window.localStorage.setItem("summaryChart", JSON.stringify(summaryChart));
    }, [summaryChart]);

    useEffect(() => {
        if(topNewsData !== null)
            window.localStorage.setItem("topNewsData", JSON.stringify(topNewsData));
    }, [topNewsData]);
    useEffect(() => {
        if(charts !== null)
            window.localStorage.setItem("charts", JSON.stringify(charts));
    }, [charts]);
    useEffect(() => {
        if(insights !== null)
            window.localStorage.setItem("insights", JSON.stringify(insights));
    }, [insights]);
    useEffect(() => {
        if(spline !== [])
            window.localStorage.setItem("spline", JSON.stringify(spline));
    }, [spline]);

    const clearData = () => {
        setTickerName("");
        setStockDetails(null);
        setLoading(false);
        setSummaryData(null);
        setTopNewsData(null);
        setCharts(null);
        setInsights(null);
        setSpline([]);
        setSummaryChart([]);
        if (stockDetails === null) {
            console.log("closed Interval.....");
            clearInterval(intervalId);
        }
        window.localStorage.clear();
    }

    const getData = async (data) => {
        console.log(data);
        if (data !== "") {
            if(window.localStorage.getItem("ticker") === undefined || window.localStorage.getItem("ticker") === null) {
                setLoading(true);
                setTickerName(data);
                getStockDetails();
                getSummmaryData();
                getSummaryCartData();
                getNewsData();
                getCharts();
                getInsigtsData();
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
                console.log("Get Data Triggered.");


            }
        }
    }

    const getStockDetails = () => {
        if (tickerName !== "") {
            fetch(`https://stock-web-app-node-backend.vercel.app/stock-details/${tickerName}`)
                .then(res => res.json())
                .then(data => {
                    setStockDetails(data);
                    // console.log(stockDetails);
                }).catch(err => {
                console.log(tickerName);
                console.log("Stock Details fetching error", err);
            });
        }
    }

    const getSummmaryData = () => {
        if (tickerName !== "") {
            fetch(`https://stock-web-app-node-backend.vercel.app/company/summary-data/${tickerName}`)
                .then(res => res.json())
                .then(data => {
                    setSummaryData(data);
                    // console.log(summaryData);
                })
                .catch(e => {
                    console.log(`fetched error in summary data ticker ${tickerName}`, e);
                });
        }
    }

    const getSummaryCartData = () => {
        if(tickerName !== ""){
            fetch(`https://stock-web-app-node-backend.vercel.app/summary/charts/${tickerName}`)
                .then(res => res.json())
                .then(data => {
                    const arr = data.results;
                    const data_time_curr = arr.map(item => [item.t, item.c]);
                    // setCharts(data_time_curr.slice(0, 24));
                    setSummaryChart(data_time_curr.slice(-24));
                    console.log("Summary Charts Data", charts);
                }).catch(err => {
                console.log("Fetching summary charts data getting error", err);
            });
        }
    }

    const getNewsData = () => {
        if (tickerName !== "") {
            fetch(`https://stock-web-app-node-backend.vercel.app/company-news/${tickerName}`)
                .then(res => res.json())
                .then(data => {
                    setTopNewsData(data);
                    // console.log(topNewsData);
                })
                .catch(e => {
                    console.log("fetch error in news call", e);
                });
        }
    }

    const getCharts = () => {
        if (tickerName !== "") {
            fetch(`https://stock-web-app-node-backend.vercel.app/highcharts/${tickerName}`)
                .then(res => res.json())
                .then(data => {
                    if (data !== null)
                        setCharts(data);

                    // console.log(data);
                })
                .catch(e => {
                    console.log("fetch error in news call", e);
                });
        }
    }

    const getInsigtsData = () => {
        if (tickerName !== "") {
            fetch(`https://stock-web-app-node-backend.vercel.app/company/sentiment/${tickerName}`)
                .then(res => res.json())
                .then(data => {
                    setInsights(data);
                    // console.log(insights);
                })
                .catch(e => {
                    console.log("fetch error in insights call", e);
                });

            fetch(`https://stock-web-app-node-backend.vercel.app/company/earnings/${tickerName}`)
                .then(res => res.json())
                .then(data => {
                    setSpline(data);
                    // console.log(spline);
                }).catch(err => {
                console.log("Earnings Data error", err);
            });
        }
    }

    return (
        <div className={'pb-4'} style={{minHeight: "85vh"}}>
            <SearchField onSumbit={getData} onClear={clearData}/>
            {loading && (
                <div className={'d-flex justify-content-center align-items-center mt-4'}>
                    <div className="spinner-border">
                        <span className="sr-only"></span>
                    </div>
                </div>
            )}


            {tickerName !== "" && !loading && (
                <div className={"d-flex flex-column justify-content-center align-items-center w-100"}>
                    <StockDetails name={tickerName} stockDetails={stockDetails}/>
                    <DisplayDetails
                        name={tickerName}
                        summaryData={summaryData}
                        summaryChart = {summaryChart}
                        market_status={stockDetails.market_status2}
                        topNewsData={topNewsData}
                        charts={charts}
                        insights={insights}
                        company_name = {stockDetails.name}
                        spline={spline}
                    />
                </div>
            )}
            {/*<Present />*/}
            {/*<TabsComponent/>*/}
        </div>
    );
}

export default SearchPage;
