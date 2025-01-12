import react, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

function App() {
  const [allData, setAllData] = useState({});
  const [assets, allAssets] = useState([]);
  const [isLoding, setLoading] = useState(false);

  const getAllData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/assets/insights");
      const allInsight = await res.json();

      setAllData(allInsight);
    } catch (e) {
      console.log(e);
    }
  };
  const allassetData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/assets/Allassets");
      const allassetes = await res.json();

      allAssets(allassetes.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllData();
    allassetData();
    const interval = setInterval(() => {
      getAllData(); 
      allassetData()// Fetch every 60 seconds
    }, 5000);

    return () => clearInterval(interval); 
  }, []);

  
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        IT Asset Analytics
      </h1>
      <div className="cards_container">
      <h2>All Data</h2>
        <div className="card_innercontainer">
          <Card text={"All Assets"} value={allData?.summary?.total}/>
          <Card text={"Total Desktop"} value={allData?.summary?.desktops}/>
          <Card text={"Total Laptop"} value={allData?.summary?.laptops}/>
          <Card text={"Total Workstation"} value={allData?.summary?.workstations}/>
         
        </div>
        <ResponsiveContainer width="400px" height="400px">
        
        <PieChart width={400} height={400}>
          
          <Pie data={allData.summary} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
          
        </PieChart>
      </ResponsiveContainer>
<h2>Status-Wise</h2>
        <div className="card_innercontainer">
          {" "}
          <Card text={"Available"} value={allData?.status_distribution?.available}/>
          
          <div className="card">
            <p>In Use</p>
            <p>{allData?.status_distribution?.in_use}</p>{" "}
          </div>
          <div className="card">
            <p>In Use</p>
            <p>{allData?.status_distribution?.in_use}</p>{" "}
          </div>
          <div className="card">
            <p>In Use</p>
            <p>{allData?.status_distribution?.in_use}</p>{" "}
          </div>
          <div className="card">
            <p>In Use</p>
            <p>{allData?.status_distribution?.in_use}</p>{" "}
          </div>
          <div className="card">
            <p>In Use</p>
            <p>{allData?.status_distribution?.in_use}</p>{" "}
          </div>
          <div className="card">
            <p>In Use</p>
            <p>{allData?.status_distribution?.in_use}</p>{" "}
          </div>
          <div className="card">
            <p>In Use</p>
            <p>{allData?.status_distribution?.in_use}</p>{" "}
          </div>
          <div className="card">
            <p>Retired</p>
            <p>{allData?.status_distribution?.recycle}</p>
          </div>
          <div className="card">
            <p>Retired</p>
            <p>{allData?.status_distribution?.recycle}</p>
          </div>
          <div className="card">
            <p>Retired</p>
            <p>{allData?.status_distribution?.recycle}</p>
          </div>
          <div className="card">
            <p>Retired</p>
            <p>{allData?.status_distribution?.recycle}</p>
          </div>
          <div className="card">
            <p>Delivered</p>
            <p>{allData?.status_distribution?.delivered}</p>
          </div>
          <div className="card">
            <p>In Transit</p>
            <p>{allData?.status_distribution?.in_transit}</p>{" "}
          </div>
          <div className="card">
            <p>Reapir</p>
            <p>{allData?.status_distribution?.repair}</p>
          </div>
          <div className="card">
            <p>To be repair</p>
            <p>{allData?.status_distribution?.ready_to_retire}</p>{" "}
          </div>
        </div>
        <h2>Expired</h2>
        <div className="card_innercontainer">
         
          <div className="card">
            <p>Desktop</p>
            <p>{allData?.warranty?.expired_desktops}</p>
          </div>
          <div className="card">
            <p>Laptop</p>
            <p>{allData?.warranty?.expired_laptops}</p>
          </div>
          <div className="card">
            <p>Workstation</p>
            <p>{allData?.warranty?.expired_workstations}</p>
          </div>
          <div className="card">
            <p>Total</p>
            <p>{allData?.warranty?.total_expired}</p>
          </div>
        </div>
      </div>



      <div className="Table_container">
        <h2 style={{padding:"50px",textAlign:"center",color:"white"}}>List of All Assets</h2>
{isLoding?<p>Loading..</p>:(<div>
          {assets && assets.length > 0 ? (
            <table className="Table_container">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Manufacturer</th>
                  <th>Assigned To</th>
                  <th>Purchase Date</th>
                  <th>warranty ends </th>
                </tr>
              </thead>
              <tbody>
                {assets &&
                  assets.length > 0 &&
                  assets.map((a) => (
                    <tr key={a._id}>
                      <td>{a.type}</td>
                      <td>{a.status}</td>
                      <td>{a.manufacturer}</td>
                      <td>{a.assigned_to==null?"NA":a.assigned_to}</td>
                      <td>{a.purchase_date.split("T")[0]}</td>
                      <td>{a.warranty_end_date.split("T")[0]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            "No assets Found"
          )}
        </div>)}
        


      </div>
    </>
  );
}

export default App;
