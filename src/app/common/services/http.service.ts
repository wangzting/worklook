// httpOptions的observe，参见https://www.cnblogs.com/wangtingnoblog/p/10322483.html
export namespace ObserveType {
  export const Body = 'body' as 'body';
  export const Response = 'response' as 'response';
  export const Events = 'events' as 'events';
}
// httpOptions的responseType，参见https://www.cnblogs.com/wangtingnoblog/p/10322483.html
export namespace ResponseType {
  export const Json = 'json' as 'json';
  export const Text = 'text' as 'text';
  export const Blob = 'blob' as 'blob';
  export const Arraybuffer = 'arraybuffer' as 'arraybuffer';
}
