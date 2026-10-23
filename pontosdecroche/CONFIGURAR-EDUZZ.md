# Configurar o checkout Eduzz

A landing chama `POST /api/eduzz-cart`. A função cria um carrinho com os produtos escolhidos e redireciona a pessoa para `paymentUrl`, devolvida pelo Checkout Sun. Os IDs dos nove produtos ficam em `functions/api/eduzz-cart.js`; os valores são os preços cadastrados na Eduzz.

No Console do Desenvolvedor da Eduzz, crie um aplicativo com o escopo `sun_cart_write`, registre a URL de retorno e autorize o aplicativo na conta produtora. Troque o código de autorização por um token conforme o fluxo OAuth2 `authorization_code` documentado pela Eduzz. Configure no Cloudflare Pages, em **Settings → Variables and Secrets**, estas variáveis de produção:

- `EDUZZ_CLIENT_ID` — segredo criptografado do aplicativo.
- `EDUZZ_CLIENT_SECRET` — segredo criptografado do aplicativo.
- `EDUZZ_ACCESS_TOKEN` — token autorizado com o escopo `sun_cart_write`, também como segredo criptografado.

O endpoint de checkout usa somente `EDUZZ_ACCESS_TOKEN` em tempo de execução. O Client ID e o Client Secret ficam guardados no Pages para uma futura renovação ou nova autorização e nunca devem ser colocados no HTML, JavaScript do navegador ou Git.

O Checkout Sun exige `postbackUrl`; a rota `/api/eduzz-postback` responde sem guardar dados. A entrega digital e o estado do pagamento continuam sendo gerenciados pela Eduzz; este site ainda não registra nem reconcilia pagamentos.

Até as credenciais estarem configuradas e o Pages publicado, o botão de checkout informa que a configuração está em andamento. A integração não deve ser testada com uma compra real.
