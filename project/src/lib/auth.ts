import { supabase } from './supabase';

export const login = async (email: string, password: string) => {
  try {
    // First sign in with Supabase auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'Ltevilboy@admin.com',
      password: 'Liam123'
    });

    if (authError) {
      console.error('Auth error:', authError);
      return { success: false, error: 'Invalid credentials' };
    }

    // Then verify admin status
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('is_admin')
      .eq('email', 'Ltevilboy@admin.com')
      .maybeSingle();

    if (adminError) {
      console.error('Admin check error:', adminError);
      await supabase.auth.signOut(); // Sign out if admin check fails
      return { success: false, error: 'Unauthorized access' };
    }

    if (!adminData?.is_admin) {
      await supabase.auth.signOut(); // Sign out if not admin
      return { success: false, error: 'Unauthorized access' };
    }

    return { success: true, data: authData };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const isAuthenticated = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return false;
    }

    // Verify admin status
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('is_admin')
      .eq('email', 'Ltevilboy@admin.com')
      .maybeSingle();

    if (adminError || !adminData?.is_admin) {
      await supabase.auth.signOut(); // Sign out if admin check fails
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
};