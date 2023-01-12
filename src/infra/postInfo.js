import { buildClient } from "@datocms/cma-client";
import { masterTokenDato } from '../assets/env';

export async function postInfo(query){
    const client = buildClient({ apiToken: masterTokenDato });
    return await client.items.create(query);
}