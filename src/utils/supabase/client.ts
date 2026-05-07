import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If credentials are missing, return a dummy client that doesn't throw on common methods
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase credentials missing. Returning dummy client.");
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ data: { user: null }, error: new Error("Supabase not configured") }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      storage: {
        from: () => ({
          list: async () => ({ data: [], error: null }),
          upload: async () => ({ data: null, error: new Error("Supabase not configured") }),
          remove: async () => ({ data: [], error: null }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    } as any;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
