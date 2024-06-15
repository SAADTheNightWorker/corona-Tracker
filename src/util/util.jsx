import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 100,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 200,
  },
};

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => b.cases - a.cases);
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") =>
  
  data.map((country) => (
    <Circle
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
        fillOpacity: 0.4,
      }}
      radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
    >
      <Popup>
        <div className="max-w-xs">
          <div
            className="h-20 w-20 bg-cover bg-center bg-no-repeat rounded-full"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <h2 className="text-xl font-bold">{country.country}</h2>
          <p>Cases: {numeral(country.cases).format("0,0")}</p>
          <p>Recovered: {numeral(country.recovered).format("0,0")}</p>
          <p>Deaths: {numeral(country.deaths).format("0,0")}</p>
        </div>
      </Popup>
    </Circle>
  ));

export const prettyPrintState = (stat) => {
  return stat ? `+${numeral(stat).format("0.0a")}` : "no Cases";
};


