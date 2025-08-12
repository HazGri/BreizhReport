import React from "react";

const DayForecast = ({ day, weather, wind, spot, tide }) => {
  
  const optimalDirection = spot.optimalDirection;
  const optimalWind = spot.wind;
  const optimalTide = spot.tide;

  const parseTideString = (tideString) => {
    const parts = tideString.split(" ");
    const hours = parts.slice(2, 6);
    const heights = parts.slice(6, 10);
    const coefs = parts.slice(10, 12);

    //fonction pour parser l'objet tides

    const tides = hours.map((hour, index) => ({
      time: hour,
      height: heights[index],
      type: index % 2 === 0 ? "PM" : "BM",
    }));

    return {
      tides,
      coefs,
    };
  };

  const { tides, coefs } = parseTideString(tide);

  return (
    <>
      <div className="p-3 rounded-box overflow-x-auto border border-base-content/5 bg-base-100 select-none">
        <h1 className="text-center m-3 font-noto">{day}</h1>
        <table className="table table-fixed text-center min-w-[700px]">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>06h00</th>
              <th>09h00</th>
              <th>12h00</th>
              <th>15h00</th>
              <th>18h00</th>
              <th>21h00</th>
              <th className="text-green-400 text-lg font-noto">Idéales</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="flex justify-center items-center h-35">
                <img
                  src="/assets/wave.svg"
                  alt="image d'une vague"
                  className="h-9"
                />
              </th>

              <td>
                <div className="flex justify-center items-center">
                  <img
                    src="/assets/arrow.svg"
                    alt="direction"
                    style={{
                      transform: `rotate(${
                        weather[6]?.swell_wave_direction + 180
                      }deg)`,
                      transition: "transform 0.2s",
                      width: 30,
                      height: 30,
                    }}
                  />
                </div>
                <p>{weather[6]?.swell_wave_period} s</p>
                <p>{weather[6]?.swell_wave_height} m</p>
              </td>
              <td>
                <div className="flex justify-center items-center">
                  <img
                    src="/assets/arrow.svg"
                    alt="direction"
                    style={{
                      transform: `rotate(${
                        weather[9]?.swell_wave_direction + 180
                      }deg)`,
                      transition: "transform 0.2s",
                      width: 30,
                      height: 30,
                    }}
                  />
                </div>
                <p>{weather[9]?.swell_wave_period} s</p>
                <p>{weather[9]?.swell_wave_height} m</p>
              </td>
              <td>
                <div className="flex justify-center items-center">
                  <img
                    src="/assets/arrow.svg"
                    alt="direction"
                    style={{
                      transform: `rotate(${
                        weather[12]?.swell_wave_direction + 180
                      }deg)`,
                      transition: "transform 0.2s",
                      width: 30,
                      height: 30,
                    }}
                  />
                </div>
                <p>{weather[12]?.swell_wave_period} s</p>
                <p>{weather[12]?.swell_wave_height} m</p>
              </td>
              <td>
                <div className="flex justify-center items-center">
                  <img
                    src="/assets/arrow.svg"
                    alt="direction"
                    style={{
                      transform: `rotate(${
                        weather[15]?.swell_wave_direction + 180
                      }deg)`,
                      transition: "transform 0.2s",
                      width: 30,
                      height: 30,
                    }}
                  />
                </div>
                <p>{weather[15]?.swell_wave_period} s</p>
                <p>{weather[15]?.swell_wave_height} m</p>
              </td>
              <td>
                <div className="flex justify-center items-center">
                  <img
                    src="/assets/arrow.svg"
                    alt="direction"
                    style={{
                      transform: `rotate(${
                        weather[18]?.swell_wave_direction + 180
                      }deg)`,
                      transition: "transform 0.2s",
                      width: 30,
                      height: 30,
                    }}
                  />
                </div>
                <p>{weather[18]?.swell_wave_period} s</p>
                <p>{weather[18]?.swell_wave_height} m</p>
              </td>
              <td>
                <div className="flex justify-center items-center">
                  <img
                    src="/assets/arrow.svg"
                    alt="direction"
                    style={{
                      transform: `rotate(${
                        weather[21]?.swell_wave_direction + 180
                      }deg)`,
                      transition: "transform 0.2s",
                      width: 30,
                      height: 30,
                    }}
                  />
                </div>
                <p>{weather[21]?.swell_wave_period} s</p>
                <p>{weather[21]?.swell_wave_height} m</p>
              </td>
              <td>
                {optimalDirection.map((element, index) => {
                  return <p key={index}>{element}</p>;
                })}
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th className="flex justify-center items-center h-25">
                <img src="/assets/wind.svg" alt="" className="h-9" />
              </th>
              <td>
                <p>{wind[6]?.wind_speed_10m} km/h</p>
                <div className="flex justify-center items-center">
                  <img
                    src="/assets/arrow.svg"
                    alt="direction"
                    style={{
                      transform: `rotate(${
                        wind[6]?.wind_direction_10m + 180
                      }deg)`,
                      transition: "transform 0.2s",
                      width: 30,
                      height: 30,
                    }}
                  />
                </div>
              </td>
              <td>
                <p>{wind[9]?.wind_speed_10m} km/h</p>
                <div className="flex justify-center items-center">
                  <img
                    src="/assets/arrow.svg"
                    alt="direction"
                    style={{
                      transform: `rotate(${
                        wind[9]?.wind_direction_10m + 180
                      }deg)`,
                      transition: "transform 0.2s",
                      width: 30,
                      height: 30,
                    }}
                  />
                </div>
              </td>
              <td>
                <p>{wind[12]?.wind_speed_10m} km/h</p>
                <div className="flex justify-center items-center">
                  <img
                    src="/assets/arrow.svg"
                    alt="direction"
                    style={{
                      transform: `rotate(${
                        wind[12]?.wind_direction_10m + 180
                      }deg)`,
                      transition: "transform 0.2s",
                      width: 30,
                      height: 30,
                    }}
                  />
                </div>
              </td>
              <td>
                <p>{wind[15]?.wind_speed_10m} km/h</p>
                <div className="flex justify-center items-center">
                  <img
                    src="/assets/arrow.svg"
                    alt="direction"
                    style={{
                      transform: `rotate(${
                        wind[15]?.wind_direction_10m + 180
                      }deg)`,
                      transition: "transform 0.2s",
                      width: 30,
                      height: 30,
                    }}
                  />
                </div>
              </td>
              <td>
                <p>{wind[18]?.wind_speed_10m} km/h</p>
                <div className="flex justify-center items-center">
                  <img
                    src="/assets/arrow.svg"
                    alt="direction"
                    style={{
                      transform: `rotate(${
                        wind[18]?.wind_direction_10m + 180
                      }deg)`,
                      transition: "transform 0.2s",
                      width: 30,
                      height: 30,
                    }}
                  />
                </div>
              </td>
              <td>
                <p>{wind[21]?.wind_speed_10m} km/h</p>
                <div className="flex justify-center items-center">
                  <img
                    src="/assets/arrow.svg"
                    alt="direction"
                    style={{
                      transform: `rotate(${
                        wind[21]?.wind_direction_10m + 180
                      }deg)`,
                      transition: "transform 0.2s",
                      width: 30,
                      height: 30,
                    }}
                  />
                </div>
              </td>
              <td>
                {optimalWind.map((element, index) => {
                  return <p key={index}>{element}</p>;
                })}
              </td>
            </tr>
            <tr>
              <th className="flex justify-center items-center h-25">
                <img src="/assets/weather.svg" alt="" className="h-9" />
              </th>
              <td>
                <p>{wind[6]?.apparent_temperature} °C</p>
                <p>{wind[6]?.rain} mm</p>
              </td>
              <td>
                <p>{wind[9]?.apparent_temperature} °C</p>
                <p>{wind[9]?.rain} mm</p>
              </td>
              <td>
                <p>{wind[12]?.apparent_temperature} °C</p>
                <p>{wind[12]?.rain} mm</p>
              </td>
              <td>
                <p>{wind[15]?.apparent_temperature} °C</p>
                <p>{wind[15]?.rain} mm</p>
              </td>
              <td>
                <p>{wind[18]?.apparent_temperature} °C</p>
                <p>{wind[18]?.rain} mm</p>
              </td>
              <td>
                <p>{wind[21]?.apparent_temperature} °C</p>
                <p>{wind[21]?.rain} mm</p>
              </td>
            </tr>
            <tr>
              <th></th>
              <td className="font-bold font-mono">Marées</td>
              {tides.map((element, index) => {
                return (
                  <td key={index}>
                    <div>
                      <p>{element.time}</p>
                      <p>{element.height}</p>
                    </div>
                  </td>
                );
              })}
              <td>
                {coefs.map((element, index) => {
                  return <p key={index}>{element}</p>;
                })}
              </td>
              <td>
                {optimalTide.map((element, index) => {
                  return <p key={index}>{element}</p>;
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DayForecast;