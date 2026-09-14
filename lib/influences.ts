export type Place = {
  name: string;
  place: string;
  lat: number;
  lon: number;
  note: string;
  url?: string;
};

// where i was born. every courier grain on the map ends up here.
export const HOME: Place = {
  name: "amirkhan aidarkhan",
  place: "taraz, kazakhstan",
  lat: 42.9,
  lon: 71.37,
  note: "0 essays so far. this is where they start.",
};

// writers whose essays changed how i think, pinned where they write from.
export const INFLUENCES: Place[] = [
  {
    name: "tim denning",
    place: "melbourne, australia",
    lat: -37.81,
    lon: 144.96,
    note: "essays on x about writing and getting out of your own way",
    url: "https://x.com/timdenning",
  },
  {
    name: "zvi mowshowitz",
    place: "new york, usa",
    lat: 40.71,
    lon: -74.01,
    note: "weekly ai roundups and decision theory on lesswrong",
    url: "https://www.lesswrong.com/users/zvi",
  },
];

export const fmtCoord = (lat: number, lon: number) =>
  `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? "N" : "S"} ${Math.abs(lon).toFixed(2)}°${lon >= 0 ? "E" : "W"}`;
