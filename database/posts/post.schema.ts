/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type PostDocument = Post & Document;

@Schema({
  timestamps: true,

  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
  toObject: {
    virtuals: true,
  },
})
export class Post {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  excerpt: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  coverImageUrl: string;

  @Prop({ default: false })
  published: boolean;

  @Prop({ required: true, index: true }) // buscar pelo Id precisa de index para obter a posição
  authorId: string;

  @Prop({ type: Date, default: Date.now })
  postedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
