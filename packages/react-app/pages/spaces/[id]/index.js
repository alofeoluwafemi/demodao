import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react'
import DropdownIcon from '../../../components/Icons/DropdownIcon'
import EditIcon from '../../../components/Icons/EditIcon'
import ReturnIcon from '../../../components/Icons/ReturnIcon'
import Layout from '../../../components/Layout/Layout'

const SpaceDetail = () => {
  const [space, setSpace] = useState()
  const router = useRouter()
  const scrollRef = useRef()
  const goBack = () => {
    router.back()
  }
  const [id, setId] = useState(router.query.id)

  const [showMore, setShowMore] = useState(false)

  const handleShowMore = () => {
    setShowMore(!showMore)
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })

    setId(router.query.id)
    const getSpace = async () => {
      const space = await fetch(`/api/spaces/show?slug=${router.query.id}`)
      const data = await space.json()

      console.log(data)
      setSpace(data)
    }

    getSpace()
  }, [showMore])

  return (
    <div>
      <Layout>
        <div>
          <div className="flex items-center justify-between">
            <button className="flex items-center bg-[#3F3F3F] gap-2 px-6 py-4 rounded-full" onClick={goBack}>
              <ReturnIcon /> Back
            </button>

            <button className="text-[#CF95F2] flex items-center flex-row gap-2 lg:hidden">
              <EditIcon />
              Edit Space
            </button>
          </div>

          <div className=" w-full mt-3 md:mt-0  relative rounded h-full px-3 ">
            {/* <div className='absolute h-full border border-[#E4E7EC] inset-0 z-0 mx-auto w-[0.5px] hidden md:block'></div> */}

            {space ? (
              <div className="flex flex-wrap lg:flex-nowrap py-6 w-full gap-6 relative">
                <div className=" mt-9 py-6 w-full lg:w-8/12 lg:border-r border-[#3F3F3F] lg:px-4 xl:px-10 space-detail">
                  <div className="flex lg:items-center justify-between flex-col lg:flex-row">
                    <div className="flex items-center flex-row gap-3">
                      <div className="h-14 w-14">
                        <img src={space.logo} className="w-full object-cover rounded-full  " />
                      </div>

                      <div>
                        <h4 className="mb-1">{space.name}</h4>
                        <p className="text-[#8F8F8F]">{space.members ? space.members.length : 0} Members</p>
                      </div>
                    </div>

                    <div>
                      <button className="text-[#CF95F2]  items-center flex-row gap-3 hidden lg:flex">
                        <EditIcon />
                        Edit Space
                      </button>

                      <div className="flex flex-col my-4 lg:hidden">
                        <Link
                          href={`/spaces/${space.slug}/proposals`}
                          className="rounded-full  text-center py-3 mb-2 w-full block text-[#CF95F2] underline lg:hidden"
                        >
                          View all Proposals
                        </Link>
                        <Link
                          href={`/spaces/${space.slug}/create-proposals`}
                          className="w-full rounded-full bg-[#736C77] text-white py-3 block text-center lg:hidden px-5"
                        >
                          Create Proposals
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="space-y-5 py-6">
                      <div>
                        <label className="flex flex-col gap-3">Description of space</label>
                        <textarea
                          className="scrollbar-change w-full border border-[#3F3F3F] focus:outline-none active:outline-none p-3  placeholder-text-primary bg-transparent rounded-lg textarea placeholder-text-sm text-[#8F8F8F] "
                          aria-placeholder="Leave a note for your client"
                          rows="5"
                          id="description"
                          defaultValue={space.description}
                        ></textarea>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label>Category</label>
                        <div className="space-x-4 flex flex-wrap gap-2">
                          {space.categories &&
                            space.categories.split(', ').map((item, index) => (
                              <span key={index} className="bg-[#3F3F3F] px-4 py-2 rounded-full">
                                {item}
                              </span>
                            ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label>Website</label>
                        <div className="space-x-4">
                          <input
                            type="text"
                            value={space.website}
                            className="w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#3F3F3F] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label>Terms of service</label>
                        <div className="space-x-4">
                          <input
                            type="text"
                            value={space.terms}
                            className="w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#3F3F3F] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    {showMore && (
                      <div className="space-y-6" ref={scrollRef}>
                        <div className="mb-4">
                          <h5>Controller address</h5>
                          <p className="text-xs text-[#8F8F8F]">
                            The user account with control over the spaces settings is the space controller.{' '}
                          </p>
                        </div>
                        <div className="relative rounded-full flex-1 bg-transparent items-center grow flex h-14 w-full">
                          <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none h-full">
                            <span className="px-3 w-14 h-14">
                              <img src="/spaces-img/image3.svg" className="w-full h-full" />
                            </span>
                          </div>
                          <input
                            type="text"
                            className=" py-2 block w-full pl-16 pr-7  text-sm rounded-full h-full focus:outline-none bg-transparent border border-[#545252] transition ease-in duration-200 text-white"
                            defaultValue={space.controller}
                          />
                        </div>

                        {/* <div className='flex items-center justify-start gap-3 rounded-full border border-[#545252] px-4 py-3 w-full'>

                                        <img src='/spaces-img/image3.svg' className='h-8 w-8'/>
                                        
                                    </div> */}

                        <div className="w-full relative border border-[#545252] rounded-lg py-3  ">
                          <button className="flex items-center justify-between  px-4 py-4 w-full text-white">
                            Partners
                            <DropdownIcon />
                          </button>

                          <div className="px-4 py-2">
                            <div className="pb-3 text-sm text-[#E6E5E5]">Address</div>

                            <div className="mb-3">
                              <input
                                type="text"
                                className="w-full h-12 rounded-full bg-transparent text-white border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out text-sm"
                                defaultValue={space.admins[0] != undefined && space.admins[0]}
                              />
                            </div>
                            <div className="mb-3">
                              <input
                                type="text"
                                className="w-full h-12 rounded-full bg-transparent text-white border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out text-sm"
                                defaultValue={space.admins[1] != undefined && space.admins[1]}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="w-full relative border border-[#545252] rounded-lg py-3  ">
                          <button className="flex items-center justify-between  px-4 py-4 w-full text-white">
                            Creators
                            <DropdownIcon />
                          </button>

                          <div className="px-4 py-2">
                            <div className="pb-3 text-sm text-[#E6E5E5]">Address</div>

                            <div className="mb-3">
                              <input
                                type="text"
                                className="w-full h-12 rounded-full bg-transparent text-white border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out text-sm"
                                defaultValue={space.authors[0] != undefined && space.authors[0]}
                              />
                            </div>
                            <div className="mb-3">
                              <input
                                type="text"
                                className="w-full h-12 rounded-full bg-transparent text-white border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out text-sm"
                                defaultValue="0x6tRtdgji7644780bxsdgi098rewwdgi09986hgdwq4t7v223"
                              />
                            </div>
                            <div className="mb-3">
                              <input
                                type="text"
                                className="w-full h-12 rounded-full bg-transparent text-white border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out text-sm"
                                defaultValue={space.authors[1] != undefined && space.authors[1]}
                              />
                            </div>
                            {/* <div className='flex items-center justify-start gap-3 rounded-full border border-[#545252] px-4 py-3 text-sm mb-3 '>
                                                0x6tRtdgji7644780bxsdgi098rewwdgi09986hgdwq4t7v223
                                            </div> */}
                          </div>
                        </div>

                        <div className="w-full relative border border-[#545252] rounded-lg py-3  ">
                          <button className="flex items-center justify-between  px-4 py-4 w-full text-white">
                            Socials
                            <DropdownIcon />
                          </button>

                          <div className="px-4 py-2 space-y-6">
                            <div>
                              <div className="pb-3 text-sm text-[#E6E5E5]">GitHub</div>
                              <div className="relative rounded-full flex-1 bg-transparent items-center grow flex h-14 w-full">
                                <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none h-full">
                                  <span className="px-3 w-14 h-14">
                                    <img src="/github.svg" className="w-full h-full" />
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className=" py-2 block w-full pl-16 pr-7  text-sm rounded-full h-full focus:outline-none bg-transparent border border-[#545252] transition ease-in duration-200 text-white"
                                  defaultValue={space.socials['github'] != undefined && space.socials['github']}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="pb-3 text-sm text-[#E6E5E5]">Twitter</div>
                              <div className="relative rounded-full flex-1 bg-transparent items-center grow flex h-14 w-full">
                                <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none h-full">
                                  <span className="px-3 w-14 h-14">
                                    <img src="/twitter.svg" className="w-full h-full" />
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className=" py-2 block w-full pl-16 pr-7  text-sm rounded-full h-full focus:outline-none bg-transparent border border-[#545252] transition ease-in duration-200 text-white"
                                  defaultValue={space.socials['twitter'] != undefined && space.socials['twitter']}
                                />
                              </div>
                              {/* <div className='flex items-center justify-start gap-3 rounded-full border border-[#545252] px-4 py-3 text-sm'>
                                                    <img src='/twitter.svg' className='h-8 w-8'/>
                                                    https://letsgoon.com
                                                </div> */}
                            </div>
                            <div>
                              <div className="pb-3 text-sm text-[#E6E5E5]">Discord</div>
                              <div className="relative rounded-full flex-1 bg-transparent items-center grow flex h-14 w-full">
                                <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none h-full">
                                  <span className="px-3 w-14 h-14">
                                    <img src="/discord.svg" className="w-full h-full" />
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className=" py-2 block w-full pl-16 pr-7  text-sm rounded-full h-full focus:outline-none bg-transparent border border-[#545252] transition ease-in duration-200 text-white"
                                  defaultValue={space.socials['discord'] != undefined && space.socials['discord']}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full relative border border-[#545252] rounded-lg py-3  ">
                          <button className="flex flex-col gap-2  px-4 py-4 w-full text-white">
                            <span className="flex items-center justify-between w-full">
                              Proposal Settings
                              <DropdownIcon />
                            </span>

                            <span className="text-muted text-xs text-[#A4A1A1] text-left">
                              This directs voters on how to vote. You can always change it later.
                            </span>
                          </button>

                          <div className="px-4 py-2 space-y-6">
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-col">
                                <label>Threshold</label>
                                <span className="text-[#A4A1A1] text-xs">
                                  Minimum Voting Power required to create a proposal
                                </span>
                              </div>

                              <div className="space-x-4">
                                <input
                                  type="text"
                                  className="w-full h-12 rounded-full bg-transparent text-white border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-col">
                                <label>Quorum</label>
                                <span className="text-[#A4A1A1] text-xs">
                                  Minimum number of votes necessary for a proposal to pass
                                </span>
                              </div>

                              <div className="space-x-4">
                                <input
                                  type="text"
                                  className="w-full h-12 rounded-full bg-transparent text-white border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out"
                                />
                              </div>
                            </div>
                            <div className="flex items-stretch w-full gap-5 lg:gap-16   h-full flex-col md:flex-row">
                              <div className="flex flex-col h-full gap-2 w-full md:w-1/2">
                                <div className="flex flex-col">
                                  <label>Voting Delay</label>
                                  <span className="text-[#A4A1A1] text-xs">
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
                                    className="  py-3 block w-full pl-4 pr-28 rounded-full bg-transparent  h-full border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out"
                                    name="voting_delay"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col justify-betweeen  gap-2 w-full md:w-1/2 h-full">
                                <div className="flex flex-col">
                                  <label>Voting Period</label>
                                  <span className="text-[#A4A1A1] text-xs">
                                    This states how long voting can be held for{' '}
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
                                    className="  py-3 block w-full pl-4 pr-28 rounded-full bg-transparent  h-full border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out"
                                    name="voting_period"
                                  />
                                </div>
                                {/* <div className='space-x-4'>
                                                        <input type="text" className='w-full h-12 rounded-full bg-transparent text-white border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out'/>
                                                    </div> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full relative border border-[#545252] rounded-lg py-3  ">
                          <button className="flex flex-col gap-2  px-4 py-4 w-full text-white">
                            <span className="flex items-center justify-between w-full">
                              Treasury
                              <DropdownIcon />
                            </span>

                            <span className="text-muted text-xs text-[#A4A1A1] text-left">
                              This directs voters on how to vote. You can always change it later.
                            </span>
                          </button>

                          <div className="px-4 py-2 space-y-6">
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-col">
                                <label>Network</label>
                              </div>

                              <button className="flex items-center justify-end gap-2 h-12  px-4 py-4 w-full text-white border border-[#545252] rounded-full">
                                <span className="flex items-center justify-end w-full">
                                  <DropdownIcon />
                                </span>
                              </button>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-col">
                                <label>Name</label>
                              </div>

                              <div className="">
                                <input
                                  type="text"
                                  className="w-full h-12 rounded-full bg-transparent text-white border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-col">
                                <label>Address</label>
                              </div>

                              <div className="">
                                <input
                                  type="text"
                                  className="w-full h-12 rounded-full bg-transparent text-white border border-[#545252] px-4 focus:border-[#545252] active:border-[#545252] focus:outline-none transition duration-150 ease-in-out"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="w-full flex items-center justify-center my-6">
                      <button className="flex items-center justify-center" type="button" onClick={handleShowMore}>
                        {showMore ? (
                          <>
                            View less
                            <DropdownIcon />
                          </>
                        ) : (
                          <>
                            View more
                            <DropdownIcon />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* <div className="w-full my-5 py-7">
                    <button className="button1 px-7 py-3 flex justify-center items-center text-center gap-5 rounded-full w-full">
                      Save
                    </button>
                  </div> */}
                </div>
                <div className="w-full lg:w-4/12 hidden lg:block">
                  <div className="rounded-lg p-4 border border-[#8F8F8F] sticky z-50 top-36 transition-all duration-200 ease-linear text-sm">
                    <h5 className="">Proposals</h5>

                    <div className="mt-5 pt-5">
                      {/* <h4 className='text-center mb-5 text-[#CF95F2]'>View all Proposals</h4> */}

                      <Link
                        href={`/spaces/${space.slug}/proposals`}
                        className="rounded-full  text-center py-3 mb-5 button-outline w-full block button-outline"
                      >
                        View all Proposals
                      </Link>
                      <Link
                        href={`/spaces/${space.slug}/create-proposals`}
                        className="w-full rounded-full bg-[#736C77] text-white py-3 block text-center"
                      >
                        Create Proposals
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default SpaceDetail
