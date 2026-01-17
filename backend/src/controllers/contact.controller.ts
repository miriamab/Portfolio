import { Request, Response } from 'express';
import Contact from '../models/Contact';

export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    // Validierung: Alle Felder müssen vorhanden sein
    if (!name || !email || !message) {
      res.status(400).json({
        error: 'Alle Felder (Name, E-Mail, Nachricht) sind erforderlich'
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

    if (name.trim().length > 100) {
      res.status(400).json({
        error: 'Name darf maximal 100 Zeichen lang sein'
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

    // Validierung: Nachricht-Länge
    if (message.trim().length < 10) {
      res.status(400).json({
        error: 'Nachricht muss mindestens 10 Zeichen lang sein'
      });
      return;
    }

    if (message.trim().length > 2000) {
      res.status(400).json({
        error: 'Nachricht darf maximal 2000 Zeichen lang sein'
      });
      return;
    }

    // Kontakt in Datenbank speichern
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Kontaktanfrage erfolgreich gespeichert',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt
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

    console.error('Fehler beim Speichern der Kontaktanfrage:', error);
    res.status(500).json({
      error: 'Serverfehler beim Speichern der Kontaktanfrage'
    });
  }
};

export const getAllContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Fehler beim Abrufen der Kontakte:', error);
    res.status(500).json({
      error: 'Serverfehler beim Abrufen der Kontakte'
    });
  }
};

export const getContactById = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      res.status(404).json({
        error: 'Kontakt nicht gefunden'
      });
      return;
    }

    res.json(contact);
  } catch (error) {
    console.error('Fehler beim Abrufen des Kontakts:', error);
    res.status(500).json({
      error: 'Serverfehler beim Abrufen des Kontakts'
    });
  }
};

export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      res.status(404).json({
        error: 'Kontakt nicht gefunden'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Kontakt erfolgreich gelöscht'
    });
  } catch (error) {
    console.error('Fehler beim Löschen des Kontakts:', error);
    res.status(500).json({
      error: 'Serverfehler beim Löschen des Kontakts'
    });
  }
};
