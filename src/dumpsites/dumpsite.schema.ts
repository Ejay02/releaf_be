import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DumpsiteDocument = Dumpsite & Document;

@Schema({ timestamps: true })
export class Dumpsite {
  @Prop({ required: true, type: Number })
  latitude: number;

  @Prop({ required: true, type: Number })
  longitude: number;

  @Prop({ required: true, type: Number })
  capacity: number;

  @Prop({ required: true, type: String, enum: ['active', 'inactive'] })
  status: string;
}

export const DumpsiteSchema = SchemaFactory.createForClass(Dumpsite);
