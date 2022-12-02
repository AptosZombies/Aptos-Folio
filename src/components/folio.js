import { getNftByOwner } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import Card from './card';
import { toast } from 'react-toastify';

export default function AptosNFTs() {

    const [listNfts, setListNfts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {
        account
    } = useWallet();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            let nfts = await getNftByOwner(account.address);
            setIsLoading(false);
            setListNfts(nfts ? nfts : []);
        } catch (error) {
            toast.error("Please refresh your page");
        }
    }

    return (
        <div>
            <div className="row text-white">
                <div className="col-12">
                    <div className="mx-4">
                        <div className="d-flex justify-content-between">
                            <h4 className="fw-bold">NFTs in your wallet({listNfts.length})</h4>
                            {/* <button className="btn btn-purple text-end" style={{ fontSize: "14px" }} onClick={handleStakeAll} >Stake All</button> */}
                        </div>
                        <div className="row">
                            {
                                listNfts.map((nft) => {
                                    return <Card key={nft.creator + "::" + nft.collection_name + "::" + nft.token_name} nft={nft} loadNft={init} />
                                })
                            }
                        </div>
                        <div className={ isLoading ? "d-flex justify-content-center" : "d-none"}>
                            <div className="spinner-grow" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                </div>
            </div>
        </div>
    )
}