import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import "./App.css";
import NearbySearchWidget from "./components/NearbySearchWidget";

const libraries: "places"[] = ["places"];

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  if (loadError) {
    return (
      <div>
        Something went wrong. Check your internet connection and try reloading
        the
      </div>
    );
  }

  return (
    <div className="App">
      <NearbySearchWidget isLoaded={isLoaded} />
    </div>
  );
}

export default App;
