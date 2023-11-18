import { buffer } from "micro";
import * as admin from 'firebase-admin';
import { db } from "../../../firebase"; 
import { collection } from "firebase/firestore";

// secure a connectioin to firebase from the backend
const serviceAccount = {
    "type": "service_account",
    "project_id": "redux-9c13a",
    "private_key_id": "56ef11ea34701b55872e2fd9622961089c194923",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDmNiM2Ayw9FDpl\nnsi4++TURqNhKxiEX0IfzX3WT3vWBjlGWe/ybmNywBoMo7hu49uYULPJNT+/sU6x\neSGYd2siqsYSwoH5AL+jZ7bLg1zYLUSqwDlAd4/kh3SHTM7IaQopWJKgzFFad0Ib\npxB2P4xK/cMeM6WOk5nBXFUMbVWFSEF9MXonsNyoa6WDQK5vr+4gBDJPvJ5h5IuS\nfwoS41V4vA+kwIjOsvVpLxOTZRYH6qRDCFvvJDT3qZv9A0eYbOpoxRw0Fr3o6aYG\niPCdGDCPLqo1FyV7xXaOdpgY/Kciw3vVUemYJcqpy58aUyxJo2sKt0Zbge2PxCd4\nTKhlqhbrAgMBAAECggEAHdFISUAq9DRRBgWFeRRDRM1rbvP+hnKyJV1f3ajI4OVI\neNjAT/XFUsEX/qgcBNzlffqB9t87RRBpoWoPlGhvS3u0EQz5ea+Dot4VmpGGroda\nfAVOxQ9XZ2G2Eao8pE+andVXlJUyOlX1DZDbfH1ppfLtWVWWLXvnr9hOOcBVkeAV\nmmZstnAX2LU76GEfiJkOpVAo90oZan4rmPBiEPLFlfNJ+rylp5ln+7DKzPAkZNEg\nv0IgI9MuMOM7KUnbjuTzq82z7hgjGAOaow6IW3ZtfIxKTnnyUC6ENpx5CmJdcVms\nqRO0e/lL1B0FvAkcA/uS35/cabZlTreyh9STHXa0aQKBgQD2bgWPjyVM0lrUMhR2\nV6NRgh0c3m4Yqaz6ALPGjA3MuxIobR44/X40IBYj0ymXMSLfhqOwYrcIzxrHci0S\nM7QmeLa8G6XlTLXU53C1Mbi+3lFz3OXDDxwocGMLDI3pI4fs3Jd9bCjoVHZ9bzFQ\n/nSlaeKcN58CPJDeNN3+XOktKQKBgQDvJuAQglq6DIeIa7I3Ok54chaa5TBIRNu/\nnkAByU7n4lM3AC8UYe9EeMy90RADFcP/K9zaxzXv0wvGdS6ytZOEiXX+JZ42vsXq\nOTjKblHb+FDzINwOtz+SojXC2wVUGqxdp6qWZ0F8R6UlfzIzca1hqX6EEBu0/bss\nNHSXi8CR8wKBgF1LG8nUrI9f18kbyIlg9lCGTNVAFDg8DGN9XpIdNaA7dk1duiJj\nPaMoPpmDeOxnSseK5m+Bf7/TAFVfkVahwmMKMkwWv4CGwRQAJrhCQano6rdNeqKV\nFtjsa2Kkdxk7PVtby/JMv1PtngowzV/XZXu2EXeIyycCnOmy5BRHQnO5AoGBAMdl\nEFhzdxW8MJyrvpGRia+e3/4RrSn0T4v6c7+JisKHz34CJz7FUOs0FPEGiGUqFpqA\nhcnbYrssqZq0RVU3U2GkAr79umZGtVlOkG0nghT3evbbpN6YJucpW821M0ImYyRL\nEU4JlW37hlQ3MzH1S+wrl5Kgo5lKHG8E5VkdalfFAoGBAPUwIF+Vqw9igJ/h0vGA\ndc2loVXSkEQF2sWwWoA9SJAvFihlqxssSqwdHoisp/BOzlUV03zGY+HEUbl+CAXO\ndYefvqiOqKeLbcXVSKsj+cWuX14fW20JLIQZDBmdEotzq537D+pziScM/lBVNDNg\nTrRaeTvtvKnqxNel5pVtlykO\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-571o9@redux-9c13a.iam.gserviceaccount.com",
    "client_id": "113227246806481534122",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-571o9%40redux-9c13a.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };
const app = !admin.apps.length?admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
}) : admin.app();


//establish connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) =>{
    console.log('coucou4');
    console.log('Fulfilling order');
     
        return app.firestore().collection('users').doc(session.metadata.email).collection('orders')
.doc(session.id).set({
	amount : session.amount_total / 100,
	images: JSON.parse(session.metadata.images),
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
	}).then(()=>{
        console.log(`SuCCESS : Order ${session.id} had been added to the DB`);
    });

};


export default async (req, res)=>{
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
        }catch(err){
            console.log('ERROR', err.message)
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        //handle the checkout.session.completed event
        if(event.type ==='checkout.session.completed'){
            console.log('coucou3');
            const session = event.data.object;
            console.log(session);

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

