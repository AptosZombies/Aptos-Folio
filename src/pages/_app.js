import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import {
  WalletProvider,
  PontemWalletAdapter,
  HippoWalletAdapter,
  AptosWalletAdapter,
  HippoExtensionWalletAdapter,
  MartianWalletAdapter,
  FewchaWalletAdapter,
  SpikaWalletAdapter,
  RiseWalletAdapter,
  FletchWalletAdapter
} from '@manahippo/aptos-wallet-adapter';
import { useMemo } from 'react';

function MyApp({ Component, pageProps }) {
  const wallets = useMemo(
    () => [
    new PontemWalletAdapter(),
    new HippoWalletAdapter(),
    new MartianWalletAdapter(),
    new AptosWalletAdapter(),
    new FewchaWalletAdapter(),
    new HippoExtensionWalletAdapter(),
    new SpikaWalletAdapter(),
    new RiseWalletAdapter(),
    new FletchWalletAdapter()
    ],
    []
  );

  return (
    <WalletProvider
      wallets={wallets}
      onError={(error) => {
        console.log('wallet errors: ', error);
      }}
      autoConnect={false}>
      <Component {...pageProps} />
    </WalletProvider>
  )
}

export default MyApp
