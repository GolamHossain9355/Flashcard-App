import { useState, useEffect } from "react";

export default function LoaderAnimation() {
  const [progressbarWidthNumber, setProgressBarWidthNumber] = useState(0);

  useEffect(() => {
    if (progressbarWidthNumber < 76) {
      setProgressBarWidthNumber(progressbarWidthNumber + 3);
    }
  }, [progressbarWidthNumber]);

  return (
    <div>
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
