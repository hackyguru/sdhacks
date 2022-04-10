/** Methods related to Thread Collection Instances **/

import getClient from "./getClient";

//TODO: Check for Top Level Await compatability with nextJS
let client;
let thread;

/**
 * Initiating the client and thread
 * @returns {Promise<void>}
 */
export async function init() {
  let r = await getClient();
  client = r.client;
  thread = r.thread;
}

/**
 * Insert new instance into a collection
 * @param collection
 * @param instance
 * @returns {Promise<*>}
 */
export async function insert(collection, instance) {
  return await client.create(thread, collection, [instance]);
}

/**
 * Return all the instances of a collection
 * @param collection
 * @returns {Promise<*>}
 */
export async function all(collection) {
  return await client.find(thread, collection, {});
}

/**
 * Find all instances matching the query
 * @param collection
 * @param query
 * @returns {Promise<*>}
 */
export async function find(collection, query) {
  return await client.find(thread, collection, query);
}

/**
 * Return the first instance matching the query
 * @param collection
 * @param query
 * @returns {Promise<*|null>}
 */
export async function findFirst(collection, query) {
  return (await client.find(thread, collection, query))[0] ?? null;
}

/**
 * Return the first instance matching the given ID
 * @param collection
 * @param id
 * @returns {Promise<*>}
 */
export async function findById(collection, id) {
  return await client.findByID(thread, collection, id);
}

/**
 * Updates instances queried by the given query
 * @param collection
 * @param query
 * @param updates //The update values
 * @returns {Promise<*>}
 */
export async function update(collection, query, updates) {
  let instances = await find(collection, query);

  instances = instances.map((instance) => {
    return { ...instance, ...updates };
  });

  return await client.save(thread, collection, instances);
}

/**
 * Drops all instances matching the given query
 * @param collection
 * @param query
 * @returns {Promise<*>}
 */
export async function drop(collection, query) {
  let instances = await find(collection, query);

  instances = instances.map((instance) => instance._id);

  return await client.delete(thread, collection, instances);
}

export function startListener(filters, callback) {
  return client.listen(thread, filters, callback);
}
