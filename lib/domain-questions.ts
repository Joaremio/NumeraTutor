import { Question } from "./domain";

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
