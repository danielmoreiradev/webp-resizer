/**
 * CABEÇALHO COMPARTILHADO ENTRE PROJETOS
 * Renderiza um menu de navegação responsivo no topo da página
 */

(function () {
  'use strict';

  // Configuração de projetos
  const PROJECTS = {
    'webp-resizer': {
      name: 'WebP Resizer',
      shortName: 'WR',
      url: 'https://danielmoreiradev.github.io/webp-resizer/'
    },
    'paleta-studio': {
      name: 'Paleta Studio',
      shortName: 'PS',
      url: 'https://danielmoreiradev.github.io/paleta-studio/paleta-studio.html'
    }
  };

  // Detectar projeto atual baseado na URL
  function detectCurrentProject() {
    const url = window.location.href;
    if (url.includes('webp-resizer')) return 'webp-resizer';
    if (url.includes('paleta-studio')) return 'paleta-studio';
    return null;
  }

  // Criar HTML do cabeçalho
  function createHeaderHTML() {
    const currentProject = detectCurrentProject();
    
    const navLinks = Object.entries(PROJECTS)
      .map(([key, project]) => {
        const isActive = key === currentProject ? 'active' : '';
        return `<a href="${project.url}" class="${isActive}">${project.name}</a>`;
      })
      .join('');

    const mobileNavLinks = Object.entries(PROJECTS)
      .map(([key, project]) => {
        const isActive = key === currentProject ? 'active' : '';
        return `<a href="${project.url}" class="${isActive}">${project.name}</a>`;
      })
      .join('');

    return `
      <header class="shared-header" id="shared-header">
        <div class="shared-header-wrapper">
          <a href="https://github.com/danielmoreiradev" class="shared-header-logo" title="GitHub">
            <div class="shared-header-logo-icon">💜</div>
            <div class="shared-header-logo-text">
              Daniel Moreira
              <small>Ferramentas Web</small>
            </div>
          </a>
          
          <nav class="shared-header-nav">
            ${navLinks}
          </nav>

          <button class="shared-header-mobile-btn" id="mobile-menu-btn" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <div class="shared-header-mobile-menu" id="mobile-menu">
            ${mobileNavLinks}
          </div>
        </div>
      </header>
    `;
  }

  // Inicializar cabeçalho
  function init() {
    // Injetar CSS
    if (!document.getElementById('shared-header-styles')) {
      const link = document.createElement('link');
      link.id = 'shared-header-styles';
      link.rel = 'stylesheet';
      link.href = 'https://danielmoreiradev.github.io/webp-resizer/shared-header.css';
      document.head.appendChild(link);
    }

    // Esperar o CSS carregar e então injetar HTML
    // Se a página já tem <body>, injetar no início
    // Se não, esperar por DOMContentLoaded
    
    function injectHeader() {
      const headerHTML = createHeaderHTML();
      const body = document.body;
      
      if (body) {
        body.insertAdjacentHTML('afterbegin', headerHTML);
        setupMobileMenu();
        setActiveLink();
      }
    }

    if (document.body) {
      injectHeader();
    } else {
      document.addEventListener('DOMContentLoaded', injectHeader);
    }
  }

  // Setup do menu mobile
  function setupMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileBtn || !mobileMenu) return;

    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Fechar menu ao clicar em um link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.shared-header')) {
        mobileMenu.classList.remove('open');
      }
    });
  }

  // Definir link ativo baseado na URL atual
  function setActiveLink() {
    const currentProject = detectCurrentProject();
    const navLinks = document.querySelectorAll('.shared-header-nav a, .shared-header-mobile-menu a');

    navLinks.forEach(link => {
      link.classList.remove('active');
      
      if (link.href.includes(currentProject)) {
        link.classList.add('active');
      }
    });
  }

  // Iniciar quando documento estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expor função para sincronizar projeto ativo (caso necesário)
  window.updateSharedHeaderActive = setActiveLink;
})();
