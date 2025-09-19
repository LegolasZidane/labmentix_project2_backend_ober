import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    
    const { fare, rideId } = req.body;

    if( !fare || !rideId ){
        return res.status(400).json({ error: "Fare and rideId required" });
    }

    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `Ride #${rideId}`
                        },
                        unit_amount: Math.round(fare * 100) //paise
                    },
                    quantity: 1
                }
            ],
            success_url: "https://labmentix-project2-backend-ober.onrender.com/payment-success",
            cancel_url: "https://labmentix-project2-backend-ober.onrender.com/payment-cancel"
        });

        res.json({ url: session.url });

    }   catch(err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to create payment session" });
    }
};