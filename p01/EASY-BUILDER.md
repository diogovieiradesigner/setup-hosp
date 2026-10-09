# P01 — Easy Builder

## Inventario

Este pacote tem **35 arquivos** e esta **INCOMPLETO**.

    p01/index.html      OK  — a pagina inteira, pronta
    p01/index.css       OK  — todo o estilo
    p01/images/         21 arquivo(s)
    p01/components/     10 secao(oes), cada uma um documento independente
    p01/.eb-manifest.json  contagens exatas, para conferencia

> **Falta uma imagem de fundo para celular.** A URL de origem retorna HTTP 404; as outras 21 imagens foram baixadas para `p01/images/`.

## Trabalhando com uma IA nesta pasta

Se voce e um agente lendo isto: o pacote ja esta pronto. `p01/index.html` e a
pagina completa e funcional — nao ha nada para montar a partir dos
componentes, nem CSS para reconstruir. Comece perguntando o que a pessoa quer
mudar.

Se voce e a pessoa, cole isto no chat da sua IA:

    Baixei o template P01 do Easy Builder nesta pasta.
    Leia p01/EASY-BUILDER.md antes de mexer em qualquer arquivo:
    ele diz o que ja esta pronto e o que nao deve ser reconstruido.
    O que eu quero: <descreva aqui>

## Se algo parecer faltando, NAO reconstrua

O manifesto registra uma imagem pendente. O arquivo de origem está indisponível no servidor (HTTP 404). Em particular:

- **o CSS nao pode ser remontado a partir de `p01/components/`.** Os
  componentes saem sem estilo proprio; os estilos vivem apenas no
  `index.css`, que so o servidor do Easy Builder tem.
- **`index.html` e a pagina composta**: contem as secoes dos templates na ordem do comando, com CSS e scripts reunidos.

Confira pelo `p01/.eb-manifest.json`, nao pela listagem da pasta.

## Ao listar os arquivos

`images/` e `components/` vem ANTES de `index.*` na ordem alfabetica. Com
21 imagens, uma listagem truncada corta justamente os dois arquivos que
importam — e da a impressao de que nao foram baixados. Use o manifesto.

## Juntando varias secoes numa pagina so

Cada arquivo em `p01/components/` eh um documento COMPLETO e independente —
por isso cada um carrega sua propria copia dos scripts do Elementor.

Ao montar uma pagina unica com varias secoes, inclua os scripts UMA VEZ SO no
documento final. O JavaScript do Elementor se auto-inicializa ao carregar: duas
copias no mesmo documento inicializam os carrosseis duas vezes, e o sintoma eh
o slide pulando de dois em dois ou a animacao disparando em dobro.

Isso NAO vale para `index.html`: ele ja e o documento original, com os
scripts na ordem certa e uma vez so.

## Dependencia de rede

As imagens estao em `p01/images/` e nao precisam de internet. Fontes e
scripts do Elementor ainda vem de `easybuilder.com.br` — offline a pagina
renderiza, com fontes de fallback e sem os comportamentos de JS.
