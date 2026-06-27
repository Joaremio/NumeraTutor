export const MODULE_CONTENT: Record<string, string> = {
  // =====================================================
  // MÓDULO 1
  // =====================================================
  "1.1": `
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

  "1.2": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 1.2: Conceito de Base Numérica</h1>
    <p class="text-slate-400">Entenda o que define matematicamente um sistema de numeração e como bases diferentes coexistem.</p>
  </header>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-indigo-400">1. O que é uma Base?</h2>
    <p>A <strong class="text-slate-100 font-semibold">base</strong> de um sistema de numeração define quantos símbolos distintos estão disponíveis para representar valores. Os dígitos válidos sempre começam no 0 e vão até (base − 1).</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-indigo-400">2. Sistemas Mais Usados</h2>
    <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-xs">
            <th class="p-3">Sistema</th>
            <th class="p-3">Base</th>
            <th class="p-3">Dígitos</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60">
          <tr>
            <td class="p-3">Decimal</td>
            <td class="p-3">10</td>
            <td class="p-3">0-9</td>
          </tr>
          <tr>
            <td class="p-3">Binário</td>
            <td class="p-3">2</td>
            <td class="p-3">0-1</td>
          </tr>
          <tr>
            <td class="p-3">Hexadecimal</td>
            <td class="p-3">16</td>
            <td class="p-3">0-9, A-F</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</div>
`,

  "1.3": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 1.3: Notação Posicional</h1>
    <p class="text-slate-400">Como cada posição tem um peso diferente.</p>
  </header>

  <p>Cada posição representa uma potência da base.</p>

  <div class="bg-slate-900/60 p-4 rounded-xl font-mono text-sm">
    <p>352 = 3×100 + 5×10 + 2×1</p>
  </div>
</div>
`,

  // =====================================================
  // MÓDULO 2
  // =====================================================

  "2.1": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 2.1: Conceitos de Bit e Byte</h1>
    <p class="text-slate-400">Unidade fundamental da computação.</p>
  </header>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-violet-400">Bit</h2>
    <p>Menor unidade de informação: 0 ou 1.</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-violet-400">Byte</h2>
    <p>Conjunto de 8 bits. Ex: A = 01000001</p>
  </section>
</div>
`,

  "2.2": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 2.2: Decimal → Binário</h1>
    <p class="text-slate-400">Divisões sucessivas por 2.</p>
  </header>

  <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm">
    <p>13 ÷ 2 = 6 r1</p>
    <p>6 ÷ 2 = 3 r0</p>
    <p>3 ÷ 2 = 1 r1</p>
    <p>1 ÷ 2 = 0 r1</p>
    <p class="text-amber-400 mt-2">Resultado: 1101</p>
  </div>
</div>
`,

  "2.3": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 2.3: Binário → Decimal</h1>
    <p class="text-slate-400">Soma dos pesos posicionais.</p>
  </header>

  <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm">
    <p>1101 = 8 + 4 + 0 + 1</p>
    <p class="text-amber-400 mt-2">Resultado: 13</p>
  </div>
</div>
`,

  // =====================================================
  // MÓDULO 3
  // =====================================================

  "3.1": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 3.1: Mapeamento Hexadecimal (A–F)</h1>
    <p class="text-slate-400">O sistema hexadecimal usa 16 símbolos: dígitos decimais (0–9) combinados com letras (A–F).</p>
  </header>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-orange-400">1. Por que letras?</h2>
    <p>O sistema decimal tem 10 dígitos (0 a 9). Para representar uma base 16, precisamos de 6 símbolos adicionais. A solução natural foi usar as primeiras letras do alfabeto:</p>
    <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-xs">
            <th class="p-3">Decimal</th>
            <th class="p-3">Hexadecimal</th>
            <th class="p-3">Observação</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60">
          <tr><td class="p-3">0–9</td><td class="p-3 text-orange-400 font-mono">0–9</td><td class="p-3 text-slate-400">Mantém os mesmos símbolos do decimal</td></tr>
          <tr><td class="p-3">10</td><td class="p-3 text-orange-400 font-mono">A</td><td class="p-3 text-slate-400">"A" de "dez" em inglês (ten → A)</td></tr>
          <tr><td class="p-3">11</td><td class="p-3 text-orange-400 font-mono">B</td><td class="p-3 text-slate-400">"B" de "onze" (eleven → B)</td></tr>
          <tr><td class="p-3">12</td><td class="p-3 text-orange-400 font-mono">C</td><td class="p-3 text-slate-400">"C" de "doze" (twelve → C)</td></tr>
          <tr><td class="p-3">13</td><td class="p-3 text-orange-400 font-mono">D</td><td class="p-3 text-slate-400">"D" de "treze" (thirteen → D)</td></tr>
          <tr><td class="p-3">14</td><td class="p-3 text-orange-400 font-mono">E</td><td class="p-3 text-slate-400">"E" de "quatorze" (fourteen → E)</td></tr>
          <tr><td class="p-3">15</td><td class="p-3 text-orange-400 font-mono">F</td><td class="p-3 text-slate-400">"F" de "quinze" (fifteen → F)</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-orange-400">2. Contando em Hexadecimal</h2>
    <p>A contagem em hex segue a mesma lógica posicional, mas com mais símbolos por posição:</p>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm">
      <p><span class="text-slate-500">// Decimal:</span> 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15</p>
      <p><span class="text-slate-500">// Hexadecimal:</span> 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, <strong class="text-orange-400">A, B, C, D, E, F</strong></p>
      <p class="mt-2"><span class="text-slate-500">// Após o F, vem 10 (hex) = 16 (decimal)</span></p>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-orange-400">3. Valor Posicional em Base 16</h2>
    <p>Cada posição em hexadecimal representa uma potência de 16:</p>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm">
      <p><strong class="text-orange-400">3A</strong> (hex) = 3×16¹ + A×16⁰ = 3×16 + 10×1 = 48 + 10 = <strong class="text-amber-400">58</strong> (decimal)</p>
      <p class="mt-1"><strong class="text-orange-400">FF</strong> (hex) = 15×16 + 15×1 = 240 + 15 = <strong class="text-amber-400">255</strong> (decimal)</p>
    </div>
    <p>O hexadecimal é muito usado em computação porque 1 dígito hex representa exatamente 4 bits, facilitando a leitura de bytes.</p>
  </section>
</div>
`,

  "3.2": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 3.2: Decimal → Hexadecimal</h1>
    <p class="text-slate-400">O método das divisões sucessivas por 16, similar ao que usamos para converter decimal em binário.</p>
  </header>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-orange-400">1. O Método</h2>
    <p>Assim como na conversão para binário (divisões por 2), aqui dividimos o número decimal por 16 sucessivamente, coletando os restos de baixo para cima. Restos de 10 a 15 são convertidos para A–F.</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-orange-400">2. Exemplo 1: 26 decimal</h2>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm">
      <p>26 ÷ 16 = 1, <strong class="text-orange-400">resto 10 (A)</strong></p>
      <p>1 ÷ 16 = 0, <strong class="text-orange-400">resto 1</strong></p>
      <p class="text-amber-400 mt-2">Resultado: 1A (hex)</p>
    </div>
    <p>Verificação: 1×16 + 10×1 = 26 ✓</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-orange-400">3. Exemplo 2: 255 decimal</h2>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm">
      <p>255 ÷ 16 = 15, <strong class="text-orange-400">resto 15 (F)</strong></p>
      <p>15 ÷ 16 = 0, <strong class="text-orange-400">resto 15 (F)</strong></p>
      <p class="text-amber-400 mt-2">Resultado: FF (hex)</p>
    </div>
    <p>FF é o maior valor representável em 1 byte (255 decimal). Por isso é tão comum em cores RGB.</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-orange-400">4. Exemplo 3: 1000 decimal</h2>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm">
      <p>1000 ÷ 16 = 62, <strong class="text-orange-400">resto 8</strong></p>
      <p>62 ÷ 16 = 3, <strong class="text-orange-400">resto 14 (E)</strong></p>
      <p>3 ÷ 16 = 0, <strong class="text-orange-400">resto 3</strong></p>
      <p class="text-amber-400 mt-2">Resultado: 3E8 (hex)</p>
    </div>
    <p>Verificação: 3×256 + 14×16 + 8×1 = 768 + 224 + 8 = 1000 ✓</p>
  </section>
</div>
`,

  "3.3": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 3.3: Binário → Hexadecimal</h1>
    <p class="text-slate-400">A conversão mais útil na computação: 4 bits = 1 dígito hexadecimal.</p>
  </header>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-orange-400">1. Por que 4 bits?</h2>
    <p>4 bits podem representar 2⁴ = 16 valores diferentes (0 a 15). Isso corresponde exatamente a 1 dígito hexadecimal (0 a F). Portanto, agrupamos o binário de 4 em 4 bits para converter em hex.</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-orange-400">2. Tabela de Conversão Rápida</h2>
    <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-xs">
            <th class="p-3">Binário (4 bits)</th>
            <th class="p-3">Hexadecimal</th>
            <th class="p-3">Decimal</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60">
          <tr><td class="p-3 font-mono">0000</td><td class="p-3 text-orange-400 font-mono">0</td><td class="p-3">0</td></tr>
          <tr><td class="p-3 font-mono">0001</td><td class="p-3 text-orange-400 font-mono">1</td><td class="p-3">1</td></tr>
          <tr><td class="p-3 font-mono">0010</td><td class="p-3 text-orange-400 font-mono">2</td><td class="p-3">2</td></tr>
          <tr><td class="p-3 font-mono">0011</td><td class="p-3 text-orange-400 font-mono">3</td><td class="p-3">3</td></tr>
          <tr><td class="p-3 font-mono">0100</td><td class="p-3 text-orange-400 font-mono">4</td><td class="p-3">4</td></tr>
          <tr><td class="p-3 font-mono">0101</td><td class="p-3 text-orange-400 font-mono">5</td><td class="p-3">5</td></tr>
          <tr><td class="p-3 font-mono">0110</td><td class="p-3 text-orange-400 font-mono">6</td><td class="p-3">6</td></tr>
          <tr><td class="p-3 font-mono">0111</td><td class="p-3 text-orange-400 font-mono">7</td><td class="p-3">7</td></tr>
          <tr><td class="p-3 font-mono">1000</td><td class="p-3 text-orange-400 font-mono">8</td><td class="p-3">8</td></tr>
          <tr><td class="p-3 font-mono">1001</td><td class="p-3 text-orange-400 font-mono">9</td><td class="p-3">9</td></tr>
          <tr><td class="p-3 font-mono">1010</td><td class="p-3 text-orange-400 font-mono">A</td><td class="p-3">10</td></tr>
          <tr><td class="p-3 font-mono">1011</td><td class="p-3 text-orange-400 font-mono">B</td><td class="p-3">11</td></tr>
          <tr><td class="p-3 font-mono">1100</td><td class="p-3 text-orange-400 font-mono">C</td><td class="p-3">12</td></tr>
          <tr><td class="p-3 font-mono">1101</td><td class="p-3 text-orange-400 font-mono">D</td><td class="p-3">13</td></tr>
          <tr><td class="p-3 font-mono">1110</td><td class="p-3 text-orange-400 font-mono">E</td><td class="p-3">14</td></tr>
          <tr><td class="p-3 font-mono">1111</td><td class="p-3 text-orange-400 font-mono">F</td><td class="p-3">15</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-orange-400">3. Exemplo Prático</h2>
    <p>Converter o binário <strong class="text-slate-100">11010110</strong> para hexadecimal:</p>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm space-y-1">
      <p>1. Agrupar de 4 em 4 bits (da direita para a esquerda): <strong class="text-amber-400">1101 0110</strong></p>
      <p>2. 1101 = <strong class="text-orange-400">D</strong> (13 decimal)</p>
      <p>3. 0110 = <strong class="text-orange-400">6</strong> (6 decimal)</p>
      <p class="text-amber-400 mt-2">Resultado: D6 (hex)</p>
    </div>
    <p>Se o grupo da esquerda tiver menos de 4 bits, complete com zeros à esquerda. Ex: <strong class="text-slate-100">101</strong> → <strong class="text-slate-100">0101</strong> = 5.</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-orange-400">4. Por que isso é útil?</h2>
    <p>Um byte (8 bits) é representado por exatos 2 dígitos hexadecimais. Isso torna o hex muito mais compacto que o binário e mais legível que o decimal para valores de memória, endereços e cores.</p>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm">
      <p><span class="text-slate-500">// 1 byte em binário:</span> 10110011</p>
      <p><span class="text-slate-500">// Mesmo valor em hex:</span> <strong class="text-orange-400">B3</strong></p>
    </div>
  </section>
</div>
`,

  // =====================================================
  // MÓDULO 4
  // =====================================================

  "4.1": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 4.1: Eletrônica e Física</h1>
    <p class="text-slate-400">Como o sistema binário é a base física de todos os circuitos digitais.</p>
  </header>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-emerald-400">1. Estado Ligado/Desligado</h2>
    <p>Nos circuitos eletrônicos digitais, a informação é representada por dois estados de tensão:</p>
    <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-xs">
            <th class="p-3">Nível Lógico</th>
            <th class="p-3">Tensão</th>
            <th class="p-3">Bit</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60">
          <tr><td class="p-3">0 (falso)</td><td class="p-3">0V (GND)</td><td class="p-3 font-mono">0</td></tr>
          <tr><td class="p-3">1 (verdadeiro)</td><td class="p-3">3,3V–5V (VCC)</td><td class="p-3 font-mono">1</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-emerald-400">2. Portas Lógicas</h2>
    <p>Portas lógicas são os blocos fundamentais dos circuitos digitais. Cada porta realiza uma operação binária simples:</p>
    <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-xs">
            <th class="p-3">Porta</th>
            <th class="p-3">Operação</th>
            <th class="p-3">Exemplo</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60">
          <tr><td class="p-3 font-mono text-emerald-400">AND</td><td class="p-3">1 se todas as entradas forem 1</td><td class="p-3">1 AND 0 = 0</td></tr>
          <tr><td class="p-3 font-mono text-emerald-400">OR</td><td class="p-3">1 se pelo menos uma entrada for 1</td><td class="p-3">1 OR 0 = 1</td></tr>
          <tr><td class="p-3 font-mono text-emerald-400">NOT</td><td class="p-3">Inverte o valor (0→1, 1→0)</td><td class="p-3">NOT 1 = 0</td></tr>
          <tr><td class="p-3 font-mono text-emerald-400">XOR</td><td class="p-3">1 se as entradas forem diferentes</td><td class="p-3">1 XOR 0 = 1</td></tr>
        </tbody>
      </table>
    </div>
    <p>Com bilhões dessas portas em um processador moderno, podemos construir desde calculadoras até inteligência artificial.</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-emerald-400">3. Transistores como Chaves</h2>
    <p>O transistor age como uma chave controlada eletricamente. Quando ativado, permite a passagem de corrente (bit 1). Quando desativado, bloqueia (bit 0). Um processador moderno contém bilhões de transistores microscópicos de silício.</p>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm">
      <p><span class="text-slate-500">// Transistor como chave:</span></p>
      <p>Tensão na base → transistor <strong class="text-emerald-400">satura</strong> (liga) → saída = 1</p>
      <p>Sem tensão → transistor <strong class="text-orange-400">corta</strong> (desliga) → saída = 0</p>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-emerald-400">4. Circuitos Combinacionais</h2>
    <p>Combinando portas lógicas, criamos circuitos que realizam operações matemáticas:</p>
    <ul class="list-disc list-inside space-y-1 text-sm text-slate-400">
      <li><strong class="text-slate-200">Meio somador</strong>: soma 2 bits (usando XOR + AND)</li>
      <li><strong class="text-slate-200">Somador completo</strong>: soma 2 bits + carry anterior</li>
      <li><strong class="text-slate-200">Multiplexador</strong>: seleciona entre múltiplas entradas</li>
      <li><strong class="text-slate-200">Decodificador</strong>: converte binário para ativar uma saída específica</li>
    </ul>
  </section>
</div>
`,

  "4.2": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 4.2: Design Gráfico</h1>
    <p class="text-slate-400">Como o sistema hexadecimal é usado para representar cores no design digital.</p>
  </header>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-emerald-400">1. O Sistema RGB</h2>
    <p>Monitores e telas formam cores combinando três canais de luz: <strong class="text-red-400">Vermelho (R)</strong>, <strong class="text-emerald-400">Verde (G)</strong> e <strong class="text-blue-400">Azul (B)</strong>. Cada canal é representado por 1 byte (0 a 255), resultando em 16,7 milhões de cores possíveis (256³).</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-emerald-400">2. Cores em Hexadecimal</h2>
    <p>No design web e digital, as cores são frequentemente escritas no formato <strong class="text-slate-100">#RRGGBB</strong>, onde cada par de dígitos hex representa um canal:</p>
    <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-xs">
            <th class="p-3">Cor</th>
            <th class="p-3">Hex</th>
            <th class="p-3">RGB Decimal</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60">
          <tr><td class="p-3"><span class="text-red-500">■</span> Vermelho</td><td class="p-3 font-mono text-orange-400">#FF0000</td><td class="p-3">rgb(255, 0, 0)</td></tr>
          <tr><td class="p-3"><span class="text-emerald-500">■</span> Verde</td><td class="p-3 font-mono text-orange-400">#00FF00</td><td class="p-3">rgb(0, 255, 0)</td></tr>
          <tr><td class="p-3"><span class="text-blue-500">■</span> Azul</td><td class="p-3 font-mono text-orange-400">#0000FF</td><td class="p-3">rgb(0, 0, 255)</td></tr>
          <tr><td class="p-3"><span class="text-white">■</span> Branco</td><td class="p-3 font-mono text-orange-400">#FFFFFF</td><td class="p-3">rgb(255, 255, 255)</td></tr>
          <tr><td class="p-3"><span class="text-slate-500">■</span> Preto</td><td class="p-3 font-mono text-orange-400">#000000</td><td class="p-3">rgb(0, 0, 0)</td></tr>
          <tr><td class="p-3"><span style="color:#FF5733">■</span> Laranja</td><td class="p-3 font-mono text-orange-400">#FF5733</td><td class="p-3">rgb(255, 87, 51)</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-emerald-400">3. Como ler #FF5733</h2>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm space-y-1">
      <p><span class="text-slate-500">// #FF5733:</span></p>
      <p><strong class="text-red-400">FF</strong> = 255 decimal → canal Vermelho no máximo</p>
      <p><strong class="text-emerald-400">57</strong> = 87 decimal → canal Verde com valor médio</p>
      <p><strong class="text-blue-400">33</strong> = 51 decimal → canal Azul com valor baixo</p>
      <p class="text-amber-400 mt-2">Resultado: laranja avermelhado</p>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-emerald-400">4. Profundidade de Cor</h2>
    <p>A quantidade de bits usados por pixel define a riqueza de cores da imagem:</p>
    <ul class="list-disc list-inside space-y-1 text-sm text-slate-400">
      <li><strong class="text-slate-200">1-bit</strong>: preto e branco (2 cores)</li>
      <li><strong class="text-slate-200">8-bit</strong>: 256 cores</li>
      <li><strong class="text-slate-200">16-bit</strong>: 65.536 cores (High Color)</li>
      <li><strong class="text-slate-200">24-bit</strong>: 16,7 milhões (True Color) — padrão RGB com 8 bits por canal</li>
      <li><strong class="text-slate-200">32-bit</strong>: 24-bit + canal alfa (transparência)</li>
    </ul>
  </section>
</div>
`,

  "4.3": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 4.3: Redes de Computadores</h1>
    <p class="text-slate-400">Endereçamento IP, máscaras de sub-rede e endereços MAC — todos baseados em sistemas numéricos.</p>
  </header>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-emerald-400">1. Endereços IPv4</h2>
    <p>Um endereço IPv4 é composto por 4 bytes (32 bits), normalmente escritos em decimal separado por pontos:</p>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm">
      <p><span class="text-slate-500">// Exemplo:</span> <strong class="text-amber-400">192.168.0.1</strong></p>
      <p><span class="text-slate-500">// Em binário:</span> 11000000.10101000.00000000.00000001</p>
      <p><span class="text-slate-500">// Cada octeto vai de 0 a 255:</span> 192 = 11000000₂</p>
    </div>
    <p>Existem 2³² = aproximadamente 4,3 bilhões de endereços IPv4 possíveis.</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-emerald-400">2. Máscara de Sub-rede</h2>
    <p>A máscara de sub-rede determina qual parte do IP identifica a <strong class="text-slate-100">rede</strong> e qual parte identifica o <strong class="text-slate-100">dispositivo</strong> (host).</p>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm">
      <p><span class="text-slate-500">// Máscara comum: 255.255.255.0</span></p>
      <p><span class="text-slate-500">// Em binário:</span> 11111111.11111111.11111111.00000000</p>
      <p><span class="text-slate-500">// Rede:</span> 192.168.0 | <span class="text-slate-500">Host:</span> 1</p>
    </div>
    <p>Os bits 1 na máscara indicam a porção da rede; os bits 0 indicam a porção do host.</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-emerald-400">3. Endereço MAC</h2>
    <p>O endereço MAC (Media Access Control) é um identificador único de 6 bytes (48 bits) gravado em cada placa de rede. Ele é tradicionalmente escrito em <strong class="text-slate-100">hexadecimal</strong>:</p>
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-sm">
      <p><span class="text-slate-500">// Exemplo de MAC address:</span></p>
      <p><strong class="text-orange-400">00:1A:2B:3C:4D:5E</strong></p>
      <p><span class="text-slate-500">// Em binário (48 bits):</span></p>
      <p>00000000.00011010.00101011.00111100.01001101.01011110</p>
    </div>
    <p>O MAC é único por dispositivo e usado na camada de enlace (Ethernet/Wi-Fi).</p>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold text-emerald-400">4. Como os Dados Trafegam</h2>
    <p>Os dados são divididos em <strong class="text-slate-100">pacotes</strong>, que são sequências de bits transmitidas pela rede. Cada pacote contém:</p>
    <ul class="list-disc list-inside space-y-1 text-sm text-slate-400">
      <li><strong class="text-slate-200">Cabeçalho</strong>: IP de origem, IP de destino, protocolo, checksum</li>
      <li><strong class="text-slate-200">Dados</strong>: o conteúdo útil (payload), também em binário</li>
      <li><strong class="text-slate-200">Rodapé</strong>: detecção de erros (CRC)</li>
    </ul>
    <p>Quando você acessa um site, seu computador envia pacotes com o IP de destino do servidor. Cada roteador no caminho examina o IP e decide para onde encaminhar o pacote — tudo isso usando operações binárias em nível de hardware.</p>
  </section>
</div>
`,
};
