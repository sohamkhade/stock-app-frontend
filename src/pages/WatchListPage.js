import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeWatchList} from "../redux/actions/watchlistActions/watchlistActions";
import {useNavigate} from "react-router-dom";


const WatchListPage = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const watch = useSelector(state => state.watchlist);
    const dispatch = useDispatch();
    const [dataFetch, setDataFetch] = useState([]);
    const [watchlistData, setWatchlistData] = useState([]);
    useEffect(() => {
        fetch('https://assignment-3-backend-418623.uc.r.appspot.com/watchlist/data')
            .then(res => res.json())
            .then(data => {
                setTimeout(() => {
                    setWatchlist(data);
                    setDataFetch(data);
                    setLoading(false);
                }, 3000);
            }).catch(err => {
            console.log(err);
        });
    }, []);


    useEffect(() => {
        fetchDataAndUpdateWatchList();
    }, [dataFetch]);

    const FetchWatchList = () => {
        fetch('https://assignment-3-backend-418623.uc.r.appspot.com/watchlist/data')
            .then(res => res.json())
            .then(data => {
                    setWatchlist(data);
                    setDataFetch(data);
            }).catch(err => {
            console.log(err);
        });
    }

    const fetchDataAndUpdateWatchList = async () => {
        const promises = dataFetch.map(async (item) => {
            const res = await fetch(`https://assignment-3-backend-418623.uc.r.appspot.com/watchlist/current/${item.company_ticker}`);
            const dataValue = await res.json();
            item.change = dataValue.d;
            item.current_price = dataValue.c;
            item.change_percentage = dataValue.dp;
            return item;
        });
        const updatedData = await Promise.all(promises);
        console.log("Watchlist Fetched Data:", updatedData);
        // setPortfolioFetchedData(updatedData);
        setWatchlistData(updatedData);
    };

    const handleRemoveFromWatchlist = ({index, name}) => {
        // Update the local state of watchlist to reflect the change
        fetch('https://assignment-3-backend-418623.uc.r.appspot.com/watchlist/delete', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ticker: name
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data === "deleted successful") {
                    const updatedWatchlist = [...watchlist];
                    updatedWatchlist.splice(index, 1);
                    setWatchlist(updatedWatchlist);
                    FetchWatchList();
                    dispatch(changeWatchList(updatedWatchlist));
                }
            }).catch(err => {
            console.log("Deleting Call Error: ", err);
            alert("server delete call error");
        });

    };

    return (
        <div className={'w-100'} style={{minHeight: "85vh"}}>
            <div className={'d-flex flex-column col-12 justify-content-center align-items-center'}>
                {
                    loading &&
                    <div className="spinner-border mt-4" role="status">
                        <span className="sr-only"></span>
                    </div>
                }
                {
                    !loading && <div className={'col-lg-8 col-10 mt-lg-4 mt-2 fs-3 fw-medium'}><p>My Watchlist:</p></div>
                }

                {
                    !loading && watchlist.length === 0 &&
                    <div
                        className={'d-flex col-lg-8 col-10 rounded text-bg-warning bg-opacity-25 border border-1 border-warning justify-content-center align-items-center'}>
                        <p className={'mt-3 fs-6 p-lg-0 ps-2 text-center'}>Currently you don't have any stock in your
                            watchlist.</p>
                    </div>
                }
                <div className={'d-flex flex-column col-lg-8 col-10 mt-2 justify-content-center align-items-center'}>
                    {
                        watchlistData.map((item, index) => {
                            return (
                                <div key={index}
                                     className={'d-flex flex-column col-12 border border-1 border-black rounded border-opacity-25 mb-3'}>
                                    <div className={'ms-2'} style={{zIndex: "100"}}>
                                        <button onClick={() => {
                                            handleRemoveFromWatchlist({index: index, name: item.company_ticker})
                                        }} className={'p-2'}><i className="bi bi-x-lg"></i></button>
                                    </div>
                                    <div className={'d-flex flex-row col-12 btn text-start p-0'} onClick={() => {
                                        window.localStorage.clear();
                                        navigate(`/search/${item.company_ticker}`);
                                    }}>
                                        <div className={'d-flex flex-column col-6 ms-3'}>
                                            <p className={'fs-4 mb-0 fw-medium '}>{item.company_ticker}</p>
                                            <p className={'fs-6 fw-medium'}>{item.company_name}</p>
                                        </div>
                                        <div className={'d-flex flex-column col-6'}>
                                            <p className={`fs-4 mb-0 fw-medium ${item.change > 0 ? "text-success" : "text-danger"}`}>{item.current_price.toFixed(2)}</p>
                                            <p className={`fs-6 fw-medium ${item.change > 0 ? "text-success" : "text-danger"}`}>
                                                <i className={`bi ${item.change > 0 ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}></i>
                                                {item.change}({item.change_percentage.toFixed(2)}%)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

                {/*<App1 />*/}
            </div>
        </div>
    );
};

export default WatchListPage;
