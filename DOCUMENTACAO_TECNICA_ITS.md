# Documentação Técnica — NumeraTutor ITS

## Visão Geral

NumeraTutor é um Sistema Tutor Inteligente (ITS) para ensino de sistemas de numeração (decimal, binário, hexadecimal). Arquitetura **100% client-side** (Next.js 14 App Router, React 18, Tailwind CSS, TypeScript). Toda persistência é feita via `localStorage`.

O sistema possui dois modelos principais:

- **Modelo do Estudante**: proficiência bayesiana, IRT simplificado (1PL/Rasch), SM-2 (Spaced Repetition), tempo de resposta.
- **Modelo Tutor**: plano de estudo personalizado, sequenciamento adaptativo, classificação de erros, detecção de confusão.

---

## Mapa de Arquivos

### Raiz
```
DOCUMENTACAO_TECNICA_ITS.md    ← este arquivo
package.json                    next@14.2.5, react@18, typescript@5
next.config.mjs                 tailwind.config.ts
tsconfig.json                   postcss.config.js
```

### `lib/` — Domínio e Dados
| Arquivo | Função |
|---|---|
| `domain.ts` | Tipos (`DomainNode`, `DomainModule`, `Question`, `ExamQuestion`, `Difficulty`, `ReviewData`, `StudyPlanItem`, `ErrorType`, `ConfusionStatus`) + dados estáticos dos 4 módulos |
| `domain-content.ts` | Conteúdo HTML de cada nó (renderizado via `dangerouslySetInnerHTML`) |
| `domain-questions.ts` | 37 questões práticas (`QUESTIONS`) + 40 questões de exame (`EXAM_QUESTIONS`) |

### `hooks/` — Lógica Central
| Arquivo | Função |
|---|---|
| `useProficiency.ts` | Motor de proficiência bayesiano + IRT theta + tempo de resposta |
| `useNodeProgress.ts` | Progressão (completar nós, desbloqueio, maestria) |
| `useSpacedRepetition.ts` | Algoritmo SM-2 (SuperMemo) para revisão espaçada |
| `useStudyPlan.ts` | Plano de estudo, classificação de erro, detecção de confusão |

### `app/` — Páginas (Next.js App Router)
| Rota | Arquivo | Função |
|---|---|---|
| `/` | `page.tsx` | Redireciona para `/dashboard` |
| `/dashboard` | `dashboard/page.tsx` | Mapa de conhecimento + Plano de Estudo + Revisões Pendentes + Nós para Revisar |
| `/questoes` | `questoes/page.tsx` | Prática adaptativa com tempo de resposta, SM-2 e classificação de erros |
| `/exame/[id]` | `exame/[id]/page.tsx` | Exame do módulo com diagnóstico |
| `/tutoria/[id]` | `tutoria/[id]/page.tsx` | Leitura de conteúdo |

### `components/` — UI
| Arquivo | Função |
|---|---|
| `layout/AppHeader.tsx` | Navbar superior |
| `Tutoring/index.tsx` | Player de conteúdo com sidebar de nós |
| `ui/NodeCard.tsx` | Card de nó no dashboard (status + proficiência) |
| `ui/ModuleCard.tsx` | Card de módulo (ações: ir, testar) |
| `ui/NodeProgressCircle.tsx` | Círculo SVG de progresso |
| `ui/HintPanel.tsx` | Dicas progressivas |
| `ui/FeedbackToast.tsx` | Toast adaptativo com tipo de erro + link de revisão |

---

## 1. Motor de Proficiência Dinâmico

### Objetivo
Calcular e persistir a proficiência do aluno em cada nó de conhecimento com base nas respostas às questões, utilizando estimativa bayesiana + IRT.

### Arquivos
- `hooks/useProficiency.ts` — implementação
- `lib/domain.ts` — tipos (`Question.nodeId`, `Difficulty`, `DIFFICULTY_VALUE`)

### Fluxo de Execução
```
[Aluno responde questão]
  → questionStartTime = performance.now()

[Aluno confirma resposta]
  → responseTimeMs = performance.now() - questionStartTime
  → recordAttempt(nodeId, questionId, correct, responseTimeMs, difficulty)
      → Atualiza score bayesiano (existente)
      → Atualiza theta IRT (novo)
      → Persiste em localStorage("proficiencyData")
  → Re-renderiza UI com novo score
```

### Estrutura de Dados (localStorage)

```json
{
  "proficiencyData": {
    "2.2": {
      "score": 45,
      "totalAttempts": 8,
      "correctAttempts": 3,
      "incorrectAttempts": 5,
      "history": [
        { "questionId": "q2.2-1", "correct": true, "timestamp": 1719000000000, "responseTimeMs": 12400 }
      ],
      "lastPracticed": 1719000010000,
      "theta": -0.42
    }
  }
}
```

### Algoritmo de Cálculo (`calculateScore`)

#### Score Bayeiano (preservado)
```
SE totalAttempts == 0 → score = 0

posterior_mean = (correctAttempts + 1) / (totalAttempts + 2)
score = clamp(round(posterior_mean * 100), 0, 100)
```

#### Theta IRT (1PL / Rasch) — novo
```
dificuldade: easy = -1, medium = 0, hard = +1
esperado = 1 / (1 + e^-(theta - dificuldade))
theta += 0.3 * (real - esperado)
```

O theta é uma métrica complementar ao score bayesiano. Representa a habilidade estimada do aluno no nó, considerando a dificuldade das questões. Valores positivos indicam desempenho acima da média esperada; negativos indicam dificuldade.

### API do Hook

```typescript
const {
  hydrated: boolean,
  getProficiency(nodeId): number,       // score bayesiano 0-100
  getNodeData(nodeId): NodeProficiencyData,
  getTheta(nodeId): number,             // IRT ability estimate
  recordAttempt(nodeId, questionId, correct, responseTimeMs?, difficulty?): void,
  getWeakNodes(threshold?): Array<{nodeId, score}>,
  resetNode(nodeId): void,
} = useProficiency();
```

### Como Testar
1. Abra `/questoes` e responda algumas questões
2. Verifique DevTools → Application → Local Storage → `proficiencyData`
3. Confira que `theta` e `responseTimeMs` estão sendo registrados
4. Recarregue a página — proficiência persiste
5. Acerte 3 seguidas → score = 80% (maestria); theta > 0

### Limitações
- Histórico ilimitado (pode crescer com uso prolongado).
- Theta não é usado para desbloqueio (apenas score bayesiano).
- IRT 1PL não modela discriminação (parâmetro a) nem adivinhação (parâmetro c).

---

## 2. SM-2 (Spaced Repetition)

### Objetivo
Agendar revisões espaçadas dos conteúdos utilizando o algoritmo SM-2 (SuperMemo), combatendo a curva de esquecimento de Ebbinghaus.

### Arquivo
- `hooks/useSpacedRepetition.ts` — implementação
- `lib/domain.ts` — tipo `ReviewData`

### Estrutura de Dados (localStorage)

Chave: `"reviewSchedule"`

```json
{
  "2.2": {
    "interval": 6,
    "ease": 2.5,
    "repetitions": 1,
    "nextReview": 1719604800000,
    "lastReview": 1719000000000
  }
}
```

### Algoritmo SM-2
```
quality = computeQuality(correct, responseTimeMs, hintUsed)
  → 5: correto + rápido (<10s)
  → 4: correto + médio (10-30s)
  → 3: correto + lento (>30s)
  → 1: incorreto
  → 0: incorreto + usou dica

SE quality < 3:
  interval = 1 dia, repetitions = 0
SENÃO:
  SE repetitions == 0: interval = 1
  SE repetitions == 1: interval = 6
  SE repetitions >= 2: interval *= ease
  repetitions++

ease = max(1.3, ease + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
nextReview = Date.now() + interval * 86400000
```

### API do Hook

```typescript
const {
  hydrated: boolean,
  recordReview(nodeId, quality): void,
  getDueReviews(daysAhead?): Array<{nodeId, data}>,
  getNodeReviewData(nodeId): ReviewData,
} = useSpacedRepetition();
```

### Como Testar
1. Responda questões em `/questoes` — verificar `localStorage("reviewSchedule")`
2. Verifique que nós com respostas corretas têm `interval` crescendo
3. Nós com respostas incorretas têm `interval` resetado para 1
4. No dashboard, verificar seção "Revisões Pendentes" com nós atrasados

---

## 3. Seleção Adaptativa de Questões

### Objetivo
Selecionar a próxima questão com base na proficiência atual do aluno, priorizando dificuldade adequada e revisão de nós fracos.

### Arquivos
- `app/questoes/page.tsx` — função `selectNextQuestion()`
- `lib/domain-questions.ts` — 37 questões com `difficulty: "easy" | "medium" | "hard"`

### Fluxo de Execução
```
[Aluno clica "Próxima questão"]
  → advanceToNext()
  → selectNextQuestion(solvedIds, getProficiency, QUESTIONS, excludeId)
  → Para cada questão não resolvida:
       nodeProf = getProficiency(q.nodeId)
       difficultyScore: prof < 40 + easy → 3
                        prof 40-70 + medium → 3
                        prof > 70 + hard → 3
                        outros → 1
       weakBonus: prof < 60 → +1
       score = difficultyScore + weakBonus
  → Seleciona aleatoriamente entre as de maior score
  → Atualiza currentQuestion + questionStartTimeRef
  → Re-renderiza
```

### Distribuição das 37 Questões

| Nó | Easy | Medium | Hard | Total |
|---|---|---|---|---|
| 1.1 — História dos Sistemas | 1 | 1 | 1 | 3 |
| 1.2 — Conceito de Base | 1 | 1 | 1 | 3 |
| 1.3 — Notação Posicional | 1 | 1 | 1 | 3 |
| 2.1 — Bit e Byte | 1 | 1 | 1 | 3 |
| 2.2 — Decimal → Binário | 1 | 2 | 1 | 4 |
| 2.3 — Binário → Decimal | 1 | 1 | 1 | 3 |
| 3.1 — Mapeamento A–F | 1 | 1 | 1 | 3 |
| 3.2 — Decimal → Hex | 1 | 1 | 1 | 3 |
| 3.3 — Binário → Hex | 1 | 1 | 1 | 3 |
| 4.1 — Eletrônica e Física | 2 | 1 | 0 | 3 |
| 4.2 — Design Gráfico | 1 | 1 | 1 | 3 |
| 4.3 — Redes de Computadores | 1 | 1 | 1 | 3 |

### Como Testar
1. Acesse `/questoes` — se sem prática anterior, questões fáceis (badge verde)
2. Responda corretamente → proficiência sobe → questões médias (badge amarelo)
3. O badge de dificuldade e o breadcrumb refletem dinamicamente a questão atual
4. Questões de nós fracos são priorizadas (weakBonus)

### Limitações
- Pool de 37 questões para 12 nós (~3/nó). Para uso prolongado, ideal ~5+ por nível por nó.
- Sem true quiz-bow (não modela conhecimento latente além do IRT simplificado).

---

## 4. Classificação de Erros e Feedback Estratégico

### Objetivo
Classificar o tipo de erro cometido pelo aluno e exibir feedback específico para cada situação.

### Arquivos
- `hooks/useStudyPlan.ts` — função `classifyError()`
- `components/ui/FeedbackToast.tsx` — toast com mensagem do tipo de erro
- `app/questoes/page.tsx` — chamada da classificação no `handleConfirmAnswer`

### Tipos de Erro

| Tipo | Critério | Mensagem |
|---|---|---|
| `chute` | Resposta em < 3s | "Parece que você respondeu sem ler com atenção. Leia cada opção cuidadosamente." |
| `distracao` | Resposta numericamente próxima (diferença ≤ 2) | "Você errou por pouco! Revise os detalhes do cálculo com atenção." |
| `recorrente` | 2+ erros consecutivos no mesmo nó | "Este erro já ocorreu antes. Reveja o conteúdo e pratique mais." |
| `conceitual` | Padrão não identificado | "Parece que você ainda não domina este conceito. Revise o conteúdo e tente novamente." |

### Fluxo de Execução
```
[Aluno erra questão]
  → classifyError(nodeId, selected, correctAnswer, responseTimeMs, history)
  → setErrorType(tipo)
  → <FeedbackToast errorType={tipo} />
  → Toast renderiza mensagem específica + link de revisão
```

### Como Testar
1. Responda muito rápido (< 3s) e erre → mensagem de "chute"
2. Erre por 1 unidade de diferença (ex: resposta "127" em vez de "128") → "distração"
3. Erre 3 vezes seguidas no mesmo nó → "recorrente"
4. Demais erros → "conceitual"

---

## 5. Detecção de Confusão e Desengajamento

### Objetivo
Identificar sinais de que o aluno está confuso ou desengajado e exibir intervenções.

### Arquivo
- `hooks/useStudyPlan.ts` — função `getConfusionStatus()`
- `app/questoes/page.tsx` — exibição do aviso no sidebar

### Regras de Detecção

| Condição | Diagnóstico | Intervenção |
|---|---|---|
| 3+ erros consecutivos | Confusão | "Você errou 3 questões seguidas. Que tal revisar o conteúdo antes de continuar?" |
| Tempo médio > 60s (últ. 5) | Dificuldade | "Você está demorando muito para responder. Considere revisar o tópico." |
| < 2s + incorreto (múltiplos) | Chute | "Parece que você está respondendo muito rápido sem ler com atenção." |

### Como Testar
1. Erre 3 questões consecutivas — aviso laranja deve aparecer no sidebar
2. Responda muito rápido e erre — aviso de chute
3. Após acertar, o aviso desaparece

---

## 6. Plano de Estudo Personalizado

### Objetivo
Gerar uma lista priorizada de ações recomendadas com base na proficiência, revisões pendentes e histórico de erros.

### Arquivo
- `hooks/useStudyPlan.ts` — função `getStudyPlan()`
- `app/dashboard/page.tsx` — seção "Plano de Estudo"

### Algoritmo de Priorização

```
Para cada nó desbloqueado:
  Se revisão vencida (SM-2) → prioridade 100
  Se revisão próxima (≤ 2 dias) → prioridade 80
  Se proficiência < 60 e não concluído → prioridade (80 - prof)
  Se theta < -0.5 e não concluído → prioridade 60 + abs(theta)*10

Para cada módulo:
  Se todos nós com prof ≥ 60 → prioridade 20 (exame)

Para cada nó:
  Se desbloqueado, não concluído, 0 tentativas → prioridade 10 (estudo)

Ordenar por prioridade decrescente, retornar top 5.
```

### Ações Disponível

| Tipo | Ícone | Label | Link |
|---|---|---|---|
| `review` | 🔄 | Revisar | `/tutoria/[moduleId]?node=[nodeId]` |
| `practice` | ✏️ | Praticar | `/tutoria/[moduleId]?node=[nodeId]` |
| `study` | 📖 | Estudar | `/tutoria/[moduleId]?node=[nodeId]` |
| `exam` | 🎯 | Fazer Exame | `/exame/[moduleId]` |
| `next` | ➡️ | Avançar | `/tutoria/[moduleId]?node=[nodeId]` |

### Como Testar
1. Acesse `/dashboard` com dados de proficiência existentes
2. A seção "Plano de Estudo" deve aparecer com ações priorizadas
3. Clique em cada ação — deve navegar para a página correta
4. Nós com revisão vencida aparecem com prioridade máxima

---

## 7. Dashboard de Revisão

### Objetivo
Exibir nós com baixa proficiência e revisões pendentes para o aluno saber exatamente o que revisar.

### Arquivos
- `app/dashboard/page.tsx` — seções "Plano de Estudo", "Revisões Pendentes", "Nós para Revisar"
- `hooks/useProficiency.ts` — método `getWeakNodes(threshold)`
- `hooks/useSpacedRepetition.ts` — método `getDueReviews()`

### Seções do Dashboard

1. **Plano de Estudo**: Ações recomendadas (top 5 priorizados)
2. **Revisões Pendentes (SM-2)**: Nós com revisão vencida ou próxima
3. **Mapa de Conhecimento**: Cards dos 4 módulos com status
4. **Nós para Revisar**: Nós com proficiência < 60% e não concluídos

### Como Testar
1. Responda questões incorretamente para abaixar a proficiência
2. Acesse `/dashboard` — seção "Nós para Revisar" com nós fracos
3. Aumente proficiência para >= 60 — seção some
4. Verifique "Revisões Pendentes" com nós do SM-2
5. Verifique "Plano de Estudo" com ações ordenadas

---

## 8. Desbloqueio Baseado em Maestria

### Objetivo
Vincular a progressão do curso à proficiência real do aluno. *Inalterado desde a etapa anterior.*

### Arquivos
- `hooks/useNodeProgress.ts` — `completeNode()`, `nodesInModuleReady()`
- `components/Tutoring/index.tsx` — tratamento de retorno de `completeNode`
- `components/ui/ModuleCard.tsx` — exame visível apenas se `nodesInModuleReady()`
- `app/exame/[id]/page.tsx` — diagnóstico por nó após exame

### Regras de Desbloqueio

| Ação | Condição |
|---|---|
| Marcar nó como concluído | `getProficiency(nodeId) >= 80` |
| Desbloquear próximo nó (mesmo módulo) | Nó anterior concluído |
| Desbloquear primeiro nó do módulo N+1 | Todos os nós do módulo N concluídos |
| Exame do módulo disponível | `nodesInModuleReady(moduleId)` → todos nós com prof >= 60 |
| Aprovação no exame | Score >= 70% |

---

## Estrutura Completa do localStorage

```json
{
  "proficiencyData": {
    "<nodeId>": {
      "score": 0,
      "totalAttempts": 0,
      "correctAttempts": 0,
      "incorrectAttempts": 0,
      "history": [
        { "questionId": "q2.2-1", "correct": true, "timestamp": 1719000000000, "responseTimeMs": 12400 }
      ],
      "lastPracticed": 0,
      "theta": 0
    }
  },
  "completedNodes": ["1.1", "1.2"],
  "unlockedNodes": ["1.1", "1.2", "1.3", "2.1"],
  "reviewSchedule": {
    "<nodeId>": {
      "interval": 6,
      "ease": 2.5,
      "repetitions": 1,
      "nextReview": 1719604800000,
      "lastReview": 1719000000000
    }
  }
}
```

### Chaves

| Chave | Tipo | Descrição |
|---|---|---|
| `proficiencyData` | `Record<string, NodeProficiencyData>` | Dados de proficiência por nó (inclui theta e responseTimeMs) |
| `completedNodes` | `string[]` | IDs dos nós concluídos |
| `unlockedNodes` | `string[]` | IDs dos nós desbloqueados |
| `reviewSchedule` | `Record<string, ReviewData>` | Dados SM-2 por nó |

---

## Fluxograma Textual do Sistema

```
┌─────────────────────────────────────────────────────────────────────┐
│                         /dashboard                                  │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ Plano de Estudo (ações priorizadas)                          │   │
│  │ Revisões Pendentes (SM-2 — nós atrasados)                    │   │
│  │ Mapa de Conhecimento (4 módulos × 3 nós)                     │   │
│  │ Cada ModuleCard → NodeCard (status + proficiência)           │   │
│  │                                                              │   │
│  │ Seção "Nós para Revisar" (prof < 60%)                        │   │
│  │   ├── "Estudar" → /tutoria/[moduleId]?node=[nodeId]          │   │
│  │   └── "Praticar" → /questoes                                 │   │
│  └──────────────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    /tutoria/[moduleId]                              │
│  Sidebar: lista de nós do módulo (completado ✓ ou não)              │
│  Conteúdo: HTML do nó atual (dangerouslyInnerHTML)                  │
│  Botão "Marcar como concluído" → completeNode()                     │
│    ├── prof >= 80 → completa + avança                               │
│    └── prof < 80 → aviso "Pratique mais" + link /questoes           │
│  Se todos nós completos → link "Realizar Teste"                     │
└────────────────────────┬────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      /questoes                                      │
│  questionStartTimeRef = performance.now()                           │
│  selectNextQuestion() → algoritmo adaptativo:                       │
│    ├── prof < 40 → questões fáceis                                  │
│    ├── prof 40-70 → questões médias                                 │
│    └── prof > 70 → questões difíceis                                │
│                                                                     │
│  [Aluno responde] → responseTimeMs, difficulty                      │
│  → recordAttempt(nodeId, qId, correct, responseTimeMs, difficulty)  │
│      ├── Atualiza score bayesiano                                   │
│      ├── Atualiza theta IRT                                         │
│      └── Persiste proficiencyData                                   │
│  → recordReview(nodeId, quality) → SM-2                             │
│  → classifyError() → errorType                                      │
│  → getConfusionStatus() → aviso se confuso                          │
│  → <FeedbackToast type, errorType> → mensagem + link                │
└────────────────────────┬────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    /exame/[moduleId]                                │
│  10 questões de múltipla escolha                                    │
│  Resultado:                                                         │
│    ├── Score >= 70% → "Parabéns"                                    │
│    ├── Score >= 80% → unlockFirstNode do próximo módulo             │
│    ├── Diagnóstico por nó (acertos < 60% → link "Revisar")          │
│    └── Revisão detalhada questão a questão                          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Casos de Teste Recomendados

### Teste 1: Persistência de Proficiência (Atualizado)
1. Acesse `/questoes`, responda 3 questões
2. Anote o score exibido e o theta
3. Recarregue a página
4. **Esperado**: mesmo score e theta preservados

### Teste 2: Tempo de Resposta e IRT
1. Responda 1 questão rapidamente (< 10s) e corretamente
2. Verifique `localStorage("proficiencyData")[nodeId].theta`
3. **Esperado**: theta > 0 (positivo, desempenho acima da média)
4. Responda 1 questão incorretamente
5. **Esperado**: theta diminui

### Teste 3: SM-2 Spaced Repetition
1. Responda uma questão corretamente
2. Verifique `localStorage("reviewSchedule")[nodeId]`
3. **Esperado**: `interval` = 1, `repetitions` = 1
4. Responda outra do mesmo nó corretamente
5. **Esperado**: `interval` = 6, `repetitions` = 2

### Teste 4: Classificação de Erro
1. Responda muito rápido (< 3s) e erre
2. **Esperado**: toast com mensagem "Parece que você respondeu sem ler com atenção"
3. Erre por 1 unidade de diferença (ex: responder "127" para "128")
4. **Esperado**: toast com "Você errou por pouco!"

### Teste 5: Detecção de Confusão
1. Erre 3 questões consecutivas
2. **Esperado**: aviso laranja no sidebar "Você errou 3 questões seguidas..."
3. Após acertar 1 questão, o aviso desaparece

### Teste 6: Plano de Estudo no Dashboard
1. Tenha um nó com revisão vencida (SM-2) e outro com prof < 60
2. Acesse `/dashboard`
3. **Esperado**: seção "Plano de Estudo" com ações priorizadas
4. **Esperado**: revisão vencida no topo, nó fraco abaixo

### Teste 7: Feedback Adaptativo (Atualizado)
1. Em `/questoes`, responda incorretamente
2. **Esperado**: toast com mensagem do tipo de erro + link "→ Reveja 'Nome do Nó' (Nó X.X)"
3. Clique no link → navega para `/tutoria/[moduleId]?node=[nodeId]`

### Teste 8: Dashboard de Revisão (Atualizado)
1. Com proficiência < 60 em algum nó, acesse `/dashboard`
2. **Esperado**: seção "Nós para Revisar" visível
3. Aumente proficiência do nó fraco para >= 60
4. Recarregue `/dashboard`
5. **Esperado**: seção "Nós para Revisar" some

### Teste 9: Desbloqueio por Maestria
1. Acesse `/tutoria/module-2?node=2.1`
2. Se prof < 80, clique "Marcar como concluído"
3. **Esperado**: aviso laranja "Proficiência insuficiente" + link Praticar
4. Pratique até prof >= 80, retorne e marque concluído
5. **Esperado**: avança para nó 2.2
6. Complete todos os 3 nós do módulo 2
7. **Esperado**: nó 3.1 desbloqueado automaticamente

### Teste 10: Exame com Diagnóstico
1. Tenha prof >= 60 em todos nós de um módulo
2. Acesse `/exame/[moduleId]`
3. Complete o exame com alguns erros
4. **Esperado**: seção "Tópicos para Revisar" com nós onde acertou < 60%
5. Clique "Revisar" em um tópico → navega para a tutoria do nó

---

## Bugs e Limitações Conhecidas

### Bugs
1. **CompleteNode com stale state**: `completeNode` em `useNodeProgress` lê `completedNodes` e `unlockedNodes` do closure. Em cenários de cliques rápidos, pode haver race condition com o estado do React.
2. **Classificação de erro de distração**: A detecção atual compara diferença numérica entre `selected` e `answer`. Pode falhar para opções não numéricas (sempre cai em "conceitual").

### Limitações
1. **Pool de questões**: 37 questões práticas. Para uso prolongado, seria necessário expandir para ~5+ por nível por nó (12 nós → ~60+ questões).
2. **Sem backend**: Toda lógica e dados ficam no navegador. Sem suporte a multi-usuário, analytics, ou recuperação de dados perdidos.
3. **IRT 1PL simplificado**: Não modela discriminação (parâmetro a) nem adivinhação (parâmetro c). O theta não é usado para desbloqueio.
4. **SM-2 por questão individual**: O SM-2 é aplicado por tentativa individual. Idealmente deveria ser por nó com qualidade agregada da sessão.
5. **Data loss**: Limpar localStorage ou usar navegação anônima perde todo progresso.
6. **Theta não utilizado no sequenciamento**: O sequenciamento adaptativo atual usa apenas proficiência. Theta poderia ser usado para refinar a seleção de questões.
7. **Confusão detectada apenas no erro**: A detecção de confusão só é executada após uma resposta incorreta. Não há monitoramento proativo durante a leitura de conteúdo.

---

## Próximos Passos Sugeridos

### Curto Prazo
1. **Expandir questões** para ~5 por nó (especialmente medium) para melhorar a confiabilidade das estimativas
2. **Usar theta no sequenciamento**: Incorporar theta na `selectNextQuestion` para seleção mais refinada
3. **Persistir tentativas de exame**: Salvar resultados de exames para diagnóstico longitudinal

### Médio Prazo
4. **SM-2 agregado por nó**: Acumular qualidade da sessão de prática antes de aplicar SM-2
5. **Adicionar API Routes** (Next.js): migrar persistência para banco de dados (SQLite/PostgreSQL + Prisma)
6. **Monitoramento durante leitura**: Detectar confusão também durante a leitura de conteúdo (tempo na página, interações)

### Longo Prazo
7. **Autenticação**: Login multi-usuário com perfis de aprendizado
8. **Dashboard Analítico**: Gráficos de evolução do theta, taxa de acerto por dificuldade, tempo médio de resposta
9. **Geração procedural de questões**: Usar templates para criar variações infinitas de questões de conversão entre bases

---

## Glossário de Tipos

```typescript
// lib/domain.ts

DomainNode {
  id: string;           // "1.1", "2.3"...
  label: string;        // "Decimal → Binário"
  content?: string;     // chave para MODULE_CONTENT
}

DomainModule {
  id: string;           // "module-1"
  number: number;       // 1-4
  title: string;
  subtitle: string;
  color: string;        // classes Tailwind gradiente
  borderColor: string;
  nodes: DomainNode[];  // 3 nós por módulo
}

Difficulty = "easy" | "medium" | "hard"

Question {
  id: string;           // "q2.2-1"
  moduleId?: string;    // "1", "2"...
  nodeId: string;       // ligação ao DomainNode
  text: string;         // enunciado
  options: string[];    // opções de múltipla escolha
  answer: string;       // opção correta
  hints: string[];      // dicas progressivas
  explanation: string;  // explicação pós-resposta
  difficulty: Difficulty;
}

ExamQuestion {
  id: string;           // "exam-1-1"
  moduleId: string;     // "module-1"
  nodeId: string;       // ligação ao DomainNode
  text: string;         // enunciado
  answer: string;       // texto da opção correta
  options: string[];    // 4 opções de múltipla escolha
}

// SM-2 Spaced Repetition
ReviewData {
  interval: number;       // dias até próxima revisão
  ease: number;          // ease factor (mín 1.3)
  repetitions: number;   // repetições bem-sucedidas consecutivas
  nextReview: number;    // timestamp (ms) da próxima revisão
  lastReview: number;    // timestamp (ms) da última revisão
}

// Plano de Estudo
StudyPlanAction = "review" | "practice" | "study" | "exam" | "next"

StudyPlanItem {
  action: StudyPlanAction;
  nodeId: string;
  moduleId: string;
  nodeLabel: string;
  moduleNumber: number;
  priority: number;       // 0-100, maior = mais urgente
  reason: string;         // legível para exibição
}

ErrorType = "conceitual" | "distracao" | "recorrente" | "chute" | null

ConfusionStatus {
  confused: boolean;
  reason: string | null;      // legível para exibição
  consecutiveErrors: number;
  avgResponseTime: number;    // ms (últimas 3)
  hintDependency: boolean;
}
```

```typescript
// hooks/useProficiency.ts (interno)

AttemptRecord {
  questionId: string;
  correct: boolean;
  timestamp: number;        // Date.now()
  responseTimeMs?: number;  // tempo de resposta (novo)
}

NodeProficiencyData {
  score: number;              // 0-100 calculado
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  history: AttemptRecord[];
  lastPracticed: number;      // timestamp
  theta: number;              // IRT ability estimate (novo)
}
```

```typescript
// lib/domain.ts — IRT

DIFFICULTY_VALUE: Record<Difficulty, number> = {
  easy: -1,
  medium: 0,
  hard: 1,
};
```
