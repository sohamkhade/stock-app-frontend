import React, {useDebugValue, useEffect, useState} from 'react';
import {connect, useSelector, useDispatch} from "react-redux";
import * as toDoAction from "../redux/actions/toDoActions";

function Present() {
    const ticker = useSelector(state => state.ticker);
    const [tickerName, setTickerName] = useState(ticker);
    const dispatch = useDispatch();

    useEffect(() => {
        // Update tickerName when ticker changes
        setTickerName(ticker);
    }, [ticker]);
    const handleChange = (e) => {
        setTickerName(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(toDoAction.changeTickerName(tickerName));
    }

    const handleReset = (e) => {
        e.preventDefault();
        dispatch(toDoAction.changeTickerName(""));
        setTickerName("");
    }
    console.log(ticker);
    return (
        <div className={'d-flex flex-row justify-content-center align-items-center'}>
            <form onSubmit={handleSubmit}>
                <input type={'text'} value={tickerName} placeholder={'Enter text'} onChange={(e) => {
                    handleChange(e);
                }}/>
                <button type={'submit'} className={'btn btn-success'}>submit</button>
                <button type={'reset'}  className={'btn btn-danger'} onClick={handleReset}>reset</button>
            </form>
        </div>
    );
}

export default Present;