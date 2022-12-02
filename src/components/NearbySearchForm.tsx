export default function NearbySearchForm({
  onSubmit,
}: {
  onSubmit: (event: React.FormEvent) => void;
}): JSX.Element {
  return (
    <div>
      <form onSubmit={onSubmit} className="nearby-search-form">
        <fieldset>
          <legend>Select a Location</legend>
          <div className="columns">
            <div className="column">
              <label>
                <input
                  type="radio"
                  id="location1"
                  name="location"
                  value="Snowmass, CO"
                />
                Snowmass, CO
              </label>

              <label>
                <input
                  type="radio"
                  id="location2"
                  name="location"
                  value="Malibu, CA"
                />
                Malibu, CA
              </label>

              <label>
                <input
                  type="radio"
                  id="location3"
                  name="location"
                  value="Catskill, NY"
                />
                Catskill, NY
              </label>
            </div>

            <div className="column">
              <label>
                <input
                  type="radio"
                  id="location4"
                  name="location"
                  value="Grand Teton National Park, WY"
                />
                Grand Teton National Park, WY
              </label>

              <label>
                <input
                  type="radio"
                  id="location5"
                  name="location"
                  value="Columbia River Gorge, OR"
                />
                Columbia River Gorge, OR
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="search">
          <legend>Search</legend>
          <input
            type="text"
            name="keyword"
            className="search-input"
            id="searchInput"
            placeholder="Enter a keyword"
          />
          <input type="submit" value="Search" />
        </fieldset>
      </form>
    </div>
  );
}
