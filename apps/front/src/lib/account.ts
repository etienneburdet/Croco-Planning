import { supabaseClient } from '$lib/supabaseClient';
import type { AuthSession } from '@supabase/supabase-js';

export const getProfile = async (session: AuthSession) => {
    try {
        const { user } = session;

        const { data, error, status } = await supabaseClient
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', user.id)
            .single();

        if (data) {
            return {
                username: data.username,
                website: data.website,
                avatarUrl: data.avatar_url
            };
        }

        if (error && status !== 406) throw error;
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
};

export 	const signOut = async () => {
	try {
		let { error } = await supabaseClient.auth.signOut();
		if (error) throw error;
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		}
	}
};
