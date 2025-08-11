import React, { useState, useEffect } from "react";
import axios from "axios";
import TripCard from "./TripCard";
import "./App.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ดึงข้อมูลจาก server โดย param เป็น keywords ได้มาจาก input search
  // ใช้ useEffect เพื่อทำการดึงข้อมูลเมื่อ search เปลี่ยน กำหนด array dependency
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(false);
      axios
        .get("http://localhost:4001/trips", {
          params: { keywords: search.trim() },
        })
        .then((res) => {
          setTrips(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching trips:", err);
          setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
          setLoading(false);
        });
    }, 500); // debounce 500ms 

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleTagClick = (tag) => setSearch(tag);

  return (
    <div className="container">
      <h1 className="title">เที่ยวไหนดี</h1>
      <input
        className="search-input"
        type="text"
        placeholder="หาที่เที่ยวแล้วไปกัน..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        required
      />
      <hr className="divider" />
      <div className="post-list">
        { loading ? 
        (<p>กำลังโหลด...</p>) : error ?
        (<p className="error">{error}</p>) : trips.length === 0 ? 
        (<p>ไม่พบข้อมูลที่ตรงกับคำค้นหา</p>) : 
        (trips.map((trip) => (<TripCard key={trip.eid} trip={trip} onTagClick={handleTagClick} />)))
        }
      </div>
    </div>
  );
}
