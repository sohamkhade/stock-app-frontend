import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";

const PortfolioPage = () => {
    const portfolio = useSelector(state => state.portfolio);
    const [mainBalance, setMainBalance] = useState(0);
    const [portfolioData, setPortfolioData] = useState([]);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);
    const [buyDataModal, setBuyDataModal] = useState({});
    const [sellDataModal, setSellDataModal] = useState({});
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [sellQuantity, setSellQuantity] = useState(0);
    const [stockBought, setStockBought] = useState(false);
    const [stockSold, setStockSold] = useState(false);

    const [dataFetched, setDataFetched] = useState([]);

    const [PortfolioFetchedData, setPortfolioFetchedData] = useState([]);
    useEffect(() => {
        fetch('https://stock-web-app-node-backend.vercel.app/portfolio/data')
            .then(res => res.json())
            .then(data => {
                setTimeout(async () => {
                    setPortfolioData(data);
                    setDataFetched(data);
                    setLoading(false);
                }, 1000);
            })
            .catch(err => {
                console.log("Portfolio Error", err);
            });
    }, []);



    useEffect(() => {
        fetch('https://stock-web-app-node-backend.vercel.app/portfolio/balance')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setMainBalance(data[0].total_balance);
            }).catch(err => {
            console.log("Error Main Balance: ", err);
        });
        // fetch('https://assignment-3-backend-418623.uc.r.appspot.com/portfolio/data')
        //     .then(res => res.json())
        //     .then(async data => {
        //         setPortfolioData(data);
        //         // setDataFetched(data);
        //     }).catch(err => {
        //     console.log("Portfolio Error", err);
        // });
    }, [mainBalance]);

    useEffect(() => {
        fetchDataAndUpdatePortfolio();
    }, [dataFetched]);

    const fetchDataAndUpdatePortfolio = async () => {
        const promises = dataFetched.map(async (item) => {
            const res = await fetch(`https://stock-web-app-node-backend.vercel.app/portfolio/market_value/${item.ticker}`);
            const dataValue = await res.json();
            item.change = dataValue.d;
            item.current_price = dataValue.c;
            item.market_value = dataValue.c * item.quantity; // Corrected '&' to '*'
            return item;
        });
        const updatedData = await Promise.all(promises);
        console.log("Fetched Data:", updatedData);
        setPortfolioFetchedData(updatedData);
    };

    const FetchPortfolioData = () => {
        fetch('https://stock-web-app-node-backend.vercel.app/portfolio/data')
            .then(res => res.json())
            .then(async data => {
                setPortfolioData(data);
                setDataFetched(data);
            }).catch(err => {
            console.log("Portfolio Error", err);
        });
    }



    // const update = (data) => {
    //     console.log("update triggered");
    //     if(data.ticker !== ""){
    //         fetch(`https://assignment-3-backend-418623.uc.r.appspot.com/stock/in-portfolio/:${data.ticker.toUpperCase()}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 if(data !== 0) {
    //                     fetch('https://assignment-3-backend-418623.uc.r.appspot.com/portfolio/update', {
    //                         method: 'POST',
    //                         headers: {'Content-Type': 'application/json'},
    //                         body: JSON.stringify({
    //                             ticker: data.ticker,
    //                             current_price: data.current_price
    //                         })
    //                     }).then(res => res.json())
    //                         .then(data => {
    //                             console.log(data);
    //                         }).catch(err => {
    //                         console.log("Values updating in the portfolio", err);
    //                     });
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log("finding in stock or not", err);
    //             });
    //
    //     }
    // }

    const buyFunction = (data) => {
        try {
            fetch('https://stock-web-app-node-backend.vercel.app/portfolio/add-stock', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ticker: data.ticker,
                    name: data.company_name,
                    quantity: quantity,
                    change: data.change,
                    avg_cost_share: (quantity * data.current_price) / quantity,
                    current_price: (data.current_price),
                    total_cost: (quantity * data.current_price),
                    market_value: (quantity * data.current_price),
                    main_balance: mainBalance
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setMainBalance(data);
                    setQuantity(1);
                    setShowBuyModal(false);
                    setStockBought(true);
                    FetchPortfolioData();
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 1000);
                }).catch(err => {
                console.log("Buy Function", err);
            })
        } catch (e) {
            console.log("Buy Function Frontend error", e);
        }
    }

    const sellQuantityFunction = (data) => {
        try {
            fetch(`https://stock-web-app-node-backend.vercel.app/stock/in-portfolio/${data}`)
                .then(res => res.json())
                .then(data => {
                    setSellQuantity(data);
                })
                .catch(err => {
                    console.log("error when fetching sell quantity ", err);
                });
        } catch (e) {
            console.log("Selling Quantity Function Error", e);
        }
    }

    const sellFunction = (data) => {
        try {
            fetch('https://stock-web-app-node-backend.vercel.app/portfolio/sell-stock', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ticker: data.ticker,
                    name: data.company_name,
                    quantity: quantity,
                    change: data.change,
                    avg_cost_share: (quantity * data.current_price) / quantity,
                    current_price: (data.current_price),
                    total_cost: (quantity * data.current_price),
                    market_value: (quantity * data.current_price),
                    main_balance: mainBalance
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setMainBalance(data);
                    setQuantity(1);
                    setShowSellModal(false);
                    setStockSold(true);
                    FetchPortfolioData();
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 1000);
                }).catch(err => {
                console.log("Sell Function", err);
            })
        } catch (e) {
            console.log("Sell Function Frontend error", e);
        }
    }


    return (
        <div className={'d-flex justify-content-center'} style={{minHeight: "85vh"}}>
            <div className={'d-flex flex-column col-lg-8 col-10 mt-lg-4 mt-2 pt-4'}>
                {
                    stockBought &&
                    <div
                        className={'d-flex flex-row col-lg-12 col-11 bg-success border border-1 border-success rounded bg-opacity-25 mt-1 mb-2 pt-2 pb-2'}>
                        <div
                            className={"d-flex col-11 justify-content-center align-items-center text-success fw-medium"}> {buyDataModal.ticker} bought
                            successfully.
                        </div>
                        <div className={'d-flex col-1 justify-content-end align-items-center'}>
                            <button onClick={() => setStockBought(false)} className={"me-3"}><i
                                className={"bi bi-x-lg"}></i></button>
                        </div>

                    </div>
                }
                {
                    stockSold &&
                    <div
                        className={'d-flex flex-row col-lg-12 col-11 bg-danger border border-1 border-danger rounded bg-opacity-25 mt-1 mb-2 pt-2 pb-2'}>
                        <div
                            className={"d-flex col-11 justify-content-center align-items-center text-danger fw-medium"}> {sellDataModal.ticker} sold
                            successfully.
                        </div>
                        <div className={'d-flex col-1 justify-content-end align-items-center'}>
                            <button onClick={() => setStockSold(false)} className={"me-3"}><i
                                className={"bi bi-x-lg"}></i></button>
                        </div>

                    </div>
                }
                {
                    loading &&
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                }
                {
                    !loading &&
                    <div className={'fs-3 fw-bold col-12'}>
                        <p className={'mb-0 fw-medium'}>My Portfolio</p>
                        <p className={'fs-4 fw-medium'}>Money in Wallet: $<span>{mainBalance.toFixed(2)}</span></p>
                        {
                            portfolioData.length === 0 &&
                            <div
                                className={'d-flex col-12 text-bg-warning bg-opacity-25 border border-1 border-warning justify-content-center align-items-center'}>
                                <p className={'mt-3 fs-6 p-lg-0 ps-2 fw-medium'}>Currently you don't have any stock.</p>
                            </div>
                        }
                    </div>
                }
                <div className={'d-flex flex-column col-12'}>
                    {
                        !loading &&

                        PortfolioFetchedData.map((item, key) => {
                            return (
                                <div key={key}
                                     className={'d-flex flex-column col-12 border border-1 border-black rounded border-opacity-25 mb-3 '}>
                                    <div
                                        className={'d-flex flex-row pt-1 pb-1 col-12 border-bottom border-1 justify-content-start align-items-center bg-body-secondary bg-opacity-50'}>
                                        <p className={'d-flex ps-2  fs-5 mb-0 '}>{item.ticker}</p>
                                        <p className={'d-flex ps-2 fs-6  mb-0'}> {item.company_name}</p>
                                    </div>
                                    <div className={'d-flex flex-lg-row flex-column col-12 mt-2 mb-2'}>
                                        <div className={'d-flex flex-column col-lg-6 col-10 '}>
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td className={'fw-bold w-75 ps-2'}>Quantity:</td>
                                                    <td className={'w-25 fw-medium'}>{item.quantity}</td>
                                                </tr>
                                                </tbody>
                                                <tbody>
                                                <tr>
                                                    <td className={'fw-bold w-75 ps-2'}>Avg. Cost / Share:</td>
                                                    <td className={'w-25 fw-medium'}>{item.avg_cost_share.toFixed(2)}</td>
                                                </tr>
                                                </tbody>
                                                <tbody>
                                                <tr>
                                                    <td className={'fw-bold w-75 ps-2'}>Total Cost:</td>
                                                    <td className={'w-25 fw-medium'}>{item.total_cost.toFixed(2)}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={'d-flex flex-column col-lg-6 col-10 '}>
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td className={`fw-bold w-75 ps-2 `}>Change:</td>
                                                    <td className={`w-25 fw-medium ${item.avg_cost_share - item.current_price === 0 ? "":(item.current_price - item.avg_cost_share > 0 ? "bi bi-caret-up-fill text-success ": "bi bi-caret-down-fill text-danger ") }`}> {(item.current_price - item.avg_cost_share).toFixed(2)}</td>
                                                </tr>
                                                </tbody>
                                                <tbody>
                                                <tr>
                                                    <td className={'fw-bold w-75 ps-2'}>Current Price:</td>
                                                    <td className={`w-25 fw-medium ${item.avg_cost_share === item.current_price ? "": (item.avg_cost_share > item.current_price ? "text-danger":" text-success")}`}>{item.current_price.toFixed(2)}</td>
                                                </tr>
                                                </tbody>
                                                <tbody>
                                                <tr>
                                                    <td className={'fw-bold w-75 ps-2'}>Market Value:</td>
                                                    <td className={`w-25 fw-medium ${item.total_cost === item.market_value ? "": (item.total_cost < item.market_value ? "text-success":"text-danger")}`}>{item.market_value.toFixed(2)}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div
                                        className={'d-flex flex-row border-top border-1 p-2 bg-body-secondary bg-opacity-50'}>
                                        <button className={'btn btn-primary ps-3 pe-3'} onClick={() => {
                                            setShowBuyModal(true);
                                            setStockSold(false);
                                            setQuantity(0);
                                            setBuyDataModal(item);
                                            setStockBought(false);
                                        }}>Buy
                                        </button>
                                        <button className={'btn btn-danger ms-2 ps-3 pe-3'} onClick={() => {
                                            setShowSellModal(true);
                                            setStockBought(false);
                                            setStockSold(false);
                                            setQuantity(0);
                                            setSellDataModal(item);
                                            sellQuantityFunction(item.ticker);
                                        }}>Sell
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    }
                    {/* BUYING MODAL */}
                    <Modal show={showBuyModal}>
                        <ModalHeader>
                            <div className={'d-flex flex-row col-12'}>
                                <div className={'col-11 fw-bold'}>{buyDataModal.ticker}</div>
                                <div className={'col-1 d-flex justify-content-end'}>
                                    <button className={'border-bottom border-1 border-primary'}>
                                        <i className={'bi bi-x-lg link-primary'}
                                           onClick={() => {
                                               setShowBuyModal(false);
                                               setQuantity(1);
                                           }}></i>
                                    </button>
                                </div>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <div className={'col-12 p-2'}>
                                <p className={'fw-bold mb-0'}>Current Price: {buyDataModal.current_price}</p>
                                <p className={'fw-bold mb-0'}>Money in Wallet: ${mainBalance.toFixed(2)}</p>
                                <p className={'fw-bold mb-0'}>Quantity: <input type={'number'} value={quantity} min={0}
                                                                               onChange={(e) => {
                                                                                   setQuantity(e.target.value)
                                                                               }}/></p>
                                {((quantity * buyDataModal.current_price) > mainBalance) &&
                                    <p className={'text-danger fs-6 fw-medium'}>Not Enough money in Wallet.</p>}
                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <div
                                className={`d-flex flex-row col-12 ${quantity * buyDataModal.current_price > mainBalance ? " opacity-50" : ""} ${parseInt(quantity) ===0 ? "disabled opacity-50": ""}`}>
                                <div className={'d-flex col-11 justify-content-start align-content-center'}>
                                    <p className={'fw-bold'}>Total
                                        Cost: {(quantity * buyDataModal.current_price).toFixed(2)}</p>
                                </div>
                                <div className={'col-1 d-flex justify-content-end'}>
                                    <button
                                        className={`btn btn-success ${quantity * buyDataModal.current_price > mainBalance ? "disabled" : ""} ${parseInt(quantity) ===0 ? "disabled": ""}`}
                                        onClick={() => {
                                            buyFunction(buyDataModal);
                                        }}
                                    >
                                        Buy
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
                                        onClick={() => {
                                            setShowSellModal(false);
                                            setSellQuantity(0);
                                            setQuantity(1);
                                        }}></i></button>
                                </div>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <div className={'col-12 p-2'}>
                                <p className={'fw-bold mb-0'}>Current Price: {sellDataModal.current_price}</p>
                                <p className={'fw-bold mb-0'}>Money in Wallet: ${mainBalance.toFixed(2)}</p>
                                <p className={'fw-bold mb-0 '}>Quantity:<input type={'number'} min={0} value={quantity}
                                                                               onChange={(e) => {
                                                                                   setQuantity(e.target.value)
                                                                               }}/></p>

                                {
                                    sellQuantity < quantity &&
                                    <p className={'text-danger fs-6 fw-medium'}>You cannot sell the stocks that you
                                        don't
                                        have!</p>
                                }

                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <div className={'d-flex flex-row col-12'}>
                                <div
                                    className={`d-flex col-11 justify-content-start align-content-center ${sellQuantity < quantity ? "opacity-50" : ""} ${parseInt(quantity) ===0 ? "disabled opacity-50": ""}`}>
                                    <p className={'fw-bold '}> Total
                                        Cost: {(quantity * sellDataModal.current_price).toFixed(2)}</p>
                                </div>
                                <div className={`col-1 d-flex justify-content-end `}>
                                    <button className={`btn btn-success ${sellQuantity < quantity ? "disabled" : ""} ${parseInt(quantity) ===0 ? "disabled": ""}`}
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
            </div>
        </div>
    );
};

export default PortfolioPage;
