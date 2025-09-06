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
    };

    console.log("Ride requested:", ride);

    res.status(201).json(ride);
};