import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
//import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async getToken(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    const token = await this.authService.getToken(createAuthDto.login, createAuthDto.password);
    console.log('----TOKEN ', token);
    if(!token) {
      res.status(401).json({error:'Unauthorized'});}
    else {
      res.send({token: token});
      /*
      return {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' }
          }
        }
      };
      */
      //res.status(200).json({token});
    }
    //return token;
    //return this.authService.getToken(createAuthDto.login, createAuthDto.password);
  }

}
