import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If credentials are missing, return a dummy client that doesn't throw on common methods
  if (!supabaseUrl || !supabaseKey) {
    const missing = !supabaseUrl && !supabaseKey ? "URL and Key" : !supabaseUrl ? "URL" : "Key";
    console.warn(`Supabase ${missing} missing. Returning dummy client.`);
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ 
          data: { user: null }, 
          error: new Error(`Supabase ${missing} not configured in Vercel settings`) 
        }),
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
      from: () => ({
        select: () => ({ order: () => ({ limit: () => ({ single: async () => ({ data: null, error: new Error("Supabase not configured") }) }), data: [], error: null }), data: [], error: null }),
        insert: async () => ({ data: null, error: new Error("Supabase not configured") }),
        update: () => ({ eq: async () => ({ data: null, error: new Error("Supabase not configured") }) }),
        delete: () => ({ eq: async () => ({ data: null, error: new Error("Supabase not configured") }) }),
      })
    } as any;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
