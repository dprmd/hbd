export async function getTimeFromServer() {
  const fallbackTime = new Date();

  try {
    const response = await fetch("https://worldtimeapi.org/api/ip");
    if (!response.ok) {
      a;
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    const currentTime = new Date(data.utc_datetime);
    return currentTime;
  } catch (error) {
    console.error("Error fetching time:", error);
    return fallbackTime;
  }
}
