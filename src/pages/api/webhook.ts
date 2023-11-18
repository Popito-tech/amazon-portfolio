import { buffer } from "micro";
import * as admin from 'firebase-admin';
import { setDoc, doc, serverTimestamp  } from "firebase/firestore"; 
import db from "../../../firebase";
import { NextApiRequest, NextApiResponse } from "next";


// secure a connectioin to firebase from the backend
const serviceAccount = {
    "type": "service_account",
    "project_id": "typescript-ada72",
    "private_key_id": "8087cb2d4a6fa61a89178d8909f73a253390124a",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQChAQs4zqmZ+y1S\nf64d5s5Y9NlXRNY6AShuVYRaEizofdwAR9e74MfioHWjtt6+QPRwb38SU8fIlBcN\nTKx+mVEjRIsZqPQrzZQYL8jaqiPNtL88iZh40xxiRzzYQHbKL85KCRe5G2SrD+p7\n/zUtylcxy8h3tf+1yKNKs7/32MRnUYfoFYhx499bfmaK9vnn+wJaYt4LziwGvlgE\nmk9Z2604aSPvGnGwnxsYPyaalQhSUDZ18R4pd4B7uEykRSgWIQ/NBJt5Buo8GC72\n6/jw3sNRhhm5afRsAdxtT6QnKF0SGtvYnG3Dfy5hhZ9ohQRBSV92fXRXp9QOae2l\nzOrxc6YVAgMBAAECggEACXtyAX+8Yd726Z2u78Bk5TzQYxEhC8v/KVZcg+B/qBan\ngxW4GS7RHuID46c0waA6NTf/1CC+iqvcGrKqEw+tBWZ3ScTXUpAaOX1w9x3fm3Ea\ndTKGWhFW4dvfs73CMUC1Bcu4y7RXDrMShIiAhYid74cYsKI1o+tj4JWrB+oKkSoW\nbLWIALPxwPAo77xXG98KlJwEViE5oEG5cu/b/AeoU3HIuEIooeVyCp/742xMthAp\nWusHDUkBBRjM07lMhja5+U6PUueaJ+nF3MVedglyglMmGYwJoKekv1Ub0bC3tigO\nG02jWngSkzeVc7EO+X0ON9XH8QRDaSz7ljJbs7rXWQKBgQDMR8qBVpRQM2t0L6y2\nOc/y4ECfZTnWyjr32gxEKFPKLTNX/P7yZMNDR0m5v+bx6ckxIO5QbAPEQWukhC7a\nvQy3PvYigGPKwVz4Cu2F/LErmUnppDMjcwVVTsz80c5kvSPOB4i/Dh0YM8H2BRbn\ncv6hpmhoJKXAXlJ2581Z337tGQKBgQDJxFgL8xI+fvMaKKpUpUmGDqFT+zCtrsTT\nR7N5HmttHDcg/SRgIuGI2dx4Jv3eRdj878XV/lCUPkp5GVSD/9aiVwEMrjmP1Xgo\nYId2U3o2UbOx4rK3qBnd5CMJC1Rnu+a0L+f66NLSD09yt8doqZyoCDoSdr7+UYj6\nqxlj/wAkXQKBgDNUxtoBO3t7sECdyjRwCoTpPNPQx9vlLTQionpt98AR45j0hcu6\n7iX1v9zhD9Mx/9BMihXDTp7+IWJRpMRqRMu3EnpQ8MJ+HDJn7I+Ck7J07lG7ZO4/\ndNOe3XuZ7Nb7gAfBdOctULpIJzD+zmaSStGr0wh4TP4ttWMTlFJFCsvhAoGAEB6z\nuiCtcHjMC2b8VM7v1NoOYZtMBFRWPVsZJ7AafRkn/ma7JUMkKb7eMmtLFRsXfv3Z\nHIO5BF8FrC8t5W3nRAkXeF/jEW7IrtEngXih5v0YEjo+dRXlGylC81IIaFFG2VaK\nfi1jyoyWmF++esoyTep6WUdLcx4oh35sBOU2qbECgYBQvI0Bm3sYtIUbLAuXrvRD\nyx81frI88d3JTrVVyabIepDNr8q422QP7QlogbSuzwnGgz0aoNF4eDyt11Lvt2ak\nGXGsw9Nh7yPI408ZXrMeiHufX+QQzVljaWPFJ5XtyMQOSzJXmF6czNS9YKrLdJx5\n17xdVJszXFuJ0ThgqIL7cA==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-5adm4@typescript-ada72.iam.gserviceaccount.com",
    "client_id": "104560421000495070428",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5adm4%40typescript-ada72.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };
const app = !admin.apps.length?admin.initializeApp({
    credential:admin.credential.cert(serviceAccount as admin.ServiceAccount)
}) : admin.app();


//establish connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session:any) =>{
    console.log('coucou4');
    // console.log(session);
        console.log(session.metadata.email);
     
         try {

            const docRef = await setDoc(doc(db, "users", session.metadata.email, 'orders', session.id), {
                amount : session.amount_total / 100,
                images: JSON.parse(session.metadata.images),
                timestamp: serverTimestamp(),
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          };

};


export default async (req: NextApiRequest, res: NextApiResponse)=>{
    if (req.method === 'POST'){
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig =req.headers['stripe-signature'];

        let event;
        console.log('coucou1');

        //Verify that the event posted came from stripe
        try{
            event=stripe.webhooks.constructEvent(payload, sig, endpointSecret);
            console.log('coucou2');
        }catch(err:any){
            console.log('ERROR', err.message)
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        //handle the checkout.session.completed event
        if(event.type ==='checkout.session.completed'){
            console.log('coucou3');
            const session = event.data.object;
            

            //Fulfill the order...
            return fulfillOrder(session).then(()=> res.status(200))
            .catch((err)=>res.status(400).send(`Webhook Error: ${err.message}`));
        }

    }
};

export const config ={
    api:{
        bodyParser: false,
        externalResolver: true,
    }
}



