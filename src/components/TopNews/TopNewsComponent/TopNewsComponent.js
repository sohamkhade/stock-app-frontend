import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import NewsModal from "../NewsModal/NewsModal";
import './TopNewsComponent.css';

function TopNewsComponent(props) {
    const [topNewsData, setTopNewsData] = useState(props.topNewsData);
    const [showModal, setShowModal] = useState(false);
    const [newsModal, setNewsModal] = useState(null);
    useEffect(() => {
        setTopNewsData(props.topNewsData);
    }, [topNewsData]);
    const handleModalClose = () => {
        setShowModal(false);
        setNewsModal(null);
    }

    const handleModalShow = (data) => {
        setShowModal(true);
        setNewsModal(data);
    }
    return (
        <div>
            {topNewsData.slice(0, 20).reduce((rows, item, index) => {
                if (index % 2 === 0) {
                    rows.push([item]);
                } else {
                    rows[rows.length - 1].push(item);
                }
                return rows;
            }, []).map((row, rowIndex) => (

                <div key={rowIndex} className={'d-flex flex-lg-row flex-column col-12 mt-lg-2 justify-content-center align-items-center'}>
                    {row.map((item, colIndex) => (
                        <>
                            <div key={colIndex}
                                 className={'d-flex flex-lg-row flex-column col-lg-6 col-11 mt-lg-0 mt-2 ms-lg-1 me-lg-1 justify-content-center align-items-center border border-secondary border-opacity-50 rounded-2 bg-body-secondary bg-opacity-25 p-3 '}
                                 onClick={(e) => {
                                     handleModalShow(item)
                                 }}

                            >
                                <div className={'d-flex col-lg-3 col-12'} >
                                    <img src={item.image} className={'col-12'}
                                         alt={item.headline}
                                         // style={{objectFit: "cover"}}
                                         style={{
                                             objectFit: "fill",
                                             minHeight: "100px", // Set your desired fixed height here
                                             maxHeight: "300px", // Ensure the image doesn't exceed its container's height
                                             width: "100%", // Ensure the image fills its container horizontally
                                             height: "auto"
                                         }}
                                    />
                                </div>

                                <div
                                    className={'d-flex flex-row col-lg-9 col-12 justify-content-center align-items-center'}>
                                    <p className={'text-center fw-normal fs-6 text-center ps-lg-4 pe-lg-4 mb-lg-0 mb-0'}>{item.headline}</p>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            ))}
            {/* Add additional content for tab 2 if needed */}
            <NewsModal showModal = {showModal} newsModal = {newsModal} closeModal = {handleModalClose}/>
        </div>
    );
}

export default TopNewsComponent;