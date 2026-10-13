"use strict";

/* ---------- Constantes ---------- */
const PERFIS = [
  { id: "sergio", nome: "Sérgio", accent: "#4F8CFF" },
  { id: "clara", nome: "Clara", accent: "#3DDC97" },
];
const perfil = (id) => PERFIS.find((p) => p.id === id) || PERFIS[0];
const MULTI = true; // Sérgio + Clara

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
const imgFor = (nome) => IMG[norm(nome)] || null;

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
        ex("Mesa flexora", 3, 12, 12, null, "Posterior"),
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
      ]},
    ],
  };
}
function programaClara() {
  const mob = { titulo: "Mobilidade", desc: "90/90 de quadril, agachamento profundo apoiado, gato-camelo, rotação torácica e tornozelo — ~8 min." };
  const aq = { titulo: "Aquecimento", desc: "5 min de bike/esteira leve + mobilidade de quadril e ombro." };
  return {
    nome: "Clara — Emagrecimento & Lombar (5 dias)",
    treinos: [
      { nome: "Força A (full body)", tab: "D1", aquecimento: [aq], exercicios: [
        ex("Agachamento búlgaro com halteres", 3, null, null, "10 / perna", "Unilateral"),
        ex("Elevação pélvica (hip thrust)", 3, 12, 12, null, "Glúteo"),
        ex("Supino na máquina", 3, 12, 12, null, "Peito"),
        ex("Puxada alta (pulldown)", 3, 12, 12, null, "Costas"),
        ex("Dead bug", 3, null, null, "10 / lado", "Core"),
      ]},
      { nome: "Funcional (mobilidade + pliometria + cardio)", tab: "D2", aquecimento: [mob], exercicios: [
        ex("Step-up com impulso", 3, null, null, "8 / perna", "Pliometria"),
        ex("Skater lateral", 3, null, null, "10 / lado", "Pliometria"),
        ex("Saltinhos no lugar (pogo)", 3, null, null, "20s", "Pliometria"),
        ex("Arremesso de medicine ball", 3, 8, 8, null, "Potência"),
        ex("Cardio intervalado (1min forte / 2min leve)", 1, null, null, "12-15 min", "Cardio"),
      ]},
      { nome: "Força B (full body)", tab: "D3", aquecimento: [aq], exercicios: [
        ex("Afundo (lunge) andando", 3, null, null, "10 / perna", "Unilateral"),
        ex("Mesa flexora", 3, 12, 12, null, "Posterior"),
        ex("Desenvolvimento na máquina", 3, 12, 12, null, "Ombro"),
        ex("Remada baixa na polia", 3, 12, 12, null, "Costas"),
        ex("Prancha lateral", 3, null, null, "20-30s / lado", "Core"),
      ]},
      { nome: "Funcional (mobilidade + pliometria + cardio)", tab: "D4", aquecimento: [mob], exercicios: [
        ex("Step-up com impulso", 3, null, null, "8 / perna", "Pliometria"),
        ex("Skater lateral", 3, null, null, "10 / lado", "Pliometria"),
        ex("Elevação de joelhos (marcha)", 3, null, null, "30s", "Cardio"),
        ex("Arremesso de medicine ball (rotacional)", 3, null, null, "8 / lado", "Potência"),
        ex("Cardio intervalado (1min forte / 2min leve)", 1, null, null, "12-15 min", "Cardio"),
      ]},
      { nome: "Força C (full body) + core", tab: "D5", aquecimento: [aq], exercicios: [
        ex("Leg press", 3, 12, 12, null, "Pernas"),
        ex("Extensão lombar 45° (peso do corpo)", 3, 12, 12, null, "Lombar"),
        ex("Supino inclinado com halteres", 3, 12, 12, null, "Peito"),
        ex("Barra fixa ou puxada (pegada neutra)", 3, 12, 12, null, "Costas"),
        ex("Press Pallof (anti-rotação)", 3, null, null, "10 / lado", "Core"),
        ex("Bird-dog", 3, null, null, "8 / lado", "Core"),
      ]},
    ],
  };
}
const TEMPLATES = [programaClara(), programaV2(), programaBase()];

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
  if (!MULTI) DB.settings.perfilAtivo = "sergio";
  migrarProgramas();
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
  if (!DB.settings.seeded && !DB.treinos.length) {
    importarPrograma(programaBase(), "sergio");
  }
  DB.settings.seeded = true; save();
}

/* ---------- Helpers de domínio ---------- */
const PF = () => DB.settings.perfilAtivo;
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
const TABS = ["inicio", "programas", "historico"];
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
  const cfg = ESTILOS[estilo()];
  document.body.dataset.estilo = estilo();
  const ds = document.documentElement.style;
  ds.setProperty("--accent", cfg.accent); ds.setProperty("--accent-ink", cfg.accentInk);
  const tc = document.querySelector('meta[name="theme-color"]'); if (tc) tc.setAttribute("content", cfg.bg);
  const r = route();
  const nav = document.getElementById("bottomnav");
  const isTab = TABS.includes(r.name);
  nav.style.display = isTab ? "flex" : "none";
  if (isTab) renderNav(r.name);
  const fn = { inicio: renderInicio, programas: renderProgramas, programa: renderProgramaDias, historico: renderHistGeral, editor: renderEditor, histex: renderHistEx, settings: renderSettings }[r.name];
  fn(r);
  view().scrollTop = r._scroll || 0;
}

function renderNav(active) {
  const label = { inicio: "Início", programas: "Programas", historico: "Histórico" };
  const icon = { inicio: ICON.inicio, programas: ICON.modelos, historico: ICON.historico };
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

function renderInicio() {
  const { prog, dia } = continuarAlvo();
  const allr = DB.registros.filter((r) => r.perfil === PF());
  const lastMs = allr.length ? Math.max(...allr.map((r) => r.dataMs)) : null;
  const r7 = allr.filter((r) => r.dataMs >= Date.now() - 7 * 864e5);
  const dias7 = new Set(r7.map((r) => epochDay(r.dataMs))).size;
  let cont;
  if (prog && dia) {
    const n = dia.exercicios.length, mins = estMin(dia);
    const img = dia.exercicios[0] ? imgFor(dia.exercicios[0].nome) : null;
    const bg = img ? ` style="background-image:linear-gradient(170deg,rgba(0,0,0,.30),rgba(0,0,0,.82)),url('${img}')"` : "";
    cont = `<div class="continuar${img ? " hasimg" : ""}"${bg}>
      <div class="cont-eyebrow">Continuar</div>
      <div class="cont-title">${esc(dia.nome)}</div>
      <div class="cont-meta">${esc(prog.nome)} · ${n} exercício${n === 1 ? "" : "s"} · ~${mins} min</div>
      <button class="btn primary big" id="treinar">Treinar</button>
    </div>`;
  } else {
    cont = `<div class="card pad empty">Você ainda não tem um programa.<br><button class="btn primary" id="verprog" style="margin-top:12px">Escolher um programa</button></div>`;
  }
  view().innerHTML = `
    <div class="hd"><div class="hd-row"><div class="col"><span class="greet">${esc(cap(hojeLabel()))}</span><span class="h1">Olá, ${perfil(PF()).nome}</span></div><div class="spacer"></div><button class="iconbtn" id="cfg">${ICON.gear}</button></div></div>
    ${perfilSwitchHtml()}
    ${cont}
    <div class="weekline">Esta semana · ${dias7} treino${dias7 === 1 ? "" : "s"}${lastMs ? ` · último em ${fmtData(lastMs)}` : ""}</div>
    <button class="card pad lastrow" id="verprog2"><div class="col" style="flex:1;text-align:left"><div class="exname">Meus programas</div><div class="muted">ver todos e trocar de ciclo</div></div><span class="chev">›</span></button>
    ${lastMs ? `<button class="card pad lastrow" id="verhist"><div class="col" style="flex:1;text-align:left"><div class="exname">Histórico</div><div class="muted">seus treinos registrados</div></div><span class="chev">›</span></button>` : ""}
    <div style="height:8px"></div>`;
  wirePerfil();
  document.getElementById("cfg").onclick = () => go({ name: "settings" });
  const tr = document.getElementById("treinar"); if (tr) tr.onclick = () => go({ name: "programa", id: prog.id, dia: dia.id });
  const vp = document.getElementById("verprog"); if (vp) vp.onclick = () => setTab("programas");
  const vp2 = document.getElementById("verprog2"); if (vp2) vp2.onclick = () => setTab("programas");
  const vh = document.getElementById("verhist"); if (vh) vh.onclick = () => setTab("historico");
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
  return `<div class="card pad">
    <div class="exhead">${imgHtml(e.nome, "eximg")}<div class="col" style="flex:1">
      <div class="row" style="align-items:flex-start"><div class="exname" style="flex:1">${esc(e.nome)}</div><div class="exsets">${esc(setsLabel(e))}</div></div>
      ${sub ? `<div class="exfoco">${esc(sub)}</div>` : ""}</div></div>
    ${ult ? `<div class="exlast">Última (${fmtDiaMes(ult.dataMs)}): ${esc(resumoSets(ult.sets))}</div>${pr > 0 ? `<div class="muted">Recorde: ${fmtCarga(pr)} kg</div>` : ""}` : `<div class="exlast muted">Sem registros ainda</div>`}
    ${up ? `<div class="pill up">↗ Bateu o topo da faixa — pode subir a carga</div>` : ""}
    <div class="btnrow"><button class="btn ghost" data-reg="${e.id}">Registrar</button><button class="btn text" data-hist="${e.id}" data-nome="${esc(e.nome)}">Histórico</button></div>
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
    return `${imgBig(e.nome)}
      <div style="height:10px"></div>
      <div class="muted">Alvo: ${esc(setsLabel(e))}</div>
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
    <div class="sectlbl">Estilo visual</div>
    <div class="card">${Object.entries(ESTILOS).map(([k, s]) => `<div class="radio ${estilo() === k ? "on" : ""}" data-estilo="${k}"><span class="r"></span><div class="col"><span>${s.nome}</span><span class="muted" style="font-size:11.5px">${s.vibe}</span></div></div>`).join("")}</div>
    <div class="sectlbl">Backup (perfil ${perfil(PF()).nome})</div>
    <div class="muted" style="margin-bottom:8px">Exporta ou importa os treinos do perfil ativo como JSON.</div>
    <button class="btn ghost" id="exp" style="width:100%;margin-bottom:8px">↓ Exportar treinos</button>
    <button class="btn ghost" id="imp" style="width:100%">↑ Importar treinos</button>
    <input type="file" id="fileimp" accept="application/json,.json" style="display:none">
    <div class="footnote">Treino · app local (PWA). A sincronização entre aparelhos chega com a API (Etapa 2).</div>`;
  document.getElementById("bk").onclick = back;
  view().querySelectorAll("[data-estilo]").forEach((el) => el.onclick = () => { DB.settings.estilo = el.dataset.estilo; save(); render(); });
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
if (!DB.settings.claraSeeded) { importarPrograma(programaClara(), "clara"); DB.settings.claraSeeded = true; save(); }
render();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
