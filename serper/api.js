export const fetchPinterestData = async (link) => {
    const myHeaders = new Headers();
    myHeaders.append("X-API-KEY", "5259ae2249964304f3f8306e768c0dba1c360c92");
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

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API error:', error);
      throw new Error('Failed to fetch data');
    }
  };
  