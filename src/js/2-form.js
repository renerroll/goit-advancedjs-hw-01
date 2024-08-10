export class FormStateStorage {
    constructor({ key, data = '' } = {}) {
      this.key = key;
      this._data = data;
    }
  
    get data() {
      try {
        const dataFromLS = localStorage.getItem(this.key);
        const parsedData = dataFromLS ? JSON.parse(dataFromLS) : {};
        return parsedData;
      } catch (error) {
        console.log(error.message);
      }
    }
    set data(newData) {
      try {
        localStorage.setItem(this.key, JSON.stringify(newData));
      } catch (error) {
        console.log(error.message);
      }
    }
    reset() {
      localStorage.removeItem(this.key);
    }
  }