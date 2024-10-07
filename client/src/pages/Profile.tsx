import React from "react";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/home", { replace: true });
  };
  return (
    <div>
      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;
