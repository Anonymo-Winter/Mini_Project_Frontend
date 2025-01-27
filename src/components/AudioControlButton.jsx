import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const AudioPlayerButton = ({ audioURL, title = "Audio Player" }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Play size={16} />
          Play Audio
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center p-4">
          <audio 
            src={audioURL} 
            controls 
            controlsList="nodownload speed" 
            preload="metadata"
            className="w-full"
            // Enable playback speed control
            //controlsList="nodownload speed"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AudioPlayerButton;