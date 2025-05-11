// Utilidades para el manejo de la caché del navegador

const CACHE_PREFIX = 'goldmine_';
const DEFAULT_TTL = 60 * 60 * 1000; // 1 hora en milisegundos

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

/**
 * Almacena datos en la caché del navegador
 * @param key - Clave para identificar el dato
 * @param data - Datos a almacenar
 * @param ttl - Tiempo de vida en milisegundos (opcional, por defecto 1 hora)
 */
export function setCache<T>(key: string, data: T, ttl: number = DEFAULT_TTL): void {
  if (typeof window === 'undefined') return;

  const cacheKey = `${CACHE_PREFIX}${key}`;
  const item: CacheItem<T> = {
    data,
    timestamp: Date.now(),
    ttl,
  };

  try {
    localStorage.setItem(cacheKey, JSON.stringify(item));
  } catch (error) {
    console.error('Error al guardar en caché:', error);
    // Si el almacenamiento local está lleno, limpiamos la caché antigua
    clearExpiredCache();
    // Intentamos de nuevo
    try {
      localStorage.setItem(cacheKey, JSON.stringify(item));
    } catch (e) {
      // Si sigue fallando, no hacemos nada
    }
  }
}

/**
 * Obtiene datos de la caché del navegador
 * @param key - Clave del dato a recuperar
 * @returns Los datos almacenados o null si no existen o han expirado
 */
export function getCache<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  const cacheKey = `${CACHE_PREFIX}${key}`;
  const itemStr = localStorage.getItem(cacheKey);
  
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr) as CacheItem<T>;
    const now = Date.now();
    
    // Verificar si el ítem ha expirado
    if (now > item.timestamp + item.ttl) {
      // Eliminar el ítem expirado
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    return item.data;
  } catch (error) {
    console.error('Error al leer de la caché:', error);
    return null;
  }
}

/**
 * Elimina un ítem específico de la caché
 * @param key - Clave del dato a eliminar
 */
export function removeCache(key: string): void {
  if (typeof window === 'undefined') return;
  
  const cacheKey = `${CACHE_PREFIX}${key}`;
  localStorage.removeItem(cacheKey);
}

/**
 * Limpia todos los ítems de la caché que hayan expirado
 */
export function clearExpiredCache(): void {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  const keysToRemove: string[] = [];

  // Primero identificamos las claves a eliminar
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(CACHE_PREFIX)) {
      try {
        const itemStr = localStorage.getItem(key);
        if (itemStr) {
          const item = JSON.parse(itemStr) as CacheItem<unknown>;
          if (now > item.timestamp + item.ttl) {
            keysToRemove.push(key);
          }
        }
      } catch (error) {
        // Si hay un error al parsear, eliminamos el ítem
        keysToRemove.push(key);
      }
    }
  }

  // Luego eliminamos los ítems expirados
  keysToRemove.forEach(key => localStorage.removeItem(key));
}

/**
 * Limpia toda la caché de la aplicación
 */
export function clearAllCache(): void {
  if (typeof window === 'undefined') return;

  const keysToRemove: string[] = [];

  // Identificamos todas las claves de nuestra aplicación
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(CACHE_PREFIX)) {
      keysToRemove.push(key);
    }
  }

  // Eliminamos todas las claves
  keysToRemove.forEach(key => localStorage.removeItem(key));
}

/**
 * Hook para usar la caché con React
 * @param key - Clave para identificar el dato en caché
 * @param fetchFn - Función para obtener los datos si no están en caché
 * @param options - Opciones adicionales
 * @returns Los datos y funciones para manejar la caché
 */
export function useCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: { ttl?: number; enabled?: boolean } = {}
) {
  const { ttl = DEFAULT_TTL, enabled = true } = options;
  const [data, setData] = React.useState<T | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = React.useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      // Intentar obtener de la caché primero
      const cachedData = getCache<T>(key);
      if (cachedData) {
        setData(cachedData);
        setIsLoading(false);
        return;
      }

      // Si no hay datos en caché, hacer la petición
      const freshData = await fetchFn();
      setData(freshData);
      // Guardar en caché
      setCache(key, freshData, ttl);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setIsLoading(false);
    }
  }, [key, fetchFn, ttl, enabled]);

  // Limpiar la caché para esta clave
  const clear = React.useCallback(() => {
    removeCache(key);
    setData(null);
  }, [key]);

  // Refrescar los datos
  const refresh = React.useCallback(async () => {
    removeCache(key);
    await fetchData();
  }, [key, fetchData]);

  // Cargar los datos al montar el componente
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refresh,
    clear,
  };
}
