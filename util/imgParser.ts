import getSupaClient from './getSupaClient.ts';

export default async function imgParser(md: string, ) {
	const regex = /\((.*)\)/;
	const result = md.match(regex);
	if (!result) {
		return md;
	}

	let newMd = md;
	for (const img of result) {
		let url = (img.match(/\((.*)\)/) ?? [''])[0];
		url = url.replaceAll('(', '').replaceAll(')', '');
		if (url) {
			const buffer = await (await fetch(url)).arrayBuffer();
			const imgName = url.split('?')[0].split('/').pop();
			if (!imgName) {
				continue;
			}
			const publicUrl = getSupaClient().storage.from('landing-bucket').getPublicUrl(imgName).data.publicUrl;
			let uploadRes;
			try {
				uploadRes = await getSupaClient()
					.storage.from('landing-bucket')
					.upload(imgName ?? '', buffer);
			} catch (error) {
				console.error(error);
			}
			newMd = newMd.replace(
				url,
				uploadRes?.data?.path ? ` https://curmgtrnrpyjsizyhdzy.supabase.co/storage/v1/object/public/landing-bucket/${uploadRes?.data?.path}` : publicUrl
			);
		}
	}
	return newMd;
}
