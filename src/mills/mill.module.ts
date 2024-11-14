import { Module } from '@nestjs/common';

import { MillService } from './mill.service';
import { MillController } from './mill.controller';
import { Mill, MillSchema } from './mill.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mill.name, schema: MillSchema }]),
  ],
  providers: [MillService],
  controllers: [MillController],
})
export class MillModule {}
