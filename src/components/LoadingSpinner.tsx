import type { ComponentProps, FC } from "react";

import { RotatingLines } from "react-loader-spinner";

interface LoadingSpinnerProps extends ComponentProps<typeof RotatingLines> {}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ ...props }) => {
  return (
    <RotatingLines
      strokeColor="white"
      strokeWidth="5"
      animationDuration="1"
      width="25"
      visible={true}
      {...props}
    />
  );
};

export default LoadingSpinner;
