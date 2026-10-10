# Treino — versão Web (PWA)

Cliente web instalável (iPhone/Android/desktop) com **paridade** ao app Android. Projeto separado, não encosta no APK. Dados locais (localStorage), preparado pra plugar na API (Etapa 2).

## Como funciona
- `index.html` + `styles.css` + `app.js` (vanilla JS, sem framework) + `sw.js` (offline) + `manifest.webmanifest` + `icons/`.
- Imagens de exercício em `img/exercicios/` (mesmas 44 do APK).
- Dados em `localStorage` (chave `treino-web`): treinos, registros, settings (perfilAtivo, tema, seeded, ativo).
- Seed inicial = programa base nos dois perfis; TEMPLATES = v2 + base.

## Paridade (feito e testado no navegador)
Abas Início/Treinos/Modelos/Histórico; lobby com stats + **pizza** (conic-gradient) + treino ativo; detalhe com **imagem + aquecimento + registrar + histórico + estrela(ativo)**; **registrar com steppers (carga +5, reps +1) + ✓ por série**; builder (nome/sigla, aquecimento, exercícios add/editar/reordenar); histórico por exercício (PR + barras) e geral; modelos; ajustes (tema + exportar/importar JSON).

## Rodar local
`cd treino-web && python -m http.server 8777` → http://localhost:8777

## Instalar no iPhone
Precisa de HTTPS → **GitHub Pages** (repo público) ou outro host estático. Depois: Safari → Compartilhar → "Adicionar à Tela de Início".

## Perfil único + redesign (feito)
- `MULTI = false` em `app.js`: só o perfil **Sérgio** na UI (sem switch). Clara exportada em `..\clara-standby.json` (BackupDTO) pra importar no futuro quando reativar multi-perfil.
- **Redesign visual** (menos "cara de IA"): tipografia/hierarquia mais fortes, cards sem borda (elevação por cor), **hero** do treino ativo com gradiente + miniaturas das fotos + "Começar treino", seção **Esta semana** (X/Y treinos + barra + volume), **Último treino**. Removida a pizza de foco (decorativa). CSS reescrito com tokens novos; tema claro refinado.

## Estilos visuais trocáveis (feito)
Configurações → **Estilo visual**, 4 linguagens (não só paleta): **Editorial** (tipografia grande, minimal, azul), **Painel atlético** (anel + métricas, verde), **Imersivo** (foto do 1º exercício em tela cheia, coral), **Neo-brutalista** (cream, bordas grossas + sombras duras, azul/amarelo). `ESTILOS` em `app.js`; cada estilo tem paleta + hero próprio (`heroHtml`), e CSS por `body[data-estilo="..."]`. Default `editorial`. Removido o toggle de tema (cada estilo carrega claro/escuro). Testado nos 4 no navegador.

## Pendente
- **Portar os 4 estilos pro Android** (próximo passo — mesma lógica de seletor + skins no Compose).
- Deploy (GitHub Pages) pra instalar no iPhone.
- Exercícios sem imagem: bird-dog, landmine press, wall slide, farmer's walk.
- Etapa 2: API + login + sync (Android + web + Personal).
