import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  async chatGPT(prompt: string): Promise<string> {
    try {
      const apiKey = this.configService.get<string>('OPENAI_API_KEY');

      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          prompt,
          max_tokens: 50,
          n: 1,
          stop: null,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );

      return response.data.choices[0].text.trim();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async chatGPTTurbo(prompt: string): Promise<string> {
    try {
      const apiKey = this.configService.get<string>('OPENAI_API_KEY');
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
