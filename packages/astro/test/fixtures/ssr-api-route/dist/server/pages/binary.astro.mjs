import fs from 'node:fs';
export { renderers } from '../renderers.mjs';

function GET() {
	return new Response('ok')
}

async function POST({ request }) {
	const data = await request.formData();
	const file = data.get('file');

	if (file) {
		const buffer = await file.arrayBuffer();
		const realBuffer = await fs.promises.readFile(new URL('../images/penguin.jpg', import.meta.url));

		if(buffersEqual(buffer, realBuffer)) {
			return new Response('ok', { status: 200 });
		}	
	}
	return new Response(null, { status: 400 });
}

function buffersEqual(buf1, buf2) {
	if (buf1.byteLength != buf2.byteLength) return false;
	const dv1 = new Uint8Array(buf1);
	const dv2 = new Uint8Array(buf2);
	for (let i = 0; i !== buf1.byteLength; i++) {
		if (dv1[i] != dv2[i]) return false;
	}
	return true;
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
