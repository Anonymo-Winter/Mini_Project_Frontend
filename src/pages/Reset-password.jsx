import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import axios from 'axios';

const ResetPassword = () => {
  const [phone, setPhone] = useState('');
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const type = location.state?.type;

  useEffect(() => {
    if (!type) {
      navigate('/signup');
    }
  }, [type, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post(`${"http://localhost:3000"}/auth/user-forgot-password`,{phone : phone},{withCredentials : true});
      navigate('/verify-otp', { 
        state: { 
            credential: phone,
            type: 'phone'
        } 
        });
    } catch (error) {
      console.error('Failed to send OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>
            {`Enter your ${type} to receive an OTP`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="[0-9]{10}"
                className="w-full"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading || !phone}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;