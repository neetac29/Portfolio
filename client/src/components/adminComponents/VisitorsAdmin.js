import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const VisitorsAdmin = () => {
  const [visitors, setVisitors] = useState([]);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const token = localStorage.getItem("tokenStore");

        const res = await api.get("/visitor", {
          headers: {
            Authorization: token,
          },
        });

        setVisitors(res.data.visitors || []);
        setUniqueVisitors(res.data.uniqueVisitors || 0);
        setTotalVisits(res.data.totalVisits || 0);
        setError("");
      } catch (err) {
        console.log(err);
        setError(err?.response?.data?.msg || "Unable to load visitors");
      }
    };

    fetchVisitors();
  }, []);

  const latestVisitors = visitors.slice(0, 5);

  return (
    <div className="visitors-admin">
      {error && <p style={{ color: "red" }}>{error}</p>}
  
      <div className="visitor-stats">
        <div className="visitor-card">
          Unique Visitors: {uniqueVisitors}
        </div>
  
        <div className="visitor-card">
          Total Visits: {totalVisits}
        </div>
      </div>
  
      <div className="visitor-table-wrapper">
        <table className="visitor-table">
          <thead>
            <tr>
              <th>IP Address</th>
              <th>Page</th>
              <th>Visits</th>
              <th>Last Visit</th>
            </tr>
          </thead>
  
          <tbody>
            {latestVisitors.length > 0 ? (
              latestVisitors.map((visitor) => (
                <tr key={visitor._id}>
                  <td>{visitor.ipAddress || "-"}</td>
  
                  <td>{visitor.page || "-"}</td>
  
                  <td>{visitor.visitCount || 0}</td>
  
                  <td>
                    {visitor.lastVisitedAt
                      ? new Date(visitor.lastVisitedAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-visitors">
                  No visitors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorsAdmin;
