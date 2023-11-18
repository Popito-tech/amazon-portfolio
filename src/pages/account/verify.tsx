import { verifyToken } from "../../../utils/token"
import { connectMongoDB } from '../../../lib/mongodb'
import User from '../../../models/user'
import { GetServerSideProps } from 'next';

const VerifyPage: React.FC = () => {
  return <div>Verify page.</div>;
};
export default VerifyPage


export const getServerSideProps:GetServerSideProps = async ({query: {
  token}}) => {
    try{
    const {user}= verifyToken(token)
    const userExist = await User.findOne({email: user.email})
    if(!userExist){
      await connectMongoDB();
      await User.create(user);
    };
  } catch (error){
    console.log({error});
}

  return {
    props: {
      
    }
  }
}