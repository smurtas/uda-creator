import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async signInWithGoogle() {
    return this.supabaseService.client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  }

  async signOut() {
    return this.supabaseService.client.auth.signOut();
  }

  async getSession() {
    return this.supabaseService.client.auth.getSession();
  }

  async ensureProfile() {
    const { data } = await this.supabaseService.client.auth.getUser();
    const user = data.user;
    if (!user) return;

    await this.supabaseService.client
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email,
      full_name:
        user.user_metadata?.['full_name'] ||
        user.user_metadata?.['name'] ||
        ''      });
        }
}
