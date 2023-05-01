import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('ask')
  async chatGPT(@Body('prompt') prompt: string): Promise<string> {
    return await this.appService.chatGPTTurbo(prompt);
  }
}
