# Documentação Técnica — NumeraTutor ITS

## Visão Geral

NumeraTutor é um Sistema Tutor Inteligente (ITS) para ensino de sistemas de numeração (decimal, binário, hexadecimal). Arquitetura **100% client-side** (Next.js 14 App Router, React 18, Tailwind CSS, TypeScript). Toda persistência é feita via `localStorage`.

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
| `domain.ts` | Tipos (`DomainNode`, `Module`, `Question`, `ExamQuestion`, `Difficulty`) + dados estáticos dos 4 módulos |
| `domain-content.ts` | Conteúdo HTML de cada nó (renderizado via `dangerouslySetInnerHTML`) |
| `domain-questions.ts` | 16 questões práticas (`QUESTIONS`) + 20 questões de exame (`EXAM_QUESTIONS`) |

### `hooks/` — Lógica Central
| Arquivo | Função |
|---|---|
| `useProficiency.ts` | Motor de proficiência dinâmico (cálculo score, persistência localStorage) |
| `useNodeProgress.ts` | Progressão (completar nós, desbloqueio, maestria) |

### `app/` — Páginas (Next.js App Router)
| Rota | Arquivo | Função |
|---|---|---|
| `/` | `page.tsx` | Redireciona para `/dashboard` |
| `/dashboard` | `dashboard/page.tsx` | Mapa de conhecimento + "Nós para Revisar" |
| `/questoes` | `questoes/page.tsx` | Prática adaptativa com questões |
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
| `ui/FeedbackToast.tsx` | Toast adaptativo com link de revisão |

---

## 1. Motor de Proficiência Dinâmico

### Objetivo
Calcular e persistir a proficiência do aluno em cada nó de conhecimento com base nas respostas às questões.

### Arquivos
- `hooks/useProficiency.ts` — implementação
- `lib/domain.ts` — tipos (`Question.nodeId`, `Difficulty`)

### Fluxo de Execução
```
[Aluno responde questão] 
  → handleSubmit() em /questoes
  → recordAttempt(nodeId, questionId, correct)
  → Atualiza NodeProficiencyData em memória
  → Recalcula score via weighted moving average
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
        { "questionId": "q2.2-1", "correct": true, "timestamp": 1719000000000 },
        { "questionId": "q2.2-2", "correct": false, "timestamp": 1719000010000 }
      ],
      "lastPracticed": 1719000010000
    }
  }
}
```

### Algoritmo de Cálculo (`calculateScore`)

```
SE totalAttempts == 0 → score = 0

overallRate = correctAttempts / totalAttempts
recentAttempts = últimos 5 registros do history
recentRate = acertos_recentes / total_recentes

SE recentTotal > 0
  weightedScore = recentRate * 0.6 + overallRate * 0.4
SENÃO
  weightedScore = overallRate

score = clamp(round(weightedScore * 100), 0, 100)
```

### API do Hook

```typescript
const {
  hydrated: boolean,           // true quando localStorage foi lido
  getProficiency(nodeId): number,  // retorna score 0-100
  getNodeData(nodeId): NodeProficiencyData,  // dados completos
  recordAttempt(nodeId, questionId, correct): void,  // registra tentativa
  getWeakNodes(threshold?): Array<{nodeId, score}>,  // nós abaixo do threshold
  resetNode(nodeId): void,     // zera dados do nó
} = useProficiency();
```

### Como Testar
1. Abra `/questoes` e responda algumas questões
2. Verifique DevTools → Application → Local Storage → `proficiencyData`
3. Recarregue a página — proficiência persiste
4. Acerte 3 seguidas → score sobe; erre 3 seguidas → score desce

### Limitações
- Algoritmo simples (média ponderada). Não usa IRT, BKT ou Elo.
- Histórico ilimitado (pode crescer com uso prolongado).
- Sem data decay — tentativas antigas têm o mesmo peso que recentes (exceto pelo recorte de 5 recentes).

---

## 2. Seleção Adaptativa de Questões

### Objetivo
Selecionar a próxima questão com base na proficiência atual do aluno, priorizando dificuldade adequada e revisão de nós fracos.

### Arquivos
- `app/questoes/page.tsx` — função `selectNextQuestion()`
- `lib/domain-questions.ts` — 16 questões com `difficulty: "easy" | "medium" | "hard"`
- `lib/domain.ts` — tipo `Difficulty`

### Fluxo de Execução
```
[Aluno clica "Próxima questão"]
  → handleNext()
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
  → Atualiza currentQuestion → re-renderiza
```

### Distribuição das 16 Questões

| Nó | Easy | Medium | Hard |
|---|---|---|---|
| 1.1 — História dos Sistemas | 1 | 1 | 1 |
| 1.2 — Conceito de Base | 1 | 1 | 1 |
| 1.3 — Notação Posicional | 1 | 1 | 1 |
| 2.1 — Bit e Byte | 1 | 1 | 1 |
| 2.2 — Decimal → Binário | 1 | 2 | 1 |
| 2.3 — Binário → Decimal | 1 | 1 | 1 |

### Como Testar
1. Acesse `/questoes` — se sem prática anterior, questões fáceis (badge verde)
2. Responda corretamente → proficiência sobe → questões médias (badge amarelo)
3. Após 3 questões respondidas, uma questão de nó fraco é inserida automaticamente
4. O badge de dificuldade e o breadcrumb refletem dinamicamente a questão atual

### Limitações
- Pool pequeno (16 questões). Possibilidade de repetição em sessões longas.
- Sem true quiz-bow (não modela conhecimento latente).
- Sem rastreamento de tempo de resposta.

---

## 3. Feedback Adaptativo

### Objetivo
Quando o aluno erra uma questão, exibir feedback que aponta exatamente qual conteúdo revisar, com link direto.

### Arquivos
- `components/ui/FeedbackToast.tsx` — toast com link adaptativo
- `app/questoes/page.tsx` — passa `question.nodeId` ao toast

### Fluxo de Execução
```
[Aluno responde incorretamente]
  → recordAttempt(nodeId, questionId, false)
  → setFeedback("error")
  → <FeedbackToast type="error" nodeId="2.2" proficiency={35} />
  → Toast renderiza:
      ✕ Resposta incorreta.
      Proficiência atual: 35%
      → Reveja "Decimal → Binário" (Nó 2.2)  ← link clicável
  → Ao clicar no link → onClose() + navega para /tutoria/module-2?node=2.2
```

### API do Componente

```typescript
<FeedbackToast
  type: "correct" | "error" | "hint" | null
  onClose: () => void
  proficiency?: number       // mostra "Proficiência atual: X%"
  nodeId?: string            // quando presente + type="error", mostra link de revisão
/>
```

### Como Testar
1. Acesse `/questoes` e responda incorretamente
2. Observe o toast: deve mostrar link "→ Reveja 'Nome do Nó' (Nó X.X)"
3. Clique no link — deve navegar para a página de tutoria do nó específico
4. Responda corretamente — toast sem link de revisão

---

## 4. Dashboard de Revisão

### Objetivo
No dashboard, listar nós com baixa proficiência para que o aluno saiba exatamente o que revisar.

### Arquivos
- `app/dashboard/page.tsx` — seção "Nós para Revisar"
- `hooks/useProficiency.ts` — método `getWeakNodes(threshold)`

### Fluxo de Execução
```
[Dashboard renderiza]
  → useProficiency().getWeakNodes(60)
  → Filtra nós com score < 60 e não concluídos
  → Ordena do mais fraco (menor score) para o menos fraco
  → Renderiza cards com:
      - Nó ID + label
      - Barra de progresso laranja com %
      - Botão "Estudar" → /tutoria/[moduleId]?node=[nodeId]
      - Botão "Praticar" → /questoes
  → Se nenhum nó fraco → seção não renderiza
```

### Como Testar
1. Responda algumas questões incorretamente para abaixar a proficiência
2. Acesse `/dashboard`
3. Deve aparecer a seção "Nós para Revisar" com os nós fracos
4. Clique em "Estudar" — deve ir para a tutoria do nó
5. Clique em "Praticar" — deve ir para as questões

### Limitações
- Threshold fixo em 60%. Não configurável pelo aluno.
- A seção só considera nós não concluídos (completedNodes no localStorage).

---

## 5. Desbloqueio Baseado em Maestria

### Objetivo
Vincular a progressão do curso à proficiência real do aluno. Só é possível completar um nó e avançar quando a proficiência atinge o mínimo necessário.

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

### Fluxo de Completação de Nó

```
[Aluno clica "Marcar como concluído e avançar" no /tutoria]
  → handleCompleteAndNext()
  → completeNode(nodeId)
      → prof = getProficiency(nodeId)
      → SE prof < 80 → return false
      → Adiciona nodeId a completedNodes (localStorage)
      → Auto-unlock próximo nó no mesmo módulo (se houver)
      → Se todos nós do módulo concluídos → unlock primeiro nó do próximo módulo
      → return true
  → SE false → mostra aviso laranja com link "Praticar →"
  → SE true → navega para próximo nó
```

### Diagnóstico no Exame

Após o exame, o resultado agrupa as questões erradas por `nodeId`. Nós com acerto < 60% são listados em "Tópicos para Revisar" com link direto para a tutoria.

### Como Testar
1. Acesse `/tutoria/module-2?node=2.1` com proficiência baixa no nó
2. Clique "Marcar como concluído" — deve mostrar aviso de proficiência insuficiente
3. Pratique em `/questoes` até prof >= 80%
4. Volte e marque como concluído — deve funcionar
5. Complete todos os nós do módulo 2 → nó 3.1 desbloqueado automaticamente
6. No dashboard, botão "Realizar teste" só aparece quando prof >= 60% em todos nós do módulo

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
        { "questionId": "q2.2-1", "correct": true, "timestamp": 1719000000000 }
      ],
      "lastPracticed": 0
    }
  },
  "completedNodes": ["1.1", "1.2"],
  "unlockedNodes": ["1.1", "1.2", "1.3", "2.1"]
}
```

### Chaves

| Chave | Tipo | Descrição |
|---|---|---|
| `proficiencyData` | `Record<string, NodeProficiencyData>` | Dados de proficiência por nó |
| `completedNodes` | `string[]` | IDs dos nós concluídos |
| `unlockedNodes` | `string[]` | IDs dos nós desbloqueados |

---

## Fluxograma Textual do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                         /dashboard                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Mapa de Conhecimento (4 módulos × 3 nós)             │   │
│  │ Cada ModuleCard → NodeCard (status + proficiência)   │   │
│  │                                                      │   │
│  │ Seção "Nós para Revisar" (prof < 60%)                │   │
│  │   ├── "Estudar" → /tutoria/[moduleId]?node=[nodeId]  │   │
│  │   └── "Praticar" → /questoes                         │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    /tutoria/[moduleId]                      │
│  Sidebar: lista de nós do módulo (completado ✓ ou não)      │
│  Conteúdo: HTML do nó atual (dangerouslyInnerHTML)          │
│  Botão "Marcar como concluído" → completeNode()             │
│    ├── prof >= 80 → completa + avança                       │
│    └── prof < 80 → aviso "Pratique mais" + link /questoes   │
│  Se todos nós completos → link "Realizar Teste"             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      /questoes                              │
│  selectNextQuestion() → algoritmo adaptativo:               │
│    ├── prof < 40 → questões fáceis                          │
│    ├── prof 40-70 → questões médias                         │
│    └── prof > 70 → questões difíceis                        │
│  A cada 3 questões → 1 de revisão de nó fraco               │
│                                                             │
│  [Aluno responde] → recordAttempt(nodeId, questionId, bool) │
│    ├── Correto → toast verde, prof sobe (cálculo ponderado) │
│    └── Errado → toast vermelho + "Reveja Nó X.X" (link)     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    /exame/[moduleId]                        │
│  10 questões de múltipla escolha                            │
│  Resultado:                                                 │
│    ├── Score >= 70% → "Parabéns"                            │
│    ├── Score >= 80% → unlockFirstNode do próximo módulo     │
│    ├── Diagnóstico por nó (acertos < 60% → link "Revisar")  │
│    └── Revisão detalhada questão a questão                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Casos de Teste Recomendados

### Teste 1: Persistência de Proficiência
1. Acesse `/questoes`, responda 3 questões
2. Anote o score exibido
3. Recarregue a página
4. **Esperado**: mesmo score (com pequena variação por conta do `questionCount` resetar)

### Teste 2: Seleção Adaptativa
1. Com proficiência 0 em todos os nós, acesse `/questoes`
2. **Esperado**: questão fácil (badge verde)
3. Responda corretamente até prof > 40
4. **Esperado**: questão média (badge amarelo)
5. Continue até prof > 70
6. **Esperado**: questão difícil (badge vermelho)

### Teste 3: Feedback Adaptativo
1. Em `/questoes`, responda incorretamente
2. **Esperado**: toast com link "→ Reveja 'Nome do Nó' (Nó X.X)"
3. Clique no link
4. **Esperado**: navega para `/tutoria/[moduleId]?node=[nodeId]`

### Teste 4: Dashboard de Revisão
1. Com proficiência < 60 em algum nó, acesse `/dashboard`
2. **Esperado**: seção "Nós para Revisar" visível
3. Aumente proficiência do nó fraco para >= 60
4. Recarregue `/dashboard`
5. **Esperado**: seção "Nós para Revisar" some

### Teste 5: Desbloqueio por Maestria
1. Acesse `/tutoria/module-2?node=2.1`
2. Se prof < 80, clique "Marcar como concluído"
3. **Esperado**: aviso laranja "Proficiência insuficiente" + link Praticar
4. Pratique até prof >= 80, retorne e marque concluído
5. **Esperado**: avança para nó 2.2
6. Complete todos os 3 nós do módulo 2
7. **Esperado**: nó 3.1 desbloqueado automaticamente

### Teste 6: Exame com Diagnóstico
1. Tenha prof >= 60 em todos nós de um módulo
2. Acesse `/exame/[moduleId]`
3. Complete o exame com alguns erros
4. **Esperado**: seção "Tópicos para Revisar" com nós onde acertou < 60%
5. Clique "Revisar" em um tópico
6. **Esperado**: navega para a tutoria do nó

### Teste 7: Exame não Disponível
1. Tenha um nó com prof < 60 em um módulo
2. Acesse `/dashboard`
3. **Esperado**: botão "Realizar teste" NÃO aparece no ModuleCard

---

## Bugs e Limitações Conhecidas

### Bugs
1. **Link do exame em /questoes**: Quando `nodeProficiency >= 80`, o link aponta para `/exame` (sem moduleId), que não existe como rota. Deveria apontar para `/exame/module-2`.
2. **ExamQuestion.text**: O campo `text` não está na interface `ExamQuestion` (em `domain.ts`), mas os objetos em `domain-questions.ts` o possuem. A página `/exame/[id]` o acessa sem erro de tipo porque o TypeScript infere o tipo do array literal.
3. **CompleteNode com stale state**: `completeNode` em `useNodeProgress` lê `completedNodes` e `unlockedNodes` do closure. Em cenários de cliques rápidos, pode haver race condition com o estado do React.

### Limitações
1. **Pool de questões pequeno**: 16 questões práticas. Para uso prolongado, seria necessário expandir para ~5+ por nível por nó.
2. **Sem backend**: Toda lógica e dados ficam no navegador. Sem suporte a multi-usuário, analytics, ou recuperação de dados perdidos.
3. **Algoritmo de proficiência simples**: Média ponderada sem modelo de conhecimento latente (IRT, BKT). Não infere conhecimento não-observado.
4. **Sem spaced repetition**: Não agenda revisões baseadas em esquecimento (curva de Ebbinghaus).
5. **Sem tempo de resposta**: Não considera tempo para responder como indicador de fluência.
6. **Data loss**: Limpar localStorage ou usar navegação anônima perde todo progresso.
7. **Módulos 3 e 4 sem questões**: Não há questões práticas ou de exame para os módulos 3 (Hexadecimal) e 4 (Aplicações).

---

## Próximos Passos Sugeridos

### Curto Prazo
1. **Corrigir link do exame** em `/questoes`: `"/exame"` → `"/exame/module-2"` (hardcoded) ou dinâmico baseado no `nodeId`
2. **Adicionar `text` ao `ExamQuestion`** em `domain.ts` para consistência de tipos
3. **Expandir questões** para módulos 3 e 4 (mín. 9 questões cada: 3 por nível)
4. **Adicionar questões de exame** para módulos 3 e 4

### Médio Prazo
5. **Implementar Knowledge Tracing**: Algoritmo BKT (Bayesian Knowledge Tracing) para estimar probabilidade de domínio não-observado
6. **Adicionar API Routes** (Next.js): migrar persistência para banco de dados (SQLite/PostgreSQL + Prisma)
7. **Spaced Repetition**: Implementar SM-2 (SuperMemo) para revisão espaçada de nós com proficiência borderline

### Longo Prazo
8. **Autenticação**: Login multi-usuário com perfis de aprendizado
9. **Dashboard Analítico**: Gráficos de evolução, tempo de estudo, taxa de acerto por nó
10. **Gamificação**: Conquistas, streaks, leaderboard (opcional)
11. **Geração procedural de questões**: Usar templates para criar variações infinitas de questões de conversão entre bases

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
  answer: string;       // resposta exata (case-insensitive)
  hints: string[];      // dicas progressivas
  explanation: string;  // explicacao pós-resposta
  difficulty: Difficulty;
}

ExamQuestion {
  id: string;           // "exam-1-1"
  moduleId: string;     // "module-1"
  nodeId: string;       // ligação ao DomainNode
  answer: string;       // texto da opção correta
  options: string[];    // 4 opções de múltipla escolha
}
```

```typescript
// hooks/useProficiency.ts (interno)

AttemptRecord {
  questionId: string;
  correct: boolean;
  timestamp: number;    // Date.now()
}

NodeProficiencyData {
  score: number;              // 0-100 calculado
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  history: AttemptRecord[];
  lastPracticed: number;      // timestamp
}
```
