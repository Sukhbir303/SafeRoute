// API service for making HTTP requests
// Similar to axios in React web apps

const API_URL = 'http://localhost:5000/api'; // Change this to your backend URL

class ApiService {
  // GET request
  async get(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('GET Error:', error);
      throw error;
    }
  }

  // POST request
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('POST Error:', error);
      throw error;
    }
  }

  // PUT request
  async put(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('PUT Error:', error);
      throw error;
    }
  }

  // DELETE request
  async delete(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('DELETE Error:', error);
      throw error;
    }
  }
}

export default new ApiService();
