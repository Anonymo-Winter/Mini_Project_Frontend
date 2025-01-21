import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUnUpVote, useUpVote } from "@/api/query";
import { ThumbsUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

function UpVoteButton({ upVotes, issueId, count}) {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['user']);

  //console.log(updateUpVote)
  
  const {
    mutate: upvote,
    isPending: upVotePending,
    isError: upVoteError,
    isSuccess: upVoteSuccess,
  } = useUpVote();
  
  const {
    mutate: unupvote,
    isPending: unUpVotePending,
    isError: unUpVoteError,
    isSuccess: unUpVoteSuccess,
  } = useUnUpVote();

  const [upVoted, setUpVoted] = useState(upVotes.some((vote) => vote.id === data?.id));
  const [voteCount, setVoteCount] = useState(count);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setVoteCount(count);
     setUpVoted(upVotes.some((vote) => vote.id === data?.id));
    //setUpVoted(data?.upVoted?.some((vote) => vote.id === issueId));
  }, [count, upVotes, data?.id]);

  useEffect(() => {
    if (upVoteError || unUpVoteError) {
      setUpVoted(!upVoted);
      toast({
        title: "Error",
        description: "Failed to upvote/unupvote the issue.",
        variant: "destructive",
      });
    }
    if(upVoteSuccess || unUpVoteSuccess){
        queryClient.invalidateQueries(["user"]);
    }
  }, [unUpVoteError, upVoteError, upVoted, toast,upVoteSuccess,unUpVoteSuccess]);

  const handleClick = () => {
    if (!data?.id) {
      toast({
        title: "Sign in required",
        description: "Please sign in to vote on issues.",
        variant: "default",
      });
      return;
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (upVoted) {
      setVoteCount((prevCount) => prevCount - 1);
      
      
      unupvote({ issueId });
    } else {
        
        setVoteCount((prevCount) => prevCount + 1);
        
      upvote({ issueId });
    }
    //queryClient.invalidateQueries(["nearByIssues",data?.latitude,data?.longitude,''])
    //queryClient.invalidateQueries(['getIssue',issueId])
    setUpVoted(!upVoted);
  };

  const isLoading = upVotePending || unUpVotePending;

  return (
    <div className="flex items-center bg-white/50 dark:bg-gray-800/50 rounded-lg px-3 py-1.5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClick}
              disabled={isLoading}
              className={cn(
                "relative overflow-hidden transition-all duration-300",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                upVoted && "text-blue-500 dark:text-blue-400",
                isAnimating && "scale-110"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ThumbsUp
                  className={cn(
                    "h-4 w-4 transition-all duration-300",
                    upVoted && "fill-current scale-110",
                    isAnimating && "animate-bounce"
                  )}
                />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent 
            className="bg-gray-800 text-white dark:bg-white dark:text-gray-800 px-3 py-1.5 rounded-md shadow-lg"
          >
            <p className="text-sm">
              {upVoted ? "Remove upvote" : "Upvote this issue"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className={cn(
        "font-medium text-sm transition-all duration-300",
        isAnimating && (upVoted ? "animate-bounce text-blue-500" : "animate-bounce"),
        upVoted && "text-blue-500 dark:text-blue-400"
      )}>
        {voteCount}
      </span>
    </div>
  );
}

export default UpVoteButton;