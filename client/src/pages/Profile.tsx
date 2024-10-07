import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/", { replace: true });
  };
  return (
    <div>
      <div className="flex flex-row gap-3">
        <button onClick={handleLogout} className="bg-gray-400 p-2 rounded-lg">
          Log Out
        </button>
        <Link to="/login" className="bg-gray-400 p-2 rounded-lg">
          Login
        </Link>
        <Link to="/signup" className="bg-gray-400 p-2 rounded-lg">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Profile;
