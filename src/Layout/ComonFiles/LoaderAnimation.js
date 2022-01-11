import { useState, useEffect } from "react";

//Loading animation for page rendering
export default function LoaderAnimation() {
  //*declared a state variable to dynamically move the progress bar from left to right
  const [widthValueForProgressbar, setWidthValueForProgressbar] = useState(1);

  useEffect(() => {
    if (widthValueForProgressbar < 98) {
      setWidthValueForProgressbar(widthValueForProgressbar + 2);
    }
  }, [widthValueForProgressbar]);

  return (
    <div className="">
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          style={{
            role: "progressbar",
            ariaValuenow: `${widthValueForProgressbar}`,
            ariaValuemin: "0",
            ariaValuemax: "100",
            width: `${widthValueForProgressbar}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
