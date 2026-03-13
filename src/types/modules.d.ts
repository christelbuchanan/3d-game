declare module 'react' {
  export type ReactNode = unknown;
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
  export function useReducer<S, A>(
    reducer: (state: S, action: A) => S,
    initialState: S
  ): [S, (action: A) => void];
  export function useRef<T>(initialValue: T): { current: T };
  export function useState<T>(initialValue: T): [T, (value: T) => void];
}

declare namespace React {
  type ReactNode = unknown;
  interface PointerEvent<T = Element> {
    clientX: number;
    clientY: number;
    button: number;
    shiftKey: boolean;
    currentTarget: T & { getBoundingClientRect(): DOMRect };
    preventDefault(): void;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'next' {
  export interface Metadata {
    title?: string;
    description?: string;
  }
}

declare module 'next/image-types/global';
