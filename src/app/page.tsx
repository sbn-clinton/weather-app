"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  CloudFogIcon,
  CloudIcon,
  CloudRainIcon,
  CloudSnowIcon,
  Loader,
  SunIcon,
} from "lucide-react";
import { useState } from "react";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");

  const options = {
    method: "GET",
    url: `https://open-weather13.p.rapidapi.com/city/${search}/EN`,
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
      "x-rapidapi-host": process.env.NEXT_PUBLIC_API_URL,
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.request(options);
      console.log(response.data);
      setCity(response.data.name);
      setTemp(response.data.main.temp);
      setMaxTemp(response.data.main.temp_max);
      setMinTemp(response.data.main.temp_min);
      setDescription(response.data.weather[0].description);
      setHumidity(response.data.main.humidity);
      setWind(response.data.wind.speed);
      setSearch("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className={`py-8 px-6 ${
        description.includes("clear")
          ? "bg-[url('/assets/sun.png')]"
          : description.includes("rain")
          ? "bg-[url('/assets/rain.png')]"
          : description.includes("snow")
          ? "bg-[url('/assets/snow.png')]"
          : description.includes("mist")
          ? "bg-[url('/assets/mist.png')]"
          : description.includes("clouds")
          ? "bg-[url('/assets/cloud.png')]"
          : ""
      } bg-no-repeat bg-cover bg-center min-h-screen content-center `}
    >
      <Card className="flex flex-col items-center justify-center gap-10 md:gap-16  md:max-w-2xl py-4 px-3 md:mx-auto md:px-6 md:py-8 bg-slate-100 bg-opacity-50 backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Weather App
          </h1>
          <p className="text-center text-sm md:text-base text-gray-600">
            This is a weather app built by{" "}
            <span className="text-sky-400 font-extrabold">SBN </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-3/4  md:mx-auto items-center space-x-2"
        >
          <Input
            type="text"
            placeholder="Search city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=""
          />
          <Button type="submit">Search</Button>
        </form>
        {isLoading ? (
          <Loader className="w-8 h-8 animate-spin " />
        ) : (
          <Card className="flex flex-col items-center gap-5 md:gap-10 w-full md:w-3/4 md:mx-auto px-2 md:px-6 py-4 md:py-6  bg-slate-50 bg-opacity-5 backdrop-blur-0">
            <div className="flex items-center justify-center w-full">
              <h1 className="text-lg md:text-2xl font-extrabold text-center  text-gray-900 ">
                {city}
              </h1>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="text-4xl font-bold text-gray-900">{temp}°C</div>
              <div className="text-gray-600">{description}</div>
              {description.includes("rain") && (
                <CloudRainIcon className="text-gray-600 w-8 h-8" />
              )}
              {description.includes("snow") && (
                <CloudSnowIcon className="text-gray-600 w-8 h-8" />
              )}
              {description.includes("clear") && (
                <SunIcon className="text-gray-600 w-8 h-8" />
              )}
              {description.includes("clouds") && (
                <CloudIcon className="text-gray-600 w-8 h-8" />
              )}
              {description.includes("mist") && (
                <CloudFogIcon className="text-gray-600 w-8 h-8" />
              )}
              <div className="flex justify-between w-full gap-5 text-sm md:text-base">
                <div className="text-gray-600">
                  Humidity:{" "}
                  <span className="text-gray-900 font-bold">{humidity}%</span>
                </div>
                <div className="text-gray-600">
                  Wind:{" "}
                  <span className="text-gray-900 font-bold">{wind} km/h</span>
                </div>
              </div>
              <div className="flex justify-between w-full gap-5 text-sm md:text-base">
                <div className="">
                  <span className="text-gray-600">Min Temp:</span>
                  <span className="text-gray-900 font-bold">{minTemp}°C</span>
                </div>
                <div className="">
                  <span className="text-gray-600">Max Temp:</span>
                  <span className="text-gray-900 font-bold">{maxTemp}°C</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default HomePage;
