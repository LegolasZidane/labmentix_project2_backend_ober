import { calculateFare } from "../utils/fareUtils.js";

export const getFareEstimate = async (req, res) => {
    
    const { origin, destination } = req.body;

    if( !origin || !destination ){
        return res.status(400).json({ error: "Origin and destination required"});
    }

    try{
        
        const result = await calculateFare(origin, destination);
        res.json(result);

    }   catch(err) {

        console.error(err.message);
        res.status(500).json({ error: "Failed to calculate fare"});
        
    }
};