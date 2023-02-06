import { Controller, Get } from '@nestjs/common';
import DB from 'utils/DB/DB';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
