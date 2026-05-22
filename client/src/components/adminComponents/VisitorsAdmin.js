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
          headers: { Authorization: token },
        });

        setVisitors(res.data.visitors || []);
        setUniqueVisitors(res.data.uniqueVisitors || 0);
        setTotalVisits(res.data.totalVisits || 0);
      } catch (err) {
        console.log(err);
        setError(err?.response?.data?.msg || "Unable to load visitors");
      }
    };

    fetchVisitors();
  }, []);

  return (
    <div>
      {/* <h4 className="admin-title">Visitors Analytics</h4> */}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        <strong>Unique Visitors:</strong> {uniqueVisitors}
      </p>
      <p>
        <strong>Total Visits:</strong> {totalVisits}
      </p>

      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>IP Address</th>
            <th>Browser / Device</th>
            <th>Page</th>
            <th>Visits</th>
            <th>Last Visit</th>
          </tr>
        </thead>

        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor._id}>
              <td>{visitor.ipAddress}</td>

              <td>{visitor.browser}</td>

              <td>{visitor.page}</td>

              <td>{visitor.visitCount}</td>

              <td>
                {visitor.lastVisitedAt
                  ? new Date(visitor.lastVisitedAt).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorsAdmin;
