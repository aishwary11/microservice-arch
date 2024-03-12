import axios from 'axios';
import NodeCache from 'node-cache';
import speakeasy from 'speakeasy';
import { cacheURL } from '../../types/types';
const cache = new NodeCache({ stdTTL: 10 });
let cacheUrl: cacheURL = {};
let cacheUrlMap = new Map();

export const convertDate = (strDate: string) => {
  const [date, month, year] = strDate.split('-');
  return `${year}-${month}-${date}`;
};

/**
 * using object
 */
export const cacheFetchData = async (url: string) => {
  if (cacheUrl[url]) return cacheUrl[url];
  const { data } = await axios.get(url);
  cacheUrl[url] = data;
  return data;
};

/**
 * using map
 */
export const cacheMapData = async (url: string) => {
  const cachedData = cacheUrlMap.get(url);
  if (cachedData) return cachedData;
  const { data } = await axios.get(url);
  cacheUrlMap.set(url, data);
  return data;
};

/**
 * using cache
 */
export const cacheData = async (key: string) => {
  const cachedData = await cache.get(key);
  if (cachedData) return cachedData;
  const { data } = await axios.get(key);
  cache.set(key, data);
  return data;
};

export const totpSecret = speakeasy.generateSecret({ name: 'Aishwary TOTP' });
export const verifyTotp = (secret: string, totp: string) => speakeasy.totp.verify({ secret, encoding: 'base32', token: totp });
