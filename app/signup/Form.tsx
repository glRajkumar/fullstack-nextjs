"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import EyeClose from '@/svg/common/eye-close.svg';
import EyeOpen from '@/svg/common/eye-open.svg';

type dataType = { name: string, email: string, password: string }

function Form() {
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  const [showPass, setShowPass] = useState(false)
  const router = useRouter()

  const updateShowPass = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPass(p => !p)
  }

  const onSubmit: SubmitHandler<dataType> = async data => {
    try {
      await axios.post("/api/auth/signup", { ...data })
      router.push('/login')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="signup-name">Name</label>
        <input
          id="signup-name"
          type="text"
          placeholder="Enter your name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name should be atleast 3 characters"
            }
          })}
        />

        {
          errors.name &&
          <div className="mt-0.5 text-xs text-red-600">
            {errors.name.message}
          </div>
        }
      </div>

      <div className="mb-4">
        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
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
        <label htmlFor="signup-password">Password</label>
        <div className='relative'>
          <input
            id="signup-password"
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
        Sign up
      </button>
    </form>
  )
}

export default Form