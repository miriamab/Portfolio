/**
 * Author: Miriam Abbas
 */

import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'E-Mail ist erforderlich'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Bitte gib eine gültige E-Mail-Adresse ein'
      ]
    },
    password: {
      type: String,
      required: [true, 'Passwort ist erforderlich'],
      minlength: [8, 'Passwort muss mindestens 8 Zeichen lang sein'],
      select: false // Passwort wird standardmäßig nicht zurückgegeben
    },
    name: {
      type: String,
      required: [true, 'Name ist erforderlich'],
      trim: true,
      minlength: [2, 'Name muss mindestens 2 Zeichen lang sein'],
      maxlength: [100, 'Name darf maximal 100 Zeichen lang sein']
    }
  },
  {
    timestamps: true
  }
);

// Passwort hashen vor dem Speichern
UserSchema.pre('save', async function(next) {
  // Nur hashen, wenn Passwort geändert wurde
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Methode zum Passwort-Vergleich
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

export default mongoose.model<IUser>('User', UserSchema);
