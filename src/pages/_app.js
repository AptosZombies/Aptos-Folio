import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import {
  HippoExtensionWalletAdapter,
  MartianWalletAdapter,
  AptosWalletAdapter,
  FewchaWalletAdapter,
  WalletProvider,
  PontemWalletAdapter,
} from '@manahippo/aptos-wallet-adapter';
import { useMemo } from 'react';

function MyApp({ Component, pageProps }) {
  const wallets = useMemo(
    () => [
      // new HippoWalletAdapter(),
      new HippoExtensionWalletAdapter(),
      new MartianWalletAdapter(),
      new AptosWalletAdapter(),
      new FewchaWalletAdapter(),
      new PontemWalletAdapter(),
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
