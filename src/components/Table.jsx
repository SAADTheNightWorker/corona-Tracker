import React from "react";

const Table = ({ countries }) => {
  return (
    <div className="mt-5 h-[400px] overflow-y-scroll text-gray-500 bg-white">
      {countries.map(({ country, cases }, index) => (
        <tr key={index} className="odd:bg-gray-200 flex justify-between">
          <td className="p-2">{country}</td>
          <td>
            <strong className="p-2">{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
