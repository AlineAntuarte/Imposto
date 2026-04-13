# 📊 Guia Completo de Cálculo de Imposto de Renda (IRPF)

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

Pessoa física residente no Brasil que, no ano anterior, recebeu rendimentos tributáveis acima do limite de isenção. Para a declaração do exercício 2026 (ano-calendário 2025), esse limite é **R$ 33.888,00 no ano** (equivalente a R$ 2.824,00/mês — aproximadamente dois salários mínimos).

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

### 3.1 Tabela Mensal Vigente (a partir de maio/2025 — Lei nº 15.191/2025)

Esta é a tabela atual, válida para os anos-calendário 2025 e 2026.

| Faixa | Renda Mensal (Base de Cálculo) | Alíquota | Parcela a Deduzir |
| --- | --- | --- | --- |
| 1ª | Até R$ 2.428,80 | **0%** (isento) | R$ 0,00 |
| 2ª | De R$ 2.428,81 até R$ 2.826,65 | **7,5%** | R$ 182,16 |
| 3ª | De R$ 2.826,66 até R$ 3.751,05 | **15%** | R$ 394,16 |
| 4ª | De R$ 3.751,06 até R$ 4.664,68 | **22,5%** | R$ 675,49 |
| 5ª | Acima de R$ 4.664,68 | **27,5%** | R$ 908,73 |

Outros valores de referência:

- **Dedução mensal por dependente:** R$ 189,59
- **Desconto simplificado mensal:** R$ 607,20

> 📌 **Contexto histórico:** De janeiro a abril de 2025, a faixa de isenção era R$ 2.259,20 (a mesma de 2024). A Lei nº 15.191/2025 atualizou o limite para R$ 2.428,80 a partir de maio de 2025, acompanhando o reajuste do salário mínimo para R$ 1.518,00.
>
> ⚠️ **Novidade em 2026 (Lei nº 15.270/2025):** A partir de janeiro de 2026, foi instituído um **redutor adicional** de até R$ 312,89 para quem recebe até R$ 5.000,00/mês. Na prática, quem ganha até R$ 5.000,00 fica isento de IR. Para rendas entre R$ 5.000,01 e R$ 7.350,00, o redutor é aplicado de forma proporcional. Acima de R$ 7.350,00, a tabela progressiva normal se aplica sem redutor. A tabela progressiva base — as faixas acima — **não foi alterada**: o redutor é um cálculo adicional que se aplica ao imposto já calculado.

### 3.2 Por que a "Parcela a Deduzir" funciona?

Imagine uma renda de **R$ 3.000,00**.

**Método longo (faixa a faixa):**

```text
Faixa 1: R$ 2.428,80 × 0%       = R$   0,00
Faixa 2: R$   397,85 × 7,5%     = R$  29,84
          (R$ 2.826,65 - R$ 2.428,80 = R$ 397,85)
Faixa 3: R$   173,35 × 15%      = R$  26,00
          (R$ 3.000,00 - R$ 2.826,65 = R$ 173,35)
Total IR = R$ 0,00 + R$ 29,84 + R$ 26,00 = R$ 55,84
```

**Método curto (com parcela a deduzir):**

```text
Alíquota da faixa atingida: 15% (Faixa 3)
IR = R$ 3.000,00 × 15% − R$ 394,16
IR = R$ 450,00 − R$ 394,16
IR = R$ 55,84  ✅ Mesmo resultado!
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

### Exemplo 1 — Salário R$ 2.000,00 (sem deduções)

```text
Base de Cálculo = R$ 2.000,00

Verificando a tabela: R$ 2.000,00 está na Faixa 1 (até R$ 2.428,80)
Alíquota = 0% | Parcela a Deduzir = R$ 0,00

IR = R$ 2.000,00 × 0% − R$ 0,00 = R$ 0,00

Resultado: ISENTO ✅
```

### Exemplo 2 — Salário R$ 3.500,00 (sem deduções)

```text
Base de Cálculo = R$ 3.500,00

Verificando a tabela: R$ 3.500,00 está na Faixa 3 (R$ 2.826,66 a R$ 3.751,05)
Alíquota = 15% | Parcela a Deduzir = R$ 394,16

IR = R$ 3.500,00 × 15% − R$ 394,16
IR = R$ 525,00 − R$ 394,16
IR = R$ 130,84

Resultado: R$ 130,84 de IR descontado na folha
```

### Exemplo 3 — Salário R$ 8.000,00 (sem deduções)

```text
Base de Cálculo = R$ 8.000,00

Verificando a tabela: R$ 8.000,00 está na Faixa 5 (acima de R$ 4.664,68)
Alíquota = 27,5% | Parcela a Deduzir = R$ 908,73

IR = R$ 8.000,00 × 27,5% − R$ 908,73
IR = R$ 2.200,00 − R$ 908,73
IR = R$ 1.291,27

Resultado: R$ 1.291,27 de IR descontado na folha
```

---

## 5. Deduções Permitidas

As deduções **reduzem a Base de Cálculo**, diminuindo o IR. As principais são:

### 5.1 Dedução por Dependente

A cada dependente (filho, cônjuge sem renda, etc.) o contribuinte pode deduzir um valor fixo por mês.

- **Valor mensal (2025/2026): R$ 189,59 por dependente**

> Dependentes aceitos pela Receita Federal: filhos e enteados até 21 anos (ou 24 se em curso superior/técnico), cônjuge, pais/avós sem renda própria, entre outros.

### 5.2 Dedução do INSS

A contribuição ao **INSS (Previdência Social)** é integralmente dedutível.

O INSS é calculado sobre o salário bruto com alíquotas progressivas próprias. Tabela vigente para 2026 (salário mínimo R$ 1.621,00 e teto R$ 8.475,55):

| Faixa Salarial INSS | Alíquota |
| --- | --- |
| Até R$ 1.621,00 | 7,5% |
| De R$ 1.621,01 até R$ 2.902,84 | 9% |
| De R$ 2.902,85 até R$ 4.354,28 | 12% |
| De R$ 4.354,29 até R$ 8.475,55 | 14% |

> O INSS também é progressivo por faixas! Funciona igual ao IR: aplica cada alíquota sobre a parte da faixa correspondente. Acima do teto (R$ 8.475,55), não há mais desconto de INSS.

**Cálculo de INSS para salário de R$ 3.500,00 (tabela 2026):**

```text
Faixa 1: R$ 1.621,00 × 7,5%                        = R$ 121,57
Faixa 2: (R$ 2.902,84 - R$ 1.621,00) × 9%          = R$ 115,37
          R$ 1.281,84 × 9%                          = R$ 115,37
Faixa 3: (R$ 3.500,00 - R$ 2.902,84) × 12%         = R$  71,66
          R$ 597,16 × 12%                           = R$  71,66

INSS Total = R$ 121,57 + R$ 115,37 + R$ 71,66 = R$ 308,60
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

### Exemplo 4 — Salário R$ 4.000,00, 1 Dependente (INSS + IR)

#### Exemplo 4 — Passo 1: Calcular o INSS

```text
Faixa 1: R$ 1.621,00 × 7,5%                        = R$ 121,57
Faixa 2: (R$ 2.902,84 - R$ 1.621,00) × 9%          = R$ 115,37
Faixa 3: (R$ 4.000,00 - R$ 2.902,84) × 12%         = R$ 131,66
          R$ 1.097,16 × 12%                         = R$ 131,66

INSS = R$ 121,57 + R$ 115,37 + R$ 131,66 = R$ 368,60
```

#### Exemplo 4 — Passo 2: Calcular as Deduções

```text
Dedução INSS:        R$ 368,60
Dedução dependente:  R$ 189,59 (1 dependente)
Total Deduções:      R$ 558,19
```

#### Exemplo 4 — Passo 3: Calcular a Base de Cálculo

```text
Base de Cálculo = R$ 4.000,00 − R$ 558,19 = R$ 3.441,81
```

#### Exemplo 4 — Passo 4: Aplicar a Tabela do IR

```text
R$ 3.441,81 está na Faixa 3 (R$ 2.826,66 a R$ 3.751,05)
Alíquota = 15% | Parcela a Deduzir = R$ 394,16

IR = R$ 3.441,81 × 15% − R$ 394,16
IR = R$ 516,27 − R$ 394,16
IR = R$ 122,11
```

**Resumo do Exemplo 4:**

```text
Salário Bruto:     R$ 4.000,00
(−) INSS:         −R$   368,60
(−) IR:           −R$   122,11
                  ──────────────
Salário Líquido:   R$ 3.509,29
```

---

### Exemplo 5 — Salário R$ 6.000,00, 2 Dependentes (INSS + IR)

#### Exemplo 5 — Passo 1: Calcular o INSS

```text
Faixa 1: R$ 1.621,00 × 7,5%                        = R$ 121,57
Faixa 2: (R$ 2.902,84 - R$ 1.621,00) × 9%          = R$ 115,37
Faixa 3: (R$ 4.354,28 - R$ 2.902,84) × 12%         = R$ 174,17
          R$ 1.451,44 × 12%                         = R$ 174,17
Faixa 4: (R$ 6.000,00 - R$ 4.354,28) × 14%         = R$ 230,40
          R$ 1.645,72 × 14%                         = R$ 230,40

INSS = R$ 121,57 + R$ 115,37 + R$ 174,17 + R$ 230,40 = R$ 641,51
```

#### Exemplo 5 — Passo 2: Calcular as Deduções

```text
Dedução INSS:           R$ 641,51
Dedução 2 dependentes:  R$ 379,18 (2 × R$ 189,59)
Total Deduções:         R$ 1.020,69
```

#### Exemplo 5 — Passo 3: Calcular a Base de Cálculo

```text
Base de Cálculo = R$ 6.000,00 − R$ 1.020,69 = R$ 4.979,31
```

#### Exemplo 5 — Passo 4: Aplicar a Tabela do IR

```text
R$ 4.979,31 está na Faixa 5 (acima de R$ 4.664,68)
Alíquota = 27,5% | Parcela a Deduzir = R$ 908,73

IR = R$ 4.979,31 × 27,5% − R$ 908,73
IR = R$ 1.369,31 − R$ 908,73
IR = R$ 460,58
```

**Resumo do Exemplo 5:**

```text
Salário Bruto:     R$ 6.000,00
(−) INSS:         −R$   641,51
(−) IR:           −R$   460,58
                  ──────────────
Salário Líquido:   R$ 4.897,91
```

---

## 7. Tabela Anual e Declaração do IRPF

A **Declaração Anual** consolida todos os rendimentos e pagamentos do ano anterior e verifica se você pagou exatamente o IR que devia.

### 7.1 Tabela Anual — Exercício 2026 (Ano-Calendário 2025)

Esta é a tabela para a **declaração aberta de março a maio de 2026**.

| Faixa | Renda Anual (Base de Cálculo) | Alíquota | Parcela a Deduzir |
| --- | --- | --- | --- |
| 1ª | Até R$ 28.467,20 | 0% | R$ 0,00 |
| 2ª | De R$ 28.467,21 até R$ 33.919,80 | 7,5% | R$ 2.135,04 |
| 3ª | De R$ 33.919,81 até R$ 45.012,60 | 15% | R$ 4.679,03 |
| 4ª | De R$ 45.012,61 até R$ 55.976,16 | 22,5% | R$ 8.054,97 |
| 5ª | Acima de R$ 55.976,16 | 27,5% | R$ 10.853,78 |

> 📌 A tabela anual é derivada da tabela mensal ponderada pelos dois períodos de 2025 (jan–abr e mai–dez). Por isso o cálculo funciona da mesma forma — mesmas alíquotas, mesma lógica de parcela a deduzir, mas com os limiares anualizados.

### 7.2 Deduções Anuais (Exercício 2026 — Ano-Calendário 2025)

| Dedução | Valor |
| --- | --- |
| Por dependente | R$ 2.275,08/ano (R$ 189,59 × 12) |
| INSS pago no ano | Valor total descontado em folha |
| Despesas médicas | 100% dedutíveis (sem limite) |
| Educação própria ou dependente | Até R$ 3.561,50/ano por pessoa |
| Pensão alimentícia judicial | 100% dedutível |
| PGBL (previdência privada) | Até 12% da renda bruta |

### 7.3 Desconto Simplificado Anual

Em vez de guardar todos os comprovantes e fazer deduções legais, o contribuinte pode optar pelo **Desconto Simplificado**: deduz-se automaticamente **20% da renda bruta**, com **teto de R$ 16.754,34** para o exercício 2026.

> Use o desconto simplificado se suas deduções reais forem menores que 20% da renda. Caso contrário, use o **modelo completo (deduções legais)**.

---

## 8. Cálculo Anual — Imposto a Pagar ou a Restituir

### Fórmula Anual

```text
IR Anual Devido = (Base de Cálculo Anual × Alíquota) − Parcela a Deduzir

Saldo = IR Anual Devido − IR Retido na Fonte (total pago ao longo do ano)

Se Saldo > 0 → Imposto a PAGAR
Se Saldo < 0 → RESTITUIÇÃO (a Receita te devolve)
Se Saldo = 0 → Zerado (pagou exatamente o certo)
```

### Exemplo 6 — Declaração Anual com Restituição

**Dados do contribuinte:**

- Salário: R$ 5.000,00/mês × 12 meses = R$ 60.000,00 no ano
- INSS anual retido: R$ 6.115,08 (R$ 509,59/mês × 12 — cálculo com tabela 2025)
- IR retido na fonte durante o ano: R$ 3.600,00 (estimado pelo empregador)
- 0 dependentes, sem outras deduções

#### Exemplo 6 — Passo 1: Comparar Simplificado × Completo

```text
Deduções legais:
  INSS anual:         R$ 6.115,08
  Total Deduções:     R$ 6.115,08

Desconto Simplificado = 20% × R$ 60.000,00 = R$ 12.000,00
Teto do simplificado = R$ 16.754,34 (não atingido — ok)

Como R$ 12.000,00 > R$ 6.115,08 → USAR SIMPLIFICADO (mais vantajoso)
Base de Cálculo = R$ 60.000,00 - R$ 12.000,00 = R$ 48.000,00
```

#### Exemplo 6 — Passo 2: Calcular IR Anual Devido

```text
R$ 48.000,00 está na Faixa 4 (R$ 45.012,61 até R$ 55.976,16)
Alíquota = 22,5% | Parcela a Deduzir = R$ 8.054,97

IR Anual Devido = R$ 48.000,00 × 22,5% − R$ 8.054,97
IR Anual Devido = R$ 10.800,00 − R$ 8.054,97
IR Anual Devido = R$ 2.745,03
```

#### Exemplo 6 — Passo 3: Calcular o Saldo

```text
IR Retido na Fonte (pago no ano): R$ 3.600,00

Saldo = R$ 2.745,03 − R$ 3.600,00 = −R$ 854,97

Resultado: RESTITUIÇÃO de R$ 854,97 🎉
```

---

### Exemplo 7 — Declaração Anual com Imposto a Pagar

**Dados do contribuinte:**

- Salário: R$ 8.000,00/mês × 12 meses = R$ 96.000,00 no ano
- INSS anual retido: R$ 11.154,36 (R$ 929,53/mês × 12 — tabela 2025)
- IR retido na fonte durante o ano: R$ 9.000,00
- 0 dependentes, sem outras deduções

#### Exemplo 7 — Passo 1: Comparar Simplificado × Completo

```text
Deduções legais:
  INSS anual:         R$ 11.154,36
  Total Deduções:     R$ 11.154,36

Desconto Simplificado = 20% × R$ 96.000,00 = R$ 19.200,00
Mas o teto é R$ 16.754,34 → usar o teto
Desconto efetivo = R$ 16.754,34

Como R$ 16.754,34 > R$ 11.154,36 → USAR SIMPLIFICADO (com teto)
Base de Cálculo = R$ 96.000,00 - R$ 16.754,34 = R$ 79.245,66
```

#### Exemplo 7 — Passo 2: Calcular IR Anual Devido

```text
R$ 79.245,66 está na Faixa 5 (acima de R$ 55.976,16)
Alíquota = 27,5% | Parcela a Deduzir = R$ 10.853,78

IR Anual Devido = R$ 79.245,66 × 27,5% − R$ 10.853,78
IR Anual Devido = R$ 21.792,56 − R$ 10.853,78
IR Anual Devido = R$ 10.938,78
```

#### Exemplo 7 — Passo 3: Calcular o Saldo

```text
IR Retido na Fonte (pago no ano): R$ 9.000,00

Saldo = R$ 10.938,78 − R$ 9.000,00 = +R$ 1.938,78

Resultado: IMPOSTO A PAGAR de R$ 1.938,78
```

> O empregador estimou o IR mensal a menor durante o ano. Na declaração, a diferença deve ser paga.

---

## 9. Alíquota Efetiva vs. Alíquota Nominal

Um conceito importante que aparece bastante:

- **Alíquota Nominal (Marginal):** A alíquota da última faixa que a renda atingiu (27,5%, por exemplo).
- **Alíquota Efetiva:** O percentual real que você pagou sobre toda a sua renda.

### Fórmula da Alíquota Efetiva

```text
Alíquota Efetiva = (IR Devido / Renda Bruta) × 100
```

### Exemplo de Comparação Nominal × Efetiva

Renda bruta: R$ 8.000,00 | IR calculado sem deduções: R$ 1.291,27

```text
Alíquota Nominal: 27,5% (faixa atingida)
Alíquota Efetiva: (R$ 1.291,27 / R$ 8.000,00) × 100 = 16,14%
```

> Ou seja, mesmo estando na faixa de 27,5%, você efetivamente pagou apenas **16,14%** de IR sobre seu salário total, porque as faixas inferiores foram tributadas com alíquotas menores. Isso é fundamental para entender como a progressividade funciona.

---

## 10. Quadro-Resumo das Fórmulas para Programar

Esta seção é o "mapa" para você implementar a lógica no seu programa.

### 10.1 Seleção de Faixa — Tabela Mensal Atual

```text
FUNÇÃO encontrarFaixaMensal(baseDeCalculo):
  SE baseDeCalculo <= 2428.80:
    RETORNAR { aliquota: 0.00, parcelaADeduzir: 0.00 }
  SENÃO SE baseDeCalculo <= 2826.65:
    RETORNAR { aliquota: 0.075, parcelaADeduzir: 182.16 }
  SENÃO SE baseDeCalculo <= 3751.05:
    RETORNAR { aliquota: 0.15, parcelaADeduzir: 394.16 }
  SENÃO SE baseDeCalculo <= 4664.68:
    RETORNAR { aliquota: 0.225, parcelaADeduzir: 675.49 }
  SENÃO:
    RETORNAR { aliquota: 0.275, parcelaADeduzir: 908.73 }
```

### 10.2 Cálculo do INSS 2026 (Progressivo por Faixas)

```text
FUNÇÃO calcularINSS(salarioBruto):
  inss = 0

  // Faixa 1: até R$ 1.621,00 → 7,5%
  SE salarioBruto > 0:
    base1 = MIN(salarioBruto, 1621.00)
    inss += base1 × 0.075

  // Faixa 2: R$ 1.621,01 a R$ 2.902,84 → 9%
  SE salarioBruto > 1621.00:
    base2 = MIN(salarioBruto, 2902.84) − 1621.00
    inss += base2 × 0.09

  // Faixa 3: R$ 2.902,85 a R$ 4.354,28 → 12%
  SE salarioBruto > 2902.84:
    base3 = MIN(salarioBruto, 4354.28) − 2902.84
    inss += base3 × 0.12

  // Faixa 4: R$ 4.354,29 a R$ 8.475,55 → 14%
  SE salarioBruto > 4354.28:
    base4 = MIN(salarioBruto, 8475.55) − 4354.28
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
  { aliquota, parcelaADeduzir } = encontrarFaixaMensal(baseCalculo)

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

  // 2. Calcular desconto simplificado (com teto)
  descontoSimplificado = MIN(rendaBrutaAnual × 0.20, 16754.34)

  // 3. Escolher o maior entre os dois (mais benéfico ao contribuinte)
  SE totalDeducoesLegais >= descontoSimplificado:
    baseCalculo = rendaBrutaAnual − totalDeducoesLegais
    modelo = "COMPLETO"
  SENÃO:
    baseCalculo = rendaBrutaAnual − descontoSimplificado
    modelo = "SIMPLIFICADO"

  SE baseCalculo < 0: baseCalculo = 0

  // 4. Aplicar tabela anual (exercício 2026, ano-calendário 2025)
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

### 10.5 Seleção de Faixa — Tabela Anual Exercício 2026

```text
FUNÇÃO encontrarFaixaAnual(baseDeCalculo):
  SE baseDeCalculo <= 28467.20:
    RETORNAR { aliquota: 0.00, parcelaADeduzir: 0.00 }
  SENÃO SE baseDeCalculo <= 33919.80:
    RETORNAR { aliquota: 0.075, parcelaADeduzir: 2135.04 }
  SENÃO SE baseDeCalculo <= 45012.60:
    RETORNAR { aliquota: 0.15, parcelaADeduzir: 4679.03 }
  SENÃO SE baseDeCalculo <= 55976.16:
    RETORNAR { aliquota: 0.225, parcelaADeduzir: 8054.97 }
  SENÃO:
    RETORNAR { aliquota: 0.275, parcelaADeduzir: 10853.78 }
```

### 10.6 Redutor 2026 (Calculadora Avançada)

A partir de janeiro de 2026, após calcular o IR com a tabela progressiva, aplica-se um redutor para rendas até R$ 7.350,00:

```text
FUNÇÃO aplicarRedutorIR2026(salarioBruto, irCalculado):
  // O redutor usa o SALÁRIO BRUTO, não a base de cálculo

  SE salarioBruto <= 5000.00:
    // Isenção total: redutor cobre todo o IR
    RETORNAR 0.00

  SENÃO SE salarioBruto <= 7350.00:
    // Redutor parcial e decrescente
    redutor = 978.62 − (salarioBruto × 0.133145)
    irFinal = irCalculado − redutor
    SE irFinal < 0: irFinal = 0
    RETORNAR irFinal

  SENÃO:
    // Acima de R$ 7.350,00: sem redutor, IR normal
    RETORNAR irCalculado
```

> Esta função deve ser chamada DEPOIS de calcular o IR pela tabela progressiva normal (função `calcularIRMensal`).

---

## 11. Erros Comuns e Pegadinhas

### ❌ Erro 1 — Aplicar a alíquota sobre o salário bruto sem deduzir o INSS

```text
ERRADO:  IR = R$ 4.000,00 × 15% − R$ 394,16 = R$ 205,84
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

### ❌ Erro 4 — Confundir IR Retido com IR Devido na declaração

```text
IR Retido = o que já foi descontado na sua folha ao longo do ano
IR Devido  = o que você realmente deveria ter pago
Saldo = Devido − Retido (positivo = paga mais, negativo = recebe de volta)
```

### ❌ Erro 5 — Não considerar o 13º salário

```text
Na prática contábil, o 13º salário tem tributação própria calculada em dezembro.
Para uma calculadora simplificada, inclua-o na renda anual total.
Para uma calculadora avançada, calcule separadamente.
```

### ⚠️ Atenção sobre Arredondamento

Os valores de IR são normalmente arredondados para **2 casas decimais**. Em programação, cuidado com erros de ponto flutuante. Use `Math.round(valor * 100) / 100` em JavaScript ou `round(valor, 2)` em Python.

---

## 12. Referências Oficiais

| Fonte | Conteúdo |
| --- | --- |
| [Receita Federal — Tabelas 2025](https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2025) | Tabela mensal e anual 2025 |
| [Receita Federal — Tabelas 2026](https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026) | Tabela 2026 com redutor |
| [Portal e-CAC](https://cav.receita.fazenda.gov.br) | Área do contribuinte, extrato do IR |
| [Programa IRPF 2026](https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/download/pgd/dirpf) | Programa oficial para declaração |
| Lei nº 15.191, de 11 de agosto de 2025 | Atualização da tabela mensal (mai/2025) |
| Lei nº 15.270, de 26 de novembro de 2025 | Isenção IR até R$ 5.000 (jan/2026) |
| Portaria Interministerial MPS/MF nº 13/2026 | Tabela INSS 2026 |

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
| **PGBL** | Plano Gerador de Benefício Livre (previdência dedutível no IR) |
| **Redutor 2026** | Desconto adicional para quem ganha até R$ 7.350,00/mês |
| **Rendimentos Tributáveis** | Rendimentos que entram no cálculo do IR |
| **Restituição** | Devolução do IR pago a mais |
| **VGBL** | Vida Gerador de Benefício Livre (previdência não dedutível no IR) |

---

> 📝 **Este guia cobre o IRPF para assalariados e situações comuns. Casos especiais (autônomos com CNPJ, investimentos, aluguéis, heranças, ganho de capital) possuem regras adicionais não abordadas aqui.**
---
>*Última atualização: Tabelas 2025/2026 — Fontes: Receita Federal (gov.br) e Portaria Interministerial MPS/MF nº 13/2026 — Consultadas em abril/2026*
