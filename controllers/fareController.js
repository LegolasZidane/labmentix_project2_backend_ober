import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY;
const BASE_FARE = 50;
const PER_KM_RATE = 10;

export const getFareEstimate = async (req, res) => {
    
    const { origin, destination } = req.body;

    if( !origin || !destination ){
        return res.status(400).json({ error: "Origin and destination required"});
    }

    try{
        
        const url = `https://api.geoapify.com/v1/routing`;
        const { data } = await axios.get(url, {
            params: {
                waypoints: `${origin[0]},${origin[1]}|${destination[0]},${destination[1]}`,
                mode: "drive",
                apiKey: GEOAPIFY_KEY
            }
        });

        if( !data.features || data.features.length === 0 ){
            return res.status(500).json({ error: "No route found" });
        }

        const distanceMeters = data.features[0].properties.distance;
        const distanceKm = distanceMeters/1000;

        const fare = BASE_FARE + PER_KM_RATE * distanceKm;

        res.json({
            distance: distanceKm.toFixed(2),
            fare: fare.toFixed(2)
        });
    }   catch(err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to calculate fare"});
    }
};