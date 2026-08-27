export type UssdSessionStatus =
  | 'idle'
  | 'active'
  | 'ended'
  | 'error';

export type UssdResponseType = 'CON' | 'END';

export type UssdHttpMethod = 'GET' | 'POST';