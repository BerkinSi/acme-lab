import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'edge';

const GumroadWebhookSchema = z.object({
  email: z.string().email(),
  sale_id: z.string(),
  subscription_cancelled: z.enum(['true', 'false']),
  ends_at: z.string().optional(),
  secret: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);
    const reqBody = Object.fromEntries(params.entries());
    // Debug: log the raw request body and parsed result
    console.log('Gumroad webhook raw body:', reqBody);
    const parsed = GumroadWebhookSchema.safeParse(reqBody);
    console.log('Gumroad webhook parsed result:', parsed);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const { email, sale_id, subscription_cancelled, ends_at, secret: secretFromBody } = parsed.data;

    const url = new URL(req.url);
    const secretFromQuery = url.searchParams.get('secret');
    const secret = secretFromBody || secretFromQuery;

    const webhookSecret = process.env.GUMROAD_WEBHOOK_SECRET;
    if (!webhookSecret || secret !== webhookSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Import Supabase client with service role key
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find user id by email using RPC
    const { data: userId, error: userIdError } = await supabase.rpc('get_user_id_by_email', { user_email: email });
    if (userIdError || !userId) {
      console.error('User not found for email:', email, userIdError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prepare update values
    let update: any = {};
    if (subscription_cancelled === 'true') {
      update = { is_premium: false, premium_until: null };
    } else {
      update = {
        is_premium: true,
        gumroad_sale_id: sale_id,
        premium_until: ends_at && ends_at.length > 0 ? ends_at : new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString(),
      };
    }

    // Update profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update(update)
      .eq('id', userId);
    if (profileError) {
      console.error('Failed to update profile:', profileError);
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 