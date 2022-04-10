import { Client, PrivateKey, ThreadID } from "@textile/hub";

/**
 * Create, Initialize and Return thw Client and Thread
 * @returns {Promise<{client: Client, thread: ThreadID}>}
 */
export default async function getClient() {
  const key = {
    key: "bjqawcvwopcptmzqmyrvperajbi",
    secret: "bn4u3xofbwll2yy3lsljea3peapr4dkl6zol2yzy",
  };
  // USING DUMMY KEYS

  let identity = PrivateKey.fromString(
    "bbaareqfbtofe27x24ra5z4ul4r62ylfopnkx7mgpjwh57oduhk2yhrk5j6fghqunzwlaiehtkj3rfwgy3sgfob5s6xes5fq7blhuqeedg6kwg"
  ); //USING STATIC IDENTITY KEY FOR TESTING

  let client = await Client.withKeyInfo(key);

  await client.getToken(identity);

  const threads = await client.listThreads();

  let thread = ThreadID.fromString(
    threads.length ? threads[0].id : await createThread(client) //CHECK FOR EXISTING THREADS AND CREATE NEW ONE IF DIDNT EXIST
  );

  return { client, thread };
}

//CREATE NEW THREAD
async function createThread(client) {
  return await client.newDB();
}
