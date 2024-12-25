import React from "react";

export interface UserDetailsProps {
  name: string;
  username: string;
  bio: string | null;
  repositoryCount: string;
  followers: string;
  following: string;
  location: string | null;
  avatarUrl: string; // Added avatarUrl to props
}



const UserDetails: React.FC<UserDetailsProps> = ({
  name,
  username,
  bio,
  repositoryCount,
  location,
  avatarUrl,
  followers,
  following,
}) => {

  const stats = [
    {
      name: "Repositories",
      value: repositoryCount,
      icon: "Repositories.svg",
    },
    {
      name: "Followers",
      value: followers,
      icon: "Followers.svg",
    },
    {
      name: "Following",
      value: following,
      icon: "Following.svg",
    },
  ];

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
        <div className="flex flex-col max-md:flex-row max-sm:flex-wrap justify-center gap-4 mt-8 w-full">
          {stats.map((stat) => (
            <div key={stat.name} className="flex items-center mt-2">
              <img src={`/${stat.icon}`} className="mr-2 opacity-70"/>
              <div className="text-sm">
                <span className="opacity-70">{stat.name}: </span>
                <span>{stat.value}</span>
              </div>
            </div>
          ))
          }
        </div>
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
