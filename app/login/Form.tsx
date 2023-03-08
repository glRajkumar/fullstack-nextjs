"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import EyeClose from '@/svg/common/eye-close.svg';
import EyeOpen from '@/svg/common/eye-open.svg';

type dataType = { email: string, password: string }

function Form() {
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const [showPass, setShowPass] = useState(false)

  const updateShowPass = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPass(p => !p)
  }

  const onSubmit = (data: dataType) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="login-email">Email</label>
        <input
          autoFocus
          id="login-email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email"
            },
          })}
        />

        {
          errors.email &&
          <div className="mt-0.5 text-xs text-red-600">
            {errors.email.message}
          </div>
        }
      </div>

      <div className="mb-4">
        <label htmlFor="login-password">Password</label>
        <div className='relative'>
          <input
            id="login-password"
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            className='pr-9'
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: "Password must be strong"
              }
            })}
          />
          <button
            onClick={updateShowPass}
            className="px-0 absolute bottom-1 right-2"
            type="button"
          >
            {
              showPass
                ? <EyeOpen className="w-5 h-5" />
                : <EyeClose className="w-5 h-5" />
            }
          </button>
        </div>

        {
          errors.password &&
          <div className="mt-0.5 text-xs text-red-600">
            {errors.password.message}
          </div>
        }
      </div>

      <button
        className="block mx-auto mb-6 px-12 bg-slate-900 text-white hover:bg-slate-700 transition-colors"
        type='submit'
      >
        Login
      </button>
    </form>
  )
}

export default Form