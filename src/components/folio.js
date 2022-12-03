import { getNftByOwner, GetStaked } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import Card from './card';
import { toast } from 'react-toastify';

export default function AptosNFTs() {

    const [listNfts, setListNfts] = useState([]);
    const [listNftss, setListNftss] = useState([]);
    const [isLoadings, setIsLoadings] = useState(true);
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
            let nftss = await GetStaked(account.address);
            setIsLoading(false);
            setListNfts(nfts ? nfts : []);
            setListNftss(nftss ? nftss : []);
            setIsLoadings(false);
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
                            <h4 className="fw-bold">NFTs in your wallet({listNfts.length + listNftss.length})</h4>
                            {/* <button className="btn btn-purple text-end" style={{ fontSize: "14px" }} onClick={handleStakeAll} >Stake All</button> */}
                        </div>
                        <div className="row">
                            {
                                listNfts.map((nft) => {
                                    return <Card key={nft.creator + "::" + nft.collection_name + "::" + nft.token_name} nft={nft} loadNft={init} />
                                })
                            }
                        </div>
                        <div className="row">
                            {
                                listNftss.map((nft) => {
                                    return <Card key={nft.creator + "::" + nft.collection + "::" + nft.token_name} nft={nft} loadNft={init} />
                                })
                            }
                        </div>
                        <div className={ isLoadings ? "d-flex justify-content-center" : "d-none"}>
                            <div className="spinner-grow" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
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
