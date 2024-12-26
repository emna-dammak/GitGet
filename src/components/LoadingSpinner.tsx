import type { ComponentProps, FC } from "react";

import { RotatingLines } from "react-loader-spinner";

export interface LoadingSpinnerProps extends ComponentProps<typeof RotatingLines> {}

/**
 * LoadingSpinner component renders a rotating lines spinner.
 *
 * @component
 * @param {LoadingSpinnerProps} props - The properties passed to the component.
 * @returns {JSX.Element} A rotating lines spinner with customizable properties.
 *
 * @example
 * <LoadingSpinner strokeColor="blue" strokeWidth="4" animationDuration="2" width="30" visible={true} />
 */
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
