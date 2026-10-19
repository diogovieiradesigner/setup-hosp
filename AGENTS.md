# Edição de páginas clonadas

## Objetivo
Transformar páginas e seções clonadas em uma página coerente com a
copy e a marca do cliente, preservando os layouts e as interações
escolhidos. Priorize alterações necessárias; não reconstrua a página
nem troque tecnologias sem motivo relacionado ao pedido.

## Aplicação
Aplique as regras pertinentes ao pedido atual. Não transforme um
ajuste pontual em uma revisão completa. Preserve decisões já aprovadas.
Se faltar uma decisão indispensável, pergunte; resolva detalhes técnicos
autonomamente dentro do escopo autorizado.

## Como abrir e executar a página
Antes de editar ou concluir que a entrega está quebrada, identifique seu formato.
Um pedido para abrir a página não autoriza conversão, reconstrução ou otimização.

### Identifique a raiz e o contrato de execução
- Se recebeu ZIP, extraia sem sobrescrever trabalho existente. Localize a pasta
  da entrega, que pode estar dentro de outra pasta; não presuma que é a pasta atual.
- Consulte README, `src/EASY-BUILDER.md`, manifestos e instruções de execução
  quando existirem. Em projetos com fonte, leia scripts de `package.json`, campo
  `packageManager` e lockfile; não trate qualquer package.json vizinho como o da página.
- Dê precedência ao contrato da entrega: arquivos de React/Next capturados não
  transformam uma exportação HTML em um projeto Next.js editável. Não crie
  package.json, instale um framework ou execute npm run dev por suposição.

| Formato identificado | Como executar |
| --- | --- |
| Easy Builder isolado: `src/eb-isolated.json` e `src/index.html`; manifesto indica isolamento/requiresHttp | Use `eb-registry preview --dir <raiz-da-exportacao>`. A raiz contém `src`; não aponte `--dir` para `src` ou para um componente. O servidor especializado inicia as origens HTTP de isolamento. |
| Easy Builder sem isolamento, com `src/index.html` | Prefira o preview da CLI quando disponível. Servidor estático só é alternativa se o contrato não exigir endpoints/runtime especiais; preserve a raiz e os caminhos dos assets. |
| HTML estático independente ou build estático já pronto | Sirva por HTTP a raiz pública correta, preservando subpastas. Não instale dependências de desenvolvimento só para abrir uma saída pronta. |
| Fonte de Next.js, Vite, React ou outro projeto com scripts | Use o gerenciador/versão declarados e o script realmente existente, como `dev`. Instale dependências somente quando necessário, preservando lockfile; não use `npm init` nem atualize pacotes para abrir a página. |
| Preview de produção de um projeto com build | Siga os scripts documentados: por exemplo, build e depois start/preview, somente se existirem. Não confunda servidor de desenvolvimento com validação do pacote publicado. |
| Backend, CMS, monorepo ou formato desconhecido | Localize a aplicação, runtime, serviços e instruções próprios. Não sirva código de backend como HTML. Informe o requisito ausente ou esclareça a ambiguidade; não invente comandos nem recrie serviços externos. |

### Quando o usuário enviar um comando da CLI do Easy Builder
- Reconheça comandos como `eb-registry add`, `eb-registry compose` e suas formas
  com `npx`: eles baixam/geram os arquivos da página ou composição selecionada.
  Receber o comando no chat não é autorização para executá-lo imediatamente.
- Antes de baixar, identifique a pasta da página de destino e pergunte:
  "Posso executar esse comando do Easy Builder em <pasta-da-pagina> para baixar
  os arquivos dessa página/composição?" Se o destino estiver indefinido,
  esclareça onde salvar; não use a raiz geral do projeto por padrão.
- Confira `--dir`, quando presente, para não gravar em destino diferente do
  confirmado. Se houver conteúdo no destino, informe o risco de sobrescrita e
  combine como preservar o trabalho; não use `--force` sem aprovação explícita.
- Após a confirmação, preserve a seleção e as opções enviadas pelo usuário.
  Não altere códigos, ordem, seções ou modo de composição por conta própria.
  Não repita tickets/tokens em respostas, documentação ou relatórios. Se o acesso
  expirar, solicite um comando renovado por meio apropriado, sem pedir senha.
- Depois do download, siga as instruções acima para identificar e abrir a entrega.
  Baixar não autoriza adaptar, otimizar, publicar ou substituir outra página.
  Se o usuário enviar apenas `preview`, aplique o fluxo de abertura: esse comando
  não equivale a add/compose nem autoriza baixar novamente os arquivos da página.

### Exemplo da exportação isolada
Com Node.js e npm disponíveis, para a entrega `pagina-eb-v2` compatível com a
CLI 1.0.6, execute os comandos em linhas separadas:

```bash
cd "/caminho/para/pagina-eb-v2"
npx --yes eb-registry@1.0.6 preview --dir .
```

Use a versão indicada pela entrega quando for outra; 1.0.6 é o exemplo conhecido,
não uma exigência universal nem uma afirmação sobre a versão mais recente.
O npx pode precisar de rede para obter a CLI. Se faltar Node/npm ou houver falha
na instalação, informe o bloqueio; não troque por servidor genérico para disfarçar.

Para HTML realmente estático, uma alternativa com Python 3 disponível é:

```bash
python3 -m http.server 8000 --bind 127.0.0.1 --directory "/caminho/para/raiz-publica"
```

No Windows, use `py -m http.server` se esse for o comando Python disponível.
Esse servidor, Live Server e outros servidores estáticos genéricos NÃO substituem
`eb-registry preview` em uma entrega isolada. Também não abra essa entrega por
`file://`. `offline.html` e `editable.html`, quando presentes, são alternativas
com contrato próprio: não troque para elas silenciosamente, pois podem perder
comportamentos. Não concatene scripts nem reconstrua index.html a partir das seções.

### Abra a URL correta e confirme o conteúdo
- Mantenha o processo ativo e abra a URL HTTP exata informada no terminal;
  não invente porta nem substitua host, pois o isolamento pode validar a origem.
  Preserve a subpasta quando fizer parte do contrato. Não encerre o servidor
  antes de o usuário usar a página; informe comando, pasta, URL e processo ativo.
- Se houver servidor existente, confirme que corresponde à mesma entrega e ao
  modo correto. Não mate processos alheios para liberar porta; escolha outra
  quando suportado ou informe o conflito. Não exponha o preview publicamente.
- Confirme no navegador conteúdo real, seções, assets e uma interação pertinente.
  HTTP 200, título, wrapper de preview ou texto "assets disponíveis" não comprovam
  que a página carregou. Se não puder observar o navegador, declare essa limitação.
- "Servidor de isolamento indisponível" ou "Failed to fetch. Use eb-registry
  preview" exige conferir primeiro servidor, raiz, versão, processo e requisição
  que falhou. Não declare sucesso, desative segurança/CORS ou altere os arquivos
  para esconder o aviso. Se persistir com o servidor correto, registre o erro real.
- Ao pedir apenas abertura, não execute novamente add/compose, não sobrescreva a
  exportação e não altere a página. Dependências externas ou funções de backend
  ausentes devem ser informadas separadamente, não simuladas como funcionais.

## Regras

1. Entenda a fonte antes de editar.
   Identifique o arquivo servido, a fonte editável, os arquivos gerados
   e os scripts que controlam o conteúdo. Edite na origem correta para
   que regeneração ou hidratação não desfaçam a alteração. Identifique
   seções por referência estável e contexto; posição ou classe
   compartilhada, sozinhas, não identificam o alvo com segurança.

2. Respeite a sequência quando adaptar uma página completa.
   Seleção/ordem → remoção → copy → identidade visual →
   interações/responsividade → otimização.
   Isso evita retrabalhar conteúdo descartado. Em ajustes pontuais,
   execute somente as etapas afetadas.

3. Ao excluir, remova de verdade.
   Retire a seção da estrutura entregue e atualize suas referências;
   impeça que scripts a recriem. Ocultação ou remoção após carregar
   não substituem exclusão. Menus, abas e slides podem permanecer
   ocultos quando isso fizer parte de seu funcionamento.

4. Ao alterar estrutura ou dependências, preserve interações.
   Não desative scripts, estilos ou animações globalmente para corrigir
   um defeito local. Adapte as dependências afetadas para não perder
   carrosséis, hover, vídeos, menus e outros comportamentos escolhidos.
   Limite estilos e scripts locais à seção pretendida. Reserve regras
   globais para decisões de identidade visual e confira seu impacto
   nas demais seções e páginas.

5. Ao aplicar copy, adapte o layout ao conteúdo.
   Preserve textos, preços e sentido. Ajuste distribuição e dimensões;
   não apague, resuma ou reescreva conteúdo para fazê-lo caber sem
   autorização editorial.

6. Ao padronizar fontes, diferencie funções.
   Hero, título de seção, card, descrição, legenda, preço e botão
   precisam de hierarquia própria. Não aplique um tamanho universal
   nem reduza fontes excessivamente para disfarçar problemas de layout.

7. Ao aplicar a marca, use um padrão central.
   Defina fonte, paleta, fundos, destaques, botões, larguras e
   espaçamentos. Preserve exceções intencionais e cores de fotos,
   logos e demonstrações; consistência não significa uniformizar tudo.

8. Ao mudar cores ou fundos, confira o conjunto.
   Verifique contraste de textos, ícones, links e estados dos botões.
   Não considere a troca concluída se algum conteúdo ficar ilegível.

9. Ao ajustar animações, separe entrada de interação.
   Unifique entradas quando solicitado, sem cancelar movimentos
   funcionais. Respeite movimento reduzido e mantenha conteúdo
   acessível se a animação falhar.
   Recursos lentos ou indisponíveis não devem bloquear toda a página;
   ofereça fallback e erro explícito, sem simular sucesso de ações.

10. Ao combinar seções, harmonize navegação e controles.
    Remova cabeçalhos/camadas duplicados e conflitos de scroll.
    Padronize cursores preservando sinais de clique, edição e arraste.
    Evite que comportamentos herdados disputem o controle da página.
    Confira também emendas, alturas e estilos dentro de documentos isolados.
    Ao integrar templates, consulte a seção de integração de OTIMIZACAO.md;
    preserve um mapa mínimo das fontes e dependências de cada seção.

11. Ao adaptar telas, corrija o layout.
    Ajuste colunas, larguras, quebras e espaçamentos por viewport.
    Não esconda seções nem corte conteúdo para mascarar overflow.

12. Após alterações, valide conforme o impacto.
    Ajuste pontual: confira a região afetada.
    Mudança global: confira as seções afetadas em desktop e celular.
    Interação: execute o comportamento real.
    Entrega final: percorra a página inteira.
    Screenshot não comprova funcionamento; verificações dispensadas
    devem ser registradas como pendentes.

13. Ao otimizar, comprove que o funcionamento foi preservado.
    Consulte OTIMIZACAO.md quando executar uma etapa de otimização;
    registre o resultado na pasta da página.
    Com URL pública autorizada, use PageSpeed Insights e SpeedVitals conforme
    o roteiro; salve e entregue os relatórios ao agente para priorizar ações.
    Não publique só para testar nem aplique recomendações sem avaliar impacto.
    Em composições de vários templates, após o diagnóstico priorize limpeza
    do pacote publicado, CSS acumulado, HTML e inicializações desnecessárias
    antes de recomprimir mídias; preserve o isolamento e as interações.
    Remova apenas recursos comprovadamente desnecessários, considerando
    carregamento tardio e interações. Compare antes/depois; ausência
    na primeira tela não significa ausência de uso.

14. Ao finalizar a identidade, complete os dados da página.
    Solicite favicon, título, descrição e destinos dos CTAs quando
    faltarem. Reutilize decisões aprovadas; não invente essas escolhas.

15. Antes de mudanças amplas, mantenha recuperação.
    Preserve um ponto recuperável. Corrija a causa dos problemas em vez
    de acumular sobrescritas contraditórias. Não reverta trabalho alheio
    ou alterações fora do escopo.

16. Ao entregar, diferencie alteração de comprovação.
    Informe o que mudou, o que foi validado e o que permanece pendente.
    Não declare funcionamento ou fidelidade apenas porque o código
    foi escrito, compilou ou a página abriu.
    Use os critérios de conclusão de OTIMIZACAO.md; registre pendências
    e encerre ao cumprir o escopo, sem ciclos de melhorias marginais.

17. Ao substituir elementos, preserve suas ações.
    Mantenha destinos, âncoras, ações de formulários, rótulos acessíveis
    e operação por teclado, salvo mudança solicitada. Aparência correta
    não garante que botões, links e formulários continuem funcionando.
    Antes de enviar dados, confirme finalidade e destino das integrações;
    remova/desative envios herdados não aprovados e registre a pendência.
    Valide com dados fictícios, sem efeitos reais não autorizados.

18. Antes de entregar, confira o caminho real de publicação.
    Teste recursos e navegação na subpasta final quando aplicável,
    não somente na raiz local. Não entregue referências a localhost,
    caminhos do computador ou arquivos fora do projeto. Essa validação
    não autoriza publicação.

19. Ao acrescentar dependências, exija benefício concreto.
    Reutilize recursos existentes quando adequados. Evite bibliotecas,
    fontes e serviços externos para efeitos simples; não remova
    dependências necessárias apenas para reduzir tamanho.

20. Registre o briefing na pasta da página.
    Use BRIEFING.md como modelo. Na criação/adaptação completa, cubra
    todas as perguntas aplicáveis, aproveitando respostas existentes;
    em ajustes pontuais, trate somente o que mudou. Assim que houver
    respostas e a pasta da página estiver identificada, crie ou atualize
    <pasta-da-pagina>/BRIEFING-PREENCHIDO.md, nunca na raiz geral.
    Salve cada pergunta junto da resposta do cliente, sem inventar
    respostas ou aprovações; separe sugestões e pendências. Atualize
    após cada rodada e consulte o arquivo ao retomar o trabalho.
    Se a pasta for ambígua, esclareça antes de gravar; não sobrescreva
    o briefing de outra página. Mídias e interações serão tratadas
    conforme os pedidos posteriores, sem questionário inicial próprio.
