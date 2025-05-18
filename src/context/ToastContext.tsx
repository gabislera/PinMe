import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

export function ToastProvider({ children }: PropsWithChildren) {
  return (
    <>
      <Toaster richColors position="bottom-center" />
      {children}
    </>
  );
}
