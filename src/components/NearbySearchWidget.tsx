import { useEffect, useState } from "react";
import NearbySearchForm from "./NearbySearchForm";
import Results from "./Results";

export interface NearbyPlace {
  name: string;
  address: string;
  rating: number | string;
  id: string;
}

export interface Coordinates {
  lng: number;
  lat: number;
}

export default function NearbySearchWidget({
  isLoaded,
}: {
  isLoaded: boolean;
}): JSX.Element {
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  let [keyword, setKeyword] = useState("");

  const [nearbyPlaces, setNearbyPlaces] = useState([] as NearbyPlace[]);

  useEffect(() => {
    if (isLoaded) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      const latLngGoogleObject = new window.google.maps.LatLng(
        coordinates.lat || 0,
        coordinates.lng || 0
      );

      const requestOptions = {
        location: latLngGoogleObject,
        radius: 15000,
        keyword,
      };

      function processResults(
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) {
        if (
          results &&
          status === window.google.maps.places.PlacesServiceStatus.OK
        ) {
          let nearbyPlaces: NearbyPlace[] = results.map(
            (result: google.maps.places.PlaceResult): NearbyPlace => {
              return {
                name: result.name || "N/A",
                address: result.vicinity || "N/A",
                rating: result.rating || "N/A",
                id: generateRandomId(),
              };
            }
          );

          setNearbyPlaces(nearbyPlaces);
        }
      }

      service.nearbySearch(requestOptions, processResults);
    }

    return () => {
      setNearbyPlaces([]);
    };
  }, [coordinates, keyword, isLoaded]);

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    const location = data.get("location") as string;
    const keyword = data.get("keyword") as string;

    setKeyword(keyword);
    setCoordinates(coordinatesLookup[location]);
  }

  return (
    <div className="container">
      <NearbySearchForm onSubmit={handleSubmit} />
      <Results nearbyPlaces={nearbyPlaces} />
    </div>
  );
}

const coordinatesLookup: { [key: string]: Coordinates } = {
  "Snowmass, CO": { lat: 39.213, lng: -106.9378 },
  "Malibu, CA": { lat: 34.0259, lng: -118.7798 },
  "Catskill, NY": { lat: 42.2146, lng: -73.9595 },
  "Grand Teton National Park, WY": { lat: 43.7904, lng: -110.6818 },
  "Columbia River Gorge, OR": { lat: 45.618, lng: -121.165 },
};

// Create a random ID for each place
function generateRandomId() {
  return Math.random().toString(36).substring(2, 15);
}
