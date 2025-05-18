// lib/geocoding.js
import axios from 'axios';

const GEOCODING_API_KEY = process.env.NEXT_PUBLIC_GEOCODING_API_KEY;
const GEOCODING_BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';

/**
 * Convert address to latitude and longitude
 * @param {string} address
 * @returns {Promise<{lat: number, lng: number} | null>}
 */
export async function geocodeAddress(address) {
  try {
    const res = await axios.get(GEOCODING_BASE_URL, {
      params: {
        key: GEOCODING_API_KEY,
        q: address,
        limit: 1
      }
    });

    if (res.data.results.length > 0) {
      const { lat, lng } = res.data.results[0].geometry;
      return { lat, lng };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Geocoding failed:', error.message);
    return null;
  }
}

/**
 * Convert latitude and longitude to an address
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise<string | null>}
 */
export async function reverseGeocode(lat, lng) {
  try {
    const res = await axios.get(GEOCODING_BASE_URL, {
      params: {
        key: GEOCODING_API_KEY,
        q: `${lat},${lng}`,
        limit: 1
      }
    });

    if (res.data.results.length > 0) {
      return res.data.results[0].formatted;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Reverse geocoding failed:', error.message);
    return null;
  }
}
