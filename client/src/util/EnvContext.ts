import { createContext } from "react";

const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://remixify.fly.dev"
    : "http://localhost:8080";

export const EnvContext = createContext<string>(SERVER_URL);
