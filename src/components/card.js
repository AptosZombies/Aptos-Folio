import { useEffect } from 'react';

export default function Card({ nft, loadNft }) {
    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        loadNft();
    }

    return (
        <div className="col-6 col-sm-4 col-md-3 col-lg-2" style={{ cursor: "pointer" }} title={nft.token_name}>
        <script type="application/javascript" src="../x.js"></script>
            <div className="card my-3">
                <img src={nft.preview_uri} onError={(e) => { e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHxakjqVkH0alEr1LYPPv-860HTUEX23gE-w&usqp=CAU" }} className="card-img-top" alt="..." ></img>
                <div className="card-body text-start text-dark nc-NcImage" data-nc-id="NcImage">
                    <h6 className="card-title fw-bold text-truncate" style={{ fontSize: "10px" }} >{nft.collection_name}</h6>
                    <h6 className="card-title fw-bold text-truncate" style={{ fontSize: "10px" }} >{nft.token_name}</h6>
                </div>
            </div>
        </div>
    )
}
