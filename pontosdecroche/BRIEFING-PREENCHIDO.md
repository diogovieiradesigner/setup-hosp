# Briefing da página — Ponto de Crochê

Página/projeto: Ponto de Crochê — receitas digitais de roupas e acessórios para bebês.
Pasta da página: `pontosdecroche/`.
Endereço de produção pretendido: `https://pontosdecroche.com.br/` (pendente ativação DNS e publicação Pages).
Estado: suficiente para integração visual e técnica; vendas pendentes de credenciais Eduzz e validação de entrega.
Última atualização: 2026-10-23.

## 1. Objetivo e público

1. O que a página oferece e para quem?
   **Resposta:** Receitas digitais de crochê/tricô para quem deseja produzir roupinhas, mantas e acessórios para bebês.
2. Qual ação principal o visitante deve realizar?
   **Resposta:** Escolher receitas, adicionar ao carrinho e concluir a compra no checkout Eduzz. O contato de suporte é pelo WhatsApp.
3. Qual benefício principal e diferencial precisam ficar claros?
   **Resposta:** Passo a passo claro para acompanhar desde o primeiro ponto; peças artesanais feitas com carinho.
4. De onde virão os visitantes e quanto já conhecem a marca ou a oferta?
   **Resposta:** Pendente.

## 2. Base e escopo da edição

1. Qual página/exportação vamos editar?
   **Resposta:** Landing local em `/Users/diogovieiradeoliveira/Documents/ChatGPT/meu projeto`, integrada como slug nesta aplicação.
2. O pedido é adaptação completa ou ajuste específico?
   **Resposta:** Adaptação e publicação da landing no setup multi-slug para que o endereço fique em `/pontosdecroche/`; integrar o carrinho Eduzz.
3. O que já está aprovado e não deve ser alterado?
   **Resposta:** Marca Ponto de Crochê, visual marrom claro/pastel, hero com roupinhas de bebê em crochê, nove receitas, seção de compra e entrega, FAQ, contatos e identidade já escolhida.
4. Existem defeitos conhecidos?
   **Resposta:** A venda só fica funcional após configurar credenciais Eduzz no Pages e validar checkout/entrega. Domínio ainda depende de ativação DNS.

## 3. Seleção e ordem das seções

1. Quais seções devem permanecer ou ser substituídas?
   **Resposta:** Manter o hero/banner, categorias, coleção de receitas, benefícios, compra/entrega, dúvidas e rodapé. Usar as imagens e títulos escolhidos para os nove produtos.
2. Qual deve ser a ordem final?
   **Resposta:** Hero → categorias → coleção → benefícios → compra e entrega → dúvidas → rodapé.
3. Qual cabeçalho e rodapé vamos usar?
   **Resposta:** Cabeçalho e rodapé da identidade atual da landing Ponto de Crochê; sem duplicar blocos.

## 4. Copy e oferta

1. Onde está a copy aprovada? Idioma e tom?
   **Resposta:** Copy enviada pelo cliente nesta conversa; português brasileiro, acolhedor e claro. Preservar os trechos aprovados.
2. Quais preços e condições são obrigatórios?
   **Resposta:** A Eduzz deve fornecer preços e opções disponíveis no checkout. Não apresentar valores fixos na landing sem aprovação.
3. Quais provas podem ser usadas?
   **Resposta:** Usar apenas as fotos fornecidas pelo cliente; não inventar depoimentos ou resultados.
4. Quais dúvidas e objeções devem ser respondidas?
   **Resposta:** FAQ solicitado pelo cliente sobre saber crochê, gráficos, tamanhos, acesso por celular, venda das peças e acesso vitalício, além das dúvidas já presentes.
5. Existem promessas ou termos proibidos?
   **Resposta:** Não inventar garantia, prazo de entrega ou resultado. Informar a entrega pelo WhatsApp conforme solicitado, depois de confirmar o fluxo real com a Eduzz.

## 5. Identidade visual

1. Quais logo, fontes e cores?
   **Resposta:** Logo Ponto de Crochê fornecida pelo cliente; tons marrom claro e paleta pastel.
2. Fundos e destaques?
   **Resposta:** Fundos claros em marrom/bege suave, com destaques pastel.
3. Referência de botões e estilo?
   **Resposta:** Landing aprovada pelo cliente, visual suave e artesanal; preservar acessibilidade e responsividade.

## 6. Botões, navegação e formulários

1. Qual texto e destino de cada CTA?
   **Resposta:** Navegação interna para coleção, compra/entrega e FAQ. Botões de carrinho enviam os produtos escolhidos ao checkout Eduzz. WhatsApp usa o número informado pelo cliente: +55 45 92005-8122.
2. Há formulário?
   **Resposta:** Não há formulário; checkout é feito pela Eduzz.
3. Quais integrações precisam funcionar?
   **Resposta:** Eduzz Checkout Sun via API de carrinho multiproduto com credenciais de servidor; atendimento pelo WhatsApp. Credenciais ainda não configuradas e entrega automatizada ainda não validada.

## 7. Metadados e entrega

1. Nome, título, descrição, favicon e imagem social?
   **Resposta:** Nome/título: Ponto de Crochê — receitas feitas de carinho. Banner e logo aprovados. Favicon e imagem social específicos: pendentes.
2. Qual domínio e caminho final?
   **Resposta:** `https://pontosdecroche.com.br/`, hospedado no Cloudflare Pages como página raiz do slug `/pontosdecroche/`. Nameservers ainda não foram alterados.
3. Entrega inclui publicação? Critérios de pronto?
   **Resposta:** Sim, no fork pessoal `diogovieiradesigner/setup-hosp`, branch `main`, conectado ao Pages. Pronta quando a página estiver disponível no domínio, carrinho multiproduto criar checkouts Eduzz reais de teste sem finalizar compra, e a entrega após pagamento estiver configurada e confirmada. Nenhuma compra real será feita pela equipe.

## Decisões para execução

- Escopo aprovado: usar o fork pessoal `diogovieiradesigner/setup-hosp` e o Pages já conectado; não usar a conta `contatoeasybuilder-coder`.
- Pendências bloqueadoras: acesso Cloudflare Pages ao GitHub somente ao fork, credenciais do app Eduzz (`sun_cart_write`) em Pages Secrets, configurar/verificar entrega por WhatsApp, apontar domínio após validar Pages.
- Próxima etapa: integrar e publicar o slug no fork; depois solicitar/configurar credenciais Eduzz e validar a entrega.
- Sugestão ainda não aprovada: favicon e imagem social próprios.

## Atualizações posteriores

- 2026-10-23 — Cliente corrigiu o destino: “Deve ser usado o diogovieiradesigner não deve usar a conta do contatoeasybuilder”. Usar o fork pessoal e manter os históricos de repositório separados.
- 2026-10-23 — Cliente autorizou checkout separado do fork pessoal em `/Users/diogovieiradeoliveira/Developer/setup-hosp-diogovieiradesigner`, baseado no `main` existente.
