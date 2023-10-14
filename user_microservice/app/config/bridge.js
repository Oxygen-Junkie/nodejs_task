require('dotenv').config();

const baseURL = "http://localhost:8082/"

exports.logEvent = async (id, login, event) => {
    const response = await fetch(baseURL + 'history/', {
      method: "PUT", 
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id, login, event}), 
    });
    return response.json(); 
  }

  exports.getHistory = async (id, page) => {
    const response = await fetch(baseURL + 'history/?' + new URLSearchParams(
      {
        id,
        page
      }
    ), {
      method: "GET", 
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      }, 
    });
    return response.json(); 
  }