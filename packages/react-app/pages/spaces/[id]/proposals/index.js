import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../../components/Layout/Layout'
import { Tabs } from 'react-tabs'
import Tab from 'react-tabs/lib/components/Tab'
import TabList from 'react-tabs/lib/components/TabList'
import TabPanel from 'react-tabs/lib/components/TabPanel'
import ReturnIcon from '../../../../components/Icons/ReturnIcon'
import Link from 'next/link'
import DropdownIcon from '../../../../components/Icons/DropdownIcon'

const Proposals = () => {
  const [space, setSpace] = useState()
  const [proposals, setProposals] = useState()
  const [id, setId] = useState()

  const router = useRouter()
  const goBack = () => {
    router.back()
  }
  const [tabDropdown, setTabDropdown] = useState()

  const handleTabDropdown = () => {
    setTabDropdown(!tabDropdown)
  }

  const ellipAddress = (address) => address.substr(0, 4) + '.....' + address.substr(-6)

  const convTime = (time) => {
    const t = new Date(parseInt(time) * 1000)
    return t.toDateString()
  }

  useEffect(() => {
    setId(router.query.id)
    if (id) {
      const getSpace = async () => {
        const space = await fetch(`/api/spaces/show?slug=${id}`)
        const data = await space.json()

        setSpace(data)
        console.log(data.proposals)
        setProposals(data.proposals)
      }

      getSpace()
    }
  }, [id])
  return (
    <div>
      <Layout>
        {space ? (
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
              <Tabs>
                <div className="flex items-center py-4 mb-3 ">
                  <div className="flex-1 w-full mb-0">
                    <h3 className="section__header">Proposals</h3>
                  </div>

                  <div className="relative w-5/12 lg:hidden block ">
                    <button
                      className="flex items-center  bg-transparent text-sm border-[#545252] border px-5 py-2 rounded-full h-12 w-full justify-center"
                      onClick={handleTabDropdown}
                    >
                      <span className="text-sm flex items-center pl-3">
                        All
                        <DropdownIcon className="text-sm text-[#545252] " />
                      </span>
                    </button>

                    <div
                      className={`absolute border-none category-menu ${
                        tabDropdown ? 'show' : ''
                      }  large-dropdown  shadow-md rounded-md w-full h-64 max-w-full scrollbar-change fade-in z-10 py-3 mt-2`}
                    >
                      <TabList>
                        <div className=" py-4 h-full scrollbar-change overflow-y-auto space-y-2">
                          <Tab className="">
                            <button
                              className={`flex items-center py-3 px-3 text-sm justify-between   w-full  hover:bg-[#545252] transition duration-200 ease-in-out  `}
                              type="button"
                            >
                              All
                            </button>
                          </Tab>
                          <Tab className="">
                            <button
                              className={`flex items-center py-3 px-3 text-sm justify-between  w-full  hover:bg-[#545252] transition duration-200 ease-in-out  `}
                              type="button"
                            >
                              Pending
                            </button>
                          </Tab>
                          <Tab className="">
                            <button
                              className={`flex items-center py-3 px-3 text-sm justify-between  w-full  hover:bg-[#545252] transition duration-200 ease-in-out  `}
                              type="button"
                            >
                              Active
                            </button>
                          </Tab>
                          <Tab className="">
                            <button
                              className={`flex items-center py-3 px-3 text-sm justify-between  w-full  hover:bg-[#545252] transition duration-200 ease-in-out  `}
                              type="button"
                            >
                              Closed
                            </button>
                          </Tab>
                        </div>
                      </TabList>
                    </div>
                  </div>

                  <TabList className="hidden lg:flex flex-row items-center justify-start  tabs-header rounded-md gap-3">
                    <Tab className="">
                      <button className="flex items-center text-sm px-6 py-3 rounded button2 h-12">All</button>
                    </Tab>
                    <Tab className="">
                      <button className="flex items-center text-sm px-6 py-3 rounded h-12 button2">Pending</button>
                    </Tab>
                    <Tab className="">
                      <button className="flex items-center text-sm px-6 py-3 rounded h-12 button2">Active</button>
                    </Tab>
                    <Tab className="">
                      <button className="flex items-center text-sm px-6 py-3 rounded h-12 button2">Closed</button>
                    </Tab>
                  </TabList>
                </div>

                <div className="py-4">
                  <TabPanel>
                    <div className=" w-full mt-3 md:mt-0  relative rounded h-full fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-7 gap-y-7">
                        {proposals
                          ? proposals.map((proposal, index) => (
                              <Link key={index} href={`/spaces/${space.slug}/proposals/${proposal.id}/weighted-voting`}>
                                <div className="px-5 py-7 border border-[#545252] text-white text-sm font-medium rounded-lg flex items-start justify-start flex-col form-check gap-2 cursor-pointer">
                                  <div className="flex items-start flex-wrap md:flex-nowrap mb-3 gap-3">
                                    <div className="grow">
                                      <h4 className="mb-3 text-sm text-[#E6E5E5]">{proposal.title}</h4>
                                      <div className="inline-flex items-center space-x-2">
                                        <span className="text-[#8F8F8F]">by</span>
                                        <span className="inline-flex items-center gap-1 text-xs">
                                          <img src="/spaces-img/image3.svg" className="w-6 h-6" />
                                          {ellipAddress(proposal.from)}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="relative  flex items-center md:justify-end font-normal  text-[#EEF0F2] leading-tight border border-[#545252] rounded-full bg-[#3F3F3F]">
                                      <span className="flex items-center rounded-full text-sm  justify-start py-2 px-5 ">
                                        <span className="h-2 w-4 text-green-500 rounded-full text-center">
                                          <svg
                                            width="6"
                                            height="6"
                                            viewBox="0 0 6 6"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <circle cx="3" cy="3" r="3" fill="currentColor" />
                                          </svg>
                                        </span>
                                        Active
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-start justify-start flex-col space-y-2">
                                    {/* <h5 className=' text-[#E6E5E5] text-sm'>Weighted voting</h5> */}
                                    <p className="text-xs text-[#C3C3C3] leading-5">
                                      {proposal.body.substr(0, 100)}...
                                    </p>
                                  </div>

                                  <div className="flex items-center justify-between w-full mt-4 flex-wrap gap-2">
                                    <span className="text-[#8F8F8F]">Few days left</span>
                                    <span>
                                      <span className="text-[#8F8F8F] mr-4">End:</span> {convTime(proposal.end)}{' '}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            ))
                          : ''}
                      </div>
                    </div>
                  </TabPanel>
                </div>
              </Tabs>
            </div>
          </div>
        ) : (
          ''
        )}
      </Layout>
    </div>
  )
}

export default Proposals
