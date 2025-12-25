import React, { useState, useEffect } from "react";

const PostFetcher = () => {
  // 1. Create three state variables
  const [data, setData] = useState(null); // default null
  const [loading, setLoading] = useState(true); // default true
  const [error, setError] = useState(null); // default null

  useEffect(() => {
    // 2. Define the async fetch function
    const fetchPost = async () => {
      // 3. Implement full state flow
      setLoading(true); // Set loading before request

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        // On success: update data and clear error
        setData(result);
        setError(null);
      } catch (err) {
        // In catch block: set error and clear data
        setError(err);
        setData(null);
      } finally {
        // In finally block: stop loading
        setLoading(false);
      }
    };

    fetchPost();
  }, []); // Empty array ensures it runs when component mounts

  // 4. Conditional Rendering for UI
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data) return <h2>{data.title}</h2>;

  return null;
};

export default PostFetcher;
