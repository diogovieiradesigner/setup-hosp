#!/usr/bin/env bash
# Prepara páginas estáticas para Cloudflare Pages. Cada pasta com index.html
# vira /<nome-da-pasta>/; os assets permanecem dentro do próprio slug.

set -euo pipefail

OUT="_site"
rm -rf "$OUT"
mkdir -p "$OUT"

for file in index.html 404.html _headers _redirects; do
  if [ -f "$file" ]; then
    cp "$file" "$OUT/$file"
  fi
done

if [ -d assets ]; then
  cp -R assets "$OUT/assets"
fi

pages=0
legacy=0
for dir in */; do
  [ -d "$dir" ] || continue
  slug="${dir%/}"
  case "$slug" in
    _site|assets|functions|node_modules|scripts|.*) continue ;;
  esac

  if [ -f "$dir/index.html" ]; then
    entry="$dir/index.html"
  elif [ -f "$dir/html/index.html" ]; then
    entry="$dir/html/index.html"
    legacy=$((legacy + 1))
  elif [ -f "$dir/manifest.json" ]; then
    echo "Erro: $slug tem manifest.json mas não tem index.html compatível." >&2
    exit 1
  else
    continue
  fi

  cp -R "$dir" "$OUT/$slug"
  # Keep the private client briefing in source control, not in the published page.
  rm -f "$OUT/$slug/BRIEFING-PREENCHIDO.md"
  if [ "$entry" = "$dir/html/index.html" ]; then
    # Exports antigos guardam o HTML um nível abaixo dos seus assets/CSS/JS.
    sed \
      -e 's#\.\./assets/#assets/#g' \
      -e 's#\.\./css/#css/#g' \
      -e 's#\.\./javascript/#javascript/#g' \
      "$entry" > "$OUT/$slug/index.html"
    rm -rf "$OUT/$slug/html"
  fi
  pages=$((pages + 1))
done

files=$(find "$OUT" -type f | wc -l | tr -d ' ')
if [ "$files" -gt 20000 ]; then
  echo "Erro: $files arquivos na saída; o plano Free do Cloudflare Pages aceita até 20000." >&2
  exit 1
fi

echo "Build pronto: $pages página(s), $legacy export(s) antigo(s), $files arquivo(s) em $OUT/."
