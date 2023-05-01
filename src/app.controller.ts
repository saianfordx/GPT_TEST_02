import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('ask')
  async chatGPT(@Body('prompt') prompt: string): Promise<string> {
    return await this.appService.chatGPT(prompt);
  }
}
