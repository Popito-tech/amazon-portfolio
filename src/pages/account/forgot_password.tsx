import { FormEvent, useState, useRef } from 'react'
import { useRouter } from 'next/router';


const forgot_password: React.FC = () => {
  const router = useRouter();
    const [email, setEmail] = useState("");
    const formRef = useRef<HTMLFormElement | null>(null);

    const handleForgotPassword  = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // VERIFY IF EMAIL ALREADY EXIST IN DATABASE
        try {
          const resUserExists = await fetch("./../api/userExists", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
          const {user} = await resUserExists.json();
          // IF YES SEND EMAIL TO RESET PASSWORD
          if(user){
            const response = await fetch('./../api/forgot_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user,
                }),
            });
            const msg ='Check your email to reset your password.';

            if (response.ok) {
              if (formRef.current) {
                formRef.current.reset();
              }
              alert(msg);
              router.push("/account/login");
            }
            return;
          }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }
    
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      {/* TITLE */}
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900' >
        Password forgotten ?
        </h1>
      </div>

    {/* ENTER EMAIL */}
      <div className="mt-10 mb-16 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleForgotPassword } ref={formRef}>
          <label htmlFor="password" className="labelCustomStyle">
            Enter your email
          </label>
          <input id="email" name="email" type="email" required
          onChange={(e) => setEmail(e.target.value)}
          className="inputCustomStyle">
          </input>

          {/* SUBMIT BUTTON */}
          <button
          type="submit"
          className="flex w-full justify-center px-3 py-1.5 text-l font-semibold leading-6 button">
            Send email
          </button>
        </form>
      </div>
    </div>
  )
}

export default forgot_password