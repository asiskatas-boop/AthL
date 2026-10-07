export interface Project {
  id: string;
  title: string;
  venue: string;
  institution: string;
  role: string;
  category: 'curatorial' | 'production' | 'fellowship';
  location: string;
  year: string;
  dateRange: string;
  accessionCode: string;
  theme: string[];
  shortDescription: string;
  statement: string;
  curatorialHighlights: string[];
  materialsAndForms: string[];
  visualPlateType: 'stone' | 'salt' | 'textile' | 'monochrome' | 'chthonic' | 'cinema' | 'venice' | 'balkan' | 'cocteau' | 'archival';
}

export interface Publication {
  id: string;
  title: string;
  date: string;
  year: string;
  publisher: string;
  type: string;
  citation: string;
  abstract: string;
  excerpt: string;
  tags: string[];
}

export interface ResearchPillar {
  id: string;
  title: string;
  subtitle: string;
  latinIndex: string;
  summary: string;
  methodology: string;
  theoreticalAnchors: string[];
  caseStudyRef: string;
  extendedNotes: string;
}

export interface Award {
  title: string;
  institution: string;
  period: string;
  description: string;
}

export const CURATOR_INFO = {
  name: "AthLasith",
  title: "Art Historian, Curator & Cultural Strategist",
  email: "asiskatas@gmail.com",
  basedIn: "Athens, Greece",
  activeRegions: "Athens · Venice · Milan · Patmos",
  biography: `I am an art historian, curator and cultural strategist dedicated to shaping projects where research, production, and audience engagement intersect. 

My theoretical and research interests focus on materiality, archival activation, neo-Balkan and Balkan cultural narratives, and the contemporarization of the “iconology of the material,” approached through the lenses of art history, archaeology and anthropology. I am particularly interested in how objects, archives, and vernacular histories construct collective memory and cultural identity within contemporary artistic discourse.

I have collaborated with institutions and initiatives including Space52, ACG Art Gallery and Collection, Roma Gallery, Back to Athens, the Aegean Film Festival, .sympan, Art for Tomorrow and the Peggy Guggenheim Collection.`,
  shortBio: "Dedicated to shaping curatorial projects where research, materiality, production, and archival activation intersect across contemporary Mediterranean and Balkan landscapes.",
  education: [
    {
      degree: "Bachelor of Arts in Art History (Highest Honors)",
      institution: "Deree – The American College of Greece",
      period: "2021 – 2025",
      honors: "Frances Rich Fine & Performing Arts Scholar · Recipient of Outstanding Graduating Student Award, Art History"
    },
    {
      degree: "Circular Cultures Design School",
      institution: "ONASSIS ONX x British Council",
      period: "2026",
      honors: "Time as Memory as Space program participant"
    },
    {
      degree: "Curatorial Fellowship Program",
      institution: "Peggy Guggenheim Collection, Venice",
      period: "2025",
      honors: "Institutional Research Fellow in Modernist & Contemporary Archival Studies"
    }
  ]
};

export const COLLABORATING_INSTITUTIONS = [
  "Peggy Guggenheim Collection",
  "ONASSIS ONX x British Council",
  "Roma Gallery",
  "Art for Tomorrow",
  "Aegean Film Festival",
  "ACG Art Gallery & Collection",
  "Space52",
  "Back to Athens",
  ".sympan",
  "Circular Cultures"
];

export const RESEARCH_PILLARS: ResearchPillar[] = [
  {
    id: "materiality",
    title: "Iconology of the Material",
    subtitle: "Re-activating Matter Through Archaeology & Anthropology",
    latinIndex: "PARS I",
    summary: "Re-examining physical substances—raw pigment, salt, marble fragments, terracotta, industrial slag—not merely as passive media, but as autonomous agents bearing temporal inscription and cultural memory.",
    methodology: "Triangulating Aby Warburg's iconology with archaeological stratigraphy and contemporary new materialisms to decode the somatic and historical agency of matter.",
    theoreticalAnchors: ["Gottfried Semper's tectonic theory", "Jane Bennett's vibrant matter", "Archaeological stratigraphy", "Vernacular craft cosmologies"],
    caseStudyRef: "Scattering of Salts & Chromophobia",
    extendedNotes: "When we touch marble, salt, or unbaked clay, we engage with geological deep time and human labor condensed. In our curatorial investigations, physical mediums are treated as archival witnesses that carry silent narratives of extraction, migration, and ritual invocation."
  },
  {
    id: "archival",
    title: "Archival Activation & Collective Memory",
    subtitle: "From Inert Repositories to Living Discourse",
    latinIndex: "PARS II",
    summary: "Interrogating the institutional archive as a contested site of silence and resurrection, transforming institutional documents into performative and spatial encounters.",
    methodology: "Counter-archival curating: staging unexpected juxtapositions between state/institutional archives, artist notebooks, and vernacular oral histories.",
    theoreticalAnchors: ["Jacques Derrida's Archive Fever", "Michel Foucault's archaeology of knowledge", "Vernacular memory studies", "Oral histories"],
    caseStudyRef: "Temporal Transferences & FORTHCOMING III",
    extendedNotes: "The archive is never innocent or static. Archival activation requires friction: displacing the document from the humidity-controlled filing cabinet onto gallery walls and public assemblies, exposing its gaps and inviting contemporary artistic counter-narratives."
  },
  {
    id: "neo-balkan",
    title: "Neo-Balkan & Balkan Cultural Narratives",
    subtitle: "Vernacular Geographies & Post-Transitional Identities",
    latinIndex: "PARS III",
    summary: "Investigating how Southeast European cultural identities articulate collective memory beyond orientalist cliches, spotlighting shared textiles, architectural palimpsests, and post-socialist/post-Ottoman vernacular resonances.",
    methodology: "Trans-regional dialogue, tracing material routes (wool, salt, song, limestone) that link the Aegean, the Pindus, and the broader Balkan hinterland.",
    theoreticalAnchors: ["Maria Todorova's Imagining the Balkans", "Vernacular craft transmission", "Post-Ottoman material memory", "Balkan feminist poetics"],
    caseStudyRef: "Weaving Worlds & ἰῶμαι",
    extendedNotes: "The Balkans exist not merely as a geopolitical margin, but as a rich polyphony of shared craft epistemologies, folk healing (ἰῶμαι), woven domestic topologies, and complex architectural layeredness that contemporary art continuously re-imagines."
  },
  {
    id: "chthonic",
    title: "Chthonic Ecologies & The Anthropocene",
    subtitle: "Subterranean Layers & Post-Industrial Topographies",
    latinIndex: "PARS IV",
    summary: "Probing degraded and industrial Mediterranean landscapes—such as Athens' ancient industrial valley of Elaionas—as loci of chthonic mythology, toxic sediment, and regenerative ecological futures.",
    methodology: "Site-responsive field curation, convening artists, environmentalists, and local workers directly within post-industrial terrains.",
    theoreticalAnchors: ["Donna Haraway's Staying with the Trouble", "Ancient Greek chthonic deities", "Industrial ecology", "Mediterranean environmental history"],
    caseStudyRef: "Elaionas 2023: Chthonic & the Anthropocene",
    extendedNotes: "Elaionas ('the Olive Grove') was transformed from antiquity's sacred grove into Athens' industrial underbelly of scrap yards and logistics hubs. Curating within its chthonic reality confronts viewers with the visceral sediment of modern urban metabolism."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "time-memory-space-2026",
    title: "Time as Memory as Space",
    venue: "Circular Cultures Design School 2026",
    institution: "ONASSIS ONX x British Council",
    role: "Participant & Researcher",
    category: "fellowship",
    location: "Athens, Greece",
    year: "2026",
    dateRange: "05/2026",
    accessionCode: "CUR-2026-ONX",
    theme: ["Materiality", "Circular Cultures", "Spatial Memory"],
    shortDescription: "A research-led program exploring spatial circularity, memory-infused architectures, and ecological sustainability in contemporary Mediterranean design.",
    statement: "Investigating how temporality is spatialized within urban material cycles. Through interdisciplinary dialogue between architects, curators, and material scientists, the project questions how discarded building stock and vernacular craftsmanship can preserve cultural memory under contemporary environmental imperatives.",
    curatorialHighlights: [
      "Interdisciplinary fellowship at Onassis ONX in collaboration with British Council",
      "Analysis of circular building traditions across Aegean and Mediterranean topographies",
      "Development of curatorial frameworks for material reuse and somatic heritage"
    ],
    materialsAndForms: ["Reclaimed stone", "Bio-composite textures", "Digital spatial models", "Archival field logs"],
    visualPlateType: "stone"
  },
  {
    id: "pegging-guggenheim-2025",
    title: "Peggy Guggenheim Collection Fellowship",
    venue: "Peggy Guggenheim Collection",
    institution: "Peggy Guggenheim Collection",
    role: "Fellow & Institutional Researcher",
    category: "fellowship",
    location: "Venice, Italy",
    year: "2025",
    dateRange: "10/2025 - 11/2025",
    accessionCode: "FEL-2025-PGC",
    theme: ["Modernist Archives", "Institutional History", "Venetian Heritage"],
    shortDescription: "Intensive curatorial fellowship at Palazzo Venier dei Leoni, engaging directly with Peggy Guggenheim's historic modernist collection and archival holdings.",
    statement: "Engaging directly with the permanent collection, temporary exhibition research, and archival documents at Palazzo Venier dei Leoni. The fellowship centered on public engagement mediation, modernist sculpture conservation records, and the transnational circulation of Peggy Guggenheim's avant-garde network.",
    curatorialHighlights: [
      "Curatorial research fellowship in Venice's historic Palazzo Venier dei Leoni",
      "Public gallery talks and archival mediation for international audiences",
      "Examination of early Surrealist and Abstract Expressionist object provenance"
    ],
    materialsAndForms: ["Istrian stone", "Archival correspondence", "Sculptural patinas", "Glass and bronze"],
    visualPlateType: "venice"
  },
  {
    id: "aegean-film-festival-2025",
    title: "Aegean Film Festival",
    venue: "Aegean Film Festival",
    institution: "Aegean Film Festival",
    role: "Curator",
    category: "curatorial",
    location: "Patmos, Greece",
    year: "2025",
    dateRange: "06/2025",
    accessionCode: "CUR-2025-AFF",
    theme: ["Moving Image", "Archipelagic Memory", "Island Poetics"],
    shortDescription: "Curating a dedicated video art and cinematic program responding to the insular geography, maritime history, and ecological vulnerability of the Aegean archipelago.",
    statement: "Curating moving-image works that challenge mainland-centric narratives. Set against the monastery landscape and open-air seascapes of Patmos, the program investigated maritime borders, oral island folklore, and the fragile ecologies of Mediterranean archipelagos.",
    curatorialHighlights: [
      "Site-responsive screenings across historical open-air locations on Patmos",
      "Panel discussions linking independent cinema with environmental advocacy",
      "Dialogue between Greek and international video artists on insular isolation"
    ],
    materialsAndForms: ["Single-channel video", "Expanded cinema installations", "Archival maritime maps", "Soundscapes"],
    visualPlateType: "cinema"
  },
  {
    id: "art-for-tomorrow-2025",
    title: "Creativity for Social Change Award Exhibition",
    venue: "Art for Tomorrow",
    institution: "Art for Tomorrow",
    role: "Curator",
    category: "curatorial",
    location: "Milan, Italy",
    year: "2025",
    dateRange: "05/2025",
    accessionCode: "CUR-2025-AFT",
    theme: ["Socially Engaged Art", "Public Discourse", "Civic Activation"],
    shortDescription: "International exhibition spotlighting artists whose practices transform civic commons, foster democratic participation, and confront urgent societal inequities.",
    statement: "Conceived for the global Art for Tomorrow summit in Milan, this exhibition surveyed practices wherein art acts as a direct catalyst for community agency. The curatorial approach underscored accountability, avoiding tokenistic social rhetoric in favor of verifiable civic outcomes.",
    curatorialHighlights: [
      "Presented in Milan during the internationally recognized Art for Tomorrow summit",
      "Curation of international award laureates tackling migration, climate, and community justice",
      "Audience-engagement methodology bridging civic activists, collectors, and institutional leaders"
    ],
    materialsAndForms: ["Participatory archives", "Civic documentations", "Community textiles", "Video testimonials"],
    visualPlateType: "archival"
  },
  {
    id: "temporal-transferences-2024",
    title: "Temporal Transferences: Jean Cocteau x Mylene Jampanoi",
    venue: "Roma Gallery",
    institution: "Roma Gallery",
    role: "Production Manager",
    category: "production",
    location: "Athens, Greece",
    year: "2024",
    dateRange: "09/2024 - 10/2024",
    accessionCode: "PRD-2024-ROM1",
    theme: ["Modernism & Contemporary", "Poetic Line", "Production Management"],
    shortDescription: "A major dialogue pairing original drawings, ceramics, and poetry of Jean Cocteau with the contemporary visual investigations of Mylène Jampanoï.",
    statement: "Serving as Production Manager, orchestrating the complex installation of historical Cocteau loans alongside contemporary sculptural and photographic pieces by Mylène Jampanoï. The project required rigorous climate, security, and scenographic orchestration to create an unbroken poetic timeline.",
    curatorialHighlights: [
      "Museum-grade loan logistics and registrar operations for historic 20th-century artworks",
      "Scenographic spatial design facilitating intimate dialogue between Cocteau's ink lines and modern forms",
      "Coordination of bilingual publication and press relations in central Athens"
    ],
    materialsAndForms: ["Glazed ceramic plates", "Ink on paper", "Sculptural bronze", "Cinematic stills"],
    visualPlateType: "cocteau"
  },
  {
    id: "art-athina-2024",
    title: "Art Athina 2024",
    venue: "Zappeion Megaron",
    institution: "Roma Gallery",
    role: "Booth Curator & Sales Manager",
    category: "curatorial",
    location: "Athens, Greece",
    year: "2024",
    dateRange: "09/2024",
    accessionCode: "BOO-2024-AA",
    theme: ["Commercial Curation", "Art Market", "Contemporary Greek Art"],
    shortDescription: "Curating and managing Roma Gallery's premier booth at Greece's leading international art fair inside the neoclassical Zappeion Megaron.",
    statement: "Balancing curatorial rigor with commercial strategy. The booth juxtaposed post-war Greek avant-garde masters with cutting-edge contemporary voices, articulating an ongoing genealogy of formal and conceptual rupture in Greek modernism.",
    curatorialHighlights: [
      "High-visibility presentation at Greece's national art fair Zappeion Megaron",
      "Cohesive booth layout balancing historic masters with emerging contemporary creators",
      "Collector relations, institutional acquisitions, and public curatorial walk-throughs"
    ],
    materialsAndForms: ["Canvas oil", "Welded metal sculpture", "Monotypes", "Exhibition catalog dossiers"],
    visualPlateType: "monochrome"
  },
  {
    id: "chromophobia-2024",
    title: "Chromophobia",
    venue: "Roma Gallery",
    institution: "Roma Gallery",
    role: "Curator",
    category: "curatorial",
    location: "Athens, Greece",
    year: "2024",
    dateRange: "06/2024 – 07/2024",
    accessionCode: "CUR-2024-CHR",
    theme: ["Monochrome", "Iconology of Material", "Western Aesthetic Theory"],
    shortDescription: "An exhibition exploring David Batchelor's concept of 'chromophobia'—the historical Western suspicion of color as dangerous, cosmetic, or orientalized.",
    statement: "Drawing from Batchelor's seminal text, 'Chromophobia' investigated the tension between the pristine white cube and the unruly bodily eruption of raw pigment. By staging dialogues between monochromatic alabaster works and chromatic interventions, the exhibition interrogated how modernist purity masks ideological exclusions.",
    curatorialHighlights: [
      "Rigorous theoretical curation anchored in art history and critical philosophy",
      "Juxtaposition of tactile monochrome relief works with vibrant chemical pigments",
      "Curatorial publication featuring critical introductory essay by Asimina Siskata"
    ],
    materialsAndForms: ["Chalk-white gesso", "Raw cobalt & cadmium", "Polished plaster", "Unprimed linen"],
    visualPlateType: "monochrome"
  },
  {
    id: "and-all-our-world-is-dew-2024",
    title: "And All our World is Dew",
    venue: "ACG Art Gallery & Collection",
    institution: "Deree (ACG)",
    role: "Assistant Curator",
    category: "curatorial",
    location: "Athens, Greece",
    year: "2024",
    dateRange: "05/2024 – 07/2024",
    accessionCode: "CUR-2024-ACG1",
    theme: ["Ephemerality", "Archival Activation", "Poetics of Loss"],
    shortDescription: "Taking its title from Issa's haiku, this exhibition examined transience, dew as fragile matter, and photographic ephemerality in institutional archives.",
    statement: "Co-curating a poetic inquiry into transience across drawing, photography, and site-specific sculpture. The exhibition activated the ACG permanent collection, questioning how fragile works on paper resist entropy and how artistic traces survive collective forgetting.",
    curatorialHighlights: [
      "Selection of rarely seen works from the ACG Permanent Art Collection",
      "Author of published companion catalog essay published in June 2025",
      "Educational workshops for university students on museum archives and object care"
    ],
    materialsAndForms: ["Cyanotype", "Silver gelatin prints", "Wax", "Fragile handmade paper"],
    visualPlateType: "archival"
  },
  {
    id: "musicality-of-sculpture-2023",
    title: "The Musicality of Sculpture",
    venue: "ACG Art Gallery",
    institution: "Deree (ACG)",
    role: "Assistant Curator",
    category: "curatorial",
    location: "Athens, Greece",
    year: "2023",
    dateRange: "11/2023 – 01/2024",
    accessionCode: "CUR-2023-ACG2",
    theme: ["Sculpture", "Rhythm & Proportion", "Acoustic Space"],
    shortDescription: "Investigating the synesthetic relationship between volumetric mass, spatial rhythm, and musical cadence in three-dimensional form.",
    statement: "Investigating how sculptors articulate acoustic cadence through spatial void and mass. The exhibition examined Greek modern sculpture through the prism of rhythm, interval, and material resonance, treating the gallery space as an acoustic resonator.",
    curatorialHighlights: [
      "Archival research into post-war sculptural treatises and musical analogies",
      "Somatic choreography of viewing paths throughout the multi-level gallery",
      "Public programming linking art historians with contemporary sound artists"
    ],
    materialsAndForms: ["Cast bronze", "Pentelic marble", "Tension cables", "Wood carved reliefs"],
    visualPlateType: "stone"
  },
  {
    id: "elaionas-2023",
    title: "Elaionas 2023: Chthonic & the Anthropocene",
    venue: "Elaionas Post-Industrial District",
    institution: "Independent Curatorial Initiative",
    role: "Assistant Curator & Manager of Sponsorships and Operations",
    category: "curatorial",
    location: "Athens, Greece",
    year: "2023",
    dateRange: "09/2023 – 12/2023",
    accessionCode: "CUR-2023-ELA",
    theme: ["Chthonic Ecologies", "Industrial Ruins", "Site-Specific Intervention"],
    shortDescription: "Major site-responsive exhibition across Athens' historical industrial basin, uniting ancient chthonic myths with modern ecological ruination.",
    statement: "An ambitious multi-site exhibition staged within active warehouses, recycling plants, and neglected parcels of Elaionas. As Assistant Curator and Operations Manager, I navigated complex logistics in non-traditional urban spaces while investigating how deep underground strata mirror industrial extraction.",
    curatorialHighlights: [
      "Co-curation of 20+ site-responsive installations in working industrial premises",
      "Secured funding, municipal permits, and operational sponsorships across Athens",
      "Community mediation with local scrap yard workers, migrants, and cultural visitors"
    ],
    materialsAndForms: ["Industrial slag", "Soil cores", "Recycled copper wire", "Bitumen & asphalt"],
    visualPlateType: "chthonic"
  },
  {
    id: "art-athina-2023",
    title: "Art Athina 2023",
    venue: "Zappeion Megaron",
    institution: "Roma Gallery",
    role: "Sales Representative",
    category: "production",
    location: "Athens, Greece",
    year: "2023",
    dateRange: "09/2023",
    accessionCode: "BOO-2023-AA",
    theme: ["Art Market", "Post-War Modernism", "Client Relations"],
    shortDescription: "Representing Roma Gallery's prestigious roster of 20th-century Greek avant-garde artists and international figures at Art Athina.",
    statement: "Liaising with international art collectors, museum curators, and cultural patrons. The role required precise knowledge of provenance, conservation condition reports, and the historical trajectories of seminal Greek abstract painters.",
    curatorialHighlights: [
      "Presentation of museum-grade artworks from post-war Greek movements",
      "Client acquisition, sales negotiation, and inventory documentation",
      "Educational engagement with visiting youth art delegations"
    ],
    materialsAndForms: ["Mixed media on wood", "Vintage exhibition posters", "Plexiglas vitrines"],
    visualPlateType: "monochrome"
  },
  {
    id: "iomai-2023",
    title: "ἰῶμαι (Iomai)",
    venue: "Back to Athens International Festival",
    institution: "Back to Athens",
    role: "Curator",
    category: "curatorial",
    location: "Athens, Greece",
    year: "2023",
    dateRange: "06/2023 – 07/2023",
    accessionCode: "CUR-2023-BTA",
    theme: ["Healing & Trauma", "Ancient Epistemologies", "Neo-Balkan Poetics"],
    shortDescription: "From the ancient Greek verb ἰῶμαι ('to heal/cure'), an exhibition questioning somatic healing, medical trauma, and spiritual restorative rites in contemporary urbanity.",
    statement: "Curated within the decaying neoclassical rooms of Kotzia Square for Back to Athens. ἰῶμαι confronted personal and historical trauma, examining how somatic rituals, herbal medicines, and artistic acts function as therapeutic mechanisms against contemporary societal alienation.",
    curatorialHighlights: [
      "Curator of festival room installation inside a historic central Athens neoclassical building",
      "Integration of anthropological medicinal lore with contemporary body art and sound",
      "Critically reviewed in Athenian cultural media for its intimate spatial staging"
    ],
    materialsAndForms: ["Dried medicinal herbs", "Beeswax sculptures", "Gauze and thread", "Ceramic vessels"],
    visualPlateType: "balkan"
  },
  {
    id: "scattering-of-salts-2023",
    title: "Scattering of Salts",
    venue: "ACG Art Gallery",
    institution: "Deree (ACG)",
    role: "Assistant Curator & Gallery Attendant",
    category: "curatorial",
    location: "Athens, Greece",
    year: "2023",
    dateRange: "05/2023 – 06/2023",
    accessionCode: "CUR-2023-ACG3",
    theme: ["Materiality of Salt", "Preservation & Decay", "Ritual Mineralogy"],
    shortDescription: "An exploration of salt as preservative, alchemical agent, trade currency, and biological essence across sculptural and video practices.",
    statement: "Assisting in the curatorial execution of an exhibition centered on sodium chloride as both preserver of organic matter and corrupter of industrial surfaces. Resulted in my comprehensive essay 'A Scattering of Salts', later published in October 2024.",
    curatorialHighlights: [
      "Assistance in installation of sensitive salt-based organic installations",
      "Authored monographic publication essay analyzing mineral metaphors in contemporary art",
      "Guided daily curatorial tours and recorded audience phenomenological responses"
    ],
    materialsAndForms: ["Raw sea salt crystals", "Brine pools", "Rusted iron", "Microscopic photography"],
    visualPlateType: "salt"
  },
  {
    id: "the-space-between-2023",
    title: "The Space Between",
    venue: "ACG Gallery Space",
    institution: "Deree (ACG)",
    role: "Curator",
    category: "curatorial",
    location: "Athens, Greece",
    year: "2023",
    dateRange: "04/2023 – 05/2023",
    accessionCode: "CUR-2023-ACG4",
    theme: ["Liminality", "Architectural Thresholds", "Somatic Space"],
    shortDescription: "An exhibition framing liminality, thresholds, and spatial in-betweenness as fertile territories for artistic and subjective metamorphosis.",
    statement: "Exploring the architectural threshold—neither inside nor outside—as a psychological state of transition. Participating artists produced works that intervened in doorways, windows, and corridor bottlenecks, interrupting ordinary circulatory habits.",
    curatorialHighlights: [
      "Solo curatorial project realized in campus exhibition spaces",
      "Architectural intervention disrupting normative visitor pathways",
      "Curatorial brochure and artist interviews conducted and compiled"
    ],
    materialsAndForms: ["Semi-translucent membranes", "Threshold frames", "Mirrored glass", "Ambient light"],
    visualPlateType: "archival"
  },
  {
    id: "parousa-2023",
    title: "Parousa (Παρούσα)",
    venue: "Deree Gallery Project Space",
    institution: "Deree (ACG)",
    role: "Curator",
    category: "curatorial",
    location: "Athens, Greece",
    year: "2023",
    dateRange: "03/2023",
    accessionCode: "CUR-2023-ACG5",
    theme: ["Feminist Presence", "Archival Visibility", "Somatic Body"],
    shortDescription: "Centered on the female presence ('Παρούσα' – she who is present) in contemporary Greek art, confronting erasure from historical canons.",
    statement: "Taking inspiration from feminist art historiography, 'Parousa' interrogated the somatic and intellectual visibility of women artists in Greece. The exhibition examined bodily autonomy, domestic labor, and the reclaiming of sacred and profane iconography.",
    curatorialHighlights: [
      "Curated in celebration of International Women's Month with institutional backing",
      "Forum featuring emerging female painters, sculptors, and performance artists",
      "Published curatorial essay on contemporary feminist archival resistance"
    ],
    materialsAndForms: ["Textile embroidery", "Photographic self-portraits", "Clay figurines", "Video diaries"],
    visualPlateType: "balkan"
  },
  {
    id: "forthcoming-iii-2022",
    title: "FORTHCOMING III",
    venue: "Space52",
    institution: "Space52",
    role: "Research Assistant",
    category: "curatorial",
    location: "Athens, Greece",
    year: "2022",
    dateRange: "06/2022",
    accessionCode: "RES-2022-SP52",
    theme: ["Emerging Practices", "Artist-Run Space", "Institutional Research"],
    shortDescription: "Annual survey exhibition showcasing graduating and emerging artists in Athens' acclaimed artist-run center founded by Dionisis Christofilogiannis.",
    statement: "Conducting studio visits, background research, and artist statement copyediting for Space52's third edition of FORTHCOMING. The experience grounded my methodology in direct peer collaboration and non-hierarchical curatorial dialogue.",
    curatorialHighlights: [
      "Collaboration with leading Athenian artist-run independent space Space52",
      "Studio visit research and critical interviews with participating artists",
      "Archival cataloging of works and exhibition setup support"
    ],
    materialsAndForms: ["Experimental media", "Ceramic assemblages", "Neo-expressionist painting", "Zines"],
    visualPlateType: "archival"
  },
  {
    id: "weaving-worlds-2022",
    title: "Weaving Worlds",
    venue: "ACG Art Gallery",
    institution: "Deree (ACG)",
    role: "Assistant Curator",
    category: "curatorial",
    location: "Athens, Greece",
    year: "2022",
    dateRange: "05/2022 – 06/2022",
    accessionCode: "CUR-2022-ACG6",
    theme: ["Textile Histories", "Balkan Weaving", "Vernacular Craft"],
    shortDescription: "An exhibition exploring the loom, tapestry, and weaving as universal epistemologies of world-building and cultural preservation.",
    statement: "Unpacking the loom as a cosmic computer and archival matrix. 'Weaving Worlds' traced the migration of weaving motifs across the Balkans and Greece, highlighting how anonymous female craftswomen encoded resistance, family genealogies, and regional botanies into warp and weft.",
    curatorialHighlights: [
      "Assistant curator for foundational textile and contemporary craft exhibition",
      "Led to authored publication 'Weaving Worlds' published in September 2023",
      "Liaison with traditional weavers, contemporary fiber artists, and folklorists"
    ],
    materialsAndForms: ["Hand-spun wool", "Natural plant dyes", "Traditional wooden loom parts", "Jacquard tapestries"],
    visualPlateType: "textile"
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub-and-all-our-world-2025",
    title: "And All Our World is Dew",
    date: "June 2025",
    year: "2025",
    publisher: "ACG Art Gallery & Collection Editions",
    type: "Monographic Catalog Essay",
    citation: "Siskata, A. (2025). And All Our World is Dew: Fragility, Transience, and Archival Survival in Contemporary Practice. Athens: ACG Gallery Publications.",
    abstract: "A critical essay contemplating the haiku of Kobayashi Issa as a conceptual lens for contemporary artistic transience. The text examines how artists employ fragile matter—wax, water, untreated paper, fugitive pigments—to subvert institutional impulses toward permanent monumentalization.",
    excerpt: "“To name an exhibition after dew is to stage a direct confrontation with the archival impulse. While museums are engineered to arrest decay—monitoring lux levels and desiccating air—dew exists solely in its imminent disappearance. The works collected here do not plead for preservation; rather, they find their radical integrity in the exact instant before evaporation.”",
    tags: ["Transience", "Materiality", "Archival Theory", "ACG Collection"]
  },
  {
    id: "pub-scattering-of-salts-2024",
    title: "A Scattering of Salts",
    date: "October 2024",
    year: "2024",
    publisher: "Contemporary Art & Materiality Press",
    type: "Critical Exhibition Monograph",
    citation: "Siskata, A. (2024). A Scattering of Salts: Mineral Agency, Historical Extraction, and the Somatic Archive. Athens: Contemporary Art & Materiality Press.",
    abstract: "Tracing the mineral agency of halite (sea and rock salt) through Mediterranean history, alchemical symbolism, and contemporary installation art. Salt is evaluated simultaneously as biological necessity, economic currency, and corrosive insurgent in pristine gallery spaces.",
    excerpt: "“Salt is paradoxical: it halts the putrefaction of flesh while relentlessly corroding the steel beams of modernity. In scattering salt across the gallery floor, the artist enacts an ancient ritual of boundary-marking and sanctification, yet also introduces a ticking clock of chemical corrosion. The mineral refuses to remain an inanimate substrate; it breathes atmospheric humidity and recrystallizes anew each dawn.”",
    tags: ["Iconology of Material", "Salt", "Alchemy", "Somatic Architecture"]
  },
  {
    id: "pub-days-of-art-2024",
    title: "Days of Art in Greece: Balkan Resonances in Athenian Contemporary Spaces",
    date: "March 2024",
    year: "2024",
    publisher: "Days of Art in Greece, Issue 28",
    type: "Special Issue Critical Article",
    citation: "Siskata, A. (2024). 'Balkan Resonances in Athenian Contemporary Spaces: Transcending the Post-Ottoman Void'. Days of Art in Greece, 28, pp. 44-51.",
    abstract: "A wide-ranging survey article investigating the resurgence of neo-Balkan aesthetics, folk mythologies, and vernacular craft within independent Athenian galleries. The paper argues for a re-centering of Southeast European regional kinships over uncritical mimicry of Anglo-American conceptualism.",
    excerpt: "“For decades, Athenian contemporary art gazed stubbornly westward toward Paris, Berlin, and London, turning its back on the immediate geographic hinterland of the Balkan peninsula. Today, a young generation of artists and curators is actively digging into the shared somatic repository of the Balkans: the kilim patterns that cross invisible borders, the lamentations sung at village thresholds, the collective memory carved into limestone.”",
    tags: ["Neo-Balkan Narratives", "Days of Art", "Athenian Scene", "Vernacular Histories"]
  },
  {
    id: "pub-weaving-worlds-2023",
    title: "Weaving Worlds: Textile Epistemologies and the Architecture of the Loom",
    date: "September 2023",
    year: "2023",
    publisher: "Deree Curatorial Studies Monograph Series",
    type: "Exhibition Monograph & Curatorial Study",
    citation: "Siskata, A. (2023). Weaving Worlds: Textile Epistemologies and the Architecture of the Loom. Athens: Deree Curatorial Studies Series.",
    abstract: "An analytical study investigating the structural and cosmological significance of weaving. Drawing upon Gottfried Semper’s tectonic theory and regional Southeast European folklore, the essay repositions textile craft as primary architecture and feminine knowledge production.",
    excerpt: "“The warp is time; the weft is event. Long before the invention of written codices, Balkan women encoded genealogies, agrarian calendars, and medicinal remedies into the tension of their looms. When contemporary artists intervene in these textile lineages, they are not indulging in nostalgic folklore—they are rebooting a formidable computational and political language that precedes the modern state.”",
    tags: ["Textiles", "Architecture of Loom", "Feminist Historiography", "Craft Epistemology"]
  }
];

export const AWARDS: Award[] = [
  {
    title: "Recipient of the “Outstanding Graduating Student Award, Art History”",
    institution: "Deree – The American College of Greece",
    period: "2025",
    description: "Conferred to the single graduating senior demonstrating the highest academic distinction, theoretical leadership, and curatorial promise across the Department of Art History."
  },
  {
    title: "Frances Rich Fine and Performing Arts Scholarship",
    institution: "Frances Rich Endowment & ACG",
    period: "2022 – 2025",
    description: "Prestigious multi-year merit endowment awarded to exceptional students dedicated to research and practice in the visual arts, museum studies, and art history."
  },
  {
    title: "Deree Merit Scholarship",
    institution: "The American College of Greece",
    period: "2021 – 2025",
    description: "Continuous institutional academic merit scholarship honoring sustained top-percentile GPA performance and contributions to academic scholarship."
  },
  {
    title: "Recipient of the “Outstanding Society Member” Award",
    institution: "ACG Art History Society",
    period: "2024",
    description: "Awarded for exceptional leadership in organizing symposia, curating student exhibitions, and fostering critical academic discourse across the college community."
  }
];
