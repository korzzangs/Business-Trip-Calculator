
import React, { useState, useMemo } from 'react';
import { FUEL_DATA } from './constants';
import { FuelInfo } from './types';
import CriteriaTable from './components/CriteriaTable';
import ReferenceTable from './components/ReferenceTable';

const App: React.FC = () => {
  const [mileage, setMileage] = useState<string>('40');
  const [selectedFuelId, setSelectedFuelId] = useState<string>(FUEL_DATA[0].id);
  
  // 앱 시작 시 항상 기본 데이터(FUEL_DATA)로 초기화 (저장 기능 제거)
  const [fuels, setFuels] = useState<FuelInfo[]>(FUEL_DATA);

  // 사전품의서 & 지출결의서 초기값
  const defaultRequest = `1. 배경 및 목적
ㄴ 

2. 세부내용
1) 일자 : 2026-02-11(수) 13:00 ~ 17:00
2) 장소 : 
3) 인원 : 선행기술팀 OOO

3. 사용예정금액 : 원
 ㄴ 자차왕복유류대: 원
 ㄴ 중식 식대비(2인): 원

4. 가용예산(편성예산-실적) : 원

(수신처: 재무회계)`;

  const defaultResolution = `하기 사항에 대한 비용 전표 상신합니다.

1. 목적 : 

2. 인원 및 일시 : 2026-02-11(수), 선행기술팀 OOO

3. 사용금액 : 원

4. 기타
ㄴ 기 품의서 예상 지출비용 : 원
ㄴ 본 정산서 실제 지출비용 : 원

(수신처: 재경, 재무회계)

(품의서 첨부하기)`;

  const [preRequest, setPreRequest] = useState(defaultRequest);
  const [expResolution, setExpResolution] = useState(defaultResolution);

  const selectedFuel = useMemo(() => 
    fuels.find(f => f.id === selectedFuelId) || fuels[0],
    [selectedFuelId, fuels]
  );

  const settlementAmount = useMemo(() => {
    const distance = parseFloat(mileage);
    if (isNaN(distance) || distance <= 0) return 0;
    
    const amount = (distance / selectedFuel.efficiency) * selectedFuel.price;
    return Math.ceil(amount);
  }, [mileage, selectedFuel]);

  const handleUpdateFuel = (id: string, field: 'efficiency' | 'price', value: number) => {
    setFuels(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const handleCopy = (text: string, title: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${title} 내용이 복사되었습니다.`);
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center bg-gray-50">
      <header className="w-full max-w-6xl mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-blue-600">🚗</span> 주행거리 정산 시스템
          </h1>
          <p className="text-gray-500 text-sm mt-1">주행 정보와 유종을 입력하면 실시간으로 정산 금액이 계산됩니다.</p>
        </div>
        
        {/* 네이버 길찾기 아이콘 */}
        <a 
          href="https://map.naver.com/p/directions/14324454.4509919,4190921.3681565,CTR,13026464,PLACE_POI/-/-/car?c=15.00,0,0,0,dh"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center group transition-transform hover:scale-105"
        >
          <div className="w-10 h-10 bg-[#03C75A] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:shadow-lg">
            N
          </div>
          <span className="text-[10px] mt-1 text-gray-600 font-bold group-hover:text-green-600">네이버길찾기</span>
        </a>
      </header>

      <main className="w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Left Section */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 mb-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse table-fixed">
                  <thead>
                    <tr className="bg-[#999999] text-white font-bold text-sm">
                      <th className="w-1/5 px-4 py-3 border-r border-gray-400">
                        <span className="text-red-400 mr-1">*</span>주행거리
                      </th>
                      <th className="w-1/5 px-4 py-3 border-r border-gray-400">
                        <span className="text-red-400 mr-1">*</span>유종
                      </th>
                      <th className="w-1/5 px-4 py-3 border-r border-gray-400">기준연비</th>
                      <th className="w-1/5 px-4 py-3 border-r border-gray-400">유류단가</th>
                      <th className="w-1/5 px-4 py-3">정산금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-[#fff0f0] border-b border-gray-200 h-16">
                      <td className="p-2 border-r border-gray-300">
                        <input
                          type="number"
                          value={mileage}
                          onChange={(e) => setMileage(e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                          placeholder="0"
                        />
                      </td>
                      <td className="p-2 border-r border-gray-300">
                        <select
                          value={selectedFuelId}
                          onChange={(e) => setSelectedFuelId(e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                        >
                          {fuels.map((fuel) => (
                            <option key={fuel.id} value={fuel.id}>{fuel.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2 border-r border-gray-300 text-center text-gray-700 font-medium text-base">
                        {selectedFuel.efficiency}
                      </td>
                      <td className="p-2 border-r border-gray-300 text-right text-gray-700 font-medium pr-4 text-base">
                        {selectedFuel.price.toLocaleString()}
                      </td>
                      <td className="p-2 text-right font-bold text-gray-800 pr-4 text-lg">
                        {settlementAmount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <section className="w-full">
              <h2 className="text-lg font-bold text-gray-800 mb-3 ml-1">참고사항</h2>
              <ReferenceTable />
            </section>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <CriteriaTable 
              fuelData={fuels} 
              onUpdate={handleUpdateFuel} 
            />
            <div className="mt-4 bg-blue-50 border border-blue-100 p-3 rounded-lg text-xs sm:text-sm text-blue-700">
              <div className="font-bold">💡 알림: 정산 금액은 소수점 올림처리</div>
            </div>
          </div>
        </div>

        {/* 사전품의서 & 지출결의서 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-12">
          {/* 1. 사전품의서 */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col h-[500px]">
            <div className="bg-gray-700 text-white px-5 py-3 flex justify-between items-center rounded-t-lg">
              <h2 className="font-bold">사전품의서</h2>
              <button 
                onClick={() => handleCopy(preRequest, "사전품의서")}
                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs transition-colors"
              >
                복사하기
              </button>
            </div>
            <textarea 
              value={preRequest}
              onChange={(e) => setPreRequest(e.target.value)}
              className="flex-grow w-full p-5 text-sm leading-relaxed text-gray-700 focus:outline-none resize-none bg-gray-50 font-mono"
            />
          </div>

          {/* 2. 지출결의서 */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col h-[500px]">
            <div className="bg-gray-700 text-white px-5 py-3 flex justify-between items-center rounded-t-lg">
              <h2 className="font-bold">지출결의서</h2>
              <button 
                onClick={() => handleCopy(expResolution, "지출결의서")}
                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs transition-colors"
              >
                복사하기
              </button>
            </div>
            <textarea 
              value={expResolution}
              onChange={(e) => setExpResolution(e.target.value)}
              className="flex-grow w-full p-5 text-sm leading-relaxed text-gray-700 focus:outline-none resize-none bg-gray-50 font-mono"
            />
          </div>
        </div>
      </main>
      
      <footer className="mt-8 pb-8 text-gray-400 text-xs text-center w-full">
        &copy; {new Date().getFullYear()} 차량 비용 정산 서비스. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
