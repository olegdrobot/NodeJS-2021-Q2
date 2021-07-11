import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async getToken(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    const token = await this.authService.getToken(
      createAuthDto.login,
      createAuthDto.password,
    );
    //console.log('----TOKEN ', token);
    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      res.send({ token: token });
    }
  }
}
