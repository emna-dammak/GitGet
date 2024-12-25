import React from "react";

export interface NotFoundProps {
  type: string;
  message: string;
}

const NotFound: React.FC<NotFoundProps> = ({
 type,
 message
}) => {

    return (
        <div className="w-full h-lvh flex justify-center items-center">
            <div className="flex flex-col justify-center items-center m-auto">
                <img src="/GitGet-simplified.svg" className="w-24"/>
                <div className="flex-1 sm:mr-4 text-center w-[500px] mt-4">
                    <div>
                        <h2
                            className="text-2xl font-semibold"
                        >
                            Oops! No {type} was found.
                        </h2>
                        <p className="text-sm mt-2 opacity-70">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
