import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "../css/home.css";
import { CONFIG } from "../config";

function Map(props: { lat: any; lng: any }) {
  const center = { lat: Number(props.lat), lng: Number(props.lng) };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: CONFIG.googleMapsApiKey,
  });
  return (
    <div className="maps">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={12}
        >
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Map;
