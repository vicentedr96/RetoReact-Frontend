
export const Fetch = async (url, options) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };
  