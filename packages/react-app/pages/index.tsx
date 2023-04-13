import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import StepOne from "../components/FormComponents/formsteps/StepOne";
import StepTwo from "../components/FormComponents/formsteps/StepTwo";
import StepThree from "../components/FormComponents/formsteps/StepThree";
import FormStepper from "../components/FormComponents/formsteps/FormStepper";
import { UseContextProvider } from "../components/contexts/NavigationContext";

export default function Home(): JSX.Element {
  const [data, setData] = useState<{
    admins: any[];
    authors: any[];
    socials: {
      twitter: string;
      discord: string;
      github: string;
    };
    settings: {
      erc20Balance: {
        symbol: string;
        address: string;
        decimals: number;
      };
    };
  }>({
    admins: [],
    authors: [],
    socials: { twitter: "", discord: "", github: "" },
    settings: {
      erc20Balance: {
        symbol: "",
        address: "",
        decimals: 2,
      },
    },
  });
  const [currentStep, setCurrentStep] = useState(1);
  // const [user, signer, provider, setUser, login] = ""

  const createProposal = async (): Promise<void> => {
    let user: any;
    try {
      // user = await signer.login()
    } catch (error: any) {
      alert(error.message);
      return;
    }
    // setUser(user);
    setData({
      ...data,
      // controller: user?.address,
      admins: [],
      authors: [],
      // public_key: user?.publicKey,
      socials: { twitter: "", discord: "", github: "" },
      settings: {
        erc20Balance: {
          symbol: "",
          address: "",
          decimals: 2,
        },
      },
    });

    setStartForm(true);
  };

  const [startForm, setStartForm] = useState(false);
  const steps = [1, 2, 3];


  const displayStep = (step: any) => {
    switch (step) {
      case 1:
        return (
          <StepOne
            key={1}
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            data={data}
            setData={setData}
          />
        )
      case 2:
        return (
          <StepTwo
            key={2}
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            data={data}
            setData={setData}
          />
        )
      case 3:
        return (
          <StepThree
            //key={3}
           // handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            data={data}
            setData={setData}
            signer={""}
          />
        )
      //   case 4:
      //     return <Final />;
      default:
    }
  }


  type DisplayStepProps = {
    step: number;
    handleClick: (step: number) => void;
    currentStep: number;
    steps: number;
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
    signer: any;
  };

  const DisplayStep = ({
    step,
    handleClick,
    currentStep,
    steps,
    data,
    setData,
    signer,
  }: DisplayStepProps): JSX.Element | null => {
    switch (step) {
      case 1:
        return (
          <StepOne
            key={1}
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            data={data}
            setData={setData}
          />
        );
      case 2:
        return (
          <StepTwo
            key={2}
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            data={data}
            setData={setData}
          />
        );
      case 3:
        return (
          <StepThree
            key={3}
            // handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            data={data}
            setData={setData}
            signer={signer}
          />
        );
      // case 4:
      //   return <Final />;
      default:
        return null;
    }
  };

  type FormData = Record<string, any>;

  type HandleClickProps = {
    direction: "next" | "previous";
    formData?: FormData;
  };

  // const handleClick = ({
  //   direction,
  //   formData = {},
  // }: HandleClickProps): void => {
  //   console.log("handle click: passed", formData);
  //   console.log("handle click: before", data);

  //   const newData = { ...data, ...formData };
  //   setData(newData);

  //   console.log("handle click: after", newData);

  //   const newStep = direction === "next" ? currentStep + 1 : currentStep - 1;

  //   // check if steps are within bounds
  //   if (newStep > 0 && newStep <= steps.length) {
  //     setCurrentStep(newStep);
  //   }
  // };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const handleClick = (direction: "next" | "back") => {
    direction === "next" ? setStep(step + 1) : setStep(step - 1);
  };

  const handleFormDataChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="mx-auto max-w-screen-lg mt-10">
        <div className=" pl-0 lg:pl-10">
          <h2 className="text-2xl font-bold my-4">Create a Proposal</h2>
          <p className="text-sm font-thin text-black mb-4">
            Create your own proposal right away and begin making choices!
          </p>
          {/* {step === 1 && (
            <div className="flex flex-col items-center">
              <button
                className="button1 h-12 w-4/5 m-auto rounded-3xl bg-black text-white"
                // onClick={createProposal}
                onClick={() => handleClick("next")}
              >
                Create Proposal
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">
                Step 1: Proposal Title
              </h2>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormDataChange}
                className="border-2 border-gray-300 p-2 rounded-lg mb-4"
                placeholder="Enter a title for your proposal"
              />

              <button
                className="button1 h-12 w-full my-4 rounded-3xl bg-black text-white mr-4"
                onClick={() => handleClick("back")}
              >
                Back
              </button>
              <button
                className="button1 h-12 w-full my-4 rounded-3xl bg-black text-white mr-4"
                onClick={() => handleClick("next")}
              >
                Next
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">
                Step 2: Proposal Description
              </h2>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormDataChange}
                className="border-2 border-gray-300 p-2 rounded-lg mb-4"
                placeholder="Enter a description for your proposal"
                rows={6}
              />
              <button
                className="button1 h-12 w-full my-4 rounded-3xl bg-black text-white mr-4"
                onClick={() => handleClick("back")}
              >
                Back
              </button>
              <button
                className="button1 h-12 w-full my-4 rounded-3xl bg-black text-white mr-4"
                onClick={() => handleClick("next")}
              >
                Next
              </button>
            </div>
          )}
          {step === 4 && (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">
                Step 3: Proposal Budget
              </h2>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleFormDataChange}
                className="border-2 border-gray-300 p-2 rounded-lg mb-4"
                placeholder="Enter a budget for your proposal"
              />
              <button
                className="button1 h-12 w-full my-4 m-auto rounded-3xl bg-black text-white mr-4"
                onClick={() => handleClick("back")}
              >
                Back
              </button>

              <button
                className="button1 h-12 w-full my-4 m-auto rounded-3xl bg-black text-white"
                onClick={createProposal}
              >
                Submit Proposal
              </button>
            </div>
          )} */}
          <div className="m-auto text-centers">
            <button
              className="button1 h-12 w-4/5 m-autos rounded-3xl bg-black text-white"
              onClick={createProposal}
            >
              Create Proposal
            </button>
          </div>

          {startForm && (
            <div>
              <div className=" px-3 lg:px-10 py-6">
                <h2 className="text-2xl font-bold my-4">Create a Proposal</h2>

                <UseContextProvider>
                  {displayStep(currentStep)}
                </UseContextProvider>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
