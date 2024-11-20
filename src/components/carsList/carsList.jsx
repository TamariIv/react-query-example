"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CarCard from "../carCard/carCard";
import styles from "./carsList.module.css";
import { fetchCars, createCar, deleteCar, updateCar } from "../../services/service";
import { FaPlus } from "react-icons/fa";

export default function CarsList() {
    const queryClient = useQueryClient();

    // Fetch cars
    const { data: cars = [], isLoading, error } = useQuery({
        queryKey: ["cars"],
        queryFn: fetchCars,
    });

    // Mutations
    const createCarMutation = useMutation({
        mutationFn: createCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
    });

    const deleteCarMutation = useMutation({
        mutationFn: deleteCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
    });

    const updateCarMutation = useMutation({
        mutationFn: updateCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
    });

    // Loading and error states
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Handlers
    const handleCreate = () => {
        createCarMutation.mutate({
            model: "Renault",
            color: "Red",
            plate: "ABC123",
        });
    };

    const handleDelete = (carId) => {
        deleteCarMutation.mutate(carId);
    };

    const handleUpdate = (id, update) => {
        updateCarMutation.mutate({
            carId: id,    
            updatedData: update,
        });
    };

    return (
        <div className={styles.grid}>
            {cars.map((car) => (
                <CarCard
                    key={car._id}
                    car={car}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            ))}
            <div className={styles.addCar}>
                <FaPlus className={styles.plus} onClick={handleCreate} />
            </div>
        </div>
    );
}
