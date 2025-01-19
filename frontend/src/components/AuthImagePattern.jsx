import React, { useState, useEffect } from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  const [cycle, setCycle] = useState(1);

  // Use useEffect to handle cycle changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setCycle((prev) => (prev % 2 === 0 ? prev + 1 : prev - 1));
    }, 1000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [cycle]);

  // Function to determine animation class
  const getAnimationClass = (index) => {
    if (cycle % 2 === 0) {
      return index % 2 === 0 ? "animate-bounce" : "animate-ping";
    } else {
      return index % 2 === 0 ? "animate-ping" : "animate-bounce";
    }
  };

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={`${cycle}-${i}`}
              className={`aspect-square rounded-2xl bg-primary/10 ${getAnimationClass(
                i
              )}`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
