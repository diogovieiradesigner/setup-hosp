// Eduzz requires a postback URL when it creates a cart. Digital delivery and
// payment status remain managed by Eduzz; this endpoint does not store buyer data.
export async function onRequestPost() {
  return new Response(null, { status: 204 });
}
