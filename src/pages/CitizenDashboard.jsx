import React, { useState } from "react";
import { 
    LayoutDashboard, 
    AlertTriangle, 
    Settings, 
    Menu, 
    X,
    Bell,
    User,
    Phone,
    Image as ImageIcon
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import SubordinateIssues from "@/components/SubordinateIssues";
import { useFetchUser } from "@/api/query";
import NotificationsSection from "@/components/NotificationsSection";
import SettingsSection from "@/components/CitizenProfile";

const CitizenDashboard = () => {
    const [activeTab, setActiveTab] = useState("notifications");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    
    const {data: user, isLoading, isError, removeFromCache} = useFetchUser();

    const navigationItems = [
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "myList", label: "My Issues", icon: AlertTriangle },
        { id: "settings", label: "Settings", icon: Settings },
    ];


    

    const EditProfileDialog = () => (
        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <Input id="name" defaultValue={user?.name} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <Input id="phone" defaultValue={user?.phone} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="avatar">Profile Image</Label>
                        <div className="flex items-center space-x-2">
                            <ImageIcon className="w-4 h-4 text-gray-500" />
                            <Input id="avatar" type="file" accept="image/*" />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            // Handle profile update logic here
                            setIsEditProfileOpen(false);
                        }}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );

    const renderContent = () => {
        switch (activeTab) {
            case "notifications":
                return <NotificationsSection notifications={user.Notifications} removeFromCache={removeFromCache} />;
            case "myList":
                return <SubordinateIssues />;
            case "settings":
                return <SettingsSection user={user} />;
            default:
                return <div>Select a tab</div>;
        }
    };

    if(isLoading) return <div>Loading...</div>;
    if(isError) return <div>Error</div>;

   

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside 
                className={`
                    fixed top-0 left-0 z-40 h-screen w-64 
                    bg-white border-r shadow-sm
                    transform transition-transform duration-200 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                `}
            >
                <div className="flex flex-col h-full">
                    <div className="h-16 flex items-center px-6 border-b">
                        <h1 className="text-xl font-bold text-gray-800">Citizen Dashboard</h1>
                    </div>
                    <nav className="flex-1 overflow-y-auto p-4">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                                        transition-colors duration-150
                                        ${activeTab === item.id 
                                            ? 'bg-blue-50 text-blue-600' 
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }
                                        my-2
                                    `}
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
                    <h1 className="text-xl font-bold text-gray-800">Municipal Dashboard</h1>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-md hover:bg-gray-100"
                    >
                        {isSidebarOpen ? (
                            <X className="h-6 w-6 text-gray-600" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-600" />
                        )}
                    </button>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {navigationItems.find(item => item.id === activeTab)?.label}
                            </h2>
                        </div>
                        {renderContent()}
                    </div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Edit Profile Dialog */}
            <EditProfileDialog />
        </div>
    );
};

export default CitizenDashboard;