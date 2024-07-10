import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

const Logout = () => {
    const handleLogout = () => {
        // Will update this part too to logout user with one click
        console.log("Logging out...");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Logout</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center flex-wrap">
                    <CardDescription>Are you sure you want to log out?</CardDescription>
                    <Button onClick={handleLogout} variant="destructive">Logout</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default Logout;
