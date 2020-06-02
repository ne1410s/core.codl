import 'reflect-metadata';

const METAKEY_NAME = 'ne-codl_name';
const METAKEY_DESCRIPTION = 'ne-codl_description';

/**
 * A friendly name to associate.
 * @param val The name.
 */
export const name = (val: string) => Reflect.metadata(METAKEY_NAME, val);

/**
 * A description to associate.
 * @param val The description.
 */
export const description = (val: string) => Reflect.metadata(METAKEY_DESCRIPTION, val);