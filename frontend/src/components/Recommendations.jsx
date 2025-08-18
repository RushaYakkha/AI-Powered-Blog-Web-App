
import { useEffect, useState } from "react";

function Recommendations({ blogId }) {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!blogId) return;

    async function fetchRecommendations() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3002/api/blog/${blogId}/recommendations`);
        const data = await res.json();

        if (data.success) {
          setRecommended(data.recommended);
        } else {
          setError(data.message || "Failed to fetch recommendations");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [blogId]);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p>{error}</p>;
  if (recommended.length === 0) return <p>No recommendations found.</p>;

  return (
    <div>
      <h2>Recommended Blogs</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {recommended.map(blog => (
          <div key={blog._id} style={{ border: "1px solid #ccc", padding: "10px", width: "250px" }}>
            <img src={blog.image} alt={blog.title} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{blog.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: blog.description.slice(0, 100) + "..." }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
