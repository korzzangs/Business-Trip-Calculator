
import React from 'react';

const ReferenceTable: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
      <table className="w-full text-base text-center border-collapse table-fixed">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-300 h-14">
            <th className="px-4 py-3 border-r border-gray-300 font-bold text-gray-700">직급</th>
            <th className="px-4 py-3 border-r border-gray-300 font-bold text-gray-700">숙박비(1 일)</th>
            <th className="px-4 py-3 font-bold text-gray-700">식비(1 식)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-300 h-14">
            <td className="px-4 py-3 border-r border-gray-300 font-medium">경영리더</td>
            <td className="px-4 py-3 border-r border-gray-300">실비(100,000)</td>
            <td className="px-4 py-3">실비(15,000)</td>
          </tr>
          <tr className="h-14">
            <td className="px-4 py-3 border-r border-gray-300 font-medium">직원</td>
            <td className="px-4 py-3 border-r border-gray-300">100,000</td>
            <td className="px-4 py-3">12,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReferenceTable;
