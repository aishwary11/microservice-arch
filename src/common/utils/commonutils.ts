import axios from 'axios';
import { cacheURL } from '../../types/types';
import NodeCache from 'node-cache';
import speakeasy from 'speakeasy';
const cache = new NodeCache({ stdTTL: 10 });
let cacheUrl: cacheURL = {};

export const convertDate = (strDate: string) => {
  const [date, month, year] = strDate.split('-');
  return `${year}-${month}-${date}`;
};
export const cacheFetchData = async (url: string) => {
  // return cacheData(url);
  if (cacheUrl[url]) return cacheUrl[url];
  const { data } = await axios.get(url);
  cacheUrl[url] = data;
  return data;
};

export const cacheData = async (key: string) => {
  const cachedData = await cache.get(key);
  if (cachedData) return cachedData;
  const { data } = await axios.get(key);
  cache.set(key, data);
  return data;
};

export const totpSecret = speakeasy.generateSecret({ length: 20 }).base32;
// export const totpGenerator = () => {
//   const secret = speakeasy.generateSecret({ length: 20 }).base32;
//   const token = speakeasy.totp({
//     secret,
//     encoding: 'base32'
//   });
//   return { token, secret };
// };
