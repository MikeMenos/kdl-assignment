import { type FC } from "react";
import { ThreeCircles } from "react-loader-spinner";

interface PropsInterface {
  width?: number;
  height?: number;
}
const Loader: FC<PropsInterface> = ({ width = 100, height = 100 }) => {
  return (
    <div className="flex h-[100%] w-full items-center justify-center">
      <ThreeCircles
        height={height}
        width={width}
        color="#353A8E"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
};

export default Loader;
