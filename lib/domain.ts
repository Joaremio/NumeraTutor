export type NodeStatus = "locked" | "in_progress" | "completed";

export interface DomainNode {
  id: string;
  label: string;
  content?: string;
  proficiency: number; // 0–100
  status: NodeStatus;
}

export interface DomainModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  color: string;
  borderColor: string;
  nodes: DomainNode[];
}

export interface Question {
  id: string;
  moduleId?: string;
  nodeId: string;
  text: string;
  answer: string;
  hints: string[];
  explanation: string;
}

export interface ExamQuestion {
  id: string;
  moduleId: string;
  answer: string;
  options: string[];
}

export const MODULES: DomainModule[] = [
  {
    id: "module-1",
    number: 1,
    title: "Fundamentos Históricos e Teóricos",
    subtitle: "Pré-requisito geral",
    color: "from-indigo-500/20 to-indigo-600/10",
    borderColor: "border-indigo-500/40",
    nodes: [
      {
        id: "1.1",
        label: "História dos Sistemas de Numeração",
        content: `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 1.1: História dos Sistemas de Numeração</h1>
    <p class="text-slate-400">Conheça as civilizações que moldaram a forma como representamos números hoje.</p>
  </header>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-indigo-400">1. As Primeiras Contagens</h2>
    <p>Muito antes de sistemas formais existirem, os humanos contavam utilizando os recursos mais simples disponíveis: os dedos das mãos. Essa prática intuitiva é a razão pela qual o <strong class="text-slate-100 font-semibold">sistema decimal (base 10)</strong> se tornou o padrão universal da humanidade — afinal, temos exatamente 10 dedos.</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-indigo-400">2. Civilizações e suas Contribuições</h2>
    <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-xs">
            <th class="p-3">Civilização</th>
            <th class="p-3">Sistema</th>
            <th class="p-3">Contribuição Principal</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60">
          <tr class="hover:bg-slate-800/30">
            <td class="p-3 font-medium text-slate-200">Babilônios</td>
            <td class="p-3 text-indigo-400 font-mono">Base 60</td>
            <td class="p-3 text-slate-400">Origem dos 60 minutos/segundos e dos 360° do círculo</td>
          </tr>
          <tr class="hover:bg-slate-800/30">
            <td class="p-3 font-medium text-slate-200">Maias</td>
            <td class="p-3 text-indigo-400 font-mono">Base 20</td>
            <td class="p-3 text-slate-400">Possivelmente contavam dedos dos pés também</td>
          </tr>
          <tr class="hover:bg-slate-800/30">
            <td class="p-3 font-medium text-slate-200">Romanos</td>
            <td class="p-3 text-indigo-400 font-mono">Não-posicional</td>
            <td class="p-3 text-slate-400">Símbolos fixos (I, V, X, L, C, D, M) sem zero</td>
          </tr>
          <tr class="hover:bg-slate-800/30">
            <td class="p-3 font-medium text-slate-200">Indo-arábicos</td>
            <td class="p-3 text-indigo-400 font-mono">Base 10</td>
            <td class="p-3 text-slate-400">Criaram o zero e a notação posicional moderna</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-indigo-400">3. Por que isso importa para a Computação?</h2>
    <p>Cada computador moderno é, no fundo, uma máquina que trabalha com apenas dois estados: ligado e desligado. Essa característica levou ao uso do <strong class="text-slate-100 font-semibold">sistema binário (base 2)</strong> — uma herança direta do estudo histórico das bases numéricas.</p>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 my-2">
      <p class="text-sm font-mono"><span class="text-slate-500">// Linha do tempo resumida:</span> Dedos (Base 10) → Babilônios (Base 60) → Romanos (Não-posicional) → Indo-arábicos (Zero + Base 10) → Computadores (<span class="text-amber-400">Base 2</span>)</p>
    </div>
  </section>
</div>
`,
        proficiency: 100,
        status: "completed",
      },
      {
        id: "1.2",
        label: "Conceito de Base Numérica",
        content: `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 1.2: Conceito de Base Numérica</h1>
    <p class="text-slate-400">Entenda o que define matematicamente um sistema de numeração e como bases diferentes coexistem.</p>
  </header>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-indigo-400">1. O que é uma Base?</h2>
    <p>A <strong class="text-slate-100 font-semibold">base</strong> de um sistema de numeração define <span class="text-indigo-400 font-bold">quantos símbolos distintos</span> estão disponíveis para representar valores. Os dígitos válidos sempre começam no <strong>0</strong> e vão até <strong>(base − 1)</strong>.</p>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 my-2">
      <p class="text-sm font-mono"><span class="text-slate-500">// Regra geral:</span> Base <strong class="text-slate-100">N</strong> → dígitos válidos de <span class="text-emerald-400">0</span> até <span class="text-emerald-400">N−1</span></p>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-indigo-400">2. Os Sistemas Mais Usados na Computação</h2>
    <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-xs">
            <th class="p-3">Nome</th>
            <th class="p-3">Base</th>
            <th class="p-3">Dígitos Válidos</th>
            <th class="p-3">Uso Principal</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60">
          <tr class="hover:bg-slate-800/30">
            <td class="p-3 font-medium text-slate-200">Decimal</td>
            <td class="p-3 text-indigo-400 font-mono">10</td>
            <td class="p-3 text-slate-400">0 a 9</td>
            <td class="p-3 text-slate-400">Uso humano cotidiano</td>
          </tr>
          <tr class="hover:bg-slate-800/30">
            <td class="p-3 font-medium text-slate-200">Binário</td>
            <td class="p-3 text-indigo-400 font-mono">2</td>
            <td class="p-3 text-slate-400">0 e 1</td>
            <td class="p-3 text-slate-400">Processamento em hardware</td>
          </tr>
          <tr class="hover:bg-slate-800/30">
            <td class="p-3 font-medium text-slate-200">Octal</td>
            <td class="p-3 text-indigo-400 font-mono">8</td>
            <td class="p-3 text-slate-400">0 a 7</td>
            <td class="p-3 text-slate-400">Permissões Unix/Linux</td>
          </tr>
          <tr class="hover:bg-slate-800/30">
            <td class="p-3 font-medium text-slate-200">Hexadecimal</td>
            <td class="p-3 text-indigo-400 font-mono">16</td>
            <td class="p-3 text-slate-400">0 a 9 e A a F</td>
            <td class="p-3 text-slate-400">Endereços de memória, cores RGB</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-indigo-400">3. Como Identificar a Base de um Número?</h2>
    <p>Na notação matemática formal, a base é indicada como um subscrito ao final do número. Isso evita ambiguidades quando trabalhamos com múltiplos sistemas ao mesmo tempo.</p>
    <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-xs">
            <th class="p-3">Notação</th>
            <th class="p-3">Leitura</th>
            <th class="p-3">Valor em Decimal</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60">
          <tr class="hover:bg-slate-800/30">
            <td class="p-3 font-mono text-amber-400">1010₂</td>
            <td class="p-3 text-slate-400">"1010 na base 2" (binário)</td>
            <td class="p-3 font-medium text-slate-200">10</td>
          </tr>
          <tr class="hover:bg-slate-800/30">
            <td class="p-3 font-mono text-amber-400">1010₈</td>
            <td class="p-3 text-slate-400">"1010 na base 8" (octal)</td>
            <td class="p-3 font-medium text-slate-200">520</td>
          </tr>
          <tr class="hover:bg-slate-800/30">
            <td class="p-3 font-mono text-amber-400">1010₁₆</td>
            <td class="p-3 text-slate-400">"1010 na base 16" (hex)</td>
            <td class="p-3 font-medium text-slate-200">4112</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-xs text-slate-500 italic mt-2">Nota: O mesmo conjunto de dígitos "1010" representa valores completamente diferentes dependendo da base!</p>
  </section>
</div>
`,
        proficiency: 100,
        status: "completed",
      },
      {
        id: "1.3",
        label: "Notação Posicional e Pesos Matemáticos",
        // Nó 1.3
        content: `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 1.3: Notação Posicional e Pesos Matemáticos</h1>
    <p class="text-slate-400">Descubra como a posição de cada dígito determina seu valor real dentro de um número.</p>
  </header>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-indigo-400">1. O Princípio Posicional</h2>
    <p>Em qualquer sistema de numeração posicional, o <strong class="text-slate-100 font-semibold">valor de um dígito</strong> não depende apenas de qual símbolo ele é, mas também de <span class="text-indigo-400 font-bold">onde ele está posicionado</span> no número. Cada posição carrega um <strong>peso matemático</strong> que é uma potência da base.</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-indigo-400">2. Como os Pesos Funcionam</h2>
    <p>Os pesos crescem da direita para a esquerda. A posição mais à direita sempre vale <span class="text-indigo-400 font-bold">base⁰ = 1</span>. Cada posição seguinte multiplica o peso por mais uma vez a base.</p>
    <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
      <table class="w-full text-center text-sm border-collapse">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-xs">
            <th class="p-3 text-left">Posição</th>
            <th class="p-3">5ª (esq.)</th>
            <th class="p-3">4ª</th>
            <th class="p-3">3ª</th>
            <th class="p-3">2ª</th>
            <th class="p-3">1ª (dir.)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60 font-mono">
          <tr>
            <td class="p-3 text-slate-400 text-xs text-left">Potência</td>
            <td class="p-3 text-slate-500 text-xs">base⁴</td>
            <td class="p-3 text-slate-500 text-xs">base³</td>
            <td class="p-3 text-slate-500 text-xs">base²</td>
            <td class="p-3 text-slate-500 text-xs">base¹</td>
            <td class="p-3 text-slate-500 text-xs">base⁰</td>
          </tr>
          <tr class="bg-slate-900/20">
            <td class="p-3 text-slate-400 text-xs text-left">Base 10 (Decimal)</td>
            <td class="p-3 text-indigo-400 font-bold">10.000</td>
            <td class="p-3 text-indigo-400 font-bold">1.000</td>
            <td class="p-3 text-indigo-400 font-bold">100</td>
            <td class="p-3 text-indigo-400 font-bold">10</td>
            <td class="p-3 text-indigo-400 font-bold">1</td>
          </tr>
          <tr>
            <td class="p-3 text-slate-400 text-xs text-left">Base 2 (Binário)</td>
            <td class="p-3 text-violet-400 font-bold">16</td>
            <td class="p-3 text-violet-400 font-bold">8</td>
            <td class="p-3 text-violet-400 font-bold">4</td>
            <td class="p-3 text-violet-400 font-bold">2</td>
            <td class="p-3 text-violet-400 font-bold">1</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-lg font-semibold text-indigo-400">3. Calculando o Valor Total</h2>
    <p>Para obter o valor real de um número, multiplicamos cada dígito pelo seu peso e somamos tudo. Veja o exemplo com o número decimal <span class="text-slate-100 font-semibold">352</span>:</p>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm space-y-2">
      <p class="text-slate-500">// Decomposição do número 352 na base 10:</p>
      <p class="text-slate-300">3 × <span class="text-indigo-400">100</span> = <span class="text-emerald-400">300</span></p>
      <p class="text-slate-300">5 × <span class="text-indigo-400">10</span>  = <span class="text-emerald-400">50</span></p>
      <p class="text-slate-300">2 × <span class="text-indigo-400">1</span>   = <span class="text-emerald-400">2</span></p>
      <p class="border-t border-slate-800 pt-2 text-slate-100 font-bold">Total = <span class="text-amber-400">352</span> ✓</p>
    </div>
    <p class="text-sm text-slate-400">Esse mesmo princípio se aplica a <strong class="text-slate-300">qualquer base</strong> — binário, hexadecimal, ou qualquer outro sistema. É a fundação de todas as conversões que você aprenderá nos módulos seguintes.</p>
  </section>

  <section class="space-y-3">
    <div class="bg-slate-900/60 border border-indigo-500/30 rounded-xl p-4">
      <p class="font-semibold text-indigo-400 mb-2">💡 Regra Universal:</p>
      <p class="text-sm">Valor total = <strong class="text-slate-100">Σ (dígito × baseⁿ)</strong>, onde <em>n</em> começa em 0 na posição mais à direita e aumenta 1 a cada passo para a esquerda.</p>
    </div>
  </section>
</div>
`,
        proficiency: 85,
        status: "completed",
      },
    ],
  },
  {
    id: "module-2",
    number: 2,
    title: "Sistema Binário",
    subtitle: "Depende do Módulo 1",
    color: "from-violet-500/20 to-violet-600/10",
    borderColor: "border-violet-500/40",
    nodes: [
      {
        id: "2.1",
        label: "Conceitos de Bit e Byte",
        proficiency: 80,
        status: "in_progress",
        content: `
          <div class="space-y-6 text-slate-300">
            <header class="border-b border-slate-800 pb-4">
              <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 2.1: Conceitos de Bit e Byte</h1>
              <p class="text-slate-400">Compreenda a unidade fundamental da computação e como os dados são medidos.</p>
            </header>

            <section class="space-y-3">
              <h2 class="text-lg font-semibold text-violet-400">1. O que é um Bit?</h2>
              <p>O <strong class="text-slate-100 font-semibold">Bit</strong> (<em>Binary Digit</em>) é a menor unidade de informação que um computador pode processar. Ele funciona exatamente como um interruptor:</p>
              <ul class="list-disc list-inside space-y-1 pl-2 text-slate-400">
                <li><strong class="text-emerald-400">0</strong>: Desligado / Falso</li>
                <li><strong class="text-emerald-400">1</strong>: Ligado / Verdadeiro</li>
              </ul>
            </section>

            <section class="space-y-3">
              <h2 class="text-lg font-semibold text-violet-400">2. O que é um Byte?</h2>
              <p>Um <strong class="text-slate-100 font-semibold">Byte</strong> é um conjunto ordenado de <span class="text-violet-400 font-bold">8 bits</span>. Ele é a unidade padrão usada para representar caracteres (letras, números e símbolos).</p>
              <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 my-2">
                <p class="text-sm font-mono"><span class="text-slate-500">// Exemplo:</span> A letra maiúscula <strong class="text-slate-100">"A"</strong> é interpretada pelo sistema como o byte: <span class="text-amber-400">01000001</span>.</p>
              </div>
            </section>

            <section class="space-y-3">
              <h2 class="text-lg font-semibold text-violet-400">3. Escala de Medidas</h2>
              <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
                <table class="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-xs">
                      <th class="p-3">Unidade</th>
                      <th class="p-3">Sigla</th>
                      <th class="p-3">Equivalência</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/60">
                    <tr class="hover:bg-slate-800/30">
                      <td class="p-3 font-medium text-slate-200">Kilobyte</td>
                      <td class="p-3 text-violet-400 font-mono">KB</td>
                      <td class="p-3 text-slate-400">1.024 Bytes</td>
                    </tr>
                    <tr class="hover:bg-slate-800/30">
                      <td class="p-3 font-medium text-slate-200">Megabyte</td>
                      <td class="p-3 text-violet-400 font-mono">MB</td>
                      <td class="p-3 text-slate-400">1.024 KB</td>
                    </tr>
                    <tr class="hover:bg-slate-800/30">
                      <td class="p-3 font-medium text-slate-200">Gigabyte</td>
                      <td class="p-3 text-violet-400 font-mono">GB</td>
                      <td class="p-3 text-slate-400">1.024 MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p class="text-xs text-slate-500 italic mt-2">Nota: Crescemos em potências de 2 (2¹⁰ = 1.024), por isso não é um valor redondo como 1.000.</p>
            </section>
          </div>
        `,
      },
      {
        id: "2.2",
        label: "Conversão Decimal para Binário",
        content: `
  <div class="space-y-6 text-slate-300">
    <header class="border-b border-slate-800 pb-4">
      <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 2.2: Conversão de Decimal para Binário</h1>
      <p class="text-slate-400">Aprenda o método prático para transformar qualquer número do nosso sistema do dia a dia para a linguagem dos computadores.</p>
    </header>

    <section class="space-y-3">
      <h2 class="text-lg font-semibold text-violet-400">O Método das Divisões Sucessivas</h2>
      <p>A forma mais comum e segura de converter um número decimal em binário é dividi-lo por <span class="text-violet-400 font-bold">2</span> repetidamente até que o quociente chegue a zero. O grande segredo desse processo está em <strong>anotar o resto</strong> de cada divisão.</p>
    </section>

    <section class="space-y-4">
      <h3 class="text-md font-semibold text-slate-200">Exemplo Passo a Passo: Convertendo o número 13</h3>
      <ol class="list-decimal list-inside space-y-2 pl-2 text-slate-300">
        <li>Divida 13 por 2: Quociente <span class="font-semibold text-slate-100">6</span> e resto <strong class="text-emerald-400">1</strong></li>
        <li>Divida 6 por 2: Quociente <span class="font-semibold text-slate-100">3</span> e resto <strong class="text-emerald-400">0</strong></li>
        <li>Divida 3 por 2: Quociente <span class="font-semibold text-slate-100">1</span> e resto <strong class="text-emerald-400">1</strong></li>
        <li>Divida 1 por 2: Quociente <span class="font-semibold text-slate-100">0</span> e resto <strong class="text-emerald-400">1</strong> <span class="text-slate-500 text-sm">(Chegamos a zero, fim das divisões)</span></li>
      </ol>
    </section>

    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 my-4">
      <p class="font-semibold text-amber-400 mb-1">⚠️ Regra de Ouro:</p>
      <p>Para montar o número binário final, você deve coletar os restos encontrados de forma <strong>inversa</strong>, ou seja, de baixo para cima (da última divisão para a primeira).</p>
      <div class="mt-3 p-2 bg-slate-950/60 rounded-lg border border-slate-800/80 font-mono text-sm flex items-center gap-2">
        <span class="text-slate-500">Ordem de leitura (↑):</span>
        <span class="text-slate-100 font-bold tracking-widest">1 1 0 1</span>
      </div>
      <p class="text-sm mt-3">Portanto, o número decimal <span class="text-slate-100 font-semibold">13</span> é representado como <span class="text-violet-400 font-bold">1101</span> na base binária.</p>
    </div>
  </div>
`,
        proficiency: 45,
        status: "in_progress",
      },
      {
        id: "2.3",
        label: "Conversão Binário para Decimal",
        content: `
  <div class="space-y-6 text-slate-300">
    <header class="border-b border-slate-800 pb-4">
      <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 2.3: Conversão de Binário para Decimal</h1>
      <p class="text-slate-400">Descubra como traduzir uma sequência de bits de volta para um número compreensível para nós.</p>
    </header>

    <section class="space-y-3">
      <h2 class="text-lg font-semibold text-violet-400">O Método dos Pesos Posicionais</h2>
      <p>Ao contrário do nosso sistema decimal onde as casas representam unidades, dezenas e centenas (potências de 10), no sistema binário cada casa representa uma <span class="text-violet-400 font-bold">potência de 2</span>.</p>
      <p>Os pesos começam em <strong>1</strong> na extrema direita e vão <strong>dobrando de valor</strong> a cada passo em direção à esquerda.</p>
    </section>

    <section class="space-y-4">
      <h3 class="text-md font-semibold text-slate-200">Mapeando os Pesos (Exemplo com o binário 1101):</h3>
      <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
        <table class="w-full text-center text-sm border-collapse">
          <thead>
            <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-xs">
              <th class="p-3 text-left">Posição (da direita p/ esquerda)</th>
              <th class="p-3">4ª Posição</th>
              <th class="p-3">3ª Posição</th>
              <th class="p-3">2ª Posição</th>
              <th class="p-3">1ª Posição</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 font-mono">
            <tr>
              <td class="p-3 text-slate-400 text-xs text-left">Peso Matemático</td>
              <td class="p-3 text-violet-400 font-bold">8 <span class="text-slate-500 text-xs">(2³)</span></td>
              <td class="p-3 text-violet-400 font-bold">4 <span class="text-slate-500 text-xs">(2²)</span></td>
              <td class="p-3 text-violet-400 font-bold">2 <span class="text-slate-500 text-xs">(2¹)</span></td>
              <td class="p-3 text-violet-400 font-bold">1 <span class="text-slate-500 text-xs">(2⁰)</span></td>
            </tr>
            <tr class="bg-slate-900/20">
              <td class="p-3 text-slate-300 text-xs text-left font-sans">Dígitos do Binário (1101)</td>
              <td class="p-3 text-emerald-400 font-bold text-base">1</td>
              <td class="p-3 text-emerald-400 font-bold text-base">1</td>
              <td class="p-3 text-slate-600 text-base">0</td>
              <td class="p-3 text-emerald-400 font-bold text-base">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="space-y-3">
      <h3 class="text-md font-semibold text-slate-200">Realizando a Soma</h3>
      <p>Para obter o valor decimal final, nós ignoramos os pesos que possuem o bit 0 e <strong>somamos apenas os pesos que possuem o bit 1</strong>:</p>
      
      <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm space-y-1">
        <p class="text-slate-500">// Somando apenas as posições ativas (iguais a 1):</p>
        <p class="text-slate-300">Cálculo: <span class="text-emerald-400">8</span> + <span class="text-emerald-400">4</span> + <span class="text-slate-500">0</span> + <span class="text-emerald-400">1</span></p>
        <p class="text-slate-100 text-base font-bold mt-2">Resultado Decimal = <span class="text-amber-400">13</span></p>
      </div>
      
      <p class="text-sm text-slate-400 mt-2">Pronto! A sequência binária <span class="text-violet-400 font-bold">1101</span> equivale exatamente ao número decimal <span class="text-slate-100 font-semibold">13</span>.</p>
    </section>
  </div>
`,
        proficiency: 10,
        status: "in_progress",
      },
    ],
  },
  {
    id: "module-3",
    number: 3,
    title: "Sistema Hexadecimal",
    subtitle: "Depende do Módulo 2",
    color: "from-orange-500/20 to-orange-600/10",
    borderColor: "border-orange-500/40",
    nodes: [
      {
        id: "3.1",
        label: "Mapeamento Alfanumérico A–F",
        proficiency: 0,
        status: "locked",
      },
      {
        id: "3.2",
        label: "Conversão Decimal para Hexadecimal",
        proficiency: 0,
        status: "locked",
      },
      {
        id: "3.3",
        label: "Conversão Direta Binário para Hexadecimal",
        proficiency: 0,
        status: "locked",
      },
    ],
  },
  {
    id: "module-4",
    number: 4,
    title: "Aplicações Práticas e Interdisciplinares",
    subtitle: "Nós de Contextualização",
    color: "from-emerald-500/20 to-emerald-600/10",
    borderColor: "border-emerald-500/40",
    nodes: [
      {
        id: "4.1",
        label: "Aplicações em Eletrônica e Física",
        proficiency: 0,
        status: "locked",
      },
      {
        id: "4.2",
        label: "Aplicações em Artes e Design Gráfico",
        proficiency: 0,
        status: "locked",
      },
      {
        id: "4.3",
        label: "Aplicações em Redes de Computadores",
        proficiency: 0,
        status: "locked",
      },
    ],
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "q2.2-1",
    moduleId: "2",
    nodeId: "2.2",
    text: "Converta o número decimal 13 para binário.",
    answer: "1101",
    hints: [
      "Divida 13 por 2 repetidamente e anote os restos de cada divisão.",
      "13 ÷ 2 = 6, resto 1. Anote o 1. Agora divida 6 por 2.",
      "6 ÷ 2 = 3, resto 0. 3 ÷ 2 = 1, resto 1. 1 ÷ 2 = 0, resto 1. Leia os restos de baixo para cima.",
    ],
    explanation:
      "13 em binário é 1101. Divisões: 13÷2=6r1, 6÷2=3r0, 3÷2=1r1, 1÷2=0r1. Lendo de baixo: 1101.",
  },
  {
    id: "q2.2-2",
    nodeId: "2.2",
    text: "Qual é a representação binária do número decimal 25?",
    answer: "11001",
    hints: [
      "Lembre-se: divida por 2 repetidamente e colete os restos.",
      "25 ÷ 2 = 12, resto 1. Continue dividindo 12.",
      "12÷2=6r0, 6÷2=3r0, 3÷2=1r1, 1÷2=0r1. Leia os restos de baixo para cima: 11001.",
    ],
    explanation: "25 em binário é 11001. Verifique: 16+8+0+0+1 = 25 ✓",
  },
  {
    id: "q2.1-1",
    nodeId: "2.1",
    text: "Quantos bits formam 1 byte?",
    answer: "8",
    hints: [
      "Um byte é a unidade básica de armazenamento digital.",
      "Pense nos 8 dígitos binários que formam um caractere simples.",
    ],
    explanation:
      "1 byte = 8 bits. É a unidade fundamental de armazenamento, capaz de representar 256 valores (0 a 255).",
  },
];

export const EXAM_QUESTIONS = [
  // ==========================================
  // MÓDULO 1: FUNDAMENTOS HISTÓRICOS E TEÓRICOS
  // ==========================================
  {
    id: "exam-1-1",
    moduleId: "module-1",
    text: "Qual das seguintes civilizações antigas é amplamente reconhecida pelo desenvolvimento e uso de um sistema de numeração de base 60 (sexagesimal)?",
    answer: "Babilônios",
    options: ["Egípcios", "Romanos", "Babilônios", "Maias"],
  },
  {
    id: "exam-1-2",
    moduleId: "module-1",
    text: "O que diferencia fundamentalmente os algarismos romanos de um sistema de numeração posicional moderno?",
    answer:
      "Nos algarismos romanos, o valor de um símbolo é majoritariamente fixo e não depende da sua posição relativa.",
    options: [
      "Os algarismos romanos utilizam uma base binária implícita.",
      "Nos algarismos romanos, o valor de um símbolo é majoritariamente fixo e não depende da sua posição relativa.",
      "O sistema romano permite a representação de frações complexas com facilidade.",
      "Os algarismos romanos foram os primeiros a introduzir o conceito de zero posicional.",
    ],
  },
  {
    id: "exam-1-3",
    moduleId: "module-1",
    text: "Qual elemento matemático essencial estava ausente na maioria dos sistemas de contagem da antiguidade europeia (como o sistema romano) e impactava diretamente a facilidade de realizar cálculos complexos?",
    answer: "A representação explícita do número zero",
    options: [
      "A utilização de números primos",
      "A representação explícita do número zero",
      "O uso de símbolos para frações",
      "A validação de agrupamentos de 10 em 10",
    ],
  },
  {
    id: "exam-1-4",
    moduleId: "module-1",
    text: "O que define rigorosamente a 'base' de um sistema de numeração posicional?",
    answer:
      "A quantidade de símbolos ou dígitos distintos disponíveis para representar os valores.",
    options: [
      "O valor numérico máximo que o sistema consegue atingir.",
      "A quantidade de símbolos ou dígitos distintos disponíveis para representar os valores.",
      "O número de casas decimais permitidas após a vírgula.",
      "A quantidade total de bits que o processador consegue ler por vez.",
    ],
  },
  {
    id: "exam-1-5",
    moduleId: "module-1",
    text: "Se um sistema hipotético de numeração adota a Base 8 (sistema octal), quais são os dígitos válidos permitidos para construir qualquer número?",
    answer: "0, 1, 2, 3, 4, 5, 6 e 7",
    options: [
      "1, 2, 3, 4, 5, 6, 7 e 8",
      "0, 1, 2, 3, 4, 5, 6, 7 e 8",
      "0, 1, 2, 3, 4, 5, 6 e 7",
      "A, B, C, D, E, F, G e H",
    ],
  },
  {
    id: "exam-1-6",
    moduleId: "module-1",
    text: "No número decimal 352, qual é o peso matemático associado ao algarismo 3 devido exclusivamente à sua posição na estrutura?",
    answer: "100 (ou 10²)",
    options: ["300", "100 (ou 10²)", "10 (ou 10¹)", "1 (ou 10⁰)"],
  },
  {
    id: "exam-1-7",
    moduleId: "module-1",
    text: "Em qualquer sistema de notação posicional de base 'b', qual é o peso matemático exato da primeira casa localizada imediatamente à direita (a casa das unidades)?",
    answer: "b⁰, que é sempre igual a 1",
    options: [
      "b¹, que é igual à própria base",
      "b⁰, que é sempre igual a 1",
      "Sempre 0, independentemente da base",
      "b⁻¹, que representa uma fração",
    ],
  },
  {
    id: "exam-1-8",
    moduleId: "module-1",
    text: "Como o princípio da notação posicional calcula o valor total de uma sequência de dígitos?",
    answer:
      "Pela soma dos produtos de cada dígito multiplicado pelo peso de sua respectiva posição.",
    options: [
      "Pela multiplicação direta de todos os dígitos da sequência.",
      "Pela soma simples de todos os algarismos, ignorando onde estão posicionados.",
      "Pela soma dos produtos de cada dígito multiplicado pelo peso de sua respectiva posição.",
      "Pela divisão do primeiro dígito pelo valor da base do sistema.",
    ],
  },
  {
    id: "exam-1-9",
    moduleId: "module-1",
    text: "Se estivéssemos utilizando um sistema de numeração posicional baseado na Base 5, qual seria o peso matemático da terceira posição vindo da direita para a esquerda?",
    answer: "25",
    options: ["15", "9", "25", "125"],
  },
  {
    id: "exam-1-10",
    moduleId: "module-1",
    text: "Por que o sistema decimal (base 10) se tornou o padrão mais difundido e adotado historicamente pela humanidade para contagem no dia a dia?",
    answer:
      "Devido à anatomia humana, baseada na contagem prática utilizando os dez dedos das mãos.",
    options: [
      "Porque a base 10 é a única que permite cálculos com divisões exatas.",
      "Porque os primeiros computadores mecânicos exigiam a base 10 para funcionar.",
      "Devido à anatomia humana, baseada na contagem prática utilizando os dez dedos das mãos.",
      "Porque o sistema decimal consome menos espaço de armazenamento digital.",
    ],
  },

  // ==========================================
  // MÓDULO 2: SISTEMA BINÁRIO
  // ==========================================
  {
    id: "exam-2-1",
    moduleId: "module-2",
    text: "Quantos estados lógicos ou valores distintos um único Bit (Binary Digit) consegue assumir individualmente?",
    answer: "2",
    options: ["1", "2", "8", "256"],
  },
  {
    id: "exam-2-2",
    moduleId: "module-2",
    text: "Um conjunto ordenado composto por exatamente 8 bits agrupados forma qual unidade padrão de medida de armazenamento digital?",
    answer: "1 Byte",
    options: ["1 Kilobyte", "1 Nibble", "1 Byte", "1 Word"],
  },
  {
    id: "exam-2-3",
    moduleId: "module-2",
    text: "Qual é o número total de combinações ou valores numéricos diferentes que podem ser armazenados dentro do espaço de 1 Byte?",
    answer: "256",
    options: ["8", "128", "255", "256"],
  },
  {
    id: "exam-2-4",
    moduleId: "module-2",
    text: "Na computação, as grandezas de armazenamento crescem em potências de 2. Seguindo essa lógica matemática, quantos Kilobytes (KB) compõem exatamente 1 Megabyte (MB)?",
    answer: "1.024",
    options: ["1.000", "1.024", "512", "2.048"],
  },
  {
    id: "exam-2-5",
    moduleId: "module-2",
    text: "Realize a conversão do número decimal 13 para o sistema binário. Qual sequência representa o valor correto?",
    answer: "1101",
    options: ["1011", "1101", "1110", "1001"],
  },
  {
    id: "exam-2-6",
    moduleId: "module-2",
    text: "Ao efetuar o método das divisões sucessivas por 2 para converter o número decimal 19 em binário, qual sequência de restos é obtida ao ler o resultado de baixo para cima?",
    answer: "10011",
    options: ["11001", "10101", "10011", "11011"],
  },
  {
    id: "exam-2-7",
    moduleId: "module-2",
    text: "Qual é o equivalente na base binária para o número decimal 7?",
    answer: "111",
    options: ["101", "110", "111", "1001"],
  },
  {
    id: "exam-2-8",
    moduleId: "module-2",
    text: "Convertendo a sequência binária 1010 diretamente para o sistema decimal, qual valor obtemos?",
    answer: "10",
    options: ["8", "10", "12", "14"],
  },
  {
    id: "exam-2-9",
    moduleId: "module-2",
    text: "Se um byte completo possui apenas o bit de maior peso ativado, correspondendo à sequência binária 10000000, qual é o seu valor equivalente em decimal?",
    answer: "128",
    options: ["64", "127", "128", "256"],
  },
  {
    id: "exam-2-10",
    moduleId: "module-2",
    text: "Ao traduzir o número binário 11111111 (onde todos os 8 bits do byte estão ligados) de volta para o sistema decimal, qual valor é gerado?",
    answer: "255",
    options: ["256", "255", "128", "512"],
  },
];
