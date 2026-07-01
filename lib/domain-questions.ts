import { ExamQuestion, Question } from "./domain";

export const QUESTIONS: Question[] = [
  // ==========================================
  // NÓ 1.1 – História dos Sistemas de Numeração
  // ==========================================
  {
    id: "q1.1-1",
    moduleId: "1",
    nodeId: "1.1",
    text: "Qual civilização antiga é conhecida por usar um sistema de numeração de base 60 (sexagesimal)?",
    options: ["Egípcios", "Romanos", "Babilônios", "Maias"],
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
    options: [
      "Os egípcios usavam base 2",
      "O valor dos símbolos não dependia da posição",
      "Os egípcios não tinham o número zero",
      "O sistema egípcio usava apenas 5 símbolos",
    ],
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
    options: [
      "Porque sem o zero não é possível representar valores fracionários",
      "Porque o zero é necessário como marcador de posição em sistemas posicionais",
      "Porque os números romanos não tinham símbolos para valores acima de 1000",
      "Porque o zero permitia apenas a representação de números pares",
    ],
    answer:
      "Porque o zero é necessário como marcador de posição em sistemas posicionais",
    hints: [
      "O zero funciona como um marcador de posição.",
      "Sem ele, números como 101 e 11 seriam indistinguíveis em certas notações.",
    ],
    explanation:
      "O zero é essencial como marcador de posição. Sem ele, sistemas posicionais não funcionam corretamente, tornando cálculos complexos muito difíceis.",
    difficulty: "hard",
  },
  {
    id: "q1.1-4",
    moduleId: "1",
    nodeId: "1.1",
    text: "Qual foi a principal contribuição do sistema de numeração hindu-arábico em relação aos sistemas antigos?",
    options: [
      "Utilizar apenas letras para representar números",
      "Introduzir o sistema posicional com o uso do zero",
      "Adotar a base 60 para todos os cálculos",
      "Eliminar completamente a necessidade de símbolos numéricos",
    ],
    answer: "Introduzir o sistema posicional com o uso do zero",
    hints: [
      "É o sistema que utilizamos atualmente.",
      "Ele combina valor posicional com um símbolo que representa a ausência de quantidade.",
    ],
    explanation:
      "O sistema hindu-arábico revolucionou a matemática ao introduzir o sistema decimal posicional e o número zero, tornando operações matemáticas muito mais eficientes.",
    difficulty: "easy",
  },
  {
    id: "q1.1-5",
    moduleId: "1",
    nodeId: "1.1",
    text: "Por que os sistemas de numeração posicionais são mais eficientes para realizar operações matemáticas do que sistemas como o romano?",
    options: [
      "Porque utilizam menos símbolos diferentes",
      "Porque permitem que o valor de um algarismo dependa de sua posição, facilitando algoritmos de cálculo",
      "Porque representam apenas números inteiros",
      "Porque não utilizam símbolos repetidos",
    ],
    answer:
      "Porque permitem que o valor de um algarismo dependa de sua posição, facilitando algoritmos de cálculo",
    hints: [
      "Pense em como fazemos contas de soma e multiplicação hoje.",
      "O valor de um mesmo algarismo muda conforme a casa decimal em que ele está.",
    ],
    explanation:
      "Nos sistemas posicionais, o valor de cada algarismo depende da posição que ocupa. Essa característica permite criar algoritmos eficientes para operações como soma, subtração, multiplicação e divisão, algo muito mais difícil em sistemas não posicionais como o romano.",
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
    options: [
      "O maior número que o sistema consegue representar",
      "A quantidade de símbolos distintos disponíveis",
      "O número de casas decimais suportadas",
      "A quantidade de bits que um processador utiliza",
    ],
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
    options: [
      "1, 2, 3, 4, 5, 6, 7, 8",
      "0, 1, 2, 3, 4, 5, 6, 7, 8",
      "0, 1, 2, 3, 4, 5, 6, 7",
      "A, B, C, D, E, F, G, H",
    ],
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
    options: ["Base 10", "Base 12", "Base 14", "Base 16"],
    answer: "Base 12",
    hints: [
      "Conte quantos símbolos distintos existem.",
      "10 dígitos decimais + 2 letras = ?",
    ],
    explanation:
      "São 12 símbolos distintos (0-9, A, B), portanto base 12. Conhecido como sistema duodecimal.",
    difficulty: "hard",
  },
  {
    id: "q1.2-4",
    moduleId: "1",
    nodeId: "1.2",
    text: "Qual é o maior dígito permitido em um sistema de numeração de base 5?",
    options: ["3", "4", "5", "6"],
    answer: "4",
    hints: [
      "Em uma base N, os dígitos vão de 0 até N-1.",
      "Se a base é 5, qual é o último dígito permitido?",
    ],
    explanation:
      "Em um sistema de base 5, os dígitos válidos são 0, 1, 2, 3 e 4. O maior dígito sempre é igual à base menos 1.",
    difficulty: "easy",
  },
  {
    id: "q1.2-5",
    moduleId: "1",
    nodeId: "1.2",
    text: "Por que o número 219 não pode pertencer a um sistema de base 8?",
    options: [
      "Porque possui três algarismos",
      "Porque o dígito 9 não existe na base 8",
      "Porque a base 8 só representa números pares",
      "Porque o dígito 2 não pode aparecer antes do 1",
    ],
    answer: "Porque o dígito 9 não existe na base 8",
    hints: [
      "Quais são os dígitos permitidos na base 8?",
      "Verifique se todos os algarismos do número são válidos.",
    ],
    explanation:
      "Na base 8, apenas os dígitos de 0 a 7 são permitidos. Como o número 219 contém o dígito 9, ele não pode ser representado nesse sistema de numeração.",
    difficulty: "medium",
  },

  // ==========================================
  // NÓ 1.3 – Notação Posicional e Pesos
  // ==========================================
  {
    id: "q1.3-1",
    moduleId: "1",
    nodeId: "1.3",
    text: "No número decimal 247, qual o peso do algarismo 2?",
    options: ["10", "100", "200", "1000"],
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
    options: ["5", "15", "25", "125"],
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
    options: [
      "B (a própria base)",
      "B⁰ = 1",
      "B⁻¹ (inverso da base)",
      "Sempre 0, independentemente da base",
    ],
    answer: "B⁻¹ (inverso da base)",
    hints: [
      "No decimal, a primeira casa após a vírgula são os décimos.",
      "Décimos = 10⁻¹ = 1/10. Generalize para base B.",
    ],
    explanation:
      "A primeira posição fracionária tem peso B⁻¹ = 1/B. Em decimal: 10⁻¹ = 0,1 (décimos). Em binário: 2⁻¹ = 0,5 (metades).",
    difficulty: "hard",
  },
  {
    id: "q1.3-4",
    moduleId: "1",
    nodeId: "1.3",
    text: "Qual é o valor representado pelo algarismo 5 no número decimal 5.482?",
    options: ["5", "50", "500", "5000"],
    answer: "5000",
    hints: [
      "Observe a posição do algarismo 5.",
      "Ele está na casa dos milhares, cujo peso é 10³.",
    ],
    explanation:
      "No número 5.482, o algarismo 5 ocupa a casa dos milhares. Seu peso é 10³ = 1000, portanto representa 5 × 1000 = 5000.",
    difficulty: "easy",
  },
  {
    id: "q1.3-5",
    moduleId: "1",
    nodeId: "1.3",
    text: "Qual é o valor decimal do número 132 na base 4?",
    options: ["24", "30", "34", "36"],
    answer: "30",
    hints: [
      "Multiplique cada algarismo pelo peso da sua posição.",
      "Os pesos da base 4 são: 4², 4¹ e 4⁰.",
    ],
    explanation:
      "132₄ = 1×4² + 3×4¹ + 2×4⁰ = 1×16 + 3×4 + 2×1 = 16 + 12 + 2 = 30.",
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
    options: ["4", "8", "16", "32"],
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
    options: ["8", "128", "255", "256"],
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
    options: ["1.000.000", "1.024.000", "1.048.576", "1.000.576"],
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
    options: ["100", "101", "110", "111"],
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
    options: ["1011", "1101", "1110", "1001"],
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
    options: ["11001", "10101", "10011", "11110"],
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
    options: ["1100100", "1100010", "1010100", "1111000"],
    answer: "1100100",
    hints: [
      "Divida 100 sucessivamente por 2.",
      "100÷2=50r0, 50÷2=25r0, 25÷2=12r1, 12÷2=6r0, 6÷2=3r0, 3÷2=1r1, 1÷2=0r1.",
      "Leia os restos de baixo para cima.",
    ],
    explanation: "100 em binário é 1100100. Verifique: 64+32+0+0+4+0+0 = 100 ✓",
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
    options: ["3", "5", "6", "7"],
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
    options: ["11", "12", "13", "14"],
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
    options: ["64", "127", "128", "256"],
    answer: "128",
    hints: ["O bit mais à esquerda em um byte representa 2⁷.", "2⁷ = 128."],
    explanation:
      "10000000₂ = 1×2⁷ = 128. É o bit de maior peso (MSB) em um byte.",
    difficulty: "hard",
  },

  // ==========================================
  // NÓ 3.1 – Mapeamento A–F
  // ==========================================
  {
    id: "q3.1-1",
    moduleId: "3",
    nodeId: "3.1",
    text: "Qual o valor decimal correspondente ao dígito hexadecimal 'A'?",
    options: ["9", "10", "11", "15"],
    answer: "10",
    hints: [
      "A letra 'A' é a primeira do alfabeto usada no sistema hexadecimal.",
      "Lembre-se: decimal 10 → A, 11 → B, 12 → C, etc.",
    ],
    explanation:
      "No sistema hexadecimal, A representa o valor decimal 10, B = 11, C = 12, D = 13, E = 14 e F = 15.",
    difficulty: "easy",
  },
  {
    id: "q3.1-2",
    moduleId: "3",
    nodeId: "3.1",
    text: "Qual o valor decimal do número hexadecimal 'FF'?",
    options: ["255", "256", "240", "15"],
    answer: "255",
    hints: [
      "Cada dígito hex tem peso posicional: F×16¹ + F×16⁰.",
      "F = 15 decimal. 15×16 + 15 = 255.",
    ],
    explanation:
      "FF₁₆ = 15×16 + 15 = 240 + 15 = 255. É o maior valor representável em 1 byte.",
    difficulty: "medium",
  },
  {
    id: "q3.1-3",
    moduleId: "3",
    nodeId: "3.1",
    text: "Por que o sistema hexadecimal é amplamente usado na computação?",
    options: [
      "Porque é mais fácil de calcular mentalmente que o decimal",
      "Porque 1 dígito hex representa exatamente 4 bits, facilitando a leitura de bytes",
      "Porque computadores só entendem hexadecimal, não binário",
      "Porque permite representar números negativos sem sinal",
    ],
    answer:
      "Porque 1 dígito hex representa exatamente 4 bits, facilitando a leitura de bytes",
    hints: [
      "Quantos bits são necessários para representar os valores 0 a 15?",
      "2⁴ = 16, e o hex tem 16 símbolos. Essa coincidência é a chave.",
    ],
    explanation:
      "4 bits podem representar 16 valores (0 a 15), que corresponde exatamente a 1 dígito hexadecimal. Um byte (8 bits) é representado por 2 dígitos hex.",
    difficulty: "hard",
  },

  // ==========================================
  // NÓ 3.2 – Decimal → Hexadecimal
  // ==========================================
  {
    id: "q3.2-1",
    moduleId: "3",
    nodeId: "3.2",
    text: "Qual é a representação hexadecimal do número decimal 26?",
    options: ["1A", "1B", "2A", "20"],
    answer: "1A",
    hints: [
      "Divida 26 por 16: 26 ÷ 16 = 1, resto 10.",
      "Resto 10 em hex é 'A'. Leia de baixo para cima: 1A.",
    ],
    explanation:
      "26 ÷ 16 = 1, resto 10 (A). 1 ÷ 16 = 0, resto 1. Resultado: 1A₁₆.",
    difficulty: "easy",
  },
  {
    id: "q3.2-2",
    moduleId: "3",
    nodeId: "3.2",
    text: "Qual é a representação hexadecimal do número decimal 255?",
    options: ["F0", "FF", "EF", "FE"],
    answer: "FF",
    hints: [
      "255 ÷ 16 = 15, resto 15.",
      "15 em hex é 'F'. Ambos os dígitos são F.",
    ],
    explanation:
      "255 ÷ 16 = 15, resto 15 (F). 15 ÷ 16 = 0, resto 15 (F). Resultado: FF₁₆.",
    difficulty: "medium",
  },
  {
    id: "q3.2-3",
    moduleId: "3",
    nodeId: "3.2",
    text: "Qual é a representação hexadecimal do número decimal 1000?",
    options: ["3E8", "4E8", "3F8", "2F8"],
    answer: "3E8",
    hints: [
      "Divida 1000 sucessivamente por 16 e colete os restos.",
      "1000÷16=62r8, 62÷16=3r14(E), 3÷16=0r3. Leia de baixo para cima.",
    ],
    explanation:
      "1000 ÷ 16 = 62, resto 8. 62 ÷ 16 = 3, resto 14 (E). 3 ÷ 16 = 0, resto 3. Resultado: 3E8₁₆.",
    difficulty: "hard",
  },

  // ==========================================
  // NÓ 3.3 – Binário → Hexadecimal
  // ==========================================
  {
    id: "q3.3-1",
    moduleId: "3",
    nodeId: "3.3",
    text: "Qual a representação hexadecimal do número binário 1111?",
    options: ["E", "F", "15", "1F"],
    answer: "F",
    hints: [
      "1111 em binário = 15 em decimal.",
      "O valor decimal 15 corresponde a qual letra em hexadecimal?",
    ],
    explanation: "1111₂ = 15₁₀ = F₁₆. F é o maior dígito hexadecimal.",
    difficulty: "easy",
  },
  {
    id: "q3.3-2",
    moduleId: "3",
    nodeId: "3.3",
    text: "Qual a representação hexadecimal do número binário 11010110?",
    options: ["C6", "D6", "D5", "E6"],
    answer: "D6",
    hints: [
      "Agrupe o binário de 4 em 4 bits: 1101 0110.",
      "1101 = D (13 decimal), 0110 = 6.",
    ],
    explanation:
      "11010110₂ → 1101 0110 (agrupado). 1101 = D, 0110 = 6. Resultado: D6₁₆.",
    difficulty: "medium",
  },
  {
    id: "q3.3-3",
    moduleId: "3",
    nodeId: "3.3",
    text: "Qual a representação hexadecimal do número binário 101011?",
    options: ["2B", "3B", "2A", "3A"],
    answer: "2B",
    hints: [
      "Agrupe de 4 em 4 bits da direita para a esquerda: 0010 1011.",
      "Complete com zeros à esquerda se necessário. 0010 = 2, 1011 = B.",
    ],
    explanation:
      "101011₂ → 0010 1011 (agrupado com zero à esquerda). 0010 = 2, 1011 = B. Resultado: 2B₁₆.",
    difficulty: "hard",
  },

  // ==========================================
  // NÓ 4.1 – Eletrônica e Física
  // ==========================================
  {
    id: "q4.1-1",
    moduleId: "4",
    nodeId: "4.1",
    text: "O que representa o bit 1 em termos de tensão elétrica em um circuito digital?",
    options: [
      "Ausência de tensão (0V)",
      "Tensão positiva (3,3V–5V)",
      "Tensão negativa (-5V)",
      "Corrente alternada",
    ],
    answer: "Tensão positiva (3,3V–5V)",
    hints: [
      "Em circuitos digitais, usamos dois níveis de tensão para representar 0 e 1.",
      "O 1 está associado ao nível lógico 'ligado' ou 'verdadeiro'.",
    ],
    explanation:
      "Nos circuitos digitais, bit 1 = tensão positiva (geralmente 3,3V ou 5V, chamado VCC), bit 0 = 0V (GND).",
    difficulty: "easy",
  },
  {
    id: "q4.1-2",
    moduleId: "4",
    nodeId: "4.1",
    text: "Qual porta lógica produz saída 1 apenas quando todas as entradas são 1?",
    options: ["AND", "OR", "NOT", "XOR"],
    answer: "AND",
    hints: [
      "Pense no significado da palavra 'AND' (E).",
      "A saída é 1 se a entrada 1 E a entrada 2 forem 1.",
    ],
    explanation:
      "A porta AND só retorna 1 quando todas as entradas são 1. Qualquer entrada 0 leva a saída 0.",
    difficulty: "easy",
  },
  {
    id: "q4.1-3",
    moduleId: "4",
    nodeId: "4.1",
    text: "Qual a função de um transistor em um circuito digital?",
    options: [
      "Armazenar energia elétrica",
      "Atuar como uma chave controlada eletricamente (liga/desliga)",
      "Converter corrente alternada em contínua",
      "Amplificar sinais de áudio",
    ],
    answer: "Atuar como uma chave controlada eletricamente (liga/desliga)",
    hints: [
      "Transistores em circuitos digitais operam apenas nos estados ligado ou desligado.",
      "Eles não armazenam energia; eles permitem ou bloqueiam a passagem de corrente.",
    ],
    explanation:
      "Em circuitos digitais, o transistor funciona como uma chave: quando ativado, permite corrente (bit 1); quando desativado, bloqueia (bit 0).",
    difficulty: "medium",
  },

  // ==========================================
  // NÓ 4.2 – Design Gráfico
  // ==========================================
  {
    id: "q4.2-1",
    moduleId: "4",
    nodeId: "4.2",
    text: "No sistema RGB, quantos valores possíveis cada canal de cor pode assumir?",
    options: ["16", "128", "255", "256"],
    answer: "256",
    hints: [
      "Cada canal (R, G, B) é representado por 1 byte.",
      "1 byte pode representar 256 valores diferentes (0 a 255).",
    ],
    explanation:
      "Cada canal RGB usa 1 byte (8 bits), permitindo 256 valores de 0 a 255. Isso resulta em 256³ ≈ 16,7 milhões de cores.",
    difficulty: "easy",
  },
  {
    id: "q4.2-2",
    moduleId: "4",
    nodeId: "4.2",
    text: "Qual cor é representada pelo código hexadecimal #FF0000?",
    options: ["Verde", "Azul", "Vermelho", "Branco"],
    answer: "Vermelho",
    hints: [
      "O formato é #RRGGBB: dois dígitos para cada canal.",
      "#FF0000 significa Red = FF (máximo), Green = 00, Blue = 00.",
    ],
    explanation:
      "#FF0000 = R=255, G=0, B=0. Apenas o canal vermelho no máximo, resultando na cor vermelha pura.",
    difficulty: "medium",
  },
  {
    id: "q4.2-3",
    moduleId: "4",
    nodeId: "4.2",
    text: "Quantas cores diferentes podem ser representadas no sistema RGB 24-bit (True Color)?",
    options: ["65.536", "16.777.216", "1.048.576", "256"],
    answer: "16.777.216",
    hints: [
      "True Color usa 8 bits por canal: 8+8+8 = 24 bits por pixel.",
      "2²⁴ = 16.777.216 combinações possíveis.",
    ],
    explanation:
      "RGB 24-bit = 8 bits por canal (R, G, B). Total = 2⁸ × 2⁸ × 2⁸ = 256³ = 16.777.216 cores. Conhecido como True Color.",
    difficulty: "hard",
  },

  // ==========================================
  // NÓ 4.3 – Redes de Computadores
  // ==========================================
  {
    id: "q4.3-1",
    moduleId: "4",
    nodeId: "4.3",
    text: "Quantos bytes compõem um endereço IPv4?",
    options: ["2", "4", "6", "8"],
    answer: "4",
    hints: [
      "Um endereço IPv4 tem 32 bits no total.",
      "32 bits ÷ 8 bits por byte = 4 bytes.",
    ],
    explanation:
      "IPv4 usa 32 bits (4 bytes), geralmente escritos em formato decimal como 192.168.0.1.",
    difficulty: "easy",
  },
  {
    id: "q4.3-2",
    moduleId: "4",
    nodeId: "4.3",
    text: "Em que base numérica o endereço MAC é tradicionalmente representado?",
    options: ["Binária", "Decimal", "Hexadecimal", "Octal"],
    answer: "Hexadecimal",
    hints: [
      "Endereços MAC têm 6 bytes (48 bits), escritos em pares de dígitos.",
      "Exemplo: 00:1A:2B:3C:4D:5E usa letras A-F.",
    ],
    explanation:
      "Endereços MAC são representados em hexadecimal porque 1 byte = 2 dígitos hex, tornando a leitura mais compacta que binário.",
    difficulty: "medium",
  },
  {
    id: "q4.3-3",
    moduleId: "4",
    nodeId: "4.3",
    text: "Qual a função da máscara de sub-rede em um endereço IP?",
    options: [
      "Criptografar os dados transmitidos na rede",
      "Determinar qual parte do IP identifica a rede e qual identifica o dispositivo",
      "Converter o IP decimal em hexadecimal",
      "Atribuir um endereço MAC ao dispositivo",
    ],
    answer:
      "Determinar qual parte do IP identifica a rede e qual identifica o dispositivo",
    hints: [
      "A máscara usa bits 1 para a rede e bits 0 para o host.",
      "Exemplo: 255.255.255.0 = 24 bits para rede, 8 bits para host.",
    ],
    explanation:
      "A máscara de sub-rede separa o endereço IP em duas partes: rede (bits com 1 na máscara) e host (bits com 0 na máscara).",
    difficulty: "hard",
  },
];

export const EXAM_QUESTIONS: ExamQuestion[] = [
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

  // ==========================================
  // MÓDULO 3: SISTEMA HEXADECIMAL
  // ==========================================
  {
    id: "exam-3-1",
    moduleId: "module-3",
    nodeId: "3.1",
    text: "Qual letra do alfabeto representa o valor decimal 12 no sistema hexadecimal?",
    answer: "C",
    options: ["A", "B", "C", "D"],
  },
  {
    id: "exam-3-2",
    moduleId: "module-3",
    nodeId: "3.1",
    text: "Quantos símbolos distintos existem no sistema de numeração hexadecimal?",
    answer: "16",
    options: ["10", "15", "16", "20"],
  },
  {
    id: "exam-3-3",
    moduleId: "module-3",
    nodeId: "3.1",
    text: "Qual o valor decimal do número hexadecimal '1A'?",
    answer: "26",
    options: ["16", "20", "26", "36"],
  },
  {
    id: "exam-3-4",
    moduleId: "module-3",
    nodeId: "3.2",
    text: "Qual é a representação hexadecimal do número decimal 31?",
    answer: "1F",
    options: ["1E", "1F", "2F", "1A"],
  },
  {
    id: "exam-3-5",
    moduleId: "module-3",
    nodeId: "3.2",
    text: "Qual é a representação hexadecimal do número decimal 200?",
    answer: "C8",
    options: ["C8", "D8", "C7", "B8"],
  },
  {
    id: "exam-3-6",
    moduleId: "module-3",
    nodeId: "3.2",
    text: "Utilizando o método das divisões sucessivas, qual o resultado da conversão do decimal 42 para hexadecimal?",
    answer: "2A",
    options: ["2A", "3A", "2B", "1A"],
  },
  {
    id: "exam-3-7",
    moduleId: "module-3",
    nodeId: "3.3",
    text: "Qual a representação hexadecimal do número binário 10100011?",
    answer: "A3",
    options: ["A3", "B3", "A2", "93"],
  },
  {
    id: "exam-3-8",
    moduleId: "module-3",
    nodeId: "3.3",
    text: "Qual a representação hexadecimal do número binário 11110000?",
    answer: "F0",
    options: ["F0", "0F", "FF", "F1"],
  },
  {
    id: "exam-3-9",
    moduleId: "module-3",
    nodeId: "3.3",
    text: "Agrupando o binário 100110111001 em grupos de 4 bits e convertendo, qual valor hexadecimal é obtido?",
    answer: "9B9",
    options: ["9B9", "9C9", "8B8", "9B8"],
  },
  {
    id: "exam-3-10",
    moduleId: "module-3",
    nodeId: "3.1",
    text: "Por que 1 dígito hexadecimal é equivalente a exatamente 4 bits?",
    answer: "Porque 2⁴ = 16, e o hexadecimal tem 16 símbolos possíveis",
    options: [
      "Porque 4 bits cabem dentro de 1 byte",
      "Porque 2⁴ = 16, e o hexadecimal tem 16 símbolos possíveis",
      "Porque o processador lê 4 bits por vez",
      "Porque o sistema hexadecimal usa 4 letras (A, B, C, D)",
    ],
  },

  // ==========================================
  // MÓDULO 4: APLICAÇÕES PRÁTICAS
  // ==========================================
  {
    id: "exam-4-1",
    moduleId: "module-4",
    nodeId: "4.1",
    text: "Qual porta lógica produz saída 1 se pelo menos uma das entradas for 1?",
    answer: "OR",
    options: ["AND", "OR", "NOT", "XOR"],
  },
  {
    id: "exam-4-2",
    moduleId: "module-4",
    nodeId: "4.1",
    text: "Em circuitos digitais, qual componente é usado como chave controlada para representar bits?",
    answer: "Transistor",
    options: ["Resistor", "Capacitor", "Transistor", "Diodo"],
  },
  {
    id: "exam-4-3",
    moduleId: "module-4",
    nodeId: "4.1",
    text: "Quantas entradas tem uma porta lógica NOT?",
    answer: "1",
    options: ["1", "2", "3", "4"],
  },
  {
    id: "exam-4-4",
    moduleId: "module-4",
    nodeId: "4.2",
    text: "No formato hexadecimal #RRGGBB, qual cor é representada por #00FF00?",
    answer: "Verde",
    options: ["Vermelho", "Azul", "Verde", "Amarelo"],
  },
  {
    id: "exam-4-5",
    moduleId: "module-4",
    nodeId: "4.2",
    text: "No sistema RGB, quantos bytes são usados no total para representar a cor de 1 pixel em True Color (24-bit)?",
    answer: "3 bytes",
    options: ["1 byte", "2 bytes", "3 bytes", "4 bytes"],
  },
  {
    id: "exam-4-6",
    moduleId: "module-4",
    nodeId: "4.2",
    text: "Qual a cor resultante da mistura máxima dos três canais RGB (#FFFFFF)?",
    answer: "Branco",
    options: ["Preto", "Cinza", "Branco", "Amarelo"],
  },
  {
    id: "exam-4-7",
    moduleId: "module-4",
    nodeId: "4.3",
    text: "Quantos bits existem em um endereço IPv4?",
    answer: "32",
    options: ["16", "32", "48", "64"],
  },
  {
    id: "exam-4-8",
    moduleId: "module-4",
    nodeId: "4.3",
    text: "Quantos bytes possui um endereço MAC?",
    answer: "6",
    options: ["4", "6", "8", "12"],
  },
  {
    id: "exam-4-9",
    moduleId: "module-4",
    nodeId: "4.3",
    text: "Qual sistema de numeração é usado para representar endereços MAC?",
    answer: "Hexadecimal",
    options: ["Binário", "Decimal", "Hexadecimal", "Octal"],
  },
  {
    id: "exam-4-10",
    moduleId: "module-4",
    nodeId: "4.3",
    text: "Em um endereço IP com máscara 255.255.255.0, quantos bits são reservados para identificar o dispositivo (host)?",
    answer: "8",
    options: ["8", "16", "24", "32"],
  },
];
