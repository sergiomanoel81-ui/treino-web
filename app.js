"use strict";

/* ---------- Constantes ---------- */
const PERFIS = [
  { id: "sergio", nome: "Sérgio", accent: "#4F8CFF" },
  { id: "clara", nome: "Clara", accent: "#3DDC97" },
];
const perfil = (id) => PERFIS.find((p) => p.id === id) || PERFIS[0];
const MULTI = false; // sem perfis: modelos ativáveis (1 ou 2)
const MAX_ATIVOS = 2;

const ESTILOS = {
  editorial: { nome: "Editorial", vibe: "tipografia grande, minimal", accent: "#4F8CFF", accentInk: "#06101A", bg: "#0C0D10" },
  dashboard: { nome: "Painel atlético", vibe: "anéis e métricas", accent: "#3DDC97", accentInk: "#06130C", bg: "#0E1116" },
  imersivo: { nome: "Imersivo", vibe: "foto em tela cheia", accent: "#FF6B5E", accentInk: "#2A0A06", bg: "#000000" },
  brutalista: { nome: "Neo-brutalista", vibe: "bordas grossas, blocos", accent: "#5B7CFA", accentInk: "#FFFFFF", bg: "#EDEBE4" },
};
const estilo = () => (ESTILOS[DB.settings.estilo] ? DB.settings.estilo : "editorial");
const estAccent = () => ESTILOS[estilo()].accent;
const PALETA = ["#4F8CFF", "#3DDC97", "#F0A93E", "#B57BFF", "#FF6B8A", "#4FD1E6", "#E5C04F", "#8B92A0"];

const IMG_PARES = {
  "Agachamento goblet ou frontal": "agachamento_goblet_ou_frontal.jpg",
  "Agachamento búlgaro com halteres": "agachamento_bulgaro_com_halteres.jpg",
  "Agachamento cossaco": "agachamento_cossaco.jpg",
  "Panturrilha unilateral": "panturrilha_unilateral.jpg",
  "Press Pallof (anti-rotação)": "press_pallof_anti_rotacao.jpg",
  "Supino com halteres (pegada neutra)": "supino_com_halteres_pegada_neutra.jpg",
  "Remada unilateral com halter (serrote)": "remada_unilateral_com_halter_serrote.jpg",
  "Remada baixa na polia": "remada_baixa_na_polia.jpg",
  "Puxada para o rosto (face pull)": "puxada_para_o_rosto_face_pull.jpg",
  "Rotação externa de ombro": "rotacao_externa_de_ombro.jpg",
  "Meio levantamento turco": "meio_levantamento_turco.jpg",
  "Terra romeno unilateral": "terra_romeno_unilateral.jpg",
  "Remada renegado": "remada_renegado.jpg",
  "Condicionamento (kettlebell swing)": "condicionamento_kettlebell_swing.jpg",
  "Levantamento terra romeno": "levantamento_terra_romeno.jpg",
  "Elevação pélvica (hip thrust)": "elevacao_pelvica_hip_thrust.jpg",
  "Afundo reverso com halteres": "afundo_reverso_com_halteres.jpg",
  "Mesa flexora": "mesa_flexora.jpg",
  "Prancha lateral": "prancha_lateral.jpg",
  "Barra fixa ou puxada (pegada neutra)": "barra_fixa_ou_puxada_pegada_neutra.jpg",
  "Flexão de braço (controle escapular)": "flexao_de_braco_controle_escapular.jpg",
  "Elevação lateral": "elevacao_lateral.jpg",
  "Supino reto com barra": "supino_reto_com_barra.jpg",
  "Remada curvada (barra)": "remada_curvada_barra.jpg",
  "Desenvolvimento com halteres": "desenvolvimento_com_halteres.jpg",
  "Puxada alta (pulldown)": "puxada_alta_pulldown.jpg",
  "Rosca direta": "rosca_direta.jpg",
  "Agachamento livre": "agachamento_livre.jpg",
  "Leg press": "leg_press.jpg",
  "Cadeira flexora (posterior)": "cadeira_flexora_posterior.jpg",
  "Cadeira extensora": "cadeira_extensora.jpg",
  "Panturrilha em pé": "panturrilha_em_pe.jpg",
  "Prancha frontal": "prancha_frontal.jpg",
  "Afundo (lunge) andando": "afundo_lunge_andando.jpg",
  "Barra fixa assistida / puxada neutra": "barra_fixa_assistida_puxada_neutra.jpg",
  "Supino inclinado com halteres": "supino_inclinado_com_halteres.jpg",
  "Remada baixa (cabo)": "remada_baixa_cabo.jpg",
  "Desenvolvimento na máquina": "desenvolvimento_na_maquina.jpg",
  "Face pull": "face_pull.jpg",
  "Tríceps na corda": "triceps_na_corda.jpg",
  "Rosca martelo": "rosca_martelo.jpg",
  "Terra romeno (ou barra hexagonal)": "terra_romeno_ou_barra_hexagonal.jpg",
  "Afundo com halteres": "afundo_com_halteres.jpg",
  "Panturrilha sentado": "panturrilha_sentado.jpg",
};
const norm = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
const IMG = {};
for (const k in IMG_PARES) IMG[norm(k)] = "img/exercicios/" + IMG_PARES[k];
// imgFor é definido depois do CATALOGO (usa foto do catálogo como fallback).

/* ---------- Catálogo de exercícios (grupo · foto · como fazer) ---------- */
const c = (nome, grupo, img, como) => ({ nome, grupo, img, como });
const CATALOGO = [
  // Peito
  c("Supino reto com barra", "Peito", "supino_reto_com_barra.jpg", "Deitado no banco, pés firmes no chão. Desça a barra até o peito controlando e empurre até estender os cotovelos, sem travar."),
  c("Supino inclinado com halteres", "Peito", "supino_inclinado_com_halteres.jpg", "Banco a 30–45°. Desça os halteres na linha do peito e empurre para cima aproximando-os de leve no topo."),
  c("Supino com halteres (pegada neutra)", "Peito", "supino_com_halteres_pegada_neutra.jpg", "Palmas viradas uma para a outra. Desça os halteres rente ao tronco e empurre. A pegada neutra poupa o ombro."),
  c("Supino na máquina", "Peito", "supino_na_maquina.jpg", "Ajuste o banco para as pegas ficarem na linha do peito. Empurre à frente sem arquear demais e volte controlando."),
  c("Flexão de braço (controle escapular)", "Peito", "flexao_de_braco_controle_escapular.jpg", "Corpo reto, mãos sob os ombros. Desça o peito ao chão mantendo as escápulas estáveis e empurre de volta."),
  // Costas
  c("Remada curvada (barra)", "Costas", "remada_curvada_barra.jpg", "Tronco inclinado ~45°, coluna neutra. Puxe a barra ao abdômen levando os cotovelos para trás e desça controlando."),
  c("Remada baixa (cabo)", "Costas", "remada_baixa_cabo.jpg", "Sentado, costas eretas. Puxe a pega ao abdômen juntando as escápulas; estenda os braços sem curvar as costas."),
  c("Remada baixa na polia", "Costas", "remada_baixa_na_polia.jpg", "Sentado, costas eretas. Puxe a pega ao abdômen juntando as escápulas; estenda os braços sem curvar as costas."),
  c("Remada unilateral com halter (serrote)", "Costas", "remada_unilateral_com_halter_serrote.jpg", "Apoie joelho e mão no banco. Puxe o halter ao quadril colando o cotovelo no corpo; desça alongando."),
  c("Puxada alta (pulldown)", "Costas", "puxada_alta_pulldown.jpg", "Puxe a barra até a parte alta do peito levando os cotovelos para baixo e para trás; suba controlando."),
  c("Barra fixa assistida / puxada neutra", "Costas", "barra_fixa_assistida_puxada_neutra.jpg", "Pegada neutra. Puxe o corpo até o queixo passar a barra (ou use a máquina assistida) e desça controlando."),
  c("Barra fixa ou puxada (pegada neutra)", "Costas", "barra_fixa_ou_puxada_pegada_neutra.jpg", "Pegada neutra. Puxe o corpo até o queixo passar a barra (ou use a puxada) e desça controlando."),
  // Ombro
  c("Desenvolvimento com halteres", "Ombro", "desenvolvimento_com_halteres.jpg", "Sentado, core firme. Empurre os halteres acima da cabeça sem arquear a lombar e desça até a linha das orelhas."),
  c("Desenvolvimento na máquina", "Ombro", "desenvolvimento_na_maquina.jpg", "Empurre as pegas acima da cabeça e volte controlando até a altura dos ombros."),
  c("Desenvolvimento na barra landmine", "Ombro", "desenvolvimento_landmine.jpg", "Barra apoiada no canto. Empurre a ponta para cima e à frente, um braço de cada vez — trajetória segura para o ombro."),
  c("Elevação lateral", "Ombro", "elevacao_lateral.jpg", "Cotovelos levemente flexionados. Suba os halteres até a linha dos ombros liderando pelos cotovelos; desça devagar."),
  c("Face pull", "Ombro", "face_pull.jpg", "Polia alta com corda. Puxe em direção ao rosto abrindo os cotovelos e girando os punhos para fora. Saúde do ombro."),
  c("Puxada para o rosto (face pull)", "Ombro", "puxada_para_o_rosto_face_pull.jpg", "Polia alta com corda. Puxe em direção ao rosto abrindo os cotovelos e girando os punhos para fora. Saúde do ombro."),
  c("Rotação externa de ombro", "Ombro", "rotacao_externa_de_ombro.jpg", "Cotovelo colado ao corpo a 90°. Gire o antebraço para fora contra o elástico/cabo e volte devagar. Fortalece o manguito."),
  // Braço
  c("Rosca direta", "Braço", "rosca_direta.jpg", "Cotovelos fixos ao lado do corpo. Suba a barra/halteres contraindo o bíceps e desça controlando."),
  c("Rosca martelo", "Braço", "rosca_martelo.jpg", "Pegada neutra (martelo). Suba os halteres sem balançar o corpo e desça devagar. Bíceps e antebraço."),
  c("Tríceps na corda", "Braço", "triceps_na_corda.jpg", "Cotovelos colados ao corpo. Estenda a corda para baixo abrindo as pontas no fim e volte controlando."),
  // Perna
  c("Agachamento livre", "Perna", "agachamento_livre.jpg", "Barra nas costas, pés na largura dos ombros. Desça empurrando o quadril para trás até as coxas paralelas e suba."),
  c("Agachamento goblet ou frontal", "Perna", "agachamento_goblet_ou_frontal.jpg", "Segure o peso à frente do peito. Agache com o tronco ereto até a profundidade confortável e suba."),
  c("Agachamento búlgaro com halteres", "Perna", "agachamento_bulgaro_com_halteres.jpg", "Pé de trás apoiado no banco. Desça o joelho da frente até ~90° e suba pelo calcanhar da frente."),
  c("Agachamento cossaco", "Perna", "agachamento_cossaco.jpg", "Pernas bem abertas. Desloque o peso para um lado flexionando esse joelho, a outra perna esticada. Mobilidade + força."),
  c("Leg press", "Perna", "leg_press.jpg", "Pés na plataforma na largura dos ombros. Desça até ~90° sem soltar a lombar do apoio e empurre sem travar os joelhos."),
  c("Cadeira extensora", "Perna", "cadeira_extensora.jpg", "Estenda os joelhos até quase esticar, segure 1s no topo e volte controlando."),
  c("Afundo (lunge) andando", "Perna", "afundo_lunge_andando.jpg", "Dê um passo à frente descendo o joelho de trás até perto do chão; alterne as pernas avançando."),
  c("Afundo com halteres", "Perna", "afundo_com_halteres.jpg", "Com halteres ao lado do corpo, dê um passo e desça o joelho de trás; suba e alterne."),
  c("Afundo reverso com halteres", "Perna", "afundo_reverso_com_halteres.jpg", "Dê o passo para trás descendo o joelho; suba empurrando pelo calcanhar da frente. Mais amigável ao joelho."),
  c("Step-up com impulso", "Perna", "step_up_com_impulso.jpg", "Suba no banco com uma perna e leve o joelho oposto para cima num impulso; desça controlando e alterne."),
  // Posterior & glúteo
  c("Terra romeno (ou barra hexagonal)", "Posterior & glúteo", "terra_romeno_ou_barra_hexagonal.jpg", "Joelhos semiflexionados. Empurre o quadril para trás descendo a barra rente às pernas; suba contraindo glúteos e posterior."),
  c("Levantamento terra romeno", "Posterior & glúteo", "levantamento_terra_romeno.jpg", "Joelhos semiflexionados. Empurre o quadril para trás descendo a barra rente às pernas; suba contraindo glúteos e posterior."),
  c("Terra romeno unilateral", "Posterior & glúteo", "terra_romeno_unilateral.jpg", "Numa perna só, incline o tronco à frente levando a outra perna para trás; volte contraindo o glúteo. Equilíbrio + posterior."),
  c("Elevação pélvica (hip thrust)", "Posterior & glúteo", "elevacao_pelvica_hip_thrust.jpg", "Costas apoiadas no banco, barra no quadril. Suba o quadril até o tronco ficar reto e aperte o glúteo no topo."),
  c("Mesa flexora", "Posterior & glúteo", "mesa_flexora.jpg", "Flexione os joelhos puxando o apoio em direção ao glúteo e volte controlando. Isola o posterior."),
  c("Cadeira flexora (posterior)", "Posterior & glúteo", "cadeira_flexora_posterior.jpg", "Flexione os joelhos puxando o apoio em direção ao glúteo e volte controlando. Isola o posterior."),
  // Panturrilha
  c("Panturrilha em pé", "Panturrilha", "panturrilha_em_pe.jpg", "Em pé, suba na ponta dos pés o máximo possível e desça alongando o calcanhar abaixo do degrau."),
  c("Panturrilha sentado", "Panturrilha", "panturrilha_sentado.jpg", "Sentado com peso sobre os joelhos, suba na ponta dos pés e desça alongando."),
  c("Panturrilha unilateral", "Panturrilha", "panturrilha_unilateral.jpg", "Numa perna só, suba na ponta do pé e desça alongando; troque de lado."),
  // Core
  c("Prancha frontal", "Core", "prancha_frontal.jpg", "Apoie antebraços e pontas dos pés. Corpo reto, abdômen e glúteo contraídos. Não deixe o quadril cair."),
  c("Prancha lateral", "Core", "prancha_lateral.jpg", "De lado, apoie um antebraço. Suba o quadril deixando o corpo reto e segure. Troque de lado."),
  c("Press Pallof (anti-rotação)", "Core", "press_pallof_anti_rotacao.jpg", "De lado para a polia, empurre a pega à frente resistindo à rotação do tronco; volte devagar."),
  c("Dead bug", "Core", "dead_bug.jpg", "Deitado, braços e joelhos para cima. Estenda braço e perna opostos sem arquear a lombar e volte; alterne."),
  c("Bird-dog", "Core", null, "Em quatro apoios, estenda braço e perna opostos mantendo o tronco estável; volte e alterne. Core 'em X'."),
  c("Meio levantamento turco", "Core", "meio_levantamento_turco.jpg", "Deitado com peso no braço estendido, levante até sentar apoiado na outra mão, sempre olhando o peso. Estabilidade de ombro."),
  c("Remada renegado", "Core", "remada_renegado.jpg", "Na posição de flexão com halteres, reme um de cada vez sem girar o quadril. Anti-rotação."),
  // Pliometria & potência
  c("Skater lateral", "Pliometria & potência", "skater_lateral.jpg", "Salte lateralmente de uma perna para a outra, aterrissando suave e estável, como um patinador."),
  c("Saltinhos no lugar (pogo)", "Pliometria & potência", "saltinhos_pogo.jpg", "Saltos baixos e rápidos no lugar, só com os tornozelos, joelhos quase retos, aterrissando leve."),
  c("Arremesso de medicine ball", "Pliometria & potência", "arremesso_medicine_ball.jpg", "Arremesse a bola à frente/na parede com força a partir do peito e recupere. Potência."),
  c("Arremesso de medicine ball (rotacional)", "Pliometria & potência", "arremesso_medicine_ball_rotacional.jpg", "De lado para a parede, gire o tronco e arremesse a bola; troque de lado. Potência rotacional."),
  c("Elevação de joelhos (marcha)", "Pliometria & potência", "elevacao_joelhos_marcha.jpg", "Marche ou corra no lugar elevando os joelhos à altura do quadril, em ritmo constante. Cardio."),
  // Lombar
  c("Extensão lombar 45° (peso do corpo)", "Lombar", "extensao_lombar_45.jpg", "No banco 45°, desça o tronco e suba até alinhar com as pernas, sem hiperestender. Fortalece a lombar."),
  // Pegada & estabilidade
  c("Farmer's walk", "Pegada & estabilidade", "farmers_walk.jpg", "Caminhe segurando peso pesado nas duas mãos, tronco ereto e ombros firmes, pela distância marcada."),
  // Cardio & mobilidade
  c("Condicionamento (kettlebell swing)", "Cardio & mobilidade", "condicionamento_kettlebell_swing.jpg", "Impulsione o kettlebell à frente com a força do quadril (não dos braços) até a altura dos olhos; controle a descida."),
  c("Cardio moderado (esteira/bike)", "Cardio & mobilidade", "cardio_bike.jpg", "Ritmo contínuo em que dá para conversar com certa dificuldade, pelo tempo indicado."),
  c("Cardio intervalado (1min forte / 2min leve)", "Cardio & mobilidade", "cardio_bike.jpg", "Alterne 1 min forte com 2 min leve pelo tempo total. Acelera o gasto calórico."),
  c("Finalizador: bike ou corda (intervalado)", "Cardio & mobilidade", "cardio_bike.jpg", "Blocos curtos fortes com descanso ativo, para fechar o treino elevando o condicionamento."),
  c("Mobilidade (quadril/tornozelo/ombro)", "Cardio & mobilidade", null, "Sequência leve de mobilidade articular pelo tempo indicado, preparando quadril, tornozelo e ombro."),
  c("Deslizar na parede / Y-T-W", "Cardio & mobilidade", null, "Costas na parede, deslize os braços para cima e para baixo mantendo contato; desenhe Y, T e W. Saúde da escápula."),
];
const ORDEM_GRUPOS = ["Peito", "Costas", "Ombro", "Braço", "Perna", "Posterior & glúteo", "Panturrilha", "Core", "Pliometria & potência", "Lombar", "Pegada & estabilidade", "Cardio & mobilidade"];

// Fotos do catálogo + apelidos de nomes que variam entre as telas
const CAT_IMG = {};
const CAT_COMO = {};
CATALOGO.forEach((e) => { if (e.img) CAT_IMG[norm(e.nome)] = "img/exercicios/" + e.img; CAT_COMO[norm(e.nome)] = e.como; });
const ALIAS_IMG = { "agachamento búlgaro c/ halter": "agachamento_bulgaro_com_halteres.jpg", "dead bug (abdominal)": "dead_bug.jpg" };
const ALIAS_COMO = { "agachamento búlgaro c/ halter": CAT_COMO[norm("Agachamento búlgaro com halteres")], "dead bug (abdominal)": CAT_COMO[norm("Dead bug")] };
for (const k in ALIAS_IMG) CAT_IMG[norm(k)] = "img/exercicios/" + ALIAS_IMG[k];
for (const k in ALIAS_COMO) CAT_COMO[norm(k)] = ALIAS_COMO[k];

const imgFor = (nome) => IMG[norm(nome)] || CAT_IMG[norm(nome)] || null;
const comoFor = (nome) => CAT_COMO[norm(nome)] || null;

const ICON = {
  inicio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 12 3l9 6.5"/><path d="M5 10v10h14V10"/></svg>',
  treinos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5 17.5 17.5"/><path d="M4 7 7 4l3 3-3 3z"/><path d="M14 17l3-3 3 3-3 3z"/><path d="m3 21 2-2"/><path d="m19 5 2-2"/></svg>',
  modelos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  historico: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
};

/* ---------- Dados / seed ---------- */
const DESC = { "força": 180, "massa": 120, "glúteo": 90, "posterior": 90, "equilíbrio": 90, "resistência": 60, "core": 45 };
const descOf = (f) => DESC[(f || "").toLowerCase()] || 0;
const ex = (nome, series, repMin = null, repMax = null, repTexto = null, foco = "") =>
  ({ nome, series, repMin, repMax, repTexto, foco, descansoSeg: descOf(foco) });

function programaBase() {
  return {
    nome: "Sérgio & Clara — 5 dias",
    treinos: [
      { nome: "Superior A", tab: "SEG", aquecimento: [
        { titulo: "Cardio leve", desc: "Esteira, bike ou elíptico em ritmo leve — 5 a 8 min." },
        { titulo: "Mobilidade de ombro", desc: "Rotação de braços, band pull-apart e alongamento dinâmico de peitoral — ~5 min." },
        { titulo: "Aproximação (supino)", desc: "Barra vazia ×10 → ~50% ×5 → ~70% ×3. Só então as séries de trabalho." },
      ], exercicios: [
        ex("Supino reto com barra", 4, 5, 6, null, "Força"),
        ex("Remada curvada (barra)", 3, 8, 10, null, "Massa"),
        ex("Desenvolvimento com halteres", 3, 8, 10, null, "Massa"),
        ex("Puxada alta (pulldown)", 3, 10, 12, null, "Massa"),
        ex("Elevação lateral", 2, 12, 15, null, "Resistência"),
        ex("Rosca direta", 2, 12, 15, null, "Resistência"),
      ]},
      { nome: "Inferior A", tab: "TER", aquecimento: [
        { titulo: "Cardio leve", desc: "Esteira ou bike em ritmo leve — 5 a 8 min." },
        { titulo: "Mobilidade de quadril/tornozelo", desc: "Agachamento profundo sem peso, círculos de quadril e balanço de pernas — ~5 min." },
        { titulo: "Aproximação (agachamento)", desc: "Barra vazia ×10 → ~50% ×5 → ~70% ×3." },
      ], exercicios: [
        ex("Agachamento livre", 4, 5, 6, null, "Força"),
        ex("Leg press", 3, 10, 12, null, "Massa"),
        ex("Cadeira flexora (posterior)", 3, 10, 12, null, "Massa"),
        ex("Cadeira extensora", 2, 12, 15, null, "Resistência"),
        ex("Panturrilha em pé", 3, 12, 15, null, "Resistência"),
        ex("Prancha frontal", 3, null, null, "30-45s", "Core"),
      ]},
      { nome: "Equilíbrio e Core", tab: "QUA", aquecimento: [
        { titulo: "Cardio leve", desc: "Esteira ou bike em ritmo leve — 5 min." },
      ], exercicios: [
        ex("Afundo (lunge) andando", 3, null, null, "10 / perna", "Equilíbrio"),
        ex("Agachamento búlgaro com halteres", 3, null, null, "8-10 / perna", "Equilíbrio"),
        ex("Prancha lateral", 3, null, null, "20-30s / lado", "Core"),
        ex("Farmer's walk", 3, null, null, "20m", "Core"),
        ex("Cardio moderado (esteira/bike)", 1, null, null, "15-20 min", "Resistência"),
      ]},
      { nome: "Superior B", tab: "QUI", aquecimento: [
        { titulo: "Cardio leve", desc: "Esteira, bike ou elíptico em ritmo leve — 5 a 8 min." },
        { titulo: "Mobilidade de ombro/dorsal", desc: "Band pull-apart, dead hang e rotação de ombro — ~5 min." },
      ], exercicios: [
        ex("Barra fixa assistida / puxada neutra", 4, 6, 8, null, "Força"),
        ex("Supino inclinado com halteres", 3, 8, 10, null, "Massa"),
        ex("Remada baixa (cabo)", 3, 10, 12, null, "Massa"),
        ex("Desenvolvimento na máquina", 3, 10, 12, null, "Massa"),
        ex("Face pull", 2, 15, 15, null, "Saúde do ombro"),
        ex("Tríceps na corda", 2, 12, 15, null, "Resistência"),
        ex("Rosca martelo", 2, 12, 15, null, "Resistência"),
      ]},
      { nome: "Inferior B", tab: "SEX", aquecimento: [
        { titulo: "Cardio leve", desc: "Esteira ou bike em ritmo leve — 5 a 8 min." },
        { titulo: "Mobilidade de quadril/posterior", desc: "Good morning sem peso, balanço de pernas e mobilidade de tornozelo — ~5 min." },
      ], exercicios: [
        ex("Terra romeno (ou barra hexagonal)", 4, 6, 6, null, "Força"),
        ex("Afundo com halteres", 3, null, null, "10 / perna", "Equilíbrio"),
        ex("Elevação pélvica (hip thrust)", 3, 10, 12, null, "Glúteo"),
        ex("Mesa flexora", 3, 12, 12, null, "Posterior"),
        ex("Cadeira extensora", 3, 12, 15, null, "Resistência"),
        ex("Panturrilha sentado", 3, 15, 15, null, "Resistência"),
      ]},
    ],
  };
}

function programaV2() {
  return {
    nome: "Sérgio — Condicionamento & Ombro (5 dias)",
    treinos: [
      { nome: "Inferior A (joelho) + força", tab: "D1", aquecimento: [
        { titulo: "Cardio leve", desc: "Bike ou esteira em ritmo leve — 3 a 5 min." },
        { titulo: "Mobilidade de quadril", desc: "90/90, agachamento profundo apoiado, afundo com rotação e rotações de quadril — ~8 min." },
      ], exercicios: [
        ex("Agachamento goblet ou frontal", 4, 5, 6, null, "Força"),
        ex("Agachamento búlgaro com halteres", 3, null, null, "8 / perna", "Unilateral"),
        ex("Agachamento cossaco", 3, null, null, "8 / lado", "Mobilidade + força"),
        ex("Panturrilha unilateral", 3, null, null, "12 / lado", "Resistência"),
        ex("Press Pallof (anti-rotação)", 3, null, null, "10 / lado", "Core em X"),
        ex("Finalizador: bike ou corda (intervalado)", 1, null, null, "6-8 min", "Condicionamento"),
      ]},
      { nome: "Superior A (horizontal) + ombro", tab: "D2", aquecimento: [
        { titulo: "Mobilidade de ombro/torácica", desc: "Rotações da coluna torácica, deslizar na parede, rotações de ombro e puxada p/ rosto leve — ~6 min." },
      ], exercicios: [
        ex("Supino com halteres (pegada neutra)", 4, 8, 10, null, "Peito"),
        ex("Remada unilateral com halter (serrote)", 3, null, null, "10 / lado", "Unilateral"),
        ex("Remada baixa na polia", 3, 10, 12, null, "Massa"),
        ex("Puxada para o rosto (face pull)", 3, 15, 15, null, "Saúde do ombro"),
        ex("Rotação externa de ombro", 3, null, null, "15 / lado", "Manguito"),
        ex("Rosca direta", 3, 10, 12, null, "Braço"),
        ex("Tríceps na corda", 3, 10, 12, null, "Braço"),
      ]},
      { nome: "Core + condicionamento", tab: "D3", aquecimento: [
        { titulo: "Flow de mobilidade", desc: "Sequência fluida de mobilidade de quadril e ombro — ~10 min." },
      ], exercicios: [
        ex("Meio levantamento turco", 4, null, null, "4 / lado", "Estab. ombro"),
        ex("Terra romeno unilateral", 3, null, null, "8 / lado", "Equilíbrio + posterior"),
        ex("Remada renegado", 3, null, null, "6 / lado", "Anti-rotação (X)"),
        ex("Bird-dog", 3, null, null, "8 / lado", "Core em X"),
        ex("Condicionamento (kettlebell swing)", 1, null, null, "15-20 min", "Cardio"),
      ]},
      { nome: "Inferior B (quadril) + força", tab: "D4", aquecimento: [
        { titulo: "Mobilidade de quadril/posterior", desc: "Bom dia sem peso, avião de quadril e 90/90 — ~8 min." },
      ], exercicios: [
        ex("Levantamento terra romeno", 4, 6, 6, null, "Posterior"),
        ex("Elevação pélvica (hip thrust)", 3, 10, 12, null, "Glúteo"),
        ex("Afundo reverso com halteres", 3, null, null, "10 / perna", "Unilateral"),
        ex("Panturrilha em pé", 3, 12, 15, null, "Resistência"),
        ex("Prancha lateral", 3, null, null, "30s / lado", "Core"),
      ]},
      { nome: "Superior B (vertical) + escápula", tab: "D5", aquecimento: [
        { titulo: "Mobilidade + ativação", desc: "Mobilidade de ombro/torácica + ativação de serrátil e manguito — ~6 min." },
      ], exercicios: [
        ex("Desenvolvimento na barra landmine", 4, null, null, "8 / lado", "Empurrar vertical seguro"),
        ex("Barra fixa ou puxada (pegada neutra)", 4, 6, 8, null, "Puxar vertical"),
        ex("Flexão de braço (controle escapular)", 3, 10, 12, null, "Peito/serrátil"),
        ex("Elevação lateral", 2, 15, 15, null, "Deltoide"),
        ex("Deslizar na parede / Y-T-W", 3, 12, 12, null, "Escápula"),
        ex("Rosca martelo", 3, 10, 12, null, "Braço"),
        ex("Tríceps francês", 3, 10, 12, null, "Braço"),
      ]},
    ],
  };
}
function programaClara() {
  const mobOmbro = { titulo: "Mobilidade de ombro", desc: "Rotação torácica, band pull-apart e círculos de ombro — ~8 min." };
  const mobQuadril = { titulo: "Mobilidade de quadril", desc: "90/90, agachamento profundo apoiado e mobilidade de tornozelo — ~8 min." };
  return {
    nome: "Clara — Superior / Inferior (gasto alto)",
    treinos: [
      { nome: "Superior A", tab: "SEG", aquecimento: [mobOmbro], exercicios: [
        ex("Supino com halteres (pegada neutra)", 3, 8, 10, null, "Peito"),
        ex("Desenvolvimento com halteres", 3, 10, 10, null, "Ombro"),
        ex("Remada unilateral com halter (serrote)", 3, null, null, "10 / lado", "Unilateral"),
        ex("Elevação lateral", 3, 15, 15, null, "Ombro"),
        ex("Tríceps na corda", 3, 12, 12, null, "Braço"),
        ex("Prancha frontal", 3, null, null, "30s", "Core"),
        ex("Cardio moderado (esteira/bike)", 1, null, null, "12-15 min", "Cardio"),
      ]},
      { nome: "Inferior A", tab: "TER", aquecimento: [mobQuadril], exercicios: [
        ex("Agachamento goblet ou frontal", 4, 8, 10, null, "Pernas"),
        ex("Leg press", 3, 12, 12, null, "Pernas"),
        ex("Afundo reverso com halteres", 3, null, null, "10 / perna", "Unilateral"),
        ex("Cadeira extensora", 3, 15, 15, null, "Resistência"),
        ex("Panturrilha em pé", 3, 15, 15, null, "Resistência"),
        ex("Bird-dog", 3, null, null, "8 / lado", "Core"),
        ex("Cardio moderado (esteira/bike)", 1, null, null, "12-15 min", "Cardio"),
      ]},
      { nome: "Superior B + Spinning", tab: "QUA", aquecimento: [mobOmbro], exercicios: [
        ex("Puxada alta (pulldown)", 3, 10, 10, null, "Costas"),
        ex("Remada baixa na polia", 3, 10, 12, null, "Costas"),
        ex("Supino inclinado com halteres", 3, 10, 10, null, "Peito"),
        ex("Puxada para o rosto (face pull)", 3, 15, 15, null, "Saúde do ombro"),
        ex("Rosca direta", 3, 12, 12, null, "Braço"),
        ex("Prancha lateral", 3, null, null, "20-30s / lado", "Core"),
        ex("Spinning (aula)", 1, null, null, "45 min", "Cardio"),
      ]},
      { nome: "Inferior B", tab: "QUI", aquecimento: [mobQuadril], exercicios: [
        ex("Elevação pélvica (hip thrust)", 4, 10, 12, null, "Glúteo"),
        ex("Levantamento terra romeno", 3, 8, 10, null, "Posterior"),
        ex("Agachamento búlgaro com halteres", 3, null, null, "10 / perna", "Unilateral"),
        ex("Mesa flexora", 3, 12, 12, null, "Posterior"),
        ex("Cadeira abdutora", 3, 15, 15, null, "Glúteo"),
        ex("Dead bug", 3, null, null, "10 / lado", "Core"),
        ex("Cardio moderado (esteira/bike)", 1, null, null, "12-15 min", "Cardio"),
      ]},
      { nome: "Superior C + Spinning", tab: "SEX", aquecimento: [mobOmbro], exercicios: [
        ex("Barra fixa ou puxada (pegada neutra)", 3, 10, 10, null, "Costas"),
        ex("Supino na máquina", 3, 12, 12, null, "Peito"),
        ex("Desenvolvimento com halteres", 3, null, null, "10 / lado", "Unilateral"),
        ex("Crucifixo (voador)", 3, 15, 15, null, "Peito"),
        ex("Rosca martelo", 3, 12, 12, null, "Braço"),
        ex("Farmer's walk", 3, null, null, "20m / lado", "Core"),
        ex("Spinning (aula)", 1, null, null, "45 min", "Cardio"),
      ]},
      { nome: "Inferior C", tab: "SÁB", aquecimento: [mobQuadril], exercicios: [
        ex("Terra romeno unilateral", 3, null, null, "8 / perna", "Unilateral"),
        ex("Step-up (controlado)", 3, null, null, "10 / perna", "Unilateral"),
        ex("Agachamento cossaco", 3, null, null, "8 / lado", "Mobilidade + força"),
        ex("Coice na polia (glúteo)", 3, null, null, "12 / lado", "Glúteo"),
        ex("Panturrilha unilateral", 3, null, null, "12 / lado", "Resistência"),
        ex("Extensão lombar 45° (peso do corpo)", 3, 12, 12, null, "Lombar"),
        ex("Press Pallof (anti-rotação)", 3, null, null, "10 / lado", "Core"),
        ex("Cardio moderado (esteira/bike)", 1, null, null, "12-15 min", "Cardio"),
      ]},
    ],
  };
}
const TEMPLATES = [programaV2(), programaClara()];

/* ---------- Estado / storage ---------- */
const KEY = "treino-web";
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : "id" + Date.now() + Math.random().toString(16).slice(2));
let DB = { programas: [], treinos: [], registros: [], settings: { perfilAtivo: "sergio", estilo: "editorial", seeded: false, claraSeeded: false } };

function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) DB = Object.assign(DB, JSON.parse(raw)); } catch (e) {}
  if (!DB.settings) DB.settings = {};
  if (!DB.programas) DB.programas = [];
  if (!DB.treinos) DB.treinos = [];
  if (!DB.registros) DB.registros = [];
  if (!DB.settings.estilo) DB.settings.estilo = "editorial";
  if (DB.settings.claraSeeded == null) DB.settings.claraSeeded = false;
  if (!DB.settings.ultimo) DB.settings.ultimo = {};
  if (!DB.settings.perfilAtivo) DB.settings.perfilAtivo = "sergio";
  migrarProgramas();
  migrarUsuarioUnico();
}
/** App virou usuário único: tudo passa a pertencer ao perfil "u". */
function migrarUsuarioUnico() {
  let mud = false;
  DB.programas.forEach((p) => { if (p.perfil !== "u") { p.perfil = "u"; mud = true; } });
  DB.treinos.forEach((t) => { if (t.perfil !== "u") { t.perfil = "u"; mud = true; } });
  DB.registros.forEach((r) => { if (r.perfil !== "u") { r.perfil = "u"; mud = true; } });
  if (mud) save();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) {} }

/** Envolve treinos soltos (sem programaId) num programa por perfil. */
function migrarProgramas() {
  const soltos = DB.treinos.filter((t) => !t.programaId);
  if (!soltos.length) return;
  const porPerfil = {};
  soltos.forEach((t) => { (porPerfil[t.perfil] = porPerfil[t.perfil] || []).push(t); });
  for (const pf in porPerfil) {
    const pid = uid();
    DB.programas.push({ id: pid, perfil: pf, nome: "Meu programa", origem: "migrado", ativo: true, inicioMs: Date.now(), ordem: DB.programas.filter((p) => p.perfil === pf).length });
    porPerfil[pf].forEach((t) => { t.programaId = pid; });
  }
  save();
}

/** Cria um programa (com seus dias) para o perfil. Retorna o id do programa. */
function importarPrograma(programa, pf, ativo = true) {
  const pid = uid();
  DB.programas.push({ id: pid, perfil: pf, nome: programa.nome || "Programa", origem: programa.origem || "modelo", ativo: ativo, inicioMs: Date.now(), ordem: DB.programas.filter((p) => p.perfil === pf).length });
  let ordem = 0;
  for (const t of programa.treinos) {
    DB.treinos.push({
      id: uid(), perfil: pf, programaId: pid, nome: t.nome, tab: t.tab || "", ordem: ordem++,
      aquecimento: (t.aquecimento || []).map((a) => ({ titulo: a.titulo, desc: a.desc })),
      exercicios: (t.exercicios || []).map((e) => Object.assign({ id: uid() }, e)),
    });
  }
  return pid;
}
function criarProgramaVazio(pf, nome) {
  const pid = uid();
  DB.programas.push({ id: pid, perfil: pf, nome: nome || "Novo programa", origem: "criado", ativo: true, inicioMs: Date.now(), ordem: DB.programas.filter((p) => p.perfil === pf).length });
  return pid;
}
function seedIfNeeded() {
  // Começa com os 2 modelos, ambos ativos.
  if (!DB.programas.length) {
    importarPrograma(programaV2(), "u", true);
    importarPrograma(programaClara(), "u", true);
  }
  DB.settings.seeded = true; save();
}
/** Zera histórico e volta aos 2 modelos limpos, ambos ativos (opt-in nas Config). */
function zerarDados() {
  DB.programas = []; DB.treinos = []; DB.registros = []; DB.settings.ultimo = {};
  importarPrograma(programaV2(), "u", true);
  importarPrograma(programaClara(), "u", true);
  DB.settings.seeded = true; DB.settings.claraSeeded = true;
  save();
}

/* ---------- Helpers de domínio ---------- */
const PF = () => "u"; // usuário único (sem perfis)
const accent = () => estAccent();
const treinosDoPerfil = (pf = PF()) => DB.treinos.filter((t) => t.perfil === pf).sort((a, b) => a.ordem - b.ordem);
const treinoPorId = (id) => DB.treinos.find((t) => t.id === id);
const programasDoPerfil = (pf = PF()) => DB.programas.filter((p) => p.perfil === pf).sort((a, b) => a.ordem - b.ordem);
const programaPorId = (id) => DB.programas.find((p) => p.id === id);
const treinosDoPrograma = (pid) => DB.treinos.filter((t) => t.programaId === pid).sort((a, b) => a.ordem - b.ordem);
const programasAtivos = (pf = PF()) => programasDoPerfil(pf).filter((p) => p.ativo);

function setUltimo(programaId, treinoId) {
  if (!DB.settings.ultimo) DB.settings.ultimo = {};
  DB.settings.ultimo[PF()] = { programaId, treinoId };
  save();
}
const getUltimo = () => (DB.settings.ultimo || {})[PF()];
/** Programa + dia que o card "Continuar" deve abrir. */
function continuarAlvo() {
  const u = getUltimo();
  let prog = null, dia = null;
  if (u) {
    prog = programaPorId(u.programaId);
    if (prog && prog.perfil !== PF()) prog = null;
    if (prog) { const ds = treinosDoPrograma(prog.id); dia = ds.find((d) => d.id === u.treinoId) || ds[0] || null; }
  }
  if (!prog) { prog = programasDoPerfil()[0] || null; if (prog) { const ds = treinosDoPrograma(prog.id); dia = ds[0] || null; } }
  return { prog, dia };
}

function setsLabel(e) {
  let reps = "";
  if (e.repTexto) reps = e.repTexto;
  else if (e.repMin != null && e.repMax != null && e.repMin !== e.repMax) reps = e.repMin + "-" + e.repMax;
  else if (e.repMin != null) reps = "" + e.repMin;
  if (e.series <= 0 && reps) return reps;
  if (e.series <= 0) return "—";
  if (!reps) return e.series + " séries";
  return e.series + " × " + reps;
}
function descLabel(s) { if (!s) return ""; if (s < 60) return s + "s"; return s % 60 === 0 ? s / 60 + "min" : Math.floor(s / 60) + "min " + (s % 60) + "s"; }
const fmtCarga = (d) => (d % 1 === 0 ? "" + Math.round(d) : d.toFixed(1).replace(".", ","));
function fmtData(ms) { const d = new Date(ms); return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("" + d.getFullYear()).slice(-2); }
const MES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
function fmtDiaMes(ms) { const d = new Date(ms); return ("0" + d.getDate()).slice(-2) + " " + MES[d.getMonth()]; }
const resumoSets = (sets) => sets.map((s) => fmtCarga(s.carga) + "×" + s.reps).join(" · ");
const epochDay = (ms) => Math.floor((ms - new Date(ms).getTimezoneOffset() * 60000) / 86400000);

function registrosDe(exId, pf = PF()) {
  return DB.registros.filter((r) => r.exercicioId === exId && r.perfil === pf).sort((a, b) => b.dataMs - a.dataMs || a.serieIndex - b.serieIndex);
}
function sessoes(regs) {
  const by = {};
  regs.forEach((r) => { (by[r.dataMs] = by[r.dataMs] || []).push(r); });
  return Object.keys(by).map(Number).sort((a, b) => b - a).map((ms) => ({
    dataMs: ms, sets: by[ms].sort((a, b) => a.serieIndex - b.serieIndex).map((r) => ({ serieIndex: r.serieIndex, carga: r.carga, reps: r.reps, rpe: r.rpe })),
  }));
}
const recorde = (regs) => regs.reduce((m, r) => Math.max(m, r.carga), 0);
function sugereSubir(e, ultima) {
  const topo = e.repMax; if (topo == null || !ultima) return false;
  const v = ultima.sets.filter((s) => s.reps > 0); if (!v.length) return false;
  const prev = e.series > 0 ? e.series : v.length;
  return v.length >= prev && v.every((s) => s.reps >= topo);
}

/* ---------- Router ---------- */
let stack = [{ name: "inicio" }];
const TABS = ["inicio", "modelos", "exercicios", "historico"];
let exBusca = "", exGrupo = "";
const route = () => stack[stack.length - 1];
function go(r) { stack.push(r); render(); }
function back() { if (stack.length > 1) stack.pop(); render(); }
function setTab(name) { stack = [{ name }]; render(); }

/* ---------- Toast ---------- */
let toastT;
function toast(msg) {
  const t = document.getElementById("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 1400);
}

/* ---------- Render ---------- */
const view = () => document.getElementById("view");
const esc = (s) => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function imgHtml(nome, cls) {
  const src = imgFor(nome);
  if (src) return `<div class="${cls}" style="background-image:url('${src}')"></div>`;
  return `<div class="${cls} ph">🏋️</div>`;
}
function imgBig(nome) {
  const src = imgFor(nome);
  const st = "width:100%;height:150px;border-radius:12px";
  if (src) return `<div class="eximg" style="${st};background-image:url('${src}')"></div>`;
  return `<div class="eximg ph" style="${st}">🏋️</div>`;
}

function render() {
  document.body.dataset.estilo = "clean";
  const ds = document.documentElement.style;
  ds.setProperty("--accent", "#2E6BE6"); ds.setProperty("--accent-ink", "#FFFFFF");
  const tc = document.querySelector('meta[name="theme-color"]'); if (tc) tc.setAttribute("content", "#FFFFFF");
  const r = route();
  const nav = document.getElementById("bottomnav");
  const isTab = TABS.includes(r.name);
  nav.style.display = isTab ? "flex" : "none";
  if (isTab) renderNav(r.name);
  const fn = { inicio: renderInicio, modelos: renderModelos, programa: renderProgramaDias, exercicios: renderExercicios, historico: renderHistGeral, editor: renderEditor, histex: renderHistEx, settings: renderSettings }[r.name];
  fn(r);
  view().scrollTop = r._scroll || 0;
}

function renderNav(active) {
  const label = { inicio: "Início", modelos: "Modelos", exercicios: "Exercícios", historico: "Histórico" };
  const icon = { inicio: ICON.inicio, modelos: ICON.modelos, exercicios: ICON.treinos, historico: ICON.historico };
  document.getElementById("bottomnav").innerHTML = TABS.map((t) =>
    `<button class="nav-btn ${t === active ? "active" : ""}" data-tab="${t}">${icon[t]}<span>${label[t]}</span></button>`
  ).join("");
  document.querySelectorAll("#bottomnav .nav-btn").forEach((b) => b.onclick = () => setTab(b.dataset.tab));
}

function perfilSwitchHtml() {
  if (!MULTI) return "";
  return `<div class="pswitch">` + PERFIS.map((p) =>
    `<button class="pbtn ${p.id === PF() ? "active" : ""}" data-pf="${p.id}" ${p.id === PF() ? `style="background:${p.accent}"` : ""}>${p.nome}</button>`
  ).join("") + `</div>`;
}
function wirePerfil() {
  view().querySelectorAll("[data-pf]").forEach((b) => b.onclick = () => { DB.settings.perfilAtivo = b.dataset.pf; save(); render(); });
}

/* ---- Início ---- */
function dashboard() {
  const pf = PF();
  const exs = {}; treinosDoPerfil(pf).forEach((t) => t.exercicios.forEach((e) => exs[e.id] = e.foco || "Geral"));
  const now = Date.now(), l30 = now - 30 * 864e5, l7 = now - 7 * 864e5;
  const regs = DB.registros.filter((r) => r.perfil === pf);
  const r30 = regs.filter((r) => r.dataMs >= l30), r7 = regs.filter((r) => r.dataMs >= l7);
  const ativoId = DB.settings.ativo[pf];
  const lista = treinosDoPerfil(pf);
  const ativo = lista.find((t) => t.id === ativoId) || lista[0] || null;
  const porFoco = {};
  r30.forEach((r) => { const f = exs[r.exercicioId]; if (f) porFoco[f] = (porFoco[f] || 0) + 1; });
  let fonte = "registros";
  if (!Object.keys(porFoco).length) {
    fonte = "programa";
    const alvo = ativo ? ativo.exercicios : lista.flatMap((t) => t.exercicios);
    alvo.forEach((e) => { const f = e.foco || "Geral"; porFoco[f] = (porFoco[f] || 0) + 1; });
  }
  const fatias = Object.entries(porFoco).sort((a, b) => b[1] - a[1]).map(([foco, valor], i) => ({ foco, valor, cor: PALETA[i % PALETA.length] }));
  const dias = (arr) => new Set(arr.map((r) => epochDay(r.dataMs))).size;
  return { dias30: dias(r30), dias7: dias(r7), vol7: r7.reduce((s, r) => s + r.carga * r.reps, 0), fatias, fonte, ativo, treinos: lista };
}

const DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function hojeLabel() { const d = new Date(); return `${DIAS[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]}`; }
function estMin(t) {
  let s = 0; t.exercicios.forEach((e) => { const ser = e.series > 0 ? e.series : 3; s += ser * ((e.descansoSeg || 60) + 45); });
  return Math.max(10, Math.round(s / 60) + ((t.aquecimento || []).length ? 8 : 0));
}
function imgThumb(nome) { const s = imgFor(nome); return s ? `<span class="thumb" style="background-image:url('${s}')"></span>` : `<span class="thumb ph"></span>`; }

function heroHtml(est, ativo, d, done, goal) {
  const n = ativo.exercicios.length, mins = estMin(ativo), nome = esc(ativo.nome);
  const vol = fmtCarga(d.vol7), pct = goal ? Math.round(done / goal * 100) : 0;
  if (est === "dashboard") {
    return `<div class="hero hero-dash">
      <div class="row" style="gap:16px">
        <div class="ring" style="background:conic-gradient(var(--accent) ${pct}%, var(--s2) 0)"><div class="rhole"><b>${done}/${goal}</b><span>semana</span></div></div>
        <div class="col" style="flex:1"><div class="hero-eyebrow">Próximo</div><div class="hero-title" style="font-size:22px">${nome}</div><div class="hero-meta">${n} ex · ~${mins} min</div></div>
      </div>
      <div class="row" style="gap:10px;margin-top:14px">
        <div class="mtile"><div class="mv">${vol}<small> kg</small></div><div class="ml">Volume 7d</div></div>
        <div class="mtile"><div class="mv">${d.dias7}</div><div class="ml">Dias ativos</div></div>
        <button class="mtile mtile-cta" id="treinar">Treinar</button>
      </div></div>`;
  }
  if (est === "imersivo") {
    const img = imgFor(ativo.exercicios[0] && ativo.exercicios[0].nome);
    const bg = img ? `background-image:linear-gradient(to top,rgba(0,0,0,.94),rgba(0,0,0,.15) 62%),url('${img}')` : "background:linear-gradient(135deg,#1b2a3a,#0a0d12)";
    return `<div class="hero hero-imm" style="${bg}">
      <div class="imm-bottom">
        <div class="hero-eyebrow">Pronto pra treinar</div>
        <div class="hero-title" style="font-size:28px">${nome}</div>
        <div class="row" style="gap:12px;margin-top:12px"><button class="btn primary" id="treinar" style="border-radius:999px">Começar treino</button><span class="muted">${n} ex · ${mins} min</span></div>
      </div></div>`;
  }
  if (est === "brutalista") {
    return `<div class="hero hero-brut">
      <div class="brut-block">
        <span class="brut-pill">Hoje</span>
        <div class="hero-title">${nome}</div>
        <div class="hero-meta">${n} exercícios · ${mins} min</div>
        <button class="btn primary big" id="treinar">Começar treino</button>
      </div>
      <div class="row" style="gap:10px;margin-top:12px">
        <div class="brut-stat"><b>${done}/${goal}</b><span>Semana</span></div>
        <div class="brut-stat brut-yellow"><b>${vol}kg</b><span>Volume</span></div>
      </div></div>`;
  }
  // editorial (padrão)
  return `<div class="hero hero-ed">
    <div class="eyebrow">Hoje · Treino</div>
    <div class="hero-bigtitle">${nome}</div>
    <div class="hero-meta">${n} exercícios &nbsp;·&nbsp; ${mins} min</div>
    <div class="hairline"></div>
    <div class="row" style="align-items:flex-end">
      <span class="bignum">${done}</span><span class="muted" style="margin-bottom:6px"> / ${goal} esta semana</span>
      <button class="linkcta" id="treinar" style="margin-left:auto">Começar →</button>
    </div>
    <div class="thinbar"><i style="width:${pct}%"></i></div></div>`;
}

function progCard(p) {
  const dias = treinosDoPrograma(p.id);
  const img = dias[0] && dias[0].exercicios[0] ? imgFor(dias[0].exercicios[0].nome) : null;
  const left = img
    ? `<div class="eximg" style="width:52px;height:52px;background-image:url('${img}')"></div>`
    : `<div class="tab-chip" style="background:${accent()}22;color:${accent()}">${esc((dias[0] && dias[0].tab) || "•")}</div>`;
  return `<div class="card tcard" data-prog="${p.id}">${left}
    <div class="col" style="flex:1"><div class="exname">${esc(p.nome)}</div><div class="muted">${dias.length} treino${dias.length === 1 ? "" : "s"}</div></div>
    <span class="chev">›</span></div>`;
}

const nomeCurto = (n) => (n.includes("—") ? n.split("—")[0].trim() : (n.length > 18 ? n.slice(0, 18) + "…" : n));

function renderInicio() {
  const ativos = programasAtivos();
  if (!ativos.length) {
    view().innerHTML = `
      <div class="hd"><div class="hd-row"><div class="col"><span class="greet">${esc(cap(hojeLabel()))}</span><span class="h1">Treino do dia</span></div><div class="spacer"></div><button class="iconbtn" id="cfg">${ICON.gear}</button></div></div>
      <div class="card pad empty">Nenhum modelo ativo.<br><button class="btn primary" id="vermod" style="margin-top:12px">Ativar um modelo</button></div>`;
    document.getElementById("cfg").onclick = () => go({ name: "settings" });
    document.getElementById("vermod").onclick = () => setTab("modelos");
    return;
  }
  const u = getUltimo();
  const prog = ativos.find((p) => u && p.id === u.programaId) || ativos[0];
  const dias = treinosDoPrograma(prog.id);
  const diaId = (u && u.programaId === prog.id && dias.some((d) => d.id === u.treinoId)) ? u.treinoId : (dias[0] && dias[0].id);
  const dia = dias.find((d) => d.id === diaId) || null;
  setUltimo(prog.id, dia ? dia.id : null);
  const wu = dia ? (dia.aquecimento || []) : [];
  view().innerHTML = `
    <div class="hd"><div class="hd-row"><div class="col"><span class="greet">${esc(cap(hojeLabel()))}</span><span class="h1">Treino do dia</span></div><div class="spacer"></div><button class="iconbtn" id="cfg">${ICON.gear}</button></div></div>
    ${ativos.length > 1 ? `<div class="pswitch">${ativos.map((p) => `<button class="pbtn ${p.id === prog.id ? "active" : ""}" data-prog="${p.id}">${esc(nomeCurto(p.nome))}</button>`).join("")}</div>` : ""}
    <div class="eyebrow" style="margin:2px 2px 2px">${esc(prog.nome)}</div>
    ${dias.length > 1 ? `<div class="daytabs">${dias.map((d) => `<button class="dtab ${dia && d.id === dia.id ? "on" : ""}" data-godia="${d.id}">${esc(d.tab || d.nome)}</button>`).join("")}</div>` : ""}
    <div class="h1" style="margin:2px 2px 8px">${esc(dia ? dia.nome : "Treino")}</div>
    ${wu.length ? `<div class="card"><div class="wu-head" id="wuh"><span>🔥 Aquecimento</span><span id="wuchev">▸</span></div><div class="wu-body" id="wub" style="display:none">${wu.map((w) => `<div><div class="wu-t">${esc(w.titulo)}</div>${w.desc ? `<div class="wu-d">${esc(w.desc)}</div>` : ""}</div>`).join("")}</div></div>` : ""}
    ${dia && dia.exercicios.length ? dia.exercicios.map((e) => exCard(e)).join("") : `<div class="empty">Treino sem exercícios.</div>`}
    ${dia ? `<button class="btn wa" id="share">Compartilhar no WhatsApp</button>` : ""}
    <div style="height:10px"></div>`;
  document.getElementById("cfg").onclick = () => go({ name: "settings" });
  view().querySelectorAll("[data-prog]").forEach((b) => b.onclick = () => { const p = programaPorId(b.dataset.prog); const d0 = treinosDoPrograma(p.id)[0]; setUltimo(p.id, d0 ? d0.id : null); render(); });
  view().querySelectorAll("[data-godia]").forEach((b) => b.onclick = () => { setUltimo(prog.id, b.dataset.godia); render(); });
  const wuh = document.getElementById("wuh");
  if (wuh) wuh.onclick = () => { const b = document.getElementById("wub"); const open = b.style.display !== "none"; b.style.display = open ? "none" : "flex"; document.getElementById("wuchev").textContent = open ? "▸" : "▾"; };
  if (dia) {
    view().querySelectorAll("[data-reg]").forEach((c) => c.onclick = (ev) => { if (ev.target.closest("[data-hist]")) return; modalRegistrar(dia.exercicios.find((e) => e.id === c.dataset.reg)); });
    view().querySelectorAll("[data-hist]").forEach((b) => b.onclick = (ev) => { ev.stopPropagation(); go({ name: "histex", exId: b.dataset.hist, nome: b.dataset.nome }); });
    const sh = document.getElementById("share"); if (sh) sh.onclick = () => compartilharDia(prog, dia);
  }
}

/* ---- Modelos: criar, ativar (1-2) e editar ---- */
function toggleAtivo(id) {
  const p = programaPorId(id); if (!p) return;
  if (!p.ativo && programasDoPerfil().filter((x) => x.ativo).length >= MAX_ATIVOS) { toast("Máximo de " + MAX_ATIVOS + " ativos"); return; }
  p.ativo = !p.ativo; save(); render();
}
function renderModelos() {
  const progs = programasDoPerfil();
  view().innerHTML = `
    <div class="hd"><div class="col"><span class="eyebrow">Treinos</span><span class="h1">Modelos</span></div></div>
    <div class="muted" style="margin:2px 2px 10px">Ative 1 ou 2 pra aparecerem no Início.</div>
    <button class="btn primary big" id="criar" style="margin-bottom:8px">+ Criar modelo</button>
    ${progs.length ? progs.map((p) => {
      const dias = treinosDoPrograma(p.id);
      return `<div class="card pad">
        <div class="col"><div class="exname">${esc(p.nome)}${p.ativo ? ` <span style="color:var(--accent);font-weight:700;font-size:11px">· ativo</span>` : ""}</div><div class="muted">${dias.length} dia${dias.length === 1 ? "" : "s"}</div></div>
        <div class="btnrow"><button class="btn ${p.ativo ? "primary" : "ghost"}" data-toggle="${p.id}">${p.ativo ? "Ativo ✓" : "Ativar"}</button><button class="btn ghost" data-abrir="${p.id}">Abrir</button><button class="btn text" data-ren="${p.id}">✎</button><button class="btn text" data-del="${p.id}">🗑</button></div></div>`;
    }).join("") : `<div class="empty">Nenhum modelo ainda.</div>`}
    <div class="sectlbl">Modelos prontos</div>
    ${TEMPLATES.map((p, i) => `<div class="card pad"><div class="exname" style="font-weight:700">${esc(p.nome)}</div><div class="muted">${p.treinos.length} dias</div>
      <button class="btn ghost" data-add="${i}" style="width:100%;margin-top:8px">Adicionar aos meus</button></div>`).join("")}
    <div style="height:8px"></div>`;
  document.getElementById("criar").onclick = () => { const id = criarProgramaVazio("u", "Novo modelo"); save(); go({ name: "programa", id }); };
  view().querySelectorAll("[data-toggle]").forEach((b) => b.onclick = () => toggleAtivo(b.dataset.toggle));
  view().querySelectorAll("[data-abrir]").forEach((b) => b.onclick = () => go({ name: "programa", id: b.dataset.abrir }));
  view().querySelectorAll("[data-ren]").forEach((b) => b.onclick = () => { const p = programaPorId(b.dataset.ren); openSheet("Renomear modelo", `<input class="field" id="pn" value="${esc(p.nome)}">`, [{ label: "Salvar", primary: true, onClick: () => { const v = document.getElementById("pn").value.trim(); if (v) { p.nome = v; save(); render(); } } }]); });
  view().querySelectorAll("[data-del]").forEach((b) => b.onclick = () => { const p = programaPorId(b.dataset.del); confirmar(`Excluir "${p.nome}"?`, "O modelo e seus dias serão removidos (o histórico é mantido).", () => { DB.treinos = DB.treinos.filter((t) => t.programaId !== p.id); DB.programas = DB.programas.filter((x) => x.id !== p.id); save(); render(); }); });
  view().querySelectorAll("[data-add]").forEach((b) => b.onclick = () => { importarPrograma(TEMPLATES[+b.dataset.add], "u", false); save(); toast("Modelo adicionado"); render(); });
}
function compartilharDia(prog, dia) {
  const linhas = dia.exercicios.map((e) => "• " + e.nome + " — " + setsLabel(e)).join("\n");
  const txt = prog.nome + "\n" + dia.nome + "\n\n" + linhas;
  if (navigator.share) navigator.share({ text: txt }).catch(() => {});
  else window.open("https://wa.me/?text=" + encodeURIComponent(txt), "_blank");
}

/* ---- Programa numa tela só: abas de dia + exercícios ---- */
function renderProgramaDias(r) {
  const p = programaPorId(r.id); if (!p) return back();
  const dias = treinosDoPrograma(p.id);
  if (r.dia == null || !dias.some((d) => d.id === r.dia)) r.dia = dias[0] ? dias[0].id : null;
  const dia = dias.find((d) => d.id === r.dia) || null;
  if (dia) setUltimo(p.id, dia.id);
  const wu = dia ? (dia.aquecimento || []) : [];
  view().innerHTML = `
    <div class="hd"><div class="hd-row"><button class="backbtn" id="bk">‹</button><div class="col"><span class="eyebrow">Programa</span><span class="title">${esc(p.nome)}</span></div><div class="spacer"></div><button class="iconbtn" id="editp" title="Renomear">✎</button></div></div>
    ${dias.length ? `<div class="daytabs">${dias.map((t) => `<button class="dtab ${t.id === r.dia ? "on" : ""}" data-dia="${t.id}">${esc(t.tab || t.nome)}</button>`).join("")}<button class="dtab add" id="addd2" title="Adicionar treino">＋</button></div>` : ""}
    ${dia ? `
      <div class="dayhead"><div class="col"><div class="exname" style="font-size:17px">${esc(dia.nome)}</div><div class="muted">${dia.exercicios.length} exercício${dia.exercicios.length === 1 ? "" : "s"}${wu.length ? " · aquecimento" : ""}</div></div><button class="btn text" id="editdia">editar</button><button class="mini" id="deldia" title="Excluir treino">🗑</button></div>
      ${wu.length ? `<div class="card"><div class="wu-head" id="wuh"><span>🔥 Aquecimento</span><span id="wuchev">▾</span></div><div class="wu-body" id="wub">${wu.map((w) => `<div><div class="wu-t">${esc(w.titulo)}</div>${w.desc ? `<div class="wu-d">${esc(w.desc)}</div>` : ""}</div>`).join("")}</div></div>` : ""}
      ${dia.exercicios.length ? dia.exercicios.map((e) => exCard(e)).join("") : `<div class="empty">Treino sem exercícios.<br><button class="btn ghost" id="addex" style="margin-top:10px">Adicionar exercícios</button></div>`}
    ` : `<div class="empty">Programa sem treinos ainda.<br><button class="btn ghost" id="addd" style="margin-top:10px">+ Adicionar treino</button></div>`}
    <div style="height:14px"></div>`;
  document.getElementById("bk").onclick = back;
  document.getElementById("editp").onclick = () => openSheet("Renomear programa", `<input class="field" id="pn" value="${esc(p.nome)}">`, [{ label: "Salvar", primary: true, onClick: () => { const v = document.getElementById("pn").value.trim(); if (v) { p.nome = v; save(); render(); } } }]);
  view().querySelectorAll("[data-dia]").forEach((b) => b.onclick = () => { r.dia = b.dataset.dia; r._scroll = 0; render(); });
  const addDia = () => { const id = uid(); DB.treinos.push({ id, perfil: PF(), programaId: p.id, nome: "Novo treino", tab: "", ordem: treinosDoPrograma(p.id).length, aquecimento: [], exercicios: [] }); save(); go({ name: "editor", id }); };
  const a1 = document.getElementById("addd"); if (a1) a1.onclick = addDia;
  const a2 = document.getElementById("addd2"); if (a2) a2.onclick = addDia;
  if (dia) {
    const ed = document.getElementById("editdia"); if (ed) ed.onclick = () => go({ name: "editor", id: dia.id });
    const dd = document.getElementById("deldia"); if (dd) dd.onclick = () => confirmar(`Excluir "${dia.nome}"?`, "O histórico de registros é mantido.", () => { DB.treinos = DB.treinos.filter((t) => t.id !== dia.id); r.dia = null; save(); render(); });
    const wuh = document.getElementById("wuh");
    if (wuh) wuh.onclick = () => { const b = document.getElementById("wub"); const open = b.style.display !== "none"; b.style.display = open ? "none" : "flex"; document.getElementById("wuchev").textContent = open ? "▸" : "▾"; };
    const ax = document.getElementById("addex"); if (ax) ax.onclick = () => go({ name: "editor", id: dia.id });
    view().querySelectorAll("[data-reg]").forEach((b) => b.onclick = () => modalRegistrar(dia.exercicios.find((e) => e.id === b.dataset.reg)));
    view().querySelectorAll("[data-hist]").forEach((b) => b.onclick = () => go({ name: "histex", exId: b.dataset.hist, nome: b.dataset.nome }));
  }
}
function exCard(e) {
  const regs = registrosDe(e.id); const sess = sessoes(regs); const ult = sess[0];
  const pr = recorde(regs); const up = sugereSubir(e, ult);
  const sub = [e.foco ? e.foco.toUpperCase() : "", descLabel(e.descansoSeg) ? "descanso " + descLabel(e.descansoSeg) : ""].filter(Boolean).join(" · ");
  return `<div class="card pad exitem" data-reg="${e.id}">
    <div class="row" style="align-items:flex-start"><div class="exname" style="flex:1">${esc(e.nome)}</div><div class="exsets">${esc(setsLabel(e))}</div></div>
    ${sub ? `<div class="exfoco">${esc(sub)}</div>` : ""}
    ${ult ? `<div class="exlast">Última (${fmtDiaMes(ult.dataMs)}): ${esc(resumoSets(ult.sets))}</div>${pr > 0 ? `<div class="muted">Recorde: ${fmtCarga(pr)} kg</div>` : ""}` : `<div class="exlast muted">Sem registros ainda</div>`}
    ${up ? `<div class="pill up">↗ Bateu o topo da faixa — pode subir a carga</div>` : ""}
    <div class="row" style="margin-top:8px;align-items:center"><span class="muted" style="flex:1;font-size:12px">Toque pra registrar →</span><button class="btn text" data-hist="${e.id}" data-nome="${esc(e.nome)}">Histórico</button></div>
  </div>`;
}

/* ---- Registrar (modal com steppers + ✓) ---- */
function modalRegistrar(e) {
  const ult = sessoes(registrosDe(e.id))[0];
  const n = Math.min(Math.max(ult ? ult.sets.length : e.series, 1), 12);
  const base = ult ? (ult.sets.find((s) => s.carga > 0) || {}).carga || 0 : 0;
  const repAlvo = e.repMax != null ? e.repMax : (e.repMin != null ? e.repMin : 0);
  const rows = [];
  for (let i = 0; i < n; i++) {
    const c = ult && ult.sets[i] ? ult.sets[i].carga : base;
    const rp = ult && ult.sets[i] ? ult.sets[i].reps : repAlvo;
    rows.push({ carga: c > 0 ? fmtCarga(c) : "0", reps: rp > 0 ? "" + rp : "0", done: false });
  }
  let rpe = "";
  function body() {
    return `<div class="muted">Alvo: ${esc(setsLabel(e))}</div>
      <div class="setcols" style="margin-top:8px"><div style="width:30px"></div><div class="c">Carga (kg)</div><div class="c">Reps</div><div style="width:40px"></div></div>
      <div id="rows">${rows.map((r, i) => setRowHtml(r, i)).join("")}</div>
      <div class="row" style="margin-top:8px"><button class="mini" id="less">−</button><button class="mini" id="more">+</button><div class="spacer"></div>
        <input class="field" id="rpe" placeholder="RPE" inputmode="numeric" style="width:90px;margin:0" value="${rpe}"></div>`;
  }
  function setRowHtml(r, i) {
    return `<div class="setrow ${r.done ? "done" : ""}" data-i="${i}"><div class="sn">S${i + 1}</div>
      <div class="stepper"><button class="step" data-dec="c">−</button><input class="stepval" data-v="c" inputmode="decimal" value="${r.carga}"><button class="step" data-inc="c">+</button></div>
      <div class="stepper"><button class="step" data-dec="r">−</button><input class="stepval" data-v="r" inputmode="numeric" value="${r.reps}"><button class="step" data-inc="r">+</button></div>
      <button class="check ${r.done ? "on" : ""}" data-chk>✓</button></div>`;
  }
  function toSave() {
    const marc = rows.map((r, i) => i).filter((i) => rows[i].done && (parseInt(rows[i].reps) || 0) > 0);
    const idx = marc.length ? marc : rows.map((r, i) => i).filter((i) => (parseInt(rows[i].reps) || 0) > 0);
    return idx;
  }
  const m = openSheet("Registrar — " + esc(e.nome), body(), [
    { label: "Salvar", primary: true, keep: true, onClick: () => {
      const idx = toSave(); if (!idx.length) return;
      const now = Date.now();
      idx.forEach((i, k) => DB.registros.push({ id: uid(), perfil: PF(), exercicioId: e.id, exercicioNome: e.nome, dataMs: now, serieIndex: k + 1, carga: parseFloat((rows[i].carga || "0").replace(",", ".")) || 0, reps: parseInt(rows[i].reps) || 0, rpe: (parseInt(rpe) || 0) >= 1 && (parseInt(rpe) || 0) <= 10 ? parseInt(rpe) : null }));
      save(); closeSheet(); toast("Sessão registrada"); render();
    } },
  ]);
  function rewire() {
    const rpeI = m.querySelector("#rpe"); if (rpeI) rpeI.oninput = () => rpe = rpeI.value;
    m.querySelectorAll(".setrow").forEach((row) => {
      const i = +row.dataset.i;
      row.querySelectorAll(".stepval").forEach((inp) => inp.oninput = () => { rows[i][inp.dataset.v === "c" ? "carga" : "reps"] = inp.value; });
      row.querySelectorAll("[data-dec],[data-inc]").forEach((btn) => btn.onclick = () => {
        const field = (btn.dataset.dec || btn.dataset.inc) === "c" ? "carga" : "reps";
        const step = field === "carga" ? 5 : 1; const dir = btn.hasAttribute("data-inc") ? 1 : -1;
        let v = parseFloat((rows[i][field] || "0").replace(",", ".")) || 0; v = Math.max(0, v + dir * step);
        rows[i][field] = field === "carga" ? fmtCarga(v) : "" + Math.round(v);
        row.querySelector(`.stepval[data-v="${field === "carga" ? "c" : "r"}"]`).value = rows[i][field];
      });
      row.querySelector("[data-chk]").onclick = () => { rows[i].done = !rows[i].done; row.classList.toggle("done", rows[i].done); row.querySelector(".check").classList.toggle("on", rows[i].done); updateSalvar(); };
    });
    document.getElementById("less").onclick = () => { if (rows.length > 1) { rows.pop(); redraw(); } };
    document.getElementById("more").onclick = () => { const last = rows[rows.length - 1]; rows.push({ carga: last ? last.carga : "0", reps: last ? last.reps : "0", done: false }); redraw(); };
  }
  function redraw() { m.querySelector("#rows").innerHTML = rows.map((r, i) => setRowHtml(r, i)).join(""); rewire(); updateSalvar(); }
  function updateSalvar() { const n = toSave().length; const b = m.querySelector(".sheet-save"); if (b) { b.textContent = n ? "Salvar " + n + " série" + (n > 1 ? "s" : "") : "Salvar"; b.disabled = !n; } }
  rewire(); updateSalvar();
}

/* ---- Editor (builder) ---- */
function renderEditor(r) {
  const t = treinoPorId(r.id); if (!t) return back();
  view().innerHTML = `
    <div class="hd"><div class="hd-row"><button class="backbtn" id="bk">‹</button><span class="title">Editar treino</span></div></div>
    <input class="field" id="nome" placeholder="Nome do treino" value="${esc(t.nome)}">
    <input class="field" id="tab" placeholder="Sigla (ex: SEG)" value="${esc(t.tab)}" maxlength="6">
    <div class="sectlbl">Aquecimento <span style="float:right"><button class="btn text" id="addwu">+ adicionar</button></span></div>
    <div id="wulist">${(t.aquecimento || []).map((w, i) => `<div class="card erow"><div class="col" style="flex:1"><div class="en">${esc(w.titulo)}</div>${w.desc ? `<div class="es">${esc(w.desc)}</div>` : ""}</div><button class="mini" data-wuedit="${i}">✎</button><button class="mini" data-wudel="${i}">🗑</button></div>`).join("")}</div>
    <div class="sectlbl">Exercícios <span style="float:right"><button class="btn text" id="addex">+ adicionar</button></span></div>
    <div id="exlist">${t.exercicios.map((e, i) => `<div class="card erow"><div class="col" style="flex:1"><div class="en">${esc(e.nome)}</div><div class="es">${esc(setsLabel(e))}${e.foco ? " · " + esc(e.foco) : ""}</div></div>
      <button class="mini" data-up="${i}" ${i === 0 ? "disabled" : ""}>↑</button><button class="mini" data-down="${i}" ${i === t.exercicios.length - 1 ? "disabled" : ""}>↓</button>
      <button class="mini" data-exedit="${e.id}">✎</button><button class="mini" data-exdel="${e.id}">🗑</button></div>`).join("")}</div>
    <button class="btn ghost" id="addex2" style="width:100%;margin-top:6px">+ Adicionar exercício</button>
    <div style="height:16px"></div>`;
  document.getElementById("bk").onclick = back;
  const persist = () => { save(); };
  document.getElementById("nome").oninput = (ev) => { t.nome = ev.target.value; persist(); };
  document.getElementById("tab").oninput = (ev) => { t.tab = ev.target.value.toUpperCase(); persist(); };
  document.getElementById("addwu").onclick = () => modalAquecimento(null, (a) => { t.aquecimento.push(a); save(); render(); });
  view().querySelectorAll("[data-wuedit]").forEach((b) => b.onclick = () => { const i = +b.dataset.wuedit; modalAquecimento(t.aquecimento[i], (a) => { t.aquecimento[i] = a; save(); render(); }); });
  view().querySelectorAll("[data-wudel]").forEach((b) => b.onclick = () => { t.aquecimento.splice(+b.dataset.wudel, 1); save(); render(); });
  const addEx = () => modalExercicio(null, (dto) => { t.exercicios.push(Object.assign({ id: uid() }, dto)); save(); render(); });
  document.getElementById("addex").onclick = addEx; document.getElementById("addex2").onclick = addEx;
  view().querySelectorAll("[data-exedit]").forEach((b) => b.onclick = () => { const e = t.exercicios.find((x) => x.id === b.dataset.exedit); modalExercicio(e, (dto) => { Object.assign(e, dto); save(); render(); }); });
  view().querySelectorAll("[data-exdel]").forEach((b) => b.onclick = () => { t.exercicios = t.exercicios.filter((x) => x.id !== b.dataset.exdel); save(); render(); });
  view().querySelectorAll("[data-up]").forEach((b) => b.onclick = () => { const i = +b.dataset.up; [t.exercicios[i - 1], t.exercicios[i]] = [t.exercicios[i], t.exercicios[i - 1]]; save(); render(); });
  view().querySelectorAll("[data-down]").forEach((b) => b.onclick = () => { const i = +b.dataset.down; [t.exercicios[i + 1], t.exercicios[i]] = [t.exercicios[i], t.exercicios[i + 1]]; save(); render(); });
}
function modalExercicio(e, onOk) {
  const g = (id) => document.getElementById(id).value.trim();
  const b = `<input class="field" id="e_nome" placeholder="Nome" value="${e ? esc(e.nome) : ""}">
    <div class="row"><input class="field" id="e_series" placeholder="Séries" inputmode="numeric" value="${e ? e.series : 3}"><input class="field" id="e_desc" placeholder="Descanso (s)" inputmode="numeric" value="${e ? e.descansoSeg : 0}"></div>
    <div class="row"><input class="field" id="e_rmin" placeholder="Rep mín" inputmode="numeric" value="${e && e.repMin != null ? e.repMin : ""}"><input class="field" id="e_rmax" placeholder="Rep máx" inputmode="numeric" value="${e && e.repMax != null ? e.repMax : ""}"></div>
    <input class="field" id="e_rtxt" placeholder="ou reps livre (ex: 30-45s, 10/perna)" value="${e && e.repTexto ? esc(e.repTexto) : ""}">
    <input class="field" id="e_foco" placeholder="Foco (ex: Força, Massa)" value="${e ? esc(e.foco) : ""}">`;
  openSheet(e ? "Editar exercício" : "Novo exercício", b, [{ label: "Salvar", primary: true, onClick: () => {
    const nome = g("e_nome"); if (!nome) return;
    const foco = g("e_foco");
    onOk({ nome, series: parseInt(g("e_series")) || 0, repMin: g("e_rmin") ? parseInt(g("e_rmin")) : null, repMax: g("e_rmax") ? parseInt(g("e_rmax")) : null, repTexto: g("e_rtxt") || null, foco, descansoSeg: parseInt(g("e_desc")) || 0 });
  } }]);
}
function modalAquecimento(w, onOk) {
  const b = `<input class="field" id="w_t" placeholder="Título" value="${w ? esc(w.titulo) : ""}"><textarea class="field" id="w_d" placeholder="Descrição">${w ? esc(w.desc) : ""}</textarea>`;
  openSheet(w ? "Editar aquecimento" : "Novo aquecimento", b, [{ label: "Salvar", primary: true, onClick: () => {
    const t = document.getElementById("w_t").value.trim(); if (!t) return; onOk({ titulo: t, desc: document.getElementById("w_d").value.trim() });
  } }]);
}

/* ---- Histórico do exercício ---- */
function renderHistEx(r) {
  const regs = registrosDe(r.exId); const sess = sessoes(regs); const pr = recorde(regs);
  const dados = sess.slice().reverse().slice(-10); const max = Math.max(1, ...dados.map((s) => Math.max(0, ...s.sets.map((x) => x.carga))));
  view().innerHTML = `
    <div class="hd"><div class="hd-row"><button class="backbtn" id="bk">‹</button><div class="col"><span class="eyebrow">Histórico</span><span class="title">${esc(r.nome || "Exercício")}</span></div></div></div>
    <div class="stats"><div class="stat"><div class="v">${pr > 0 ? fmtCarga(pr) + " kg" : "—"}</div><div class="l">Recorde</div></div><div class="stat"><div class="v">${sess.length}</div><div class="l">Sessões</div></div></div>
    ${dados.length >= 2 ? `<div class="card pad"><div class="lbl">Carga máxima por sessão</div><div class="bars">${dados.map((s) => { const c = Math.max(0, ...s.sets.map((x) => x.carga)); return `<div class="bar" style="height:${Math.max(8, c / max * 100)}%" title="${fmtCarga(c)}kg"></div>`; }).join("")}</div></div>` : ""}
    ${sess.length ? sess.map((s) => `<div class="card erow"><div class="col" style="flex:1"><div class="es" style="color:var(--accent);font-weight:700">${fmtData(s.dataMs)}</div><div class="en" style="font-weight:600">${esc(resumoSets(s.sets))}</div>${s.sets.find((x) => x.rpe) ? `<div class="es">RPE ${s.sets.find((x) => x.rpe).rpe}</div>` : ""}</div><button class="mini" data-delses="${s.dataMs}">🗑</button></div>`).join("") : `<div class="empty">Nenhuma sessão registrada.</div>`}
    <div style="height:16px"></div>`;
  document.getElementById("bk").onclick = back;
  view().querySelectorAll("[data-delses]").forEach((b) => b.onclick = () => { const ms = +b.dataset.delses; DB.registros = DB.registros.filter((x) => !(x.exercicioId === r.exId && x.perfil === PF() && x.dataMs === ms)); save(); render(); });
}

/* ---- Histórico geral ---- */
function renderHistGeral() {
  const regs = DB.registros.filter((r) => r.perfil === PF());
  const byDay = {};
  regs.forEach((r) => { const k = epochDay(r.dataMs); (byDay[k] = byDay[k] || []).push(r); });
  const dias = Object.keys(byDay).map((k) => {
    const arr = byDay[k]; const byEx = {};
    arr.forEach((r) => { (byEx[r.exercicioId] = byEx[r.exercicioId] || []).push(r); });
    const exercicios = Object.values(byEx).map((rs) => ({ nome: rs[0].exercicioNome, sets: rs.sort((a, b) => a.serieIndex - b.serieIndex).map((r) => ({ carga: r.carga, reps: r.reps })) }));
    return { dataMs: Math.max(...arr.map((r) => r.dataMs)), exercicios };
  }).sort((a, b) => b.dataMs - a.dataMs);
  view().innerHTML = `
    <div class="hd"><div class="col"><span class="eyebrow">Histórico</span><span class="h1">Seus treinos</span></div></div>
    ${perfilSwitchHtml()}
    ${dias.length ? dias.map((d) => `<div class="card pad"><div class="row"><div class="es" style="color:var(--accent);font-weight:700;flex:1">${fmtData(d.dataMs)}</div><div class="muted">${d.exercicios.length} exercícios</div></div>
      <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px">${d.exercicios.map((e) => `<div><div class="en" style="font-weight:600">${esc(e.nome)}</div><div class="es">${esc(resumoSets(e.sets))}</div></div>`).join("")}</div></div>`).join("") : `<div class="empty">Nenhum treino registrado ainda.</div>`}
    <div style="height:8px"></div>`;
  wirePerfil();
}

/* ---- Exercícios (catálogo) ---- */
function catCard(e) {
  return `<div class="card pad">
    <div class="exname">${esc(e.nome)}</div>
    <div class="exfoco">${esc(e.grupo)}</div>
    <div class="exlast" style="margin-top:6px">${esc(e.como)}</div>
  </div>`;
}
function renderExercicios() {
  const q = norm(exBusca);
  let lista = CATALOGO.filter((e) => !exGrupo || e.grupo === exGrupo);
  if (q) lista = lista.filter((e) => norm(e.nome).includes(q) || norm(e.grupo).includes(q));
  const grupos = ORDEM_GRUPOS.filter((g) => lista.some((e) => e.grupo === g));
  view().innerHTML = `
    <div class="hd"><div class="col"><span class="eyebrow">Catálogo</span><span class="h1">Exercícios</span></div></div>
    <input class="field" id="exq" placeholder="Buscar exercício…" value="${esc(exBusca)}">
    <div class="chips" style="margin:10px 0 4px">
      <span class="chip ${!exGrupo ? "on" : ""}" data-g="">Todos</span>
      ${ORDEM_GRUPOS.map((g) => `<span class="chip ${exGrupo === g ? "on" : ""}" data-g="${esc(g)}">${esc(g)}</span>`).join("")}
    </div>
    ${lista.length ? grupos.map((g) => `<div class="sectlbl">${esc(g)} · ${lista.filter((e) => e.grupo === g).length}</div>` + lista.filter((e) => e.grupo === g).map((e) => catCard(e)).join("")).join("") : `<div class="empty">Nenhum exercício encontrado.</div>`}
    <div style="height:10px"></div>`;
  const inp = document.getElementById("exq");
  inp.oninput = () => { const pos = inp.selectionStart; exBusca = inp.value; renderExercicios(); const n = document.getElementById("exq"); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (e) {} } };
  view().querySelectorAll("[data-g]").forEach((b) => b.onclick = () => { exGrupo = b.dataset.g; renderExercicios(); });
}

/* ---- Programas (biblioteca) ---- */
function renderProgramas() {
  const meus = programasDoPerfil();
  view().innerHTML = `
    <div class="hd"><div class="col"><span class="eyebrow">Programas</span><span class="h1">Programas</span></div></div>
    ${perfilSwitchHtml()}
    <button class="btn primary big" id="criar" style="margin-bottom:8px">+ Criar programa</button>
    ${meus.length ? `<div class="sectlbl">Seus programas</div>` + meus.map((p) => {
      const dias = treinosDoPrograma(p.id);
      return `<div class="card pad">
        <div class="col"><div class="exname">${esc(p.nome)}</div><div class="muted">${dias.length} treino${dias.length === 1 ? "" : "s"}</div></div>
        <div class="btnrow"><button class="btn primary" data-abrir="${p.id}" style="flex:1">Abrir</button><button class="btn text" data-ren="${p.id}">Renomear</button><button class="btn text" data-delp="${p.id}">Excluir</button></div></div>`;
    }).join("") : ""}
    <div class="sectlbl">Modelos prontos</div>
    ${TEMPLATES.map((p, i) => `<div class="card pad"><div class="exname" style="font-weight:700">${esc(p.nome)}</div><div class="muted">${p.treinos.length} treinos</div>
      <div class="chips" style="margin:10px 0">${p.treinos.map((t) => `<span class="chip">${esc(t.tab || t.nome)}</span>`).join("")}</div>
      <button class="btn ghost" data-use="${i}" style="width:100%">Usar este programa</button></div>`).join("")}
    <div style="height:8px"></div>`;
  wirePerfil();
  document.getElementById("criar").onclick = () => { const id = criarProgramaVazio(PF(), "Novo programa"); save(); go({ name: "programa", id }); };
  view().querySelectorAll("[data-abrir]").forEach((b) => b.onclick = () => go({ name: "programa", id: b.dataset.abrir }));
  view().querySelectorAll("[data-ren]").forEach((b) => b.onclick = () => { const p = programaPorId(b.dataset.ren); openSheet("Renomear programa", `<input class="field" id="pn" value="${esc(p.nome)}">`, [{ label: "Salvar", primary: true, onClick: () => { const v = document.getElementById("pn").value.trim(); if (v) { p.nome = v; save(); render(); } } }]); });
  view().querySelectorAll("[data-delp]").forEach((b) => b.onclick = () => { const p = programaPorId(b.dataset.delp); confirmar(`Excluir "${p.nome}"?`, "Os treinos do programa serão removidos (o histórico é mantido).", () => { DB.treinos = DB.treinos.filter((t) => t.programaId !== p.id); DB.programas = DB.programas.filter((x) => x.id !== p.id); save(); render(); }); });
  view().querySelectorAll("[data-use]").forEach((b) => b.onclick = () => { const pid = importarPrograma(TEMPLATES[+b.dataset.use], PF(), true); save(); toast("Programa criado"); go({ name: "programa", id: pid }); });
}

/* ---- Ajustes ---- */
function renderSettings() {
  view().innerHTML = `
    <div class="hd"><div class="hd-row"><button class="backbtn" id="bk">‹</button><span class="title">Configurações</span></div></div>
    <div class="sectlbl">Backup</div>
    <div class="muted" style="margin-bottom:8px">Exporta ou importa seus treinos como JSON.</div>
    <button class="btn ghost" id="exp" style="width:100%;margin-bottom:8px">↓ Exportar treinos</button>
    <button class="btn ghost" id="imp" style="width:100%">↑ Importar treinos</button>
    <input type="file" id="fileimp" accept="application/json,.json" style="display:none">
    <div class="sectlbl">Dados</div>
    <button class="btn ghost" id="zerar" style="width:100%;color:var(--red)">Zerar dados (voltar aos modelos)</button>
    <div class="muted" style="margin-top:6px">Apaga seus modelos e histórico e recarrega os 2 modelos limpos. Não dá pra desfazer.</div>
    <div class="footnote">Treino · app local (PWA). A sincronização entre aparelhos chega com a API (Etapa 2).</div>`;
  document.getElementById("bk").onclick = back;
  document.getElementById("zerar").onclick = () => confirmar("Zerar todos os dados?", "Apaga seus modelos e histórico e recarrega os 2 modelos limpos. Não dá pra desfazer.", () => { zerarDados(); toast("Dados apagados"); setTab("inicio"); });
  document.getElementById("exp").onclick = () => {
    const prog = { nome: "Programa", treinos: treinosDoPerfil().map((t) => ({ nome: t.nome, tab: t.tab, aquecimento: t.aquecimento, exercicios: t.exercicios.map((e) => ({ nome: e.nome, series: e.series, repMin: e.repMin, repMax: e.repMax, repTexto: e.repTexto, foco: e.foco, descansoSeg: e.descansoSeg })) })) };
    const blob = new Blob([JSON.stringify({ app: "treino", versao: 1, perfil: PF(), programa: prog }, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "treino-" + PF() + ".json"; a.click(); toast("Treinos exportados");
  };
  const fi = document.getElementById("fileimp");
  document.getElementById("imp").onclick = () => fi.click();
  fi.onchange = () => { const f = fi.files[0]; if (!f) return; const rd = new FileReader(); rd.onload = () => {
    try { const o = JSON.parse(rd.result); const prog = o.programa || o; importarPrograma(prog, PF()); save(); toast("Importados " + prog.treinos.length + " treinos"); render(); }
    catch (e) { toast("JSON inválido"); } }; rd.readAsText(f); };
}

/* ---- Sheet / confirm ---- */
function openSheet(title, bodyHtml, actions) {
  const root = document.getElementById("modal-root");
  const ov = document.createElement("div"); ov.className = "overlay";
  ov.innerHTML = `<div class="sheet"><div class="sheet-hd"><span class="sheet-title">${title}</span><button class="x" data-close>✕</button></div><div class="sheet-body">${bodyHtml}</div>
    <div class="btnrow" style="margin-top:14px">${actions.map((a, i) => `<button class="btn ${a.primary ? "primary" : "ghost"} ${a.primary ? "sheet-save" : ""}" data-a="${i}">${a.label}</button>`).join("")}</div></div>`;
  root.appendChild(ov);
  ov.addEventListener("click", (e) => { if (e.target === ov) closeSheet(); });
  ov.querySelector("[data-close]").onclick = closeSheet;
  actions.forEach((a, i) => ov.querySelector(`[data-a="${i}"]`).onclick = () => { a.onClick(); if (!a.keep) closeSheet(); });
  return ov.querySelector(".sheet");
}
function closeSheet() { const root = document.getElementById("modal-root"); if (root.lastChild) root.removeChild(root.lastChild); }
function confirmar(title, msg, onYes) {
  openSheet(title, `<div class="muted">${msg}</div>`, [{ label: "Cancelar", onClick: () => {} }, { label: "Excluir", primary: true, onClick: onYes }]);
}

/* ---- Tema ---- */
function applyTheme() {
  const t = DB.settings.tema;
  const dark = t === "escuro" || (t === "sistema" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.body.classList.toggle("light", !dark);
  document.querySelector('meta[name="theme-color"]').setAttribute("content", dark ? "#0F1115" : "#F6F7F9");
}

/* ---- Boot ---- */
load(); seedIfNeeded();
render();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
