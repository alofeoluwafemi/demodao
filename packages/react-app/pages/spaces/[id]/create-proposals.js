import React, { useEffect, useState } from 'react'
import ReturnIcon from '../../../components/Icons/ReturnIcon'
import Layout from '../../../components/Layout/Layout'
import { useRouter } from 'next/router'
import DropdownIcon from '../../../components/Icons/DropdownIcon'
import useSigner from '../../../components/hooks/useSigner'

const CreateProposals = () => {
  const [space, setSpace] = useState()
  const [proposal, setProposal] = useState({})
  const [user, signer, provider, setUser, login] = useSigner()

  const router = useRouter()
  const goBack = () => {
    router.back()
  }

  useEffect(() => {
    const getSpace = async () => {
      const space = await fetch(`/api/spaces/show?slug=${router.query.id}`)
      const data = await space.json()

      setSpace(data)
      setProposal({
        ...proposal,
        space: data.slug,
        type: 'Weighted',
        choices: ['Yes', 'No', 'Abstain'],
        title: '',
        body: '',
        start: '',
        end: '',
      })
    }

    getSpace()
  }, [])

  const createProposal = async (e) => {
    e.preventDefault()

    let user

    try {
      user = await signer.login()
    } catch (error) {
      alert(error.message)
      return false
    }

    let data = proposal

    data['timestamp'] = new Date().getTime() / 1000
    data['from'] = user.address
    data['start'] = new Date(proposal?.start).getTime() / 1000
    data['end'] = new Date(proposal?.end).getTime() / 1000

    const message = JSON.stringify(data)
    const signature = await signer.signMessage(message)

    let payload = {
      proposal: data,
      signature: {
        signer: user.publicKey,
        signature: signature,
        mode: 'WAVE',
      },
    }

    fetch('/api/spaces/proposal/new', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
        router.push(`/spaces/${router.query.id}/proposals`)
      })
      .catch((err) => {
        console.error(err)
      })

    console.log(router.query.id)

    // console.log(payload)
  }

  return (
    <div>
      <Layout>
        {space && (
          <form onSubmit={createProposal}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <button className="flex items-center bg-[#3F3F3F] gap-2 px-6 py-4 rounded-full" onClick={goBack}>
                    <ReturnIcon /> Back
                  </button>
                </div>
                <div className="flex items-center flex-row gap-3">
                  <div className="h-14 w-14">
                    <img src={space.logo} className="w-full object-cover rounded-full  " />
                  </div>

                  <div>
                    <h4 className="mb-1">{space.name}</h4>
                  </div>
                </div>
              </div>

              <div className=" w-full mt-3 md:mt-0  relative h-full px-2 lg:px-5 ">
                <div className="flex-1 w-full mb-5">
                  <h3 className="section__header">Create Proposals</h3>
                </div>

                <div className="mt-5 w-full lg:w-8/12">
                  <div className="space-y-5 py-6 ">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-[#E6E5E5]">Title of Proposal</label>
                      <div className="space-x-4">
                        <input
                          type="text"
                          required
                          onChange={(e) => setProposal({ ...proposal, title: e.target.value })}
                          value={proposal?.title}
                          className="w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#3F3F3F] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex flex-col gap-3 text-sm text-[#E6E5E5]">Description of space</label>

                        <span className="text-sm text-[#E6E5E5]">0/2000 characters</span>
                      </div>

                      <textarea
                        className="w-full border border-[#545252] focus:outline-none active:outline-none p-3  placeholder-text-primary bg-transparent rounded-lg textarea placeholder-text-sm text-[#8F8F8F] scrollbar-change"
                        aria-placeholder="Leave a note for your client"
                        rows="6"
                        required
                        onChange={(e) => setProposal({ ...proposal, body: e.target.value })}
                        value={proposal?.body}
                        id="body"
                        defaultValue=""
                      ></textarea>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-[#E6E5E5]">Input Discussion URL (Optional)</label>
                      <div className="space-x-4">
                        <input
                          type="text"
                          required
                          onChange={(e) => setProposal({ ...proposal, discussion: e.target.value })}
                          value={proposal?.discussion}
                          className="w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#545252] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 py-4">
                      <h3 className="mb-5 text-sm text-[#E6E5E5]">Voting Strategy</h3>

                      <div className="space-y-8  w-full gap-5">
                        <div>
                          <h4 className="mb-4 text-sm  text-[#E6E5E5]">Type</h4>
                          <div className="lg:space-x-4 flex flex-col md:flex-row w-full gap-5">
                            {/* <div className="w-full lg:w-1/2">
                            <label className="px-4 py-6 border border-[#545252] text-white text-sm font-medium rounded-md flex items-start justify-start form-check gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="vehicle"
                                className="w-7 h-7 text-red-600 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 bg-transparent"
                              />

                              <span className="flex items-start justify-start flex-col space-y-2">
                                <h5 className=" text-[#E6E5E5] text-sm">Basic voting</h5>
                                <p className="text-xs text-[#8F8F8F]">
                                  These votings have three choices. For, Against and Abstain
                                </p>
                              </span>
                            </label>
                          </div> */}
                            <div className="w-full lg:w-1/2">
                              <div className="">
                                <label className="px-4 py-6 border border-[#545252] text-white text-sm font-medium rounded-md flex items-start justify-start form-check gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="Weighted"
                                    onChange={(e) => setProposal({ ...proposal, type: e.target.value })}
                                    checked={true}
                                    className="w-8 h-8 text-red-600 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200"
                                  />

                                  <span className="flex items-start justify-start flex-col space-y-2">
                                    <h5 className=" text-[#E6E5E5] text-sm">Weighted voting</h5>
                                    <p className="text-xs text-[#8F8F8F]">
                                      Each voter has the ability to cast their votes across any number of options.
                                    </p>
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="mb-4 text-sm text-[#E6E5E5]">Set Options</h4>
                          <div className="space-y-4">
                            <div className="flex flex-row items-center gap-2">
                              <label className="w-4/12 lg:w-2/12 text-sm text-[#8F8F8F]">Option 1</label>
                              <div className="space-x-4 w-full lg:w-7/12 ">
                                <input
                                  type="text"
                                  required
                                  onChange={(e) =>
                                    setProposal({
                                      ...proposal,
                                      choices: [e.target.value, proposal.choices[1], proposal.choices[2]],
                                    })
                                  }
                                  value={proposal?.choices[0] || 'Yes'}
                                  className="w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#545252] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out"
                                />
                              </div>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                              <label className="w-4/12 lg:w-2/12 text-sm text-[#8F8F8F]">Option 2</label>
                              <div className="space-x-4 w-full lg:w-7/12">
                                <input
                                  type="text"
                                  required
                                  onChange={(e) =>
                                    setProposal({
                                      ...proposal,
                                      choices: [proposal.choices[0], e.target.value, proposal.choices[2]],
                                    })
                                  }
                                  value={proposal?.choices[1] || 'No'}
                                  className="w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#545252] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out"
                                />
                              </div>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                              <label className="w-4/12 lg:w-2/12 text-sm text-[#8F8F8F]">Option 3</label>
                              <div className="space-x-4  w-full lg:w-7/12">
                                <input
                                  type="text"
                                  required
                                  onChange={(e) =>
                                    setProposal({
                                      ...proposal,
                                      choices: [proposal.choices[0], proposal.choices[2], e.target.value],
                                    })
                                  }
                                  value={proposal?.choices[2] || 'Abstain'}
                                  className="w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#545252] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-4 text-sm  text-[#E6E5E5]">Voting Duration</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
                            <div className="flex flex-row items-center gap-2">
                              <label className="w-3/12 text-sm text-[#8F8F8F]">Begins</label>
                              <div className="space-x-4  w-full lg:w-7/12">
                                <input
                                  type="date"
                                  required
                                  onChange={(e) =>
                                    setProposal({
                                      ...proposal,
                                      start: e.target.value,
                                    })
                                  }
                                  value={proposal?.start}
                                  className="w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#545252] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out"
                                />
                              </div>
                            </div>
                            <div className="flex flex-row items-center gap-4">
                              <label className="w-3/12 text-sm lg:text-right text-[#8F8F8F]">Time</label>
                              <div className="space-x-4  w-full lg:w-7/12">
                                <input
                                  type="date"
                                  required
                                  onChange={(e) =>
                                    setProposal({
                                      ...proposal,
                                      end: e.target.value,
                                    })
                                  }
                                  value={proposal?.end}
                                  className="w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#545252] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out"
                                />
                              </div>
                            </div>
                            {/* <div className="flex flex-row items-center gap-2">
                            <label className="w-3/12 text-sm text-[#8F8F8F] ">Ends</label>
                            <div className="space-x-4 w-9/12">
                              <button className="flex items-center justify-end gap-2 h-12  px-4 py-4 w-full text-[#8F8F8F] border border-[#545252] rounded-full">
                                <span className="flex items-center justify-between w-full text-xs">
                                  dd/mm/yyyy
                                  <DropdownIcon />
                                </span>
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-row items-center gap-4">
                            <label className="w-3/12 text-sm lg:text-right text-[#8F8F8F]">Time</label>
                            <div className="space-x-4 w-9/12">
                              <button className="flex items-center justify-end gap-2 h-12  px-4 py-4 w-full text-[#8F8F8F] border border-[#545252] rounded-full">
                                <span className="flex items-center justify-end gap-3 w-full text-xs">
                                  am
                                  <DropdownIcon />
                                </span>
                              </button>
                            </div>
                          </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full my-5 py-7">
                    <button
                      type="submit"
                      className="button1 px-7 py-3 flex justify-center items-center text-center gap-5 rounded-full w-full"
                    >
                      Create Proposal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Layout>
    </div>
  )
}

export default CreateProposals
