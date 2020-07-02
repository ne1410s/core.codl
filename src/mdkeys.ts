/** Metadata keys. */
export enum MetadataKey {
  DISPLAY_NAME = 'ne-codl:metadata:display-name',
  DESCRIPTION = 'ne-codl:metadata:description',
  FORMAT = 'ne-codl:metadata:format',
  MODEL = 'ne-codl:metadata:model',
}

/** Validation keys. */
export enum ValidationKey {
  REQUIRED = 'ne-codl:validation:required',
  FORBIDDEN = 'ne-codl:validation:forbidden',
  MIN_LENGTH = 'ne-codl:validation:min-length',
  MAX_LENGTH = 'ne-codl:validation:max-length',
  MIN = 'ne-codl:validation:min',
  MAX = 'ne-codl:validation:max',
  REGEX = 'ne-codl:validation:regex',
  TYPE = 'ne-codl:validation:type',
  OPTIONS = 'ne-codl:validation:options',
  CUSTOM = 'ne-codl:validation:custom',
}
