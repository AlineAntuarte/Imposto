# 📊 Guia Completo de Cálculo de Imposto de Renda (IRPF)
>
> Do básico ao avançado — com exemplos passo a passo para você programar a lógica

---

## Sumário

1. [O que é o Imposto de Renda?](#1-o-que-é-o-imposto-de-renda)
2. [Conceitos Fundamentais](#2-conceitos-fundamentais)
3. [Tabela Progressiva — Como Funciona?](#3-tabela-progressiva--como-funciona)
4. [Cálculo Mensal (Desconto em Folha / Carnê-Leão)](#4-cálculo-mensal-desconto-em-folha--carnê-leão)
5. [Deduções Permitidas](#5-deduções-permitidas)
6. [Cálculo com Deduções — Exemplos Completos](#6-cálculo-com-deduções--exemplos-completos)
7. [Tabela Anual e Declaração do IRPF](#7-tabela-anual-e-declaração-do-irpf)
8. [Cálculo Anual — Imposto a Pagar ou a Restituir](#8-cálculo-anual--imposto-a-pagar-ou-a-restituir)
9. [Alíquota Efetiva vs. Alíquota Nominal](#9-alíquota-efetiva-vs-alíquota-nominal)
10. [Quadro-Resumo das Fórmulas para Programar](#10-quadro-resumo-das-fórmulas-para-programar)
11. [Erros Comuns e Pegadinhas](#11-erros-comuns-e-pegadinhas)
12. [Referências Oficiais](#12-referências-oficiais)

---

## 1. O que é o Imposto de Renda?

O **Imposto de Renda da Pessoa Física (IRPF)** é um tributo federal cobrado pelo governo brasileiro sobre os **ganhos** (renda) de uma pessoa durante um período.

### Quem deve pagar?

Pessoa física residente no Brasil que, no ano anterior, recebeu rendimentos tributáveis acima do limite de isenção. Em 2024 (declaração do ano-calendário 2023), esse limite era **R$ 28.559,70** no ano (equivalente a R$ 2.379,98/mês).

> 💡 **Dois momentos do IR:**
>
> - **Mensal** → Desconto direto na folha de pagamento (ou recolhimento via Carnê-Leão para autônomos)
> - **Anual** → Declaração de Ajuste Anual (entre março e maio de cada ano, referente ao ano anterior)

---

## 2. Conceitos Fundamentais

Antes de calcular, você precisa dominar estes termos:

| Termo | O que significa |
 | --- | --- |
| **Renda Bruta** | Tudo que você recebeu (salário, aluguéis, etc.) |
| **Deduções** | Valores que você pode abater da renda bruta (INSS, dependentes, etc.) |
| **Base de Cálculo** | Renda Bruta − Deduções. É **sobre isso** que o IR incide |
| **Alíquota** | O percentual (%) de imposto que se aplica |
| **Parcela a Deduzir** | Um valor fixo que corrige o cálculo progressivo (explicado abaixo) |
| **IR Devido** | O imposto calculado sobre a Base de Cálculo |
| **IR Retido** | O imposto já descontado ao longo do ano (na fonte) |
| **Restituição** | Quando você pagou mais IR do que devia → Receita devolve |
| **Imposto a Pagar** | Quando você pagou menos IR do que devia → Você paga a diferença |

---

## 3. Tabela Progressiva — Como Funciona?

O Brasil usa uma **tabela progressiva**: quem ganha mais, paga proporcionalmente mais. Mas **cada faixa tem sua própria alíquota** — você não paga a alíquota mais alta sobre toda a sua renda.

### 3.1 Tabela Mensal 2024 (vigente a partir de maio/2023)

| Faixa | Renda Mensal (Base de Cálculo) | Alíquota | Parcela a Deduzir |
 | --- | --- | --- | --- |
| 1ª | Até R$ 2.259,20 | **0%** (isento) | R$ 0,00 |
| 2ª | De R$ 2.259,21 até R$ 2.826,65 | **7,5%** | R$ 169,44 |
| 3ª | De R$ 2.826,66 até R$ 3.751,05 | **15%** | R$ 381,44 |
| 4ª | De R$ 3.751,06 até R$ 4.664,68 | **22,5%** | R$ 662,77 |
| 5ª | Acima de R$ 4.664,68 | **27,5%** | R$ 896,00 |

> **A "Parcela a Deduzir" existe para simplificar o cálculo.** Em vez de aplicar alíquotas diferentes em cada faixa separadamente, você aplica a alíquota da última faixa atingida sobre a base inteira e subtrai a parcela a deduzir. O resultado é idêntico. Veja o porquê na seção 3.2.

### 3.2 Por que a "Parcela a Deduzir" funciona?

Imagine uma renda de **R$ 3.000,00**.

**Método longo (faixa a faixa):**

```text
Faixa 1: R$ 2.259,20 × 0%   = R$ 0,00
Faixa 2: R$ 740,80 × 7,5%   = R$ 55,56
          (R$ 3.000 - R$ 2.259,20 = R$ 740,80)
Total IR = R$ 0,00 + R$ 55,56 = R$ 55,56
```

**Método curto (com parcela a deduzir):**

```text
Alíquota da faixa atingida: 7,5%
IR = R$ 3.000,00 × 7,5% − R$ 169,44
IR = R$ 225,00 − R$ 169,44
IR = R$ 55,56  ✅ Mesmo resultado!
```

A parcela a deduzir **embutiu** o desconto das faixas inferiores (onde a alíquota é menor). É uma simplificação matemática.

---

## 4. Cálculo Mensal (Desconto em Folha / Carnê-Leão)

### Fórmula Geral

```text
Base de Cálculo = Renda Bruta − Deduções
IR Mensal = (Base de Cálculo × Alíquota) − Parcela a Deduzir
```

> Se o resultado for negativo ou zero → IR = R$ 0,00 (não existe IR negativo)

### Exemplo 1 — Salário de R$ 2.000,00 (sem deduções)

```text
Base de Cálculo = R$ 2.000,00

Verificando a tabela: R$ 2.000,00 está na Faixa 1 (até R$ 2.259,20)
Alíquota = 0% | Parcela a Deduzir = R$ 0,00

IR = R$ 2.000,00 × 0% − R$ 0,00 = R$ 0,00

Resultado: ISENTO ✅
```

### Exemplo 2 — Salário de R$ 3.500,00 (sem deduções)

```text
Base de Cálculo = R$ 3.500,00

Verificando a tabela: R$ 3.500,00 está na Faixa 3 (R$ 2.826,66 a R$ 3.751,05)
Alíquota = 15% | Parcela a Deduzir = R$ 381,44

IR = R$ 3.500,00 × 15% − R$ 381,44
IR = R$ 525,00 − R$ 381,44
IR = R$ 143,56

Resultado: R$ 143,56 de IR descontado na folha
```

### Exemplo 3 — Salário de R$ 8.000,00 (sem deduções)

```text
Base de Cálculo = R$ 8.000,00

Verificando a tabela: R$ 8.000,00 está na Faixa 5 (acima de R$ 4.664,68)
Alíquota = 27,5% | Parcela a Deduzir = R$ 896,00

IR = R$ 8.000,00 × 27,5% − R$ 896,00
IR = R$ 2.200,00 − R$ 896,00
IR = R$ 1.304,00

Resultado: R$ 1.304,00 de IR descontado na folha
```

---

## 5. Deduções Permitidas

As deduções **reduzem a Base de Cálculo**, diminuindo o IR. As principais são:

### 5.1 Dedução por Dependente

A cada dependente (filho, cônjuge sem renda, etc.) o contribuinte pode deduzir um valor fixo por mês.

- **Valor mensal (2024): R$ 189,59 por dependente**

> Dependentes aceitos pela Receita Federal: filhos e enteados até 21 anos (ou 24 se em curso superior/técnico), cônjuge, pais/avós sem renda própria, entre outros.

### 5.2 Dedução do INSS

A contribuição ao **INSS (Previdência Social)** é integralmente dedutível.

O INSS é calculado sobre o salário bruto com alíquotas progressivas próprias:

| Faixa Salarial | Alíquota INSS |
 | --- | --- |
| Até R$ 1.412,00 | 7,5% |
| De R$ 1.412,01 até R$ 2.666,68 | 9% |
| De R$ 2.666,69 até R$ 4.000,03 | 12% |
| De R$ 4.000,04 até R$ 7.786,02 | 14% |

> O INSS também é progressivo por faixas! Funciona igual ao IR: aplica cada alíquota sobre a parte da faixa correspondente.

**Exemplo de cálculo de INSS para salário de R$ 3.500,00:**

```text
Faixa 1: R$ 1.412,00 × 7,5%           = R$ 105,90
Faixa 2: (R$ 2.666,68 - R$ 1.412,00) × 9% = R$ 112,93
          R$ 1.254,68 × 9%            = R$ 112,93
Faixa 3: (R$ 3.500,00 - R$ 2.666,68) × 12% = R$ 99,99
          R$ 833,32 × 12%             = R$ 99,99

INSS Total = R$ 105,90 + R$ 112,93 + R$ 99,99 = R$ 318,82
```

### 5.3 Dedução de Pensão Alimentícia

Pensão alimentícia paga por ordem judicial é **100% dedutível** do IR.

### 5.4 Dedução por Previdência Privada (PGBL)

Contribuições ao **PGBL** (não ao VGBL) são dedutíveis em até **12% da renda bruta anual** na declaração anual. Não se aplica ao cálculo mensal.

### 5.5 Resumo das Deduções Mensais

```text
Base de Cálculo = Renda Bruta
                − INSS
                − (Nº de Dependentes × R$ 189,59)
                − Pensão Alimentícia Judicial
```

---

## 6. Cálculo com Deduções — Exemplos Completos

### Exemplo 4 — Salário R$ 4.000,00, 1 dependente, INSS calculado

### **Passo 1: Calcular o INSS**

```text
Faixa 1: R$ 1.412,00 × 7,5%                      = R$ 105,90
Faixa 2: (R$ 2.666,68 - R$ 1.412,00) × 9%        = R$ 112,93
Faixa 3: (R$ 4.000,00 - R$ 2.666,68) × 12%       = R$ 160,00
          R$ 1.333,32 × 12%                       = R$ 159,99

INSS = R$ 105,90 + R$ 112,93 + R$ 159,99 = R$ 378,82
```

### Passo 2: Calcular as Deduções**

```text
Dedução INSS:        R$ 378,82
Dedução dependente:  R$ 189,59 (1 dependente)
Total Deduções:      R$ 568,41
```

### Passo 3: Calcular a Base de Cálculo**

```text
Base de Cálculo = R$ 4.000,00 − R$ 568,41 = R$ 3.431,59
```

### Passo 4: Aplicar a Tabela do IR**

```text
R$ 3.431,59 está na Faixa 3 (R$ 2.826,66 a R$ 3.751,05)
Alíquota = 15% | Parcela a Deduzir = R$ 381,44

IR = R$ 3.431,59 × 15% − R$ 381,44
IR = R$ 514,74 − R$ 381,44
IR = R$ 133,30
```

**Resumo final:**

```text
Salário Bruto:     R$ 4.000,00
(−) INSS:         −R$   378,82
(−) IR:           −R$   133,30
                  ──────────────
Salário Líquido:   R$ 3.487,88
```

---

### Exemplo 5 — Salário R$ 6.000,00, 2 dependentes

### Passo 1: INSS**

```text
Faixa 1: R$ 1.412,00 × 7,5%                      = R$ 105,90
Faixa 2: (R$ 2.666,68 - R$ 1.412,00) × 9%        = R$ 112,93
Faixa 3: (R$ 4.000,03 - R$ 2.666,68) × 12%       = R$ 159,04
Faixa 4: (R$ 6.000,00 - R$ 4.000,03) × 14%       = R$ 279,99

INSS = R$ 105,90 + R$ 112,93 + R$ 159,04 + R$ 279,99 = R$ 657,86
```

### Passo 2: Deduções**

```text
Dedução INSS:         R$ 657,86
Dedução 2 dependentes: R$ 379,18 (2 × R$ 189,59)
Total Deduções:       R$ 1.037,04
```

### Passo 3: Base de Cálculo**

```text
Base de Cálculo = R$ 6.000,00 − R$ 1.037,04 = R$ 4.962,96
```

### Passo 4: IR**

```text
R$ 4.962,96 está na Faixa 5 (acima de R$ 4.664,68)
Alíquota = 27,5% | Parcela a Deduzir = R$ 896,00

IR = R$ 4.962,96 × 27,5% − R$ 896,00
IR = R$ 1.364,81 − R$ 896,00
IR = R$ 468,81
```

**Resumo:**

```text
Salário Bruto:     R$ 6.000,00
(−) INSS:         −R$   657,86
(−) IR:           −R$   468,81
                  ──────────────
Salário Líquido:   R$ 4.873,33
```

---

## 7. Tabela Anual e Declaração do IRPF

A **Declaração Anual** consolida todos os rendimentos e pagamentos do ano anterior e verifica se você pagou exatamente o IR que devia.

### 7.1 Tabela Anual 2024 (Ano-Calendário 2023)

| Faixa | Renda Anual (Base de Cálculo) | Alíquota | Parcela a Deduzir |
 | --- | --- | --- | --- |
| 1ª | Até R$ 24.511,92 | 0% | R$ 0,00 |
| 2ª | De R$ 24.511,93 até R$ 33.919,80 | 7,5% | R$ 1.838,39 |
| 3ª | De R$ 33.919,81 até R$ 45.012,60 | 15% | R$ 4.382,38 |
| 4ª | De R$ 45.012,61 até R$ 55.976,16 | 22,5% | R$ 7.758,32 |
| 5ª | Acima de R$ 55.976,16 | 27,5% | R$ 10.557,13 |

> 📌 Repare: a tabela anual é simplesmente a tabela mensal **multiplicada por 12**. Por isso o cálculo funciona da mesma forma.

### 7.2 Deduções Anuais

| Dedução | Valor (2024) |
 | --- | --- |
| Por dependente | R$ 2.275,08/ano (R$ 189,59 × 12) |
| INSS pago no ano | Valor total descontado em folha |
| Despesas médicas | 100% dedutíveis (sem limite) |
| Educação própria | Até R$ 3.561,50/ano |
| Educação de dependentes | Até R$ 3.561,50/ano por dependente |
| Pensão alimentícia judicial | 100% dedutível |
| PGBL (previdência privada) | Até 12% da renda bruta |

### 7.3 Desconto Simplificado

Em vez de guardar todos os comprovantes e fazer deduções legais, o contribuinte pode optar pelo **Desconto Simplificado**: deduz-se automaticamente **20% da renda bruta**, com **teto de R$ 16.754,34** para 2024.

> Use o desconto simplificado se suas deduções reais forem menores que 20% da renda. Caso contrário, use o **modelo completo (deduções legais)**.

---

## 8. Cálculo Anual — Imposto a Pagar ou a Restituir

### Fórmula Anual

```text
IR Anual Devido = (Base de Cálculo Anual × Alíquota) − Parcela a Deduzir

Saldo =  IR Anual Devido − IR Retido na Fonte (total pago ao longo do ano)

Se Saldo > 0 → Imposto a PAGAR
Se Saldo < 0 → RESTITUIÇÃO (a Receita te devolve)
Se Saldo = 0 → Zerado (pagou exatamente o certo)
```

### Exemplo 6 — Declaração Anual Completa

**Dados do contribuinte:**

- Salário: R$ 4.000,00/mês (recebeu 12 meses + 13º = 13 salários)
- 1 dependente
- INSS anual retido: R$ 4.545,84 (R$ 378,82 × 12)
- IR retido na fonte durante o ano: R$ 1.599,60 (R$ 133,30 × 12)
- Despesas médicas: R$ 2.500,00

### Passo 1: Renda Bruta Anual**

```text
Renda Bruta = R$ 4.000,00 × 13 meses = R$ 52.000,00
(O 13º salário tem tributação separada, mas por simplicidade usamos aqui o total)
```

> ⚠️ Na prática, o 13º salário tem sua própria tributação (calculada separadamente em dezembro), mas na declaração anual ele entra na soma total de rendimentos.

### Passo 2: Total de Deduções Legais**

```text
INSS:                 R$ 4.545,84
1 dependente:         R$ 2.275,08
Despesas médicas:     R$ 2.500,00
Total Deduções:       R$ 9.320,92
```

### Passo 3: Base de Cálculo Anual**

```text
Base de Cálculo = R$ 52.000,00 − R$ 9.320,92 = R$ 42.679,08
```

### Passo 4: Verificar desconto simplificado vs. completo**

```text
Desconto Simplificado = 20% × R$ 52.000,00 = R$ 10.400,00
Deduções Legais       = R$ 9.320,92

Como R$ 10.400,00 > R$ 9.320,92 → USAR SIMPLIFICADO é melhor!
Base de Cálculo (simplificado) = R$ 52.000,00 − R$ 10.400,00 = R$ 41.600,00
```

### Passo 5: Calcular IR Anual Devido (com simplificado)**

```text
R$ 41.600,00 está na Faixa 3 (R$ 33.919,81 a R$ 45.012,60)
Alíquota = 15% | Parcela a Deduzir = R$ 4.382,38

IR Anual Devido = R$ 41.600,00 × 15% − R$ 4.382,38
IR Anual Devido = R$ 6.240,00 − R$ 4.382,38
IR Anual Devido = R$ 1.857,62
```

### Passo 6: Calcular o Saldo**

```text
IR Retido na Fonte (pago no ano): R$ 1.599,60

Saldo = R$ 1.857,62 − R$ 1.599,60 = R$ 258,02

Resultado: IMPOSTO A PAGAR de R$ 258,02
```

---

### Exemplo 7 — Contribuinte com Restituição

**Dados:**

- Salário: R$ 3.500,00/mês × 13 meses = R$ 45.500,00
- IR retido na fonte no ano: R$ 2.400,00
- INSS anual: R$ 3.825,84
- 2 dependentes
- Despesas médicas: R$ 8.000,00

**Base de Cálculo (deduções legais):**

```text
INSS:                R$ 3.825,84
2 dependentes:       R$ 4.550,16
Despesas médicas:    R$ 8.000,00
Total deduções:      R$ 16.376,00

Base de Cálculo = R$ 45.500,00 − R$ 16.376,00 = R$ 29.124,00
```

**Verificar simplificado:**

```text
Desconto Simplificado = 20% × R$ 45.500,00 = R$ 9.100,00
Deduções Legais = R$ 16.376,00

Como R$ 16.376,00 > R$ 9.100,00 → USAR DEDUÇÕES LEGAIS (modelo completo)
```

**IR Anual Devido:**

```text
R$ 29.124,00 está na Faixa 2 (R$ 24.511,93 a R$ 33.919,80)
Alíquota = 7,5% | Parcela a Deduzir = R$ 1.838,39

IR Anual Devido = R$ 29.124,00 × 7,5% − R$ 1.838,39
IR Anual Devido = R$ 2.184,30 − R$ 1.838,39
IR Anual Devido = R$ 345,91
```

**Saldo:**

```text
IR Retido na Fonte: R$ 2.400,00

Saldo = R$ 345,91 − R$ 2.400,00 = −R$ 2.054,09

Resultado: RESTITUIÇÃO de R$ 2.054,09 🎉
```

---

## 9. Alíquota Efetiva vs. Alíquota Nominal

Um conceito importante que aparece bastante:

- **Alíquota Nominal (Marginal):** A alíquota da última faixa que a renda atingiu (27,5%, por exemplo).
- **Alíquota Efetiva:** O percentual real que você pagou sobre toda a sua renda.

### Fórmula da Alíquota Efetiva

```text
Alíquota Efetiva = (IR Devido / Renda Bruta) × 100
```

### Exemplo

Renda bruta: R$ 8.000,00 | IR calculado: R$ 1.304,00

```text
Alíquota Nominal: 27,5% (faixa atingida)
Alíquota Efetiva: (R$ 1.304,00 / R$ 8.000,00) × 100 = 16,3%
```

> Ou seja, mesmo estando na faixa de 27,5%, você efetivamente pagou apenas **16,3%** de IR sobre seu salário total, porque as faixas inferiores foram tributadas com alíquotas menores. Isso é fundamental para entender como a progressividade funciona.

---

## 10. Quadro-Resumo das Fórmulas para Programar

Esta seção é o "mapa" para você implementar a lógica no seu programa.

### 10.1 Lógica de Seleção de Faixa

```text
FUNÇÃO encontrarFaixa(baseDeCalculo):
  SE baseDeCalculo <= 2259.20:
    RETORNAR { aliquota: 0.00, parcelaADeduzir: 0.00 }
  SENÃO SE baseDeCalculo <= 2826.65:
    RETORNAR { aliquota: 0.075, parcelaADeduzir: 169.44 }
  SENÃO SE baseDeCalculo <= 3751.05:
    RETORNAR { aliquota: 0.15, parcelaADeduzir: 381.44 }
  SENÃO SE baseDeCalculo <= 4664.68:
    RETORNAR { aliquota: 0.225, parcelaADeduzir: 662.77 }
  SENÃO:
    RETORNAR { aliquota: 0.275, parcelaADeduzir: 896.00 }
```

### 10.2 Cálculo do INSS (Progressivo por Faixas)

```text
FUNÇÃO calcularINSS(salarioBruto):
  inss = 0

  // Faixa 1: até R$ 1.412,00 → 7,5%
  SE salarioBruto > 0:
    base1 = MIN(salarioBruto, 1412.00)
    inss += base1 × 0.075

  // Faixa 2: R$ 1.412,01 a R$ 2.666,68 → 9%
  SE salarioBruto > 1412.00:
    base2 = MIN(salarioBruto, 2666.68) − 1412.00
    inss += base2 × 0.09

  // Faixa 3: R$ 2.666,69 a R$ 4.000,03 → 12%
  SE salarioBruto > 2666.68:
    base3 = MIN(salarioBruto, 4000.03) − 2666.68
    inss += base3 × 0.12

  // Faixa 4: R$ 4.000,04 a R$ 7.786,02 → 14%
  SE salarioBruto > 4000.03:
    base4 = MIN(salarioBruto, 7786.02) − 4000.03
    inss += base4 × 0.14

  // Acima do teto do INSS: não há mais desconto
  RETORNAR inss
```

### 10.3 Cálculo do IR Mensal Completo

```text
FUNÇÃO calcularIRMensal(salarioBruto, numDependentes, pensaoAlimenticia):
  // 1. Calcular INSS
  inss = calcularINSS(salarioBruto)

  // 2. Calcular deduções
  deducaoDependentes = numDependentes × 189.59
  totalDeducoes = inss + deducaoDependentes + pensaoAlimenticia

  // 3. Base de Cálculo
  baseCalculo = salarioBruto − totalDeducoes
  SE baseCalculo < 0: baseCalculo = 0

  // 4. Encontrar faixa
  { aliquota, parcelaADeduzir } = encontrarFaixa(baseCalculo)

  // 5. Calcular IR
  ir = (baseCalculo × aliquota) − parcelaADeduzir
  SE ir < 0: ir = 0

  // 6. Retornar todos os valores
  RETORNAR {
    salarioBruto,
    inss,
    baseCalculo,
    aliquota,
    ir,
    salarioLiquido: salarioBruto − inss − ir
  }
```

### 10.4 Cálculo Anual (Saldo da Declaração)

```text
FUNÇÃO calcularIRAjusteAnual(
  rendaBrutaAnual,
  inssAnual,
  numDependentes,
  despesasMedicas,
  despesasEducacao,
  pensaoAlimenticia,
  irRetidoNaFonte
):
  // 1. Calcular deduções legais
  deducaoDependentes = numDependentes × 2275.08
  deducaoEducacao = MIN(despesasEducacao, 3561.50 × (1 + numDependentes))
  totalDeducoesLegais = inssAnual + deducaoDependentes
                      + despesasMedicas + deducaoEducacao
                      + pensaoAlimenticia

  // 2. Calcular desconto simplificado
  descontoSimplificado = MIN(rendaBrutaAnual × 0.20, 16754.34)

  // 3. Escolher o maior entre os dois (mais benéfico ao contribuinte)
  SE totalDeducoesLegais >= descontoSimplificado:
    baseCalculo = rendaBrutaAnual − totalDeducoesLegais
    modelo = "COMPLETO"
  SENÃO:
    baseCalculo = rendaBrutaAnual − descontoSimplificado
    modelo = "SIMPLIFICADO"

  SE baseCalculo < 0: baseCalculo = 0

  // 4. Aplicar tabela anual
  { aliquota, parcelaADeduzir } = encontrarFaixaAnual(baseCalculo)
  irDevido = (baseCalculo × aliquota) − parcelaADeduzir
  SE irDevido < 0: irDevido = 0

  // 5. Calcular saldo
  saldo = irDevido − irRetidoNaFonte

  RETORNAR {
    rendaBrutaAnual,
    baseCalculo,
    modelo,
    irDevido,
    irRetidoNaFonte,
    saldo,
    situacao: SE saldo > 0 ENTÃO "IMPOSTO A PAGAR" SENÃO "RESTITUIÇÃO"
  }
```

### 10.5 Tabela Anual (para a função `encontrarFaixaAnual`)

```text
FUNÇÃO encontrarFaixaAnual(baseDeCalculo):
  SE baseDeCalculo <= 24511.92:
    RETORNAR { aliquota: 0.00, parcelaADeduzir: 0.00 }
  SENÃO SE baseDeCalculo <= 33919.80:
    RETORNAR { aliquota: 0.075, parcelaADeduzir: 1838.39 }
  SENÃO SE baseDeCalculo <= 45012.60:
    RETORNAR { aliquota: 0.15, parcelaADeduzir: 4382.38 }
  SENÃO SE baseDeCalculo <= 55976.16:
    RETORNAR { aliquota: 0.225, parcelaADeduzir: 7758.32 }
  SENÃO:
    RETORNAR { aliquota: 0.275, parcelaADeduzir: 10557.13 }
```

---

## 11. Erros Comuns e Pegadinhas

### ❌ Erro 1 — Aplicar a alíquota sobre o salário bruto sem deduzir o INSS

```text
ERRADO:  IR = R$ 4.000,00 × 15% − R$ 381,44 = R$ 218,56
CORRETO: Primeiro calcula INSS, depois aplica IR sobre (salário − INSS − dependentes)
```

### ❌ Erro 2 — Achar que a alíquota mais alta se aplica ao salário todo

```text
ERRADO:  "Ganho R$ 6.000,00, então pago 27,5% de IR = R$ 1.650,00"
CORRETO: O IR considera as faixas progressivamente.
         Com INSS e dependentes, o IR real pode ser bem menor.
```

### ❌ Erro 3 — Esquecer que IR negativo não existe

```text
Se (baseCalculo × aliquota) − parcelaADeduzir < 0 → IR = 0
Isso pode acontecer quando a base de cálculo é muito baixa.
```

### ❌ Erro 4 — Confundir IR Retido com IR Devido na declaração anual

```text
IR Retido = o que já foi descontado na sua folha ao longo do ano
IR Devido  = o que você realmente deveria ter pago
Saldo = Devido − Retido (positivo = paga mais, negativo = recebe de volta)
```

### ❌ Erro 5 — Não considerar o 13º salário separadamente

```text
Na prática contábil, o 13º salário tem tributação própria calculada em dezembro.
Para uma calculadora simplificada, inclua-o na renda anual total.
Para uma calculadora avançada, calcule separadamente.
```

### ⚠️ Atenção — Arredondamento

Os valores de IR são normalmente arredondados para **2 casas decimais**. Em programação, cuidado com erros de ponto flutuante. Use `Math.round(valor * 100) / 100` em JavaScript ou `round(valor, 2)` em Python.

---

## 12. Referências Oficiais

| Fonte | Conteúdo |
 | --- | --- |
| [Receita Federal](https://www.gov.br/receitafederal) | Tabelas oficiais, declaração, legislação |
| [Portal e-CAC](https://cav.receita.fazenda.gov.br) | Área do contribuinte, extrato do IR |
| [Programa IRPF](https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/download/pgd/dirpf) | Programa oficial para declaração |
| Instrução Normativa RFB nº 2.178/2024 | Regras para declaração 2024 |

---

## Glossário Rápido

| Termo | Definição Curta |
 | --- | --- |
| **Alíquota** | O % do imposto (7,5%, 15%, 22,5%, 27,5%) |
| **Base de Cálculo** | Renda − Deduções. Sobre o que o IR incide |
| **Carnê-Leão** | Recolhimento mensal para quem não tem empregador |
| **DARF** | Documento de Arrecadação de Receitas Federais (boleto do IR) |
| **DIRPF** | Declaração do Imposto de Renda da Pessoa Física |
| **INSS** | Instituto Nacional do Seguro Social (previdência) |
| **IR Retido na Fonte** | IR descontado diretamente na folha pelo empregador |
| **Parcela a Deduzir** | Valor fixo que simplifica o cálculo progressivo |
| **PGBL** | Plano Gerador de Benefício Livre (previdência dedutível) |
| **Rendimentos Tributáveis** | Rendimentos que entram no cálculo do IR |
| **Restituição** | Devolução do IR pago a mais |
| **VGBL** | Vida Gerador de Benefício Livre (previdência não dedutível no IR) |

---

> 📝 **Este guia cobre o IRPF para assalariados e situações comuns. Casos especiais (autônomos com CNPJ, investimentos, aluguéis, heranças, ganho de capital) possuem regras adicionais não abordadas aqui.**
> *Última atualização: Tabelas 2024 — Ano-Calendário 2023/2024*
//aaaaa