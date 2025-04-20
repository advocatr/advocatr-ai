
import nodemailer from 'nodemailer';

// Configure email transporter
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
    to: 'contact@advocatr.com',
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
