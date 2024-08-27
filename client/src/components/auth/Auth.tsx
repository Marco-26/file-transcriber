import React, { Dispatch, SetStateAction } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { User } from "@/src/Types/User";
import { Button } from "../UI/Button";
import { CircleUser, UserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../UI/Dropdown";
import { login,logout } from "../../api/user";

interface AuthProps{
  user:User | undefined; 
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

const Auth:React.FC<AuthProps> = ({user,setUser}) => {
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      const loginDetails = await login(codeResponse);
      setUser(loginDetails);
    },
  });
  
  const handleLogout = () => {
    logout();
    setUser(undefined);
  };

  return (
    <>
      {!user ? (
        <Button onClick={() => googleLogin()} className="text-white">
          <UserIcon className='mr-2'/>
          Login
        </Button>
      ) : (
        <>
          <div className="flex w-full items-center gap-4 md:gap-2 lg:gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className='flex items-center'>
                    <p className="mr-4">{user!.name}</p>
                    <Button variant="secondary" size="icon" className="rounded-full mr-3">
                      {/* <CircleUser className="h-5 w-5" /> */}
                      <img src={user.profileImageURL} alt='profile' className="rounded-full border-2 border-black"/>
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleLogout()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </>
        // <UserAvatar userName={user.name} onClick={handleLogout}></UserAvatar>
      )}
    </>
  );
}

export default Auth;