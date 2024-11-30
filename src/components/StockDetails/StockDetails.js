import React, {useEffect, useState} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
const StockDetails = (props) => {
    const [stockDetails, setStockDetails] = useState(props.stockDetails);
    const [watchListAdded, setWatchListAdded] = useState(false);
    const [watchListRemoved, setWatchListRemoved] = useState(false);
    const [iconFill, setIconFill] = useState(false);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);
    const [buyDataModal, setBuyDataModal] = useState({});
    const [sellDataModal, setSellDataModal] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [mainBalance, setMainBalance] = useState(0);
    const [buttons, setButtons] = useState(false);
    const [sellQuantity, setSellQuantity] = useState(0);
    const [stockBought, setStockBought] = useState(false);
    const [stockSold, setStockSold] = useState(false);
    const timestampToDateTimeString = (timestamp) => {
        const dateObject = new Date(timestamp);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const hours = String(dateObject.getHours()).padStart(2, '0');
        const minutes = String(dateObject.getMinutes()).padStart(2, '0');
        const seconds = String(dateObject.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    const [currentTime, setCurrentTime] = useState(timestampToDateTimeString(new Date().getTime()));

    useEffect(() => {
        fetch('https://stock-web-app-node-backend.vercel.app/portfolio/balance')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setMainBalance(data[0].total_balance);
            }).catch(err => {
            console.log("Error Main Balance: ", err);
        });
    }, []);

    useEffect(() => {
        // Update stockDetails state when props change
        setStockDetails(props.stockDetails);
        setCurrentTime(timestampToDateTimeString(new Date().getTime()));
        inWatchList();
    }, [props.stockDetails]);

    useEffect(() => {
        inWatchList();
    }, [iconFill]);

    useEffect(() => {
        sellQuantityFunction();
    }, [buttons]);

    useEffect(() => {
        fetch(`https://stock-web-app-node-backend.vercel.app/portfolio/company/${stockDetails.ticker}`)
            .then(res => res.json())
            .then(data => {
                if(data === "not in portfolio"){
                    setButtons(false);
                }
                if(data === "in portfolio"){
                    setButtons(true);
                }
                console.log(buttons);
            })
            .catch(err => {
                console.log("In Portfolio Error:", err);
            });
    }, [props.stockDetails, mainBalance]);

    const inWatchList = () => {
        fetch(`https://stock-web-app-node-backend.vercel.app/watchlist/find/${stockDetails.ticker}`)
            .then(res => res.json())
            .then(data => {
                if(data === "false"){
                    setIconFill(false);
                }else{
                    setIconFill(true);
                }
            }).catch(err =>{
                console.log("watchlist finding error on frontend", err);
        });
    }

    let color = "";
    let arrow = "";

    if (stockDetails !== null) {
        color = stockDetails.change < 0 ? "red" : "green";
        arrow = stockDetails.change < 0 ? "bi bi-caret-down-fill" : "bi bi-caret-up-fill";
    }

    const addToWatch = () => {
        setWatchListRemoved(false);
        fetch('https://stock-web-app-node-backend.vercel.app/watchlist/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ticker: stockDetails.ticker,
                name: stockDetails.name,
                current: stockDetails.last,
                change: stockDetails.change,
                change_percentage: stockDetails.change_percentage
            })
        }).then( res => res.json())
            .then(data => {
                if(data === "successful"){
                    setIconFill(true);
                    setWatchListAdded(true);
                }else if(data === "removed"){
                    setWatchListRemoved(true);
                    setIconFill(false);
                }

            })
            .catch(err => {
                console.log("Watch to List Error", err);
            });
    }

    const buyFunction=(data) => {
        try{
            fetch('https://stock-web-app-node-backend.vercel.app/portfolio/add-stock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ticker: data.ticker,
                    name: data.name,
                    quantity: quantity,
                    change: data.change,
                    avg_cost_share: (quantity*data.last) / quantity,
                    current_price: (data.last),
                    total_cost: (quantity*data.last),
                    market_value: (quantity*data.last),
                    main_balance: mainBalance
                })
            }).then( res => res.json())
                .then(data => {
                    console.log(data);
                    setMainBalance(data);
                    setQuantity(1);
                    setShowBuyModal(false);
                    setButtons(true);
                    setStockBought(true);
                }).catch(err => {
                    console.log("Buy Function", err);
            });
            sellQuantityFunction();
        }catch(e){
            console.log("Buy Function Frontend error", e);
        }
    }

    const sellQuantityFunction = () => {
        try{
            fetch(`https://stock-web-app-node-backend.vercel.app/stock/in-portfolio/${stockDetails.ticker}`)
                .then( res => res.json())
                .then(data => {
                    setSellQuantity(data);
                })
                .catch(err => {
                    console.log("error when fetching sell quantity ",err);
                });
        }catch (e) {
         console.log("Selling Quantity Function Error", e);
        }
    }

    const sellFunction = (data) => {
        try{
            fetch('https://stock-web-app-node-backend.vercel.app/portfolio/sell-stock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ticker: data.ticker,
                    name: data.name,
                    quantity: quantity,
                    change: data.change,
                    avg_cost_share: (quantity*data.last) / quantity,
                    current_price: (data.last),
                    total_cost: (quantity*data.last),
                    market_value: (quantity*data.last),
                    main_balance: mainBalance
                })
            }).then( res => res.json())
                .then(data => {
                    console.log(data);
                    setMainBalance(data);
                    setQuantity(1);
                    setShowSellModal(false);
                    setButtons(true);
                    setStockSold(true);
                }).catch(err => {
                console.log("SEll Function", err);
            })
        }catch(e){
            console.log("Sell Function Frontend error", e);
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-content-center col-lg-9 col-12 pt-3">
            <div className={'d-flex justify-content-center align-items-center'}>
                {
                    watchListAdded &&
                    <div
                        className={'d-flex flex-row col-lg-12 col-11 bg-success border border-1 border-success rounded bg-opacity-25 mt-1 mb-2 pt-2 pb-2'}>
                        <div
                            className={"d-flex col-11 justify-content-center align-items-center text-success fw-medium mt-1 mb-1"}> {stockDetails.ticker} added
                            to WatchList.
                        </div>
                        <div className={'d-flex col-1 justify-content-end align-items-center mt-1 mb-1'}>
                            <button onClick={() => setWatchListAdded(false)} className={"me-3"}><i
                                className={"bi bi-x-lg"}></i></button>
                        </div>

                    </div>
                }
            </div>
            <div className={'d-flex justify-content-center align-items-center'}>
                {
                    watchListRemoved &&
                    <div
                        className={'d-flex flex-row col-lg-12 col-11 bg-danger border border-1 border-danger rounded bg-opacity-25 mt-1 mb-2 pt-2 pb-2'}>
                        <div
                            className={"d-flex col-11 justify-content-center align-items-center text-danger fw-medium mt-1 mb-1"}> {stockDetails.ticker} removed
                            from WatchList.
                        </div>
                        <div className={'d-flex col-1 justify-content-end align-items-center mt-1 mb-1'}>
                            <button onClick={() => setWatchListRemoved(false)} className={"me-3"}><i
                                className={"bi bi-x-lg"}></i></button>
                        </div>

                    </div>
                }
            </div>
            <div className={'d-flex justify-content-center align-items-center'}>
                {
                    stockBought &&
                    <div
                        className={'d-flex flex-row col-lg-12 col-11 bg-success border border-1 border-success rounded bg-opacity-25 mt-1 mb-0 pt-2 pb-2'}>
                        <div
                            className={"d-flex col-11 justify-content-center align-content-center text-success fw-medium mt-1 mb-1 "}>{stockDetails.ticker} bought
                            successfully.
                        </div>
                        <div className={'d-flex col-1 justify-content-end align-items-center mt-1 mb-1 '}>
                            <button onClick={() => setStockBought(false)} className={"me-3"}><i
                                className={"bi bi-x-lg"}></i></button>
                        </div>

                    </div>
                }
            </div>
            <div className={'d-flex justify-content-center align-items-center'}>
                {
                    stockSold &&
                    <div
                        className={'d-flex flex-row col-lg-12 col-11 bg-danger border border-1 border-danger rounded bg-opacity-25 mt-1 mb-2 pt-2 pb-2'}>
                        <div
                            className={"d-flex col-11 justify-content-center align-content-center text-danger fw-medium mt-1 mb-1 "}>
                            {stockDetails.ticker} sold successfully.
                        </div>
                        <div className={'d-flex col-1 justify-content-end align-items-center mt-1 mb-1 '}>
                            <button onClick={() => setStockSold(false)} className={"me-3"}><i
                                className={"bi bi-x-lg"}></i></button>
                        </div>

                    </div>
                }
            </div>
            {stockDetails && ( // Render only if stockDetails is not null
                <div className="d-flex flex-column col-12 mt-lg-0 mt-2">
                    <div className="d-flex flex-row col-12 ">
                        <div className="col-lg-4 col-5 d-flex flex-column">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <p className="fs-lg-3 fs-4 fw-medium mb-0">{stockDetails.ticker}
                                    <button className={"ms-2"} onClick={addToWatch}>
                                        <i className={`bi ${iconFill === true ? 'bi-star-fill text-warning' : 'bi-star'} `}></i>
                                    </button>
                                </p>
                                <p className="fs-lg-4  fs-5 opacity-75 fw-medium text-center mb-0">{stockDetails.name}</p>
                                <p className="fs-lg-5  fs-6 text-center mb-2">{stockDetails.exchange}</p>
                                <div className="d-flex flex-row">
                                    <button className="me-2 btn btn-success"
                                            onClick={() => {
                                                setShowBuyModal(true);
                                                setBuyDataModal(stockDetails);
                                                setQuantity(0);
                                            }}>
                                        Buy
                                    </button>
                                    {
                                        buttons &&
                                        <button className={`ms-2 btn btn-danger`}
                                                onClick={() => {
                                                    setShowSellModal(true);
                                                    setSellDataModal(stockDetails);
                                                    setQuantity(0);
                                                }}>
                                            Sell
                                        </button>
                                    }

                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-4 col-2 d-flex justify-content-center align-items-start align-items-lg-center">
                            <img src={stockDetails.logo} alt="Company Logo" className="img-fluid"
                                 style={{minHeight: "50px", minWidth: "50px", maxWidth: "100px", height: "auto"}}
                                 width="100px" height="100px"/>
                        </div>
                        <div className=" col-lg-4 col-5 d-flex flex-column justify-content-start align-items-center">
                            <p className="fs-lg-3 fs-4 fw-medium text-center mb-0" style={{color: color}}>{stockDetails.last}</p>
                            <p className="fs-lg-4 fs-5 fw-medium text-center mb-1" style={{color: color}}>
                                <i className={arrow}></i>{stockDetails.change} ({stockDetails.change_percentage}%)
                            </p>
                            <p className={'text-center'}>{stockDetails.time}</p>
                            {/*<p className={' fs-lg-5 fs-6 text-center'}>{currentTime}</p>*/}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        {stockDetails.market_status2 === "close" &&
                            <p className="text-danger fw-semibold mt-3">Market Closed
                                on <span>{stockDetails.stock_time.substring(0,10) + " " + "13:00:00"}</span>
                                {/*<span>{stockDetails.stock_time + " " + "13:00:00"}</span>*/}
                            </p>
                        }
                        {stockDetails.market_status2 === "open" &&
                            <p className="text-success fw-semibold">Market is Open</p>
                        }
                    </div>
                </div>
            )}
            {/* BUYING MODAL */}
            <Modal show={showBuyModal}>
                <ModalHeader>
                    <div className={'d-flex flex-row col-12'}>
                        <div className={'col-11 fw-bold'}>{buyDataModal.ticker}</div>
                        <div className={'col-1 d-flex justify-content-end'}>
                            <button className={'border-bottom border-1 border-primary'}>
                                <i className={'bi bi-x-lg link-primary'}
                                   onClick={() => setShowBuyModal(false)}></i>
                            </button>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className={'col-12 p-2'}>
                        <p className={'fw-bold mb-0'}>Current Price: {buyDataModal.last}</p>
                        <p className={'fw-bold mb-0'}>Money in Wallet: {mainBalance !== null ? mainBalance.toFixed(2) : ""} </p>
                        <p className={'fw-bold mb-0'}>Quantity: <input type={'number'} value={quantity} min={0}
                                                                       onChange={(e) => {
                                                                           setQuantity(e.target.value)
                                                                       }}/></p>
                        {((quantity * buyDataModal.last) > mainBalance) &&
                            <p className={'text-danger fs-6 fw-medium'}>Not Enough money in Wallet.</p>}
                    </div>

                </ModalBody>
                <ModalFooter>
                    <div
                        className={`d-flex flex-row col-12 ${(quantity * buyDataModal.last) > mainBalance ? "z-0 opacity-50" : ""} ${parseInt(quantity)===0 ? "z-0 opacity-50": ""}`}>
                        <div className={'d-flex col-11 justify-content-start align-content-center'}>
                            <p className={'fw-bold'}>Total Cost: {(parseInt(quantity) * buyDataModal.last).toFixed(2)}</p>
                        </div>
                        <div className={'col-1 d-flex justify-content-end'}>
                            <button
                                className={`btn btn-success ${parseInt(quantity) * buyDataModal.last > mainBalance ? "disabled" : ""} ${parseInt(quantity)===0 ? "disabled": ""}`}
                                onClick={() => {
                                    if (quantity * buyDataModal.last > mainBalance) {
                                    } else {
                                        buyFunction(buyDataModal);
                                    }
                                }}>Buy
                            </button>
                        </div>
                    </div>
                </ModalFooter>
            </Modal>
            {/* SELLING MODAL*/}
            <Modal show={showSellModal} onHide={() => setShowSellModal(false)}>
                <ModalHeader>
                    <div className={'d-flex flex-row col-12'}>
                        <div className={'col-11 fw-bold'}>{sellDataModal.ticker}</div>
                        <div className={'col-1 d-flex justify-content-end'}>
                            <button className={'border-bottom border-1 border-primary'}><i
                                className={'bi bi-x-lg link-primary'}
                                onClick={() => setShowSellModal(false)}></i></button>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className={'col-12 p-2'}>
                        <p className={'fw-bold mb-0'}>Current Price: {sellDataModal.last}</p>
                        <p className={'fw-bold mb-0'}>Money in Wallet: {mainBalance.toFixed(2)}</p>
                        <p className={'fw-bold mb-0 '}>Quantity: <input type={'number'} value={quantity} min={0}
                                                                        onChange={(e) => {
                                                                            setQuantity(e.target.value)
                                                                        }}/></p>
                        {sellQuantity < quantity &&
                            <p className={'text-danger fs-6 fw-medium'}>You cannot sell the stocks that you don't
                                have!</p>}
                    </div>

                </ModalBody>
                <ModalFooter>
                    <div className={`d-flex flex-row col-12 ${sellQuantity < quantity ? "opacity-50 " : ""} ${parseInt(quantity)===0 ? "opacity-50": ""} `}>
                        <div className={'d-flex col-11 justify-content-start align-content-center'}>
                            <p className={'fw-bold '}> Total Cost: {(quantity * sellDataModal.last).toFixed(2)}</p>
                        </div>
                        <div className={'col-1 d-flex justify-content-end'}>
                            <button className={`btn btn-success  ${sellQuantity < quantity ? "disabled " : ""} ${parseInt(quantity)===0 ? "disabled": ""}`}
                                    onClick={() => {
                                        sellFunction(sellDataModal);
                                    }}
                            >
                                Sell
                            </button>
                        </div>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default StockDetails;