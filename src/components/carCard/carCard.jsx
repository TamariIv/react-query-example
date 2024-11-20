"use client"
import React, { useState } from "react";
import styles from "./carCard.module.css";
import { FaEdit } from "react-icons/fa";


export default function CarCard({ car, onDelete, onUpdate }) {

    const [isEditing, setIsEditing] = useState({ color: false, plate: false });
    const [editableFields, setEditableFields] = useState({ color: car.color, plate: car.plate });

    const handleEditClick = (field) => {
        setIsEditing((prevState) => ({ ...prevState, [field]: true }));
    };

    const handleChange = (event, field) => {
        setEditableFields({ ...editableFields, [field]: event.target.value });
    };

    const handleBlur = (field) => {
        setIsEditing((prevState) => ({ ...prevState, [field]: false }));
        onUpdate(car._id, { [field]: editableFields[field] }); // Call the onUpdate function with the new value
    };

    const handleDelete = () => {
        onDelete(car._id);
    }

    return (
        /* From Uiverse.io by alexruix */
        <div className={styles.card}>
            <div className={styles.carDetails}>
                <p className={styles.carModel}>{car.model}</p>

                <div className={styles.carDetail}>
                    {isEditing.color ? (
                        <input
                            type="text"
                            value={editableFields.color}
                            onChange={(e) => handleChange(e, "color")}
                            onBlur={() => handleBlur("color")}
                            autoFocus
                            className={styles.editInput}
                        />
                    ) : (
                        <>
                            {car.color} 
                            <FaEdit className={styles.editIcon} onClick={() => handleEditClick("color")} />
                        </>
                    )}
                </div>

                <p className={styles.carDetail}>
                    {isEditing.plate ? (
                        <input
                            type="text"
                            value={editableFields.plate}
                            onChange={(e) => handleChange(e, "plate")}
                            onBlur={() => handleBlur("plate")}
                            autoFocus
                            className={styles.editInput}
                        />
                    ) : (
                        <>
                            {car.plate}
                            <FaEdit className={styles.editIcon} onClick={() => handleEditClick("plate")} />
                        </>
                    )}
                </p>
            </div>
            <button className={styles.cardButton} onClick={handleDelete}>Delete</button>
        </div>
    )

}
