import React from "react";

export interface UserDetailsProps {
  name: string;
  username: string;
  bio: string | null;
  stats: string;
  followers: string;
  following: string;
  location: string | null;
  avatarUrl: string; // Added avatarUrl to props
}

const UserDetails: React.FC<UserDetailsProps> = ({
  name,
  username,
  bio,
  stats,
  location,
  avatarUrl,
  followers,
  following,
}) => {
  return (
    <div
      className="bg-[#0d082d] bg-opacity-50 text-white p-6 rounded-lg flex flex-col items-center 
      sm:max-w-full sm:mx-auto md:h-full md:w-1/4 md:fixed  md:left-0  md:overflow-hidden
      border-r-2 border-slate-800"
    >
      <div className="flex flex-col items-center pt-10 max-md:pt-4">
        <img
          src={avatarUrl}
          alt={`${username}'s avatar`}
          className="w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full mb-4"
        />
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm text-gray-400">@{username}</p>
        <p className="text-sm text-gray-300 overflow-wrap">{bio}</p>
        <p className="mt-4">{stats}</p>
        <p className="mb-auto">
          {followers} • {following}
        </p>
        {location && (
          <p>
            <strong>Location:</strong> {location}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
