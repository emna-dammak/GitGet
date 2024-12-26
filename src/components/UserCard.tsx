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

/**
 * UserCard component displays a user's profile information including avatar, name, login, bio, company, repositories, followers, following, and join date.
 *
 * @component
 * @param {UserCardProps} props - The properties for the UserCard component.
 * @param {string} props.avatarUrl - The URL of the user's avatar image.
 * @param {string} props.name - The name of the user.
 * @param {string} props.login - The login username of the user.
 * @param {string} props.bio - The bio of the user.
 * @param {string} props.company - The company the user is associated with.
 * @param {number} props.repositories - The number of repositories the user has.
 * @param {number} props.followers - The number of followers the user has.
 * @param {number} props.following - The number of users the user is following.
 * @param {string} props.joinedAt - The date the user joined, in ISO format.
 * @returns {JSX.Element} The rendered UserCard component.
 */
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
      {avatarUrl && (
        <img
          src={avatarUrl || ""}
          alt={login}
          className="w-20 h-20 rounded-full object-cover mr-4 mb-4 sm:mb-0"
        />
      )}
      {/* User Info */}
      <div className="flex-1 sm:mr-4">
        <div>
          <h2
            className="text-2xl font-semibold hover:underline cursor-pointer"
            onClick={() => navigate(`/repositories/${login}`)}
          >
            <span>{name } </span>
            <span className="text-gray-400 text-lg font-light">{login}</span>
          </h2>
          {company && <p className="text-sm text-gray-400 mt-1">{company}</p>}
          {bio && <p className="text-sm mt-2">{bio}</p>}
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
