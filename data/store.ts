import { getClient } from '@/app/lib/urqlClient';
import StoreQuery from '@/graphql/StoreQuery.graphql';

const client = await getClient();

export async function findStore() {
  const { data: response } = await client.query(StoreQuery, {});

  return response.store;
}
