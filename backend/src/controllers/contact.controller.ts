import { Request, Response } from 'express';

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export const sendContactEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body as ContactRequest;

    // Validation
    if (!name || !email || !message) {
      res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'message']
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    // TODO: Implement actual email sending logic here
    // For now, just log and return success
    console.log('Contact form submission:', { name, email, message });

    res.status(200).json({ 
      success: true,
      message: 'Message received successfully' 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
