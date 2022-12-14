import { Modal } from "react-bootstrap"
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
export default function WalletSelector({ show, setShow }) {

    const [isOptionsMore, setIsOptionMore] = useState(false);
    const handleClose = () => setShow(false);
    const {
        wallets,
        connect
    } = useWallet();

    useEffect(() => {
        sortInstalledWallet();
    }, []);

    const handleConnectWallet = async (name, readyState, url) => {
        if (readyState == "Installed") {
            toast.promise(
                connect(name),
                {
                    pending: 'Connecting to Wallet',
                    success: 'Wallet Connected!',
                    error: 'User Rejected'
                }
            )
            setIsOptionMore(false);
            setShow(false);
        } else {
            window.open(url, '_blank');
        }
    }

    const sortInstalledWallet = () => {
        wallets.sort((a, b) => {
            if (a.readyState < b.readyState) {
                return -1;
            }
            if (a.readyState > b.readyState) {
                return 1;
            }
            return 0;
        })
    }

    return (
        <div>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Body style={{ background: "#3E4551", borderRadius: "10px" }}>
                    <div>
                        <div className="container text-center">
                            <h4 className="mt-4 fw-bold">Connect Wallet</h4>
                        </div>
                        <div className="container mt-4">
                            {
                                wallets.map((wallet) => {
                                    return (<div key={wallet.adapter["name"]} onClick={async () => { await handleConnectWallet(wallet.adapter["name"], wallet.readyState, wallet.adapter["url"]) }} style={{ height: "80px", marginBottom: "20px" }} className={wallet.readyState == "Installed" ? "d-flex justify-content-between p-4 align-items-center wallet-select btn btn-primary" : "d-flex justify-content-between p-4 align-items-center wallet-select wallet-not-installed d-none btn btn-primary"}>
                                        <div className="d-flex align-items-center">
                                            <img src={wallet.adapter["name"] == 'Fletch' ? "https://play-lh.googleusercontent.com/gDJDAI3PSjcbxMAdZz3YpP29VwNRwR4u34nC4vvp410LPqPSjNSiZZhQFcYPZegPeQ=w240-h480-rw" : wallet.adapter["icon"]} height="35" width="35" ></img>
                                            <h5 className="mt-2 mx-3 fw-bold">{wallet.adapter ? wallet.adapter["name"] : ""}</h5>
                                        </div>
                                        <div>
                                            {
                                                wallet.readyState == "Installed" ? (
                                                    <span className="badge bg-success mx-3" style={{ fontSize: "12px" }}>{wallet.readyState}</span>
                                                )
                                                    : <></>
                                            }
                                            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "30px", height: "30px", }} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
