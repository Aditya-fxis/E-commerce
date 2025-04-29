import React from "react";

const Loader = () => {
  return (
    <div className="h-[50vh] w-full flex justify-center items-center">
      <img src="/loadergif.gif" alt="Loading..." className="w-40 h-40" />
      {/* <p>Loading...</p> */}
    </div>
  );
};

export default Loader;
