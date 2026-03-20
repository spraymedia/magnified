export const prerender = false;

import type { APIRoute } from 'astro';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();

    const { firstName, lastName, email, phone, message, website } = body as Record<string, string>;

    // Honeypot — bots fill this hidden field
    if (website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate required fields
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please fill in all required fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Length limits
    if (firstName.length > 100 || lastName.length > 100) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name fields must be under 100 characters.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }
    if (email.length > 254 || !EMAIL_RE.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }
    if (phone && phone.length > 30) {
      return new Response(
        JSON.stringify({ success: false, error: 'Phone number is too long.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }
    if (message.length > 5000) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message must be under 5000 characters.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Get webhook URL from Cloudflare env
    const { env } = (locals as any).runtime;
    const webhookUrl = env.WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('WEBHOOK_URL environment variable is not set');
      return new Response(
        JSON.stringify({ success: false, error: 'Something went wrong. Please try again later.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Forward to n8n webhook
    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      source: 'website-contact-form',
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!webhookResponse.ok) {
      console.error(`Webhook returned ${webhookResponse.status}`);
      return new Response(
        JSON.stringify({ success: false, error: 'Something went wrong. Please try again later.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Something went wrong. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
