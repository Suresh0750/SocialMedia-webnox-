// src/infrastructure/services/CookieService.ts
import { Response } from 'express';
import { COOKIES } from '@/shared/constants';
import { NODE_ENV } from '@/config/env';

export class CookieService {
  static clearCookies(response: Response): void {
    // Clear the cookies
      response.clearCookie(COOKIES.ACCESS_TOKEN, {
        httpOnly: false, 
        secure: NODE_ENV === 'production', 
        sameSite: 'strict', 
        path: '/',
      });

      response.clearCookie(COOKIES.REFRESH_TOKEN, {
        httpOnly: true,
        secure: NODE_ENV === 'production', 
        sameSite: 'strict', 
        path: '/', 
      });

  }
}
