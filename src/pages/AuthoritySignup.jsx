import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Mail, Lock, User, Building, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthoritySignup } from '@/api/query';

const AuthoritySignup = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    authority: '',
    department: '',
    office: '',
    secretField: ''
  });

  // Define department-specific authority types
  const departmentAuthorities = {
    administration: [
      { value: 'Representative authority', label: 'Representative authority' },
      { value: 'secretary', label: 'Secretary' },
      { value: 'receptionist', label: 'Receptionist' },
      { value: 'clerk', label: 'Clerk' }
    ],
    welfare: [
      { value: 'welfare-secretary', label: 'Welfare Secretary' },
      { value: 'welfare-officer', label: 'Welfare Officer' },
      { value: 'welfare-inspector', label: 'Welfare Inspector' },
      { value: 'social-worker', label: 'Social Worker' }
    ],
    engineering: [
      { value: 'chief-engineer', label: 'Chief Engineer' },
      { value: 'executive-engineer', label: 'Executive Engineer' },
      { value: 'assistant-engineer', label: 'Assistant Engineer' },
      { value: 'technical-officer', label: 'Technical Officer' }
    ],
    health: [
      { value: 'medical-officer', label: 'Medical Officer' },
      { value: 'health-supervisor', label: 'Health Supervisor' },
      { value: 'health-inspector', label: 'Health Inspector' },
      { value: 'medical-superintendent', label: 'Medical Superintendent' }
    ],
    education: [
      { value: 'education-officer', label: 'Education Officer' },
      { value: 'school-inspector', label: 'School Inspector' },
      { value: 'education-coordinator', label: 'Education Coordinator' },
      { value: 'academic-supervisor', label: 'Academic Supervisor' }
    ],
    agriculture: [
      { value: 'agriculture-officer', label: 'Agriculture Officer' },
      { value: 'field-supervisor', label: 'Field Supervisor' },
      { value: 'extension-officer', label: 'Extension Officer' },
      { value: 'agriculture-inspector', label: 'Agriculture Inspector' }
    ],
    revenue: [
      { value: 'revenue-officer', label: 'Revenue Officer' },
      { value: 'tax-inspector', label: 'Tax Inspector' },
      { value: 'revenue-inspector', label: 'Revenue Inspector' },
      { value: 'assessment-officer', label: 'Assessment Officer' }
    ],
    urban: [
      { value: 'urban-planner', label: 'Urban Planner' },
      { value: 'development-officer', label: 'Development Officer' },
      { value: 'planning-supervisor', label: 'Planning Supervisor' },
      { value: 'zonal-officer', label: 'Zonal Officer' }
    ]
  };

  const [errors, setErrors] = React.useState({});
  const [showAlert, setShowAlert] = React.useState(false);
  const navigate = useNavigate();
  const {mutate, isPending, isError} = useAuthoritySignup();

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.authority) {
      newErrors.authority = 'Please select an authority type';
    }

    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowAlert(true);
      mutate(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // If department changes, reset authority selection
      if (name === 'department') {
        return {
          ...prev,
          [name]: value,
          authority: ''
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl backdrop-blur-sm bg-white/90">
            <CardHeader className="space-y-1 pb-8">
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Authority Signup
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Create your authority account to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showAlert && (
                <Alert className="mb-6 bg-green-50 text-green-700 border-green-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Signup successful! Please check your email for verification.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    className={`transition-all duration-200 ${errors.name ? 'border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="John Doe"
                    onChange={handleChange}
                    value={formData.name}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className={`transition-all duration-200 ${errors.email ? 'border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="john@example.com"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className={`transition-all duration-200 ${errors.password ? 'border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="••••••••"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-medium">
                    <Building className="w-4 h-4 inline mr-2" />
                    Department
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      handleChange({ target: { name: 'department', value } });
                    }}
                    value={formData.department}
                  >
                    <SelectTrigger className={`w-full ${errors.department ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administration">Administration</SelectItem>
                      <SelectItem value="welfare">Welfare</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="urban">Urban Development</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authority" className="text-sm font-medium">
                    <Building className="w-4 h-4 inline mr-2" />
                    Authority Type
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      handleChange({ target: { name: 'authority', value } });
                    }}
                    value={formData.authority}
                    disabled={!formData.department}
                  >
                    <SelectTrigger className={`w-full ${errors.authority ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder={formData.department ? "Select your role" : "Please select department first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.department && departmentAuthorities[formData.department].map((authority) => (
                        <SelectItem key={authority.value} value={authority.value}>
                          {authority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.authority && (
                    <p className="text-red-500 text-sm mt-1">{errors.authority}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="office" className="text-sm font-medium">
                    <Key className="w-4 h-4 inline mr-2" />
                    Sachivalayam Code
                  </Label>
                  <Input
                    id="office"
                    name="office"
                    type="text"
                    className={`transition-all duration-200 ${errors.office ? 'border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="ABC123"
                    onChange={handleChange}
                    value={formData.office}
                  />
                  {errors.office && (
                    <p className="text-red-500 text-sm mt-1">{errors.office}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secretField" className="text-sm font-medium">
                    <Key className="w-4 h-4 inline mr-2" />
                    Secret Field
                  </Label>
                  <Input
                    id="secretField"
                    name="secretField"
                    type="password"
                    className="transition-all duration-200"
                    placeholder="••••••••"
                    onChange={handleChange}
                    value={formData.secretField}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
                >
                  {isPending ? 'Creating account...' : 'Sign Up'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthoritySignup;