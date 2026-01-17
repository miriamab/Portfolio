/**
 * Author: Miriam Abbas
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Interface für den erweiterten Request mit User
export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

// Middleware zum Schutz von Routen
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Token aus Authorization-Header extrahieren
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Kein Token bereitgestellt. Authentifizierung erforderlich.'
      });
      return;
    }

    const token = authHeader.substring(7); // "Bearer " entfernen

    // JWT Secret aus Umgebungsvariable
    const secret = process.env.JWT_SECRET || 'default-secret-key-change-in-production';

    try {
      // Token verifizieren
      const decoded = jwt.verify(token, secret) as { userId: string };

      // User aus Datenbank abrufen, um zu prüfen, ob er noch existiert
      const user = await User.findById(decoded.userId);

      if (!user) {
        res.status(401).json({
          error: 'Benutzer existiert nicht mehr. Bitte erneut anmelden.'
        });
        return;
      }

      // User-ID zum Request hinzufügen
      (req as AuthRequest).user = {
        userId: decoded.userId
      };

      next();
    } catch (error: any) {
      // Token abgelaufen
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({
          error: 'Token ist abgelaufen. Bitte erneut anmelden.'
        });
        return;
      }

      // Token ungültig
      if (error.name === 'JsonWebTokenError') {
        res.status(401).json({
          error: 'Ungültiges Token. Authentifizierung fehlgeschlagen.'
        });
        return;
      }

      // Sonstige Fehler
      res.status(401).json({
        error: 'Authentifizierung fehlgeschlagen.'
      });
      return;
    }
  } catch (error: any) {
    console.error('Fehler in Auth-Middleware:', error);
    res.status(500).json({
      error: 'Serverfehler bei der Authentifizierung'
    });
  }
};
