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
  visibility: string;
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
  visibility,
}) => {
  return (
    <div className="bg-[#2E3656] text-white p-4 rounded-xl shadow hover:shadow-lg flex flex-col my-5 w-full md:w-3/4">
      <div className="flex max-sm:flex-col md:flex-row justify-between items-start gap-5">
        {/* Repository Details */}
        <div className="pt-4 md:px-10  flex-1 max-w-full md:max-w-[70%]">
          <div className="flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold text-lg hover:underline cursor-pointer"
            >
              {name}
            </a>
            {/* Visibility Badge */}
            <span
              className={`ml-2 px-2 pb-1 text-xs font-bold rounded-xl ${
                visibility === "PUBLIC"
                  ? "bg-green-500"
                  : visibility === "PRIVATE"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {visibility.toLowerCase()}
            </span>
          </div>
          {/* Repository Description with Fixed Height */}
          <p className="text-gray-400 text-sm h-[2.5rem] line-clamp-2">
            {description || "No description provided."}
          </p>
        </div>

        {/* Languages Section */}
        {languages.length > 0 && (
          <div className="md:pt-4 px-4 md:px-4 pb-5 flex-shrink-0 2xs:max-sm:w-full 2xs:max-sm:flex 2xs:max-sm:justify-center">
            <div className="flex flex-wrap items-center gap-x-2">
              {/* Programming Languages Label */}
              <p className="text-gray-500 text-sm font-semibold mb-0 block 2xs:max-lg:hidden">
                Programming Languages:
              </p>

              {/* Language Icons */}
              {languages.map((lang, index) => (
                <p
                  key={index}
                  data-tooltip-id="language-tooltip"
                  data-tooltip-content={lang.name} // Tooltip content dynamically
                  className="inline-block "
                >
                  <IconRenderer language={lang.name} />
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Metadata Section */}
      <div className="px-4 md:px-10 pb-5 text-gray-500 text-sm flex  2xs:max-md:grid 2xs:max-md:grid-cols-2 2xs:max-md:flex-row gap-4">
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
