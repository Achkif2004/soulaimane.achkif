# Graph Report - portfolio - Soulaimane Achkif  (2026-10-10)

## Corpus Check
- Large corpus: 29 files · ~2,167,891 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 145 nodes · 220 edges · 11 communities
- Extraction: 79% EXTRACTED · 19% INFERRED · 2% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.89)
- Token cost: 604,624 input · 0 output

## Community Hubs (Navigation)
- Site Interaction Script
- Web & Design Skill Icons
- Ramen Stall Visuals
- To-Do App Screens
- RoadMate Visuals
- Portfolio Home Page
- PlanYourTrip Backend Project
- RoadMate Project Story
- 3D Ramen Kiosk Project
- Personal Portraits
- Favicon Branding

## God Nodes (most connected - your core abstractions)
1. `project1.html (RoadMate project page)` - 14 edges
2. `project3.html (PlanYourTrip project page)` - 13 edges
3. `project2.html (3D Ramen Kiosk project page)` - 12 edges
4. `index.html (Portfolio Home)` - 11 edges
5. `Mijn projecten (Projects) Section` - 10 edges
6. `images/foodkiosk-schets.png` - 10 edges
7. `PlanYourTrip.gt.tc (PHP to-do web app)` - 10 edges
8. `Mijn skills (Skills) Section` - 9 edges
9. `images/Ramen_kiosk.png` - 9 edges
10. `RoadMate (voice-controlled traffic sign app)` - 7 edges

## Surprising Connections (you probably didn't know these)
- `images/roadmate_desktop.png` --semantically_similar_to--> `Welcome Splash Screen (mobile)`  [INFERRED] [semantically similar]
  project1.html → images/roadmate mockups.png
- `images/project3.png (PlanYourTrip screenshot)` --conceptually_related_to--> `RoadMate Project`  [AMBIGUOUS]
  index.html → images/roadmate mockups.png
- `images/foodkiosk-schets.png` --references--> `Hotosting/vorm/structuur? (unclear annotation)`  [AMBIGUOUS]
  project2.html → images/foodkiosk-schets.png
- `images/profile.jpg` --conceptually_related_to--> `Japan Travel Personal Theme`  [INFERRED]
  index.html → images/profile.jpg
- `images/profile.jpg` --implements--> `Portfolio Owner Portrait`  [INFERRED]
  index.html → images/profile.jpg

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Shared project page template (hero + CTA + story + sketchbook + gallery + lightbox)** — project1, project2, project3, project1_image_lightbox, index_navigation, index_hand_note_scribbles [INFERRED 0.85]
- **RoadMate in-car learning flow (detect sign -> speak explanation -> post-ride quiz)** — project1_traffic_sign_detection, project1_voice_interaction, project1_ride_quiz, project1_roadmate [EXTRACTED 1.00]
- **Live-hosted (.gt.tc) project deliverables with GitHub source** — project1_roadmate_website, project1_github_roadmate, project3_planyourtrip_website, project3_github_todo_app [INFERRED 0.75]
- **Design & 3D Tools** — skill_figma, skill_illustrator, skill_blender [INFERRED 0.85]
- **Web Development Technologies** — skill_html, skill_css, skill_javascript, skill_php, skill_react [INFERRED 0.85]
- **Portfolio Personal Branding Assets** — favicon_jpg, favicon_png, images_profile, images_about_me [INFERRED 0.85]
- **To-Do App Navigation Flow: Dashboard -> List -> Task Detail** — images_to_do1, images_to_do2, images_todo_3 [INFERRED 0.85]
- **RoadMate Responsive Welcome Screen (mobile + desktop)** — images_roadmate_desktop, images_roadmate_mockups_welcome_screen, images_roadmate_desktop_road_band_branding [INFERRED 0.85]
- **RoadMate Ride Session Flow** — images_roadmate_gsm_map_interface, images_roadmate_gsm_frequency_control, images_roadmate_mockups_active_session_screen, images_roadmate_mockups_quiz_screen [INFERRED 0.75]
- **Ramen kiosk design process: sketch to final render** — images_foodkiosk_schets, images_ramen_kiosk, images_project2, images_ramen_kiosk_project [INFERRED 0.85]
- **Ramen kiosk render scene elements** — images_ramen_kiosk_glowing_bowl_sign, images_ramen_kiosk_men_lanterns, images_ramen_kiosk_menu_board, images_ramen_kiosk_tatami_seating, images_ramen_kiosk_red_wooden_frame [EXTRACTED 1.00]

## Communities (11 total, 0 thin omitted)

### Community 0 - "Site Interaction Script"
Cohesion: 0.08
Nodes (20): closeButton, galleryImages, hamburger, hero, images, lightbox, lightboxImage, linkedSections (+12 more)

### Community 1 - "Web & Design Skill Icons"
Cohesion: 0.11
Nodes (20): images/css.svg, images/figma.svg, images/html.svg, images/illustrator.svg, images/js.svg, images/react.svg, CSS, Figma (+12 more)

### Community 2 - "Ramen Stall Visuals"
Cohesion: 0.16
Nodes (18): images/foodkiosk-schets.png, Stall + Customer Seating Area floor plan, Hotosting/vorm/structuur? (unclear annotation), Houten structuur? (wooden structure), Lichte houten counter (light wooden counter with stools), Noren gordijnen (noren curtains, ラーメン / 屋台), Ramen bowl with chopsticks icon, Rode lantaarns? / Lantaarn vorm? (red lanterns, lantern shape) (+10 more)

### Community 3 - "To-Do App Screens"
Cohesion: 0.16
Nodes (16): images/project3.png (PlanYourTrip screenshot), Neon Checklist Icon, Neon Glow Dark Visual Style, images/TO_DO1.png, Friendly Empty State Card, User Registration / Logout Flow, images/TO_DO2.png, Task Sorting Controls (+8 more)

### Community 4 - "RoadMate Visuals"
Cohesion: 0.19
Nodes (15): images/project1.png (RoadMate logo), Intersecting Roads App Icon (navy + yellow), RoadMate Lowercase Wordmark, images/roadmate_desktop.png, Road Band Brand Motif, images/roadmate_gsm.jpg, Play/Stop with Frequency Slider, Interactive Map with POI Markers (+7 more)

### Community 5 - "Portfolio Home Page"
Cohesion: 0.31
Nodes (13): index.html (Portfolio Home), Over mij (About) Section, Contact Section (Laten we samenwerken), Contentsquare Tracking Script, Digital Experience Design (study programme), Hero Section, Navigation Bar with Hamburger Menu, Mijn projecten (Projects) Section (+5 more)

### Community 6 - "PlanYourTrip Backend Project"
Cohesion: 0.24
Nodes (11): images/php.svg, PHP, Backend Development (course), Backend Notes Sketchbook Aside, CRUD Task Management, Database Structure, GitHub repo Achkif2004/todo-app, Photo / Attachment Uploads (+3 more)

### Community 7 - "RoadMate Project Story"
Cohesion: 0.32
Nodes (7): Development Journal Sketchbook Aside, GitHub repo Achkif2004/Roadmate, Post-ride Interactive Quiz, RoadMate (voice-controlled traffic sign app), RoadMate live site (roadmate.gt.tc), API-based Traffic Sign Detection, PlanYourTrip live site (planyourtrip.gt.tc)

### Community 8 - "3D Ramen Kiosk Project"
Cohesion: 0.29
Nodes (6): images/blender.svg, Blender, 3D Design (course), 3D Ramen Kiosk, Concept Schetsen Sketchbook Aside, Blender (3D)

### Community 9 - "Personal Portraits"
Cohesion: 0.67
Nodes (4): images/about-me.jpeg, images/profile.jpg, Japan Travel Personal Theme, Portfolio Owner Portrait

### Community 10 - "Favicon Branding"
Cohesion: 1.00
Nodes (3): favicon.jpg (SA° circular monogram), Minimal Monochrome Monogram Branding, favicon.png (S. square monogram)

## Ambiguous Edges - Review These
- `images/project3.png (PlanYourTrip screenshot)` → `RoadMate Project`  [AMBIGUOUS]
  images/project3.png · relation: conceptually_related_to
- `images/roadmate mockups.png` → `images/roadmate_gsm.jpg`  [AMBIGUOUS]
  images/roadmate_gsm.jpg · relation: conceptually_related_to
- `images/foodkiosk-schets.png` → `Hotosting/vorm/structuur? (unclear annotation)`  [AMBIGUOUS]
  images/foodkiosk-schets.png · relation: references
- `favicon.jpg (SA° circular monogram)` → `favicon.png (S. square monogram)`  [AMBIGUOUS]
  favicon.png · relation: semantically_similar_to
- `Red Wooden Pillar Frame and Counter` → `Noren gordijnen (noren curtains, ラーメン / 屋台)`  [AMBIGUOUS]
  images/Ramen_kiosk.png · relation: conceptually_related_to

## Knowledge Gaps
- **28 isolated node(s):** `Digital Experience Design (study programme)`, `3D Design (course)`, `images/ramen_kiosk_animation.mp4`, `Backend Development (course)`, `Blender (3D)` (+23 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 51 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `index.html (Portfolio Home)` connect `Portfolio Home Page` to `Site Interaction Script`, `Web & Design Skill Icons`?**
  _High betweenness centrality (0.269) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `project3.html (PlanYourTrip project page)` (e.g. with `Navigation Bar with Hamburger Menu` and `Image Lightbox (prev/next/close)`) actually correct?**
  _`project3.html (PlanYourTrip project page)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Digital Experience Design (study programme)`, `3D Design (course)`, `images/ramen_kiosk_animation.mp4` to the rest of the system?**
  _28 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Site Interaction Script` be split into smaller, more focused modules?**
  _Cohesion score 0.07671957671957672 - nodes in this community are weakly interconnected._
- **Why does `Mijn skills (Skills) Section` connect `Web & Design Skill Icons` to `3D Ramen Kiosk Project`, `Portfolio Home Page`, `PlanYourTrip Backend Project`?**
  _High betweenness centrality (0.235) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `images/project3.png (PlanYourTrip screenshot)` and `RoadMate Project`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `images/roadmate mockups.png` and `images/roadmate_gsm.jpg`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._