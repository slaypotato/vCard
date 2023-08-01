import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './cloudTools/auth/auth.guard';

@Controller()
@ApiTags('HealthCheck')
@ApiResponse({ status: 200, description: 'The app is running!!' })
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @Get('/healthcheck')
  @UseGuards(AuthGuard)
  getHealth(): string {
    const port = this.config.get<string>('PORT');
    const version = process.env.npm_package_version;
    return `The app is running!! \nPort: ${port}\nVersion: ${version}`;
  }
}
