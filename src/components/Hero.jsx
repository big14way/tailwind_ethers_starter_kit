import avatar from "../assets/owner.jpeg";
import { FaCheckCircle } from "react-icons/fa";
import github from "../assets/github_icon.png";
import facebook from "../assets/facebook_icon.png";
import twitter from "../assets/twitter_icon.png";
import linkedIn from "../assets/linkedIn_icon.png";
import medium from "../assets/medium_icon.png";
import { useState } from 'react';
import { ethers } from 'ethers';
import contractAddress from '../abis/contractAddress.json';
import GwillABI from '../abis/Gwill.json';

const Hero = () => {
  const [loading, setLoading] = useState(false);

  const mintNFT = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to use this dApp!");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress.address, GwillABI, signer);
      const cost = await contract.cost();
      const tx = await contract.payToMint({ value: cost });
      await tx.wait();
      alert("NFT minted successfully!");
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Minting failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url('https://cdn.pixabay.com/photo/2022/02/11/15/48/astronaut-7007580_1280.jpg')] bg-no-repeat bg-cover">
      <div className="flex flex-col justify-center items-center mx-auto py-10">
        <h1 className="text-white text-5xl font-bold text-center">
          Gwill Arts <br />
          <span className="text-gradient">NFTs</span> Collection
        </h1>
        <p className="text-white font-semibold text-sm mt-3">
          Mint and collect the hottest NFTs around.
        </p>
        <button
          className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] p-2 rounded-full cursor-pointer my-4"
          onClick={mintNFT}
          disabled={loading}
        >
          {loading ? "Minting..." : "Mint Now"}
        </button>
        <a
          className="flex justify-center items-center space-x-2 bg-[#000000ad] rounded-full my-4 pr-3 cursor-pointer"
          href="https://github.com/big14way"
          target="_blank"
        >
          <img src={avatar} alt="Avatar" className="w-10 h-10 object-contain rounded-full" />
          <div className="flex flex-col font-semibold text-white text-sm">
            <span>0x5f...1234</span>
            <span className="flex flex-row items-center">
              <span className="text-[#e32970]">Gwill❤️‍🔥</span>
              <FaCheckCircle className="ml-1 text-blue-500" title="Verified" />
            </span>
          </div>
        </a>
        <p className="text-white text-sm font-medium text-center">
          I swapped JavaScript for Solidity, Rust, and Cairo. <br />
          My first smart contract—a simple wallet—sparked my blockchain passion. <br />
          Now, I build decentralized solutions, one line at a time.
        </p>
        <ul className="flex flex-row justify-center space-x-2 items-center my-4">
          <a className="bg-white hover:scale-105 transition-all duration-75 delay-75 rounded-full mx-2" href="https://github.com/big14way" target="_blank">
            <img className="w-7 h-7" src={github} alt="GitHub" />
          </a>
          <a className="bg-white hover:scale-105 transition-all duration-75 delay-75 rounded-full mx-2" target="_blank">
            <img className="w-7 h-7" src={facebook} alt="Facebook" />
          </a>
          <a className="bg-white hover:scale-105 transition-all duration-75 delay-75 rounded-full mx-2" href="https://x.com/Big14teru" target="_blank">
            <img className="w-7 h-7" src={twitter} alt="Twitter" />
          </a>
          <a className="bg-white hover:scale-105 transition-all duration-75 delay-75 rounded-full mx-2" target="_blank">
            <img className="w-7 h-7" src={linkedIn} alt="LinkedIn" />
          </a>
          <a className="bg-white hover:scale-105 transition-all duration-75 delay-75 rounded-full mx-2" href="https://medium.com/@Gwill_id" target="_blank">
            <img className="w-7 h-7" src={medium} alt="Medium" />
          </a>
        </ul>
        <div className="shadow-xl shadow-black flex items-center w-10 h-18 rounded-full bg-white cursor-pointer p-3 ml-4 text-black hover:bg-[#bd255f] hover:text-white transition-all duration-75 delay-100">
          <span className="text-sm font-bold">99</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;