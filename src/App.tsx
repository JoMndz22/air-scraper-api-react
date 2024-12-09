import { useCallback, useRef, useState } from "react";

import "./index.css";

import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";

interface MarkerData {
  position: google.maps.LatLngLiteral;
  title: string;
}

interface MarkerData {
  position: google.maps.LatLngLiteral;
  title: string;
}

const App = () => {
  const [positionMap, setPositionMap] = useState({
    lat: -34.397,
    lng: 150.644,
  });
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const handleSearchBoxMounted = (ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  };

  const handlePlacesChanged = useCallback(() => {
    const places = searchBoxRef.current?.getPlaces();
    if (places?.length === 0) {
      return;
    }

    const place = places![0];

    if (place.geometry?.location) {
      setPositionMap(place.geometry.location.toJSON());
      setMarkers([
        {
          position: place.geometry.location.toJSON(),
          title: place.name || "--",
        },
      ]);
    }
  }, []);

  // const handleMapClick = (e) => {
  //   console.log(e);
  //   console.log("e => ", e.latLng.toJSON());
  //   const geocoder = new window.google.maps.Geocoder();
  //   geocoder.geocode({ location: e.latLng.toJSON() }, (results, status) => {
  //     console.log(status, results);
  //     if (status === "OK" && results[0]) {
  //       // If geocoding is successful, set the address
  //       console.log(results[0].formatted_address);
  //     } else {
  //       setInfo("No address found.");
  //     }
  //   });
  // };

  return (
    <div className="app">
      <div className="bg-gray-500 p-6">
        <h1 className="uppercase text-white">Flight Search</h1>
      </div>
      <div className="mt-5 bg-red-200">
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
        >
          <div>
            <StandaloneSearchBox
              onLoad={handleSearchBoxMounted}
              onPlacesChanged={handlePlacesChanged}
            >
              <input
                type="text"
                placeholder="Search city"
                style={{
                  boxSizing: "border-box",
                  border: "1px solid #dedede",
                  width: "400px",
                  height: "40px",
                  padding: "0 12px",
                  fontSize: "18px",
                  outline: "none",
                  position: "absolute",
                  left: "50%",
                  top: "10px",
                  marginLeft: "-200px",
                  borderRadius: "5px",
                }}
              />
            </StandaloneSearchBox>

            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "500px",
              }}
              center={positionMap}
              zoom={7}
              // onClick={(e) => handleMapClick(e)}
            >
              {markers.map((marker, index) => (
                <Marker key={index} position={marker.position} />
              ))}
            </GoogleMap>
          </div>
        </LoadScript>
      </div>
      Markers: {JSON.stringify(markers)}
    </div>
  );
};

export default App;
