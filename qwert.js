const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Who Speaks Matters";

// Color palette: dark purple/black theme
const BG_DARK    = "0D0D1A";   // near-black with purple tint
const BG_CARD    = "1A1A2E";   // card background
const BG_ACCENT  = "16213E";   // slightly lighter
const PURPLE     = "7B2FBE";   // main purple
const PURPLE_LT  = "9B51E0";   // lighter purple accent
const VIOLET     = "C084FC";   // highlight / emphasis
const WHITE      = "FFFFFF";
const OFFWHITE   = "E2D9F3";
const MUTED      = "9B8EC4";
const YELLOW     = "F59E0B";   // callout color
const GREEN      = "10B981";   // positive markers

// Helper: slide background
function darkBg(slide) {
  slide.background = { color: BG_DARK };
}

// Helper: small label tag
function tag(slide, text, x, y, color = PURPLE) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: text.length * 0.09 + 0.3, h: 0.28,
    fill: { color }, line: { color, width: 0 }
  });
  slide.addText(text, {
    x, y, w: text.length * 0.09 + 0.3, h: 0.28,
    fontSize: 9, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0
  });
}

// Helper: card shape
function card(slide, x, y, w, h, fillColor = BG_CARD) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: fillColor },
    line: { color: PURPLE, width: 1 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.4 }
  });
}

// ─────────────────────────────────────────────
// SLIDE 1 — Title Slide
// ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);

  // Big decorative circle (bg element)
  slide.addShape(pres.shapes.OVAL, {
    x: 6.5, y: -1.2, w: 5.5, h: 5.5,
    fill: { color: PURPLE, transparency: 85 }, line: { color: PURPLE, width: 0 }
  });
  slide.addShape(pres.shapes.OVAL, {
    x: -1, y: 2.5, w: 3.5, h: 3.5,
    fill: { color: PURPLE_LT, transparency: 88 }, line: { color: PURPLE_LT, width: 0 }
  });

  // Institute
  slide.addText("IIIT Bhopal  ·  Minor Project  ·  2026", {
    x: 0.6, y: 0.38, w: 8.8, h: 0.3,
    fontSize: 10, color: MUTED, bold: false, align: "left"
  });

  // Main title
  slide.addText("Who Speaks\nMatters", {
    x: 0.6, y: 0.9, w: 7.5, h: 2.4,
    fontSize: 58, bold: true, color: WHITE, align: "left",
    fontFace: "Arial Black"
  });

  // Subtitle
  slide.addText("Reviewer-Aware Text Modeling\nfor E-Commerce Sales Prediction", {
    x: 0.6, y: 3.35, w: 7, h: 0.9,
    fontSize: 16, color: VIOLET, align: "left", italic: true
  });

  // Purple accent line
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 3.25, w: 3.5, h: 0.04,
    fill: { color: PURPLE }, line: { color: PURPLE, width: 0 }
  });

  // Authors
  slide.addText("Ayush Fand (23U02101)  ·  Jai Chakkarwar (23U02102)", {
    x: 0.6, y: 4.55, w: 8, h: 0.28,
    fontSize: 12, color: OFFWHITE, align: "left"
  });
  slide.addText("Supervised by Dr. Supriyo Mandal  |  Dept. of CSE", {
    x: 0.6, y: 4.85, w: 8, h: 0.28,
    fontSize: 11, color: MUTED, align: "left"
  });
}

// ─────────────────────────────────────────────
// SLIDE 2 — Introduction (big idea layout)
// ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);

  tag(slide, "01 / INTRODUCTION", 0.5, 0.28);

  slide.addText("So... why doesn't every review count the same?", {
    x: 0.5, y: 0.7, w: 9, h: 0.7,
    fontSize: 26, bold: true, color: WHITE, align: "left"
  });

  // 3 cards side by side
  const cards = [
    { icon: "📦", head: "Billions of reviews", body: "Amazon alone has more reviews than anyone can read. Most of them are noise." },
    { icon: "⚖️", head: "The equal-weight problem", body: "A fake 2-line review and a detailed expert review? Same weight. That's... not great." },
    { icon: "💡", head: "Our idea", body: "Look at WHO wrote the review (credibility via PageRank) AND WHAT they wrote (quality via BERT)." },
  ];

  cards.forEach((c, i) => {
    const x = 0.4 + i * 3.1;
    card(slide, x, 1.55, 2.9, 3.55);
    slide.addText(c.icon, { x, y: 1.75, w: 2.9, h: 0.6, fontSize: 30, align: "center" });
    slide.addText(c.head, {
      x: x + 0.15, y: 2.45, w: 2.6, h: 0.45,
      fontSize: 13, bold: true, color: VIOLET, align: "left"
    });
    slide.addText(c.body, {
      x: x + 0.15, y: 2.95, w: 2.6, h: 1.8,
      fontSize: 11.5, color: OFFWHITE, align: "left"
    });
  });
}

// ─────────────────────────────────────────────
// SLIDE 3 — Literature Review (table layout)
// ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);

  tag(slide, "02 / LITERATURE REVIEW", 0.5, 0.28);
  slide.addText("What came before — and where it breaks", {
    x: 0.5, y: 0.65, w: 9, h: 0.55,
    fontSize: 24, bold: true, color: WHITE, align: "left"
  });

  const rows = [
    ["Approach", "What it does", "The problem"],
    ["Net Promoter Score", "Splits users into promoters vs detractors", "Ignores reviewer credibility completely"],
    ["Rating & Sentiment", "Avg. rating, polarity, readability features", "Focuses on WHAT — ignores WHO"],
    ["Helpfulness Voting", "More helpful votes = more trusted review", "New good reviews get almost zero votes"],
    ["Network/Graph Models", "PageRank on bipartite user-product graphs", "Expensive, needs full history, hard to scale"],
  ];

  const colW = [2.4, 3.5, 3.5];
  const rowColors = [PURPLE, BG_ACCENT, BG_CARD, BG_ACCENT, BG_CARD];
  const textColors = [WHITE, OFFWHITE, OFFWHITE, OFFWHITE, OFFWHITE];

  rows.forEach((row, ri) => {
    let xCursor = 0.4;
    row.forEach((cell, ci) => {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: xCursor, y: 1.3 + ri * 0.75, w: colW[ci], h: 0.72,
        fill: { color: rowColors[ri] }, line: { color: "2D2D4E", width: 1 }
      });
      slide.addText(cell, {
        x: xCursor + 0.1, y: 1.3 + ri * 0.75, w: colW[ci] - 0.12, h: 0.72,
        fontSize: ri === 0 ? 11 : 10.5,
        bold: ri === 0,
        color: ri === 0 ? WHITE : (ci === 2 ? "#F87171" === "X" ? "F87171" : "FCA5A5" : textColors[ri]),
        align: "left", valign: "middle"
      });
      xCursor += colW[ci] + 0.05;
    });
  });

  // Fix color for limitation column
  // Re-draw limitation cells with red tint
  for (let ri = 1; ri < rows.length; ri++) {
    slide.addText(rows[ri][2], {
      x: 6.0, y: 1.3 + ri * 0.75, w: 3.38, h: 0.72,
      fontSize: 10.5, color: "FCA5A5", align: "left", valign: "middle"
    });
  }
}

// ─────────────────────────────────────────────
// SLIDE 4 — Problem Statement (split layout)
// ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);

  tag(slide, "03 / PROBLEM STATEMENT", 0.5, 0.28);
  slide.addText("What are we actually solving?", {
    x: 0.5, y: 0.65, w: 9, h: 0.55,
    fontSize: 24, bold: true, color: WHITE, align: "left"
  });

  // NPS example callout box (left)
  card(slide, 0.4, 1.35, 4.1, 2.0, "1E0A3C");
  slide.addText("Real-world example: NPS isn't enough", {
    x: 0.55, y: 1.45, w: 3.8, h: 0.35,
    fontSize: 11, bold: true, color: YELLOW, align: "left"
  });
  slide.addText("200 customers surveyed.\n125 promoters, 33 detractors.\nNPS = 62.5 − 16.5 = 46\n\nOkay cool. But WHO gave those scores?", {
    x: 0.55, y: 1.85, w: 3.8, h: 1.35,
    fontSize: 12, color: OFFWHITE, align: "left"
  });

  // 3 problem bullets (right)
  const problems = [
    { title: "Everyone treated equally", desc: "First-time reviewer = expert reviewer. Makes no sense." },
    { title: "Identity is ignored", desc: "Platforms track ratings but never ask: is this person credible?" },
    { title: "No quality filter", desc: "\"Great product!\" gets the same weight as a 500-word detailed review." },
  ];
  problems.forEach((p, i) => {
    card(slide, 4.75, 1.35 + i * 1.4, 4.8, 1.28, BG_CARD);
    slide.addShape(pres.shapes.OVAL, {
      x: 4.88, y: 1.48 + i * 1.4, w: 0.32, h: 0.32,
      fill: { color: PURPLE }, line: { color: PURPLE_LT, width: 1 }
    });
    slide.addText((i + 1).toString(), {
      x: 4.88, y: 1.47 + i * 1.4, w: 0.32, h: 0.32,
      fontSize: 10, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0
    });
    slide.addText(p.title, {
      x: 5.28, y: 1.47 + i * 1.4, w: 4.1, h: 0.3,
      fontSize: 12, bold: true, color: VIOLET, align: "left"
    });
    slide.addText(p.desc, {
      x: 5.28, y: 1.8 + i * 1.4, w: 4.1, h: 0.7,
      fontSize: 11, color: OFFWHITE, align: "left"
    });
  });
}

// ─────────────────────────────────────────────
// SLIDE 5 — Methodology Part 1: Quality Score
// ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);

  tag(slide, "04 / METHODOLOGY — Part 1", 0.5, 0.28);
  slide.addText("How we score a review's quality", {
    x: 0.5, y: 0.65, w: 9, h: 0.5,
    fontSize: 24, bold: true, color: WHITE, align: "left"
  });

  // Formula bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.25, w: 9.2, h: 0.55,
    fill: { color: PURPLE }, line: { color: PURPLE_LT, width: 0 }
  });
  slide.addText("Quality Score  =  0.4 × Semantic  +  0.3 × Helpfulness  +  0.2 × Structural  +  0.1 × Consistency", {
    x: 0.5, y: 1.27, w: 9, h: 0.5,
    fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle"
  });

  // 4 component cards
  const components = [
    { pct: "40%", label: "Semantic", color: "5B21B6", desc: "BERT embeddings check how diverse the sentences are. More diversity = more informative review." },
    { pct: "30%", label: "Helpfulness", color: "6D28D9", desc: "helpful votes ÷ (total votes + 1). Community-validated. Handles zero-vote edge cases cleanly." },
    { pct: "20%", label: "Structural", color: "7C3AED", desc: "Word count + sentence count, normalized. Basically: is the review well-written and long enough?" },
    { pct: "10%", label: "Consistency", color: "8B5CF6", desc: "BERT similarity between the summary and full body. High match = the reviewer actually meant what they wrote." },
  ];

  components.forEach((c, i) => {
    const x = 0.3 + i * 2.38;
    card(slide, x, 2.0, 2.2, 3.3, BG_CARD);
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.0, w: 2.2, h: 0.08,
      fill: { color: c.color }, line: { color: c.color, width: 0 }
    });
    slide.addText(c.pct, {
      x, y: 2.15, w: 2.2, h: 0.65,
      fontSize: 32, bold: true, color: VIOLET, align: "center", fontFace: "Arial Black"
    });
    slide.addText(c.label, {
      x, y: 2.82, w: 2.2, h: 0.32,
      fontSize: 13, bold: true, color: WHITE, align: "center"
    });
    slide.addText(c.desc, {
      x: x + 0.12, y: 3.2, w: 1.98, h: 1.9,
      fontSize: 10, color: OFFWHITE, align: "left"
    });
  });
}

// ─────────────────────────────────────────────
// SLIDE 6 — Methodology Part 2: Influence + 2SLS
// ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);

  tag(slide, "04 / METHODOLOGY — Part 2", 0.5, 0.28);
  slide.addText("Reviewer influence + the sales model", {
    x: 0.5, y: 0.65, w: 9, h: 0.5,
    fontSize: 24, bold: true, color: WHITE, align: "left"
  });

  // Left: PageRank explanation
  card(slide, 0.4, 1.3, 4.3, 3.9, BG_CARD);
  slide.addText("PageRank Centrality", {
    x: 0.55, y: 1.42, w: 4.0, h: 0.38,
    fontSize: 14, bold: true, color: VIOLET, align: "left"
  });
  slide.addText([
    { text: "Basically", options: { bold: true, color: YELLOW } },
    { text: ", we build a network:\n", options: { color: OFFWHITE } },
    { text: "  → Users and products = nodes\n", options: { color: OFFWHITE } },
    { text: "  → Reviews = edges (with timestamps)\n", options: { color: OFFWHITE } },
    { text: "  → Then project to a user→user graph\n\n", options: { color: OFFWHITE } },
    { text: "Then PageRank tells us: who's the most influential reviewer?\n\n", options: { color: OFFWHITE } },
    { text: "Formula:  ci = γ·Σ(Miy·cy/outy) + ζ\n", options: { bold: true, color: VIOLET } },
    { text: "(γ = 0.85 damping factor — standard PageRank)", options: { italic: true, color: MUTED } },
  ], { x: 0.55, y: 1.88, w: 4.0, h: 3.0, fontSize: 11, align: "left" });

  // Right: Combined score + 2SLS
  card(slide, 4.9, 1.3, 4.65, 1.65, "1C0E2E");
  slide.addText("Combined Score", {
    x: 5.05, y: 1.42, w: 4.3, h: 0.33,
    fontSize: 13, bold: true, color: VIOLET, align: "left"
  });
  slide.addText("crᵢⱼ  =  Centrality  ×  Review Quality\nResult always between 0 and 1 ✓", {
    x: 5.05, y: 1.8, w: 4.3, h: 0.9,
    fontSize: 11.5, color: OFFWHITE, align: "left"
  });

  const stages = [
    { label: "2SLS Stage 1", desc: "Predict combined score using rating, sentiment, review count, price. This removes reverse-causality — so we can say reviews CAUSE sales, not just correlate." },
    { label: "2SLS Stage 2", desc: "SalesRank = β₀ + β₁·PredictedScore + β₂·Controls + ε  →  Tested across 1–7 month windows." },
    { label: "Latency Analysis", desc: "Reviews don't affect sales instantly. We model the time lag to find when influence actually peaks." },
  ];
  stages.forEach((s, i) => {
    card(slide, 4.9, 3.12 + i * 0.72, 4.65, 0.65, BG_ACCENT);
    slide.addText(s.label, {
      x: 5.05, y: 3.15 + i * 0.72, w: 1.5, h: 0.3,
      fontSize: 10, bold: true, color: YELLOW, align: "left"
    });
    slide.addText(s.desc, {
      x: 5.05, y: 3.46 + i * 0.72, w: 4.35, h: 0.28,
      fontSize: 9.5, color: OFFWHITE, align: "left"
    });
  });
}

// ─────────────────────────────────────────────
// SLIDE 7 — System Architecture (pipeline)
// ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);

  tag(slide, "05 / SYSTEM ARCHITECTURE", 0.5, 0.28);
  slide.addText("The full pipeline, step by step", {
    x: 0.5, y: 0.65, w: 9, h: 0.5,
    fontSize: 24, bold: true, color: WHITE, align: "left"
  });

  const steps = [
    "Load Amazon\nDataset",
    "Preprocess\nData",
    "Extract\nFeatures",
    "Build Bipartite\nNetwork",
    "One-Mode\nProjection",
    "BERT Quality\nScore",
    "PageRank\nCentrality",
    "Combine\nScores",
    "2SLS +\nLatency",
    "Results &\nValidation",
  ];

  const cols = 5;
  const rows = 2;
  const bw = 1.75, bh = 1.0;
  const startX = 0.25, startY = 1.35, gapX = 0.22, gapY = 0.65;

  steps.forEach((s, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (bw + gapX);
    const y = startY + row * (bh + gapY);

    card(slide, x, y, bw, bh, i === 9 ? "1E0A3C" : BG_CARD);
    slide.addShape(pres.shapes.OVAL, {
      x: x + 0.08, y: y + 0.08, w: 0.3, h: 0.3,
      fill: { color: i === 9 ? YELLOW : PURPLE }, line: { color: PURPLE_LT, width: 0 }
    });
    slide.addText((i + 1).toString(), {
      x: x + 0.08, y: y + 0.08, w: 0.3, h: 0.3,
      fontSize: 9, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0
    });
    slide.addText(s, {
      x: x + 0.05, y: y + 0.42, w: bw - 0.1, h: 0.52,
      fontSize: 10, color: OFFWHITE, align: "center", valign: "middle"
    });

    // Arrow to next (within same row)
    if (col < cols - 1) {
      slide.addShape(pres.shapes.LINE, {
        x: x + bw + 0.02, y: y + bh / 2,
        w: gapX - 0.04, h: 0,
        line: { color: PURPLE, width: 1.5, dashType: "dash" }
      });
    }
  });

  // Note at bottom
  slide.addText("Note: Each step feeds into the next. The combined output trains the regression model.", {
    x: 0.5, y: 5.1, w: 9, h: 0.3,
    fontSize: 10, color: MUTED, italic: true, align: "left"
  });
}

// ─────────────────────────────────────────────
// SLIDE 8 — Implementation / Tools
// ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);

  tag(slide, "06 / IMPLEMENTATION", 0.5, 0.28);
  slide.addText("Tools we used (and why)", {
    x: 0.5, y: 0.65, w: 9, h: 0.5,
    fontSize: 24, bold: true, color: WHITE, align: "left"
  });

  const tools = [
    { name: "Python", role: "Core language — glues everything together" },
    { name: "Pandas / NumPy", role: "Data cleaning, transformation, math" },
    { name: "BERT (HuggingFace)", role: "Sentence embeddings for semantic + consistency scoring" },
    { name: "Scikit-learn", role: "Normalization, cosine similarity, feature prep" },
    { name: "Matplotlib / Seaborn", role: "Visualizing results — scatter plots, heatmaps, trends" },
    { name: "Jupyter / VS Code", role: "Where all the actual coding happened 😅" },
  ];

  tools.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.75;
    const y = 1.35 + row * 1.4;
    card(slide, x, y, 4.5, 1.2, BG_CARD);
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.06, h: 1.2,
      fill: { color: PURPLE_LT }, line: { color: PURPLE_LT, width: 0 }
    });
    slide.addText(t.name, {
      x: x + 0.2, y: y + 0.15, w: 4.1, h: 0.38,
      fontSize: 14, bold: true, color: VIOLET, align: "left"
    });
    slide.addText(t.role, {
      x: x + 0.2, y: y + 0.55, w: 4.1, h: 0.55,
      fontSize: 11, color: OFFWHITE, align: "left"
    });
  });
}

// ─────────────────────────────────────────────
// SLIDE 9 — Results: Digital Cameras
// ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);

  tag(slide, "07 / RESULTS — Digital Cameras", 0.5, 0.28);
  slide.addText("When do reviews actually start affecting sales?", {
    x: 0.5, y: 0.65, w: 9, h: 0.5,
    fontSize: 22, bold: true, color: WHITE, align: "left"
  });

  slide.addText("Negative value = sales rank improves (lower rank = more sales)   |   * p<0.05   ** p<0.01", {
    x: 0.5, y: 1.18, w: 9, h: 0.28,
    fontSize: 9, color: MUTED, italic: true, align: "left"
  });

  const headers = ["Parameter", "1 Mo", "2 Mo", "3 Mo", "4 Mo", "5 Mo", "6 Mo"];
  const dataRows = [
    ["Average Rating",         "0.016",  "0.003",  "-0.016*",  "-0.009*",  "0.011",   "0.005"],
    ["Average Sentiment",      "0.013",  "0.041",  "-0.033*",  "-0.010*",  "0.003",   "0.138"],
    ["ln(RS)",                 "0.093",  "0.066",  "-0.193*",  "-0.010*",  "-0.076*", "0.168"],
    ["NePS (Reviewer Infl.)",  "0.056",  "-0.210*","-0.356**", "-0.309*",  "-0.112",  "0.037"],
    ["Avg Quality of Review",  "-0.073*","-0.153**","-0.113*", "-0.017*",  "0.127",   "0.127"],
    ["ln Price",               "-0.033", "-0.173", "-0.008",   "-0.019",   "-0.163",  "-0.109"],
  ];
  const colW2 = [2.5, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1];

  // Header row
  let xc = 0.4;
  headers.forEach((h, ci) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: xc, y: 1.52, w: colW2[ci], h: 0.38,
      fill: { color: PURPLE }, line: { color: "2D2D4E", width: 1 }
    });
    slide.addText(h, {
      x: xc + 0.06, y: 1.52, w: colW2[ci] - 0.08, h: 0.38,
      fontSize: 10, bold: true, color: WHITE, valign: "middle"
    });
    xc += colW2[ci];
  });

  // Data rows
  dataRows.forEach((row, ri) => {
    const isHighlight = ri === 3 || ri === 4; // NePS + Quality
    xc = 0.4;
    row.forEach((cell, ci) => {
      const isNeg = cell.startsWith("-") && !cell.startsWith("-0.0");
      slide.addShape(pres.shapes.RECTANGLE, {
        x: xc, y: 1.9 + ri * 0.5, w: colW2[ci], h: 0.48,
        fill: { color: isHighlight ? "1C0E2E" : (ri % 2 === 0 ? BG_CARD : BG_ACCENT) },
        line: { color: "2D2D4E", width: 1 }
      });
      slide.addText(cell, {
        x: xc + 0.06, y: 1.9 + ri * 0.5, w: colW2[ci] - 0.08, h: 0.48,
        fontSize: 10, bold: isHighlight && ci > 0,
        color: ci === 0 ? OFFWHITE : (isNeg ? GREEN : (cell.includes("*") ? YELLOW : MUTED)),
        valign: "middle"
      });
      xc += colW2[ci];
    });
  });

  // Key finding
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 4.98, w: 9.2, h: 0.44,
    fill: { color: "1E0A3C" }, line: { color: VIOLET, width: 1 }
  });
  slide.addText("⭐  Key finding: NePS + Review Quality peak at 2–3 months — proves the latency hypothesis!", {
    x: 0.55, y: 4.99, w: 9.0, h: 0.42,
    fontSize: 11, bold: true, color: VIOLET, valign: "middle"
  });
}

// ─────────────────────────────────────────────
// SLIDE 10 — Results: Cell Phones + Key Findings
// ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);

  tag(slide, "07 / RESULTS — Cell Phones + Key Findings", 0.5, 0.28);
  slide.addText("Cell phones tell a similar story", {
    x: 0.5, y: 0.65, w: 9, h: 0.5,
    fontSize: 22, bold: true, color: WHITE, align: "left"
  });

  // Small table left
  const hCols = ["Parameter", "1 Mo", "2 Mo", "3 Mo", "4 Mo"];
  const phData = [
    ["NePS — Reviewer Infl.", "-0.209*", "-0.379**", "-0.205*", "-0.191*"],
    ["Avg Quality",           "-0.013",  "-0.107*",  "-0.113*", "-0.109*"],
    ["Average Rating",        "0.019",   "0.009",    "0.111",   "-0.101"],
    ["Average Sentiment",     "0.078",   "0.052",    "0.028",   "-0.117"],
  ];
  const cw = [2.4, 1.0, 1.0, 1.0, 1.0];
  let xcc = 0.4;
  hCols.forEach((h, ci) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: xcc, y: 1.28, w: cw[ci], h: 0.38,
      fill: { color: PURPLE }, line: { color: "2D2D4E", width: 1 }
    });
    slide.addText(h, {
      x: xcc + 0.06, y: 1.28, w: cw[ci] - 0.08, h: 0.38,
      fontSize: 10, bold: true, color: WHITE, valign: "middle"
    });
    xcc += cw[ci];
  });
  phData.forEach((row, ri) => {
    xcc = 0.4;
    row.forEach((cell, ci) => {
      const isNeg = cell.startsWith("-");
      slide.addShape(pres.shapes.RECTANGLE, {
        x: xcc, y: 1.66 + ri * 0.5, w: cw[ci], h: 0.48,
        fill: { color: ri < 2 ? "1C0E2E" : (ri % 2 === 0 ? BG_CARD : BG_ACCENT) },
        line: { color: "2D2D4E", width: 1 }
      });
      slide.addText(cell, {
        x: xcc + 0.06, y: 1.66 + ri * 0.5, w: cw[ci] - 0.08, h: 0.48,
        fontSize: 10, bold: ri < 2 && ci > 0,
        color: ci === 0 ? OFFWHITE : (isNeg ? GREEN : MUTED),
        valign: "middle"
      });
      xcc += cw[ci];
    });
  });

  // Right side: key findings
  const findings = [
    { icon: "📅", label: "2–4 months is the sweet spot", body: "That's when review influence peaks — buying decisions are gradual." },
    { icon: "🏆", label: "NePS beats NPS", body: "Influence-weighted score outperforms raw review count every time." },
    { icon: "🔀", label: "Category matters", body: "Digital cameras lean on influence; cell phones shift to sentiment later." },
    { icon: "📉", label: "Rating variance hurts", body: "Inconsistent ratings reduce consumer trust and lower sales rank." },
  ];
  findings.forEach((f, i) => {
    card(slide, 6.7, 1.28 + i * 1.06, 3.05, 0.95, BG_CARD);
    slide.addText(f.icon + "  " + f.label, {
      x: 6.85, y: 1.33 + i * 1.06, w: 2.8, h: 0.32,
      fontSize: 11, bold: true, color: VIOLET, align: "left"
    });
    slide.addText(f.body, {
      x: 6.85, y: 1.67 + i * 1.06, w: 2.8, h: 0.48,
      fontSize: 10, color: OFFWHITE, align: "left"
    });
  });
}

// ─────────────────────────────────────────────
// SLIDE 11 — Conclusion + Future Scope
// ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);

  // Big circle bg
  slide.addShape(pres.shapes.OVAL, {
    x: 7.5, y: 1.5, w: 4, h: 4,
    fill: { color: PURPLE, transparency: 88 }, line: { color: PURPLE, width: 0 }
  });

  tag(slide, "08 / CONCLUSION & FUTURE SCOPE", 0.5, 0.28);
  slide.addText("What we found. What's next.", {
    x: 0.5, y: 0.65, w: 9, h: 0.5,
    fontSize: 24, bold: true, color: WHITE, align: "left"
  });

  // Conclusions
  const concl = [
    "WHO writes matters as much as WHAT they write",
    "Quality × Centrality outperforms ratings and sentiment alone",
    "2SLS confirms a CAUSAL link — not just correlation",
    "Strongest effect at 2–3 months post-review",
    "No one-size-fits-all — feature importance varies by category",
  ];
  slide.addText("Conclusions", {
    x: 0.5, y: 1.28, w: 5.5, h: 0.38,
    fontSize: 14, bold: true, color: VIOLET, align: "left"
  });
  concl.forEach((c, i) => {
    slide.addText([
      { text: "✓  ", options: { bold: true, color: GREEN } },
      { text: c, options: { color: OFFWHITE } }
    ], {
      x: 0.5, y: 1.7 + i * 0.56, w: 5.6, h: 0.5,
      fontSize: 11.5, align: "left"
    });
  });

  // Future scope
  const future = [
    "LSTM / Transformers for temporal forecasting",
    "Deeper NLP: topic modeling, emotion analysis",
    "Graph Neural Networks for richer modeling",
    "Cross-platform: Amazon + Flipkart + others",
    "Real-time streaming pipeline",
  ];
  card(slide, 6.2, 1.28, 3.35, 3.85, BG_CARD);
  slide.addText("Future Scope →", {
    x: 6.35, y: 1.4, w: 3.0, h: 0.38,
    fontSize: 13, bold: true, color: YELLOW, align: "left"
  });
  future.forEach((f, i) => {
    slide.addText([
      { text: "→  ", options: { color: YELLOW } },
      { text: f, options: { color: OFFWHITE } }
    ], {
      x: 6.35, y: 1.88 + i * 0.58, w: 3.1, h: 0.5,
      fontSize: 11, align: "left"
    });
  });

  // Quote
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 4.98, w: 9.2, h: 0.44,
    fill: { color: PURPLE }, line: { color: PURPLE_LT, width: 0 }
  });
  slide.addText('"Who speaks matters — and now we can measure it."', {
    x: 0.55, y: 4.99, w: 9.0, h: 0.42,
    fontSize: 13, bold: true, italic: true, color: WHITE,
    align: "center", valign: "middle"
  });
}

// ─────────────────────────────────────────────
// SLIDE 12 — References
// ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  darkBg(slide);

  tag(slide, "09 / REFERENCES", 0.5, 0.28);
  slide.addText("Bibliography", {
    x: 0.5, y: 0.65, w: 9, h: 0.5,
    fontSize: 24, bold: true, color: WHITE, align: "left"
  });

  const refs = [
    "[1]  Abbasimehr, H. et al. (2020). Optimized LSTM model for demand forecasting. Computers & Industrial Engineering, 143.",
    "[2]  Archak, N., Ghose, A., Ipeirotis, P.G. (2011). Pricing power from consumer reviews. Management Science, 57(8).",
    "[3]  Baek, H., Ahn, J., Choi, Y. (2012). Helpfulness of online consumer reviews. Intl. Journal of Electronic Commerce, 17(2).",
    "[4]  Chevalier, J.A., Mayzlin, D. (2006). Word of mouth on sales: Online book reviews. Journal of Marketing Research, 43(3).",
    "[5]  Chintagunta, P.K. et al. (2010). Online user reviews and movie box office performance. Marketing Science, 29(5).",
    "[6]  Hansen, D.L. et al. (2020). PageRank and Eigenvector Centrality. Analyzing Social Media Networks.",
  ];

  refs.forEach((r, i) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: 1.35 + i * 0.64, w: 0.04, h: 0.48,
      fill: { color: i % 2 === 0 ? PURPLE : VIOLET }, line: { color: PURPLE, width: 0 }
    });
    slide.addText(r, {
      x: 0.6, y: 1.35 + i * 0.64, w: 8.8, h: 0.5,
      fontSize: 10.5, color: i % 2 === 0 ? OFFWHITE : "D8B4FE", align: "left", valign: "middle"
    });
  });

  slide.addText("Dataset: nijianmo.github.io/amazon  ·  PageRank: en.wikipedia.org/wiki/PageRank  ·  Scikit-learn: scikit-learn.org", {
    x: 0.5, y: 5.2, w: 9, h: 0.25,
    fontSize: 9, color: MUTED, italic: true, align: "left"
  });
}

pres.writeFile({ fileName: "Who_Speaks_Matters_Redesigned.pptx" })
  .then(() => console.log("Done!"))
  .catch(e => console.error(e));