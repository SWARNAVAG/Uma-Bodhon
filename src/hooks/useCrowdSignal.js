import { useEffect, useState, useCallback } from 'react';
import { base44 } from '@/API/base44Client';

const PANDEL_IDS = [
  'n01', 'n02', 'n03', 'n04', 'n05', 'n06', 'n07', 'n08', 'n09', 'n10',
  'n11', 'n12', 'n13', 'n14', 'n15', 'n16', 'n17', 'n18', 'n19', 'n20',
  'n21', 'n22', 'n23', 'n24', 'n25', 'n26', 'n27', 'n28', 'n29', 'n30',
  'n31', 'n32', 'n33', 'n34', 's01', 's02', 's03', 's04', 's05', 's06',
  's07', 's08', 's09', 's10', 's11', 's12', 's13', 's14', 's15', 's16',
  's17', 's18', 's19', 's20', 's21', 's22', 's23', 's24', 's25', 's26',
  's27', 's28', 's29', 's30', 's31', 's32', 's33', 's34', 's35', 's36',
  's37', 's38', 's39', 's40', 's41', 's42', 's43', 's44', 's45', 'sl01',
  'sl02', 'sl03', 'sl04', 'sl05', 'sl06', 'sl07', 'sl08', 'sl09', 'sl10',
  'sl11', 'sl12', 'sl13', 'sl14', 'sl15', 'sl16', 'sl17', 'sl18', 'sl19',
  'sl20', 'sl21', 'sl22', 'sl23', 'sl24', 'sl25'
];

const UPDATE_INTERVAL = 30000;

function generateMockCrowdData() {
  const data = {};
  const popularIds = ['n01', 'n05', 'n11', 'n12', 's04', 's10', 's20', 's30', 'sl04', 'sl07', 'sl14', 'sl25'];
  
  for (const id of PANDEL_IDS) {
    const isPopular = popularIds.includes(id);
    const baseLevel = isPopular ? 65 + Math.random() * 20 : 20 + Math.random() * 40;
    data[id] = {
      level: Math.round(baseLevel),
      updatedAt: Date.now()
    };
  }
  return data;
}

function updateMockCrowdData(prevData) {
  const newData = { ...prevData };
  const popularIds = ['n01', 'n05', 'n11', 'n12', 's04', 's10', 's20', 's30', 'sl04', 'sl07', 'sl14', 'sl25'];
  
  for (const id of PANDEL_IDS) {
    const isPopular = popularIds.includes(id);
    const baseLevel = isPopular ? 65 : 30;
    const variation = (Math.random() - 0.5) * 20;
    const newLevel = Math.max(0, Math.min(100, Math.round(baseLevel + variation)));
    
    newData[id] = {
      level: newLevel,
      updatedAt: Date.now()
    };
  }
  return newData;
}

export default function useCrowdSignal() {
  const [crowdData, setCrowdData] = useState(() => generateMockCrowdData());
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  const fetchCrowdData = useCallback(async () => {
    try {
      const room = base44.actors.CrowdSignal('default').connect({ id: 'crowd-client' });
      const data = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('timeout')), 5000);
        room.send({ type: 'get-crowd' });
        const sub = room.subscribe((/** @type {{type: string, data: any}} */ msg) => {
          if (msg.type === 'crowd-data') {
            clearTimeout(timeout);
            sub.unsubscribe();
            room.close();
            resolve(msg.data);
          }
        });
      });
      setCrowdData(data);
      setConnected(true);
      setError(null);
    } catch (err) {
      console.warn('CrowdSignal connection failed, using mock data:', err);
      setConnected(false);
      setCrowdData(prev => updateMockCrowdData(prev));
    }
  }, []);

  useEffect(() => {
    fetchCrowdData();
    const interval = setInterval(fetchCrowdData, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchCrowdData]);

  useEffect(() => {
    if (!connected) {
      const mockInterval = setInterval(() => {
        setCrowdData(prev => updateMockCrowdData(prev));
      }, UPDATE_INTERVAL);
      return () => clearInterval(mockInterval);
    }
  }, [connected]);

  const getCrowdLevel = useCallback((pandalId) => {
    return crowdData[pandalId]?.level ?? 0;
  }, [crowdData]);

  const getCrowdStatus = useCallback((pandalId) => {
    const level = getCrowdLevel(pandalId);
    return level >= 60 ? 'crowded' : 'free';
  }, [getCrowdLevel]);

  return { crowdData, getCrowdLevel, getCrowdStatus, connected, error };
}