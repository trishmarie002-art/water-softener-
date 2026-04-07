import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { name, phone, email, service, message } = body;

    // Validate required fields
    if (!name || !phone) {
      return new Response(JSON.stringify({ error: 'Name and phone are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: 'PNF Water Heaters & Softeners <onboarding@resend.dev>',
      to: ['service@pnfwaterheaters.com'], // Replace with actual email
      subject: `New Lead: ${service || 'General Inquiry'} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d; border-bottom: 2px solid #c53030; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            ${email ? `<p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` : ''}
            <p style="margin: 10px 0;"><strong>Service Interested In:</strong> ${service || 'Not specified'}</p>
            ${message ? `<p style="margin: 10px 0;"><strong>Message:</strong></p><p style="margin: 10px 0; padding: 10px; background: white; border-radius: 4px;">${message}</p>` : ''}
          </div>
          
          <p style="color: #666; font-size: 14px;">
            This lead was submitted from the PNF Water Heaters & Softeners website.
          </p>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <a href="tel:${phone}" style="display: inline-block; background-color: #c53030; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Call ${name} Now
            </a>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
