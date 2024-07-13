import {useState} from 'react';
import {Link} from 'react-router-dom';
import NavbarV1 from '@/components/NavbarV1';
import ProfileDetails from '@/components/ui/profile-details';
import BusinessDetails from '@/components/business-details';
import DeleteUserAccount from '@/components/deleteUserAccount';
import Logout from '@/components/ui/logout';

const SettingsPage = () => {
    const [activeSection, setActiveSection] = useState("personal");

    const handleSectionClick = (section) => {
        setActiveSection(section);
    };

    const sections = [
        {id: "personal", label: "Personal details", component: <ProfileDetails/>},
        {id: "business", label: "Business detail", component: <BusinessDetails/>},
        {id: "deleteAccount", label: "Delete my account permanently", component: <DeleteUserAccount/>},
        {id: "logout", label: "Log Out", component: <Logout/>}
    ];

    return (
        <div className="flex min-h-screen flex-col">
            <NavbarV1/>
            <main className="flex-1 flex flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                </div>
                <div
                    className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground">
                        {sections.map(section => (
                            <Link
                                key={section.id}
                                to="#"
                                className={`font-semibold ${activeSection === section.id && 'text-primary'}`}
                                onClick={() => handleSectionClick(section.id)}
                            >
                                {section.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="grid gap-6">
                        {sections.find(section => section.id === activeSection)?.component}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;