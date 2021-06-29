import { createContext} from 'react';

const CLIENT_HOME_PAGE_URL =
  process.env.NODE_ENV === "production"
    ? "https://still-peak-57686.herokuapp.com"
    : "http://localhost:3001";

export const EnvContext = createContext<string>(CLIENT_HOME_PAGE_URL);