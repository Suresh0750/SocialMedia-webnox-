
import { Response } from 'express';
import { CookieService } from '@/infrastructure/services/CookieService'

export class LogoutUserUseCase {
  async execute(response: Response): Promise<void> {
    
    await CookieService.clearCookies(response);
  }
}
