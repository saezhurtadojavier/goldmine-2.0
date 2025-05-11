// Configuración de la aplicación basada en variables de entorno

interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    analytics: boolean;
    newUI: boolean;
  };
  performance: {
    lazyLoadImages: boolean;
    lazyLoadOffset: number;
    cacheTtl: number;
  };
  version: string;
}

// Obtener configuración de las variables de entorno
export const config: AppConfig = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'https://api.tudominio.com',
    timeout: 10000,
  },
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    newUI: import.meta.env.VITE_FEATURE_FLAG_NEW_UI === 'true',
  },
  performance: {
    lazyLoadImages: import.meta.env.VITE_LAZY_LOAD_IMAGES !== 'false',
    lazyLoadOffset: parseInt(import.meta.env.VITE_LAZY_LOAD_OFFSET || '200', 10),
    cacheTtl: parseInt(import.meta.env.VITE_CACHE_TTL || '3600', 10),
  },
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
};

// Función para verificar si estamos en producción
export const isProduction = import.meta.env.PROD;

// Función para obtener la URL completa de la API
export const getApiUrl = (path: string): string => {
  const baseUrl = config.api.baseUrl.replace(/\/+$/, ''); // Eliminar barras al final
  const normalizedPath = path.replace(/^\/+/, ''); // Eliminar barras al inicio
  return `${baseUrl}/${normalizedPath}`;
};
