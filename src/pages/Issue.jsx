import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Filter, Loader2, AlertCircle, CheckCircle2, Clock, Meh, SearchIcon } from "lucide-react";
import IssueCard from "@/components/IssueCard";
import MapWithMarkers from "./Map";
import { useNavigate } from "react-router-dom";
import { dummyIssues } from "@/lib/dummy";
import { useFetchNearByIssues } from "@/api/query";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import { useQueryClient } from "@tanstack/react-query";

const Issue = () => {
    const iss = dummyIssues;
    const [searchTerm, setSearchTerm] = useState("");
    const [actualSearch, setActualSearch] = useState("");
    const [view, setView] = useState("list");

    const [totalIssues, setTotalIssues] = useState(0);

    const queryClient = useQueryClient();
    const userData = queryClient.getQueryData(["user"]);

    const { data, status, isFetchingNextPage, isError, hasNextPage, fetchNextPage, isLoading, updateUpVote } =
        useFetchNearByIssues(userData?.latitude, userData?.longitude, actualSearch);

    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchButtonClick = () => {
        setActualSearch(searchTerm);
    };

    const stats = [
        {
            label: "Total Issues",
            value: totalIssues,
            icon: MapPin,
            color: "blue",
        },
        {
            label: "In Progress",
            value: Math.floor(totalIssues * 0.4),
            icon: Clock,
            color: "amber",
        },
        {
            label: "Resolved",
            value: Math.floor(totalIssues * 0.3),
            icon: CheckCircle2,
            color: "green",
        },
        {
            label: "Critical",
            value: Math.floor(totalIssues * 0.15),
            icon: AlertCircle,
            color: "red",
        },
    ];
    let markers;
    // if(isLoading) return <div className='h-screen flex items-center justify-center'><Loader2 className="h-10 w-10 animate-spin mx-auto" /></div>
    if (isError)
        return (
            <div className="h-screen flex items-center justify-center">
                <AlertCircle className="h-10 w-10 animate-spin mx-auto" />
            </div>
        );
    if (!isFetchingNextPage && !isLoading && !isError) {
        markers = data.pages?.map((page) => [...page.data.issues]);
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="max-w-[1400px] mx-auto p-4 lg:p-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Community Issues</h1>
                        <p className="text-slate-600 mb-6">Track and manage community issues in real-time</p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {stats.map((stat) => (
                                <Card
                                    key={stat.label}
                                    className="bg-white/80 border-none shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                                                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-500">{stat.label}</p>
                                                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Search and Filter Section */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                                <Input
                                    className="pl-10 bg-white/80 border-none"
                                    placeholder="Search issues..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button className="bg-gray-600 text-white" onClick={handleSearchButtonClick}>
                                    <SearchIcon className="h-4 w-4" />
                                    search
                                </Button>
                                <button
                                    onClick={() => navigate("/send-issue")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 text-sm rounded-md"
                                >
                                    Report Issue
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    {isLoading ? (
                        <div className="min-h-[60vh] flex items-center justify-center">
                            <Loader />
                        </div>
                    ) : data.pages[0].data.issues.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-96">
                            <Meh size={48} className="text-slate-400 mb-4" />
                            <p className="text-slate-500 text-lg">No issues found.</p>
                        </div>
                    ) : (
                        <Tabs defaultValue="list" className="space-y-4">
                            <TabsList className="bg-white/80">
                                <TabsTrigger value="list" onClick={() => setView("list")}>
                                    List View
                                </TabsTrigger>
                                <TabsTrigger value="map" onClick={() => setView("map")}>
                                    Map View
                                </TabsTrigger>
                                <TabsTrigger value="split" onClick={() => setView("split")}>
                                    Split View
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="list">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {data.pages.map((page) =>
                                        page.data.issues.map((issue) => (
                                            <IssueCard key={issue.id} issue={issue} searchTerm={searchTerm} />
                                        ))
                                    )}
                                </div>
                                {hasNextPage && (
                                    <div className="flex justify-center mt-8">
                                        <Button
                                            onClick={fetchNextPage}
                                            disabled={isFetchingNextPage}
                                            variant="outline"
                                            className="bg-white/80"
                                        >
                                            {isFetchingNextPage ? "Loading more..." : "Load More"}
                                        </Button>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="map">
                                <Card className="h-[600px] bg-white/80 border-none shadow-sm">
                                    <CardContent className="p-0 h-full">
                                        <MapWithMarkers
                                            markers={markers?.flat().map((issue) => ({
                                                latitude: issue.latitude,
                                                longitude: issue.longitude,
                                                title: issue.title,
                                                description: issue.description,
                                                imageUrl: issue.image,
                                            }))}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="split">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                        {data.pages.map((page) =>
                                            page.data.issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)
                                        )}
                                        {hasNextPage && (
                                            <div className="flex justify-center mt-8">
                                                <Button
                                                    onClick={fetchNextPage}
                                                    disabled={isFetchingNextPage}
                                                    variant="outline"
                                                    className="bg-white/80"
                                                >
                                                    {isFetchingNextPage ? "Loading more..." : "Load More"}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    <Card className="h-[600px] bg-white/80 border-none shadow-sm">
                                        <CardContent className="p-0 h-full">
                                            <MapWithMarkers
                                                markers={markers?.flat().map((issue) => ({
                                                    latitude: issue.latitude,
                                                    longitude: issue.longitude,
                                                    title: issue.title,
                                                    description: issue.description,
                                                    imageUrl: issue.image,
                                                }))}
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    )}
                </div>
            </div>
        </>
    );
};

export default Issue;
