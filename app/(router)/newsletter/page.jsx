import React from 'react'

function NewsLetter() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-3xl font-bold text-black sm:text-4xl">
          Join Our Newsletter Now
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-600">
          Get the latest news, offers, and courses from Learning Destiny delivered directly to your inbox.
        </p>

        <form action="" className="mt-8 bg-pink-100 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium text-black">Subscribe to our Newsletter</p>

          <div className="mt-4">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="fullName" className="sr-only">Full Name</label>
            <input
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your full name"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-red-500 text-white px-5 py-3 text-sm font-medium hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewsLetter
