import React from "react";

export type TimeViewProps = {
  date: Date;
};

const TimeView: React.FC<TimeViewProps> = ({ date }) => {
  const dateClean = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return <>{dateClean}</>;
};

export default TimeView;
