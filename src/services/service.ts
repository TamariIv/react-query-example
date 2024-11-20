// Fetch all cars
export const fetchCars = async () => {
    try {
        const response = await fetch("/api/cars");
        console.log("my res", response);
        if (!response.ok) {
            throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message); // Safely access error.message
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};

// Create a new car
export const createCar = async (carData: any) => {
    try {
        const response = await fetch("/api/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(carData),
        });

        if (!response.ok) {
            throw new Error("Failed to create car");
        }
        console.log("res", response);
        const data = await response.json();
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};

// Update an existing car
export const updateCar = async ({carId, updatedData}: {carId: string, updatedData: object}) => {
    console.log("hereeee", carId, updatedData);
    try {
        const response = await fetch(`/api/cars`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: carId,  // Make sure this is a valid MongoDB ObjectId string
                ...updatedData,  // Include the update data
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update car");
        }

        const data = await response.json();
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};

// Delete a car
export const deleteCar = async (carId: string) => {
    try {
        const response = await fetch(`/api/cars`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: carId }),
        });

        if (!response.ok) {
            throw new Error("Failed to delete car");
        }

        return { message: "Car deleted successfully" };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};
