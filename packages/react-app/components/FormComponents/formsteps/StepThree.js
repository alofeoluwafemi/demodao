import Link from "next/link";
import React from "react";
import { useState } from "react";
import DropdownIcon from "../../../icons/DropdownIcon";
import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";

const StepThree = ({
  currentStep,
  steps,
  data,
  setData,
  handleClick,
  signer,
}) => {
  const [makePublic, setMakePublic] = useState();
  const [congrats, setCongrats] = useState();
  const recoveredAddress = "";
  const { error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    },
  });

  const toggleMakePublic = (e) => {
    e.preventDefault();

    setMakePublic(!makePublic);
  };

  const toggleCongrats = async (e) => {
    e.preventDefault();
    data["slug"] = data.name.toLowerCase().replace(/ /g, "-");
    data["logo"] = data.logo
      ? data.logo
      : "http://res.cloudinary.com/dlnrf91ax/image/upload/v1679579174/ktxrabfxvlo0lkcmld6h.png";

    // console.log(data)
    // return false

    const message = JSON.stringify(data);
    const signature = signMessage(message);

    let payload = {
      space: data,
      signature: {
        signer: data.public_key,
        signature: signature,
        mode: "WAVE",
      },
    };

    fetch("./api/spaces/new", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });

    setMakePublic(false);
    setCongrats(!congrats);
  };
  return (
    <>
      <div className="fade-in">
        <form onSubmit={toggleCongrats}>
          <p className="mb-2">Proposal Settings</p>
          <p className="text-sm  text-[#A4A1A1] mb-6">
            This directs voters on how to vote. You can always change it later.
          </p>
          <label>Threshold</label>
          <p className="text-sm  text-[#A4A1A1]">
            Minimum Voting Power required to create a proposal
          </p>
          <input
            type="text"
            placeholder="1000"
            required
            onChange={(e) =>
              setData({
                ...data,
                settings: { ...data.settings, threshold: e.target.value },
              })
            }
            value={data?.settings ? data?.settings?.threshold : ""}
            className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3  mb-10 focus:outline-none"
          />
          <br />
          <label>Quorum</label>
          <p className="text-sm  text-[#A4A1A1]">
            Minimum number of votes necessary for a proposal to pass
          </p>
          <input
            type="text"
            placeholder="10000"
            required
            onChange={(e) =>
              setData({
                ...data,
                settings: { ...data.settings, quorum: e.target.value },
              })
            }
            value={data?.settings ? data?.settings?.quorum : ""}
            className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3  mb-10 focus:outline-none"
          />

          <div className="flex items-stretch w-full gap-12 h-full mb-2 flex-col md:flex-row">
            <div className="flex flex-col h-full gap-2 w-full md:w-1/2 ">
              <div className="flex flex-col">
                <label>Voting Delay</label>
                <span className="text-[#A4A1A1] text-sm">
                  This states how long voting can be delayed for
                </span>
              </div>

              <div className=" relative rounded-full  items-center flex w-full h-12 ">
                <button
                  className=" absolute inset-y-0 right-0 px-1 flex items-center h-full "
                  type="button"
                >
                  <span className=" text-[#E6E5E5] px-2 flex items-center bg-transparent ">
                    Hours
                    <DropdownIcon />
                  </span>
                </button>
                <input
                  type="text"
                  onChange={(e) =>
                    setData({
                      ...data,
                      settings: {
                        ...data.settings,
                        voting_delay: e.target.value,
                      },
                    })
                  }
                  value={data?.settings ? data?.settings?.voting_delay : ""}
                  required
                  className="  py-3 block w-full pl-4 pr-28 rounded-full bg-transparent  h-full border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out"
                  name="voting_delay"
                />
              </div>
            </div>
            <div className="flex flex-col justify-betweeen  gap-2 w-full md:w-1/2 h-full">
              <div className="flex flex-col">
                <label>Voting Period</label>
                <span className="text-[#A4A1A1] text-sm">
                  This states how long voting can be held for
                </span>
              </div>

              <div className=" relative rounded-full  items-center flex w-full h-12 ">
                <button
                  className=" absolute inset-y-0 right-0 px-1 flex items-center h-full "
                  type="button"
                >
                  <span className=" text-[#E6E5E5] px-2 flex items-center bg-transparent ">
                    Hours
                    <DropdownIcon />
                  </span>
                </button>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setData({
                      ...data,
                      settings: {
                        ...data.settings,
                        voting_period: e.target.value,
                      },
                    })
                  }
                  value={data?.settings ? data?.settings?.voting_period : ""}
                  className="  py-3 block w-full pl-4 pr-28 rounded-full bg-transparent  h-full border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out"
                  name="voting_period"
                />
              </div>
              {/* <div className='space-x-4'>
                                <input type="text" className='w-full h-12 rounded-full bg-transparent text-white border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out'/>
                            </div> */}
            </div>
          </div>
          <br></br>

          <p className="mb-2">Voting Token</p>
          <p className="text-sm  text-[#A4A1A1] mb-6">
            This directs voters on how to vote. You can always change it later..
          </p>
          <label>Name</label>
          <br />
          <input
            type="text"
            onChange={(e) =>
              setData({
                ...data,
                settings: {
                  erc20Balance: {
                    ...data.settings.erc20Balance,
                    symbol: e.target.value,
                  },
                },
              })
            }
            value={data?.settings ? data?.settings?.erc20Balance.symbol : ""}
            required
            placeholder=""
            className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3 mb-10 focus:outline-none"
          />
          <br></br>
          <label>Decimal</label>
          <br />
          <input
            type="number"
            required
            onChange={(e) =>
              setData({
                ...data,
                settings: {
                  erc20Balance: {
                    ...data.settings.erc20Balance,
                    decimals: e.target.value,
                  },
                },
              })
            }
            value={data?.settings ? data?.settings?.erc20Balance.decimals : ""}
            className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3  mb-10 focus:outline-none"
          />
          <br />
          <label>Address</label>
          <br />
          <input
            type="text"
            placeholder=""
            onChange={(e) =>
              setData({
                ...data,
                settings: {
                  erc20Balance: {
                    ...data.settings.erc20Balance,
                    address: e.target.value,
                  },
                },
              })
            }
            value={data?.settings ? data?.settings?.erc20Balance.address : ""}
            required
            className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3 mb-10 focus:outline-none"
          />
          {/* <br></br>
                    <div className="text-right">
                    <button className="rounded-3xl text-pin border border-pin h-12 px-4 py-3 text-sm mb-12  ">
                        Add Another
                    </button>
                    </div> */}
          <button
            className="button1 button1 h-12 w-full m-auto rounded-3xl bg-black text-white"
            type="submit"
          >
            Create DAO
          </button>
        </form>
      </div>

      {/* Make Public Modal */}
      <div className={`modal__box ${makePublic ? "show" : ""}`}>
        <div className="modal__box-wrapper shadow-lg rounded-2xl">
          <div className="flex items-start justify-between mb-6">
            <div className="grow">
              <h1 className="text-2xl font-semibold mb-3">
                Do you want to make this DAO Public
              </h1>
            </div>

            <button
              className=" flex items-center absolute top-3 right-2  "
              onClick={() => setMakePublic(false)}
            >
              <span className="pointer-events-none flex items-center p-2">
                <svg
                  className="h-5 w-5 "
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="currentColor"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-5 w-full">
            <button
              className="button1 px-9 py-3 border border-[#545252] bg-[#3F3F3F] text-white rounded-full flex items-center justify-center gap-5"
              onClick={toggleCongrats}
              type="button"
            >
              Yes
            </button>

            <button
              className=" px-9 py-3 border border-[#545252] bg-[#3F3F3F] text-white rounded-full flex items-center justify-center gap-5"
              onClick={toggleCongrats}
              type="button"
            >
              No
            </button>
          </div>
        </div>
      </div>
      {/* congrats modal */}

      <div className={`modal__box ${congrats ? "show" : ""}`}>
        <div className="modal__box-wrapper shadow-lg rounded-2xl text-center">
          <div className="flex items-start justify-between mb-6">
            <div className="grow">
              <h1 className="text-2xl font-semibold mb-3">Congratulations</h1>
              <p>Your space ({data.name}) is live and public!!</p>
              <p className="text-sm font-thin  text-[#A4A1A1]">
                You can now start creating proposals and invite others to your
                space
              </p>
            </div>

            <button
              className=" flex items-center absolute top-3 right-2  "
              onClick={() => setCongrats(false)}
            >
              <span className="pointer-events-none flex items-center p-2">
                <svg
                  className="h-5 w-5 "
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="currentColor"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-5 w-full">
            <Link href="/spaces" className="">
              {" "}
              <button
                className="button1 m-auto px-9 py-3 border border-[#545252] bg-[#3F3F3F] text-white rounded-full flex items-center justify-start gap-5"
                type="button"
              >
                Go to Spaces
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepThree;
