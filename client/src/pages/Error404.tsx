import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="w-screen flex flex-col justify-center items-center gap-2 h-[70vh]">
      <h1 className="font-bold text-3xl font-mono">404 - Page Not Found</h1>
      <p className="text-lg font-thin">
        Sorry, the page you're looking for doesn't exist.
      </p>
    </div>
  );
};

export default ErrorPage;
