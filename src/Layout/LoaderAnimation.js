import { useState, useEffect } from "react";

export default function LoaderAnimation() {
  const [progressbarWidthNumber, setProgressBarWidthNumber] = useState(1);

  useEffect(() => {
    if (progressbarWidthNumber < 98) {
      setProgressBarWidthNumber(progressbarWidthNumber + 2);
    }
  }, [progressbarWidthNumber]);

  return (
    <div className="">
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          style={{
            role: "progressbar",
            ariaValuenow: `${progressbarWidthNumber}`,
            ariaValuemin: "0",
            ariaValuemax: "100",
            width: `${progressbarWidthNumber}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
