/**
 * Author: Miriam Abbas
 * 
 * login:
 * email: miriam@test.de
 * passwort: password123
 */

import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';

// JWT Token generieren
const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || 'default-secret-key-change-in-production';
  const expiresIn = process.env.JWT_EXPIRES_IN || '15m';
  
  // @ts-ignore - TypeScript hat Probleme mit jwt.sign expiresIn Type
  return jwt.sign({ userId }, secret, { expiresIn });
};

// Sign Up - Neuen User registrieren
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // Validierung: Alle Felder müssen vorhanden sein
    if (!email || !password || !name) {
      res.status(400).json({
        error: 'Alle Felder (Name, E-Mail, Passwort) sind erforderlich'
      });
      return;
    }

    // Validierung: E-Mail-Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        error: 'Bitte gib eine gültige E-Mail-Adresse ein'
      });
      return;
    }

    // Validierung: Passwort-Länge
    if (password.length < 8) {
      res.status(400).json({
        error: 'Passwort muss mindestens 8 Zeichen lang sein'
      });
      return;
    }

    // Validierung: Name-Länge
    if (name.trim().length < 2) {
      res.status(400).json({
        error: 'Name muss mindestens 2 Zeichen lang sein'
      });
      return;
    }

    // Prüfen, ob User bereits existiert
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409).json({
        error: 'Ein Benutzer mit dieser E-Mail-Adresse existiert bereits'
      });
      return;
    }

    // Neuen User erstellen
    const user = new User({
      email: email.toLowerCase(),
      password,
      name: name.trim()
    });

    await user.save();

    // Token generieren
    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      message: 'Registrierung erfolgreich',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error: any) {
    // Mongoose-Validierungsfehler
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({
        error: errors.join(', ')
      });
      return;
    }

    // Duplicate Key Error (E-Mail bereits vergeben)
    if (error.code === 11000) {
      res.status(409).json({
        error: 'Ein Benutzer mit dieser E-Mail-Adresse existiert bereits'
      });
      return;
    }

    console.error('Fehler bei der Registrierung:', error);
    res.status(500).json({
      error: 'Serverfehler bei der Registrierung'
    });
  }
};

// Sign In - User anmelden
export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validierung: Alle Felder müssen vorhanden sein
    if (!email || !password) {
      res.status(400).json({
        error: 'E-Mail und Passwort sind erforderlich'
      });
      return;
    }

    // User finden (mit Passwort, da select: false)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    // User existiert nicht
    if (!user) {
      res.status(401).json({
        error: 'Ungültige Anmeldedaten'
      });
      return;
    }

    // Passwort überprüfen
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({
        error: 'Ungültige Anmeldedaten'
      });
      return;
    }

    // Token generieren
    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      message: 'Anmeldung erfolgreich',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error: any) {
    console.error('Fehler bei der Anmeldung:', error);
    res.status(500).json({
      error: 'Serverfehler bei der Anmeldung'
    });
  }
};

// Verify Token - Token überprüfen
export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    // Token ist bereits durch Middleware validiert
    // req.user wurde durch auth-Middleware gesetzt
    const userId = (req as any).user.userId;

    // User aus Datenbank abrufen
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        error: 'Benutzer nicht gefunden'
      });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error: any) {
    console.error('Fehler bei der Token-Verifizierung:', error);
    res.status(500).json({
      error: 'Serverfehler bei der Verifizierung'
    });
  }
};
