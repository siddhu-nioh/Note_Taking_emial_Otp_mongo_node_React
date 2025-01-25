import { createContext, useState, useCallback,useEffect } from 'react';
import axios from 'axios';


const ApiContext = createContext();


const ApiProvider = ({ children }) => {
  
  const apiBaseURL = 'https://note-taking-emial-otp-mongo-node-react.onrender.com'; 
  const [appTheme, setAppTheme] = useState('light'); 
  const appVersion = '1.0.0'; // App version
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({ name: '', email: '', dateOfBirth: '' }); 

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios.get(`${apiBaseURL}/api/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser(response.data); 
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
  
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  
  const setAuthToken = (token) => {
    localStorage.setItem('token', token);
  };

  
  const removeAuthToken = () => {
    localStorage.removeItem('token');
  };

  
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

  
  const get = useCallback((endpoint) => makeRequest('get', endpoint), [makeRequest]);
  const post = useCallback((endpoint, data) => makeRequest('post', endpoint, data), [makeRequest]);
  const put = useCallback((endpoint, data) => makeRequest('put', endpoint, data), [makeRequest]);
  const del = useCallback((endpoint) => makeRequest('delete', endpoint), [makeRequest]);

  
  const toggleTheme = () => {
    setAppTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  
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