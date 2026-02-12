
import { FuelInfo, Region } from './types';

export const FUEL_DATA: FuelInfo[] = [
  { id: 'gasoline', name: '휘발유', efficiency: 9, price: 1700 },
  { id: 'diesel', name: '경유', efficiency: 9, price: 1600 },
  { id: 'lpg', name: 'LPG', efficiency: 7, price: 980 },
  { id: 'ev', name: '전기차', efficiency: 2.5, price: 330 },
  { id: 'hydrogen', name: '수소차', efficiency: 2.5, price: 330 },
];

export const REGIONS: Region[] = ['서울', '경기', '강원', '충청', '전라', '경상', '제주', '기타'];
