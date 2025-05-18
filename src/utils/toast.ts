import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  type?: ToastType;
  duration?: number;
}

export function showToast(message: string, options: ToastOptions = {}) {
  const { type = 'info', duration = 4000 } = options;

  switch (type) {
    case 'success':
      toast.success(message, {
        duration,
      });
      break;
    case 'error':
      toast.error(message, {
        duration,
      });
      break;
    case 'warning':
      toast.warning(message, {
        duration,
      });
      break;
    default:
      toast(message, {
        duration,
      });
  }
}
