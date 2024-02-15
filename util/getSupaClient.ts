import { createClient } from 'supabase';

export default function getSupaClient() {
	const env = Deno.env.toObject();
	return createClient('https://curmgtrnrpyjsizyhdzy.supabase.co', env.SERVICE_ROLE, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});
}
