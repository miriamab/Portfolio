/**
 * Author: Miriam Abbas
 */

import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'Name ist erforderlich'],
      trim: true,
      minlength: [2, 'Name muss mindestens 2 Zeichen lang sein'],
      maxlength: [100, 'Name darf maximal 100 Zeichen lang sein']
    },
    email: {
      type: String,
      required: [true, 'E-Mail ist erforderlich'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Bitte gib eine gültige E-Mail-Adresse ein'
      ]
    },
    message: {
      type: String,
      required: [true, 'Nachricht ist erforderlich'],
      trim: true,
      minlength: [10, 'Nachricht muss mindestens 10 Zeichen lang sein'],
      maxlength: [2000, 'Nachricht darf maximal 2000 Zeichen lang sein']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IContact>('Contact', ContactSchema);
