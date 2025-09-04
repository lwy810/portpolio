// vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // 프로젝트에서 사용하는 다른 환경 변수가 있다면 여기에 추가하세요.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}