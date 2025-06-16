import { getClient } from '@/app/lib/urqlClient';
import StoreQuery from '@/graphql/StoreQuery.graphql';

export async function findStore() {
  const client = await getClient();

  const { data: response } = await client.query(StoreQuery, {});

  return response.store;
}
