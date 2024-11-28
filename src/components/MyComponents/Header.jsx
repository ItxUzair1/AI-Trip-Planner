import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useFirebase } from "@/context/firebase";

export default function Header() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [showLogout, setShowLogout] = useState(false);

  function handleSignInClick() {
    navigate("/signin");
  }

  function handleCreateTripClick() {
    navigate("/create-trip"); // Example route for trip creation
  }

  function handleHistoryClick(){
    navigate('/trip-history');
  }

  function handleLogout() {
    firebase.logout(); // Add the logout logic from your Firebase context
    setShowLogout(false);
    navigate("/"); // Redirect to home or login after logout
  }

  function toggleLogoutMenu() {
    setShowLogout(!showLogout);
  }

  // Extract the first letter of the email to display in the avatar
  const userAvatar = firebase.user?.photoURL;
  const userEmail = firebase.user?.email;
  const avatarContent = userAvatar ? (
    <img
      src={userAvatar}
      alt="User Avatar"
      className="w-8 h-8 rounded-full cursor-pointer"
      onClick={toggleLogoutMenu}
    />
  ) : (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white cursor-pointer"
      onClick={toggleLogoutMenu}
    >
      {userEmail ? userEmail.charAt(0).toUpperCase() : "?"}
    </div>
  );

  return (
    <header className="flex justify-between items-center p-3 shadow-md">
      <img src="/logo.svg" alt="logo" />
      <div className="flex items-center space-x-4">
        {firebase.isLogged && (
          <>
            <Button onClick={handleCreateTripClick}>Create Trip</Button>
            <Button onClick={handleHistoryClick}>Trips</Button>
            <div className="relative">
              {/* User Avatar or Initials */}
              {avatarContent}
              {/* Logout Menu */}
              {showLogout && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md">
                  <Button
                    className="block w-full text-left px-4 py-2 text-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
        {!firebase.isLogged && (
          <Button onClick={handleSignInClick}>Sign In</Button>
        )}
      </div>
    </header>
  );
}
