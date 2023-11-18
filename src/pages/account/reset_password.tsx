import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { token } = router.query; // Access the 'e' query parameter

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('./../api/reset_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        console.log('Password reset successfully');
        // Handle the success case, e.g., redirect to a success page
      } else {
        console.error('Password reset failed');
        // Handle the failure case
      }
    } catch (error) {
      console.error('An error occurred while resetting the password', error);
      // Handle any network or server errors
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
    {/* TITLE */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset password
        </h1>
      </div>
      <div className="mt-10 mb-16 sm:mx-auto sm:w-full sm:max-w-sm">
      {/* GET NEW PASSWORD */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900">
                New Password
              </label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={handleChangePassword}
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center px-3 py-1.5 text-l font-semibold leading-6 button"
            >
              Save new Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;