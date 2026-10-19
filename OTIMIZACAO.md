# Otimização de páginas clonadas

## Objetivo e aplicação
Entregar a primeira tela rapidamente e carregar o restante conforme o uso,
reduzindo arquivos, tráfego e processamento sem perder conteúdo, aparência
ou interações. Consulte este roteiro ao otimizar ou preparar uma entrega;
execute somente os itens pertinentes, seguindo AGENTS.md e o briefing da página.

## Prioridade para páginas compostas de vários templates
Após o diagnóstico, comece pela limpeza e consolidação dos templates (etapa 2),
antes de novas conversões ou compressões. Esse é o caminho padrão para páginas
de clientes: primeiro reduza o que não precisa existir, ser publicado ou executar;
depois otimize o carregamento e os recursos que permaneceram.
Não é autorização para uma reescrita: preserve a composição e suas interações.
Um defeito funcional bloqueante vem antes; registre desvios de prioridade quando
as medições mostrarem um gargalo mais relevante. Em pedidos pontuais, limite-se
ao escopo autorizado, sem iniciar uma limpeza geral.

## 1. Meça e priorize
- Identifique arquivos servidos, fonte editável e gargalos reais. Registre
  carga inicial e percurso completo, incluindo scroll, menus e vídeos.
- Compare nas mesmas condições de viewport, cache, rede e CPU. Separe bytes
  em disco, bytes transferidos, quantidade de requisições e tempo percebido.
- Priorize até três mudanças de alto impacto por rodada; preserve recuperação.
  Não confunda nota de ferramenta com funcionamento ou qualidade visual.

### Auditorias externas: PageSpeed Insights e SpeedVitals
Quando houver uma URL pública autorizada, use as duas ferramentas no diagnóstico
e repita após um lote relevante estar disponível nessa URL. Audite a página exata,
incluindo sua subpasta, não apenas a home. Não publique, abra túnel, remova proteção
ou envie URLs com tokens/dados privados para viabilizar o teste sem autorização.
Localhost não é acessível por esses serviços; nesse caso, registre a auditoria
externa como pendente e prossiga com verificações locais, sem inventar resultados.

1. **PageSpeed Insights:** abra https://pagespeed.web.dev/, informe a URL e clique
   em Analyze/Analisar. Aguarde o resultado e consulte mobile e desktop. Salve o
   link compartilhável e os detalhes dos diagnósticos, não apenas a nota geral.
2. **SpeedVitals:** abra https://speedvitals.com/ e acesse Website Speed Test.
   Informe a mesma URL; escolha, entre as opções disponíveis, dispositivo, rede
   e localização representativos do público. Registre essas configurações e
   salve o relatório, incluindo waterfall e recursos problemáticos quando
   disponíveis. Não ative monitoramento, assinatura ou teste pago sem autorização.
3. **Guarde evidências por página:** registre data, URL, versão testada, ferramenta,
   condições, links, métricas e arquivos envolvidos em
   `<pasta-da-pagina>/auditorias/<data-hora>-inicial-ou-final/RELATORIO.md`.
   Inclua exports oferecidos pela ferramenta ou capturas dos detalhes relevantes.
   Mantenha tudo fora da publicação e referencie em OTIMIZACAO-RESULTADO.md.
4. **Envie ao agente:** entregue os links dos dois relatórios e o caminho da pasta
   de evidências; se o agente não conseguir abrir o link, forneça o export ou os
   detalhes salvos. Sem acesso ao resultado, a conclusão fica pendente. Enviar
   para outro chat exige autorização do usuário; salvar o arquivo não comprova
   que outro agente o leu.
5. **Compare corretamente:** repita medições discrepantes; para decisões baseadas
   em pequenas diferenças, prefira três execuções equivalentes e a mediana por
   métrica. Compare antes/depois dentro da mesma ferramenta e configuração,
   sem escolher apenas a melhor execução nem equiparar notas de ferramentas distintas.

Pedido sugerido ao entregar o relatório:
> Analise os relatórios de PageSpeed Insights e SpeedVitals junto do código e
> das regras deste projeto. Relacione cada achado à causa provável, evidência,
> arquivo/seção, impacto, esforço, risco e teste de aceitação. Priorize até três
> melhorias 80/20; separe ações seguras, itens que exigem investigação e sugestões
> inaplicáveis. Não remova conteúdo ou interações para melhorar a nota.

Ao interpretar, o agente deve:
- Separar dados de laboratório dos dados reais do CrUX. No PageSpeed, dados reais
  refletem uma janela histórica de 28 dias e podem ser da origem inteira, não da
  página; ausência de amostra não significa aprovação ou falha. Não esperar que
  uma mudança recente apareça imediatamente nesses dados.
- Registrar LCP, CLS, FCP, TBT e TTFB quando disponíveis; registrar INP quando
  fornecido por dados de campo ou medição apropriada. TBT não é INP. Identificar
  elemento LCP, tarefas longas, requisições e recursos que sustentam o diagnóstico.
- Cruzar recomendações com a composição real: CSS/JS marcado como não utilizado
  não autoriza apagar menus, estados dinâmicos ou dependências de iframes. Validar
  hipóteses no código e no navegador antes de propor remoção.
- Distinguir gargalos de arquivos, execução e hospedagem. Não prometer corrigir
  resposta do servidor apenas minificando CSS, nem recomendar troca de hospedagem
  com base em uma execução isolada.
- Repetir os fluxos reais de scroll, menus, vídeos, formulários e CTAs após mudanças.
  Auditoria sintética não substitui os critérios de funcionamento e conclusão;
  a meta é melhorar a experiência, não buscar nota 100 a qualquer custo.

Referências: [PageSpeed: dados de laboratório e campo](https://developers.google.com/speed/docs/insights/v5/about)
e [SpeedVitals: execução e interpretação](https://speedvitals.com/).

## 2. Limpeza dos templates: remover sobras e duplicações
Faça esta análise em toda otimização de uma composição clonada; remova apenas
os itens com evidência suficiente. Não presuma que arquivos parecidos ou tudo
que veio da origem sejam descartáveis.

Ordem de ataque dentro da limpeza:
1. **Pacote publicado:** elimine da saída do build cópias antigas, originais já
   substituídos e arquivos internos. Mapeie dependências estáticas e dinâmicas
   por página e compartilhadas; preserve os originais recuperáveis fora da saída.
   Ausência de referência literal só indica um candidato, não comprova desuso.
2. **CSS acumulado:** incorpore correções definitivas às regras de origem e
   consolide uma base visual com estilos próprios de cada seção. Não envie
   ajustes de hero, garantia ou cabeçalho a documentos que não os utilizam.
3. **HTML excessivo:** investigue documentos desproporcionais e remova conteúdo
   descartado e marcação órfã. Não apague dados de hidratação ou scripts de
   controle apenas pelo tamanho; preservar o comportamento é obrigatório.
4. **JavaScript por necessidade:** inicialize apenas os componentes presentes;
   remova trabalho sem consumidor e duplicações comprovadas. Cache de um script
   compartilhado evita transferências, não sua execução em cada iframe.
5. **Isolamento preservado:** não una documentos ou runtimes de diferentes
   templates só para reduzir arquivos. Mudança arquitetural não é pré-requisito
   da limpeza; avalie separadamente benefício, compatibilidade e regressões.

Priorize até três ganhos comprováveis por rodada. Fontes já pequenas e mídias já
bem otimizadas não devem consumir esforço antes dessas sobras. Reduzir o pacote
publicado não equivale a reduzir o mesmo volume no tráfego de cada visitante.

- **Inventarie antes de excluir:** HTML, CSS, JS, fontes, mídias e recursos
  externos. Relacione cada candidato às seções e funções que o utilizam,
  considerando imports, URLs em CSS, templates JS e carregamento dinâmico.
- **Separe os candidatos:** duplicado equivalente, descartado sem consumidores,
  necessário ou uso incerto. Investigue os incertos; não os apague por suposição.
- **HTML:** retire seções descartadas, cabeçalhos extras, overlays, efeitos
  permanentemente desativados e markup órfão. Preserve menus mobile, abas,
  slides e estados temporários. Não deixe o runtime recriar conteúdo removido.
- **JavaScript:** retire imports, bundles, inicializadores, listeners, timers
  e observers exclusivos do conteúdo removido. Resolva inicializações repetidas
  e rotinas antigas de reparo quando sua causa já tiver sido eliminada.
- **Bibliotecas duplicadas:** compare conteúdo/hash, versão, configuração,
  consumidores e ordem de execução. Arquivos idênticos podem ser necessários
  em documentos isolados diferentes: compartilhar o arquivo não significa
  remover a inicialização de cada documento. Não una runtimes incompatíveis.
- **CSS:** remova estilos exclusivos dos blocos descartados, imports repetidos,
  regras contraditórias superadas e keyframes/font-face comprovadamente órfãos.
  Antes de consolidar, confira ordem da cascata, especificidade, media queries,
  variáveis, camadas e caminhos relativos de url().
- **Não use a primeira tela como prova de desuso:** cobertura de CSS/JS é pista,
  não autorização para apagar. Exercite hover, foco, menus, abas, carrosséis,
  breakpoints e conteúdo tardio; preserve seletores usados pelo JavaScript.
- **Fontes e mídias:** retire arquivos e preloads sem consumidores. Ao deduplicar,
  atualize HTML/CSS/JS, srcset e manifestos; guarde originais para recuperação
  fora da publicação. Nomes iguais não provam conteúdo igual, nem o inverso.
- **Terceiros herdados:** identifique widgets, pixels e integrações da referência
  que não pertencem à entrega aprovada. Remova os comprovadamente dispensáveis;
  preserve formulários, checkout, consentimento e medição exigidos pelo projeto.
- **Consolide e minifique depois da limpeza:** compartilhe recursos equivalentes
  e agrupe os pequenos arquivos usados juntos no hero, mantendo fontes editáveis.
  Preserve isolamento, execução e carga por seção; não crie um pacote gigante
  obrigatório na abertura. Não use substituições cegas em bundles minificados.
- **Pacote final:** exclua backups, briefings, relatórios, arquivos temporários e
  fontes de mídia não usadas. Confira o build para que esses arquivos não voltem
  à publicação. Não elimine arquivos internos necessários à manutenção do projeto.
- **Comprove a limpeza:** registre itens removidos/consolidados e justificativa;
  confira referências e compare requisições, bytes e comportamento antes/depois.
  Valide os estados afetados, recarregue e teste novamente a navegação. Se uma
  dependência continuar incerta, registre a pendência em vez de prometer limpeza total.

## Integração entre templates: uma página, não vários sites empilhados
Aplique os pontos afetados ao combinar seções ou ajustar identidade/interações;
na otimização, após a limpeza, confira se a composição final continua coerente.
Não repita etapas já aprovadas nem trate estes riscos como defeitos comprovados.
Prioridade 80/20: padrão visual compartilhado → emendas e alturas → navegação.
Preserve isolamento e comportamentos aprovados; não reconstrua a página.

1. **Padrão visual entre documentos.** Defina uma fonte central de valores para
   tipografia por função, cores, botões, larguras e espaçamentos. Aplique-a em
   cada documento isolado: CSS do documento principal não estiliza o interior
   dos iframes. Evite cópias divergentes das decisões de marca; preserve exceções
   intencionais, logos e demonstrações. Confira o conjunto em desktop e celular.
2. **Emendas, fundos e alturas.** Revise os encontros entre seções, não apenas
   cada seção sozinha. Defina quem controla o espaço externo para não somar
   margens do template, padding do contêiner e altura reservada do frame.
   Preserve fundos e transições aprovados; ajuste a altura ao conteúdo quando
   fontes, mídias ou painéis mudarem, sem ciclos de redimensionamento. Não use
   alturas gigantes ou cortes para disfarçar áreas vazias e sobreposições.
3. **Navegação e scroll únicos.** Centralize destinos e coordenação das âncoras;
   mantenha somente cabeçalhos e controladores de scroll intencionais. Em
   documentos isolados, mapeie cada destino ao frame e à seção corretos. Teste
   clique durante o carregamento, URL com hash, cabeçalho fixo e retorno pelo
   histórico. Priorize o destino e estime/refine alturas anteriores quando
   seguro, sem obrigar o download de todas as mídias anteriores para navegar.
4. **Responsividade na composição real.** Valide a largura efetiva recebida por
   cada seção, inclusive dentro de iframes, e tamanhos intermediários entre
   mobile e desktop. Confira textos longos, sticky, menus, alturas e orientação.
   Corrija o layout responsável; não use overflow hidden global, ocultação de
   conteúdo ou altura fixa excessiva para mascarar cortes e scroll duplo.
5. **Interações consistentes.** Harmonize cursores, entradas e regras de autoplay
   sem remover efeitos funcionais próprios. Preserve teclado, foco, movimento
   reduzido e pausa/retomada fora da tela ou após voltar pelo navegador. Confira
   se menus e modais ficam cortados pelo frame; quando precisarem cobrir a página,
   coordene sua abertura no contêiner principal preservando foco e fechamento.
   Evite reinicialização, listeners duplicados e recriação de seções ao rolar.
6. **Mapa mínimo de manutenção.** Registre, na pasta da página, identificação
   estável de cada seção, fonte editável, estilos, controlador e dependências
   compartilhadas ou exclusivas. Use um manifesto existente quando suficiente;
   não crie um sistema paralelo. Atualize o mapa ao remover/reordenar seções.
   Incorpore correções na origem em vez de acumular arquivos de sobrescrita
   sucessivos. Mantenha documentação interna fora do pacote publicado.

Aceite cada ajuste somente após comparar a composição e executar os estados
afetados, não apenas abrir a seção isolada. Registre o que foi observado,
implementado, validado e o que ainda é hipótese em OTIMIZACAO-RESULTADO.md.

## 3. Primeira seção: aparecer sem esperar a página inteira
- Carregue imediatamente o HTML, CSS e recursos necessários à primeira tela.
  Pré-carregue somente recursos críticos cuja descoberta esteja atrasada:
  por exemplo CSS principal, fonte usada no hero e imagem principal.
- Não esconda o hero aguardando animações de entrada, todas as imagens ou
  vídeos completos. Preserve carrosséis e outros efeitos funcionais.
- Em carrosséis, priorize as imagens inicialmente visíveis em cada faixa;
  carregue as próximas antes de entrarem em cena. Reserve espaço para evitar saltos.
- Quando necessário, use uma fila para imagens adicionais: na LP DB foram
  até três downloads simultâneos. Ajuste conforme a carga, sem bloquear o hero.
- Evite que seções distantes disputem a rede na abertura. Libere a carga
  progressiva após o conteúdo crítico, com saída em caso de falha e sem
  depender de um evento que possa nunca ocorrer. Ações do usuário têm prioridade.

## 4. Seções: carregar antes de aparecerem no scroll
- Primeira seção imediata; demais recursos por proximidade da viewport.
  Na LP DB, 600px de antecedência foi o ponto inicial, não uma constante universal.
- Em iframes, controle a atribuição de src; somente ocultar ou marcar lazy
  não comprova que downloads foram adiados. Em HTML único, preserve a estrutura
  e adie mídias/inicializadores que não são necessários na abertura.
- Reserve alturas/espaço para evitar saltos. Não descarte conteúdo de texto
  apenas para tornar a primeira medição mais leve.
- Menus com âncoras e URLs com hash devem carregar o destino e resolver alturas
  anteriores antes de posicionar o scroll. Não deixar o usuário esperando a rolagem.
- Ao sair da área visível, pause trabalho contínuo dispensável, preservando
  estado e retomada. Não descarte e recrie toda a seção a cada passagem.

## 5. Imagens: tamanho certo e arquivo otimizado
- Inventarie também fundos CSS, srcset, capas e imagens criadas por JavaScript.
- Meça o espaço ocupado nos breakpoints; gere dimensões adequadas considerando
  densidade de tela e variantes responsivas. Não entregue uma imagem enorme
  em um card pequeno nem use uma miniatura que fique borrada no desktop.
- Prefira WebP quando reduzir peso com qualidade aceitável. Compare com o
  original: converter AVIF ou SVG indiscriminadamente pode aumentar o arquivo
  ou prejudicar nitidez. Conversão obrigatória pedida pelo cliente é uma decisão
  separada; registre eventual aumento em vez de chamá-lo de otimização.
- Preserve transparência, recorte e legibilidade; atualize todas as referências.
  Mantenha originais recuperáveis fora do pacote publicado.
- Hero sem lazy-loading; imagens distantes progressivas. Confirme na rede
  que imagens fora de cena não estão baixando todas imediatamente.

## 6. Vídeos: compactar preservando a demonstração
- Ajuste resolução e compressão ao tamanho de exibição. Na LP DB foram usados
  H.264, faststart e até 1280px; escolha parâmetros conforme conteúdo e qualidade.
- Preserve áudio necessário, duração e sincronização. Não reduza FPS por regra:
  gravações de interface e animações precisam continuar fluidas e legíveis.
- Extraia uma capa do próprio vídeo e otimize-a. Adie o download pesado de
  vídeos distantes; reproduza ao entrar em cena quando esse for o comportamento aprovado.
- Valide play, pausa, retomada, loop e cada posição da timeline após compactar.
  No exemplo, clipes de 24fps mantiveram essa taxa; outros de 60fps foram para 30fps.

## 7. Fontes: no máximo três combinações
- Use no máximo três combinações de família/peso na página, salvo exceção
  explicitamente aprovada. Exemplo: uma família em 400, 500 e 600.
- O limite é de combinações usadas, não de arquivos: uma fonte variável pode
  cobrir vários pesos; subconjuntos de caracteres podem exigir mais de um arquivo.
- Retire imports, declarações e preloads de fontes substituídas somente após
  conferir o uso. Preserve acentos, símbolos e ícones; não gere pesos falsos.
- Prefira arquivos locais WOFF2 adequados quando disponíveis. Priorize apenas
  a fonte crítica; valide quebras de linha, fallback e estabilidade da troca.

## 8. Scroll e animações: trabalhar somente quando necessário
- Remova inicializações repetidas, timers de reparo e observers globais sem
  necessidade. Faça limpeza ao desmontar e agrupe leituras antes de escritas no DOM.
- Em documentos isolados, envie atualizações apenas a frames visíveis ou cujo
  estado mudou. Não faça scrollTo, medição de altura ou escrita sem alteração.
- Não dependa exclusivamente de requestAnimationFrame em iframe fora da tela
  para sua primeira medição: o navegador pode suspendê-lo e impedir o layout.
- Preserve uma rolagem nativa no mobile quando possível; evite interceptadores
  concorrentes, scroll duplo e redimensionamentos recursivos por altura da viewport.
- Identifique filtros e blurs grandes/sobrepostos. Otimize sua área/custo;
  remover um efeito aprovado exige decisão do usuário, não apenas ganho de FPS.
- Pause vídeos e animações contínuas dispensáveis fora da tela/aba; retome
  corretamente e preserve movimento reduzido. Não interrompa ações essenciais.

## 9. Entrega de arquivos e cache
- Confira Content-Encoding no servidor real antes de afirmar Brotli/Gzip.
  Compressão de transporte não substitui otimização de imagens e vídeos.
- Cache longo/immutable somente para arquivos com nome que muda junto do
  conteúdo; HTML e recursos de nome fixo precisam de política de atualização.
- Não aplique cache longo globalmente. Valide a atualização de uma versão e
  o funcionamento em subpastas; alterar configuração local não comprova deploy.

## 10. Validar, registrar e encerrar
- Valide cada lote coerente antes de ampliar mudanças. Compare cache vazio e
  recarga; repita medidas ruidosas sob condições equivalentes.
- Faça uma carga fria sem scroll e observe os downloads; depois role até o fim,
  salte por âncoras e volte ao topo. Confira conteúdo e ausência de saltos/cortes.
- Exercite controles afetados em desktop/mobile, teclado, foco, vídeos,
  timelines e pausa/retomada. Registre novos erros ou recursos quebrados.
- Corrija ou desfaça apenas a mudança responsável por regressão. Encerre ao
  validar o lote priorizado; não abra ciclos indefinidos por melhorias marginais.
- Salve `<pasta-da-pagina>/OTIMIZACAO-RESULTADO.md`, interno e fora da publicação,
  com: escopo; condições; medidas antes/depois; arquivos alterados; verificações;
  problemas anteriores; pendências; estado local/publicado. Não invente ganhos.

## Proteções de entrega
Aplique as proteções pertinentes durante a adaptação; confira as três antes da
entrega final. Em ajustes pontuais, valide o impacto sem iniciar uma auditoria
completa. Estes critérios não autorizam publicação nem testes em produção.

### Destinos de dados: não herdar os do template
- Antes de inserir dados reais, enviar formulários ou ativar integrações,
  identifique destinos de forms, fetch/XHR, beacons, pixels, analytics, chat,
  webhooks e scripts externos, inclusive os carregados após interação.
- Cada envio deve ter finalidade e destino aprovados para o cliente. Não basta
  trocar a aparência ou remover um ID visível: confira configurações, scripts
  e requisições reais. Não confunda CDN de recursos com destino de formulário;
  não bloqueie indiscriminadamente dependências visuais necessárias.
- Remova ou desative a integração herdada cujo destino não esteja aprovado e
  registre a pendência; não substitua por um destino inventado. Não desative
  integrações legítimas já aprovadas, consentimento ou funções essenciais.
- Teste com dados fictícios e interceptação ou ambiente de teste autorizado,
  sem gerar cobranças, leads ou mensagens reais. Confirme destino, payload
  esperado e ausência de envios residuais ao template; não grave dados pessoais
  ou segredos nos relatórios. Considere requisições dos documentos isolados.

### Carregamento incompleto: falhar sem perder a página
- Simule recursos lentos/indisponíveis, bloqueio de script externo e clique
  antes da inicialização. Confira imagem quebrada, vídeo sem carregar e seção
  tardia, tanto na carga inicial quanto após scroll ou navegação por âncora.
- Não condicione conteúdo essencial ou navegação a uma animação terminar ou
  a todas as mídias carregarem. Use espera limitada, estado de erro e retomada
  conforme o componente; impeça loaders eternos e inicializações duplicadas.
- Preserve espaço e ofereça fallback adequado: texto legível, capa ou mensagem
  de indisponibilidade. Se uma ação depende de serviço indisponível, explique
  a falha e permita nova tentativa segura; não use botão inerte nem simule
  sucesso. Evite reenvio automático que possa duplicar ações de negócio.
- Teste recuperação quando o recurso voltar, sem exigir recriar a página toda.
  Diferencie degradação aceitável de perda de conteúdo/interação essencial;
  não declare suporte offline completo apenas porque o HTML abriu.

### Pronto significa critérios cumpridos, não apenas página aberta
- Confirme conteúdo e ordem aprovados, identidade consistente, CTAs/destinos
  corretos, interações essenciais e layout responsivo sem conteúdo cortado.
  Na ausência de aprovação editorial, declare entrega técnica com aprovação
  pendente; nunca invente aceite do cliente.
- Execute os fluxos afetados em desktop e celular, incluindo teclado, estados
  tardios e falhas de carregamento relevantes. Confira referências no caminho
  de publicação e compare com a base anterior: screenshot, build ou HTTP 200
  isolados não comprovam funcionamento.
- Bloqueiam a conclusão: envio indevido de dados, CTA essencial quebrado,
  conteúdo necessário ausente/ilegível e regressão funcional ou visual relevante
  introduzida pelo trabalho. Não esconda bloqueios atrás de ganho de desempenho.
- No relatório da página, marque cada critério como validado, pendente ou não
  aplicável com motivo. Separe problemas anteriores, regressões novas e melhorias
  opcionais; informe limitações e o que não foi testado. Não declare ausência
  de regressões além dos cenários efetivamente verificados.
- Encerre quando o escopo aprovado e seus critérios forem cumpridos. Melhorias
  marginais ficam como sugestões, sem ciclos infinitos; entrega local validada
  não equivale a publicação nem autoriza deploy.

## Evidência que originou este roteiro
Histórico da conversa LP EASY BUILDER e registros locais de 13/10/2026:
- Hero: 18 CSS passaram a um arquivo; carrosséis receberam fila progressiva
  de três downloads adicionais, sem esperar todas as imagens para aparecer.
- Código/estilos envolvidos: 6.823.279 → 2.584.807 bytes sem compressão HTTP.
- 133 imagens convertidas; lote registrado: 7.733.654 → 3.235.842 bytes.
- Oito vídeos: 14.719.251 → 6.061.119 bytes; durações conferidas.
- Três blocos permanentemente ocultos removidos, incluindo quatro imagens.
Esses resultados vêm das etapas registradas, não de nova medição neste roteiro;
rodadas podem se sobrepor e suas economias não devem ser somadas. Não provam
um ganho específico de FPS/LCP. O limite de três combinações de fonte/peso e o
redimensionamento sistemático das imagens são regras para as próximas aplicações,
não resultados já comprovados para toda a landing. Últimos ajustes do hero/cache
foram relatados como locais naquele momento; publicação exige confirmação própria.

## Ferramentas open source: quando usar e como escolher
Use ferramentas existentes em vez de criar um minificador próprio. Escolha
conforme a fonte editável, o formato da entrega e o build existente; não instale
nem execute todas por padrão. Minificação reduz código, bundling agrupa arquivos,
e remoção de sobras exige comprovar dependências: são operações diferentes.
Nenhuma delas, sozinha, resolve conflitos entre templates ou comprova fidelidade.

| Ferramenta | Quando usar | Cuidados na composição clonada |
| --- | --- | --- |
| [Lightning CSS](https://lightningcss.dev/minification.html) | Primeira opção para minificar e simplificar CSS; útil em HTML estático ou integração compatível com o build. | Preserve cascata, ordem das folhas, caminhos de assets e navegadores suportados. Não use `unusedSymbols` sem comprovar desuso; minificar não autoriza juntar CSS de documentos isolados. |
| [esbuild](https://esbuild.github.io/api/) | Minificação rápida de JS e build de módulos próprios com dependências conhecidas; tree shaking quando aplicável. | Distinga script clássico de módulo. Preserve globais e pontos de entrada usados por HTML/outros scripts; não marque efeitos como descartáveis por suposição nem agrupe runtimes de origens diferentes. |
| [Terser](https://terser.org/docs/options/) | Alternativa ao esbuild quando for necessário controle detalhado de compressão e renomeação de JS herdado. | Preserve nomes de funções/classes quando usados pelo código. Evite renomear propriedades, ativar modo module/toplevel ou opções unsafe sem comprovar compatibilidade. Não execute depois do esbuild apenas para minificar novamente. |
| [PurgeCSS](https://purgecss.com/safelisting) | Reduzir CSS após mapear conteúdo, seletores dinâmicos e estados reais; começar por uma lista de candidatos à remoção. | Configure fontes de conteúdo e safelist; considere classes geradas por JS, CMS, menus, carrosséis, animações e breakpoints. Não aplique indiscriminadamente a bundles capturados; uma safelist incompleta pode remover estilos necessários. |
| [Parcel](https://parceljs.org/features/production/) | Sistema de build integrado para projetos compatíveis que precisam organizar entradas, dependências e otimização da saída. | Adotar é uma decisão de estrutura, não apenas compactação. Não substituir o build de Next.js ou migrar clones isolados automaticamente; primeiro comprovar compatibilidade de caminhos, scripts, múltiplas entradas e runtime. |

### Escolha 80/20
- **HTML/clones:** comece por Lightning CSS e uma ferramenta de JavaScript
  (esbuild OU Terser), com configuração conservadora e arquivos separados por
  contrato de execução. Só agrupe arquivos quando ordem, escopo e dependências
  forem conhecidos; não introduza um bundle global obrigatório na abertura.
- **Next.js ou outro framework com build:** aproveite as otimizações existentes.
  Integre apenas o que faltar, na fonte/configuração adequada. Não remende
  `.next`, chunks gerados ou arquivos com hash como solução permanente.
- **Limpeza avançada:** PurgeCSS é uma etapa posterior e condicionada à análise
  dos estados dinâmicos, nunca uma passagem automática por todo CSS encontrado.
- **Novo build estático:** avalie Parcel quando seus benefícios justificarem
  a adoção. Não migre uma entrega funcional só para economizar configuração.
- Se os arquivos já estiverem minificados ou o ganho for marginal, registre isso
  e priorize sobras, carga inicial e trabalho de execução. Não empilhe ferramentas.

### Procedimento de aplicação
1. Identifique entradas, formato de scripts, fontes, saída e configuração atual.
   Preserve um ponto recuperável e use versões compatíveis registradas no lockfile;
   não atualize dependências sem relação com o pedido.
2. Gere uma saída separada, mantendo a fonte editável e os avisos de licença
   exigidos. Falha de parsing não autoriza descartar o arquivo ou remover regras:
   preserve o original e registre a incompatibilidade para análise.
3. Atualize as referências pelo build/manifesto correspondente, respeitando
   `url()`, imports, hashes de conteúdo, cache e integridade quando existentes.
   Preserve separação dos documentos e ordem de execução; não altere só o conteúdo
   de um arquivo cujo nome/hash e referências ficaram desatualizados.
4. Compare tamanho original, minificado e transferido quando medido, além de
   requisições e comportamento. Minificação não é compressão HTTP; gerar `.gz`
   ou `.br` não comprova que a hospedagem entrega esses arquivos corretamente.
5. Execute os critérios de validação deste roteiro: desktop/mobile, estados
   dinâmicos, navegação, mídia e falhas pertinentes. Em regressão, retire apenas
   a transformação responsável. Registre ferramenta, versão, opções, resultados
   e pendências em OTIMIZACAO-RESULTADO.md; não declare segurança universal.

Estas são indicações para futuras aplicações: documentar uma ferramenta não
significa que ela foi instalada, executada ou validada nas páginas do projeto.

## Técnicas complementares pesquisadas
Use apenas quando o diagnóstico justificar; não transforme esta lista em
mudanças obrigatórias em todas as páginas. Fontes consultadas em 13/10/2026.

1. **Prioridade correta, sem download duplicado.** Se a imagem principal
   demora a iniciar, considere `fetchpriority="high"` somente nela. Para preload
   responsivo, alinhe `imagesrcset`/`imagesizes` com o `srcset`/`sizes` real.
   Não pré-carregue desktop e mobile nem formatos alternativos simultaneamente.
   Imagens descobertas cedo no HTML podem dispensar preload. Valide no Network
   qual variante baixou e se a mesma imagem foi solicitada desnecessariamente.
   Fontes: [Fetch Priority](https://web.dev/articles/fetch-priority) e
   [preload responsivo](https://web.dev/articles/preload-responsive-images).

2. **Embed leve até o uso.** Para players externos, mapas ou chat não essenciais
   à primeira tela, considere uma capa/botão local que inicialize o serviço ao
   interagir. Preserve dimensões, rótulo, teclado e resposta ao primeiro clique.
   Não adie formulários ou integrações essenciais indiscriminadamente; respeite
   autoplay e consentimento existentes. Valide antes e depois da ativação,
   inclusive com o serviço indisponível.
   Fonte: [fachadas para terceiros](https://developer.chrome.com/docs/lighthouse/performance/third-party-facades).

3. **Texto visível enquanto a fonte chega.** Além do limite de três combinações,
   configure `font-display` e uma fonte de fallback compatível. `swap` permite
   exibição imediata com fallback; `optional` pode manter a fonte alternativa
   naquela visita e deve respeitar a identidade aprovada. Verifique legibilidade,
   quebra de linhas e deslocamentos com cache vazio e rede lenta.
   Fonte: [carregamento de fontes](https://web.dev/articles/optimize-webfont-loading).

4. **Inicializações divididas, sem bloquear a interação.** Se o perfil mostrar
   tarefas longas, separe trabalho não crítico em lotes; considere
   `scheduler.yield()` com detecção de suporte e fallback compatível. Apenas
   marcar uma função como async ou aguardar Promise resolvida não garante uma
   oportunidade de pintura. Preserve ordem, estado e cancelamento; não divida
   operações que precisam ser atômicas. Valide cliques durante a inicialização.
   Fonte: [tarefas longas](https://web.dev/articles/optimize-long-tasks).

5. **Menos renderização fora da tela.** Em seções longas de HTML, avalie
   `content-visibility: auto` com `contain-intrinsic-size` ajustado. Isso reduz
   trabalho de layout/pintura; não substitui lazy-loading de arquivos nem remove
   seções descartadas. Não aplique globalmente: valide sticky, conteúdo que
   ultrapassa limites, âncoras, busca, acessibilidade e medições de iframes.
   Leituras frequentes de geometria podem anular a economia.
   Fonte: [content-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content-visibility).

6. **Vídeo com acesso parcial.** Quando reprodução ou busca na timeline exigir
   download excessivo, confira suporte a Range na hospedagem real. Uma requisição
   válida aceita deve retornar `206` com `Content-Range` correto; receber `200`
   pode significar entrega do arquivo inteiro. Teste pular para trechos ainda
   não baixados. Não simule cabeçalhos sem implementar a resposta parcial, nem
   imponha esse requisito a formatos de streaming com entrega própria.
   Fonte: [HTTP Range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests).

7. **Retorno rápido pelo botão Voltar.** Avalie a elegibilidade para bfcache;
   evite depender de `unload`. Trate saída/retorno com eventos de ciclo de vida
   adequados e confira `pageshow.persisted` ao restaurar. Não duplique listeners
   nem deixe animações permanentemente pausadas após voltar. Preserve políticas
   necessárias a dados sensíveis; teste navegação real de ida e volta, pois
   recarregar não valida bfcache.
   Fonte: [back/forward cache](https://web.dev/articles/bfcache).
