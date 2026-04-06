# Promptário - Guia Completo de Engenharia de Prompts

## Sobre o Aplicativo

Promptário é um aplicativo web educacional moderno (SPA - Single Page Application) desenvolvido para Sicoob, que funciona como um guia completo para entender e dominar a engenharia de prompts com IA.

## Estrutura do Aplicativo

O app é totalmente contido em um único arquivo HTML (`index.html`) com:
- CSS incorporado
- JavaScript incorporado
- 10 páginas navegáveis via SPA (Single Page Application)

### Páginas Disponíveis

1. **HOME** - Página inicial com navegação para todas as seções e banner PWA
2. **CONCEITOS** - 11 cards expansíveis comparando conceitos fundamentais de IA
3. **MODELOS E AGREGADORES** - Biblioteca com 6 abas (Texto, Imagem, Vídeo, Áudio, Agregadores, Softwares)
4. **ENGENHARIA DE PROMPT** - 9 cards expansíveis explicando como montar prompts completos
5. **LINGUAGENS DE ESTRUTURAÇÃO** - 4 abas (JSON, YAML, Markdown, XML) com exemplos práticos
6. **GLOSSÁRIO** - 28 termos com busca e filtros por categoria
7. **PROMPT DE IMAGEM** - 10 cards expandíveis para direção criativa de imagens
8. **PROMPT DE VÍDEO** - 8 cards expandíveis para direção audiovisual
9. **PALAVRAS-CHAVE** - Banco visual de palavras com 63 cards em 5 categorias
10. **MOVIMENTOS DE CÂMERA** - 7 movimentos principais + bloco de dicas + 38 movimentos adicionais

## Design e Visual

- **Cores Principais:**
  - Primário: #00ae9d (teal)
  - Escuro: #003641 (navy)
  - Fundo: #ffffff (branco)

- **Tipografia:**
  - Família: Sicoob Sans (carregada do diretório `fonts/`)
  - Pesos: Light, Regular, Medium, SemiBold, Bold, ExtraBold

- **Componentes:**
  - Accordion/Cards expansíveis
  - Abas horizontais (scrolláveis em mobile)
  - Busca em tempo real
  - Filtros por categoria
  - Gráficos de barras em CSS puro
  - Blocos de código formatados
  - Vídeos nativos HTML5
  - Imagens com lazy loading

## Estrutura de Arquivos

```
/promptario/
├── index.html              # Arquivo principal (aplicativo completo)
├── manifest.json           # Configuração PWA
├── fonts/                  # Fontes Sicoob Sans
│   ├── SicoobSans-Light.ttf
│   ├── SicoobSans-Regular.ttf
│   ├── SicoobSans-Medium.ttf
│   ├── SicoobSans-SemiBold.ttf
│   ├── SicoobSans-Bold.ttf
│   └── SicoobSans-ExtraBold.ttf
├── assets/                 # Recursos de mídia
│   ├── logo.svg
│   ├── IMAGEM_LINGUAGENS_1.png
│   ├── VIDEO_VIDEO_1.mp4
│   ├── PALAVRACHAVE_*.png
│   └── VIDEO_MOVIMENTO_*.mp4
└── README.md              # Este arquivo
```

## Funcionalidades Principais

### Navegação
- Botões de navegação no topo de cada página
- Barra de navegação fixa na parte inferior (dark, com teal accent)
- Transições suaves entre páginas
- Volta para home via botão back arrow

### Interatividade
- **Accordions:** Clique para expandir/colapsar cards
- **Tabs:** Clique para alternar entre abas
- **Busca:** Filtro em tempo real no Glossário
- **Filtros:** Seleção por categoria
- **Exemplo Toggle:** Alternar entre estrutura e exemplo completo

### PWA (Progressive Web App)
- Banner "Adicionar à tela inicial" na home
- Manifest.json para instalação
- Funciona offline quando instalado

## Detalhes de Implementação

### CSS Architecture
- Variáveis CSS para cores e espaçamento
- Mobile-first responsive design
- Transições suaves (0.2s - 0.3s)
- Sombras personalizadas para profundidade
- Rounded corners em 16px (principal) e 10px (secundário)

### JavaScript
- Sem dependências externas
- Funções puras para navegação
- Toggle e filtro em tempo real
- Inicialização de conteúdo on-load

### Performance
- Single HTML file (88KB total)
- CSS minificado e incorporado
- JS nativo (sem frameworks)
- Lazy loading para imagens e vídeos

## Como Usar

1. **Abra o arquivo:** Abra `index.html` em um navegador moderno
2. **Navegue:** Use os botões de navegação ou a barra inferior
3. **Interaja:** Clique em accordions, abas e filtros
4. **Instale como app:** Clique no banner PWA para adicionar à tela inicial

## Compatibilidade

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Todos os navegadores mobile modernos

## Conteúdo Incluído

Toda o conteúdo foi extraído das instruções originais e incluído conforme especificado:
- Textos exatamente conforme fornecidos
- Ordem de items mantida
- Links externos em new tabs
- Estrutura de cards padronizada
- Exemplos completos inclusos

## Recursos Requeridos

Para uso completo, coloque os seguintes arquivos no diretório `assets/`:
- `logo.svg` - Logo Sicoob
- `IMAGEM_LINGUAGENS_1.png` - Imagem para página de Linguagens
- `VIDEO_VIDEO_1.mp4` - Vídeo para página de Vídeo
- `PALAVRACHAVE_1.png` até `PALAVRACHAVE_LUZ_36.png` - Imagens de referência
- `VIDEO_MOVIMENTO_1.mp4` até `VIDEO_MOVIMENTO_7.mp4` - Vídeos de movimentos

As fontes devem estar no diretório `fonts/` como listado acima.

## Notas Técnicas

- O arquivo HTML é um SPA completo (sem reload de página)
- Todos os dados estão em JavaScript (não há banco de dados)
- CSS grid é usado para layouts responsivos
- Transições CSS para animações suaves
- LocalStorage pode ser adicionado para persistência de estado

---

**Versão:** 1.0  
**Tipo:** Single Page Application  
**Linguagem:** Português Brasileiro  
**Framework:** Vanilla JavaScript/HTML/CSS
