import React from 'react';
import { 
    User, 
    Mail, 
    Phone, 
    Shield, 
    Bell, 
    Edit2,
    Camera
} from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const SettingsSection = ({user}) => {
    const lastLogin = "January 14, 2024 09:30 AM";
    
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Overview Card */}
            <Card className="border-none shadow-lg">
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">Profile Settings</CardTitle>
                    <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                
                <CardContent>
                    <div className="relative">
                        {/* Background Header */}
                        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-lg" />
                        
                        {/* Profile Content */}
                        <div className="px-6 pb-6">
                            {/* Avatar Section */}
                            <div className="relative inline-block -mt-16">
                                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                                    <AvatarFallback className="text-2xl bg-blue-100">
                                        {user?.name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                size="icon"
                                                className="absolute bottom-0 right-0 rounded-full bg-blue-600 hover:bg-blue-700"
                                                onClick={() => setIsEditProfileOpen(true)}
                                            >
                                                <Camera className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Change profile picture</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            {/* User Info Grid */}
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-semibold text-gray-900">
                                            {user?.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">Citizen Account</p>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Mail className="h-4 w-4" />
                                            <span className="text-sm">{user?.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Phone className="h-4 w-4" />
                                            <span className="text-sm">{user?.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 md:text-right">
                                    <Button 
                                        className="gap-2"
                                        onClick={() => setIsEditProfileOpen(true)}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Last login: {lastLogin}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Quick Settings */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="bg-gray-50 border-none">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center gap-2">
                                            <Shield className="h-5 w-5 text-blue-600" />
                                            <CardTitle className="text-base">Security Settings</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="outline" size="sm" className="w-full">
                                            Change Password
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gray-50 border-none">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center gap-2">
                                            <Bell className="h-5 w-5 text-blue-600" />
                                            <CardTitle className="text-base">Notification Preferences</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="outline" size="sm" className="w-full">
                                            Manage Notifications
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SettingsSection;