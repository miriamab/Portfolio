import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Try to dynamically import nodemailer (avoids module not found at build time)
    let nodemailerModule: any;
    try {
      nodemailerModule = await import('nodemailer');
    } catch (importErr) {
      console.warn('nodemailer not available:', importErr);
      return NextResponse.json({ error: 'nodemailer not installed' }, { status: 501 });
    }

    const nodemailerLib = nodemailerModule?.default || nodemailerModule;

    // If SMTP is not configured, return 501 so the client can fallback to mailto
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('SMTP not configured');
      return NextResponse.json({ error: 'SMTP not configured' }, { status: 501 });
    }

    const transporter = nodemailerLib.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `${name || 'Portfolio Contact'} <${email}>`,
      to: process.env.EMAIL_TO || 'miriam.abbas@hm.edu',
      subject: `New contact from ${name || 'Portfolio visitor'}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (sendErr: any) {
      // If SMTP reports recipient rejected / user unknown, surface as 400 invalid email
      const msg = (sendErr && sendErr.message) ? sendErr.message.toString() : '';
      if (/recipient|rejected|user unknown|5\.1\.1|550/i.test(msg)) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
      }
      console.error('Send mail error (non-recipient):', sendErr);
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Send mail error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
