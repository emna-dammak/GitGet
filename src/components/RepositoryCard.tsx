import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import IconRenderer from "./IconRenderer";

interface Language {
  name: string;
  color: string | null;
}

interface RepositoryCardProps {
  name: string;
  description: string | undefined;
  languages: Language[];
  stars: number;
  license: string | undefined;
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
    <div className="bg-[#2E3656] text-white p-4 rounded-xl shadow hover:shadow-lg flex flex-col my-5 w-3/4 ">
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
          <div className="px-10 py-5 flex justify-center">
            <p className="text-gray-500 text-sm font-semibold mb-2 mr-2">
              Programming Languages:
            </p>
              {languages.map((lang, index) => (
                <p
                  key={index}
                  data-tooltip-id="language-tooltip" // Tooltip ID (shared)
                  data-tooltip-content={lang.name} // Tooltip content dynamically
                >
                  <IconRenderer language={lang.name} />
                </p>
              ))}
          </div>
        )}
      </div>

      {/* Metadata Section */}
      <div className="px-10 pb-5 text-gray-500 text-sm flex flex-wrap gap-4">
        <p>
          <span className="font-bold">Created at:</span>{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-bold">Updated at:</span>{" "}
          {new Date(updatedAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-bold">Stars:</span> {stars}
        </p>
        <p>
          <span className="font-bold">License:</span> {license || "None"}
        </p>
      </div>
      {/* Tooltip Component */}
      <Tooltip id="language-tooltip" place="top" />
    </div>
  );
};

export default RepositoryCard;
