
import React from 'react';
import { FuelInfo } from '../types';

interface CriteriaTableProps {
  fuelData: FuelInfo[];
  onUpdate: (id: string, field: 'efficiency' | 'price', value: number) => void;
}

const CriteriaTable: React.FC<CriteriaTableProps> = ({ fuelData, onUpdate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-gray-800 text-white px-4 py-3 font-bold text-sm flex justify-between items-center">
        <span>유종별 정산 기준표</span>
        <span className="text-[10px] font-normal opacity-70">(수정 가능)</span>
      </div>
      <table className="w-full text-xs sm:text-sm text-center border-collapse">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="px-2 py-2 border-b border-gray-200">유종</th>
            <th className="px-2 py-2 border-b border-gray-200">기준연비</th>
            <th className="px-2 py-2 border-b border-gray-200">유류단가</th>
          </tr>
        </thead>
        <tbody>
          {fuelData.map((fuel) => (
            <tr key={fuel.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-2 py-2 border-b border-gray-200 font-medium bg-gray-50">{fuel.name}</td>
              <td className="px-2 py-2 border-b border-gray-200">
                <input
                  type="number"
                  step="0.1"
                  value={fuel.efficiency}
                  onChange={(e) => onUpdate(fuel.id, 'efficiency', parseFloat(e.target.value) || 0)}
                  className="w-16 px-1 py-1 border border-transparent hover:border-gray-300 focus:border-blue-500 rounded text-center transition-all bg-transparent focus:bg-white"
                />
              </td>
              <td className="px-2 py-2 border-b border-gray-200">
                <input
                  type="number"
                  value={fuel.price}
                  onChange={(e) => onUpdate(fuel.id, 'price', parseInt(e.target.value) || 0)}
                  className="w-20 px-1 py-1 border border-transparent hover:border-gray-300 focus:border-blue-500 rounded text-right transition-all bg-transparent focus:bg-white"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 text-[10px] text-gray-400 bg-gray-50 italic">
        * 정산금액 = (주행거리 / 기준연비) × 유류단가
      </div>
    </div>
  );
};

export default CriteriaTable;
