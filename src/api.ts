const BASE_PATH = '/';

const api = {
  history(url = BASE_PATH) {
    return {
      async fetchAll() {
        const res = await fetch(`${url}_data.json`);
        const data = await res.json();
        return data.history as Dto.Product[];
      },
    };
  },
};
export default api;
