import ethlogo from '../assets/ethlogo.png';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractAddress from '../abis/contractAddress.json';
import GwillABI from '../abis/Gwill.json';

const Artworks = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!window.ethereum) return;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress.address, GwillABI, provider);
      const allNFTs = await contract.getAllNFTs();
      const formattedNFTs = allNFTs.map(nft => ({
        id: nft.id.toNumber(),
        buyer: nft.buyer,
        cost: ethers.utils.formatEther(nft.cost),
        imageURL: nft.imageURL,
        timestamp: nft.timestamp.toNumber(),
      }));
      setNfts(formattedNFTs);
      setLoading(false);
    };

    fetchNFTs();
  }, []);

  if (loading) return <div className="text-white text-center py-10">Loading NFTs...</div>;

  return (
    <div className="bg-[#131835] py-10">
      <div className="w-4/5 mx-auto">
        <h4 className="text-gradient uppercase text-2xl">Artworks</h4>
        <div className="flex flex-wrap justify-center items-center mt-4">
          {nfts.map((nft, i) => (
            <a
              key={i}
              href={`https://ipfs.io/ipfs/YOUR_CID_HERE/${nft.id}.json`} // Replace with your metadata CID
              target="_blank"
              className="relative shadow-xl shadow-black p-3 bg-white rounded-lg item w-64 h-64 object-contain bg-no-repeat bg-cover overflow-hidden mr-2 mb-2 cursor-pointer transition-all duration-75 delay-100 hover:shadow-[#bd255f]"
              style={{ backgroundImage: `url(${nft.imageURL})` }}
            >
              <div className="absolute bottom-0 left-0 right-0 flex flex-row justify-between items-center label-gradient p-2 w-full text-white text-sm">
                <p>{`Gwill NFT #${nft.id}`}</p>
                <div className="flex justify-center items-center space-x-2">
                  <img className="w-5 cursor-pointer" src={ethlogo} alt={`Gwill NFT #${nft.id}`} />
                  <span>{nft.cost}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artworks;