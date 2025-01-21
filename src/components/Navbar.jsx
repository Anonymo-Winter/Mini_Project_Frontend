import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/user';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const user = useRecoilValue(userAtom);

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold">{user ? user.name : "Anonymo"}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/issues">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Issues
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/dashboard">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      My Issues
                    </NavigationMenuLink>
                  </Link>
                  {user ? <Link to="/dashboard">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Logout
                    </NavigationMenuLink>
                  </Link> : <Link to="/signin">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                     Login
                    </NavigationMenuLink>
                  </Link>}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link to="/issues" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Issues
              </Button>
            </Link>
            <Link to="/dashboard" className="block">
              <Button variant="ghost" className="w-full justify-start">
                My Issues
              </Button>
            </Link>
            {user? <Link to="/signin" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  Logout
                </Button>
              </Link> : <Link to="/signin" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  Login
                </Button>
              </Link>}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;