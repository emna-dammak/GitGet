import React from "react";

export interface NotFoundProps {
  type: string;
  message: string;
}

/**
 * NotFound component displays a message indicating that a specific type of resource was not found.
 *
 * @component
 * @param {NotFoundProps} props - The properties object.
 * @param {string} props.type - The type of resource that was not found.
 * @param {string} props.message - The message to display when the resource is not found.
 *
 * @example
 * <NotFound type="repository" message="The repository you are looking for does not exist." />
 *
 * @returns {JSX.Element} The rendered NotFound component.
 */
const NotFound: React.FC<NotFoundProps> = ({
 type,
 message
}) => {
    return (
      <div className="relative m-auto w-[500px] 2xs:max-sm:w-[310px] sm:max-lg:w-[400px] bg-[#0d082d]">
        <div className="flex flex-col justify-center items-center">
          <img
            src="/GitGet-simplified.svg"
            alt="GitGet logo"
            className="w-24 2xs:max-md:w-16"
          />
          <div className="text-center  mt-4">
            <div>
              <h2 className="text-2xl 2xs:max-md:text-lg font-semibold text-white">
                Oops! No {type} was found.
              </h2>
              <p className="text-sm 2xs:max-md:text-xs mt-2 opacity-70 text-white">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default NotFound;
