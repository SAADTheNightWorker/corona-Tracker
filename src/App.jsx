import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import { prettyPrintState, sortData } from "./util/util";
import LineGraph from "./components/LineGraph";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  //map states
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapzoom, setMapzoom] = useState(3);
  const [MapContaineries, setMapContaineries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/countries"
        );
        const data = await response.json();

        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));

        setCountries(countries);

        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapContaineries(data);

        console.log("From useEffect[]", countries);
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    };
    getCountries();
  }, []);

  const handleCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapzoom(4);
      });
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  return (
    <div className="flex justify-evenly p-5 max-xl:flex-col">
      <div className="app_left flex-[0.9]">
        <div className="app_header flex justify-between items-center mb-5">
          <h1 className="text-gray-400 font-semibold hover:text-gray-600 hover:text-4xl transition-all duration-200 text-3xl">COVID 19 TRACKER</h1>

          <FormControl>
            <Select className="border border-gray-200 shadow-md outline-none"
              variant="outlined"
              value={country}
              onChange={handleCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* {Header} */}
        <div className="flex justify-between">
          <InfoBox
            className="cases"
            onClick={(e) => setCasesType("cases")}
            active={casesType === "cases"}
            title="Coronavirus Cases"
            cases={prettyPrintState(countryInfo.todayCases)}
            total={prettyPrintState(countryInfo.cases)}
          />
          <InfoBox
            className="recover"
            onClick={(e) => setCasesType("recovered")}
            active={casesType === "recovered"}
            title="Recovery"
            cases={prettyPrintState(countryInfo.todayRecovered)}
            total={prettyPrintState(countryInfo.recovered)}
          />
          <InfoBox
            className="deaths"
            onClick={(e) => setCasesType("deaths")}
            active={casesType === "deaths"}
            title="Death"
            cases={prettyPrintState(countryInfo.todayDeaths)}
            total={prettyPrintState(countryInfo.deaths)}
          />
        </div>

        {/* {Map} */}
        <Map
          casesType={casesType}
          center={mapCenter}
          zoom={mapzoom}
          countries={MapContaineries}
        />
      </div>
      <Card>
        <CardContent>
          <div>
            <h3 className="text-xl font-semibold text-gray-500">Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3 className="font-semibold">Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
