import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface Language {
  name: string;
  color: string;
}

interface RepositoryCardProps {
  name: string;
  description: string;
  languages: Language[]; // Updated to support multiple languages
  stars: number;
  license: string | null;
  createdAt: string;
  updatedAt: string;
  url: string;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({
  name,
  description,
  languages,
  stars,
  license,
  createdAt,
  updatedAt,
  url,
}) => {
  return (
    <div className="bg-[#2E3656] text-white p-4 rounded-lg shadow hover:shadow-lg flex flex-col my-5 w-3/4 ml-20">
      <div className="flex justify-between">
        {/* Repository Details */}
        <div className="px-10 py-5">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 font-bold text-lg"
          >
            {name}
          </a>
          <p className="text-gray-400 text-sm">
            {description || "No description provided."}
          </p>
        </div>

        {/* Languages Section */}
        {languages.length > 0 && (
          <div className="px-10 py-5 flex ">
            <p className="text-gray-500 text-sm font-semibold mb-2">
              Programming Languages:
            </p>
            {languages.map((lang, index) => (
              <p className="description" id="circle-icon" key={index}>
                <div className="pl-3">
                  <span
                    id={`tooltip-${index}`} // Unique ID for each tooltip
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.color, color: "#fff" }}
                  ></span>
                  {/* Tooltip Component */}
                  <Tooltip
                    anchorId={`tooltip-${index}`} // Attach tooltip to the span
                    content={lang.name} // Tooltip content
                    place="top"
                  />
                </div>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Metadata Section */}
      <div className="px-10 pb-5 text-gray-500 text-sm flex flex-wrap gap-4">
        <p>Created at: {new Date(createdAt).toLocaleDateString()}</p>
        <p>Updated at: {new Date(updatedAt).toLocaleDateString()}</p>
        <p>Stars: {stars}</p>
        <p>License: {license || "None"}</p>
      </div>
    </div>
  );
};

export default RepositoryCard;
