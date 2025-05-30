import { IInviteSensai } from '@/types/shihan/inviteType';
import transporter from '@/configs/nodemailer';

export const inviteSensaiTemplate = (invitationDetails: IInviteSensai) => {
  const { schedule, startDate, message } = invitationDetails;

  const formattedDate = new Date(startDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const acceptUrl = `http://localhost:3000/shihan`;
  const rejectUrl = `http://localhost:3000/shihan`;

  const formattedSchedule = schedule
    .map((entry) => `<li><strong>${capitalize(entry.day)}:</strong> ${entry.time.join(', ')}</li>`)
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <head>
        <meta charset="UTF-8" />
        <title>Dojo Invitation</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f3f4f6;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f3f4f6">
          <tr>
            <td style="padding: 40px 20px;">
              <table style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);">
                <tr>
                  <td>
                    <h2 style="color: #111827;">🥋 You're Invited to Join a Dojo</h2>
                    <p>Dear Sensei,</p>
                    <p>You have been invited to collaborate with a dojo.</p>

                    <h4 style="margin: 24px 0 8px;">📅 Proposed Schedule:</h4>
                    <ul style="padding-left: 20px; margin-bottom: 20px;">
                      ${formattedSchedule}
                    </ul>

                    <p><strong>Start Date:</strong> ${formattedDate}</p>
                    <p><strong>Message from Shihan:</strong></p>
                    <blockquote style="margin: 10px 0; padding: 15px; background-color: #fef3c7; border-left: 4px solid #facc15; font-style: italic;">
                      "${message}"
                    </blockquote>

                    <p style="margin-top: 30px;">Please respond to the invitation by selecting an option below:</p>

                    <div style="margin: 30px 0;">
                      <a href="${acceptUrl}" style="display: inline-block; background-color: #22c55e; color: white; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: bold; margin-right: 10px;">✅ Accept</a>
                      <a href="${rejectUrl}" style="display: inline-block; background-color: #ef4444; color: white; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: bold;">❌ Reject</a>
                    </div>

                    <p>If you have any questions, feel free to reach out to the Shihan directly.</p>

                    <p>Warm regards,<br />The Coach Desk Team</p>

                    <hr style="margin-top: 40px; border-color: #e5e7eb;" />
                    <small style="color: #6b7280;">This invitation is confidential and intended only for the recipient.</small>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const sendInvitationEmail = async (invitationDetails: IInviteSensai) => {
  const { email } = invitationDetails;

  const html = inviteSensaiTemplate(invitationDetails);

  const mailOptions = {
    from: '"Coach Desk" <no-reply@coachdesk.com>',
    to: email,
    subject: "🥋 You're Invited to Join a Dojo!",
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
