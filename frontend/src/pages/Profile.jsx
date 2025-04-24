import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const cachedProfile = localStorage.getItem("user_profile");
    if (cachedProfile) {
      setProfile(JSON.parse(cachedProfile));
    }
  }, []);

  const getInitials = (first, last) => {
    return `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
  };

  if (!profile) {
    return <div className="p-6 text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center p-6 gap-6">
          {profile.profile_picture ? (
            <img
              src={profile.profile_picture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            // <div className="w-32 h-32 rounded-full text-blue-400/90 flex items-center justify-center text-5xl font-bold shadow-lg shadow-blue-400 animate-pulse ring-2 ring-blue-400/50 ring-offset-2 ring-offset-white">
            //   {getInitials(profile.first_name, profile.last_name)}
            // </div>
            <div className="w-32 h-32 rounded-full text-blue-400/80 flex items-center justify-center text-5xl font-bold bg-white shadow-[0_0_20px_#60a5fa] border">
              {getInitials(profile.first_name, profile.last_name)}
            </div>
          )}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {profile.first_name} {profile.last_name}
            </h2>
            <p className="text-gray-600">{profile.email}</p>
            <p className="mt-1 text-sm text-blue-600 capitalize">
              {profile.user_type}
            </p>
          </div>
        </div>
        <div className="border-t p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-medium">Phone Number</p>
            <p>{profile.phone_number || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium">Address</p>
            <p>{profile.address || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium">Email Verified</p>
            <p>{profile.is_verified ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="font-medium">Last Login</p>
            <p>
              {profile.last_login
                ? new Date(profile.last_login).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
