import { createContext, useState, useCallback,useEffect } from 'react';
import axios from 'axios';

// Create the context
const ApiContext = createContext();

// Create a provider component
const ApiProvider = ({ children }) => {
  // Define your global values here
  const apiBaseURL = 'http://localhost:5000'; // API base URL
  const [appTheme, setAppTheme] = useState('light'); // App theme (can be dynamic)
  const appVersion = '1.0.0'; // App version
  const [isLoading, setIsLoading] = useState(false); // Global loading state
  const [error, setError] = useState(null); // Global error state
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({ name: '', email: '', dateOfBirth: '' }); // Initialize with default values

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios.get(`${apiBaseURL}/api/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser(response.data); // Update the user state
    } catch (error) {
      console.error('Failed to fetch profile', error);
    }
  }, [apiBaseURL]);
  const fetchNotes = useCallback(async () => {
    try {
      const response = await axios.get(`${apiBaseURL}/api/notes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Failed to fetch notes', error);
    }
  },[apiBaseURL]);
  const signOut = () => {
    localStorage.removeItem('token');
    setUser({ name: '', email: '', dateOfBirth: '' });
    setNotes([]);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchProfile();
      fetchNotes();
    }
  }, []);
  // Get token from localStorage (if available)
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Set token in localStorage
  const setAuthToken = (token) => {
    localStorage.setItem('token', token);
  };

  // Remove token from localStorage
  const removeAuthToken = () => {
    localStorage.removeItem('token');
  };

  // Centralized API request function
  const makeRequest = useCallback(
    async (method, endpoint, data = null, headers = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios({
          method,
          url: `${apiBaseURL}${endpoint}`,
          data,
          headers: {
            ...headers,
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });

        setIsLoading(false);
        return response.data;
      } catch (error) {
        setIsLoading(false);
        setError(error.response?.data?.message || 'An error occurred');
        throw error;
      }
    },
    [apiBaseURL]
  );

  // Reusable API functions
  const get = useCallback((endpoint) => makeRequest('get', endpoint), [makeRequest]);
  const post = useCallback((endpoint, data) => makeRequest('post', endpoint, data), [makeRequest]);
  const put = useCallback((endpoint, data) => makeRequest('put', endpoint, data), [makeRequest]);
  const del = useCallback((endpoint) => makeRequest('delete', endpoint), [makeRequest]);

  // Toggle app theme
  const toggleTheme = () => {
    setAppTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Value object to be passed to consumers
  const value = {
    apiBaseURL,
    appTheme,
    appVersion,
    isLoading,
    fetchNotes,
    error,
    get,
    user,
    fetchProfile,
    notes,
    post,
    put,
    del,
    toggleTheme,
    setAuthToken,
    removeAuthToken,
    signOut
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export { ApiContext, ApiProvider };