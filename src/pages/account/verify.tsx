import { verifyToken } from "../../../utils/token"
import { connectMongoDB } from '../../../lib/mongodb'
import User from '../../../models/user'
import { GetServerSideProps } from 'next';

const VerifyPage: React.FC = () => {
  return <div>Verify page.</div>;
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