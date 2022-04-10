import {
  useAddress,
  useMetamask,
  useEditionDrop,
  useToken,
  useVote,
  useNetwork,
} from "@thirdweb-dev/react";
import { useState, useEffect, useMemo } from "react";
import { AddressZero } from "@ethersproject/constants";
import { ChainId } from "@thirdweb-dev/sdk";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import Chat from "./components/Chat"

const App = () => {
  let { communityname } = useParams();
  // Use the hooks thirdweb give us.
  const address = useAddress();
  const network = useNetwork();
  const connectWithMetamask = useMetamask();
  console.log("👋 Address:", address);

  const editionDrop = useEditionDrop(
    "0xb59a93C3285151FbDF6F59132b3193Fef4cbC536"
  );
  const token = useToken("0xB1F66720243d403B08eC8dF063936B83ABd5f45B");

  const vote = useVote("0x2142A714D1b33609778D93e870EF2cA346adfBb4");

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  const [memberAddress, setMemberAddress] = useState([]);

  const [proposals, setProposals] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllProposals = async () => {
      try {
        const proposals = await vote.getAll();
        setProposals(proposals);
      } catch (error) {
        console.log("failed to get proposals", error);
      }
    };
    getAllProposals();
  }, [hasClaimedNFT, vote]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    if (!proposals.length) {
      return;
    }

    const checkIfUserHasVoted = async () => {
      try {
        const hasVoted = await vote.hasVoted(proposals[0].proposalId, address);
        setHasVoted(hasVoted);
        if (hasVoted) {
          console.log("🥵 User has already voted");
        } else {
          console.log("🙂 User has not voted yet");
        }
      } catch (error) {
        console.error("failed to check if wallet has voted", error);
      }
    };
    checkIfUserHasVoted();
  }, [hasClaimedNFT, proposals, address, vote]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllAddresses = async () => {
      try {
        const memberAddress = await editionDrop.history.getAllClaimerAddresses(
          0
        );
        setMemberAddress(memberAddress);
        console.log("🚀 Members addresses", memberAddress);
      } catch (error) {
        console.error("failed to get memeber list", error);
      }
    };

    getAllAddresses();
  }, [hasClaimedNFT, editionDrop.history]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log("👜 Amounts", amounts);
      } catch (error) {
        console.error("failed to get member balances", error);
      }
    };

    getAllBalances();
  }, [hasClaimedNFT, token.history]);

  const memberList = useMemo(() => {
    return memberAddress.map((address) => {
      const member = memberTokenAmounts?.find(
        ({ holder }) => holder === address
      );

      return {
        address,
        tokenAmount: member?.balance.displayValue || "0",
      };
    });
  }, [memberAddress, memberTokenAmounts]);

  useEffect(() => {
    if (!address) {
      return;
    }
    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("0", 1);
      console.log(
        `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
      );
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

  const [menu, setMenu] = useState(true);

  function changeMenu(val) {
    setMenu(val);
  }

  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to NarutoDAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="flex-column bg-gradient-to-r from-yellow-200 to-yellow-200 min-h-screen">
        <Navbar2 changeMenu={changeMenu} />
        {menu &&
        <div>
          <div className="flex mr-10 justify-end space-x-4">
            <div className="bg-white flex space-x-3 p-2 rounded-xl">
              <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span
                  style={{fontFamily: "Poppins", lineHeight: "1.5"}}
                  className="mfont-sans text-xs font-bold tracking-tight text-gray-900"
              >
              {address.tokenAmount}Community coin : 10
            </span>
            </div>
            <div className="bg-white flex space-x-3 p-2 rounded-xl">
              <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <span
                  style={{fontFamily: "Poppins", lineHeight: "1.5"}}
                  className="mfont-sans text-xs font-bold tracking-tight text-gray-900"
              >
              {address}
            </span>
              <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
            </div>
          </div>
          <div className="ml-10 flex justify-between mr-10 mt-2">
            <h1
                className="max-w-xl mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none"
                style={{fontFamily: "Poppins", lineHeight: "1.5"}}
            >
              Welcome to {communityname}
            </h1>
            <a
                href="/invite"
                className="bg-yellow-400  flex space-x-3 p-2 rounded-xl h-9"
            >
              <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                ></path>
              </svg>
              <span
                  style={{fontFamily: "Poppins", lineHeight: "1.5"}}
                  className="mfont-sans text-xs font-bold tracking-tight text-gray-900"
              >
              Invite new member
            </span>
            </a>
          </div>
          <div className="flex">
            <div className="ml-10 w-1/2">
              <h1
                  style={{fontFamily: "Poppins", lineHeight: "1.5"}}
                  className="mfont-sans mb-4 text-lg font-bold tracking-tight text-gray-900"
              >
                Member information
              </h1>
              <div class="overflow-hidden overflow-x-auto border border-black rounded">
                <table class="min-w-full text-sm divide-y divide-black">
                  <thead>
                  <tr class="bg-black">
                    <th class="px-4 py-2 font-medium text-left text-white whitespace-nowrap">
                      Member address
                    </th>
                    <th class="px-4 py-2 font-medium text-left text-white whitespace-nowrap">
                      Coins owned
                    </th>
                    <th class="px-4 py-2 font-medium text-left text-white whitespace-nowrap">
                      Date of joining
                    </th>
                    <th class="px-4 py-2 font-medium text-left text-white whitespace-nowrap">
                      Referals
                    </th>
                  </tr>
                  </thead>

                  <tbody class="divide-y divide-black">
                  {memberList.map((member) => {
                    return (
                        <tr key={member.address}>
                          <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                            {shortenAddress(member.address)}
                          </td>
                          <td class="px-4 py-2 text-gray-700 whitespace-nowrap">
                            {member.tokenAmount}
                          </td>
                          <td class="px-4 py-2 text-gray-700 whitespace-nowrap">
                            10-04-2022
                          </td>
                          <td class="px-4 py-2 text-gray-700 whitespace-nowrap">
                            -
                          </td>
                        </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
              <h1
                  style={{fontFamily: "Poppins", lineHeight: "1.5"}}
                  className="mt-10 font-sans mb-4 text-lg font-bold tracking-tight text-gray-900"
              >
                Community announcements
              </h1>
              <div className="mt-7 flex">
                <input
                    class="w-full p-3 text-sm border-gray-200 rounded-lg"
                    placeholder="Create an announcement"
                />
                <button
                    style={{fontFamily: "Poppins", lineHeight: "1.5"}}
                    className="font-sans font-bold text-md ml-4 tracking-tight rounded-xl p-3 text-white bg-black"
                    type="submit"
                >
                  Announce
                </button>
              </div>
            </div>
            <div>
              <div className="ml-10 mr-10">
                <h1
                    style={{fontFamily: "Poppins", lineHeight: "1.5"}}
                    className="mfont-sans mb-4 text-lg font-bold tracking-tight text-gray-900"
                >
                  Community Polls
                </h1>{" "}
                <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      setIsVoting(true);

                      const votes = proposals.map((proposal) => {
                        const voteResult = {
                          proposalId: proposal.proposalId,
                          vote: 2,
                        };
                        proposal.votes.forEach((vote) => {
                          const elem = document.getElementById(
                              proposal.proposalId + "-" + vote.type
                          );

                          if (elem.checked) {
                            voteResult.vote = vote.type;
                            return;
                          }
                        });
                        return voteResult;
                      });

                      try {
                        const delegation = await token.getDelegationOf(address);
                        if (delegation === AddressZero) {
                          await token.delegateTo(address);
                        }
                        try {
                          await Promise.all(
                              votes.map(async ({proposalId, vote: _vote}) => {
                                const proposal = await vote.get(proposalId);
                                if (proposal.state === 1) {
                                  return vote.vote(proposalId, _vote);
                                }
                                return;
                              })
                          );
                          try {
                            await Promise.all(
                                votes.map(async ({proposalId}) => {
                                  const proposal = await vote.get(proposalId);

                                  if (proposal.state === 4) {
                                    return vote.execute(proposalId);
                                  }
                                })
                            );
                            setHasVoted(true);
                            console.log("successfully voted");
                          } catch (err) {
                            console.error("failed to execute votes", err);
                          }
                        } catch (err) {
                          console.error("failed to vote", err);
                        }
                      } catch (err) {
                        console.error("failed to delegate tokens");
                      } finally {
                        setIsVoting(false);
                      }
                    }}
                >
                  {proposals.map((proposal) => (
                      <div
                          key={proposal.proposalId}
                          className="border-black border p-3 mb-3 rounded-xl"
                      >
                        <h5
                            style={{fontFamily: "Poppins", lineHeight: "1.5"}}
                            className="mfont-sans mb-4 text-sm font-bold tracking-tight text-gray-900"
                        >
                          {proposal.description}
                        </h5>
                        <div>
                          {proposal.votes.map(({type, label}) => (
                              <div key={type}>
                                <input
                                    type="radio"
                                    id={proposal.proposalId + "-" + type}
                                    name={proposal.proposalId}
                                    value={type}
                                    defaultChecked={type === 2}
                                />
                                <label
                                    style={{fontFamily: "Poppins", lineHeight: "1.5"}}
                                    className="mfont-sans mb-4 text-xs ml-4 tracking-tight text-gray-900"
                                    htmlFor={proposal.proposalId + "-" + type}
                                >
                                  {label}
                                </label>
                              </div>
                          ))}
                        </div>
                      </div>
                  ))}
                  <div className="flex justify-end">
                    {!hasVoted && (
                        <small className="ml-10 mt-4">
                          This will trigger multiple transactions that you will need
                          to sign.
                        </small>
                    )}
                    <button
                        style={{fontFamily: "Poppins", lineHeight: "1.5"}}
                        className="font-sans mb-4 font-bold text-md ml-4 tracking-tight rounded-xl p-3 text-white bg-black"
                        disabled={isVoting || hasVoted}
                        type="submit"
                    >
                      {isVoting
                          ? "Voting..."
                          : hasVoted
                              ? "You Already Voted"
                              : "Submit Votes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>}
        {!menu && <Chat name={address}/>}
      </div>
    );
  }

  // This is the case where we have the user's address
  // which means they've connected their wallet to our site!
  return (
    <div className="">
      <h1>
        You don't have a membership NFT to access {communityname} community
      </h1>
      <button disabled={isClaiming} onClick={mintNft}>
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );
};

export default App;
