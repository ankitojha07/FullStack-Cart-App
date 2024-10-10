import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/", { replace: true });
  };
  const [logInStatus, setLogInStatus] = useState<Boolean | null>(false);
  const [logOutStatus, setLogOutStatus] = useState<Boolean | null>(true);

  useEffect(() => {
    const isLogIn = localStorage.getItem("jwt");
    if (isLogIn) {
      setLogInStatus(true);
      setLogOutStatus(false);
    } else {
      setLogInStatus(false);
      setLogOutStatus(true);
    }
  }, []);

  return (
    <div className="h-screen flex  justify-center items-center">
      <div>
        {logOutStatus && (
          <div className="flex flex-col gap-3 justify-center items-center text-xl font-thin">
            <p>To view your profile, You hav to login first.</p>
            <div className="flex flex-row gap-3">
              <Link to="/login" className="bg-gray-400 px-3 py-2 rounded-lg">
                Login
              </Link>
              <Link to="/signup" className="bg-gray-400 px-3 py-2 rounded-lg">
                SignUp
              </Link>
            </div>
          </div>
        )}
        {logInStatus && (
          <div>
            <button
              onClick={handleLogout}
              className="bg-gray-400 px-3 py-2 rounded-lg"
            >
              Log Out
            </button>
            <h1>Logged In</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
