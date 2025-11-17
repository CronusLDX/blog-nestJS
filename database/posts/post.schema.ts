/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({ required: true })
  authorId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
