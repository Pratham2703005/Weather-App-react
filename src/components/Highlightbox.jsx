import React from "react";

const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div className="bg-gray-700 text-gray-100 p-4 rounded-lg flex flex-col items-center justify-between w-48 h-28 shadow-lg">
      <div className="text-base font-medium">{title}</div>
      <div className="flex items-center justify-between w-full">
        <Icon className="text-3xl text-blue-400" />
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default HighlightBox;
