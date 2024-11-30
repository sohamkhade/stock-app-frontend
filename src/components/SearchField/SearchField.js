import React, {Component, useEffect, useState} from 'react';
import './SearchField.css';
import {useNavigate, useParams} from "react-router-dom";
import * as events from "events";
import {useDispatch, useSelector} from "react-redux";
import * as searchActions from "../../redux/actions/searchActions/searchActions";


// class SearchField extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {name: "", searchNameList: [], display: false, loading: false, controller: null};
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (prevState.name !== this.state.name) {
//             this.setState({ stockDetails: this.props.stockDetails });
//         }
//     }
//
//     printData = (name) => {
//         if (this.state.controller) {
//             this.state.controller.abort(); // Abort previous fetch request if any
//         }
//         const controller = new AbortController();
//         const signal = controller.signal;
//         if (name !== "") {
//             this.setState({name: name, controller: controller });
//             console.log(name);
//             this.state.name = name;
//             this.state.loading = true;
//             fetch(`/company/search/${this.state.name}`, {signal}).then(response => response.json())
//                 .then(data => {
//                     console.log("Fetching");
//                     console.log(data);
//                     this.setState({
//                         name: name,
//                         searchNameList: data,
//                         display: true,
//                         loading: false
//                     });
//                     console.log("State:", this.state.searchNameList);
//                 }).catch(e => {
//                     if(e == "AbortError"){
//                         console.log("Error Abort");
//                     }
//                     console.log(e, "Error Occured");
//             });
//         } else {
//             console.log("Empty");
//             this.state.name = "";
//         }
//     }
//     handleSumbit = (e) => {
//         e.preventDefault();
//         console.log("Submit button triggered");
//         this.state.searchNameList = [];
//         this.props.onSumbit(this.state.name);
//         e.target.value = this.state.name;
//         this.state.display = false;
//     }
//
//     handleInputField = (e, name) => {
//         e.preventDefault();
//         this.state.name = name;
//
//     }
//
//     handleReset = (e) => {
//         e.preventDefault();
//         console.log("search reset btn triggered");
//         this.props.onClear("");
//         e.target.value = "";
//         this.state.name = "";
//         this.state.searchNameList = [];
//         this.state.display = false;
//         this.state.loading = false;
//     }
//
//     render() {
//         return (
//             <div className={'d-flex flex-column justify-content-center align-items-center mt-lg-4'}>
//                 <h1>STOCK SEARCH</h1>
//                 <form className={'d-flex flex-column w-50'} onSubmit={this.handleSumbit}>
//                     {/*<div className={'d-flex flex-column'}>*/}
//                     {/*    <input placeholder={'Enter stock ticker Symbol'} type={'text'} className={'fs-5 '} required/>*/}
//                     {/*</div>*/}
//
//                     {/*<button className={'search-button w-10'} type={''}><i className="bi bi-search  fs-5"></i></button>*/}
//                     {/*<button className={'clear-button w-10'} type={'reset'}><i className="bi bi-x fs-5"></i></button>*/}
//                     <div className="input-group">
//                         <input style={{border: "3px solid #2729b3", borderRadius: "30px",}} type="text"
//                                value={this.state.name}
//                                className="form-control" placeholder="Enter stock ticker symbol"
//                                aria-label="" onChange={(e) => {
//                             this.printData(e.target.value)
//                         }} required/>
//                         <div style={{marginLeft: "-90px", zIndex: 15}}>
//                             <button className="btn" type="submit" onSubmit={this.handleSumbit}>
//                                 <i className="bi bi-search"></i>
//                             </button>
//                             <button className="btn" type="reset" onClick={this.handleReset}>
//                                 <i className="bi bi-x-lg"></i>
//                             </button>
//                         </div>
//                     </div>
//                     {
//                         this.state.loading === true &&
//                         <div className={"position-relative d-flex flex-column"}
//                              style={{height: "200px"}}>
//                             <div className="spinner-border text-secondary" role="status">
//                                 <span className="sr-only"></span>
//                             </div>
//                         </div>
//                     }
//                     {
//                         this.state.display == true && this.state.loading == false &&
//                         <div className={"position-relative d-flex flex-column shadow"}
//                              style={{height: "200px", overflowY: "auto"}}>
//                             {
//                                 this.state.searchNameList.length > 0 &&
//                                 this.state.searchNameList.map((item, idx) => {
//                                     return (<button className="btn text-start" key={idx}
//                                                     onClick={(e) => {
//                                                         this.state.name = item.ticker;
//                                                         this.state.display = false;
//                                                     }}>{item.ticker} | {item.name}</button>)
//                                 })
//                             }
//                         </div>
//                     }
//                 </form>
//             </div>
//         );
//     }
// }

const SearchField = (props) => {
    let string_ticker = window.localStorage.getItem("ticker") !== null ? window.localStorage.getItem("ticker").toString(): "";
    if(string_ticker !== "")
        string_ticker = string_ticker.substring(1, string_ticker.length -1);
    const [name, setName] = useState(  string_ticker);
    const [searchNameList, setSearchNameList] = useState([]);
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState(null);
    const params = useParams();
    const search = useSelector(state => state.search);
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const [emptyMessage, setEmptyMessage] = useState(false);
    const [dataAvailable, setDataAvailable] = useState(false);

    useEffect(() => {
        return () => {
            if (controller) {
                controller.abort();
            }
        };
    }, []);

    useEffect(() => {
        if(window.localStorage.getItem("ticker") !== null ){
            const params_name = JSON.parse(window.localStorage.getItem("ticker"));
            navigate(`/search/${params_name}`);
        }
    }, []);

    useEffect(() => {
        if (params.name !== 'home' && params.name !== "" && params.name !== undefined) {
            setName(params.name);
            console.log("Params name:",name);
            props.onSumbit(params.name);
        }
    }, [params, name]);

    useEffect(() => {
        if(name === ""){
            setLoading(false);
            setSearchNameList([]);
            if (controller) {
                controller.abort();
            }
        }
    }, [name]);

    const printData = (name) => {
        if (controller) {
            controller.abort();
        }
        const abortController = new AbortController();
        const signal = abortController.signal;
        if (name !== "") {
            setName(name);
            setLoading(true);
            window.localStorage.clear();
            fetch(`https://stock-web-app-node-backend.vercel.app/company/search/${name}`, { signal })
                .then(response => response.json())
                .then(data => {
                    setSearchNameList(data);
                    setDisplay(true);
                    setLoading(false);
                }).catch(e => {
                if (e === "AbortError") {
                    console.log("Error Abort");
                }
                console.log(e, "Error Occurred");
            });
        } else {
            setName("");
        }
        setController(abortController);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        setLoading(false);
        if(name === ""){
            setEmptyMessage(true);
        }else{
            fetch(`https://stock-web-app-node-backend.vercel.app/company/check/${name}`)
                .then(res => res.json())
                .then(data => {
                    if(data === "no data"){
                        console.log(data);
                        setDataAvailable(true);
                    }else{
                        console.log("triggering");
                        console.log("Submitting: name", name);
                        props.onSumbit(name);
                        setDisplay(false);
                        setEmptyMessage(false);
                        navigate(`/search/${name}`);
                    }
            });
            // console.log("triggering");
            // e.preventDefault();
            // console.log("Submitting: name", name);
            // props.onSumbit(name);
            // setDisplay(false);
        }

        // dispatch(searchActions.changeSearch(name));
    };

    const handleReset = (e) => {
        e.preventDefault();
        props.onClear("");
        setName("");
        navigate('/search/home');
        setSearchNameList([]);
        setDisplay(false);
        setLoading(false);
        setEmptyMessage(false);
        setDataAvailable(false);
        dispatch(searchActions.changeSearch(""));
    };

    return (
        <div className={'d-flex flex-column justify-content-center align-items-center'}>
            <div className={'fs-3 mt-lg-0 mt-4 pt-lg-4'}>STOCK SEARCH</div>
            <form className={'d-flex flex-column col-lg-5 col-10  mt-3'} onSubmit={handleSumbit}>
                <div className="input-group">
                    <input style={{border: "3px solid #2729b3", borderRadius: "30px"}} type="text"
                           value={name} className="form-control" placeholder="Enter stock ticker symbol"
                           aria-label="" onChange={(e) => {
                        printData(e.target.value)
                    }}/>
                    <div style={{marginLeft: "-90px", zIndex: 15}}>
                        <button className="btn" type="submit">
                            <i className="bi bi-search"></i>
                        </button>
                        <button className="btn" type="reset" onClick={handleReset}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>
                {loading && (
                    <div className={"position-relative d-flex flex-column"} >
                        <div className="spinner-border text-secondary" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                )}
                {display && !loading && searchNameList.length > 0 && (
                    <div className={"position-relative d-flex ms-2  flex-column shadow col-9"}
                         style={{ height: "100px", overflowY: "auto",marginTop:"", }}>
                        {searchNameList.length > 0 && searchNameList.map((item, idx) => (
                            <button className="btn text-start" key={idx} onClick={() => setName(item.ticker)}>
                                {item.ticker} | {item.name}
                            </button>
                        ))}
                    </div>
                )}
            </form>
            {
                emptyMessage &&
                <div className={'d-flex flex-row col-lg-9 col-11 bg-danger border border-1 border-danger rounded bg-opacity-25 mt-4 pt-2 pb-2'}>
                    <div className={"d-flex col-11 justify-content-center align-items-center"}>Please enter a valid ticker. </div>
                    <div className={'d-flex col-1 justify-content-end align-items-center'}>
                        <button onClick={() => setEmptyMessage(false)} className={"me-3"}><i className={"bi bi-x-lg"}></i></button>
                    </div>
                </div>
            }
            {
                dataAvailable &&
                <div className={'d-flex flex-row col-lg-9 col-11 bg-danger border border-1 border-danger rounded bg-opacity-25 mt-4 pt-2 pb-2'}>
                    <div className={"d-flex col-12 justify-content-center align-items-center"}>No data found. Please enter a valid ticker.</div>
                    {/*<div className={'d-flex col-1 justify-content-end align-items-center'}>*/}
                    {/*    <button onClick={() => setDataAvailable(false)} className={"me-3"}><i className={"bi bi-x-lg"}></i></button>*/}
                    {/*</div>*/}
                </div>
            }
        </div>
    );
};


export default SearchField;

