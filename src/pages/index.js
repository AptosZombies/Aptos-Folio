import AptosNFTs from '@/components/folio';
import WalletSelector from '@/components/walletSelector';
import { getStat } from '@/utils/utils';
// import { getBalance } from '@/utils/utils';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [show, setShow] = useState(false);
  // const [balance, setBalance] = useState(0);

  const {
    disconnect,
    account,
    connected,
    wallet
  } = useWallet();

  useEffect(() => {
    init();
  }, [connected]);

  const init = async () => {
    try {
      // if (connected) {
      //   let balance = await getBalance(account.address);
      //   setBalance(balance);
      // }
      let stat = await getStat();
      console.log(stat);
      setValueLocked(stat ? stat["value_locked"] : 0);
      setTotalReward(stat ? stat["total_reward"] : "0");
    } catch (error) {
      //toast.error("Please refresh your page");
      console.log("error");
    }
  }
  const disconectWallet = () => {
    toast.promise(
      disconnect(),
      {
        pending: 'Disconnecting to Wallet',
        success: 'Wallet Disconected!',
        error: 'User Rejected'
      }
    )
  }

  return (
    <div>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-md navbar-dark">
            <a class="navbar-brand heading-black" href="#">
                Zombie Labs
            </a>
            <button class="navbar-toggler navbar-toggler-right border-0" type="button" data-toggle="collapse"
                    data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span data-feather="grid"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="https://linktr.ee/aptoszombies">Learn More</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link page-scroll d-flex flex-row align-items-center text-primar btn btn-primary"  style={{ color:"#080808" }} href="#">
                            Aptos-Folio
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>

      <div className="row container m-auto">
        <div className="col-12" style={{ marginTop: "35px", minHeight: "88vh" }}>
          {
            connected ? <div>
              <div className="row text-white mb-4" style={{ marginTop: "80px" }}>
                <div className="text-center">
                  <h1>Aptos-Folio</h1>
                  <h4 className="fw-bold">Click and connect all your Aptos NFTs</h4>
                </div>
              </div>
              <AptosNFTs />
            </div> :
              <div className="text-white text-center" style={{ marginTop: "35vh" }} >
                <div className="col-12" style={{ marginBottom: "85px" }}>
                  <div className="row text-white">
                    <div className="text-center">
                      <h1>Aptos-Folio</h1>
                      <h4 className="fw-bold">Click and connect all your Aptos NFTs</h4>
                    </div>
                  </div>
                </div>

                {/* <h5>and Get $APT</h5> */}
                <button className="btn btn-primary" style={{ fontSize: "11pt" }} onClick={() => { setShow(true) }} >Connect Wallet</button>
              </div>
          }
        </div>

        <footer className="text-white my-4 text-center">
          {/* <h6><svg data-name="Icon Logo" style={{ height: "15", width: "15", marginBottom: "2px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" fill="white">
            <path d="M46.47,20.07H41.16a2.15,2.15,0,0,1-1.61-.72l-2.16-2.42a1.69,1.69,0,0,0-2.53,0L33,19a3.21,3.21,0,0,1-2.39,1.07h-29A30.26,30.26,0,0,0,0,27.48H27.42a1.78,1.78,0,0,0,1.28-.54l2.56-2.66a1.67,1.67,0,0,1,1.22-.52h.1a1.7,1.7,0,0,1,1.27.57L36,26.75a2.17,2.17,0,0,0,1.61.73H60a30.26,30.26,0,0,0-1.58-7.41h-12Z"></path> <path d="M16.6,43.05a1.78,1.78,0,0,0,1.27-.54l2.56-2.66a1.7,1.7,0,0,1,1.22-.52h.1A1.7,1.7,0,0,1,23,39.9l2.15,2.42a2.14,2.14,0,0,0,1.62.73H57.12a29.73,29.73,0,0,0,2.47-7.48H30.47a2.17,2.17,0,0,1-1.62-.72L26.7,32.42a1.69,1.69,0,0,0-2.53,0L22.32,34.5a3.18,3.18,0,0,1-2.38,1.07H.41a29.73,29.73,0,0,0,2.47,7.48Z"></path> <path d="M38.12,12a1.74,1.74,0,0,0,1.27-.54L42,8.78a1.69,1.69,0,0,1,1.22-.51h.1a1.69,1.69,0,0,1,1.27.56l2.15,2.43a2.17,2.17,0,0,0,1.62.72h5.77A30.19,30.19,0,0,0,5.92,12Z"></path> <path d="M26.53,50.46H18.64A2.17,2.17,0,0,1,17,49.74l-2.15-2.43a1.71,1.71,0,0,0-2.53,0l-1.85,2.08a3.18,3.18,0,0,1-2.38,1.07H8a30.16,30.16,0,0,0,44,0Z">
            </path>
          </svg> Powered by Aptos</h6> */}
          <span>Copyright ?? 2022. All rights reserved.</span>
        </footer>

        <WalletSelector show={show} setShow={setShow} />
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </div>
    </div>
  )
}
