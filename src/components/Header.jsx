import ethlogo from '../assets/ethlogo.png';
import { useState } from 'react';

const Header = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet. See console for details.');
      }
    } else {
      alert('Please install MetaMask to use this dApp!');
    }
  };

  return (
    <nav className="w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto">
      <div className="flex flex-row justify-start items-center md:flex-[0.5] flex-initial">
        <img className="w-8 cursor-pointer" src={ethlogo} alt="logo" />
        <span className="text-white text-2xl ml-2">Gwill</span>
      </div>

      <ul className="md:flex md:flex-[0.5] text-white hidden list-none flex-row justify-between items-center flex-initial">
        <li className="mx-4 cursor-pointer">Explore</li>
        <li className="mx-4 cursor-pointer">Features</li>
        <li className="mx-4 cursor-pointer">Community</li>
      </ul>

      {account ? (
        <span className="text-white">{account.slice(0, 6)}...{account.slice(-4)}</span>
      ) : (
        <button
          className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2 rounded-full cursor-pointer"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </nav>
  );
};

export default Header;