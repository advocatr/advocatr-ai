
import nodemailer from 'nodemailer';

// Configure email transporter
console.log('Email Config:', {
  user: process.env.EMAIL_USER,
  // Mask password for security
  hasPassword: !!process.env.EMAIL_PASSWORD
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendContactEmail = async (name: string, email: string, content: string) => {
  const mailOptions = {
    from: email,
    to: process.env.CONTACT_EMAIL || 'contact@advocatr.com',
    subject: `Contact Form Message from ${name}`,
    text: `
Name: ${name}
Email: ${email}

Message:
${content}
    `,
  };

  await transporter.sendMail(mailOptions);
};
