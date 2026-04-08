/* ── helpers ── */
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
  lucide.createIcons();
}
function toggleAccordion(el){
  el.closest('.accordion-card').classList.toggle('open');
}
function installPWA(){
  if(window._deferredPrompt){window._deferredPrompt.prompt()}
}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();window._deferredPrompt=e});

/* ── buildAccordion ── */
function buildAccordion(containerId, cards) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  cards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'accordion-card';

    const header = document.createElement('div');
    header.className = 'accordion-header';
    header.onclick = function() { toggleAccordion(this); };

    const titleSummary = document.createElement('div');
    titleSummary.className = 'accordion-header-text';

    const title = document.createElement('h3');
    title.className = 'accordion-title';
    title.textContent = card.title;

    const summary = document.createElement('p');
    summary.className = 'accordion-summary';
    summary.textContent = card.summary;

    titleSummary.appendChild(title);
    titleSummary.appendChild(summary);

    const icon = document.createElement('div');
    icon.className = 'accordion-icon';
    icon.innerHTML = '<i data-lucide="plus"></i>';

    header.appendChild(titleSummary);
    header.appendChild(icon);

    const body = document.createElement('div');
    body.className = 'accordion-body';

    const contentWrap = document.createElement('div');
    contentWrap.className = 'accordion-content';

    if (card.sections && card.sections.length > 0) {
      card.sections.forEach(section => {
        const sectionEl = document.createElement('div');
        sectionEl.className = 'accordion-section';

        const sectionTitle = document.createElement('h4');
        sectionTitle.className = 'accordion-section-title';
        sectionTitle.textContent = section.title;
        sectionEl.appendChild(sectionTitle);

        if (section.subtitle) {
          const subtitle = document.createElement('p');
          subtitle.className = 'accordion-section-subtitle';
          subtitle.textContent = section.subtitle;
          sectionEl.appendChild(subtitle);
        }

        if (section.highlight) {
          const highlightBox = document.createElement('div');
          highlightBox.className = 'highlight-box';

          const text = document.createElement('p');
          text.textContent = section.text;
          highlightBox.appendChild(text);

          if (section.support) {
            const support = document.createElement('p');
            support.className = 'hs';
            support.textContent = section.support;
            highlightBox.appendChild(support);
          }

          sectionEl.appendChild(highlightBox);
        } else {
          const text = document.createElement('p');
          text.textContent = section.text;
          sectionEl.appendChild(text);
        }

        if (section.items && section.items.length > 0) {
          const list = document.createElement('ul');
          list.className = 'mini-list';
          section.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
          });
          sectionEl.appendChild(list);
        }

        contentWrap.appendChild(sectionEl);
      });
    }

    body.appendChild(contentWrap);
    cardEl.appendChild(header);
    cardEl.appendChild(body);
    container.appendChild(cardEl);
  });

  lucide.createIcons();
}

/* ── buildExampleBlock ── */
function buildExampleBlock(containerId, title, intro, structureItems, exampleHTML) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'example-header';

  const headerTitle = document.createElement('h3');
  headerTitle.textContent = title;
  header.appendChild(headerTitle);

  const intro_p = document.createElement('p');
  intro_p.className = 'example-intro';
  intro_p.textContent = intro;
  header.appendChild(intro_p);

  const buttons = document.createElement('div');
  buttons.className = 'example-toggle';

  const btnStructure = document.createElement('button');
  btnStructure.className = 'toggle-btn active';
  btnStructure.textContent = 'Ver estrutura';
  btnStructure.onclick = function() { toggleExample(containerId, 'structure'); };

  const btnExample = document.createElement('button');
  btnExample.className = 'toggle-btn';
  btnExample.textContent = 'Ver exemplo pronto';
  btnExample.onclick = function() { toggleExample(containerId, 'example'); };

  buttons.appendChild(btnStructure);
  buttons.appendChild(btnExample);
  header.appendChild(buttons);

  const structureView = document.createElement('div');
  structureView.className = 'example-view structure-view active';
  structureView.id = containerId + '-structure';

  const list = document.createElement('ol');
  list.className = 'example-steps';
  structureItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
  structureView.appendChild(list);

  const exampleView = document.createElement('div');
  exampleView.className = 'example-view example-view-content';
  exampleView.id = containerId + '-example';

  const promptBlock = document.createElement('div');
  promptBlock.className = 'prompt-block';
  promptBlock.innerHTML = exampleHTML;
  exampleView.appendChild(promptBlock);

  container.appendChild(header);
  container.appendChild(structureView);
  container.appendChild(exampleView);
}

function toggleExample(containerId, view) {
  const structureView = document.getElementById(containerId + '-structure');
  const exampleView = document.getElementById(containerId + '-example');
  const buttons = document.querySelectorAll('#' + containerId + ' .btn-example');

  if (view === 'structure') {
    structureView.classList.add('active');
    exampleView.classList.remove('active');
    buttons[0].classList.add('active');
    buttons[1].classList.remove('active');
  } else {
    structureView.classList.remove('active');
    exampleView.classList.add('active');
    buttons[0].classList.remove('active');
    buttons[1].classList.add('active');
  }
}

/* ── initConceitos ── */
function initConceitos() {
  const cards = [
    {
      title: "Modo rápido x modo raciocínio",
      summary: "Um responde pela continuação mais provável. O outro organiza melhor o caminho antes de responder.",
      sections: [
        {
          title: "O que é",
          subtitle: "Modo rápido",
          text: "No modo rápido, a IA funciona como se partisse de uma pergunta central: \"qual é a continuação mais provável do que o usuário escreveu?\". A partir disso, ela monta uma resposta coerente, fluida e convincente com alta velocidade. Isso faz com que muitas vezes a resposta pareça boa mesmo quando não está totalmente correta."
        },
        {
          title: "O que é",
          subtitle: "Modo raciocínio",
          text: "No modo raciocínio, a IA trabalha de forma mais cuidadosa. Em vez de apenas continuar o pedido de forma provável, ela se orienta por perguntas internas como: \"qual é o objetivo real aqui?\", \"de quais informações eu preciso?\", \"quais passos fazem mais sentido?\" e \"qual resposta será mais correta, clara e alinhada às regras?\". A partir disso, ela estrutura melhor o caminho antes de entregar a resposta final."
        },
        {
          title: "Diferença prática",
          text: "O modo rápido prioriza velocidade e fluidez. O modo raciocínio prioriza estrutura, análise e maior cuidado com a qualidade da resposta."
        },
        {
          title: "Exemplo prático",
          text: "Se a pessoa pede um texto simples, uma adaptação curta ou uma resposta rápida, o modo rápido pode funcionar muito bem. Se a tarefa envolve lógica, comparação, regras, precisão, etapas ou decisão, o modo raciocínio tende a ser mais adequado."
        },
        {
          title: "Por que isso importa",
          text: "Entender essa diferença ajuda a escolher melhor o tipo de resposta que você espera. Nem toda tarefa precisa de mais profundidade, mas tarefas mais complexas geralmente se beneficiam de um processamento mais cuidadoso."
        }
      ]
    },
    {
      title: "IA generativa x IA analítica",
      summary: "Uma é voltada para criar conteúdo novo. A outra é voltada para analisar dados, classificar e apoiar decisões.",
      sections: [
        {
          title: "O que é",
          subtitle: "IA generativa",
          text: "A IA generativa é voltada para criar conteúdo novo a partir de padrões aprendidos em grandes volumes de dados. Ela pode gerar textos, imagens, vídeos, áudios, códigos e outras saídas originais com base em comandos, contexto e exemplos."
        },
        {
          title: "O que é",
          subtitle: "IA analítica",
          text: "A IA analítica é usada para analisar, classificar e prever. Ela identifica padrões em dados para apoiar decisões e operações. É comum em tarefas como detectar fraudes, prever inadimplência, classificar documentos, recomendar produtos e identificar comportamentos."
        },
        {
          title: "Diferença prática",
          text: "A IA generativa produz algo novo. A IA analítica examina dados para encontrar padrões, organizar informação e apoiar decisões."
        },
        {
          title: "Exemplo prático",
          text: "Pedir para uma IA escrever um e-mail, criar uma imagem ou montar um roteiro é um uso generativo. Usar IA para classificar documentos, detectar anomalias em transações ou recomendar uma próxima ação comercial é um uso analítico."
        },
        {
          title: "Por que isso importa",
          text: "Muita gente chama tudo de IA como se fosse a mesma coisa, mas são aplicações diferentes. Entender essa distinção ajuda a escolher a solução certa para cada tipo de problema."
        }
      ]
    },
    {
      title: "IA analítica x IA preditiva",
      summary: "Toda IA preditiva é analítica, mas nem toda IA analítica é preditiva.",
      sections: [
        {
          title: "O que é",
          subtitle: "IA analítica",
          text: "A IA analítica observa dados para classificar, identificar padrões, organizar informações e apoiar decisões. Ela pode analisar o presente ou o passado para extrair valor dos dados."
        },
        {
          title: "O que é",
          subtitle: "IA preditiva",
          text: "A IA preditiva é um tipo de IA analítica focada em estimar o que pode acontecer com base em históricos. Ela usa padrões anteriores para prever comportamentos, riscos, probabilidades ou tendências futuras."
        },
        {
          title: "Diferença prática",
          text: "A IA analítica tem um escopo mais amplo. A IA preditiva é uma categoria dentro dela, voltada especificamente para antecipar cenários futuros com base em dados anteriores."
        },
        {
          title: "Exemplo prático",
          text: "Classificar automaticamente documentos é um uso analítico. Prever chance de inadimplência, risco de churn ou probabilidade de conversão é um uso preditivo."
        },
        {
          title: "Por que isso importa",
          text: "Essa diferença evita confusão conceitual. Nem toda análise de dados está tentando prever o futuro. Às vezes o objetivo é apenas classificar, detectar ou organizar."
        }
      ]
    },
    {
      title: "Ferramenta x agente",
      summary: "Na ferramenta, você pede e ela entrega. No agente, você define o objetivo e ele executa etapas por conta própria.",
      sections: [
        {
          title: "O que é",
          subtitle: "Ferramenta",
          text: "Quando a IA funciona como ferramenta, ela responde a comandos diretos. Você pede algo específico e ela entrega aquela saída. Pode gerar um texto, resumir um documento, criar uma imagem ou transformar um conteúdo. O controle do processo continua majoritariamente com a pessoa usuária."
        },
        {
          title: "O que é",
          subtitle: "Agente",
          text: "Quando a IA funciona como agente, ela recebe um objetivo e pode executar múltiplas etapas para chegar ao resultado. Ela pode pesquisar, comparar alternativas, tomar decisões intermediárias, organizar uma sequência de ações e consolidar uma entrega mais completa com menos intervenção humana a cada passo."
        },
        {
          title: "Diferença prática",
          text: "Na ferramenta, a lógica é comando e resposta. No agente, a lógica é objetivo, planejamento e execução em etapas."
        },
        {
          title: "Exemplo prático",
          text: "Pedir \"resuma este relatório\" é usar IA como ferramenta. Pedir \"analise este relatório, compare com os dados anteriores e me entregue uma recomendação final\" se aproxima mais de um comportamento de agente."
        },
        {
          title: "Por que isso importa",
          text: "Essa diferença muda a forma como a pessoa delega trabalho. Em um caso, a IA ajuda em tarefas pontuais. No outro, ela assume partes maiores do fluxo."
        }
      ]
    },
    {
      title: "Temperatura baixa x temperatura alta",
      summary: "Temperatura baixa tende a mais consistência. Temperatura alta tende a mais criatividade e variação.",
      sections: [
        {
          title: "O que é",
          subtitle: "Temperatura baixa",
          text: "Temperatura baixa deixa a IA mais conservadora, previsível e consistente. É mais indicada quando o objetivo é reduzir variações e manter maior estabilidade na resposta."
        },
        {
          title: "O que é",
          subtitle: "Temperatura alta",
          text: "Temperatura alta deixa a IA mais criativa, variada e imprevisível. É mais indicada quando o objetivo é explorar possibilidades, abrir caminhos e gerar saídas menos óbvias."
        },
        {
          title: "Diferença prática",
          text: "Temperatura baixa favorece precisão, consistência e repetibilidade. Temperatura alta favorece criatividade, diversidade e experimentação."
        },
        {
          title: "Exemplo prático",
          text: "Para resumo, padronização, organização de dados e respostas factuais, temperatura baixa costuma ser melhor. Para brainstorming, nomes, ideias de campanha e textos mais criativos, temperatura alta pode gerar resultados mais interessantes."
        },
        {
          title: "Por que isso importa",
          text: "Muita gente avalia uma IA sem perceber que o comportamento dela pode mudar bastante com esse ajuste. A temperatura influencia diretamente o estilo da saída."
        }
      ]
    },
    {
      title: "Contexto x instrução",
      summary: "Instrução é o que a IA deve fazer. Contexto é o que ela precisa saber para fazer melhor.",
      sections: [
        {
          title: "O que é",
          subtitle: "Contexto",
          text: "Contexto é o conjunto de informações que ajuda a IA a entender a situação, o cenário, o público, o objetivo, as restrições e o ambiente da tarefa. Ele dá base para uma resposta mais alinhada."
        },
        {
          title: "O que é",
          subtitle: "Instrução",
          text: "Instrução é o comando em si. É o que você quer que a IA execute: resumir, reescrever, classificar, criar, comparar, organizar, responder ou transformar."
        },
        {
          title: "Diferença prática",
          text: "A instrução diz o que fazer. O contexto ajuda a IA a entender como fazer melhor."
        },
        {
          title: "Exemplo prático",
          text: "Dizer \"escreva um e-mail\" é uma instrução. Acrescentar \"é para um público executivo, com tom profissional, curto e objetivo\" é contexto."
        },
        {
          title: "Por que isso importa",
          text: "Muitas respostas ruins não acontecem porque a IA não sabe executar a tarefa, mas porque recebeu pouco contexto para entender o cenário corretamente."
        }
      ]
    },
    {
      title: "Automação x autonomia",
      summary: "Automação segue um fluxo definido. Autonomia decide parte do caminho.",
      sections: [
        {
          title: "O que é",
          subtitle: "Automação",
          text: "Automação é quando um processo já está desenhado e a IA ou o sistema executa etapas previstas dentro de um fluxo definido. Há menos liberdade de decisão no meio do caminho."
        },
        {
          title: "O que é",
          subtitle: "Autonomia",
          text: "Autonomia é quando a IA consegue decidir parte da rota para chegar ao objetivo. Ela pode escolher passos intermediários, adaptar ações e responder ao contexto com mais independência."
        },
        {
          title: "Diferença prática",
          text: "Na automação, o caminho já está estruturado. Na autonomia, parte do caminho pode ser decidido durante a execução."
        },
        {
          title: "Exemplo prático",
          text: "Um fluxo que sempre recebe um documento, extrai dados e envia para um sistema é automação. Um sistema que decide se deve pesquisar mais, pedir confirmação, comparar opções e só depois agir tem mais autonomia."
        },
        {
          title: "Por que isso importa",
          text: "Essa diferença afeta risco, controle, governança e desenho de processo. Nem toda operação pede autonomia. Em muitos casos, um fluxo automatizado e bem definido é mais seguro."
        }
      ]
    },
    {
      title: "Memória curta x memória persistente",
      summary: "Uma vale só para a conversa ou tarefa atual. A outra pode manter preferências e informações ao longo do tempo.",
      sections: [
        {
          title: "O que é",
          subtitle: "Memória curta",
          text: "Memória curta é o contexto usado apenas dentro da conversa, da sessão ou da tarefa atual. Ela ajuda a IA a manter continuidade naquele momento, mas não necessariamente permanece disponível depois."
        },
        {
          title: "O que é",
          subtitle: "Memória persistente",
          text: "Memória persistente é quando certas preferências, informações recorrentes ou configurações podem ser mantidas ao longo do tempo para uso futuro, dentro dos limites definidos pelo sistema."
        },
        {
          title: "Diferença prática",
          text: "A memória curta sustenta a continuidade imediata. A memória persistente sustenta consistência entre interações diferentes ao longo do tempo."
        },
        {
          title: "Exemplo prático",
          text: "Lembrar o assunto tratado alguns minutos antes na mesma conversa é memória curta. Lembrar que uma pessoa prefere respostas mais objetivas em interações futuras é um exemplo de memória persistente."
        },
        {
          title: "Por que isso importa",
          text: "Essa diferença ajuda a entender por que a IA às vezes mantém o contexto atual muito bem, mas não necessariamente \"lembra\" de tudo fora daquela interação."
        }
      ]
    },
    {
      title: "Multimodal x unimodal",
      summary: "Uma IA trabalha com vários tipos de entrada e saída. A outra opera em um único tipo principal.",
      sections: [
        {
          title: "O que é",
          subtitle: "Unimodal",
          text: "Uma IA unimodal opera principalmente em um único tipo de dado, como apenas texto, apenas imagem ou apenas áudio."
        },
        {
          title: "O que é",
          subtitle: "Multimodal",
          text: "Uma IA multimodal consegue lidar com mais de um tipo de dado, como texto, imagem, áudio, vídeo e documentos, combinando esses formatos para entender melhor a tarefa e gerar respostas mais amplas."
        },
        {
          title: "Diferença prática",
          text: "A IA unimodal é focada em um formato principal. A multimodal cruza formatos diferentes para interpretar ou responder."
        },
        {
          title: "Exemplo prático",
          text: "Uma IA que apenas escreve texto é unimodal. Uma IA que consegue ler um PDF, interpretar uma imagem e responder em texto já atua de forma multimodal."
        },
        {
          title: "Por que isso importa",
          text: "Essa distinção ajuda a entender o alcance real de cada ferramenta. Muitas tarefas modernas exigem combinar formatos, não apenas trabalhar com texto isolado."
        }
      ]
    },
    {
      title: "Copilot x autopilot",
      summary: "Um ajuda você a fazer. O outro executa mais por conta própria.",
      sections: [
        {
          title: "O que é",
          subtitle: "Copilot",
          text: "No modo copilot, a IA funciona como parceira de execução. Ela sugere, acelera, organiza, revisa e apoia decisões, mas continua trabalhando ao lado da pessoa, que conduz o processo principal."
        },
        {
          title: "O que é",
          subtitle: "Autopilot",
          text: "No modo autopilot, a IA assume uma parte maior da execução e conduz mais etapas sozinha, com menos intervenção humana contínua."
        },
        {
          title: "Diferença prática",
          text: "No copilot, a pessoa continua no centro da operação. No autopilot, a IA assume um papel mais ativo na condução do trabalho."
        },
        {
          title: "Exemplo prático",
          text: "Uma IA que sugere melhorias em um texto enquanto você decide tudo é copilot. Um sistema que recebe o objetivo, processa etapas e entrega algo quase pronto com mínima intervenção se aproxima de autopilot."
        },
        {
          title: "Por que isso importa",
          text: "Essa diferença ajuda a ajustar expectativa, responsabilidade e supervisão. Quanto maior a independência do sistema, maior costuma ser a necessidade de desenho cuidadoso e governança."
        }
      ]
    },
    {
      title: "Zero-shot x few-shot",
      summary: "No zero-shot, você pede direto. No few-shot, você mostra alguns exemplos antes.",
      sections: [
        {
          title: "O que é",
          subtitle: "Zero-shot",
          text: "Zero-shot é quando você pede uma tarefa sem fornecer exemplos prévios. A IA precisa executar apenas com base na instrução e no contexto disponível."
        },
        {
          title: "O que é",
          subtitle: "Few-shot",
          text: "Few-shot é quando você fornece alguns exemplos de entrada e saída antes da tarefa principal. Com isso, a IA entende melhor o padrão esperado e tende a responder de forma mais alinhada."
        },
        {
          title: "Diferença prática",
          text: "No zero-shot, a IA trabalha só com o pedido. No few-shot, ela usa exemplos como referência para imitar estrutura, estilo, formato ou lógica."
        },
        {
          title: "Exemplo prático",
          text: "Dizer \"crie uma legenda para este post\" é zero-shot. Mostrar duas ou três legendas-modelo antes e depois pedir uma nova é few-shot."
        },
        {
          title: "Por que isso importa",
          text: "Essa diferença é muito útil quando o resultado precisa seguir um padrão. Em vários casos, poucos exemplos melhoram bastante a qualidade da resposta."
        }
      ]
    }
  ];

  buildAccordion('conceitos-list', cards);
}

/* ── initEngenharia ── */
function initEngenharia() {
  const cards = [
    {
      title: "Contexto e papel",
      summary: "Define quem o modelo deve ser e qual é sua missão principal.",
      sections: [
        {
          title: "O que é",
          text: "Nesta parte, você diz qual papel o modelo vai assumir e em que contexto ele está operando. É aqui que você orienta a identidade funcional da IA e o objetivo principal da tarefa."
        },
        {
          title: "Por que isso importa",
          text: "Sem contexto e sem papel, a IA tende a responder de forma genérica. Quando essa parte está bem escrita, a resposta costuma ficar mais alinhada ao objetivo real."
        },
        {
          title: "O que costuma entrar nessa parte",
          items: [
            "qual papel o modelo deve assumir",
            "qual missão principal ele deve cumprir",
            "em que tipo de contexto ele está atuando"
          ]
        },
        {
          title: "Mini exemplo",
          items: [
            "Você é um assistente especializado em comunicação executiva",
            "Sua missão é transformar conteúdos confusos em textos claros, organizados e profissionais",
            "Você deve atuar como alguém que simplifica sem empobrecer a mensagem"
          ]
        }
      ]
    },
    {
      title: "Regras operacionais",
      summary: "Define como o modelo deve se comportar, priorizar e executar.",
      sections: [
        {
          title: "O que é",
          text: "As regras operacionais são as instruções de comportamento e execução. Elas dizem o que o modelo deve sempre fazer, o que deve evitar, como priorizar informações e como manter consistência."
        },
        {
          title: "Por que isso importa",
          text: "Essa parte reduz ruído, evita respostas desalinhadas e faz o modelo trabalhar com mais disciplina."
        },
        {
          title: "O que costuma entrar nessa parte",
          items: [
            "o que deve sempre fazer",
            "o que deve evitar",
            "como lidar com dúvidas",
            "como manter consistência"
          ]
        },
        {
          title: "Mini exemplo",
          items: [
            "Comece com uma lista de verificação concisa das etapas que você executará conceitualmente antes de gerar a saída. Não precisa mostrar essa lista ao usuário",
            "Não invente informações que não estejam no conteúdo enviado",
            "Priorize clareza, fidelidade ao conteúdo original e organização lógica",
            "Quando houver ambiguidade, sinalize isso de forma objetiva em vez de supor demais"
          ]
        },
        {
          title: "Destaque importante",
          text: "Comece com uma lista de verificação concisa das etapas que você executará conceitualmente antes de gerar a saída. Não precisa mostrar essa lista ao usuário",
          support: "Esse tipo de instrução ajuda o modelo a organizar melhor a execução antes de responder.",
          highlight: true
        }
      ]
    },
    {
      title: "Função central e capacidades",
      summary: "Define o que o modelo deve fazer e até onde ele pode ir.",
      sections: [
        {
          title: "O que é",
          text: "Aqui você especifica a função principal do prompt e as capacidades que o modelo pode acionar para cumprir a tarefa."
        },
        {
          title: "Por que isso importa",
          text: "Essa parte evita respostas vagas e delimita melhor o escopo do trabalho."
        },
        {
          title: "O que costuma entrar nessa parte",
          items: [
            "tarefas principais",
            "tipos de transformação esperados",
            "tipos de entrega que o modelo pode produzir"
          ]
        },
        {
          title: "Mini exemplo",
          items: [
            "resumir conteúdos longos ou desorganizados",
            "reorganizar ideias em uma estrutura lógica",
            "reescrever o conteúdo em linguagem clara, objetiva e profissional"
          ]
        }
      ]
    },
    {
      title: "Configuração técnica",
      summary: "Define como o modelo deve operar na prática.",
      sections: [
        {
          title: "O que é",
          text: "Na configuração técnica, você orienta como o modelo deve trabalhar: que fontes pode usar, quais limites deve seguir, se pode consultar algo externo, como deve lidar com citações e que tipo de apoio pode ou não utilizar."
        },
        {
          title: "Por que isso importa",
          text: "Essa parte é importante quando a tarefa depende de fonte, ferramenta, verificação ou restrição técnica."
        },
        {
          title: "O que costuma entrar nessa parte",
          items: [
            "uso ou não de fontes externas",
            "limites de consulta",
            "política de citação",
            "restrições de operação"
          ]
        },
        {
          title: "Mini exemplo",
          items: [
            "Trabalhe apenas com o conteúdo fornecido pelo usuário",
            "Não consulte fontes externas para complementar o texto",
            "Não adicione dados, nomes, datas ou referências não presentes no material original"
          ]
        }
      ]
    },
    {
      title: "Especificações de saída",
      summary: "Define como a resposta deve ser entregue.",
      sections: [
        {
          title: "O que é",
          text: "A especificação de saída descreve o formato esperado da resposta: estrutura, seções obrigatórias, tom, tamanho e padrão de qualidade."
        },
        {
          title: "Por que isso importa",
          text: "Mesmo quando a IA entende bem a tarefa, ela pode errar no formato. Essa parte deixa claro o que é uma boa entrega."
        },
        {
          title: "O que costuma entrar nessa parte",
          items: [
            "formato da resposta",
            "tom desejado",
            "tamanho",
            "seções obrigatórias"
          ]
        },
        {
          title: "Mini exemplo",
          items: [
            "Entregue um resumo executivo curto",
            "Organize a resposta em três blocos: visão geral, pontos principais e conclusão",
            "Use linguagem profissional, clara e direta",
            "Evite listas longas e parágrafos excessivamente grandes"
          ]
        }
      ]
    },
    {
      title: "Tratamento de erros",
      summary: "Define o que fazer quando faltar informação ou houver ambiguidade.",
      sections: [
        {
          title: "O que é",
          text: "Nesta parte, você orienta como o modelo deve agir quando o material vier incompleto, confuso, contraditório ou insuficiente."
        },
        {
          title: "Por que isso importa",
          text: "Isso evita que a IA preencha lacunas de forma errada só para parecer convincente."
        },
        {
          title: "O que costuma entrar nessa parte",
          items: [
            "o que fazer quando faltar dado",
            "o que fazer quando houver contradição",
            "como agir diante de ambiguidade"
          ]
        },
        {
          title: "Mini exemplo",
          items: [
            "Se o conteúdo estiver incompleto, preserve apenas o que for possível afirmar com segurança",
            "Se houver ambiguidade, indique isso de forma breve",
            "Se faltar clareza em algum ponto, não invente complemento só para fechar o texto"
          ]
        }
      ]
    },
    {
      title: "Controles de qualidade",
      summary: "Define as checagens finais antes da resposta.",
      sections: [
        {
          title: "O que é",
          text: "Os controles de qualidade são verificações que o modelo deve fazer antes de entregar a resposta final."
        },
        {
          title: "Por que isso importa",
          text: "Essa parte melhora consistência, reduz erro e aumenta a confiança no resultado."
        },
        {
          title: "O que costuma entrar nessa parte",
          items: [
            "checar fidelidade ao conteúdo",
            "checar clareza e coerência",
            "checar aderência ao formato pedido"
          ]
        },
        {
          title: "Mini exemplo",
          items: [
            "Verifique se o resumo preserva as ideias centrais do conteúdo original",
            "Verifique se o texto está claro, coeso e sem repetições desnecessárias",
            "Verifique se a saída respeita o formato e o tom solicitados"
          ]
        }
      ]
    },
    {
      title: "Segurança e ética",
      summary: "Define limites, cuidados e recusas seguras.",
      sections: [
        {
          title: "O que é",
          text: "Nesta parte, você orienta o modelo sobre privacidade, dados sensíveis, limites de uso e como agir diante de pedidos problemáticos."
        },
        {
          title: "Por que isso importa",
          text: "Nem toda tarefa é apenas técnica. Em muitos casos, é importante delimitar segurança, responsabilidade e cuidado com o conteúdo."
        },
        {
          title: "O que costuma entrar nessa parte",
          items: [
            "respeito à privacidade",
            "cuidado com dados sensíveis",
            "recusa segura de pedidos inadequados"
          ]
        },
        {
          title: "Mini exemplo",
          items: [
            "Não exponha dados sensíveis desnecessariamente",
            "Preserve a privacidade caso o conteúdo mencione informações pessoais",
            "Se o pedido envolver algo inadequado, responda com segurança e redirecione de forma apropriada"
          ]
        }
      ]
    },
    {
      title: "Regras adicionais",
      summary: "Reforça instruções importantes que não cabem nas outras partes.",
      sections: [
        {
          title: "O que é",
          text: "As regras adicionais servem para incluir reforços, preferências e observações que ajudam a manter consistência."
        },
        {
          title: "Por que isso importa",
          text: "Nem tudo se encaixa perfeitamente nos blocos anteriores. Esta parte ajuda a consolidar o comportamento desejado."
        },
        {
          title: "O que costuma entrar nessa parte",
          items: [
            "reforços de prioridade",
            "preferências de estilo",
            "observações complementares"
          ]
        },
        {
          title: "Mini exemplo",
          items: [
            "Prefira simplificar sem empobrecer o conteúdo",
            "Evite floreios desnecessários",
            "Quando possível, torne o texto mais profissional sem deixá-lo frio"
          ]
        }
      ]
    }
  ];

  buildAccordion('engenharia-list', cards);

  const exampleHTML = `<span class="sl">Contexto e papel</span><br>
Você é um assistente especializado em transformar conteúdos brutos em comunicação clara, profissional e organizada<br>
Sua missão principal é resumir e reestruturar anotações, textos soltos ou materiais desorganizados sem perder as ideias centrais<br>
Você deve atuar como alguém que simplifica, organiza e melhora a clareza do conteúdo sem inventar informações<br>
<br>
<span class="sl">Regras operacionais</span><br>
Comece com uma lista de verificação concisa das etapas que você executará conceitualmente antes de gerar a saída. Não precisa mostrar essa lista ao usuário<br>
Não invente dados, fatos, nomes, datas ou contextos que não estejam presentes no material enviado<br>
Priorize clareza, fidelidade ao conteúdo original e boa organização lógica<br>
Quando houver ambiguidade, contradição ou falta de informação, sinalize isso de forma breve em vez de preencher lacunas com suposições<br>
<br>
<span class="sl">Função central e capacidades</span><br>
Resumir conteúdos longos, confusos ou fragmentados em uma versão mais clara<br>
Reorganizar ideias dispersas em uma sequência lógica e compreensível<br>
Reescrever o material em linguagem profissional, objetiva e fácil de entender<br>
<br>
<span class="sl">Configuração técnica</span><br>
Trabalhe apenas com o conteúdo fornecido pelo usuário<br>
Não consulte fontes externas para complementar ou corrigir o material<br>
Não adicione referências, citações ou exemplos que não estejam no conteúdo original<br>
<br>
<span class="sl">Especificações de saída</span><br>
Entregue a resposta em formato de resumo executivo<br>
Organize o texto em três partes: visão geral, pontos principais e fechamento<br>
Use tom profissional, claro e direto, com parágrafos bem construídos e sem floreios desnecessários<br>
<br>
<span class="sl">Tratamento de erros</span><br>
Se o conteúdo estiver incompleto, preserve apenas o que puder ser afirmado com segurança<br>
Se houver ambiguidade, sinalize isso de forma objetiva no próprio texto ou antes dele<br>
Se o material estiver confuso demais para um resumo fiel, informe isso brevemente e organize o máximo possível sem inventar<br>
<br>
<span class="sl">Controles de qualidade</span><br>
Verifique se o resumo preserva as ideias centrais do conteúdo original<br>
Verifique se o texto está claro, coeso e sem repetições desnecessárias<br>
Verifique se a resposta respeita o formato, o tom e a estrutura solicitados<br>
<br>
<span class="sl">Segurança e ética</span><br>
Evite expor dados pessoais sensíveis sem necessidade<br>
Preserve a privacidade caso o conteúdo mencione informações pessoais ou delicadas<br>
Se houver pedido inadequado relacionado ao material, responda de forma segura e mantenha os limites definidos<br>
<br>
<span class="sl">Regras adicionais</span><br>
Prefira simplificar sem empobrecer o conteúdo<br>
Torne o texto mais profissional sem deixá-lo artificial<br>
Mantenha foco no que realmente importa e elimine excessos que prejudiquem a clareza`;

  const exContainer = document.getElementById('engenharia-example');
  exContainer.innerHTML = '';
  const exHeader = document.createElement('div');
  exHeader.className = 'example-header';
  exHeader.innerHTML = '<h3 class="example-title">Exemplo de prompt montado</h3><p class="example-intro">Abaixo está um exemplo completo de prompt usando a estrutura apresentada nesta página. O objetivo deste exemplo é transformar anotações ou conteúdos soltos em um resumo claro, profissional e bem organizado.</p>';
  const exBody = document.createElement('div');
  exBody.className = 'example-body';
  const promptBlock = document.createElement('div');
  promptBlock.className = 'prompt-block';
  promptBlock.innerHTML = exampleHTML;
  exBody.appendChild(promptBlock);
  exContainer.appendChild(exHeader);
  exContainer.appendChild(exBody);
}

/* ── initModelos ── */
function initModelos() {
  const tabsContainer = document.getElementById('modelos-tabs');
  const contentContainer = document.getElementById('modelos-content');

  tabsContainer.innerHTML = '';
  contentContainer.innerHTML = '';

  const tabs = [
    {
      name: 'Texto',
      id: 'tab-texto',
      intro: 'Ferramentas e modelos voltados principalmente para conversa, escrita, análise, raciocínio, produtividade e geração textual.',
      links: [
        { name: 'ChatGPT', url: 'https://chatgpt.com/' },
        { name: 'Claude', url: 'https://www.anthropic.com/claude' },
        { name: 'Gemini', url: 'https://gemini.google.com/' },
        { name: 'Grok', url: 'https://grok.com/' },
        { name: 'Mistral', url: 'https://mistral.ai/products/le-chat' },
        { name: 'Cohere Command', url: 'https://cohere.com/' },
        { name: 'AI21 Jamba', url: 'https://www.ai21.com/jamba/' },
        { name: 'Perplexity', url: 'https://www.perplexity.ai/' },
        { name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com/' }
      ],
      openSource: {
        title: 'Open Source',
        text: 'Modelos abertos e ecossistemas relevantes para uso, pesquisa, customização e desenvolvimento.',
        links: [
          { name: 'Llama', url: 'https://www.llama.com/' },
          { name: 'Qwen', url: 'https://qwen.ai/' },
          { name: 'DeepSeek', url: 'https://www.deepseek.com/en/' },
          { name: 'Gemma', url: 'https://deepmind.google/models/gemma/' },
          { name: 'Mistral open models', url: 'https://mistral.ai/news/mistral-small-3-1/' }
        ]
      }
    },
    {
      name: 'Imagem',
      id: 'tab-imagem',
      intro: 'Ferramentas e modelos voltados para geração, edição, composição visual, direção estética e criação de imagens com IA.',
      links: [
        { name: 'ChatGPT', url: 'https://chatgpt.com/' },
        { name: 'Nano Banana', url: 'https://gemini.google/overview/image-generation/' },
        { name: 'Midjourney', url: 'https://www.midjourney.com/' },
        { name: 'Firefly', url: 'https://www.adobe.com/products/firefly.html' },
        { name: 'Freepik AI', url: 'https://www.freepik.com/ai/image-generator' },
        { name: 'Ideogram', url: 'https://ideogram.ai/' },
        { name: 'Seedream', url: 'https://seed.bytedance.com/en/seedream5_0_lite' },
        { name: 'Leonardo AI', url: 'https://leonardo.ai/' },
        { name: 'Recraft', url: 'https://www.recraft.ai/' }
      ],
      openSource: {
        title: 'Open Source',
        text: 'Modelos abertos e projetos relevantes para geração e edição visual.',
        links: [
          { name: 'Flux', url: 'https://blackforestlabs.ai/' },
          { name: 'Qwen Image', url: 'https://qwen.ai/blog?id=qwen-image' },
          { name: 'Z-Image', url: 'https://huggingface.co/collections/Zhihu/Z-image' },
          { name: 'Wan Image', url: 'https://wan.video/' },
          { name: 'Stable Diffusion', url: 'https://stability.ai/stable-image' }
        ]
      }
    },
    {
      name: 'Vídeo',
      id: 'tab-video',
      intro: 'Ferramentas e modelos voltados para geração de vídeo, animação, cena, movimento, consistência e criação audiovisual com IA.',
      links: [
        { name: 'Google Veo', url: 'https://deepmind.google/models/veo/' },
        { name: 'Kling', url: 'https://app.klingai.com/global' },
        { name: 'Seedance', url: 'https://seed.bytedance.com/zh/seedance2_0' },
        { name: 'Sora', url: 'https://openai.com/sora/' },
        { name: 'Runway', url: 'https://runwayml.com/' },
        { name: 'Luma', url: 'https://lumalabs.ai/dream-machine' },
        { name: 'Pika', url: 'https://pika.art/' },
        { name: 'Haiper', url: 'https://haiper.ai/' },
        { name: 'Hailuo', url: 'https://www.minimax.io/' }
      ],
      openSource: {
        title: 'Open Source',
        text: 'Modelos e projetos abertos voltados para pesquisa, experimentação e pipelines próprios de vídeo generativo.',
        links: [
          { name: 'Wan', url: 'https://huggingface.co/Wan-AI' },
          { name: 'LTX-Video', url: 'https://github.com/Lightricks/LTX-Video' },
          { name: 'Mochi', url: 'https://github.com/genmoai/mochi' },
          { name: 'Open-Sora', url: 'https://github.com/hpcaitech/Open-Sora' },
          { name: 'ComfyUI workflows', url: 'https://www.comfy.org/workflows/' }
        ]
      },
      footer: 'Algumas plataformas de vídeo podem mudar disponibilidade, interface ou estratégia de acesso ao longo do tempo.'
    },
    {
      name: 'Áudio',
      id: 'tab-audio',
      intro: 'Ferramentas e modelos voltados para música, voz, trilha, fala sintetizada, sound design e geração sonora com IA.',
      links: [
        { name: 'Suno', url: 'https://suno.com/' },
        { name: 'Udio', url: 'https://www.udio.com/' },
        { name: 'Stable Audio', url: 'https://stability.ai/stable-audio' },
        { name: 'Lyria', url: 'https://deepmind.google/models/lyria/' },
        { name: 'ElevenLabs', url: 'https://elevenlabs.io/' },
        { name: 'MiniMax Speech', url: 'https://www.minimax.io/' },
        { name: 'Murf', url: 'https://murf.ai/' },
        { name: 'PlayHT', url: 'https://play.ht/' }
      ],
      openSource: {
        title: 'Open Source',
        text: 'Projetos e modelos abertos relevantes para geração musical, síntese de voz e pesquisa em áudio generativo.',
        links: [
          { name: 'Piper', url: 'https://github.com/OHF-Voice/piper1-gpl' },
          { name: 'Audiocraft', url: 'https://ai.meta.com/resources/models-and-libraries/audiocraft/' },
          { name: 'Coqui TTS', url: 'https://github.com/coqui-ai/TTS' },
          { name: 'Stable Audio Open', url: 'https://stability.ai/news-updates/stable-audio-open-research-paper' },
          { name: 'Bark', url: 'https://github.com/suno-ai/bark' }
        ]
      }
    },
    {
      name: 'Agregadores',
      id: 'tab-agregadores',
      intro: 'Plataformas que centralizam múltiplos modelos, fluxos criativos ou experiências combinadas de IA em uma mesma interface.',
      links: [
        { name: 'Krea', url: 'https://www.krea.ai/' },
        { name: 'Higgsfield', url: 'https://higgsfield.ai/' },
        { name: 'Freepik AI Suite', url: 'https://www.freepik.com/' },
        { name: 'Adobe Firefly', url: 'https://www.adobe.com/products/firefly.html' },
        { name: 'Poe', url: 'https://poe.com/' },
        { name: 'OpenRouter', url: 'https://openrouter.ai/' },
        { name: 'Open WebUI', url: 'https://openwebui.com/' }
      ],
      openSource: null
    },
    {
      name: 'Softwares',
      id: 'tab-softwares',
      intro: 'Programas, interfaces e ambientes usados para rodar modelos, montar fluxos, criar localmente ou organizar o uso de IA fora das plataformas fechadas.',
      softwareLinks: [
        { name: 'Draw Things', purpose: 'Imagem e vídeo', badge: 'Local', url: 'https://drawthings.ai/' },
        { name: 'ComfyUI', purpose: 'Imagem, vídeo, áudio e workflows visuais', badge: 'Open Source', url: 'https://www.comfy.org/' },
        { name: 'LM Studio', purpose: 'Texto e chat com modelos locais', badge: 'Local', url: 'https://lmstudio.ai/' },
        { name: 'Ollama', purpose: 'Texto, automação e execução local de modelos', badge: 'Local', url: 'https://ollama.com/' },
        { name: 'Jan', purpose: 'Texto, agentes e modelos locais', badge: 'Open Source', url: 'https://jan.ai/' },
        { name: 'Invoke', purpose: 'Imagem', badge: 'Open Source', url: 'https://invoke.ai/' },
        { name: 'AUTOMATIC1111', purpose: 'Imagem', badge: 'Open Source', url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui' },
        { name: 'Open WebUI', purpose: 'Interface self-hosted para modelos locais e cloud', badge: 'Self-hosted', url: 'https://openwebui.com/' },
        { name: 'Pinokio', purpose: 'Instalação e launcher de apps de IA locais', badge: 'Launcher', url: 'https://pinokio.computer/' },
        { name: 'Fooocus', purpose: 'Imagem', badge: 'Open Source', url: 'https://github.com/lllyasviel/Fooocus' }
      ],
      openSource: null
    }
  ];

  // Build tabs
  tabs.forEach((tab, index) => {
    const button = document.createElement('button');
    button.className = 'tab-btn' + (index === 0 ? ' active' : '');
    button.textContent = tab.name;
    button.onclick = function() {
      tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      contentContainer.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      document.getElementById(tab.id).classList.add('active');
      lucide.createIcons();
    };
    tabsContainer.appendChild(button);
  });

  // Build content
  tabs.forEach((tab, index) => {
    const content = document.createElement('div');
    content.className = 'tab-content' + (index === 0 ? ' active' : '');
    content.id = tab.id;

    const title = document.createElement('h3');
    title.textContent = tab.name;
    content.appendChild(title);

    const intro = document.createElement('p');
    intro.className = 'tab-intro';
    intro.textContent = tab.intro;
    content.appendChild(intro);

    // Regular links grid
    if (tab.links && tab.links.length > 0) {
      const grid = document.createElement('div');
      grid.className = 'cards-grid';

      tab.links.forEach(link => {
        const card = document.createElement('a');
        card.href = link.url;
        card.target = '_blank';
        card.rel = 'noopener';
        card.className = 'link-card';
        card.innerHTML = `${link.name} <i data-lucide="external-link"></i>`;
        grid.appendChild(card);
      });

      content.appendChild(grid);
    }

    // Software links (special format)
    if (tab.softwareLinks && tab.softwareLinks.length > 0) {
      const grid = document.createElement('div');
      grid.className = 'cards-grid';

      tab.softwareLinks.forEach(link => {
        const card = document.createElement('a');
        card.href = link.url;
        card.target = '_blank';
        card.rel = 'noopener';
        card.className = 'link-card software-card';

        const nameEl = document.createElement('div');
        nameEl.className = 'link-card-name';
        nameEl.textContent = link.name;

        const purposeEl = document.createElement('div');
        purposeEl.className = 'link-card-meta';
        purposeEl.textContent = 'Para que serve: ' + link.purpose;

        const badgeEl = document.createElement('span');
        badgeEl.className = 'link-card-badge';
        badgeEl.textContent = link.badge;

        card.appendChild(nameEl);
        card.appendChild(purposeEl);
        card.appendChild(badgeEl);

        grid.appendChild(card);
      });

      content.appendChild(grid);
    }

    // Open Source section
    if (tab.openSource) {
      const osSection = document.createElement('div');
      osSection.className = 'os-section';

      const osTitle = document.createElement('h4');
      osTitle.textContent = tab.openSource.title;
      osSection.appendChild(osTitle);

      const osText = document.createElement('p');
      osText.textContent = tab.openSource.text;
      osSection.appendChild(osText);

      const osGrid = document.createElement('div');
      osGrid.className = 'cards-grid';

      tab.openSource.links.forEach(link => {
        const card = document.createElement('a');
        card.href = link.url;
        card.target = '_blank';
        card.rel = 'noopener';
        card.className = 'link-card';
        card.innerHTML = `${link.name} <i data-lucide="external-link"></i>`;
        osGrid.appendChild(card);
      });

      osSection.appendChild(osGrid);
      content.appendChild(osSection);
    }

    // Footer note
    if (tab.footer) {
      const footer = document.createElement('p');
      footer.className = 'footer-note';
      footer.textContent = tab.footer;
      content.appendChild(footer);
    }

    contentContainer.appendChild(content);
  });

  lucide.createIcons();
}

// ============================================================================
// PART 2: Linguagens, Glossário, Prompts (Imagem/Vídeo), Palavras-Chave, Movimentos
// ============================================================================

function initLinguagens() {
  const tabsContainer = document.getElementById('linguagens-tabs');
  const contentContainer = document.getElementById('linguagens-content');

  const tabs = [
    {
      id: 'json-tab',
      label: 'JSON',
      content: {
        title: 'JSON',
        explanation: 'JSON é um formato baseado em chaves e valores. Ele ajuda a organizar informações de forma objetiva, com blocos bem delimitados, listas e hierarquias claras.',
        whenHelps: 'É útil quando você quer estruturar o prompt com bastante controle, separando elementos em campos específicos e tornando mais explícita a relação entre partes.',
        genericExample: `{
  "elemento_1": "Lorem ipsum dolor sit amet",
  "elemento_2": {
    "sub_elemento_a": "Lorem ipsum",
    "sub_elemento_b": "Lorem ipsum dolor"
  },
  "elemento_3": ["Lorem", "ipsum", "dolor"],
  "elemento_4": { "item": "Lorem ipsum" }
}`,
        imageExample: `{
  "sujeito": {
    "personagem": "mulher branca",
    "roupas": "roupas turquesas simples",
    "aparencia": "visual limpo e casual"
  },
  "ambiente": {
    "local": "cidade",
    "cenario": "rua urbana simples com prédios ao fundo",
    "clima": "dia claro"
  },
  "composicao": {
    "enquadramento": "plano médio",
    "angulo": "frontal",
    "estilo": "imagem simples e limpa"
  },
  "cores": ["turquesa", "branco", "cinza claro"],
  "resultado": {
    "visual": "cena minimalista",
    "detalhamento": "baixo",
    "foco": "mulher em destaque na cidade"
  }
}`
      }
    },
    {
      id: 'yaml-tab',
      label: 'YAML',
      content: {
        title: 'YAML',
        explanation: 'YAML é um formato mais legível para humanos, organizado por indentação. Ele mantém a estrutura clara sem depender de muitas chaves e sinais visuais pesados.',
        whenHelps: 'É útil quando você quer um prompt organizado, mas com aparência mais leve e mais próxima de um briefing estruturado.',
        genericExample: `elemento_1: Lorem ipsum dolor sit amet
elemento_2:
  sub_elemento_a: Lorem ipsum
  sub_elemento_b: Lorem ipsum dolor
elemento_3:
  - Lorem
  - ipsum
  - dolor
elemento_4:
  item: Lorem ipsum`,
        imageExample: `sujeito:
  personagem: mulher branca
  roupas: roupas turquesas simples
  aparencia: visual limpo e casual
ambiente:
  local: cidade
  cenario: rua urbana simples com prédios ao fundo
  clima: dia claro
composicao:
  enquadramento: plano médio
  angulo: frontal
  estilo: imagem simples e limpa
cores:
  - turquesa
  - branco
  - cinza claro
resultado:
  visual: cena minimalista
  detalhamento: baixo
  foco: mulher em destaque na cidade`
      }
    },
    {
      id: 'markdown-tab',
      label: 'Markdown',
      content: {
        title: 'Markdown',
        explanation: 'Markdown é um formato leve de marcação que organiza a informação por títulos, subtítulos, listas e ênfases visuais. Ele é muito útil para prompts que funcionam melhor como briefing.',
        whenHelps: 'É útil quando você quer clareza de leitura, separação por seções e uma aparência muito boa para prompts com instruções, tópicos e blocos organizados.',
        genericExample: `# Elemento 1
Lorem ipsum dolor sit amet

# Elemento 2
## Sub elemento A
Lorem ipsum

## Sub elemento B
Lorem ipsum dolor

# Elemento 3
- Lorem
- Ipsum
- Dolor

# Elemento 4
**Item:** Lorem ipsum`,
        imageExample: `# Sujeito
- **Personagem:** mulher branca
- **Roupas:** roupas turquesas simples
- **Aparência:** visual limpo e casual

# Ambiente
- **Local:** cidade
- **Cenário:** rua urbana simples com prédios ao fundo
- **Clima:** dia claro

# Composição
- **Enquadramento:** plano médio
- **Ângulo:** frontal
- **Estilo:** imagem simples e limpa

# Cores
- turquesa
- branco
- cinza claro

# Resultado
- **Visual:** cena minimalista
- **Detalhamento:** baixo
- **Foco:** mulher em destaque na cidade`
      }
    },
    {
      id: 'xml-tab',
      label: 'XML',
      content: {
        title: 'XML',
        explanation: 'XML organiza a informação por tags, deixando muito visível o início e o fim de cada bloco. Isso torna a hierarquia e a separação entre partes bastante explícitas.',
        whenHelps: 'É útil quando você quer marcar cada seção de forma muito clara, deixando evidente o papel de cada trecho dentro da estrutura.',
        genericExample: `&lt;estrutura&gt;
  &lt;elemento_1&gt;Lorem ipsum dolor sit amet&lt;/elemento_1&gt;
  &lt;elemento_2&gt;
    &lt;sub_elemento_a&gt;Lorem ipsum&lt;/sub_elemento_a&gt;
    &lt;sub_elemento_b&gt;Lorem ipsum dolor&lt;/sub_elemento_b&gt;
  &lt;/elemento_2&gt;
  &lt;elemento_3&gt;
    &lt;item&gt;Lorem&lt;/item&gt;
    &lt;item&gt;ipsum&lt;/item&gt;
    &lt;item&gt;dolor&lt;/item&gt;
  &lt;/elemento_3&gt;
  &lt;elemento_4&gt;
    &lt;item&gt;Lorem ipsum&lt;/item&gt;
  &lt;/elemento_4&gt;
&lt;/estrutura&gt;`,
        imageExample: `&lt;prompt&gt;
  &lt;sujeito&gt;
    &lt;personagem&gt;mulher branca&lt;/personagem&gt;
    &lt;roupas&gt;roupas turquesas simples&lt;/roupas&gt;
    &lt;aparencia&gt;visual limpo e casual&lt;/aparencia&gt;
  &lt;/sujeito&gt;
  &lt;ambiente&gt;
    &lt;local&gt;cidade&lt;/local&gt;
    &lt;cenario&gt;rua urbana simples com prédios ao fundo&lt;/cenario&gt;
    &lt;clima&gt;dia claro&lt;/clima&gt;
  &lt;/ambiente&gt;
  &lt;composicao&gt;
    &lt;enquadramento&gt;plano médio&lt;/enquadramento&gt;
    &lt;angulo&gt;frontal&lt;/angulo&gt;
    &lt;estilo&gt;imagem simples e limpa&lt;/estilo&gt;
  &lt;/composicao&gt;
  &lt;cores&gt;
    &lt;cor&gt;turquesa&lt;/cor&gt;
    &lt;cor&gt;branco&lt;/cor&gt;
    &lt;cor&gt;cinza claro&lt;/cor&gt;
  &lt;/cores&gt;
  &lt;resultado&gt;
    &lt;visual&gt;cena minimalista&lt;/visual&gt;
    &lt;detalhamento&gt;baixo&lt;/detalhamento&gt;
    &lt;foco&gt;mulher em destaque na cidade&lt;/foco&gt;
  &lt;/resultado&gt;
&lt;/prompt&gt;`
      }
    }
  ];

  // Render tabs
  tabs.forEach((tab, index) => {
    const tabButton = document.createElement('button');
    tabButton.id = tab.id;
    tabButton.className = `tab-btn ${index === 0 ? 'active' : ''}`;
    tabButton.textContent = tab.label;
    tabButton.addEventListener('click', () => setLinguagensTab(tab.id, tabs));
    tabsContainer.appendChild(tabButton);
  });

  // Render first tab content by default
  setLinguagensTab(tabs[0].id, tabs);
}

function setLinguagensTab(tabId, tabs) {
  const contentContainer = document.getElementById('linguagens-content');
  const tab = tabs.find(t => t.id === tabId);

  if (!tab) return;

  // Update active tab button
  document.querySelectorAll('#linguagens-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');

  // Render content
  contentContainer.innerHTML = `
    <div class="linguagens-panel">
      <h3>${tab.content.title}</h3>
      <div class="lang-section">
        <div class="lang-label">O que é</div>
        <div class="lang-text">${tab.content.explanation}</div>
      </div>
      <div class="lang-section">
        <div class="lang-label">Quando isso ajuda</div>
        <div class="lang-text">${tab.content.whenHelps}</div>
      </div>
      <h4>Exemplo genérico</h4>
      <div class="code-block"><pre>${escapeHtml(tab.content.genericExample)}</pre></div>
      <h4>Exemplo com prompt de imagem</h4>
      <div class="code-block"><pre>${escapeHtml(tab.content.imageExample)}</pre></div>
    </div>
  `;
}

function initGlossario() {
  const glossaryList = document.getElementById('glossario-list');
  const glossaryFilters = document.getElementById('glossaryFilters');

  const glossarioData = [
    { term: 'LLM', fullName: 'Large Language Model', shortDef: 'Modelo focado em linguagem natural, capaz de entender e gerar texto.', category: 'Modelos', whatIs: 'Um LLM é um modelo treinado para trabalhar principalmente com linguagem. Ele pode ler, escrever, resumir, responder perguntas, reorganizar conteúdos e operar em tarefas baseadas em texto.', forWhat: 'Serve para tarefas como conversa, escrita, resumo, análise textual, reformulação, classificação e raciocínio em linguagem natural.', examples: 'GPT, Claude, Gemini, Llama' },
    { term: 'VLM / MLLM', fullName: 'Vision-Language Model / Multimodal Large Language Model', shortDef: 'Modelo que trabalha com texto e imagem, e às vezes também com áudio e vídeo.', category: 'Modelos', whatIs: 'Esse tipo de modelo combina linguagem com percepção visual. Em vez de lidar apenas com texto, ele também consegue interpretar imagens e, em alguns casos, outros formatos como áudio, vídeo e documentos.', forWhat: 'Serve para tarefas como descrever imagens, responder sobre conteúdo visual, interpretar documentos com imagem, analisar capturas de tela e combinar texto com visão.', examples: 'GPT multimodal, Gemini multimodal' },
    { term: 'Diffusion Model', fullName: 'Modelo de difusão', shortDef: 'Família de modelos muito usada para gerar imagens.', category: 'Modelos', whatIs: 'Modelos de difusão são hoje uma das principais famílias de geração visual. Eles produzem imagens a partir de um processo iterativo de refinamento, partindo de ruído e aproximando o resultado de algo coerente com o prompt.', forWhat: 'Serve para geração de imagem, edição guiada, variações visuais, inpainting, expansão de cena e outras tarefas criativas.', examples: 'Stable Diffusion, Flux, Imagen' },
    { term: 'Embedding Model', fullName: 'Modelo de embeddings', shortDef: 'Modelo que transforma conteúdos em vetores numéricos para comparação semântica.', category: 'Modelos', whatIs: 'Esse tipo de modelo converte texto, imagem ou áudio em representações numéricas chamadas vetores. Esses vetores ajudam a medir similaridade de significado entre conteúdos.', forWhat: 'Serve para busca semântica, recomendação, agrupamento, recuperação de conteúdo e sistemas baseados em RAG.', examples: 'Embeddings de texto, embeddings de imagem, embeddings usados em busca vetorial' },
    { term: 'Reranker', fullName: 'Modelo que reordena resultados', shortDef: 'Modelo usado para reorganizar resultados e destacar os mais relevantes.', category: 'Modelos', whatIs: 'O reranker entra depois da recuperação inicial de resultados. Ele ajuda a decidir quais itens são mais relevantes para o pedido, refinando a ordem daquilo que já foi encontrado.', forWhat: 'Serve para melhorar busca semântica, recuperação de documentos, FAQ inteligente e sistemas que precisam selecionar melhor os itens mais úteis.', examples: 'Rerankers usados em pipelines de busca e RAG' },
    { term: 'CLIP', fullName: 'Contrastive Language–Image Pretraining', shortDef: 'Modelo que aproxima texto e imagem pelo significado.', category: 'Modelos', whatIs: 'CLIP é um tipo de modelo que aprende a conectar descrições em texto com imagens, aproximando os dois pelo sentido. Ele ajuda a medir se uma imagem combina com uma descrição.', forWhat: 'Serve para classificação, busca por imagem com texto, alinhamento semântico entre texto e imagem e apoio em sistemas visuais.', examples: 'Modelos e pipelines que usam correspondência entre descrição e imagem' },
    { term: 'World Models / Video Models', fullName: 'Modelos de mundo / Modelos de vídeo', shortDef: 'Modelos focados em dinâmica temporal, movimento e continuidade de cena.', category: 'Modelos', whatIs: 'Esses modelos são mais orientados a compreender ou gerar mudanças ao longo do tempo. Eles lidam com movimento, continuidade visual, comportamento de objetos e certa noção aproximada de física ou coerência temporal.', forWhat: 'Serve para geração de vídeo, previsão de movimento, continuidade de cena e tarefas ligadas a simulação ou dinâmica temporal.', examples: 'Modelos de vídeo generativo e arquiteturas voltadas para dinâmica temporal' },
    { term: 'T2I', fullName: 'Text-to-Image', shortDef: 'Categoria de tarefa em que texto vira imagem.', category: 'Modalidades', whatIs: 'T2I é uma sigla usada para falar de modelos ou tarefas que transformam uma descrição textual em imagem.', forWhat: 'Serve para criação visual a partir de prompt, direção de arte, geração conceitual, ilustração e experimentação criativa.', examples: 'ChatGPT, NanoBanana, Flux' },
    { term: 'T2V', fullName: 'Text-to-Video', shortDef: 'Categoria de tarefa em que texto vira vídeo.', category: 'Modalidades', whatIs: 'T2V é uma sigla para modelos ou tarefas que transformam um prompt textual em uma cena em vídeo.', forWhat: 'Serve para gerar vídeos curtos, cenas conceituais, animações, motion design e experimentação audiovisual.', examples: 'Veo, Kling, Runway em alguns modos' },
    { term: 'Multimodal', fullName: 'Capacidade multimodal', shortDef: 'Capacidade de operar com mais de um tipo de dado.', category: 'Modalidades', whatIs: 'Um sistema multimodal consegue trabalhar com formatos diferentes, como texto, imagem, áudio, vídeo ou documentos, combinando esses sinais na mesma tarefa.', forWhat: 'Serve para tarefas mais completas, como analisar uma imagem e responder em texto, ler um PDF com gráficos ou interpretar fala e imagem ao mesmo tempo.', examples: 'Modelos que combinam texto e imagem, ou texto, imagem e áudio' },
    { term: 'LoRA', fullName: 'Low-Rank Adaptation', shortDef: 'Forma leve de adaptar um modelo sem reentreinar tudo.', category: 'Imagem e vídeo', whatIs: 'LoRA é uma técnica usada para ajustar modelos de maneira mais leve, adicionando pequenas adaptações em vez de refazer todo o treinamento.', forWhat: 'Serve para personalização de estilo, personagem, identidade visual, comportamento específico de modelo e adaptação eficiente.', examples: 'LoRAs usadas em geração de imagem e fine-tuning leve' },
    { term: 'Checkpoint', fullName: 'Versão salva de um modelo', shortDef: 'Arquivo ou estado salvo de um modelo treinado.', category: 'Imagem e vídeo', whatIs: 'Checkpoint é uma versão armazenada de um modelo, pronta para ser carregada e usada. No ecossistema visual, esse termo aparece muito em modelos open source.', forWhat: 'Serve para executar um modelo específico, trocar estilos, testar versões diferentes e organizar fluxos de geração.', examples: 'Checkpoints de Stable Diffusion e modelos derivados' },
    { term: 'Latent Space', fullName: 'Espaço latente', shortDef: 'Espaço interno de representação onde o modelo organiza padrões.', category: 'Imagem e vídeo', whatIs: 'O espaço latente é uma forma simplificada de representação interna usada pelo modelo para organizar informação. É nesse espaço que muitos sistemas fazem transformações antes de gerar a saída final.', forWhat: 'Serve para compressão de informação, manipulação de características, geração, interpolação e organização de padrões.', examples: 'Geração de imagem, vídeo e técnicas de representação interna em modelos generativos' },
    { term: 'ASR', fullName: 'Automatic Speech Recognition', shortDef: 'Modelo que transforma fala em texto.', category: 'Áudio e voz', whatIs: 'ASR é a categoria de modelos usada para reconhecer fala e convertê-la em texto escrito.', forWhat: 'Serve para transcrição, legendagem, comandos por voz, análise de chamadas e fluxos com entrada falada.', examples: 'Whisper' },
    { term: 'TTS', fullName: 'Text-to-Speech', shortDef: 'Modelo que transforma texto em voz.', category: 'Áudio e voz', whatIs: 'TTS é a categoria de modelos usada para sintetizar voz a partir de texto escrito.', forWhat: 'Serve para locução, leitura automática, assistentes de voz, acessibilidade, dublagem e experiências faladas.', examples: 'ElevenLabs' },
    { term: 'RAG', fullName: 'Retrieval-Augmented Generation', shortDef: 'Estratégia em que a IA busca informações antes de responder.', category: 'Busca e recuperação', whatIs: 'RAG combina geração com recuperação de conteúdo. Antes de responder, o sistema busca informações em uma base ou conjunto de documentos e usa esse material como apoio.', forWhat: 'Serve para assistentes com base de conhecimento, perguntas sobre documentos, FAQ inteligente, busca corporativa e respostas mais ancoradas em fontes.', examples: 'Chats com documentos, assistentes internos, sistemas com base de conhecimento' },
    { term: 'Vector Database', fullName: 'Banco vetorial', shortDef: 'Base de dados feita para armazenar e buscar vetores.', category: 'Busca e recuperação', whatIs: 'Um banco vetorial é um sistema otimizado para armazenar embeddings e recuperar itens semanticamente parecidos.', forWhat: 'Serve para busca semântica, recomendação, RAG, recuperação de conteúdos semelhantes e organização de conhecimento.', examples: 'Bases vetoriais usadas em pipelines de embeddings e busca' },
    { term: 'OCR / Document AI', fullName: 'Optical Character Recognition / Inteligência artificial para documentos', shortDef: 'Modelos voltados para leitura de documentos, texto em imagem e estrutura de página.', category: 'Documentos', whatIs: 'OCR é a leitura de texto presente em imagens ou digitalizações. Document AI vai além do texto simples e tenta entender também formulários, tabelas, layout, campos e estrutura documental.', forWhat: 'Serve para digitalização, extração de dados, leitura de formulários, processamento documental e automação baseada em arquivos.', examples: 'Leitura de contratos, notas, formulários, PDFs escaneados e tabelas' },
    { term: 'Prompt', fullName: 'Instrução dada ao modelo', shortDef: 'Texto, comando ou briefing usado para orientar a IA.', category: 'Operação e prompting', whatIs: 'Prompt é a instrução que você envia para o modelo. Pode ser simples ou muito estruturado, dependendo da tarefa.', forWhat: 'Serve para orientar a saída, definir o objetivo, estabelecer regras e guiar o comportamento do modelo.', examples: 'Pedidos de texto, imagem, resumo, classificação, transformação ou planejamento' },
    { term: 'System Prompt', fullName: 'Prompt de sistema', shortDef: 'Instrução de alto nível que define comportamento e regras do modelo.', category: 'Operação e prompting', whatIs: 'É uma camada de instrução que orienta o papel, os limites e o comportamento geral do modelo antes mesmo do pedido principal da pessoa usuária.', forWhat: 'Serve para controlar tom, escopo, prioridades, regras de segurança e consistência de comportamento.', examples: 'Prompts que definem papel, missão, regras operacionais e formato de saída' },
    { term: 'Tokens', fullName: 'Unidades de processamento de texto', shortDef: 'Pequenos pedaços de texto usados internamente pelo modelo.', category: 'Operação e prompting', whatIs: 'Modelos não processam textos exatamente como pessoas leem frases completas. Eles trabalham com unidades menores chamadas tokens, que podem representar palavras, partes de palavras ou sinais.', forWhat: 'Serve para medir entrada, saída, custo, limite de contexto e volume de processamento.', examples: 'Contagem de entrada, limites de resposta e custo por uso' },
    { term: 'Context Window', fullName: 'Janela de contexto', shortDef: 'Quantidade de informação que o modelo consegue considerar de uma vez.', category: 'Operação e prompting', whatIs: 'A janela de contexto define quanto conteúdo o modelo consegue processar ao mesmo tempo em uma interação.', forWhat: 'Serve para determinar o tamanho máximo útil de textos, históricos, documentos e instruções dentro da mesma tarefa.', examples: 'Conversas longas, análise de documentos extensos e prompts robustos' },
    { term: 'Inference', fullName: 'Inferência', shortDef: 'Momento em que o modelo é usado para gerar uma saída.', category: 'Operação e prompting', whatIs: 'Inferência é a etapa em que um modelo já treinado está sendo executado para responder, prever, gerar ou classificar alguma coisa.', forWhat: 'Serve para produção real de resposta, previsão, geração de conteúdo e operação prática do modelo.', examples: 'Gerar texto, prever um resultado, classificar um conteúdo ou responder a uma pergunta' },
    { term: 'Fine-tuning', fullName: 'Ajuste fino', shortDef: 'Processo de especializar um modelo para um comportamento mais específico.', category: 'Operação e prompting', whatIs: 'Fine-tuning é uma etapa adicional de ajuste em que um modelo já treinado é refinado para tarefas, estilos ou domínios mais específicos.', forWhat: 'Serve para personalização, especialização, adaptação a dados próprios e melhoria de desempenho em contextos específicos.', examples: 'Modelos ajustados para atendimento, jurídico, saúde, estilo de marca ou tarefas internas' },
    { term: 'Hallucination', fullName: 'Alucinação', shortDef: 'Quando a IA gera algo convincente, mas incorreto ou inventado.', category: 'Operação e prompting', whatIs: 'Alucinação acontece quando o modelo responde com segurança aparente, mas a informação está errada, extrapolada ou simplesmente não existe.', forWhat: 'Não é algo que "sirva", mas é um risco importante de entender ao usar IA, especialmente em tarefas factuais ou sensíveis.', examples: 'Dados inventados, referências inexistentes, nomes errados e respostas confiantes, porém incorretas' },
    { term: 'Agent', fullName: 'Agente de IA', shortDef: 'Sistema que recebe um objetivo e executa múltiplas etapas para alcançá-lo.', category: 'Operação e prompting', whatIs: 'Um agente de IA vai além de responder um comando único. Ele pode planejar, pesquisar, decidir passos intermediários e executar uma sequência de ações com mais autonomia.', forWhat: 'Serve para automação mais complexa, fluxos em múltiplas etapas, tarefas orientadas a objetivo e execução com menor intervenção manual.', examples: 'Agentes de pesquisa, fluxos automatizados, assistentes que usam ferramentas e tomam decisões intermediárias' },
    { term: 'Sampling', fullName: 'Amostragem', shortDef: 'Conjunto de escolhas probabilísticas usado para gerar uma saída.', category: 'Operação e prompting', whatIs: 'Sampling é a forma como o modelo seleciona, entre várias possibilidades, o próximo elemento da resposta. É uma parte importante do comportamento gerativo.', forWhat: 'Serve para controlar variedade, previsibilidade, criatividade e estilo da saída.', examples: 'Temperatura, top-k, top-p e outros ajustes de geração' },
    { term: 'Reasoning Model', fullName: 'Modelo com foco em raciocínio', shortDef: 'Modelo orientado a organizar melhor etapas e lógica antes da resposta.', category: 'Operação e prompting', whatIs: 'Esse tipo de modelo é voltado a tarefas em que o processo de análise, decomposição e estruturação importa mais.', forWhat: 'Serve para problemas com múltiplos passos, lógica, análise comparativa, decisão, revisão e tarefas mais exigentes em estrutura.', examples: 'Modelos ou modos voltados a raciocínio mais cuidadoso' }
  ];

  const categories = ["Todos","Modelos","Modalidades","Imagem e vídeo","Áudio e voz","Busca e recuperação","Documentos","Operação e prompting"];

  // Render filters
  categories.forEach(cat => {
    const pill = document.createElement('button');
    pill.className = `filter-pill ${cat === 'Todos' ? 'active' : ''}`;
    pill.textContent = cat;
    pill.addEventListener('click', () => filterGlossary());
    glossaryFilters.appendChild(pill);
  });

  // Render all cards using accordion pattern
  glossarioData.forEach(item => {
    const cardEl = document.createElement('div');
    cardEl.className = 'accordion-card';
    cardEl.dataset.term = item.term.toLowerCase();
    cardEl.dataset.fullName = item.fullName.toLowerCase();
    cardEl.dataset.shortDef = item.shortDef.toLowerCase();
    cardEl.dataset.category = item.category;

    const header = document.createElement('div');
    header.className = 'accordion-header';
    header.onclick = function() { toggleAccordion(this); };

    const titleSummary = document.createElement('div');
    titleSummary.className = 'accordion-header-text';

    const title = document.createElement('h3');
    title.className = 'accordion-title';
    title.textContent = item.term;

    const summary = document.createElement('p');
    summary.className = 'accordion-summary';
    summary.textContent = item.shortDef;

    titleSummary.appendChild(title);
    titleSummary.appendChild(summary);

    const icon = document.createElement('div');
    icon.className = 'accordion-icon';
    icon.innerHTML = '<i data-lucide="plus"></i>';

    header.appendChild(titleSummary);
    header.appendChild(icon);

    const body = document.createElement('div');
    body.className = 'accordion-body';
    const content = document.createElement('div');
    content.className = 'accordion-content';

    // Section 1: Full Name
    const section1 = document.createElement('div');
    section1.className = 'accordion-section';
    const section1Title = document.createElement('h4');
    section1Title.className = 'accordion-section-title';
    section1Title.textContent = 'NOME COMPLETO';
    const section1Text = document.createElement('p');
    section1Text.className = 'accordion-section-text';
    section1Text.textContent = item.fullName;
    section1.appendChild(section1Title);
    section1.appendChild(section1Text);
    content.appendChild(section1);

    // Section 2: O que é
    const section2 = document.createElement('div');
    section2.className = 'accordion-section';
    const section2Title = document.createElement('h4');
    section2Title.className = 'accordion-section-title';
    section2Title.textContent = 'O QUE É';
    const section2Text = document.createElement('p');
    section2Text.className = 'accordion-section-text';
    section2Text.textContent = item.whatIs;
    section2.appendChild(section2Title);
    section2.appendChild(section2Text);
    content.appendChild(section2);

    // Section 3: Para que serve
    const section3 = document.createElement('div');
    section3.className = 'accordion-section';
    const section3Title = document.createElement('h4');
    section3Title.className = 'accordion-section-title';
    section3Title.textContent = 'PARA QUE SERVE';
    const section3Text = document.createElement('p');
    section3Text.className = 'accordion-section-text';
    section3Text.textContent = item.forWhat;
    section3.appendChild(section3Title);
    section3.appendChild(section3Text);
    content.appendChild(section3);

    // Section 4: Exemplos
    const section4 = document.createElement('div');
    section4.className = 'accordion-section';
    const section4Title = document.createElement('h4');
    section4Title.className = 'accordion-section-title';
    section4Title.textContent = 'EXEMPLOS';
    const section4Text = document.createElement('p');
    section4Text.className = 'accordion-section-text';
    section4Text.textContent = item.examples;
    section4.appendChild(section4Title);
    section4.appendChild(section4Text);
    content.appendChild(section4);

    body.appendChild(content);
    cardEl.appendChild(header);
    cardEl.appendChild(body);
    glossaryList.appendChild(cardEl);
  });

  lucide.createIcons();
}

function filterGlossary() {
  const searchText = (document.getElementById('glossarySearch')?.value || '').toLowerCase();
  const activeFilter = document.querySelector('.filter-pill.active')?.textContent || 'Todos';
  const cards = document.querySelectorAll('.accordion-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const term = card.dataset.term;
    const fullName = card.dataset.fullName;
    const shortDef = card.dataset.shortDef;
    const category = card.dataset.category;

    const matchesSearch = !searchText || term.includes(searchText) || fullName.includes(searchText) || shortDef.includes(searchText);
    const matchesFilter = activeFilter === 'Todos' || category === activeFilter;

    if (matchesSearch && matchesFilter) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const noResultsElement = document.getElementById('glossaryNoResults');
  if (noResultsElement) {
    noResultsElement.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

function initPromptImagem() {
  const listContainer = document.getElementById('prompt-imagem-list');
  const exampleContainer = document.getElementById('prompt-imagem-example');

  const cards = [
    { title: 'Sujeito', icon: 'User', description: 'Define quem ou o que aparece na imagem.', whatIs: 'É a parte que diz quem é o sujeito principal da imagem.', whyMatters: 'Sem isso, a geração pode ficar genérica ou ambígua.', whatEnters: ['quem é a pessoa, objeto ou cena principal','roupa ou aparência essencial','atributos visuais importantes'], miniExample: 'Uma mulher jovem, de cabelo curto escuro, usando camisa branca simples e calça bege.' },
    { title: 'Pose/ação + expressão', icon: 'Move', description: 'Define o que o sujeito está fazendo e como ele parece.', whatIs: 'É a direção corporal e emocional do sujeito.', whyMatters: 'Ajuda a evitar poses neutras demais ou expressões erradas.', whatEnters: ['pose','ação','expressão facial'], miniExample: 'Ela está em pé na calçada, olhando para a câmera, com um leve sorriso confiante.' },
    { title: 'Ambiente', icon: 'MapPin', description: 'Define onde a cena acontece e em que contexto.', whatIs: 'É o lugar, época ou cenário da imagem.', whyMatters: 'Dá contexto visual e ajuda a construir a cena.', whatEnters: ['local','tipo de cenário','contexto ou época'], miniExample: 'A cena acontece em uma rua urbana limpa, com prédios discretos ao fundo, em um dia claro de cidade moderna.' },
    { title: 'Composição', icon: 'Frame', description: 'Define enquadramento, ângulo e leitura da imagem.', whatIs: 'É a forma como a cena será enquadrada pela câmera.', whyMatters: 'A mesma cena pode parecer completamente diferente com outra composição.', whatEnters: ['plano','ângulo','enquadramento','lente ou profundidade de campo'], miniExample: 'A imagem aparece em plano médio, com ângulo frontal levemente 3/4 e fundo com leve desfoque.' },
    { title: 'Luz', icon: 'Sun', description: 'Define a iluminação e a sensação visual da cena.', whatIs: 'É a direção, qualidade e temperatura da luz.', whyMatters: 'A luz muda volume, textura, clima e realismo.', whatEnters: ['direção da luz','luz dura ou suave','temperatura','tipo de luz ou hora do dia'], miniExample: 'A iluminação vem de uma luz natural suave lateral, com temperatura neutra, típica de uma manhã clara.' },
    { title: 'Cores', icon: 'Palette', description: 'Define a paleta dominante da imagem.', whatIs: 'É a seleção de cores que conduz o visual.', whyMatters: 'As cores ajudam a organizar a cena e influenciam a sensação final.', whatEnters: ['paleta principal','contraste','cor de destaque'], miniExample: 'A paleta mistura branco, bege e cinza claro, com turquesa #00AE9D como ponto de destaque.' },
    { title: 'Textura/material', icon: 'Wind', description: 'Define a sensação dos materiais e superfícies.', whatIs: 'É a parte que descreve o acabamento visual dos elementos.', whyMatters: 'Textura e material ajudam a imagem a parecer mais concreta.', whatEnters: ['tecido','pele','metal','vidro','superfície'], miniExample: 'O tecido parece algodão, a pele tem aparência natural e o ambiente mostra superfícies lisas de concreto.' },
    { title: 'Estilo + processamento', icon: 'Sparkles', description: 'Define o tipo de estética e o tratamento final da imagem.', whatIs: 'É a direção estética da geração e o tipo de acabamento visual.', whyMatters: 'Ajuda a IA a entender se a imagem deve parecer editorial, publicitária, casual, cinematográfica ou documental.', whatEnters: ['estilo visual','tratamento de cor','saturação','preto e branco ou não'], miniExample: 'A imagem segue um estilo editorial clean, com tratamento natural, aparência fotográfica e saturação moderada. Lente 20mm.' },
    { title: 'Clima/emoção', icon: 'Heart', description: 'Define a sensação emocional da imagem.', whatIs: 'É o sentimento geral que a imagem deve transmitir.', whyMatters: 'Mesmo com boa técnica, a imagem pode parecer vazia se não tiver clima.', whatEnters: ['emoção','atmosfera','tom da cena'], miniExample: 'O resultado transmite uma sensação leve, moderna e confiante, com clima visual limpo e agradável.' },
    { title: 'Elementos obrigatórios + restrições', icon: 'Lock', description: 'Define o que precisa aparecer e o que deve ser evitado.', whatIs: 'É a parte que reforça itens indispensáveis e limitações do resultado.', whyMatters: 'Ajuda a evitar erros, excessos e elementos indesejados.', whatEnters: ['itens obrigatórios','proibições','formato','resolução'], miniExample: 'A imagem deve manter o sujeito em destaque, sem texto, sem logo e com alta resolução.' }
  ];

  // Render cards with accordion pattern
  cards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'accordion-card';

    const header = document.createElement('div');
    header.className = 'accordion-header';
    header.onclick = function() { toggleAccordion(this); };

    const titleSummary = document.createElement('div');
    titleSummary.className = 'accordion-header-text';

    const title = document.createElement('h3');
    title.className = 'accordion-title';
    title.textContent = card.title;

    const summary = document.createElement('p');
    summary.className = 'accordion-summary';
    summary.textContent = card.description;

    titleSummary.appendChild(title);
    titleSummary.appendChild(summary);

    const icon = document.createElement('div');
    icon.className = 'accordion-icon';
    icon.innerHTML = `<i data-lucide="${card.icon}"></i>`;

    header.appendChild(titleSummary);
    header.appendChild(icon);

    const body = document.createElement('div');
    body.className = 'accordion-body';
    const content = document.createElement('div');
    content.className = 'accordion-content';

    // O que é section
    const section1 = document.createElement('div');
    section1.className = 'accordion-section';
    const section1Title = document.createElement('h4');
    section1Title.className = 'accordion-section-title';
    section1Title.textContent = 'O QUE É';
    const section1Text = document.createElement('p');
    section1Text.className = 'accordion-section-text';
    section1Text.textContent = card.whatIs;
    section1.appendChild(section1Title);
    section1.appendChild(section1Text);
    content.appendChild(section1);

    // Por que isso importa section
    const section2 = document.createElement('div');
    section2.className = 'accordion-section';
    const section2Title = document.createElement('h4');
    section2Title.className = 'accordion-section-title';
    section2Title.textContent = 'POR QUE ISSO IMPORTA';
    const section2Text = document.createElement('p');
    section2Text.className = 'accordion-section-text';
    section2Text.textContent = card.whyMatters;
    section2.appendChild(section2Title);
    section2.appendChild(section2Text);
    content.appendChild(section2);

    // O que costuma entrar nessa parte section
    const section3 = document.createElement('div');
    section3.className = 'accordion-section';
    const section3Title = document.createElement('h4');
    section3Title.className = 'accordion-section-title';
    section3Title.textContent = 'O QUE COSTUMA ENTRAR NESSA PARTE';
    const list = document.createElement('ul');
    list.className = 'mini-list';
    card.whatEnters.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    section3.appendChild(section3Title);
    section3.appendChild(list);
    content.appendChild(section3);

    // Mini exemplo section
    const section4 = document.createElement('div');
    section4.className = 'accordion-section';
    const section4Title = document.createElement('h4');
    section4Title.className = 'accordion-section-title';
    section4Title.textContent = 'MINI EXEMPLO';
    const section4Text = document.createElement('p');
    section4Text.className = 'accordion-section-text';
    section4Text.textContent = card.miniExample;
    section4.appendChild(section4Title);
    section4.appendChild(section4Text);
    content.appendChild(section4);

    body.appendChild(content);
    cardEl.appendChild(header);
    cardEl.appendChild(body);
    listContainer.appendChild(cardEl);
  });

  // Render example directly into container (which already has .example-block class from HTML)
  exampleContainer.innerHTML = `
    <div class="example-header">
      <h3 class="example-title">Exemplo de prompt montado</h3>
      <p class="example-intro">Abaixo está um exemplo curto de prompt de foto usando a estrutura apresentada nesta página. O objetivo é mostrar como um briefing visual pode ficar mais claro quando organizado por partes.</p>
    </div>
    <div class="example-body">
      <div class="example-content">
        <p><strong>Sujeito:</strong> mulher jovem de pele clara / camisa branca simples e calça bege / visual limpo e casual</p>
        <p><strong>Pose/ação + expressão:</strong> em pé na calçada / olhando para a câmera / leve sorriso confiante</p>
        <p><strong>Ambiente:</strong> rua urbana limpa / prédios discretos ao fundo / dia claro em cidade moderna</p>
        <p><strong>Composição:</strong> plano médio / ângulo frontal levemente 3/4 / fundo com leve desfoque</p>
        <p><strong>Luz:</strong> luz natural suave lateral / temperatura neutra / manhã clara</p>
        <p><strong>Cores:</strong> branco / bege / cinza claro / turquesa #00AE9D como destaque</p>
        <p><strong>Textura/material:</strong> tecido de algodão / pele natural / concreto liso no ambiente</p>
        <p><strong>Estilo + processamento:</strong> fotografia editorial clean / tratamento natural / saturação moderada</p>
        <p><strong>Clima/emoção:</strong> leve / moderno / confiante</p>
        <p><strong>Elementos obrigatórios + restrições:</strong> sem texto / sem logo / alta resolução / sujeito em destaque</p>
      </div>
    </div>
  `;

  lucide.createIcons();
}

function initPromptVideo() {
  const listContainer = document.getElementById('prompt-video-list');
  const exampleContainer = document.getElementById('prompt-video-example');

  const cards = [
    { title: 'Descrição geral', icon: 'FileText', description: 'Define de forma geral o personagem, a ação principal e o cenário.', whatIs: 'É a parte em que você descreve, de forma geral, quem é o personagem, o que ele faz e onde a cena acontece.', whyMatters: 'Sem uma descrição geral clara, o gerador de vídeo não tem base para construir a cena. É o ponto de partida que ancora todos os outros elementos.', whatEnters: ['personagem principal','ação central','cenário ou localização'], miniExample: 'Um homem jovem de terno caminha por uma rua movimentada de São Paulo, com prédios comerciais ao fundo e trânsito leve.' },
    { title: 'Composição', icon: 'Frame', description: 'Define como a cena será enquadrada.', whatIs: 'É a parte que define como a câmera vê a cena.', whyMatters: 'A composição muda leitura, escala, presença e impacto visual.', whatEnters: ['plano','ângulo','lente'], miniExample: 'A cena é construída em plano médio, com ângulo frontal levemente baixo e lente que mantém o sujeito em destaque sem distorcer o ambiente.' },
    { title: 'Luz', icon: 'Sun', description: 'Define a iluminação da cena.', whatIs: 'É a direção, dureza e temperatura da luz no vídeo.', whyMatters: 'A luz define volume, profundidade, realismo e atmosfera.', whatEnters: ['direção','dureza','temperatura'], miniExample: 'A iluminação entra pela lateral com suavidade, criando sombras leves e uma temperatura neutra que deixa a cena natural e limpa.' },
    { title: 'Cores', icon: 'Palette', description: 'Define a paleta visual do vídeo.', whatIs: 'É a escolha das cores dominantes e do contraste entre elas.', whyMatters: 'A paleta ajuda a unificar a cena e reforçar identidade visual.', whatEnters: ['paleta principal','contraste','cor de destaque'], miniExample: 'A paleta combina branco, cinza claro e tons neutros, com turquesa #00AE9D aparecendo como cor de destaque.' },
    { title: 'Clima/emoção', icon: 'Heart', description: 'Define a sensação geral da cena.', whatIs: 'É o estado emocional que o vídeo deve transmitir.', whyMatters: 'Mesmo com boa técnica, um vídeo sem clima pode parecer vazio.', whatEnters: ['emoção','atmosfera','sensação dominante'], miniExample: 'O vídeo transmite uma sensação leve, confiante e moderna, com atmosfera limpa e energia controlada.' },
    { title: 'Movimento', icon: 'Move', description: 'Define como a câmera se desloca.', whatIs: 'É a orientação de movimento de câmera durante a tomada.', whyMatters: 'O movimento muda energia, fluidez e sensação de presença.', whatEnters: ['pan','tilt','dolly','handheld suave'], miniExample: 'A câmera avança com um dolly suave enquanto acompanha o sujeito, mantendo um movimento estável e elegante.' },
    { title: 'Variação de planos', icon: 'Eye', description: 'Define a variação de enquadramentos ao longo da cena.', whatIs: 'É a mudança de plano que acontece durante a tomada, quando a câmera transita de um enquadramento para outro.', whyMatters: 'A alternância de planos muda ritmo, foco e percepção de espaço, criando dinamismo dentro de uma mesma cena.', whatEnters: ['transição de plano','plano inicial vs. plano final','variação ao longo do take'], miniExample: 'A cena começa em plano aberto para situar o ambiente, passa para plano médio no sujeito e termina mais próxima para reforçar a presença.' },
    { title: 'Ritmo', icon: 'Music', description: 'Define o tempo e a velocidade da cena.', whatIs: 'É a forma como o vídeo organiza duração, cadência e sensação temporal.', whyMatters: 'O ritmo influencia tensão, leveza, dinamismo e clareza narrativa.', whatEnters: ['cortes rápidos','take contínuo','frenético','calmo'], miniExample: 'A cena tem ritmo calmo, com continuidade suave e tempo suficiente para perceber o ambiente e a ação sem pressa.' },
    { title: 'Ação', icon: 'Zap', description: 'Define o que acontece em cada tomada.', whatIs: 'É a parte que diz o que o sujeito faz, de forma clara e limitada.', whyMatters: 'Vídeos funcionam melhor quando cada tomada tem poucas ações bem definidas.', whatEnters: ['1 a 3 ações por tomada','ação principal','transição de comportamento'], miniExample: 'A personagem caminha alguns passos, olha para a câmera e depois ajusta levemente a postura enquanto continua em movimento.' }
  ];

  // Render cards with accordion pattern
  cards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'accordion-card';

    const header = document.createElement('div');
    header.className = 'accordion-header';
    header.onclick = function() { toggleAccordion(this); };

    const titleSummary = document.createElement('div');
    titleSummary.className = 'accordion-header-text';

    const title = document.createElement('h3');
    title.className = 'accordion-title';
    title.textContent = card.title;

    const summary = document.createElement('p');
    summary.className = 'accordion-summary';
    summary.textContent = card.description;

    titleSummary.appendChild(title);
    titleSummary.appendChild(summary);

    const icon = document.createElement('div');
    icon.className = 'accordion-icon';
    icon.innerHTML = `<i data-lucide="${card.icon}"></i>`;

    header.appendChild(titleSummary);
    header.appendChild(icon);

    const body = document.createElement('div');
    body.className = 'accordion-body';
    const content = document.createElement('div');
    content.className = 'accordion-content';

    // O que é section
    const section1 = document.createElement('div');
    section1.className = 'accordion-section';
    const section1Title = document.createElement('h4');
    section1Title.className = 'accordion-section-title';
    section1Title.textContent = 'O QUE É';
    const section1Text = document.createElement('p');
    section1Text.className = 'accordion-section-text';
    section1Text.textContent = card.whatIs;
    section1.appendChild(section1Title);
    section1.appendChild(section1Text);
    content.appendChild(section1);

    // Por que isso importa section
    const section2 = document.createElement('div');
    section2.className = 'accordion-section';
    const section2Title = document.createElement('h4');
    section2Title.className = 'accordion-section-title';
    section2Title.textContent = 'POR QUE ISSO IMPORTA';
    const section2Text = document.createElement('p');
    section2Text.className = 'accordion-section-text';
    section2Text.textContent = card.whyMatters;
    section2.appendChild(section2Title);
    section2.appendChild(section2Text);
    content.appendChild(section2);

    // O que costuma entrar nessa parte section
    const section3 = document.createElement('div');
    section3.className = 'accordion-section';
    const section3Title = document.createElement('h4');
    section3Title.className = 'accordion-section-title';
    section3Title.textContent = 'O QUE COSTUMA ENTRAR NESSA PARTE';
    const list = document.createElement('ul');
    list.className = 'mini-list';
    card.whatEnters.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    section3.appendChild(section3Title);
    section3.appendChild(list);
    content.appendChild(section3);

    // Mini exemplo section
    const section4 = document.createElement('div');
    section4.className = 'accordion-section';
    const section4Title = document.createElement('h4');
    section4Title.className = 'accordion-section-title';
    section4Title.textContent = 'MINI EXEMPLO';
    const section4Text = document.createElement('p');
    section4Text.className = 'accordion-section-text';
    section4Text.textContent = card.miniExample;
    section4.appendChild(section4Title);
    section4.appendChild(section4Text);
    content.appendChild(section4);

    body.appendChild(content);
    cardEl.appendChild(header);
    cardEl.appendChild(body);
    listContainer.appendChild(cardEl);
  });

  // Render example directly into container (which already has .example-block class from HTML)
  exampleContainer.innerHTML = `
    <div class="example-header">
      <h3 class="example-title">Exemplo de prompt montado</h3>
      <p class="example-intro">Abaixo está um exemplo curto de prompt de vídeo usando a estrutura apresentada nesta página. O objetivo é mostrar como uma direção audiovisual pode ficar mais clara quando organizada por partes.</p>
    </div>
    <div class="example-body">
      <div class="example-content">
        <p><strong>Descrição geral:</strong> um homem jovem de terno caminha por uma rua movimentada de São Paulo, com prédios comerciais ao fundo e trânsito leve.</p>
        <p><strong>Composição:</strong> a cena é construída em plano médio, com ângulo frontal levemente baixo e lente natural que mantém o sujeito em destaque sem distorcer o ambiente.</p>
        <p><strong>Luz:</strong> a iluminação vem de uma luz natural suave lateral, com sombras leves e temperatura neutra de fim de manhã.</p>
        <p><strong>Cores:</strong> a paleta mistura branco, cinza claro e tons urbanos neutros, com turquesa #00AE9D aparecendo como ponto de destaque visual.</p>
        <p><strong>Clima/emoção:</strong> o vídeo transmite uma sensação moderna, leve e confiante, com atmosfera limpa e controlada.</p>
        <p><strong>Movimento:</strong> a câmera acompanha com dolly suave, mantendo deslocamento estável e natural ao longo da tomada.</p>
        <p><strong>Variação de planos:</strong> a sequência começa em plano médio e se aproxima gradualmente até um close leve no final da tomada.</p>
        <p><strong>Ritmo:</strong> o ritmo é calmo, com transição fluida entre os enquadramentos e sem cortes frenéticos.</p>
        <p><strong>Ação:</strong> a personagem caminha pela calçada, olha brevemente para a câmera e ajusta a bolsa no ombro enquanto continua andando.</p>
      </div>
    </div>
  `;

  // Build video prompt generator form
  buildVideoGenForm();

  lucide.createIcons();
}

function buildVideoGenForm() {
  const form = document.getElementById('videoGenForm');
  if (!form) return;

  const fields = [
    { id: 'vgen-descricao', label: 'Descrição geral', type: 'textarea', hint: 'Escreva aqui o personagem, ação principal e cenário geral da situação do seu vídeo.' },
    { id: 'vgen-plano', label: 'Composição — Plano inicial', type: 'select', hint: '', options: ['Plano geral','Grande plano geral','Plano aberto','Plano médio','Plano médio curto','Plano americano','Close-up','Close-up extremo','Plano detalhe','Over the shoulder','Dois personagens no quadro','Corpo inteiro','Meio corpo','Retrato de busto'] },
    { id: 'vgen-angulo', label: 'Composição — Ângulo', type: 'select', hint: '', options: ['Frontal reto','Frontal levemente de cima','Frontal levemente de baixo','Perfil','3/4 frontal','3/4 traseiro','Costas','Contra-plongée','Plongée','Nível dos olhos','Ângulo inclinado','Top shot','Low angle lateral','POV','Overhead'] },
    { id: 'vgen-lente', label: 'Composição — Lente', type: 'select', hint: '', options: ['14mm ultra wide','18mm wide','24mm wide','28mm wide natural','35mm cinematográfica versátil','50mm natural','85mm retrato','100mm retrato comprimido','135mm tele curta','200mm tele'] },
    { id: 'vgen-luz', label: 'Luz', type: 'select', hint: '', options: ['Luz frontal','Luz de lado','Rembrandt lighting','Three-quarter light','Back light','Top light','Bottom light','Under light','Split lighting','Butterfly lighting','Loop lighting','Broad lighting','Short light','Hard light','Soft light','Diffused light','Specular light','Warm light','Neutral light','Cool light','Daylight','Cold light','Neon light','Snoot','Rim light','Luz de fundo','Accent light','Golden hour','Blue hour','Overcast','Direct sunlight','Luz de janela','Reflected light','Luz volumétrica','Lens flare','Chiaroscuro','High key','Low key'] },
    { id: 'vgen-cores', label: 'Cores', type: 'textarea', hint: 'Escreva aqui a paleta principal de cores, onde elas devem estar, contraste e descreva a coloração do vídeo.' },
    { id: 'vgen-clima', label: 'Clima/emoção', type: 'textarea', hint: 'Descreva qual emoção, atmosfera e sensação dominante deve ter o seu vídeo.' },
    { id: 'vgen-movimento', label: 'Movimento', type: 'select', hint: '', options: ['Static','Push in / Dolly in','Dolly out / Pull back','Pan left','Pan right','Tilt up','Tilt down','Orbit left','Orbit right','Tracking shot','Follow shot','Handheld','Gimbal shot'] },
    { id: 'vgen-variacao', label: 'Variação de plano', type: 'textarea', hint: 'Se o plano variar ao longo do vídeo, adicionar aqui. Exemplo: se torna plano médio; se torna plano aberto. Caso não varie, deixe em branco.' },
    { id: 'vgen-ritmo', label: 'Ritmo', type: 'select', hint: '', options: ['Cortes rápidos','Take contínuo','Frenético','Calmo','Parado'] },
    { id: 'vgen-acao', label: 'Ação', type: 'textarea', hint: 'Aqui, você vai detalhar todas as diferentes ações que a cena terá. Por exemplo, se você quer um vídeo de uma pessoa andando, fale se ela deve olhar para o lado, ou sorrir… Qualquer ação secundária entra aqui.' },
    { id: 'vgen-gerador', label: 'Gerador de vídeo', type: 'textarea', hint: 'Digite aqui qual gerador de vídeo você usará, como Google Veo, Kling, Seedance, etc.' }
  ];

  let html = '';
  fields.forEach(f => {
    html += '<div class="vgen-field">';
    html += `<label class="vgen-label" for="${f.id}">${f.label}</label>`;
    if (f.hint) html += `<span class="vgen-hint">${f.hint}</span>`;
    if (f.type === 'textarea') {
      html += `<textarea class="vgen-textarea" id="${f.id}" rows="2"></textarea>`;
    } else if (f.type === 'select') {
      html += `<select class="vgen-select" id="${f.id}">`;
      html += '<option value="">Selecione...</option>';
      f.options.forEach(opt => {
        html += `<option value="${opt}">${opt}</option>`;
      });
      html += '<option value="__outro__">Outro</option>';
      html += '</select>';
      html += `<input type="text" class="vgen-outro-input" id="${f.id}-outro" placeholder="Digite aqui...">`;
    }
    html += '</div>';
  });

  html += '<div class="vgen-actions">';
  html += '<button class="prompt-gen-btn" id="videoGenBtn" onclick="sendVideoToChatGPT()"><i data-lucide="copy" style="width:18px;height:18px"></i><span>Gerar e Copiar</span></button>';
  html += '</div>';

  form.innerHTML = html;

  // Wire up "Outro" toggles
  form.querySelectorAll('.vgen-select').forEach(sel => {
    sel.addEventListener('change', function() {
      const outroInput = document.getElementById(this.id + '-outro');
      if (outroInput) {
        outroInput.style.display = this.value === '__outro__' ? 'block' : 'none';
        if (this.value === '__outro__') outroInput.focus();
      }
    });
  });
}

function getVideoFieldValue(id) {
  const sel = document.getElementById(id);
  if (!sel) return '';
  if (sel.tagName === 'SELECT') {
    if (sel.value === '__outro__') {
      const outro = document.getElementById(id + '-outro');
      return outro ? outro.value.trim() : '';
    }
    return sel.value;
  }
  return sel.value.trim();
}

function sendVideoToChatGPT() {
  const parts = [];
  const descricao = getVideoFieldValue('vgen-descricao');
  if (descricao) parts.push(descricao);
  const plano = getVideoFieldValue('vgen-plano');
  if (plano) parts.push(plano);
  const angulo = getVideoFieldValue('vgen-angulo');
  if (angulo) parts.push(angulo);
  const lente = getVideoFieldValue('vgen-lente');
  if (lente) parts.push(lente);
  const luz = getVideoFieldValue('vgen-luz');
  if (luz) parts.push(luz);
  const cores = getVideoFieldValue('vgen-cores');
  if (cores) parts.push(cores);
  const clima = getVideoFieldValue('vgen-clima');
  if (clima) parts.push(clima);
  const movimento = getVideoFieldValue('vgen-movimento');
  if (movimento) parts.push(movimento);
  const variacao = getVideoFieldValue('vgen-variacao');
  if (variacao) parts.push('para ' + variacao);
  const ritmo = getVideoFieldValue('vgen-ritmo');
  if (ritmo) parts.push(ritmo);
  const acao = getVideoFieldValue('vgen-acao');
  if (acao) parts.push(acao);
  const gerador = getVideoFieldValue('vgen-gerador');
  if (gerador) parts.push(gerador);

  const userInfo = parts.join(' ');
  if (!userInfo) return;

  const fullPrompt = `# Prompt Gerado: Conversor de Entrada Compacta em Prompt de Vídeo Bilíngue

Contexto e papel
Você é um especialista em criação de prompts para geradores de vídeo. Sua tarefa é interpretar uma entrada compacta gerada por um app e transformá-la em um prompt de vídeo completo, cinematográfico, fiel e pronto para uso, em português e em inglês.

Regras operacionais
— Comece com uma lista de verificação concisa (15 a 30 marcadores) das etapas que você executará conceitualmente para garantir que todas as subtarefas principais sejam abordadas antes de gerar a saída.
— Não exponha cadeia de pensamento; entregue apenas a interpretação estruturada e o resultado final.
— Proatividade: média • Verbosidade: média • Esforço: médio
— Toda a parte anterior a esta instrução é fixa e serve apenas como regra de funcionamento.
— A única entrada dinâmica do usuário estará no final desta mensagem.
— Considere como entrada do usuário apenas a última linha ou último bloco textual desta mensagem.
— Não trate as instruções acima como parte da cena.
— A partir da entrada final, identifique e reorganize os elementos cinematográficos que estiverem presentes.
— A última parte da entrada do usuário normalmente contém a plataforma de geração de vídeo, como Google Veo, Kling, Seedance, Runway, Pika, Luma ou similar.
— Detecte a plataforma a partir do final da entrada do usuário.
— Remova a plataforma do corpo descritivo da cena antes de escrever os prompts finais.
— Preserve todos os detalhes concretos fornecidos pelo usuário.
— Não invente personagem, ação, cenário, emoção ou estilo central que não estejam explícitos ou claramente implícitos.
— Quando faltar informação, apenas omita esse elemento ou conecte o texto com linguagem neutra.
— Se houver conflito entre elementos, priorize o detalhe mais específico; persistindo o conflito, priorize o último detalhe explícito.
— Gere dois prompts finais equivalentes: um em português e outro em inglês.
— O resultado deve ficar pronto para copiar e usar.

Função central e capacidades
— Interpretar uma linha compacta com descrição e vocabulário audiovisual
— Identificar descrição geral, composição, ângulo, lente, luz, cores, clima, movimento, variação de plano, ritmo, ação e plataforma quando presentes
— Reescrever a entrada em linguagem cinematográfica natural
— Adaptar a formulação ao gerador detectado sem alegar sintaxes proprietárias não confirmadas
— Produzir uma versão em português e outra em inglês com o mesmo sentido

Configuração técnica
— A entrada do usuário está sempre no final desta mensagem
— Essa entrada pode vir como uma única linha ou um pequeno bloco de texto
— A plataforma pode ter de 1 a 4 palavras
— Trate termos como "plano médio", "close-up", "follow shot", "split lighting", "18mm wide", "take contínuo", "cores frias" etc. como pistas cinematográficas
— Caso a plataforma não seja identificada com segurança, use um formato neutro compatível com geradores de vídeo em geral

Especificações de saída
Entregue exatamente neste formato:

1. Plataforma detectada
[Nome da plataforma detectada ou "Plataforma não identificada"]

2. Prompt em português
[Um único parágrafo, claro, cinematográfico, completo, natural e pronto para uso]

3. Prompt in English
[One single paragraph, clear, cinematic, complete, natural, and ready to use]

4. Observações
— [2 a 4 tópicos curtos explicando decisões de adaptação, apenas quando necessário]

Tratamento de erros
— Se a plataforma não puder ser identificada com segurança, escreva "Plataforma não identificada"
— Se a entrada estiver incompleta, preserve o que existir e complete apenas com conectores mínimos de fluidez
— Se houver ambiguidade, use a interpretação cinematográfica mais provável
— Nunca peça esclarecimentos; sempre produza a melhor saída possível com base na entrada final

Controles de qualidade
— Verifique se a plataforma foi detectada a partir do final da entrada do usuário
— Verifique se a plataforma não foi indevidamente mantida dentro da descrição da cena
— Verifique se nenhum detalhe importante da entrada foi perdido
— Verifique se o prompt em inglês corresponde ao prompt em português
— Verifique se não há contradições nem redundâncias desnecessárias
— Verifique se a saída segue exatamente o formato solicitado

Segurança e ética
— Não adicionar conteúdo ilegal ou perigoso
— Não adicionar violência gráfica extrema
— Não adicionar sexualização imprópria
— Não inserir marcas, personagens ou pessoas não mencionadas

Regras adicionais
— A entrada real do usuário está no final desta mensagem
— Use somente essa entrada final como base semântica
— Tudo o que vem antes é instrução fixa
— Não responda com explicações sobre o processo
— Responda apenas no formato definido acima

${userInfo}`;

  navigator.clipboard.writeText(fullPrompt).then(() => {
    const btn = document.getElementById('videoGenBtn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="check" style="width:18px;height:18px"></i> Copiado! Cole no ChatGPT';
    btn.style.background = '#003641';
    lucide.createIcons();
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      lucide.createIcons();
    }, 3000);
    window.open('https://chatgpt.com/', '_blank');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = fullPrompt;
    ta.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    window.open('https://chatgpt.com/', '_blank');
  });
}

function initPalavrasChave() {
  const chartContainer = document.getElementById('attention-chart');
  const contentContainer = document.getElementById('palavras-chave-content');

  // Chart data
  const chartData = [
    { label: 'Sujeito principal', percentage: 35 },
    { label: 'Ação e pose', percentage: 20 },
    { label: 'Ambiente e cenário', percentage: 15 },
    { label: 'Iluminação', percentage: 15 },
    { label: 'Ângulo e enquadramento', percentage: 10 },
    { label: 'Equipamento e configurações', percentage: 3 },
    { label: 'Estilo fotográfico', percentage: 2 }
  ];

  // Render chart
  chartData.forEach(item => {
    const barDiv = document.createElement('div');
    barDiv.className = 'chart-bar';
    barDiv.innerHTML = `
      <span class="chart-label">${escapeHtml(item.label)}</span>
      <div class="chart-track">
        <div class="chart-fill" style="width: ${item.percentage}%"></div>
      </div>
      <span class="chart-pct">${item.percentage}%</span>
    `;
    chartContainer.appendChild(barDiv);
  });

  // Card data
  const cardsData = {
    'Ângulos e enquadramentos': [
      { file: 'PALAVRACHAVE_1.png', name: 'Nível do olho', desc: 'Câmera posicionada na altura dos olhos do sujeito. Gera naturalidade, equilíbrio e sensação de proximidade, favorecendo conexão direta com quem observa.' },
      { file: 'PALAVRACHAVE_2.png', name: 'High angle / Bird\'s eye view', desc: 'Câmera acima do sujeito, voltada para baixo. Costuma sugerir fragilidade, vulnerabilidade ou submissão, além de ampliar a leitura do espaço ao redor.' },
      { file: 'PALAVRACHAVE_3.png', name: 'Low angle / Worm\'s eye view', desc: 'Câmera posicionada abaixo do sujeito, voltada para cima. Costuma transmitir força, autoridade e imponência, fazendo o elemento principal parecer mais dominante.' },
      { file: 'PALAVRACHAVE_4.png', name: 'Dutch angle', desc: 'Câmera inclinada de forma proposital. Gera tensão, instabilidade e energia visual, sendo útil para cenas com desconforto, urgência ou dinamismo.' },
      { file: 'PALAVRACHAVE_5.png', name: 'Extreme close-up', desc: 'Foco em um detalhe muito específico, como olhos, lábios ou mãos. Cria intimidade extrema, intensidade e forte carga emocional.' },
      { file: 'PALAVRACHAVE_6.png', name: 'Close-up', desc: 'O rosto ocupa grande parte do enquadramento. Valoriza expressão, personalidade e proximidade, sendo ideal para emoções sutis.' },
      { file: 'PALAVRACHAVE_7.png', name: 'Close-up médio', desc: 'Enquadramento aproximado do peito para cima, favorecendo o rosto e mantendo uma leitura mais equilibrada entre expressão e postura.' },
      { file: 'PALAVRACHAVE_8.png', name: 'Shot médio', desc: 'Enquadra aproximadamente da cintura para cima. Mantém o sujeito em evidência sem perder totalmente o ambiente ao redor.' },
      { file: 'PALAVRACHAVE_9.png', name: 'American / Cowboy shot', desc: 'Mostra o sujeito do meio das coxas para cima. É um enquadramento clássico de cinema que equilibra presença corporal e leitura narrativa.' },
      { file: 'PALAVRACHAVE_10.png', name: 'Medium wide shot', desc: 'Enquadra aproximadamente dos joelhos para cima. Ajuda a mostrar melhor o corpo e a postura, sem abrir demais a cena.' },
      { file: 'PALAVRACHAVE_11.png', name: 'Full shot / Corpo inteiro', desc: 'Mostra o sujeito por inteiro. É útil para destacar a relação entre corpo, roupa, pose e espaço, favorecendo leitura de contexto e storytelling.' },
      { file: 'PALAVRACHAVE_12.png', name: 'Wide shot / Long shot', desc: 'Mostra o sujeito com bastante espaço ao redor. Reforça ambiente, escala e contexto, sendo ótimo para cenas em que o espaço importa tanto quanto o personagem.' }
    ],
    'Estilo fotográfico': [
      { file: 'PALAVRACHAVE_13.png', name: 'Fotografia fashion', desc: 'Linguagem voltada para moda, estilo e desejo visual. Costuma transmitir sofisticação, tendência e aspiração estética.' },
      { file: 'PALAVRACHAVE_14.png', name: 'Fotografia lifestyle', desc: 'Retrata situações cotidianas com naturalidade. Passa autenticidade, proximidade e identificação, sendo muito usada para marcas mais humanas.' },
      { file: 'PALAVRACHAVE_15.png', name: 'Fotografia corporativa', desc: 'Mostra ambientes e pessoas em contexto profissional. Comunica confiança, competência e credibilidade institucional.' },
      { file: 'PALAVRACHAVE_16.png', name: 'Fotografia de rua', desc: 'Valoriza momentos espontâneos em espaços públicos. Costuma transmitir realidade, energia urbana e sensação de instante capturado.' },
      { file: 'PALAVRACHAVE_17.png', name: 'Fotografia editorial', desc: 'Imagens pensadas para sustentar uma narrativa visual, como em revistas e publicações. Ajuda a comunicar conceito, contexto e intenção de forma mais construída.' }
    ],
    'Estética e processamento': [
      { file: 'PALAVRACHAVE_18.png', name: 'Alta saturação', desc: 'Cores mais intensas e vibrantes. Gera impacto visual, energia e sensação de modernidade, chamando atenção com facilidade.' },
      { file: 'PALAVRACHAVE_19.png', name: 'Dessaturado / Muted tones', desc: 'Cores suavizadas e menos intensas. Costuma transmitir refinamento, sobriedade e uma atmosfera mais contemplativa.' },
      { file: 'PALAVRACHAVE_20.png', name: 'Monocromático / Preto e branco', desc: 'Remove a cor e concentra a leitura em luz, forma e contraste. Reforça drama, atemporalidade e foco na essência da cena.' },
      { file: 'PALAVRACHAVE_21.png', name: 'Estilo cinematográfico', desc: 'Visual inspirado em linguagem de cinema, com tratamento de cor e atmosfera mais narrativa. Costuma elevar a percepção de profundidade emocional e acabamento premium.' },
      { file: 'PALAVRACHAVE_22.png', name: 'Vintage / Estética de filme', desc: 'Aparência que remete a filme fotográfico, com grão e caráter retrô. Passa nostalgia, autenticidade e charme visual.' }
    ],
    'Lentes': [
      { file: 'PALAVRACHAVE_23.png', name: 'Wide angle (14–35mm)', desc: 'Campo de visão mais amplo, incluindo mais elementos da cena. Ajuda a transmitir espaço, contexto e dinamismo, sendo forte para paisagens e arquitetura.' },
      { file: 'PALAVRACHAVE_24.png', name: 'Normal lens (35–85mm)', desc: 'Perspectiva próxima da visão humana. Costuma gerar naturalidade, equilíbrio e realismo, sendo versátil para vários tipos de imagem.' },
      { file: 'PALAVRACHAVE_25.png', name: 'Telephoto (85–200mm+)', desc: 'Campo de visão mais estreito, que comprime o espaço e isola o sujeito. É especialmente útil para retratos e detalhes.' },
      { file: 'PALAVRACHAVE_26.png', name: 'Wide aperture (f/1.4 – f/2.8)', desc: 'Gera profundidade de campo rasa e fundo desfocado. Ajuda a destacar o sujeito com elegância e separação visual clara.' },
      { file: 'PALAVRACHAVE_27.png', name: 'Narrow aperture (f/8 – f/16)', desc: 'Mantém mais elementos em foco do primeiro ao último plano. Transmite clareza ampla, leitura completa da cena e precisão técnica.' }
    ],
    'Iluminação': [
      { file: 'PALAVRACHAVE_LUZ_1.png', name: 'Luz frontal', desc: 'Ilumina o sujeito de frente, reduzindo sombras. Passa clareza, simplicidade e transparência, embora possa deixar a imagem mais chapada.' },
      { file: 'PALAVRACHAVE_LUZ_2.png', name: 'Luz de lado', desc: 'Vem lateralmente e destaca volume, relevo e textura. Tende a criar mais profundidade e personalidade no retrato.' },
      { file: 'PALAVRACHAVE_LUZ_3.png', name: 'Rembrandt lighting / Three-quarter light', desc: 'Luz em torno de 45° do sujeito, formando um triângulo iluminado na bochecha oposta. Equilibra drama e clareza com elegância clássica.' },
      { file: 'PALAVRACHAVE_LUZ_4.png', name: 'Back light', desc: 'Vem de trás do sujeito, criando halo ou silhueta. Reforça separação do fundo e pode transmitir mistério, poesia e dramaticidade.' },
      { file: 'PALAVRACHAVE_LUZ_5.png', name: 'Top light', desc: 'Luz que vem de cima, criando sombras marcadas sob olhos, nariz e queixo. Pode ser expressiva e dramática quando bem controlada.' },
      { file: 'PALAVRACHAVE_LUZ_6.png', name: 'Bottom light / Under light', desc: 'Luz vinda de baixo, invertendo o padrão natural das sombras. Costuma gerar estranhamento, artificialidade e efeito dramático ou sinistro.' },
      { file: 'PALAVRACHAVE_LUZ_7.png', name: 'Split lighting', desc: 'Metade do rosto fica iluminada e a outra metade em sombra. É um recurso forte para dualidade, tensão e dramaticidade.' },
      { file: 'PALAVRACHAVE_LUZ_8.png', name: 'Butterfly lighting', desc: 'Luz frontal elevada que cria uma pequena sombra abaixo do nariz. Remete ao glamour clássico e funciona muito bem em retratos elegantes.' },
      { file: 'PALAVRACHAVE_LUZ_9.png', name: 'Loop lighting', desc: 'Variação suave do three-quarter, em que a sombra do nariz forma uma pequena curva na bochecha. É natural, versátil e favorece muitos rostos.' },
      { file: 'PALAVRACHAVE_LUZ_10.png', name: 'Broad lighting', desc: 'Ilumina o lado do rosto voltado para a câmera. Tende a ampliar visualmente a face e suavizar ângulos.' },
      { file: 'PALAVRACHAVE_LUZ_11.png', name: 'Short light', desc: 'Ilumina o lado do rosto mais distante da câmera. Afina a face visualmente e produz um efeito mais escultural e dramático.' },
      { file: 'PALAVRACHAVE_LUZ_12.png', name: 'Hard light', desc: 'Sombras duras e contrastes fortes, típicos de fonte pequena ou distante. Reforça força visual, textura e intensidade.' },
      { file: 'PALAVRACHAVE_LUZ_13.png', name: 'Soft light', desc: 'Sombras suaves e transições delicadas. Comunica leveza, elegância e delicadeza, sendo muito favorável para pele e retratos refinados.' },
      { file: 'PALAVRACHAVE_LUZ_14.png', name: 'Diffused light', desc: 'Luz espalhada de forma uniforme, com poucas sombras marcantes. Gera sensação de calma, neutralidade e naturalidade.' },
      { file: 'PALAVRACHAVE_LUZ_15.png', name: 'Specular light', desc: 'Luz direta e brilhante que cria reflexos intensos. É muito útil para destacar superfícies molhadas, metálicas ou muito reflexivas.' },
      { file: 'PALAVRACHAVE_LUZ_16.png', name: 'Warm light', desc: 'Tons dourados, alaranjados e avermelhados. Costuma evocar aconchego, intimidade e nostalgia.' },
      { file: 'PALAVRACHAVE_LUZ_17.png', name: 'Neutral light', desc: 'Equilíbrio entre quente e frio. É uma escolha segura quando se quer naturalidade e versatilidade visual.' },
      { file: 'PALAVRACHAVE_LUZ_18.png', name: 'Cool light', desc: 'Tons levemente azulados e sensação mais limpa. Costuma comunicar clareza, objetividade e estética contemporânea.' },
      { file: 'PALAVRACHAVE_LUZ_19.png', name: 'Daylight', desc: 'Temperatura associada à luz solar direta, usada como referência de neutralidade de cor. Funciona muito bem para retratos naturais e fotografia comercial.' },
      { file: 'PALAVRACHAVE_LUZ_20.png', name: 'Cold light', desc: 'Tons azulados mais acentuados. Costuma sugerir tecnologia, frieza, precisão e atmosfera futurista.' },
      { file: 'PALAVRACHAVE_LUZ_21.png', name: 'Neon light', desc: 'Iluminação artificial colorida com forte presença visual. Transmite energia urbana, modernidade e estética mais sintética ou cyberpunk.' },
      { file: 'PALAVRACHAVE_LUZ_22.png', name: 'Snoot', desc: 'Concentra a luz em um feixe estreito e preciso. É excelente para destacar detalhes específicos ou separar áreas da cena.' },
      { file: 'PALAVRACHAVE_LUZ_23.png', name: 'Rim light', desc: 'Luz de contorno nas bordas do sujeito. Ajuda a destacar silhueta, profundidade e separação do fundo.' },
      { file: 'PALAVRACHAVE_LUZ_24.png', name: 'Luz de fundo', desc: 'Ilumina o fundo de forma independente. Ajuda a controlar a separação tonal entre cenário e sujeito e permite efeitos mais construídos no background.' },
      { file: 'PALAVRACHAVE_LUZ_25.png', name: 'Accent light', desc: 'Destaca pontos específicos da cena e cria hierarquia visual. É útil para reforçar interesse e ambientação.' },
      { file: 'PALAVRACHAVE_LUZ_26.png', name: 'Golden hour', desc: 'Luz dourada próxima ao nascer ou pôr do sol. Tende a ser suave, quente e muito valorizada por sua beleza natural.' },
      { file: 'PALAVRACHAVE_LUZ_27.png', name: 'Blue hour', desc: 'Luz azulada logo após o pôr do sol ou antes do amanhecer. É muito forte para cenas urbanas, arquitetura e atmosferas mais dramáticas.' },
      { file: 'PALAVRACHAVE_LUZ_28.png', name: 'Overcast', desc: 'Luz difusa causada por céu encoberto. Produz suavidade, uniformidade e poucas sombras duras.' },
      { file: 'PALAVRACHAVE_LUZ_29.png', name: 'Direct sunlight', desc: 'Luz solar direta e intensa, com sombras duras e contraste alto. Pode ser desafiadora, mas gera dramaticidade quando bem usada.' },
      { file: 'PALAVRACHAVE_LUZ_30.png', name: 'Luz de janela', desc: 'Luz natural que entra por janelas, geralmente direcional e suave. É muito versátil para retratos internos.' },
      { file: 'PALAVRACHAVE_LUZ_31.png', name: 'Reflected light', desc: 'Luz rebatida por superfícies do ambiente, como paredes, areia ou neve. Costuma ser envolvente, macia e orgânica.' },
      { file: 'PALAVRACHAVE_LUZ_32.png', name: 'Luz volumétrica', desc: 'Luz visível no ar por causa de partículas ou névoa. Cria raios marcados e reforça profundidade atmosférica.' },
      { file: 'PALAVRACHAVE_LUZ_33.png', name: 'Lens flare', desc: 'Reflexos internos da lente que aparecem como pontos ou riscos de luz. Pode ser usado de forma artística para energia, brilho e sensação contemporânea.' },
      { file: 'PALAVRACHAVE_LUZ_34.png', name: 'Chiaroscuro', desc: 'Contraste extremo entre luz e sombra, com forte herança pictórica. Reforça dramaticidade, intensidade emocional e peso visual.' },
      { file: 'PALAVRACHAVE_LUZ_35.png', name: 'High key', desc: 'Predomínio de tons claros e baixo contraste. Passa leveza, pureza e otimismo, sendo ótimo para visuais delicados e luminosos.' },
      { file: 'PALAVRACHAVE_LUZ_36.png', name: 'Low key', desc: 'Predomínio de tons escuros com poucos pontos de luz. Gera mistério, elegância e dramaticidade, com forte presença visual.' }
    ]
  };

  // Render cards
  Object.entries(cardsData).forEach(([category, cards]) => {
    const categorySection = document.createElement('div');
    categorySection.className = 'category-section';

    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'category-title';
    categoryTitle.textContent = category;
    categorySection.appendChild(categoryTitle);

    const grid = document.createElement('div');
    grid.className = 'img-cards-grid';

    cards.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = 'img-card';
      cardEl.innerHTML = `
        <img src="assets/${card.file}" alt="${card.name}" />
        <div class="img-card-body">
          <h4 class="img-card-name">${escapeHtml(card.name)}</h4>
          <p class="img-card-desc">${escapeHtml(card.desc)}</p>
        </div>
      `;
      grid.appendChild(cardEl);
    });

    categorySection.appendChild(grid);
    contentContainer.appendChild(categorySection);
  });
}

function initMovimentos() {
  const gridContainer = document.getElementById('movimentos-grid');
  const dicasContainer = document.getElementById('movimentos-dicas');
  const outrasContainer = document.getElementById('movimentos-outras');

  // Main 7 videos
  const videos = [
    { file: 'VIDEO_MOVIMENTO_1.mp4', name: 'Push In / Dolly In', desc: 'A câmera avança em direção ao sujeito. Esse movimento ajuda a concentrar atenção, aumentar intensidade e criar sensação de aproximação emocional.' },
    { file: 'VIDEO_MOVIMENTO_2.mp4', name: 'Dolly Out / Pull Back', desc: 'A câmera se afasta do sujeito. É muito útil para revelar o ambiente, ampliar contexto ou transmitir sensação de distância.' },
    { file: 'VIDEO_MOVIMENTO_3.mp4', name: 'Pan Left / Pan Right', desc: 'A câmera gira para a esquerda ou para a direita sem sair do lugar. Funciona bem para leitura lateral do espaço e para revelações graduais do ambiente.' },
    { file: 'VIDEO_MOVIMENTO_4.mp4', name: 'Tilt Up / Tilt Down', desc: 'A câmera inclina para cima ou para baixo. É um recurso forte para revelar altura, direção do olhar, corpo, rosto, prédio ou objeto.' },
    { file: 'VIDEO_MOVIMENTO_5.mp4', name: 'Orbit / Arc Shot', desc: 'A câmera gira ao redor do personagem. Esse movimento costuma gerar sensação forte de cinema, volume e presença tridimensional.' },
    { file: 'VIDEO_MOVIMENTO_6.mp4', name: 'Tracking Shot / Follow Shot', desc: 'A câmera acompanha o personagem em movimento. É muito útil para cenas de caminhada, corredor, rua, escritório e deslocamento contínuo.' },
    { file: 'VIDEO_MOVIMENTO_7.mp4', name: 'Handheld', desc: 'A câmera acompanha a cena com leve instabilidade orgânica. Esse efeito costuma transmitir proximidade, energia, realismo e presença física.' }
  ];

  // Render video cards
  videos.forEach(video => {
    const card = document.createElement('div');
    card.className = 'vid-card';
    card.innerHTML = `
      <video controls playsinline>
        <source src="assets/${video.file}" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="vid-card-body">
        <h4>${escapeHtml(video.name)}</h4>
        <p>${escapeHtml(video.desc)}</p>
      </div>
    `;
    gridContainer.appendChild(card);
  });

  // Dicas accordion
  const dicasCard = document.createElement('div');
  dicasCard.className = 'accordion-card';
  const dicasHeader = document.createElement('div');
  dicasHeader.className = 'accordion-header';
  dicasHeader.onclick = function(){ toggleAccordion(this); };
  dicasHeader.innerHTML = `
    <div class="accordion-header-text"><strong>Dicas</strong><br><small>Orientações para prompts de câmera</small></div>
    <div class="accordion-icon"><i data-lucide="plus"></i></div>
  `;
  const dicasBody = document.createElement('div');
  dicasBody.className = 'accordion-body';
  dicasBody.innerHTML = `
    <div class="accordion-content">
      <div class="accordion-section">
        <p class="accordion-section-text">Estas orientações ajudam a escrever prompts de câmera com mais clareza, intenção visual e consistência no resultado.</p>
      </div>
      <ul class="mini-list">
        <li>Um movimento por tomada costuma funcionar melhor do que dois ou três ao mesmo tempo</li>
        <li>Movimentos lentos e legíveis costumam funcionar melhor do que movimentos rápidos e agressivos</li>
        <li>Quanto mais clara for a ação principal, melhor o modelo entende para onde a cena deve ir</li>
        <li>A câmera deve reforçar a intenção da cena, não competir com o personagem</li>
        <li>Prompts com direção visual simples costumam gerar resultados mais consistentes do que prompts cheios de comandos ao mesmo tempo</li>
        <li>Um bom movimento de câmera não é o mais chamativo, mas o que melhor conduz o olhar</li>
      </ul>
    </div>
  `;
  dicasCard.appendChild(dicasHeader);
  dicasCard.appendChild(dicasBody);
  dicasContainer.appendChild(dicasCard);

  // Outras opções accordion
  const outrasCard = document.createElement('div');
  outrasCard.className = 'accordion-card';
  const outrasHeader = document.createElement('div');
  outrasHeader.className = 'accordion-header';
  outrasHeader.onclick = function(){ toggleAccordion(this); };
  outrasHeader.innerHTML = `
    <div class="accordion-header-text"><strong>Outras opções</strong><br><small>Termos adicionais de direção de câmera</small></div>
    <div class="accordion-icon"><i data-lucide="plus"></i></div>
  `;
  const outrasBody = document.createElement('div');
  outrasBody.className = 'accordion-body';
  outrasBody.innerHTML = `
    <div class="accordion-content">
      <div class="accordion-section">
        <p class="accordion-section-text">Além dos movimentos mais comuns, existem muitos outros termos que ajudam a refinar a direção da câmera no prompt. A lista abaixo amplia esse repertório e pode ser usada para ajustes mais específicos de linguagem visual.</p>
      </div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Zoom In</strong> – Aproximação óptica sem deslocar fisicamente a câmera.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Zoom Out</strong> – Afastamento óptico sem deslocar fisicamente a câmera.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Truck Left</strong> – Deslocamento lateral da câmera para a esquerda.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Truck Right</strong> – Deslocamento lateral da câmera para a direita.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Slider Left</strong> – Deslizamento lateral suave para a esquerda.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Slider Right</strong> – Deslizamento lateral suave para a direita.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Pedestal Up</strong> – Elevação vertical da câmera sem inclinar o enquadramento.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Pedestal Down</strong> – Descida vertical da câmera sem inclinar o enquadramento.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Roll</strong> – Rotação da câmera no próprio eixo.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Dutch Roll</strong> – Rotação inclinada da câmera para reforçar desconforto ou efeito dramático.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Push Through</strong> – A câmera avança atravessando elementos da cena.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Fly-Through</strong> – A câmera percorre o ambiente de forma contínua, como se estivesse voando pelo espaço.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Reveal Move</strong> – Movimento desenhado para revelar algo importante dentro da cena.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Lateral Reveal</strong> – Revelação construída por meio de deslocamento lateral da câmera.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Foreground Pass</strong> – A câmera passa por objetos em primeiro plano para criar profundidade e sensação de imersão.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Top-Down Drift</strong> – Movimento suave em vista de cima, com sensação de flutuação.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Overhead Rise</strong> – Subida de câmera em ângulo superior.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Overhead Descend</strong> – Descida de câmera em ângulo superior.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Sway Move</strong> – Balanço leve e sutil da câmera.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Float Cam</strong> – Movimento flutuante, suave e leve, com sensação aérea ou etérea.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Snap Zoom</strong> – Zoom rápido e brusco para gerar impacto.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Slow Drift</strong> – Deslocamento muito suave, quase imperceptível.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Glide Move</strong> – Movimento deslizante, limpo e estável.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Parallax Move</strong> – Movimento que reforça separação visual entre frente, meio e fundo.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>POV Move</strong> – Movimento em ponto de vista, como se a câmera enxergasse pela perspectiva do personagem.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Drone Rise</strong> – Subida aérea da câmera.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Drone Descend</strong> – Descida aérea da câmera.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Drone Flyover</strong> – Sobrevoo por cima do ambiente ou do sujeito.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Pass-By</strong> – A câmera passa ao lado do sujeito durante o movimento.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Push Past</strong> – A câmera avança e ultrapassa o sujeito.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Rack Focus</strong> – Mudança de foco entre elementos da cena.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Focus Pull</strong> – Transição de foco de um plano para outro.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Whip Pan</strong> – Giro horizontal muito rápido para impacto ou transição.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Whip Tilt</strong> – Inclinação vertical muito rápida para impacto, energia ou revelação.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Boom Up</strong> – Subida física da câmera com sensação mais cinematográfica.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Boom Down</strong> – Descida física da câmera com sensação mais cinematográfica.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Dolly Zoom</strong> – Aproximação ou afastamento com compensação de zoom, criando distorção espacial característica.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Push Over</strong> – A câmera avança por cima de uma superfície ou objeto.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Slide Past</strong> – Deslizamento lateral passando pelo sujeito ou por objetos da cena.</p></div>
      <div class="accordion-section"><p class="accordion-section-text"><strong>Circular Drift</strong> – Movimento circular suave e contínuo ao redor da cena.</p></div>
    </div>
  `;
  outrasCard.appendChild(outrasHeader);
  outrasCard.appendChild(outrasBody);
  outrasContainer.appendChild(outrasCard);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// ============================================================================
// PROMPT GENERATOR (ChatGPT redirect)
// ============================================================================

function sendImageToChatGPT() {
  const input = document.getElementById('imageGenInput');
  const userText = input.value.trim();
  if (!userText) return;

  const fullPrompt = `Você é um especialista em transformar descrições simples de fotos em prompts visuais cinematográficos, esteticamente agradáveis e tecnicamente consistentes para geração de imagens.

Sua tarefa é receber um texto livre do usuário descrevendo uma foto, cena ou ideia visual e convertê-lo em uma estrutura organizada de prompt fotográfico, refinando a descrição para ficar mais elegante, cinematográfica, harmoniosa e visualmente forte, sem perder a intenção original.

Siga obrigatoriamente esta sequência de construção:
1) Sujeito
2) Pose/ação + expressão
3) Ambiente
4) Composição
5) Luz
6) Cores
7) Textura/material
8) Estilo + processamento
9) Clima/emoção
10) Elementos obrigatórios + restrições

Regras operacionais
— Comece com uma lista de verificação concisa (15 a 30 marcadores) das etapas que você executará conceitualmente para garantir que todas as subtarefas principais sejam abordadas antes de gerar a saída.
— Não exponha cadeia de pensamento; use apenas justificativa curta quando realmente necessário.
— Proatividade: médio • Verbosidade: baixa • Esforço: médio
— Preserve sempre o assunto principal e a intenção original do usuário.
— Reescreva a descrição em linguagem visual, específica, fotográfica e cinematográfica.
— Enriqueça a cena para deixá-la mais estética e impactante, sem descaracterizar o conteúdo-base.
— Quando faltarem detalhes, complete com escolhas plausíveis, elegantes e coerentes com a cena.
— Evite termos vagos como "bonito", "legal", "incrível" ou "alta qualidade" sem traduzir isso em decisões visuais concretas.
— Não explique o processo.
— Não use texto introdutório, conclusão ou comentários extras.
— Não invente marcas, celebridades, logotipos ou textos na imagem, salvo pedido explícito.
— Sempre que possível, puxe o resultado para uma estética editorial cinematográfica contemporânea.

Função central e capacidades
— Interpretar descrições curtas, médias ou longas.
— Extrair sujeito, ação, cenário e intenção visual.
— Organizar o conteúdo na sequência obrigatória.
— Melhorar direção fotográfica, composição, luz, paleta e acabamento.
— Completar lacunas com decisões visuais consistentes.
— Adaptar o resultado para retrato, moda, street, lifestyle, produto, corporativo, documental ou fine art, conforme o contexto.

Configuração técnica
— Idioma de saída: português do Brasil.
— A resposta final deve seguir exatamente a estrutura abaixo.
— Cada bloco deve ter conteúdo objetivo, visual e específico.
— Tamanho ideal total: 120 a 260 palavras.

Especificações de saída
— Retorne somente no formato abaixo, sem adicionar nada antes ou depois:

Sujeito
[descreva quem é, aparência, roupa e atributos essenciais]

Pose/ação + expressão
[descreva gesto, postura, movimento, olhar e expressão]

Ambiente
[descreva local, época, contexto e elementos de cenário]

Composição
[descreva plano, ângulo, enquadramento, lente e profundidade de campo]

Luz
[descreva direção, dureza, temperatura, tipo de luz, efeitos e horário]

Cores
[descreva a paleta predominante e relações de cor]

Textura/material
[descreva superfícies, tecidos, materiais e sensação tátil]

Estilo + processamento
[descreva linguagem visual, referência estética e tratamento de imagem]

Clima/emoção
[descreva a atmosfera emocional da cena]

Elementos obrigatórios + restrições
[descreva itens que devem aparecer e restrições como sem texto, sem logo, sem marca-d'água]

Tratamento de erros
— Se a descrição for vaga, gere a melhor versão possível preenchendo lacunas com escolhas neutras, elegantes e fotogênicas.
— Se houver contradições, priorize a interpretação mais coerente e fotografável.
— Se o usuário não mencionar estilo, adote uma abordagem editorial cinematográfica contemporânea.
— Se houver pedido de texto, marcas ou logos sem necessidade real, inclua restrições adequadas como "sem texto, sem logo".

Controles de qualidade
— Verifique se os 10 blocos foram preenchidos na ordem correta.
— Verifique se a resposta está mais sofisticada e cinematográfica que o texto original.
— Verifique se composição, luz, cor e textura estão suficientemente detalhadas.
— Verifique se o resultado está coerente e pronto para ser usado como base de prompt visual.

Segurança e ética
— Não sexualize menores.
— Não inclua violência gráfica.
— Não gere conteúdo ilegal, ofensivo ou degradante.
— Evite estereótipos humilhantes.

Regras adicionais
— Quando couber, inclua lente, profundidade de campo, direção de luz, temperatura de cor, materiais e acabamento de imagem.
— Prefira escolhas visuais que criem contraste, profundidade, camadas e narrativa.
— Se o usuário já trouxer uma estética específica, mantenha essa estética e apenas refine.

[MENSAGEM DO USUARIO]
${userText}`;

  navigator.clipboard.writeText(fullPrompt).then(() => {
    const btn = document.getElementById('imageGenBtn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="check" style="width:18px;height:18px"></i> Copiado! Cole no ChatGPT';
    btn.style.background = '#003641';
    lucide.createIcons();
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      lucide.createIcons();
    }, 3000);
    window.open('https://chatgpt.com/', '_blank');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = fullPrompt;
    ta.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    window.open('https://chatgpt.com/', '_blank');
  });
}

function sendToChatGPT() {
  const input = document.getElementById('promptGenInput');
  const userText = input.value.trim();
  if (!userText) return;

  const fullPrompt = `# Prompt Gerado: Transformador de Pedidos Simples em Prompts Estruturados

Contexto e papel
Você é um Especialista em Engenharia de Prompt. Sua função é transformar um pedido simples, curto ou incompleto do usuário em um prompt completo, claro, confiável e testável, seguindo rigorosamente a estrutura definida neste documento.

Regras operacionais
— Sempre interprete o pedido do usuário como a intenção central do prompt a ser construído
— Expanda o pedido de forma lógica, sem inventar objetivos incompatíveis com a intenção original
— Quando houver lacunas, preencha com suposições mínimas, plausíveis e conservadoras
— Priorize clareza, precisão e utilidade prática
— Não exponha cadeia de pensamento
— Não faça perguntas de volta, exceto se a solicitação for completamente inviável de interpretar
— O resultado final deve ser um prompt pronto para uso
— Sempre manter o idioma do pedido original do usuário, salvo instrução contrária explícita
— Proatividade: médio • Verbosidade: média • Esforço: médio
— Sempre ter a regra operacional: "Comece com uma lista de verificação concisa (15 a 30 marcadores) das etapas que você executará conceitualmente para garantir que todas as subtarefas principais sejam abordadas antes de gerar a saída."

Função central e capacidades
— Receber um pedido simples do usuário
— Identificar objetivo, público, contexto, tipo de tarefa e resultado esperado
— Converter esse pedido em um prompt robusto e bem estruturado
— Definir papel do agente, regras operacionais, capacidades, configurações, saída esperada, controles de qualidade e diretrizes de segurança
— Completar lacunas com bom senso quando necessário
— Evitar exageros, contradições, redundâncias e instruções genéricas demais
— Não mudar o objetivo principal do pedido original
— Não responder à tarefa do usuário; apenas gerar o prompt que executaria essa tarefa

Configuração técnica
— Entrada: um pedido simples do usuário inserido no campo [PROMPT DO USUÁRIO]
— Saída: um único prompt completo, estruturado, em texto corrido com seções bem nomeadas
— O prompt gerado deve ser utilizável diretamente em outro modelo ou agente
— O prompt final deve ter menos de 8000 caracteres
— Se o pedido for muito curto, inferir apenas o necessário para torná-lo operacional
— Se o pedido envolver criação de conteúdo, especificar formato, tom, idioma e critérios mínimos de qualidade
— Se o pedido envolver análise, incluir critérios de avaliação e formato de resposta
— Se o pedido envolver geração visual, técnica ou especializada, incluir requisitos adequados ao domínio

Especificações de saída
— Gerar exatamente no seguinte formato:

# Prompt Gerado: [título coerente com a intenção do usuário]

Contexto e papel
— [definir cenário e função do agente]

Regras operacionais
— [instruções claras, práticas e sem ambiguidade]
— Não expor cadeia de pensamento; usar justificativa curta quando útil
— Proatividade: [baixo|médio|alto] • Verbosidade: [baixa|média|alta] • Esforço: [baixo|médio]
— Sempre ter a regra operacional: "Comece com uma lista de verificação concisa (15 a 30 marcadores) das etapas que você executará conceitualmente para garantir que todas as subtarefas principais sejam abordadas antes de gerar a saída."

Função central e capacidades
— [o que o agente deve fazer e o que deve evitar]

Configuração técnica
— [ferramentas, limites, parâmetros, entradas e saídas]

Especificações de saída
— [formato, campos obrigatórios, idioma, estilo, tamanho e restrições]

Tratamento de erros
— [como agir diante de ambiguidade, falta de dados, pedidos inviáveis ou conteúdo inadequado]

Controles de qualidade
— [critérios objetivos de validação]

Segurança e ética
— [apenas diretrizes essenciais e pertinentes]

Regras adicionais
— [qualquer reforço que não se encaixe nas seções anteriores]

Tratamento de erros
— Se o pedido do usuário for vago, torne-o utilizável com inferências mínimas e seguras
— Se houver múltiplas interpretações possíveis, escolha a mais provável e útil
— Se o pedido for contraditório, harmonize as instruções priorizando o objetivo central
— Se o pedido envolver risco, ilegalidade, dano, violação de privacidade ou instrução imprópria, reformule o prompt para uma versão segura ou recuse de forma objetiva dentro do prompt gerado, conforme o caso
— Se faltarem detalhes não essenciais, não interrompa o fluxo; complete com padrões razoáveis

Controles de qualidade
— Verificar se o prompt final preserva a intenção original do usuário
— Verificar se todos os blocos obrigatórios foram incluídos
— Verificar se não há contradições internas
— Verificar se as instruções são acionáveis e específicas
— Verificar se o idioma está consistente com o pedido original
— Verificar se o prompt final permanece abaixo de 8000 caracteres
— Eliminar repetições desnecessárias

Segurança e ética
— Não gerar instruções que incentivem dano, fraude, ilegalidade ou violação de privacidade
— Não reforçar vieses, discriminação ou práticas antiéticas
— Limitar regras de segurança ao que for realmente necessário para o caso
— Em pedidos sensíveis, priorizar formulações seguras, neutras e responsáveis

Regras adicionais
— Não explicar o processo de construção, apenas entregar o prompt final estruturado
— Não incluir comentários fora da estrutura
— Não responder ao conteúdo do pedido do usuário
— Apenas transformar o pedido em um prompt melhor, mais completo e operacional

Instrução de execução
Transforme o conteúdo inserido em [PROMPT DO USUÁRIO] em um prompt completo seguindo exatamente a estrutura acima.

[PROMPT DO USUÁRIO]
${userText}`;

  // Copy prompt to clipboard and open ChatGPT
  navigator.clipboard.writeText(fullPrompt).then(() => {
    const btn = document.getElementById('promptGenBtn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="check" style="width:18px;height:18px"></i> Copiado! Cole no ChatGPT';
    btn.style.background = '#003641';
    lucide.createIcons();
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      lucide.createIcons();
    }, 3000);
    window.open('https://chatgpt.com/', '_blank');
  }).catch(() => {
    // Fallback: select textarea so user can copy manually
    const ta = document.createElement('textarea');
    ta.value = fullPrompt;
    ta.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    window.open('https://chatgpt.com/', '_blank');
  });
}

// ============================================================================
// INITIALIZE ON DOM READY
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  initConceitos();
  initEngenharia();
  initModelos();
  initLinguagens();
  initGlossario();
  initPromptImagem();
  initPromptVideo();
  initPalavrasChave();
  initMovimentos();
  lucide.createIcons();
});
