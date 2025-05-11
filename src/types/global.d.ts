/// <reference types="vite/client" />

// Para variables de entorno
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly VITE_API_URL: string;
    readonly VITE_ENABLE_ANALYTICS: string;
    readonly VITE_APP_VERSION: string;
    readonly VITE_CACHE_TTL: string;
    readonly VITE_FEATURE_FLAG_NEW_UI: string;
    readonly VITE_LAZY_LOAD_IMAGES: string;
    readonly VITE_LAZY_LOAD_OFFSET: string;
  }
}

// Para archivos de módulos CSS
"use client";

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

// Para archivos de imágenes
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
