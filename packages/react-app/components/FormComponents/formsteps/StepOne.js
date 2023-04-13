import React, { useState } from 'react'

const StepOne = ({ handleClick, currentStep, steps, data, setData }) => {
  const addTag = (tag) => {
    let tags = data?.categories ? data?.categories.split(', ') : []
    tags.push(tag)

    if (tag == 'clear_all') {
      tags = []
      setData({ ...data, categories: '' })
    }

    setData({ ...data, categories: tags.join(', ') })

    return false
  }

  const upload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)

    //@Todo use this for now to avaoid passing Cloudinary free tier limits
    // setData({
    //   ...data,
    //   logo: 'http://res.cloudinary.com/dlnrf91ax/image/upload/v1679579174/ktxrabfxvlo0lkcmld6h.png',
    // })

    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlnrf91ax/upload'
    const CLOUDINARY_UPLOAD_PRESET = 'k7fvlrzw'

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.secure_url !== '') {
          console.log(res)
          setData({
            ...data,
            logo: res.secure_url,
          })
        }
      })
      .catch((err) => {
        console.error(err)
        setData({
          ...data,
          logo: 'http://res.cloudinary.com/dlnrf91ax/image/upload/v1679579174/ktxrabfxvlo0lkcmld6h.png',
        })
      })
  }

  return (
    <>
      <div className="fade-in">
        {/* 1 0f 3 Create a space */}

        <form onSubmit={() => handleClick('next', data)}>
          <div className="space-y-7">
            <div className="w-full">
              <label className="text-sm text-gray-300">Name of Space</label>
              <input
                type="text"
                required
                placeholder="Lets go on"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data?.name}
                className="bg-transparent border w-full text-sm h-12 border-[#545252] focus:outline-none  rounded-3xl p-3 text-[#FFFFFF]"
              />
            </div>

            <div className="w-full">
              <label className="text-sm text-gray-300 ">Description of Space</label>
              <input
                onChange={(e) => setData({ ...data, description: e.target.value })}
                type="text"
                required
                value={data?.description}
                placeholder="Tell us about your space. What is it about?"
                className="bg-transparent border w-full h-12 border-[#545252] text-sm rounded-3xl px-4 py-3 text-[#FFFFFF] focus:outline-none "
              />
            </div>

            <div>
              <div className="w-full mb-3">
                <label className="text-sm text-gray-300">Select category</label>
                <input
                  type="text"
                  onChange={(e) => setData({ ...data, category: e.target.value })}
                  value={data?.categories ? data?.categories : 'General'}
                  readOnly
                  placeholder="You can type in what category is your space?"
                  className="bg-transparent border w-full h-12 border-[#545252] text-sm rounded-3xl p-3 mb-1 focus:outline-none  "
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    addTag('Art')
                  }}
                  className="bg-lyt  py-3 px-6 text-xs rounded-full"
                >
                  Art
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    addTag('Protocol')
                  }}
                  className="bg-lyt  py-3 px-6 text-xs rounded-full"
                >
                  Protocol
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    addTag('Social')
                  }}
                  className="bg-lyt  py-3 px-6 text-xs rounded-full"
                >
                  Social
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    addTag('Investment')
                  }}
                  className="bg-lyt  py-3 px-6 text-xs rounded-full"
                >
                  Investment
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    addTag('Services')
                  }}
                  className="bg-lyt  py-3 px-6 text-xs rounded-full"
                >
                  Services
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    addTag('clear_all')
                  }}
                  className="bg text-red-700  py-3 px-6 text-xs rounded-full"
                >
                  Clear all x
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-sm ">Your Logo (png,jpg,jpeg)</h4>
              <p className="text-sm text-gray-300 mb-4">This will be displayed on your profile.</p>
              <div className="flex mb-6">
                <div className="rounded-full mr-6 bg-lyt w-12 h-12 flex items-center justify-center">
                  <img className="border rounded" src={data.logo ? data.logo : './gallery.svg'} />
                </div>
                <div className="flex gap-3 items-center">
                  <input type="file" accept=".png, .jpg, .jpeg" className="hidden" id="logo" onChange={upload} />
                  <button
                    className="text-purple-800 text-sm py-1 px-4 bg-[#ffffff] rounded-full"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('logo').click()
                    }}
                  >
                    Upload Logo
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full">
              <label className="text-sm text-gray-300">Website</label>
              <input
                type="text"
                onChange={(e) => setData({ ...data, website: e.target.value })}
                value={data?.website ? data?.website : ''}
                required
                // placeholder="Paste URL of your website if any"
                className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3 text-[#FFFFFF] text-sm focus:outline-none"
              />
            </div>

            <div className="w-full">
              <label className="text-sm text-gray-300">Terms of service</label>
              <input
                type="text"
                onChange={(e) => setData({ ...data, terms: e.target.value })}
                value={data?.terms ? data?.terms : ''}
                required
                placeholder="Paste URL of your terms of service if any"
                className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3 text-[#FFFFFF] text-sm focus:outline-none "
              />
            </div>
          </div>

          <div className="border my-7 px-7 py-8 border-[#545252] rounded-md">
            <h4 className="mb-5">Add Socials</h4>
            <div className="space-y-6">
              <div>
                <label className="text-sm text-gray-300">Github</label>
                <br />
                <div className="mt-1 relative rounded-full flex-1 bg-transparent items-center grow flex h-14 w-full  ">
                  <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none h-full">
                    <span className="text-gray-500 px-3 w-22 h-22">
                      <img src="/github.svg" className="w-full h-full" />
                    </span>
                  </div>
                  <input
                    placeholder="Paste URL"
                    onChange={(e) => setData({ ...data, socials: { ...data.socials, github: e.target.value } })}
                    value={data?.socials ? data?.socials?.github : ''}
                    type="text"
                    name="github_address"
                    id="github_address"
                    className="  py-2 block w-full pl-16 pr-7  sm:text-sm rounded-full h-full focus:outline-none bg-transparent border border-[#545252] transition ease-in duration-200 text-[#FFFFFF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Twitter</label>
                <br />
                <div className="mt-1 relative rounded-full flex-1 bg-transparent items-center grow flex h-14 w-full  ">
                  <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none h-full">
                    <span className="text-gray-500 px-3 w-22 h-22">
                      <img src="/twitter.svg" className="w-full h-full" />
                    </span>
                  </div>
                  <input
                    placeholder="Paste URL"
                    type="text"
                    onChange={(e) => setData({ ...data, socials: { ...data.socials, twitter: e.target.value } })}
                    value={data?.socials ? data?.socials?.twitter : ''}
                    name="twitter_address"
                    id="twitter_address"
                    className="  py-2 block w-full pl-16 pr-7  text-sm rounded-full h-full focus:outline-none bg-transparent border border-[#545252] transition ease-in duration-200 text-[#FFFFFF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Discord</label>
                <div className="mt-1 relative rounded-full flex-1 bg-transparent items-center grow flex h-14 w-full  ">
                  <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none h-full">
                    <span className="text-gray-500 px-3 w-22 h-22">
                      <img src="/discord.svg" className="w-full h-full" />
                    </span>
                  </div>
                  <input
                    placeholder="Paste URL"
                    type="text"
                    name="discord_address"
                    onChange={(e) => setData({ ...data, socials: { ...data.socials, discord: e.target.value } })}
                    value={data?.socials ? data?.socials?.discord : ''}
                    id="discord_address"
                    className="  py-2 block w-full pl-16 pr-7  text-sm rounded-full h-full focus:outline-none bg-transparent border border-[#545252] transition ease-in duration-200 text-[#FFFFFF]"
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="button1 h-12 w-full m-auto rounded-3xl">
            {currentStep === steps.length - 1 ? 'Confirm' : 'Next'}
          </button>
        </form>
      </div>
    </>
  )
}

export default StepOne
