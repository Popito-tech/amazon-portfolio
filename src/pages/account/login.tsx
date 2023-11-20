import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import {signIn} from 'next-auth/react'
import Link from "next/link";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      {/* SIGN IN WITH CREDENTIALS */}
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
  
      {/* ERROR MESSAGES */}
      if (res?.error) {
        setError("Invalid Credentials");
        console.log('res.error :', res.error)
        return;
      }
        router.replace("/");
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">

      {/* FORM TITLE */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      {/* FORM LABELS AND INPUTS */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>

          <label htmlFor="email" className="labelCustomStyle">
            Email address
          </label>
          <input id="email" name="email" type="email" required
          onChange={(e) => setEmail(e.target.value)}
          className="inputCustomStyle">
          </input>

          <div className="flex items-center justify-between mt-6">
            <label htmlFor="password" className="labelCustomStyle">
              Password
            </label>
            <Link href="/account/forgot_password" className="font-semibold text-sm text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </Link>
          </div>
          <input id="password" name="password" type="password" required
          onChange={(e) => setPassword(e.target.value)}
          className="inputCustomStyle">
          </input>

          <button
          type="submit"
          className="flex w-full h-10 mt-6 justify-center px-3 py-1.5 text-l font-semibold leading-6 button">
            Sign in
          </button >

          {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
          )}
        </form>

      {/* CREATE ACCOUNT OR SIGN IN WITH GOOGLE */}
      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}

        <Link href="/account/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Create an account 
        </Link>

        {' '}or

        <a
        onClick={()=>signIn('google', { callbackUrl: '/' })}
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">
          {' '}Sign in with Google
        </a>

      </p>
    </div>
  </div>
  )
}

