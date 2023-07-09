import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('HealthCheck')
@ApiResponse({ status: 200, description: 'The app is running!!' })
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @Get('/healthcheck')
  getHealth(): string {
    const port = this.config.get<string>('PORT');
    const version = process.env.npm_package_version;
    return `The app is running!! \nPort: ${port}\nVersion: ${version}`;
  }
}
