import React from "react";

interface UserDetailsProps {
  name: string;
  username: string;
  bio: string;
  stats: string; // Could be replaced with a proper structure later.
  location: string;
  avatarUrl: string; // Added avatarUrl to props
}

const UserDetails: React.FC<UserDetailsProps> = ({
  name,
  username,
  bio,
  stats,
  location,
  avatarUrl,
}) => {
  return (
    <div className="bg-[#2E3656] bg-opacity-90 h-full text-white p-4 rounded-lg flex justify-center w-1/6 fixed">
      <div className="flex flex-col items-center pt-10">
        {/* User Avatar */}
        <img
          src={avatarUrl}
          alt={`${username}'s avatar`}
          className="w-24 h-24 rounded-full mb-4"
        />

        {/* User Info */}
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm text-gray-400">@{username}</p>
        <p className="mt-2 text-sm  overflow-wrap">{bio}</p>
          <p>
            <strong>Stats:</strong> {stats}
          </p>
          <p>
            <strong>Location:</strong> {location}
          </p>
      </div>
    </div>
  );
};

export default UserDetails;
