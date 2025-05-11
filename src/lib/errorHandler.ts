// Manejador global de errores

interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  context?: Record<string, unknown>;
  timestamp: number;
  userAgent?: string;
  url?: string;
}

/**
 * Clase personalizada para errores de la aplicación
 */
export class AppError extends Error {
  statusCode: number;
  context?: Record<string, unknown>;
  isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: Record<string, unknown>,
    stack: string = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Registra un error en la consola y/o lo envía a un servicio de monitoreo
 * @param error - Error a manejar
 * @param errorInfo - Información adicional del error
 */
export function logError(
  error: unknown,
  errorInfo?: Partial<ErrorInfo>
): void {
  const errorData: ErrorInfo = {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now(),
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    ...errorInfo,
  };

  // En desarrollo, mostramos el error en la consola
  if (process.env.NODE_ENV === 'development') {
    console.error('Error capturado:', errorData);
  }

  // En producción, podríamos enviar el error a un servicio como Sentry, LogRocket, etc.
  if (process.env.NODE_ENV === 'production') {
    // Ejemplo: enviar a un endpoint de tu backend
    // sendErrorToServer(errorData).catch(console.error);
  }
}

/**
 * Muestra una notificación de error al usuario
 * @param error - Error o mensaje de error
 * @param options - Opciones adicionales
 */
export function showErrorNotification(
  error: unknown,
  options: {
    title?: string;
    duration?: number;
    position?: 'top' | 'bottom';
  } = {}
): void {
  const { title = 'Error', duration = 5000, position = 'top' } = options;
  const message = error instanceof Error ? error.message : String(error);

  // Aquí podrías integrar con tu sistema de notificaciones
  // Por ejemplo, usando react-hot-toast, sonner, etc.
  console.error(`[${title}]: ${message}`);
  
  // Ejemplo con la API de notificaciones del navegador
  if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    new Notification(title, { body: message });
  }
}

/**
 * Maneja errores en promesas no capturadas
 */
export function setupUnhandledRejectionHandler(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason, {
      message: 'Unhandled Promise Rejection',
    });
    // Prevenir el error por defecto del navegador
    event.preventDefault();
  });
}

/**
 * Maneja errores no capturados en React
 */
export function setupGlobalErrorHandler(): void {
  if (typeof window === 'undefined') return;

  const originalErrorHandler = window.onerror;

  window.onerror = function (message, source, lineno, colno, error) {
    logError(error || new Error(String(message)), {
      message: 'Uncaught Error',
      context: {
        source,
        lineno,
        colno,
      },
    });

    // Llamar al manejador de errores original si existe
    if (originalErrorHandler) {
      return originalErrorHandler.apply(this, [message, source, lineno, colno, error]);
    }

    // Prevenir el error por defecto del navegador
    return true;
  };
}

/**
 * Inicializa los manejadores de errores globales
 */
export function initializeErrorHandling(): void {
  if (typeof window === 'undefined') return;
  
  setupUnhandledRejectionHandler();
  setupGlobalErrorHandler();
}

/**
 * Hook para manejar errores en componentes de React
 */
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: unknown) => {
    const normalizedError = error instanceof Error ? error : new Error(String(error));
    setError(normalizedError);
    logError(normalizedError);
  }, []);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  // Efecto para limpiar el error cuando el componente se desmonte
  React.useEffect(() => {
    return () => clearError();
  }, [clearError]);

  return {
    error,
    handleError,
    clearError,
    hasError: error !== null,
  };
}
