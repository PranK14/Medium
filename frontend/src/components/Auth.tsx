import { Link, useNavigate } from 'react-router-dom'
import { LabelInput } from './LabelInput'
import { useState } from 'react'
import { signupType } from '@prank_14/common'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const navigate = useNavigate()
  const [postInputs, setPostInputs] = useState<signupType>({
    name: '',
    email: '',
    password: '',
  })

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${
          type === 'signup' ? 'signup' : 'signin '
        }`,
        postInputs
      )
      const jwt = response.data
      localStorage.setItem('token', jwt)
      navigate('/blogs')
    } catch (e) {
      alert('Error while signing up')
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an Account</div>
            <div className="text-center text-slate-400">
              {type === 'signup'
                ? 'Already have an account?'
                : "Don't have an account?"}
              <Link
                to={type === 'signup' ? '/signin' : '/signup'}
                className="hover:text-slate-600 underline ml-1"
              >
                {type === 'signup' ? 'Login' : 'Sign up'}
              </Link>
            </div>
          </div>
          {type === 'signup' ? (
            <LabelInput
              label="Username"
              placeholder="Enter your username"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }))
              }}
            />
          ) : null}
          <LabelInput
            label="Email"
            placeholder="Enter Email"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                email: e.target.value,
              }))
            }}
          />
          <LabelInput
            label="Password"
            placeholder="Enter Password"
            type={'password'}
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }))
            }}
          />
          <button
            type="button"
            onClick={sendRequest}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4 w-full"
          >
            {type === 'signup' ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}
