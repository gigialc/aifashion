export const fetchPinterestData = async (link) => {
    const myHeaders = new Headers();
    myHeaders.append("X-API-KEY", "5fe3d613c2c5a005b13433047a7741d040f18307");
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({ "url": link });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
  
    try {
      const response = await fetch("https://scrape.serper.dev", requestOptions);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API error:', error);
      throw new Error('Failed to fetch data');
    }
  };
  