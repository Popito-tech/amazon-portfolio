import {useState, useRef} from 'react'
import {useRouter} from 'next/navigation'



export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const registerUser = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      {/* VERIFYING IF USER ALREADY EXIST IN THE DATABASE */}
      const resUserExists = await fetch("./../api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const {user} = await resUserExists.json();

      if(user){
        setError("User already exists.");
        return;
      }

        {/* REGISTER USER IN THE DATABASE */}
        const response = await fetch('./../api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        {/* SUCCESS AND ERROR MESSAGE */}
        if (response.ok) {
          if (formRef.current) {
            formRef.current.reset();
          }
          alert('Sign Up Success! Check your email to complete the registration.');
          router.push("/account/login");
        }
        if (!response.ok) {
          alert('Registration failed!');
        }
    } catch (error) {
        console.error('Error registering user:', error);
    }
}
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">

      {/* FORM TITLE */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      {/* FORM LABELS AND INPUTS */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={registerUser} ref={formRef}>

            <label htmlFor="email" className="labelCustomStyle">
              Name
            </label>
            <input id="name" name="name" type="text" required
              onChange={(e) => setName(e.target.value)}
              className="inputCustomStyle"/>

            <label htmlFor="email" className="labelCustomStyle mt-6">
              Email address
            </label>
            <input id="email" name="email" type="email" required            
            onChange={(e) => setEmail(e.target.value)}
            className="inputCustomStyle"/>

            <label htmlFor="password" className="labelCustomStyle mt-6">
              Password
            </label>
            <input id="password" name="password" type="password" required        
            onChange={(e) => setPassword(e.target.value)}
            className="inputCustomStyle"/>

            <button
            type="submit"
            className="mt-6 h-10 flex w-full justify-center px-3 py-1.5 text-l font-semibold leading-6 button">
              Register
            </button>

            {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
            )}

        </form>
      </div>
    </div>

  )
}
