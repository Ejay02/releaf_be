import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MillDocument = Mill & Document;

@Schema({ timestamps: true })
export class Mill {
  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  quantitySold: number; // P1 sold in tons

  @Prop({ required: true })
  averagePrice: number; // price per ton

  @Prop({ required: true })
  transactionCount: number;

  @Prop({ required: true })
  lastTransactionDate: Date;
}

export const MillSchema = SchemaFactory.createForClass(Mill);
