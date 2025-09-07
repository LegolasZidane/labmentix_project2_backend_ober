const dummyDriver = {
    id: "driver_123",
    name: "John Doe",
    vehicle: "Toyota Prius",
    phone: "+91-9876543210"
};

export const requestRide = (req, res) => {

    const { origin, destination } = req.body;

    if( !origin || !destination ){
        return res.status(400).json({ error: "Origin and destination required" });
    }

    const ride = {
        id: Date.now(),
        origin,
        destination,
        status: "requested",
        requestedAt: new Date(),
        driverId: dummyDriver.id
    };

    res.status(201).json({
        ...ride,
        driver: dummyDriver
    });
};