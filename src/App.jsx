import { useState, useEffect } from "react";
import HBDWait from "./components/HDBWait";
import HBDReach from "./components/HBDReach";
import dia from "./dia.json";

export default function App() {
  const [HBDDay, setHBDDay] = useState(false);

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;

  useEffect(() => {
    if (day === dia.birth.date && month === dia.birth.month) setHBDDay(true);
    else setHBDDay(false);
  }, []);

  if (HBDDay) return <HBDReach />;
  else return <HBDWait setHBDDay={(bool) => setHBDDay(bool)} HBDDay={HBDDay} />;
}
