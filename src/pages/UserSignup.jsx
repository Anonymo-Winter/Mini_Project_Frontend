import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Phone, Lock, MapPin } from "lucide-react";
import { useUserSignup } from "@/api/query";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const SignupForm = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [error, setError] = React.useState("");
    const [formData, setFormData] = React.useState({
        name: "Tarun Sumanth",
        phone: "9505037969",
        password: "12312312",
        latitude: null,
        longitude: null,
    });
    const { data, mutate: signup, isPending, isError, isSuccess, error: err } = useUserSignup();
    const { toast } = useToast();
    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData((prev) => ({
                        ...prev,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }));
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setError("Unable to get location. Please enable location services.");
                }
            );
        }
    }, []);

    useEffect(() => {
        if (isError) {
            toast({
                title: "Error",
                description: err.response?.data?.error,
                variant: "destructive",
            });
        }
    }, [isError]);

    const validatePhone = (phone) => {
        return /^\d{10}$/.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (!formData.name.trim()) {
                setError("Name is required");
                return;
            }

            if (!validatePhone(formData.phone)) {
                setError("Please enter a valid 10-digit phone number");
                return;
            }

            if (formData.password.length < 8) {
                setError("Password must be at least 8 characters long");
                return;
            }

            if (!formData.latitude || !formData.longitude) {
                setError("Location access is required");
                return;
            }

            signup(formData);
        } catch (error) {
            console.log("hey");
        }
    };

    if (isSuccess) {
        queryClient.setQueryData(["user"], data);
        navigate("/verify-otp", { state: { type: "phone", credential: formData.phone } });
    }

    return (
        <div className="min-h-screen flex">
            {/* Left side - Form */}
            <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center">
                <Card className="w-full max-w-md border-none shadow-none">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Citizen Registration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        className="pl-10"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="1234567890"
                                        className="pl-10"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        className="pl-10"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="h-4 w-4" />
                                {formData.latitude ? "Location accessed" : "Accessing location..."}
                            </div>

                            <Button type="submit" className="w-full">
                                {isPending ? "Loading..." : "Sign Up"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Right side - Image with gradient overlay and text */}
            <div className="w-1/2 relative hidden md:block">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url(https://tse1.mm.bing.net/th?id=OIG3._11U013Xn5j5oQxsmE_8&pid=ImgGn)",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(135deg, rgba(0, 0, 6, 0.3) 0%, rgba(0, 0, 2, 0.5) 100%)",
                    }}
                />
                {/* <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
          <h2 className="text-4xl font-bold mb-6">
            Efficient Issue Management System
          </h2>
          <p className="text-lg leading-relaxed">
            Join our community-driven platform designed to streamline issue reporting and resolution. Our system enables citizens to easily report concerns, track progress, and collaborate with local authorities for faster resolution. With real-time updates and location-based reporting, we ensure that your voice is heard and your concerns are addressed effectively.
          </p>
        </div> */}
            </div>
        </div>
    );
};

export default SignupForm;
