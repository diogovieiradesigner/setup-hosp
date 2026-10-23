const products = {
  'casaco-bela': { id: '3134292', description: 'Receita Casaco Bela' },
  'conjunto-rubi': { id: '3134337', description: 'Conjunto Rubi, 2 peças' },
  'conjunto-meli': { id: '3134327', description: 'Conjunto Meli' },
  'sapatinho-pingo-de-ouro': { id: '3134343', description: 'Sapatinho Pingo de Ouro' },
  'vestido-perola': { id: '3134340', description: 'Vestido Pérola, receita de tricô' },
  'conjunto-zoe': { id: '3134323', description: 'Conjunto Zoé, 6 peças' },
  'touca-pingo-de-ouro': { id: '3134345', description: 'Touca Pingo de Ouro' },
  'conjunto-ariel': { id: '3134333', description: 'Conjunto Ariel, 3 peças' },
  'vestido-isa': { id: '3134301', description: 'Vestido Isa' },
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...extraHeaders,
    },
  });
}

export async function onRequestPost({ request, env }) {
  const accessToken = String(env.EDUZZ_ACCESS_TOKEN ?? '').replace(/\s+/g, '');
  if (!accessToken) {
    return json({ error: 'O checkout está sendo configurado. Use o botão flutuante do WhatsApp para falar com a gente enquanto isso.' }, 503);
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return json({ error: 'Pedido inválido.' }, 400);
  }

  if (!Array.isArray(input.items) || input.items.length < 1 || input.items.length > Object.keys(products).length) {
    return json({ error: 'Seu carrinho está vazio ou contém itens inválidos.' }, 400);
  }

  const seen = new Set();
  const items = [];
  for (const item of input.items) {
    const product = products[item?.productId];
    const quantity = Number(item?.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10 || seen.has(item.productId)) {
      return json({ error: 'Há um item inválido no carrinho. Atualize a página e tente novamente.' }, 400);
    }
    seen.add(item.productId);
    items.push({ productId: product.id, description: product.description, quantity });
  }

  let stage = 'prepare';
  try {
    const origin = new URL(request.url).origin;
    const orderId = crypto.randomUUID();
    stage = 'fetch';
    const cartResponse = await fetch('https://api.eduzz.com/sun/v1/cart', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        postbackUrl: `${origin}/api/eduzz-postback`,
        returnUrl: `${origin}/pontosdecroche/#colecao`,
        items,
      }),
    });
    stage = 'read';
    const responseBody = await cartResponse.text();
    let cart = null;
    try {
      cart = JSON.parse(responseBody);
    } catch {
      // A resposta de erro da Eduzz pode não ser JSON; nunca repasse o corpo ao navegador.
    }
    if (!cartResponse.ok || typeof cart.paymentUrl !== 'string') {
      console.error('Eduzz cart request failed', {
        status: cartResponse.status,
        code: cart?.code ?? null,
      });
      return json(
        { error: 'A Eduzz não conseguiu criar este checkout. Tente novamente em instantes.' },
        502,
        { 'x-eduzz-status': String(cartResponse.status) },
      );
    }

    const paymentUrl = new URL(cart.paymentUrl);
    if (paymentUrl.protocol !== 'https:' || paymentUrl.hostname !== 'sun.eduzz.com') {
      return json({ error: 'A Eduzz retornou um endereço de checkout inválido.' }, 502);
    }
    return json({ paymentUrl: paymentUrl.toString() });
  } catch (error) {
    console.error('Eduzz cart connection failed', { stage, name: error?.name ?? 'Error' });
    const diagnostic = String(error?.message ?? 'unknown')
      .replace(/[^a-zA-Z0-9 .:/_-]/g, '')
      .slice(0, 120);
    return json(
      { error: 'Não conseguimos conectar à Eduzz agora. Tente novamente em instantes.' },
      502,
      { 'x-eduzz-status': stage, 'x-eduzz-error': diagnostic },
    );
  }
}
