# 🎯 Cabeçalho Compartilhado - Daniel Moreira

Um cabeçalho global e responsivo que conecta todos os seus projetos GitHub Pages em um menu de navegação elegante e funcional.

## 📋 Como Usar

### 1. Adicione ao seu HTML

Coloque estas duas linhas no `<head>` do seu arquivo HTML:

```html
<link rel="stylesheet" href="https://danielmoreiradev.github.io/webp-resizer/shared-header.css">
<script src="https://danielmoreiradev.github.io/webp-resizer/shared-header.js"></script>
```

**Pronto!** O cabeçalho será injetado automaticamente no topo da página.

### 2. Personalize (Opcional)

Se você quiser adicionar mais projetos, edite o arquivo `shared-header.js` e adicione à configuração `PROJECTS`:

```javascript
const PROJECTS = {
  'seu-projeto': {
    name: 'Nome do Projeto',
    shortName: 'SP',
    url: 'https://danielmoreiradev.github.io/seu-projeto/'
  }
};
```

## ✨ Características

- ✅ **Responsivo** - Funciona em desktop, tablet e mobile
- ✅ **Menu Mobile** - Hamburger menu automático em telas pequenas
- ✅ **Detecção Automática** - Destaca o projeto atual no menu
- ✅ **Sem Dependências** - Usa apenas HTML/CSS/JS puro
- ✅ **Compatível** - Funciona com qualquer estrutura de página
- ✅ **Rápido** - CSS e JS minificado e otimizado

## 🎨 Personalização CSS

O cabeçalho usa variáveis CSS que podem ser sobrescritas:

```css
:root {
  --header-bg: #ffffff;
  --header-border: #e5e7eb;
  --header-text: #1f2937;
  --header-accent: #3b82f6;
}
```

## 📱 Breakpoints

- **Desktop**: 1400px
- **Tablet**: 768px
- **Mobile**: 480px

## 🔧 Estrutura de Projetos Suportados

Atualmente configurado para:

1. **WebP Resizer** - Otimizador de imagens em lote
2. **Paleta Studio** - Gerador de paletas de cores

## 📝 Notas

- O cabeçalho é injetado automaticamente antes do primeiro elemento do `<body>`
- Não interfere com estilos existentes da página
- O menu mobile aparece automaticamente em telas menores que 768px
- Links ativos são destacados em azul

## 🚀 Adicionar Novo Projeto

1. Copie `shared-header.css` e `shared-header.js` para seu repositório
2. Adicione o projeto na configuração `PROJECTS` em ambos os arquivos
3. Inclua as linhas de importação no seu HTML

Pronto! Seu projeto agora faz parte da rede de navegação.

---

**Desenvolvido por**: Daniel Moreira  
**GitHub**: [@danielmoreiradev](https://github.com/danielmoreiradev)
