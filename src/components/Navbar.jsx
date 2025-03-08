import React, { useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, LogOut, User, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/store/user";
import { useFetchUser } from "@/api/query";

// Custom NavLink component that handles active state
const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

    return (
        <Link to={to}>
            <div
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
                {children}
            </div>
        </Link>
    );
};

// Custom mobile NavLink
const MobileNavLink = ({ to, children, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

    return (
        <Link to={to} className="block" onClick={onClick}>
            <div
                className={`px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"
                }`}
            >
                {children}
            </div>
        </Link>
    );
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: user } = useFetchUser();
    const location = useLocation();

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-primary"
                            >
                                <path
                                    d="M12 2L2 7L12 12L22 7L12 2Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M2 17L12 22L22 17"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M2 12L12 17L22 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="text-xl font-bold">Issue Tracker</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <NavigationMenu>
                            <NavigationMenuList className="flex space-x-1">
                                <NavigationMenuItem>
                                    <NavLink to="/issues">Issues</NavLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavLink to="/send-issue">Report</NavLink>
                                </NavigationMenuItem>
                                {user && (
                                    <NavigationMenuItem>
                                        <NavLink to="/dashboard">Dashboard</NavLink>
                                    </NavigationMenuItem>
                                )}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Profile Section & Actions */}
                    <div className="flex items-center space-x-3">
                        {/* User Menu */}
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center space-x-2 p-1 hover:bg-gray-100"
                                    >
                                        <Avatar className="h-8 w-8 border border-gray-200">
                                            <AvatarImage
                                                src={user.avatarUrl || "/api/placeholder/32/32"}
                                                alt={user.name || "User"}
                                            />
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="hidden md:block text-left">
                                            <p className="text-sm font-medium">{user.name || "User"}</p>
                                            <p className="text-xs text-gray-500 truncate max-w-[120px]">
                                                {user.email || ""}
                                            </p>
                                        </div>
                                        <ChevronDown className="h-4 w-4 hidden md:block text-gray-500" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        className={location.pathname === "/profile" ? "bg-primary/10 text-primary" : ""}
                                    >
                                        <Link to="/profile" className="flex items-center w-full">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="text-red-500 focus:text-red-500">
                                        <Link to="/logout" className="flex items-center w-full">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to="/signin">
                                    <Button
                                        variant={location.pathname === "/signin" ? "default" : "ghost"}
                                        size="sm"
                                        className="hidden md:inline-flex"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button
                                        variant={location.pathname === "/signup" ? "secondary" : "default"}
                                        size="sm"
                                        className="hidden md:inline-flex"
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-3 space-y-1 px-2 pb-3 border-t">
                        <MobileNavLink to="/issues" onClick={closeMenu}>
                            Issues
                        </MobileNavLink>
                        <MobileNavLink to="/send-issue" onClick={closeMenu}>
                            Report
                        </MobileNavLink>
                        {console.log(user)}
                        {user ? (
                            <>
                                <MobileNavLink to="/profile" onClick={closeMenu}>
                                    Profile
                                </MobileNavLink>
                                <Link to="/logout" className="block" onClick={closeMenu}>
                                    <div className="px-3 py-2 mt-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50 flex items-center">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <>
                                <MobileNavLink to="/signin" onClick={closeMenu}>
                                    Sign In
                                </MobileNavLink>
                                <Link to="/signup" className="block mt-2" onClick={closeMenu}>
                                    <Button variant="default" className="w-full justify-center">
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
