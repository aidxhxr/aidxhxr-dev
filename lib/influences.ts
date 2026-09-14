export type Spot = { lat: number; lon: number };

// where i was born. every courier grain on the map ends up here.
export const HOME = { place: "taraz, kazakhstan", lat: 42.9, lon: 71.37 };

// places the essays i read were written from. no names, just the spread.
export const NOTES: Spot[] = [
  { lat: 37.77, lon: -122.42 }, // san francisco
  { lat: 47.61, lon: -122.33 }, // seattle
  { lat: 30.27, lon: -97.74 }, // austin
  { lat: 41.88, lon: -87.63 }, // chicago
  { lat: 42.36, lon: -71.06 }, // boston
  { lat: 40.71, lon: -74.01 }, // new york
  { lat: 43.65, lon: -79.38 }, // toronto
  { lat: 19.43, lon: -99.13 }, // mexico city
  { lat: -23.55, lon: -46.63 }, // são paulo
  { lat: -34.6, lon: -58.38 }, // buenos aires
  { lat: 53.35, lon: -6.26 }, // dublin
  { lat: 51.51, lon: -0.13 }, // london
  { lat: 48.86, lon: 2.35 }, // paris
  { lat: 52.52, lon: 13.4 }, // berlin
  { lat: 47.38, lon: 8.54 }, // zurich
  { lat: 59.33, lon: 18.07 }, // stockholm
  { lat: 37.98, lon: 23.73 }, // athens
  { lat: 41.01, lon: 28.98 }, // istanbul
  { lat: 55.76, lon: 37.62 }, // moscow
  { lat: 32.08, lon: 34.78 }, // tel aviv
  { lat: 30.04, lon: 31.24 }, // cairo
  { lat: 6.52, lon: 3.38 }, // lagos
  { lat: -1.29, lon: 36.82 }, // nairobi
  { lat: -33.92, lon: 18.42 }, // cape town
  { lat: 28.61, lon: 77.21 }, // delhi
  { lat: 12.97, lon: 77.59 }, // bangalore
  { lat: 1.35, lon: 103.82 }, // singapore
  { lat: 39.9, lon: 116.4 }, // beijing
  { lat: 37.57, lon: 126.98 }, // seoul
  { lat: 35.68, lon: 139.69 }, // tokyo
  { lat: -33.87, lon: 151.21 }, // sydney
  { lat: -37.81, lon: 144.96 }, // melbourne
  { lat: -41.29, lon: 174.78 }, // wellington
];
