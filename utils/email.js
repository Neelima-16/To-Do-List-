const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send reminder email
const sendReminderEmail = async (to, taskDescription, goalDate) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Task Reminder: Goal Date Approaching',
    text: `Reminder: Your task "${taskDescription}" is due on ${new Date(goalDate).toLocaleDateString()}. Don't forget to complete it!`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reminder email sent to', to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendReminderEmail };
