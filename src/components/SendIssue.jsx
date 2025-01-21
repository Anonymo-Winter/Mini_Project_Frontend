import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, ImagePlus, Loader2, MessageSquare, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Switch } from '@/components/ui/switch';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSendIssue } from '@/api/query';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';


// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationPicker = ({ onLocationSelect }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect({ lat, lng });
    },
  });
  return null;
};

const ChatMessage = ({ content, isUser }) => (
  <div 
    className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-in slide-in-from-${isUser ? 'right' : 'left'}`}
  >
    <div className={`max-w-[80%] p-4 rounded-2xl ${
      isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
    } shadow-sm transition-all duration-200 hover:shadow-md`}>
      <p className="text-sm leading-relaxed">{content}</p>
    </div>
  </div>
);

const IssueForm = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const queryClient = useQueryClient()
  const userData = queryClient.getQueryData(['user']);
  
  const {toast} = useToast()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    location: { lat: userData?.latitude, lng: userData?.longitude },
    image: null,
    isAnonymous
  });

  const [markerPosition, setMarkerPosition] = useState(formData.location);

  const {mutate : sendIssue,isPending,isError} = useSendIssue()


  useEffect(() => {
    if(isError){
      toast({
        title : "Error",
        description : "Something went wrong, please try again",
        variant : 'destructive'
      })
    }
  },[isError])

  const handleLocationSelect = (location) => {
    setMarkerPosition(location);
    setFormData(prev => ({...prev, location}));
  };

  const dummyMessages = [
    { content: "Hello! I'm your AI writing assistant. How can I help you describe the issue?", isUser: false },
    { content: "I need help writing about a broken street light.", isUser: true },
    { content: "Here's a suggested description: 'The street light at [location] has been non-functional for [time period], creating a safety hazard during nighttime hours. The area is frequently used by pedestrians and vehicles.'", isUser: false }
  ];


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({...prev, image: file}));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendIssue({
      ...formData,
      latitude: formData.location.lat,
      longitude: formData.location.lng,
      isAnonymous : isAnonymous
    })
    
  };

  const ChatDrawer = () => (
    <SheetContent 
      side="right" 
      className="w-full lg:max-w-[700px] border-l shadow-2xl transition-transform duration-500 ease-in-out"
      style={{ zIndex: 1000 }} // Explicitly set high z-index
    >
      <div className="flex flex-col h-full">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="text-xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
            AI Writing Assistant
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-auto px-6 py-4 scroll-smooth">
          <div className="space-y-4">
            {dummyMessages.map((msg, idx) => (
              <ChatMessage key={idx} {...msg} />
            ))}
          </div>
        </div>

        <div className="border-t p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input 
              placeholder="Type your message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1 rounded-full border-primary/20 focus:border-primary/40"
            />
            <Button 
              size="icon" 
              className="rounded-full h-10 w-10 hover:scale-105 transition-transform duration-200"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </SheetContent>
  );
  if(isPending) return <div>Loading...</div>
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Add a wrapper div with relative positioning */}
      <div className="relative">
        <Card className="max-w-[1200px] w-11/12 mx-auto shadow-lg transition-shadow duration-200 hover:shadow-xl">
          <CardHeader className="border-b bg-card">
            <div className="flex justify-between items-center wfull">
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Report an Issue
                </CardTitle>
                <CardDescription className="mt-2">
                  Help us improve your community by reporting issues in your area
                </CardDescription>
              </div>
              <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full hover:scale-105 transition-all duration-200"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <ChatDrawer />
              </Sheet>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className='flex gap-3 h-full md:flex-row flex-col'>
              <form onSubmit={handleSubmit} className="space-y-6 w-full md:w-1/2">
                {/* Form content remains the same */}
                
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Broken Street Light"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({...prev, title: e.target.value}))}
                    className="transition-all duration-200 focus:border-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter the location address"
                    value={formData.address}
                    onChange={e => setFormData(prev => ({...prev, address: e.target.value}))}
                    className="transition-all duration-200 focus:border-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the issue..."
                    value={formData.description}
                    onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}
                    className="min-h-[120px] transition-all duration-200 focus:border-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Image</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 transition-all duration-200 hover:border-primary/30">
                    <div className="flex flex-col items-center gap-2">
                      {preview ? (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                          <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute top-2 right-2 hover:bg-red-500 hover:text-white transition-colors duration-200"
                            onClick={() => {
                              setPreview(null);
                              setFormData(prev => ({...prev, image: null}));
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="bg-gray-100 p-4 rounded-full">
                            <ImagePlus className="h-8 w-8 text-gray-600" />
                          </div>
                          <label className="cursor-pointer text-center">
                            <span className="text-primary hover:text-primary/80 transition-colors duration-200">
                              Click to upload
                            </span>
                            <span className="text-gray-500"> or drag and drop</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                          <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="anonymous-toggle">Anonymous Report</Label>
                    <p className="text-sm text-muted-foreground">
                      {isAnonymous ? "Your name will be hidden" : "Your name will be visible"}
                    </p>
                  </div>
                  <Switch
                    id="anonymous-toggle"
                    checked={isAnonymous}
                    onCheckedChange={setIsAnonymous}
                  />
                </div>

                <Alert className="bg-primary/5 border-primary/20">
                  <AlertDescription>
                    {isAnonymous 
                      ? "Your report will be submitted anonymously. Our team will review it while maintaining your privacy."
                      : "Your report will be reviewed by our team and appropriate action will be taken."}
                  </AlertDescription>
                </Alert>

                <Button 
                  type="submit" 
                  className="w-full transition-all duration-200 hover:shadow-lg disabled:hover:shadow-none"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Issue'
                  )}
                </Button>
              </form>
              <div className="space-y-2 w-full md:w-1/2" style={{ zIndex: 0 }}> {/* Add lower z-index to map container */}
                <Label>Location (Click to Set)</Label>
                <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-md">
                  <MapContainer 
                    center={[formData.location.lat, formData.location.lng]} 
                    zoom={10} 
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationPicker onLocationSelect={handleLocationSelect} />
                    {markerPosition && (
                      <Marker position={[markerPosition.lat, markerPosition.lng]} />
                    )}
                  </MapContainer>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Selected coordinates: {markerPosition?.lat?.toFixed(4)}, {markerPosition?.lng?.toFixed(4)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IssueForm;