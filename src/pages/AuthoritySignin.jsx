import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User,Mail, Lock, MapPin } from 'lucide-react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store/user';

const AuthorityLoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [loading,setLoading] = useState(false);

  const setUser = useSetRecoilState(userAtom)

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

   

    

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setError('Please enter a valid 10-digit email number');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true)

    try{
        const res = await axios.post(`${"http://localhost:3000"}/auth/authoritylogin`, formData,{withCredentials : true});
        localStorage.setItem('type',res.data.user.role)
        setUser(res.data.user)
        

        navigate('/dashboard')
    }catch(e){
        console.log(e)
    }finally{
        setLoading(false)
    }
  };
  const handleForgot = async () => {
    
    
    navigate('/reset-password', { 
        state: { 
            type: 'email'
        } 
        });
  }
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center">
        <Card className="w-full max-w-md border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Employee Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
             

              <div className="space-y-2">
                <Label htmlFor="email">email Number</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="tel"
                    placeholder="1234567890"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <p className='cursor-pointer' onClick={handleForgot}>Forgot Password?</p>
              </div>

             

              <Button type="submit" className="w-full">
                {loading ? 'Loading...' : 'Sign In'}
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
            backgroundImage: 'url(https://tse1.mm.bing.net/th?id=OIG3._11U013Xn5j5oQxsmE_8&pid=ImgGn)',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 6, 0.3) 0%, rgba(0, 0, 2, 0.5) 100%)'
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

export default AuthorityLoginForm;


