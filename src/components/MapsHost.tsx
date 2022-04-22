import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "../css/home.css";
import { CONFIG } from "../config";

function MapHost(props: any ) {
  const [position, setPosition] = useState<any>({
    lat: !Number(props.lat)? 21.077923: Number(props.lat),
    lng: !Number(props.lng)? 105.80889: Number(props.lng),
  });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: CONFIG.googleMapsApiKey,
  });

  const onCLickMap = (event: any) => {
    const data = event.latLng.toJSON();
    setPosition(data);
    props.handeChangePosition(data);
  };
  return (
    <div className="maps">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={11}
          onClick={onCLickMap}
        >
          <Marker position={position} />
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MapHost;
