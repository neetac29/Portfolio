import { useEffect, useState } from "react";
import { getYourVisits } from "../../utils/visitor";

function YourVisits() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const visits = await getYourVisits();
        setCount(visits);
      } catch (error) {
        console.warn("Firestore offline, default visit count");
      }
    };

    fetchVisits();
  }, []);

  return <p>🔁 You visited this site {count} times</p>;
}

export default YourVisits;
