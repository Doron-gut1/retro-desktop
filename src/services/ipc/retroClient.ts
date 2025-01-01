import { ipcRenderer } from 'electron';

export const retroClient = {
  async connectDb(connectionString: string) {
    return await ipcRenderer.invoke('db:connect', connectionString);
  },

  async getProperty(hskod: string) {
    return await ipcRenderer.invoke('retro:getProperty', hskod);
  },

  async getPayer(mspkod: number) {
    return await ipcRenderer.invoke('retro:getPayer', mspkod);
  },

  async prepareRetroData(params: { hskod: string; mspkod: number }) {
    return await ipcRenderer.invoke('retro:prepareData', params);
  },

  async multiplyTempArnmforatRows(params: {
    hskod: string;
    sugtsList: string;
    isYearlyCharge: boolean;
  }) {
    return await ipcRenderer.invoke('retro:multiplyRows', params);
  },

  async checkPeriod(mnt: number) {
    return await ipcRenderer.invoke('retro:checkPeriod', mnt);
  }
};