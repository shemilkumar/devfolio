import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactEmailProps = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export async function sendContactEmail({
    name,
    email,
    subject,
    message,
}: ContactEmailProps) {
    const { data, error } = await resend.emails.send({
        from: `Portfolio Contact <${process.env.RESEND_FROM_EMAIL}>`,
        to: process.env.RESEND_TO_EMAIL!,
        replyTo: email,
        subject: `[Portfolio] ${subject} — from ${name}`,
        html: `
      <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 40px; background: #09090b; color: #f4f4f5; border-radius: 12px;">
        <p style="color: #34d399; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 24px;">
          // new message from portfolio
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <tr>
            <td style="padding: 10px 0; color: #71717a; font-size: 13px; width: 80px;">name</td>
            <td style="padding: 10px 0; color: #f4f4f5; font-size: 13px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #71717a; font-size: 13px;">email</td>
            <td style="padding: 10px 0; font-size: 13px;">
              <a href="mailto:${email}" style="color: #34d399;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #71717a; font-size: 13px;">subject</td>
            <td style="padding: 10px 0; color: #f4f4f5; font-size: 13px;">${subject}</td>
          </tr>
        </table>

        <div style="border-top: 1px solid #27272a; padding-top: 24px;">
          <p style="color: #71717a; font-size: 12px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.1em;">message</p>
          <p style="color: #d4d4d8; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #27272a;">
          <a href="mailto:${email}"
            style="display: inline-block; padding: 10px 20px; background: #10b981; color: #09090b; font-weight: 600; font-size: 13px; border-radius: 8px; text-decoration: none;">
            Reply to ${name}
          </a>
        </div>
      </div>
    `,
    });

    if (error) {
        console.error("Resend error:", error);
        throw new Error("Failed to send email");
    }

    return data;
}