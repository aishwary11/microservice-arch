import nodemailer from 'nodemailer';
import { SMTPServer } from 'smtp-server';
import constant from '../constants';

const sendMail = async () => {
  const server: SMTPServer = new SMTPServer({
    onData(stream, session, callback) {
      stream.pipe(process.stdout);
      stream.on('end', callback);
    },
    disabledCommands: ['AUTH'],
  });
  server.listen(constant.smtpPort, () => console.log(`SMTP Server is running at port ${constant.smtpPort}`));
  let transporter = nodemailer.createTransport({
    host: 'localhost',
    port: constant.smtpPort,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });
  try {
    let info = await transporter.sendMail({
      from: 'aishwary.shah@smfgindia.com',
      to: 'aishwary46@gmail.com',
      subject: 'Hello from Nodemailer!',
      text: 'This is a test email.',
    });
    console.log('Send mail :: ', info);
  } catch (error) {
    console.error(error);
  }
  try {
    await transporter.verify();
    console.log('Server is ready to take our messages');
  } catch (error) {
    console.error(error);
  }
};
export default sendMail;
