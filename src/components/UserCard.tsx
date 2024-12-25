import React from "react";
import { useNavigate } from "react-router-dom";

export interface UserCardProps {
  avatarUrl: string;
  name: string;
  login: string;
  bio: string;
  company: string;
  repositories: number;
  followers: number;
  following: number;
  joinedAt: string;
}

const UserCard: React.FC<UserCardProps> = ({
  avatarUrl,
  name,
  login,
  bio,
  company,
  repositories,
  followers,
  following,
  joinedAt,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#2E3656] opacity-70 text-white rounded-xl shadow-lg px-10 py-2 flex flex-col sm:flex-row items-center mt-5 mx-5">
      {/* Profile Picture */}
      <img
        src={avatarUrl || ""}
        alt={login}
        className="w-20 h-20 rounded-full object-cover mr-4 mb-4 sm:mb-0"
      />
      {/* User Info */}
      <div className="flex-1 sm:mr-4">
        <div>
          <h2
            className="text-2xl font-semibold hover:underline cursor-pointer"
            onClick={() => navigate(`/repositories/${login}`)}
          >
            {name || ""}{" "}
            <span className="text-gray-400 text-lg font-light">{login}</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">{company || ""}</p>
          <p className="text-sm mt-2">{bio || ""}</p>
        </div>
      </div>

      {/* Vertical Line */}
      <div
        style={{ borderLeft: "1px solid white" }}
        className="opacity-30 border-white py-16 mr-4 sm:block hidden"
      ></div>

      {/* Stats Section */}
      <div className="text-sm  mt-4  sm:mt-0 self-center  2xs:max-md:grid 2xs:max-md:grid-cols-2  2xs:max-md:gap-5">
        <p>
          <span className="font-bold ">Repositories:</span> {repositories}
        </p>
        <p>
          <span className="font-bold">Followers:</span> {followers}
        </p>
        <p>
          <span className="font-bold">Following:</span> {following}
        </p>
        <p>
          <span className="font-bold">Joined At:</span>{" "}
          {new Date(joinedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
