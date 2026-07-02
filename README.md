# Otimizador de Imagens em Lote (v3.0 — Multi-Formato)

Ferramenta front-end leve (apenas HTML/JS/CSS) para redimensionar, converter, renomear, otimizar e baixar imagens em lote nos formatos JPG, PNG, WebP e ICO. A interface suporta drag & drop, pré-visualização, ajuste de escala e qualidade, seleção de formato de saída, renomeação em lote (prefixo) e empacotamento em ZIP para download.

> Aviso importante: este código foi gerado por IA para suprir uma necessidade específica de um desenvolvedor durante seu trabalho. Ele serve como ponto de partida funcional e prático, mas pode requerer revisões, testes adicionais e adaptações antes de uso em produção. Veja a seção "Observações sobre código gerado por IA" abaixo.

> Acesse na integra: https://danielmoreiradev.github.io/webp-resizer/

Principais recursos
- Upload via arrastar & soltar ou seleção de arquivos.
- Pré-visualização de imagens.
- Redimensionamento por escala percentual (1%–100%).
- **Conversão entre formatos**: exporte qualquer imagem de entrada (JPG, PNG, WebP, GIF, BMP) para o formato de saída escolhido — inclusive convertendo um formato em outro sem redimensionar.
- **Múltiplos formatos de saída**: JPG, PNG, WebP e ICO, cada um com controle de qualidade (exceto PNG e ICO, que não usam esse controle).
- **ICO (favicon)**: montado automaticamente a partir de um PNG interno, com suporte universal nos navegadores; a imagem é limitada a no máximo 256×256px.
- **Importação da web**: cole um link (URL) de imagem para baixá-la direto para a fila, ou cole (Ctrl+V) uma imagem copiada de qualquer lugar — sem precisar salvar no computador antes.
- **Preview ampliado**: clique na miniatura de qualquer item para ver a imagem em tamanho maior; se já foi reprocessada, mostra a comparação "Antes x Depois" lado a lado.
- **Excluir após reprocessar**: itens já processados também podem ser removidos individualmente da fila (útil para tirar um item específico e reprocessar o resto em outro formato).
- Preenchimento de fundo branco automático ao converter imagens com transparência para JPG (evita fundo preto).
- Renomeação em lote com prefixo (opcional).
- Download individual no formato processado ou download de todos em um arquivo ZIP.
- Interface redesenhada com paleta vibrante (azul-céu, verde, laranja e rosa), tipografia Outfit/Inter e identidade visual por formato (cada formato tem uma cor própria, usada de forma consistente nos controles, badges e botões).
- Utiliza apenas browser APIs + bibliotecas CDN (JSZip, FileSaver, Google Fonts).

Demo rápida (local)
1. Clone ou baixe o repositório.
2. Abra o arquivo `index.html` no navegador ou rode um servidor estático:
   - Python 3: `python -m http.server 8000`
   - Acesse: `http://localhost:8000/index.html`
3. Arraste imagens para a área "Adicionar Imagens", ajuste escala/qualidade, clique em "Processar Imagens" e depois baixe individualmente ou em ZIP.

Como usar
- Adicionar imagens: arraste/solte ou clique na área para selecionar arquivos.
- Formato de Saída: escolha JPG, PNG, WebP ou ICO — vale tanto para otimizar quanto para simplesmente converter de um formato para outro (ICO é indicado para favicons).
- Prefixo: defina um prefixo opcional para renomear a sequência (e dar nome ao ZIP).
- Escala (%): define o tamanho final relativo ao original (100% = sem mudança).
- Qualidade: ajusta a compressão ao exportar (desativada para PNG, que é sem perdas).
- Processar: converte todas as imagens na fila com as configurações atuais.
- Baixar: depois do processamento, baixe individualmente (no formato escolhido) ou todas em ZIP.

Estrutura de arquivos (resumida)
- index.html — aplicação principal (apenas front-end).
  - Usa Tailwind via CDN para estilos.
  - Usa JSZip e FileSaver via CDN para zip e download.
- (sugestão) README.md — este arquivo (documentação).
- (sugestão) LICENSE — escolha e adicione uma licença (ex.: MIT).

Dependências (CDN carregadas no index.html)
- Tailwind CSS (CDN)
- JSZip (cdnjs)
- FileSaver.js (cdnjs)

Implementação técnica (resumo)
- Conversão: cria um `<canvas>`, redesenha a imagem com a escala desejada e chama `canvas.toBlob(..., mime, quality)`, onde `mime` varia conforme o formato de saída escolhido (`image/jpeg`, `image/png` ou `image/webp`); para ICO, o resultado passa por uma etapa extra de empacotamento (ver seção de suporte a ICO abaixo).
- Suporte a ICO: não depende de `canvas.toBlob('image/x-icon')` (inexistente nos navegadores) — a imagem é renderizada como PNG e depois embrulhada manualmente no formato binário .ico (cabeçalho ICONDIR + ICONDIRENTRY + dados do PNG), técnica suportada desde Windows Vista / macOS 10.7+.
- Transparência: ao converter para JPG, o canvas recebe um preenchimento branco antes do desenho para evitar fundo preto em imagens com transparência.
- Estado: uma fila interna (`queue`) mantém objetos com metadados, blobs resultantes, tamanhos antes/depois, formato processado e estado de processamento.
- Geração de ZIP: usa JSZip para montar um arquivo com todos os blobs processados (com a extensão correta por item) e FileSaver para forçar o download.

Observações sobre código gerado por IA
- Origem: O projeto foi inicialmente gerado por uma IA para atender uma necessidade concreta do desenvolvedor.
- Revisão: recomenda-se leitura e revisão do código antes de utilizá-lo em ambientes sensíveis ou produção.
- Segurança: o processamento é feito localmente no navegador — nenhum arquivo é enviado a servidores externos pela implementação atual. Ainda assim, confirme dependências externas (CDNs) para uso em ambientes corporativos.
- Manutenção: a IA criou um ponto de partida funcional; a lógica pode ser otimizada (ex.: tratamento de memória, cancelamento de processamento, suporte a EXIF/orientação, testes automatizados, suporte a grandes lotes).
- Responsabilidade: a IA pode ter introduzido decisões que não se alinham às suas práticas; verifique e ajuste conforme necessário.

Limitações conhecidas
- Compatibilidade: conversão via canvas depende do suporte do navegador (Chrome, Edge, Firefox recentes suportam bem WebP/JPG/PNG; alguns navegadores/mobile antigos podem não).
- ICO: pensado para favicons, por isso a imagem exportada é limitada a no máximo 256×256px (redimensionada automaticamente mantendo a proporção, se necessário).
- Importação via URL: depende da política de CORS do site de origem — alguns servidores bloqueiam o download direto via JavaScript; nesses casos, baixe a imagem manualmente e arraste-a para a ferramenta.
- Orientação EXIF: imagens com orientação especial podem não preservar rotação corretamente (não há leitura automática de EXIF neste código).
- Grandes lotes: processar muitas imagens grandes no cliente pode consumir muita memória e CPU — considerar processamento por lotes/paginação.
- Tipos de entrada: atualmente filtra por `image/*` (e por extensão dentro de ZIPs). Ajustes adicionais podem ser necessários para formatos específicos.

Melhorias sugeridas
- Suporte a EXIF para manter orientação correta.
- Barra de progresso por imagem e global.
- Cancelamento do processamento em andamento.
- Pré-processamento por lotes (chunking) para economizar memória.
- Testes automatizados e integração contínua.
- Substituir CDNs por dependências locais ou bundling para ambientes offline/segurança.
- UI/UX: feedback visual mais detalhado, acessibilidade (a11y) e suporte a teclado.

Contribuindo
- Abra uma issue para sugestões, bugs ou solicitações de melhoria.
- Pull requests são bem-vindos. Se o PR for baseado em código gerado por IA, por favor documente o que foi alterado e por quê.

Reportar problemas
- Use a aba "Issues" do repositório para relatar bugs ou pedir features. Descreva:
  - Passos para reproduzir
  - Navegador e versão
  - Um ou mais arquivos de imagem usados (se possível)

Licença
- Não há licença incluída por padrão neste repositório. Recomenda-se adicionar uma licença explícita (por exemplo MIT) se você pretende permitir uso e contribuições abertas.

Créditos
- Desenvolvedor: @devdanielmoreira
- Ferramentas / libs: Tailwind CSS, JSZip, FileSaver.js
- Implementação inicial gerada por IA (assistente), adaptada posteriormente conforme necessidade do desenvolvedor.

Contato
- GitHub: https://github.com/devdanielmoreira
- Para dúvidas sobre a geração/ajustes do código, abra uma issue no repositório.

Notas finais
Este projeto é um utilitário prático para otimização e preparação rápida de imagens em WebP durante fluxos de trabalho de desenvolvimento. Como parte do fluxo, o fato do código ter sido gerado por IA é explicitado para transparência — use-o como base, melhore, e adapte às suas necessidades.
