import axios from 'axios';

export default class MonitorService {
  static baseRoute = '/api/monitor';

  static getMonitors() {
    const accessToken = localStorage.getItem('accessToken');

    return axios.get(`${this.baseRoute}/`, {
      headers: { Authorization: accessToken as string },
    });
  }

  static postMonitor(dialogMonitor: any) {
    const accessToken = localStorage.getItem('accessToken');

    return axios.post(`${this.baseRoute}/`, dialogMonitor, {
      headers: { Authorization: accessToken as string },
    });
  }

  static putMonitor(dialogMonitor: any) {
    const accessToken = localStorage.getItem('accessToken');

    return axios.put(`${this.baseRoute}/`, dialogMonitor, {
      headers: { Authorization: accessToken as string },
    });
  }

  static deleteMonitor(dialogMonitorId: string) {
    const accessToken = localStorage.getItem('accessToken');

    return axios.delete(`${this.baseRoute}/${dialogMonitorId}`, {
      headers: { Authorization: accessToken as string },
    });
  }
}
