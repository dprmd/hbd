import { useState } from "react";
import HBDWait from "./components/HDBWait";
import HBDReach from "./components/HBDReach";

export default function App() {
  const [HBDDay, setHBDDay] = useState(false);

  if (HBDDay) return <HBDReach />;
  else return <HBDWait setHBDDay={setHBDDay} />;
}
