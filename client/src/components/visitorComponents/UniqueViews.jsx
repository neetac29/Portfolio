import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";

function UniqueViews() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const snap = await getDoc(doc(db, "portfolio", "stats"));
        setCount(snap.data()?.uniqueViews || 0);
      } catch (error) {
        console.warn("Firestore offline, using default value");
      }
    };

    fetchViews();
  }, []);

  return <p>👀 Unique Visitors: {count}</p>;
}

export default UniqueViews;
