import React from 'react';
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

const SearchAndFilters = ({ 
    searchTerm, 
    setSearchTerm, 
    departments,
    handleDepartmentSelect
}) => {
    // Check if searchTerm matches any department name
    const selectedDepartment = departments.find(dept => dept.name === searchTerm);
    const isSearching = !selectedDepartment && searchTerm;

    return (
        <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search Bar */}
                    <div className="relative flex-grow">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="Search issues by title, description, or ID..."
                                value={isSearching ? searchTerm : ''}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-12 py-2 h-11 bg-gray-50 hover:bg-gray-100 transition-colors"
                            />
                            {isSearching && (
                                <Button
                                    variant="ghost"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                                    onClick={() => setSearchTerm('')}
                                >
                                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Department Selector */}
                    <div className="min-w-[200px]">
                        <Select
                            value={selectedDepartment ? searchTerm : ''}
                            onValueChange={handleDepartmentSelect}
                        >
                            <SelectTrigger className="h-11 bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-gray-500" />
                                    <SelectValue placeholder="All Departments" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                
                                {departments.map((dept) => (
                                    <SelectItem 
                                        key={dept.id} 
                                        value={dept.name}
                                        className="flex items-center gap-2"
                                    >
                                        {dept.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Active Filter Display */}
                {(isSearching || selectedDepartment) && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {isSearching && (
                            <div className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                                <span>Search: {searchTerm}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                    onClick={() => setSearchTerm('')}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                        {selectedDepartment && (
                            <div className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                                <span>Department: {searchTerm}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                    onClick={() => handleDepartmentSelect('')}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default SearchAndFilters;