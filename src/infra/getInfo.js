import { buildClient } from '@datocms/cma-client';
import { readTokenDato } from '../assets/env';

export async function getInfo(query){
    const client = buildClient({ apiToken: readTokenDato });
    return await client.items.list(query);
}