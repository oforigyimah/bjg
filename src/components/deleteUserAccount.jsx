import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

const DeleteUserAccount = () => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDeleteAccount = () => {
        // Will update here to remove the users.
        console.log('Deleting user account');
    };

    const toggleConfirmDelete = () => {
        setConfirmDelete(!confirmDelete);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Delete User Account</CardTitle>
            </CardHeader>
            <CardContent>
                {!confirmDelete ? (
                    <div className='flex justify-between py-5 flex-wrap'>
                        <p>Are you sure you want to delete your account?</p>
                        <Button onClick={toggleConfirmDelete} className="my-2">Confirm Delete</Button>
                    </div>
                ) : (
                    <div className='flex justify-between py-5 flex-wrap'>
                        <p>Deleting your account is permanent and cannot be undone.</p>
                        <div className='flex justify-between'>
                            <Button className='mr-5 mt-2' variant="destructive" onClick={handleDeleteAccount}>Delete
                                Account</Button>
                            <Button onClick={toggleConfirmDelete} variant="secondary" className="my-2">
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DeleteUserAccount;
