import { NearbyPlace } from "./NearbySearchWidget";

export default function Results({
  nearbyPlaces,
}: {
  nearbyPlaces: NearbyPlace[];
}): JSX.Element {
  return nearbyPlaces.length > 0 ? (
    <div>
      {nearbyPlaces.map((place: NearbyPlace) => {
        return (
          <div className="result" key={place.id}>
            {place.name}
            <span className="rating">{place.rating}</span>
            <div className="address">{place.address}</div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="no-results">No results</div>
  );
}
