import { calculateFare } from "../utils/fareUtils.js";

const dummyDriver = {
    id: "driver_123",
    name: "John Doe",
    vehicle: "Toyota Prius",
    phone: "+91-9876543210"
};

export const requestRide = async (req, res) => {

    const { origin, destination } = req.body;

    if( !origin || !destination ){
        return res.status(400).json({ error: "Origin and destination required" });
    }

    try {

        const { distance, fare } = await calculateFare(origin, destination);

        const ride = {

            id: Date.now(),
            origin,
            destination,
            status: "requested",
            requestedAt: new Date(),
            driverId: dummyDriver.id,
            driver: dummyDriver,
            distance,
            fare

        };

        res.status(201).json(ride);

    }   catch(err) {

        console.error("Error creating ride:", err.message);
        res.status(500).json({ error: "Failed to request ride" });

    }
};