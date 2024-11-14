import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Returns a hello message' })
  @ApiResponse({ status: 200, description: 'Returns a hello world message.' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
