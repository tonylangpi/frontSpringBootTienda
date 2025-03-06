import { SWRConfig } from 'swr';
const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const SWRProvider = ({ children }) => {
  return <SWRConfig value={{fetcher}}>{children}</SWRConfig>
};