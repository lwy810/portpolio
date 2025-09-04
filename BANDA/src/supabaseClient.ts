// import { createClient } from './supabaseClient';

// // 여러분의 환경 변수를 설정합니다.
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// // 데이터베이스 테이블 스키마에 대한 타입을 여기에 정의합니다.
// // 예시:
// // interface Database {
// //   public: {
// //     Tables: {
// //       employee: {
// //         Row: {
// //           id: number;
// //           employee_email: string;
// //           employee_pwd: string;
// //           // ... 다른 컬럼들
// //         };
// //         Insert: {};
// //         Update: {};
// //       };
// //     };
// //   };
// // }

// // 'Database' 제네릭 타입을 createClient에 전달합니다.
// // 아직 스키마 타입을 정의하지 않았다면, 'any'로 임시로 설정할 수 있습니다.
// export const supabase = createClient<any>(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 'Database' 제네릭 타입을 정의합니다.
// 예시:
// interface Database { ... }

export const supabase = createClient<any>(supabaseUrl, supabaseAnonKey);






