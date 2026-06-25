import { Question } from "./domain";

export const QUESTIONS: Question[] = [
  // ==========================================
  // NÓ 1.1 – História dos Sistemas de Numeração
  // ==========================================
  {
    id: "q1.1-1",
    moduleId: "1",
    nodeId: "1.1",
    text: "Qual civilização antiga é conhecida por usar um sistema de numeração de base 60 (sexagesimal)?",
    answer: "Babilônios",
    hints: [
      "Pense em uma civilização da Mesopotâmia.",
      "Eles usavam um sistema que influenciou nossa medição de tempo (60 minutos, 360 graus).",
    ],
    explanation:
      "Os babilônios usavam base 60 (sexagesimal), que influencia até hoje a medição de tempo e ângulos.",
    difficulty: "easy",
  },
  {
    id: "q1.1-2",
    moduleId: "1",
    nodeId: "1.1",
    text: "O que diferencia fundamentalmente o sistema de numeração egípcio do sistema posicional moderno?",
    answer: "O valor dos símbolos não dependia da posição",
    hints: [
      "No sistema egípcio, cada símbolo tinha um valor fixo.",
      "Diferente do nosso sistema, a posição do símbolo não alterava seu valor.",
    ],
    explanation:
      "Sistemas como o egípcio e romano usavam valores fixos para cada símbolo, sem o conceito de valor posicional.",
    difficulty: "medium",
  },
  {
    id: "q1.1-3",
    moduleId: "1",
    nodeId: "1.1",
    text: "Por que a ausência do zero nos sistemas antigos (como o romano) dificultava cálculos complexos?",
    answer: "Sem o zero não é possível representar valores posicionais vazios",
    hints: [
      "O zero funciona como um marcador de posição.",
      "Sem ele, números como 101 e 11 seriam indistinguíveis em certas notações.",
    ],
    explanation:
      "O zero é essencial como marcador de posição. Sem ele, sistemas posicionais não funcionam corretamente, tornando cálculos complexos muito difíceis.",
    difficulty: "hard",
  },

  // ==========================================
  // NÓ 1.2 – Conceito de Base Numérica
  // ==========================================
  {
    id: "q1.2-1",
    moduleId: "1",
    nodeId: "1.2",
    text: "O que define a 'base' de um sistema de numeração posicional?",
    answer: "A quantidade de símbolos distintos disponíveis",
    hints: [
      "Quantos dedos usamos para contar no sistema decimal?",
      "A base determina quantos dígitos diferentes existem.",
    ],
    explanation:
      "A base de um sistema é a quantidade de símbolos (dígitos) distintos disponíveis. Decimal = 10 dígitos (0-9), Binário = 2 (0-1).",
    difficulty: "easy",
  },
  {
    id: "q1.2-2",
    moduleId: "1",
    nodeId: "1.2",
    text: "Se um sistema usa base 8 (octal), quais dígitos são válidos?",
    answer: "0, 1, 2, 3, 4, 5, 6, 7",
    hints: [
      "A base N sempre começa do 0 e vai até N-1.",
      "Base 8 vai de 0 até 7, totalizando 8 dígitos.",
    ],
    explanation:
      "Base 8 usa dígitos 0 a 7. O dígito 8 não existe em octal, assim como o dígito 2 não existe em binário.",
    difficulty: "medium",
  },
  {
    id: "q1.2-3",
    moduleId: "1",
    nodeId: "1.2",
    text: "Qual seria a base de um sistema hipotético que usa os dígitos {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B}?",
    answer: "Base 12",
    hints: [
      "Conte quantos símbolos distintos existem.",
      "10 dígitos decimais + 2 letras = ?",
    ],
    explanation:
      "São 12 símbolos distintos (0-9, A, B), portanto base 12. Conhecido como sistema duodecimal.",
    difficulty: "hard",
  },

  // ==========================================
  // NÓ 1.3 – Notação Posicional e Pesos
  // ==========================================
  {
    id: "q1.3-1",
    moduleId: "1",
    nodeId: "1.3",
    text: "No número decimal 247, qual o peso do algarismo 2?",
    answer: "100",
    hints: [
      "O 2 está na terceira posição da direita para a esquerda.",
      "Em base 10, a terceira posição vale 10² = 100.",
    ],
    explanation:
      "O 2 está na centena (posição 3), então seu peso é 10² = 100. O valor total é 2×100 + 4×10 + 7×1 = 247.",
    difficulty: "easy",
  },
  {
    id: "q1.3-2",
    moduleId: "1",
    nodeId: "1.3",
    text: "Em base 5, qual o peso da terceira posição da direita para a esquerda?",
    answer: "25",
    hints: [
      "Em base B, a posição N (da direita) tem peso B^(N-1).",
      "Terceira posição → N=3, B=5 → 5² = 25.",
    ],
    explanation:
      "Em base 5, os pesos são: 5⁰=1 (unidades), 5¹=5, 5²=25, 5³=125... A terceira posição tem peso 25.",
    difficulty: "medium",
  },
  {
    id: "q1.3-3",
    moduleId: "1",
    nodeId: "1.3",
    text: "Em qualquer sistema de base B, qual o peso da primeira posição à direita da vírgula (parte fracionária)?",
    answer: "B⁻¹ (inverso da base)",
    hints: [
      "No decimal, a primeira casa após a vírgula são os décimos.",
      "Décimos = 10⁻¹ = 1/10. Generalize para base B.",
    ],
    explanation:
      "A primeira posição fracionária tem peso B⁻¹ = 1/B. Em decimal: 10⁻¹ = 0,1 (décimos). Em binário: 2⁻¹ = 0,5 (metades).",
    difficulty: "hard",
  },

  // ==========================================
  // NÓ 2.1 – Bit e Byte
  // ==========================================
  {
    id: "q2.1-1",
    nodeId: "2.1",
    moduleId: "2",
    text: "Quantos bits formam 1 byte?",
    answer: "8",
    hints: [
      "Um byte é a unidade básica de armazenamento digital.",
      "Pense nos 8 dígitos binários que formam um caractere simples.",
    ],
    explanation:
      "1 byte = 8 bits. É a unidade fundamental de armazenamento, capaz de representar 256 valores (0 a 255).",
    difficulty: "easy",
  },
  {
    id: "q2.1-2",
    nodeId: "2.1",
    moduleId: "2",
    text: "Quantos valores diferentes podem ser representados com 1 byte?",
    answer: "256",
    hints: [
      "Cada bit pode ser 0 ou 1. Com 8 bits, quantas combinações?",
      "2⁸ = 256 combinações possíveis.",
    ],
    explanation:
      "1 byte = 8 bits. Como cada bit tem 2 estados, 2⁸ = 256 valores possíveis (de 0 a 255).",
    difficulty: "medium",
  },
  {
    id: "q2.1-3",
    nodeId: "2.1",
    moduleId: "2",
    text: "Seguindo a lógica de potências de 2, quantos bytes existem em 1 megabyte (MB)?",
    answer: "1.048.576",
    hints: [
      "1 KB = 1024 bytes, 1 MB = 1024 KB.",
      "1024 × 1024 = 1.048.576 bytes.",
    ],
    explanation:
      "1 MB = 1024 KB = 1024 × 1024 = 1.048.576 bytes. Na computação, usamos potências de 2, não de 10.",
    difficulty: "hard",
  },

  // ==========================================
  // NÓ 2.2 – Decimal → Binário
  // ==========================================
  {
    id: "q2.2-3",
    moduleId: "2",
    nodeId: "2.2",
    text: "Converta o número decimal 5 para binário.",
    answer: "101",
    hints: [
      "Divida 5 por 2 e anote os restos.",
      "5÷2=2r1, 2÷2=1r0, 1÷2=0r1. Leia de baixo para cima.",
    ],
    explanation: "5 em binário é 101. Verifique: 1×4 + 0×2 + 1×1 = 5 ✓",
    difficulty: "easy",
  },
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
    difficulty: "medium",
  },
  {
    id: "q2.2-2",
    nodeId: "2.2",
    moduleId: "2",
    text: "Qual é a representação binária do número decimal 25?",
    answer: "11001",
    hints: [
      "Lembre-se: divida por 2 repetidamente e colete os restos.",
      "25 ÷ 2 = 12, resto 1. Continue dividindo 12.",
      "12÷2=6r0, 6÷2=3r0, 3÷2=1r1, 1÷2=0r1. Leia os restos de baixo para cima: 11001.",
    ],
    explanation: "25 em binário é 11001. Verifique: 16+8+0+0+1 = 25 ✓",
    difficulty: "medium",
  },
  {
    id: "q2.2-4",
    nodeId: "2.2",
    moduleId: "2",
    text: "Converta o número decimal 100 para binário.",
    answer: "1100100",
    hints: [
      "Divida 100 sucessivamente por 2.",
      "100÷2=50r0, 50÷2=25r0, 25÷2=12r1, 12÷2=6r0, 6÷2=3r0, 3÷2=1r1, 1÷2=0r1.",
      "Leia os restos de baixo para cima.",
    ],
    explanation:
      "100 em binário é 1100100. Verifique: 64+32+0+0+4+0+0 = 100 ✓",
    difficulty: "hard",
  },

  // ==========================================
  // NÓ 2.3 – Binário → Decimal
  // ==========================================
  {
    id: "q2.3-1",
    nodeId: "2.3",
    moduleId: "2",
    text: "Qual o valor decimal do número binário 101?",
    answer: "5",
    hints: [
      "Cada posição representa uma potência de 2: 4, 2, 1.",
      "101 = 1×4 + 0×2 + 1×1 = 5.",
    ],
    explanation: "101₂ = 1×2² + 0×2¹ + 1×2⁰ = 4 + 0 + 1 = 5.",
    difficulty: "easy",
  },
  {
    id: "q2.3-2",
    nodeId: "2.3",
    moduleId: "2",
    text: "Qual o valor decimal do número binário 1101?",
    answer: "13",
    hints: [
      "Potências de 2: 8, 4, 2, 1.",
      "1101 = 1×8 + 1×4 + 0×2 + 1×1 = 13.",
    ],
    explanation: "1101₂ = 1×8 + 1×4 + 0×2 + 1×1 = 13.",
    difficulty: "medium",
  },
  {
    id: "q2.3-3",
    nodeId: "2.3",
    moduleId: "2",
    text: "Qual o valor decimal do binário 10000000 (1 byte com o MSB ativado)?",
    answer: "128",
    hints: [
      "O bit mais à esquerda em um byte representa 2⁷.",
      "2⁷ = 128.",
    ],
    explanation:
      "10000000₂ = 1×2⁷ = 128. É o bit de maior peso (MSB) em um byte.",
    difficulty: "hard",
  },
];

export const EXAM_QUESTIONS = [
  // ==========================================
  // MÓDULO 1: FUNDAMENTOS HISTÓRICOS E TEÓRICOS
  // ==========================================
  {
    id: "exam-1-1",
    moduleId: "module-1",
    nodeId: "1.1",
    text: "Qual das seguintes civilizações antigas é amplamente reconhecida pelo desenvolvimento e uso de um sistema de numeração de base 60 (sexagesimal)?",
    answer: "Babilônios",
    options: ["Egípcios", "Romanos", "Babilônios", "Maias"],
  },
  {
    id: "exam-1-2",
    moduleId: "module-1",
    nodeId: "1.1",
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
    nodeId: "1.1",
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
    nodeId: "1.2",
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
    nodeId: "1.2",
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
    nodeId: "1.3",
    text: "No número decimal 352, qual é o peso matemático associado ao algarismo 3 devido exclusivamente à sua posição na estrutura?",
    answer: "100 (ou 10²)",
    options: ["300", "100 (ou 10²)", "10 (ou 10¹)", "1 (ou 10⁰)"],
  },
  {
    id: "exam-1-7",
    moduleId: "module-1",
    nodeId: "1.3",
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
    nodeId: "1.3",
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
    nodeId: "1.3",
    text: "Se estivéssemos utilizando um sistema de numeração posicional baseado na Base 5, qual seria o peso matemático da terceira posição vindo da direita para a esquerda?",
    answer: "25",
    options: ["15", "9", "25", "125"],
  },
  {
    id: "exam-1-10",
    moduleId: "module-1",
    nodeId: "1.1",
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
    nodeId: "2.1",
    text: "Quantos estados lógicos ou valores distintos um único Bit (Binary Digit) consegue assumir individualmente?",
    answer: "2",
    options: ["1", "2", "8", "256"],
  },
  {
    id: "exam-2-2",
    moduleId: "module-2",
    nodeId: "2.1",
    text: "Um conjunto ordenado composto por exatamente 8 bits agrupados forma qual unidade padrão de medida de armazenamento digital?",
    answer: "1 Byte",
    options: ["1 Kilobyte", "1 Nibble", "1 Byte", "1 Word"],
  },
  {
    id: "exam-2-3",
    moduleId: "module-2",
    nodeId: "2.1",
    text: "Qual é o número total de combinações ou valores numéricos diferentes que podem ser armazenados dentro do espaço de 1 Byte?",
    answer: "256",
    options: ["8", "128", "255", "256"],
  },
  {
    id: "exam-2-4",
    moduleId: "module-2",
    nodeId: "2.1",
    text: "Na computação, as grandezas de armazenamento crescem em potências de 2. Seguindo essa lógica matemática, quantos Kilobytes (KB) compõem exatamente 1 Megabyte (MB)?",
    answer: "1.024",
    options: ["1.000", "1.024", "512", "2.048"],
  },
  {
    id: "exam-2-5",
    moduleId: "module-2",
    nodeId: "2.2",
    text: "Realize a conversão do número decimal 13 para o sistema binário. Qual sequência representa o valor correto?",
    answer: "1101",
    options: ["1011", "1101", "1110", "1001"],
  },
  {
    id: "exam-2-6",
    moduleId: "module-2",
    nodeId: "2.2",
    text: "Ao efetuar o método das divisões sucessivas por 2 para converter o número decimal 19 em binário, qual sequência de restos é obtida ao ler o resultado de baixo para cima?",
    answer: "10011",
    options: ["11001", "10101", "10011", "11011"],
  },
  {
    id: "exam-2-7",
    moduleId: "module-2",
    nodeId: "2.2",
    text: "Qual é o equivalente na base binária para o número decimal 7?",
    answer: "111",
    options: ["101", "110", "111", "1001"],
  },
  {
    id: "exam-2-8",
    moduleId: "module-2",
    nodeId: "2.3",
    text: "Convertendo a sequência binária 1010 diretamente para o sistema decimal, qual valor obtemos?",
    answer: "10",
    options: ["8", "10", "12", "14"],
  },
  {
    id: "exam-2-9",
    moduleId: "module-2",
    nodeId: "2.3",
    text: "Se um byte completo possui apenas o bit de maior peso ativado, correspondendo à sequência binária 10000000, qual é o seu valor equivalente em decimal?",
    answer: "128",
    options: ["64", "127", "128", "256"],
  },
  {
    id: "exam-2-10",
    moduleId: "module-2",
    nodeId: "2.3",
    text: "Ao traduzir o número binário 11111111 (onde todos os 8 bits do byte estão ligados) de volta para o sistema decimal, qual valor é gerado?",
    answer: "255",
    options: ["256", "255", "128", "512"],
  },
];
