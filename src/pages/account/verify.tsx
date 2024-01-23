import { verifyToken } from "../../../utils/token"
import { connectMongoDB } from '../../../lib/mongodb'
import User from '../../../models/user'
import { GetServerSideProps } from 'next';
import Link from "next/link";

const VerifyPage: React.FC = () => {
  return <div className="flex flex-col items-center">
    <div className=" mt-8 font-medium text-xl">Your adress mail has been successfully verified</div>;
  <Link href={"/"}>
  <button className="w-52 button h-10 mb-8">
    go to shopping
  </button>
</Link></div>
};
export default VerifyPage


export const getServerSideProps: GetServerSideProps = async ({ query: { token } }) => {
  const TIMEOUT_MS = 2000;
  try {
    await connectMongoDB();
    console.log('Start getServerSideProps');

    const { user } = verifyToken(token);
    console.log('Verified token:', user);

    const userExist = await User.findOne({ email: user.email });
    console.log('User exists:', userExist);

    if (!userExist) {
      
      await User.create(user);
      console.log('User created:', user);
    }

    console.log('End getServerSideProps');
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
  }

  return {
    props: {},
  };
};