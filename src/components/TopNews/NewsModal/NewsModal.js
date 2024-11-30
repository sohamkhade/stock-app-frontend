import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";

function NewsModal(props) {
    const [showModal, setShowModal] = useState(props.showModal)
    const [newsModal, setNewsModal] = useState(props.newsModal);
    useEffect(() => {
        setShowModal(props.showModal);
        setNewsModal(props.newsModal);
    }, [props.showModal, props.newsModal]);

    const closeModal = () => {
        props.closeModal();
    }
    return (
        <div>{
            showModal && newsModal &&
            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title className={'w-100'}>
                        <div className={'d-flex flex-row w-100'}>
                            <div className={'w-75'}>
                                <p className={'fs-4 mb-1 fw-bold'}>{newsModal.source}</p>
                                <p className={'fs-6 mb-0'}>{newsModal.formattedDate}</p>
                            </div>
                            <div className={'w-25 d-flex justify-content-end align-items-center'}>
                                <button className={'border-bottom border-primary'}
                                        onClick={closeModal}><u
                                    className="bi bi-x-lg link-primary text-decoration-underline"></u>
                                </button>
                            </div>
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'d-flex flex-column'}>
                        <p className={'fs-5 fw-bold mb-1'}>{newsModal.headline}</p>
                        <p className={'mb-1'}>{newsModal.firstSentence}.</p>
                        <p className={'mb-1'}>For more details click <a href={`${newsModal.url}`}
                                                                        target={"_blank"}>here</a></p>
                        <div
                            className={'d-flex flex-column  border rounded border-2 border-radius border-black p-2 mt-4'}>
                            <div className={'fs-6'}>
                                Share
                            </div>
                            <div className={'d-flex flex-row pt-4'}>
                                <button><a className="text-black"
                                           href={`https://twitter.com/intent/tweet?url=${newsModal.url}&text=${newsModal.headline}`}
                                           target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                         fill="currentColor" className="bi bi-twitter-x"
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                                    </svg>
                                </a>
                                </button>

                                <button className={'ms-2'}><a className=""
                                                              href={`https://www.facebook.com/sharer/sharer.php?u=${newsModal.url}&quote=${newsModal.headline}`}
                                                              target={"_blank"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                         fill="currentColor" className="bi bi-facebook"
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                                    </svg>
                                </a>
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        }
        </div>
    );

}

export default NewsModal;