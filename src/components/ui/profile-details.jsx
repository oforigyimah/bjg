import React, {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import User from "@/db/users.json";
import {TextButton} from "./text-button";

const ProfileDetails = () => {
    const [editedUser, setEditedUser] = useState(User[0]);

    const [editingField, setEditingField] = useState("");

    const handleEdit = (field) => {
        setEditingField(field);
    };

    const handleSave = () => {
        // I will update this part if we get the orginal backend
        console.log("Edited User:", editedUser);
        setEditingField("");
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedUser({...editedUser, [name]: value});
    };

    const renderField = (label, value, fieldName) => {
        return (
            <>
                <div className="flex items-center justify-between py-3 md:py-5 hidden md:flex">
                    <label>{label}</label>
                    {editingField === fieldName ? (
                        <input
                            type={fieldName === "email" ? "email" : "text"}
                            name={fieldName}
                            value={editedUser[fieldName]}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-1 my-1"/>
                    ) : (
                        <CardDescription className="py-3 md:py-0">{value}</CardDescription>
                    )}
                    <TextButton onClick={() => editingField === fieldName ? handleSave() : handleEdit(fieldName)}>
                        {editingField === fieldName ? "Save" : "Edit"}
                    </TextButton>
                </div>

                <div className="py-3 md:py-5 block md:hidden">
                    <div className="flex justify-between items-center">
                        <label>{label}</label>
                        {editingField === fieldName ? (
                            <input
                                type={fieldName === "email" ? "email" : "text"}
                                name={fieldName}
                                value={editedUser[fieldName]}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-1 my-1"/>
                        ) : (
                            <CardDescription className="py-3">{value}</CardDescription>
                        )}
                    </div>
                    <TextButton onClick={() => editingField === fieldName ? handleSave() : handleEdit(fieldName)}>
                        {editingField === fieldName ? "Save" : "Edit"}
                    </TextButton>
                </div>
            </>
        );
    };

    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
                {renderField("Username", editedUser.username, "username")}
                <hr className="hidden md:block"/>
                {renderField("Full Name", `${editedUser.firstName} ${editedUser.lastName}`, "fullName")}
                <hr className="hidden md:block"/>
                {renderField("Email", editedUser.email, "email")}
                <hr className="hidden md:block"/>
                {renderField("Phone Number", editedUser.phone, "phone")}
            </CardContent>
        </Card>
    );
};

export default ProfileDetails;
