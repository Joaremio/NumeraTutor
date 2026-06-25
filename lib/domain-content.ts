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
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 3.1: Hexadecimal A–F</h1>
    <p class="text-slate-400">Expansão da base 16 com letras.</p>
  </header>

  <div class="bg-slate-900/60 p-4 rounded-xl font-mono">
    <p>10 → A</p>
    <p>11 → B</p>
    <p>12 → C</p>
    <p>13 → D</p>
    <p>14 → E</p>
    <p>15 → F</p>
  </div>
</div>
`,

  "3.2": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 3.2: Decimal → Hexadecimal</h1>
  </header>

  <div class="bg-slate-900/60 p-4 rounded-xl font-mono">
    <p>26 ÷ 16 = 1 resto 10 (A)</p>
    <p>1 ÷ 16 = 0 resto 1</p>
    <p class="text-amber-400 mt-2">Resultado: 1A</p>
  </div>
</div>
`,

  "3.3": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 3.3: Binário → Hexadecimal</h1>
  </header>

  <div class="bg-slate-900/60 p-4 rounded-xl font-mono">
    <p>11010110 → 1101 0110</p>
    <p>1101 = D</p>
    <p>0110 = 6</p>
    <p class="text-amber-400 mt-2">Resultado: D6</p>
  </div>
</div>
`,

  // =====================================================
  // MÓDULO 4
  // =====================================================

  "4.1": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 4.1: Eletrônica</h1>
  </header>

  <p>0 = sem energia, 1 = energia.</p>
  <p>Base de portas lógicas e circuitos digitais.</p>
</div>
`,

  "4.2": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 4.2: Design</h1>
  </header>

  <p>RGB usa valores de 0 a 255.</p>
  <p>Hex cores: #FF5733 = RGB em base 16.</p>
</div>
`,

  "4.3": `
<div class="space-y-6 text-slate-300">
  <header class="border-b border-slate-800 pb-4">
    <h1 class="text-2xl font-bold text-slate-100 mb-2">Módulo 4.3: Redes</h1>
  </header>

  <p>IPs são números que identificam dispositivos.</p>
  <p>Pacotes são enviados em bits pela internet.</p>
</div>
`,
};
