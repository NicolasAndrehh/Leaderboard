const getScores = async (url) => {
  try {
    // GET data and validate response
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Return data
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const sendNewScore = async (url, score) => {
  try {
    // POST data and validate response
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(score),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Return response
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export { getScores, sendNewScore };