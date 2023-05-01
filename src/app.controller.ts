import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get('env-test')
  getEnvTest(): string {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    return apiKey;
  }

  @Get('test')
  getestt(): string {
    return 'Server Works';
  }

  @Post('ask')
  async chatGPT(@Body('prompt') prompt: string): Promise<string> {
    return await this.appService.chatGPT(prompt);
  }
}
