import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { getApiUrl } from '@/lib/config';

// Tipos genéricos para las respuestas de la API
interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Configuración por defecto para las peticiones
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Función genérica para realizar peticiones HTTP
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = getApiUrl(endpoint);
  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Error en la petición');
  }

  return response.json();
}

// Hook para peticiones GET
export function useApiQuery<T>(
  key: string,
  endpoint: string,
  options?: Omit<UseQueryOptions<ApiResponse<T>, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ApiResponse<T>, Error>(
    [key],
    () => fetchApi<T>(endpoint),
    {
      ...options,
      // Configuración por defecto para las queries
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 15 * 60 * 1000, // 15 minutos
      retry: 1,
    }
  );
}

// Hook para mutaciones (POST, PUT, DELETE, etc.)
type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export function useApiMutation<T, V = void>(
  method: HttpMethod,
  endpoint: string,
  options?: Omit<UseMutationOptions<ApiResponse<T>, Error, V>, 'mutationFn'>
) {
  return useMutation<ApiResponse<T>, Error, V>(
    async (data) => {
      return fetchApi<T>(endpoint, {
        method,
        body: JSON.stringify(data),
      });
    },
    {
      ...options,
      // Configuración por defecto para las mutaciones
      retry: 1,
    }
  );
}

// Hooks específicos para métodos HTTP comunes
export function usePost<T, V = void>(
  endpoint: string,
  options?: Omit<UseMutationOptions<ApiResponse<T>, Error, V>, 'mutationFn'>
) {
  return useApiMutation<T, V>('POST', endpoint, options);
}

export function usePut<T, V = void>(
  endpoint: string,
  options?: Omit<UseMutationOptions<ApiResponse<T>, Error, V>, 'mutationFn'>
) {
  return useApiMutation<T, V>('PUT', endpoint, options);
}

export function useDelete<T>(
  endpoint: string,
  options?: Omit<UseMutationOptions<ApiResponse<T>, Error, void>, 'mutationFn'>
) {
  return useApiMutation<T, void>('DELETE', endpoint, options);
}
