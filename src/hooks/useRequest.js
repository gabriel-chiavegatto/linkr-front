import axios from "axios";
import React from "react";

function useRequest() {
  const [value, setValue] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const API = process.env.REACT_APP_API_BASE_URL

  const request = React.useCallback(async (route, method, body, config) => {
    try {
      setError(null)
      setLoading(true)

      if (method.toLowerCase() === "get") {
        const data = await axios.get(`${API}${route}`, config);
        setValue(data)
      } else if (method.toLowerCase() === "post") {
        const data = await axios.post(`${API}${route}`, body, config);
        setValue(data)
      } else if (method.toLowerCase() === "delete") {
        const data = await axios.delete(`${API}${route}`, config);
        setValue(data)
      }
    } catch (err) {
      setError(err);
    } finally {
      if (error) {
        setValue(null);
      }
      setLoading(false);
    }
  }, []);

  return {
    value,
    loading,
    error,
    request,
    setError,
  };
}

//

export default useRequest;
