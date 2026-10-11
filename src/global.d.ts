interface YTPlayer {
  loadVideoById: (videoId: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (element: HTMLElement, options: any) => YTPlayer;
}

interface Window {
  YT: YTNamespace;
  onYouTubeIframeAPIReady: (() => void) | undefined;
}

interface ImportMetaEnv {
  readonly VITE_BASE44_APP_ID: string;
  readonly VITE_BASE44_FUNCTIONS_VERSION: string;
  readonly VITE_BASE44_APP_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// UI Component type definitions
declare module '@/components/ui/button' {
  import * as React from 'react';
  
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
  }
  
  export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
  export const buttonVariants: any;
}

declare module '@/components/ui/input' {
  import * as React from 'react';
  
  export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
  
  export const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
}

declare module '@/components/ui/label' {
  import * as React from 'react';
  
  export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
  
  export const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;
}

declare module '@/components/ui/input-otp' {
  import * as React from 'react';
  import { OTPInput } from 'input-otp';
  
  export interface InputOTPProps extends React.ComponentPropsWithoutRef<typeof OTPInput> {
    children?: React.ReactNode;
    maxLength: number;
    value: string;
    onChange: (value: string) => void;
    autoFocus?: boolean;
    autoComplete?: string;
  }
  
  export const InputOTP: React.ForwardRefExoticComponent<InputOTPProps & React.RefAttributes<HTMLDivElement>>;
  export const InputOTPGroup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
  
  export interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number;
  }
  
  export const InputOTPSlot: React.ForwardRefExoticComponent<InputOTPSlotProps & React.RefAttributes<HTMLDivElement>>;
  export const InputOTPSeparator: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
}

// AuthLayout type definition
declare module '@/Components/AuthLayout' {
  import * as React from 'react';
  
  export interface AuthLayoutProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    subtitle?: string;
    footer?: React.ReactNode;
    children?: React.ReactNode;
  }
  
  export default function AuthLayout(props: AuthLayoutProps): React.ReactElement;
}

// Toast component types
declare module '@/components/ui/toast' {
  import * as React from 'react';
  
  export const ToastProvider: React.ComponentType<any>;
  export const ToastViewport: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
  export const Toast: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
  export const ToastAction: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
  export const ToastClose: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
  export const ToastTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
  export const ToastDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
}