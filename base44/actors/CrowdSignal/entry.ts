import { Actor } from 'base44:runtime/actors';

const UPDATE_INTERVAL_MS = 30000;
const PANDAL_IDS = [
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

function generateCrowdLevel(baseLevel) {
  const variation = (Math.random() - 0.5) * 20;
  return Math.max(0, Math.min(100, Math.round(baseLevel + variation)));
}

function initializeCrowdData() {
  const data = {};
  for (const id of PANDAL_IDS) {
    const isPopular = ['n01', 'n05', 'n11', 'n12', 's04', 's10', 's20', 's30', 'sl04', 'sl07', 'sl14', 'sl25'].includes(id);
    const baseLevel = isPopular ? 65 + Math.random() * 20 : 20 + Math.random() * 40;
    data[id] = {
      level: Math.round(baseLevel),
      updatedAt: Date.now()
    };
  }
  return data;
}

export default class CrowdSignal extends Actor {
  crowdData = initializeCrowdData();
  updateTimer = null;

  async handleStart() {
    this.startPeriodicUpdates();
  }

  startPeriodicUpdates() {
    this.updateTimer = setInterval(() => {
      this.updateCrowdLevels();
    }, UPDATE_INTERVAL_MS);
  }

  updateCrowdLevels() {
    for (const id of Object.keys(this.crowdData)) {
      const current = this.crowdData[id];
      const isPopular = ['n01', 'n05', 'n11', 'n12', 's04', 's10', 's20', 's30', 'sl04', 'sl07', 'sl14', 'sl25'].includes(id);
      const baseLevel = isPopular ? 65 : 30;
      const newLevel = generateCrowdLevel(baseLevel);
      
      this.crowdData[id] = {
        level: newLevel,
        updatedAt: Date.now()
      };
    }
    this.broadcast({ type: 'crowd-update', data: this.crowdData });
  }

  async handleMessage(msg) {
    if (msg.type === 'get-crowd') {
      this.send(msg.connectionId, { type: 'crowd-data', data: this.crowdData });
    }
  }

  async handleClose() {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }
  }
}