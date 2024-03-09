import twilio from 'twilio';
const accSid = process.env.TWILIO_ACCOUNT_SID || 'ACc682d4da5dedad3d6d2bc5e54beb0d2d';
const token = process.env.TWILIO_AUTH_TOKEN || 'e87b95e454485ff57822e141f68f1e76';
const client = twilio(accSid, token);

export default async function sendOTP(phone: string, otp: number) {
  try {
    const message = await client.messages.create({
      body: `Your OTP is: ${otp || 1111}`,
      from: '+919029773533',
      to: phone,
    });
    console.log(`OTP sent to ${phone}: ${message.sid}`);
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
}
