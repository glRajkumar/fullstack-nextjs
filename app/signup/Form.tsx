"use client";

import { useState } from 'react';
import EyeClose from '../../svg/common/eye-close.svg';
import EyeOpen from '../../svg/common/eye-open.svg';

function Form() {
  const [showPass, setShowPass] = useState(false)

  const updateShowPass = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPass(p => !p)
  }

  return (
    <form>
      <div className="mb-4">
        <label htmlFor="signup-name">Name</label>
        <input
          id="signup-name"
          type="text"
          name="name"
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4 relative">
        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type={showPass ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          className='pr-9'
        />
        <button
          onClick={updateShowPass}
          className="px-0 absolute bottom-1 right-2"
        >
          {
            showPass
              ? <EyeOpen className="w-5 h-5" />
              : <EyeClose className="w-5 h-5" />
          }
        </button>
      </div>

      <button
        className="block mx-auto mb-6 px-12 bg-slate-900 text-white hover:bg-slate-700 transition-colors"
        type='submit'
      >
        Sign up
      </button>
    </form>
  )
}

export default Form