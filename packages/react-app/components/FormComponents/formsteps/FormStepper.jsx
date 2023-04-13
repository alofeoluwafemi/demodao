import React, { useState, useEffect, useRef } from 'react'

const FormStepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([])
  const stepsRef = useRef()

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps]
    // console.log(newSteps)
    let count = 0
    while (count < newSteps.length) {
      //current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: false,
        }
        count++
      }

      //step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        }
        count++
      }
      //step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        }
        count++
      }
    }

    return newSteps
  }

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    )

    stepsRef.current = stepsState
    const current = updateStep(currentStep - 1, stepsRef.current)
    setNewStep(current)
  }, [steps, currentStep])

  const stepsDisplay = newStep.map((step, index) => {
    return (
      <div key={index} className={index !== newStep.length - 1 ? 'w-full flex items-center' : 'flex items-center'}>
        <div className="relative flex flex-col items-center text-gray-500">
          
          {step.selected && step.highlighted && (
            <span className="tooltip">
              {index + 1} of {steps.length}{' '}
            </span>
          )}
       
        </div>
        <div
          className={`flex-auto border-t-2 border transition duration-500 ease-in-out  relative ${
            step.completed ? 'border-[#B860ED]' : 'border-gray-300 test'
          }  `}
        ></div>
      </div>
    )
  })

  return <div className="flex justify-between items-center w-full relative">{stepsDisplay}</div>
}
export default FormStepper
