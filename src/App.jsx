import { useState, useEffect } from "react";
import HBDWait from "./components/HDBWait";
import HBDReach from "./components/HBDReach";
import dia from "./dia.json";
import { uploadInformationToFirebase } from "./utils/uploadInformation";

export default function App() {
  const [HBDDay, setHBDDay] = useState(false);

  const date = new Date();
  const thisDate = date.getDate();
  const thisMonth = date.getMonth() + 1;

  useEffect(() => {
    uploadInformationToFirebase();
    if (thisDate === dia.birth.date && thisMonth === dia.birth.month)
      setHBDDay(true);
    else setHBDDay(false);
  }, []);

  if (HBDDay) return <HBDReach />;
  else return <HBDWait setHBDDay={setHBDDay} HBDDay={HBDDay} />;
}
