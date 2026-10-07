import React from 'react';

interface CuratorPlateProps {
  type: 'stone' | 'salt' | 'textile' | 'monochrome' | 'chthonic' | 'cinema' | 'venice' | 'balkan' | 'cocteau' | 'archival';
  accessionCode: string;
  title: string;
  venue: string;
  year: string;
  className?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'video';
}

export const CuratorPlate: React.FC<CuratorPlateProps> = ({
  type,
  accessionCode,
  title,
  venue,
  year,
  className = '',
  aspectRatio = 'landscape'
}) => {
  const aspectClass = {
    landscape: 'aspect-[16/10]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
    video: 'aspect-[16/9]'
  }[aspectRatio];

  const renderPlateArtwork = () => {
    switch (type) {
      case 'venice':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full text-[#292524] stroke-current" fill="none">
            <rect width="400" height="250" fill="#F4EFE6" />
            {/* Waterlines of Grand Canal */}
            <path d="M0 190 C100 185, 200 195, 400 190" strokeWidth="0.8" opacity="0.35" />
            <path d="M0 205 C120 200, 260 210, 400 205" strokeWidth="0.8" opacity="0.45" />
            <path d="M0 220 C80 215, 280 225, 400 220" strokeWidth="0.8" opacity="0.3" />
            {/* Palazzo Venier dei Leoni Unfinished Facade lines */}
            <line x1="60" y1="165" x2="340" y2="165" strokeWidth="1.5" />
            <line x1="80" y1="165" x2="80" y2="105" strokeWidth="1" />
            <line x1="320" y1="165" x2="320" y2="105" strokeWidth="1" />
            {/* Istrian stone rustication & Lion heads abstract motif */}
            <rect x="95" y="115" width="40" height="50" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
            <rect x="155" y="115" width="40" height="50" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
            <rect x="215" y="115" width="40" height="50" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
            <rect x="275" y="115" width="40" height="50" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
            {/* Modernist sculpture plinth in garden */}
            <circle cx="200" cy="80" r="28" strokeWidth="1" opacity="0.7" />
            <path d="M190 60 Q215 75 195 95" strokeWidth="1.2" />
            <line x1="170" y1="108" x2="230" y2="108" strokeWidth="1.5" />
            <text x="200" y="238" textAnchor="middle" fill="#78716C" fontSize="8" fontFamily="monospace" letterSpacing="0.2em">
              PALAZZO VENIER DEI LEONI · VENEZIA · LAT 45.4308° N
            </text>
          </svg>
        );

      case 'salt':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full text-[#1C1917] stroke-current" fill="none">
            <rect width="400" height="250" fill="#F8F6F0" />
            {/* Isometric Halite Cubic Crystal Grid */}
            <g transform="translate(140, 45)" strokeWidth="0.9">
              {/* Central Salt Cube */}
              <polygon points="60,30 120,65 60,100 0,65" fill="#EAE5D9" fillOpacity="0.4" />
              <polygon points="0,65 60,100 60,165 0,130" fill="#E2DDD0" fillOpacity="0.6" />
              <polygon points="120,65 60,100 60,165 120,130" fill="#D8D2C2" fillOpacity="0.3" />
              {/* Secondary Crystallisation Fractures */}
              <line x1="60" y1="30" x2="60" y2="100" strokeDasharray="3 3" opacity="0.6" />
              <line x1="0" y1="65" x2="120" y2="65" strokeDasharray="2 2" opacity="0.4" />
              {/* Scattering points */}
              <circle cx="-30" cy="110" r="2" fill="#78716C" />
              <circle cx="-15" cy="85" r="1.5" fill="#78716C" />
              <circle cx="140" cy="120" r="2.5" fill="#78716C" />
              <circle cx="160" cy="90" r="1.5" fill="#78716C" />
              <circle cx="90" cy="190" r="2" fill="#78716C" />
              <circle cx="40" cy="180" r="1.5" fill="#78716C" />
            </g>
            <text x="200" y="235" textAnchor="middle" fill="#78716C" fontSize="8" fontFamily="monospace" letterSpacing="0.2em">
              MINERALOGICAL ARCHIVE · HALITE [NaCl] · HYGROSCOPIC VECTOR
            </text>
          </svg>
        );

      case 'chthonic':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full text-[#1C1917] stroke-current" fill="none">
            <rect width="400" height="250" fill="#EFECE6" />
            {/* Stratigraphic Soil Layers of Elaionas Basin */}
            <path d="M0 70 Q100 85 200 65 T400 75" strokeWidth="1" />
            <path d="M0 110 Q120 95 240 120 T400 105" strokeWidth="1.2" strokeDasharray="4 2" />
            <path d="M0 150 Q80 165 220 145 T400 160" strokeWidth="1" />
            <path d="M0 190 Q150 180 300 200 T400 185" strokeWidth="1.5" />
            {/* Ancient Root System meets Industrial Core */}
            <path d="M200 70 C190 100, 170 120, 160 160 C155 180, 150 210, 140 230" strokeWidth="1.5" opacity="0.8" />
            <path d="M200 70 C215 95, 230 130, 245 170 C250 190, 255 215, 260 230" strokeWidth="1.2" opacity="0.7" />
            {/* Archaeological depth pins */}
            <line x1="60" y1="40" x2="60" y2="190" strokeWidth="0.75" strokeDasharray="2 4" />
            <line x1="340" y1="40" x2="340" y2="190" strokeWidth="0.75" strokeDasharray="2 4" />
            <text x="200" y="238" textAnchor="middle" fill="#78716C" fontSize="8" fontFamily="monospace" letterSpacing="0.2em">
              ELAIONAS STRATIGRAPHY · POST-INDUSTRIAL CHTHONIC BASIN
            </text>
          </svg>
        );

      case 'textile':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full text-[#1C1917] stroke-current" fill="none">
            <rect width="400" height="250" fill="#F6F3EC" />
            {/* Loom Warp and Weft Matrix */}
            {[...Array(14)].map((_, i) => (
              <line key={`warp-${i}`} x1={40 + i * 24} y1="35" x2={40 + i * 24} y2="205" strokeWidth="0.75" opacity="0.4" />
            ))}
            {/* Weft Geometries - Balkan Kilim Diamond */}
            <polygon points="196,55 268,120 196,185 124,120" strokeWidth="1.5" fill="#E8DEC8" fillOpacity="0.4" />
            <polygon points="196,75 244,120 196,165 148,120" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
            <polygon points="196,95 220,120 196,145 172,120" strokeWidth="1.2" fill="#D4C8AF" fillOpacity="0.5" />
            {/* Traditional shuttle tension markers */}
            <line x1="20" y1="120" x2="380" y2="120" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.5" />
            <text x="200" y="235" textAnchor="middle" fill="#78716C" fontSize="8" fontFamily="monospace" letterSpacing="0.2em">
              BALKAN TECTONICS · WARP/WEFT ARCHITECTURAL CONTINUUM
            </text>
          </svg>
        );

      case 'cocteau':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full text-[#1C1917] stroke-current" fill="none">
            <rect width="400" height="250" fill="#FAF6EE" />
            {/* Continuous Poetic Contour Profile & Celestial Star */}
            <path
              d="M100 180 C120 140, 110 100, 140 70 C165 45, 210 50, 225 80 C240 110, 215 145, 255 170 C285 190, 320 160, 310 120"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Cocteau 5-pointed star insignia */}
            <path
              d="M275 60 L280 75 L296 75 L283 85 L288 100 L275 90 L262 100 L267 85 L254 75 L270 75 Z"
              strokeWidth="1"
              fill="#D6C7AA"
              fillOpacity="0.5"
            />
            {/* Ceramic plate rim ellipse */}
            <ellipse cx="200" cy="125" rx="145" ry="85" strokeWidth="0.8" strokeDasharray="5 3" opacity="0.45" />
            <text x="200" y="235" textAnchor="middle" fill="#78716C" fontSize="8" fontFamily="monospace" letterSpacing="0.2em">
              JEAN COCTEAU × MYLÈNE JAMPANOÏ · POETIC TRANSFERENCE
            </text>
          </svg>
        );

      case 'monochrome':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full text-[#1C1917] stroke-current" fill="none">
            <rect width="400" height="250" fill="#FDFBF7" />
            {/* Pure Architectural Tension of White Cube */}
            <rect x="70" y="45" width="260" height="150" strokeWidth="1" fill="#FFFFFF" />
            {/* Subdued internal relief shadows */}
            <rect x="100" y="70" width="90" height="100" strokeWidth="0.5" fill="#F7F5F0" />
            <rect x="210" y="70" width="90" height="100" strokeWidth="0.5" fill="#F3EFE8" />
            {/* Hairline division */}
            <line x1="200" y1="45" x2="200" y2="195" strokeWidth="0.75" />
            <line x1="50" y1="210" x2="350" y2="210" strokeWidth="0.5" opacity="0.3" />
            <text x="200" y="235" textAnchor="middle" fill="#78716C" fontSize="8" fontFamily="monospace" letterSpacing="0.2em">
              MONOCHROME STUDY · RELIEF, LIGHT & SPATIAL PURITY
            </text>
          </svg>
        );

      case 'cinema':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full text-[#1C1917] stroke-current" fill="none">
            <rect width="400" height="250" fill="#F1ECE1" />
            {/* Archipelago Coastline & Cinematic Frame */}
            <rect x="50" y="35" width="300" height="168" strokeWidth="1.2" fill="#E6DFD0" fillOpacity="0.4" />
            {/* Island topographic contours (Patmos shape abstracted) */}
            <path d="M120 110 C140 80, 160 130, 200 95 C230 70, 270 120, 280 145 C250 160, 200 140, 160 165 Z" strokeWidth="1" />
            <circle cx="200" cy="119" r="3" fill="#1C1917" />
            {/* Optical film sprockets */}
            {[...Array(9)].map((_, i) => (
              <rect key={`sprocket-${i}`} x={62 + i * 32} y="42" width="12" height="8" rx="1" strokeWidth="0.6" opacity="0.5" />
            ))}
            <text x="200" y="235" textAnchor="middle" fill="#78716C" fontSize="8" fontFamily="monospace" letterSpacing="0.2em">
              AEGEAN ARCHIPELAGO · PATMOS MARITIME CHRONOTOPE
            </text>
          </svg>
        );

      case 'balkan':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full text-[#1C1917] stroke-current" fill="none">
            <rect width="400" height="250" fill="#F5EFE6" />
            {/* Archaic Ceramic Vessel & Healing Herb Herbarium line */}
            <path d="M160 80 Q200 70 240 80 Q255 120 230 160 Q215 180 200 180 Q185 180 170 160 Q145 120 160 80 Z" strokeWidth="1.2" fill="#ECE2D0" fillOpacity="0.5" />
            <line x1="200" y1="80" x2="200" y2="180" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
            {/* Botanicals of ἰῶμαι (medicinal flora) */}
            <path d="M200 130 Q170 115 150 125" strokeWidth="1" />
            <path d="M200 145 Q230 135 250 145" strokeWidth="1" />
            <circle cx="150" cy="125" r="2.5" fill="#78716C" />
            <circle cx="250" cy="145" r="2.5" fill="#78716C" />
            <text x="200" y="235" textAnchor="middle" fill="#78716C" fontSize="8" fontFamily="monospace" letterSpacing="0.2em">
              VERNACULAR HEALING ARCHIVE · ἰῶμαι · ANTHROPOLOGICAL SPECIMEN
            </text>
          </svg>
        );

      case 'stone':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full text-[#1C1917] stroke-current" fill="none">
            <rect width="400" height="250" fill="#EDE9DF" />
            {/* Pentelic Marble & Circular Cultures Geometry */}
            <circle cx="200" cy="115" r="65" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <polygon points="200,50 255,145 145,145" strokeWidth="1.4" fill="#DDD6C7" fillOpacity="0.5" />
            <line x1="145" y1="145" x2="255" y2="145" strokeWidth="2" />
            {/* Masonry chisel score marks */}
            <line x1="180" y1="100" x2="195" y2="115" strokeWidth="0.8" opacity="0.7" />
            <line x1="205" y1="100" x2="220" y2="115" strokeWidth="0.8" opacity="0.7" />
            <line x1="190" y1="120" x2="205" y2="135" strokeWidth="0.8" opacity="0.7" />
            <text x="200" y="235" textAnchor="middle" fill="#78716C" fontSize="8" fontFamily="monospace" letterSpacing="0.2em">
              CIRCULAR CULTURES · PETROLOGICAL VECTOR & SPATIAL CADENCE
            </text>
          </svg>
        );

      case 'archival':
      default:
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full text-[#1C1917] stroke-current" fill="none">
            <rect width="400" height="250" fill="#F8F5EE" />
            {/* Museum Accession Vitrine & Dossier Folio */}
            <rect x="80" y="45" width="240" height="150" strokeWidth="1.2" fill="#EFE8D9" fillOpacity="0.3" />
            <line x1="80" y1="80" x2="320" y2="80" strokeWidth="0.8" />
            <line x1="110" y1="110" x2="290" y2="110" strokeWidth="0.6" opacity="0.5" />
            <line x1="110" y1="130" x2="290" y2="130" strokeWidth="0.6" opacity="0.5" />
            <line x1="110" y1="150" x2="240" y2="150" strokeWidth="0.6" opacity="0.5" />
            {/* Institutional Seal Stamp */}
            <circle cx="270" cy="155" r="18" strokeWidth="0.9" strokeDasharray="3 2" fill="#DFD6C2" fillOpacity="0.5" />
            <text x="270" y="158" textAnchor="middle" fill="#78716C" fontSize="6" fontFamily="sans-serif">ARCHIVUM</text>
            <text x="200" y="235" textAnchor="middle" fill="#78716C" fontSize="8" fontFamily="monospace" letterSpacing="0.2em">
              CURATORIAL DOSSIER · EPHEMERA, INK & RESIDUAL MEMORY
            </text>
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden border border-[#1C1917]/10 bg-[#FAF8F5] group ${aspectClass} ${className}`}>
      {/* Plate Header Strip */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-3 py-2 bg-[#FAF8F5]/90 backdrop-blur-xs border-b border-[#1C1917]/8 text-[10px] tracking-widest text-[#78716C] uppercase font-sans">
        <span className="font-mono tabular-nums">{accessionCode}</span>
        <span className="truncate max-w-[180px]">{venue}</span>
        <span className="font-mono tabular-nums">{year}</span>
      </div>

      {/* Artwork Canvas */}
      <div className="w-full h-full pt-8 pb-7 flex items-center justify-center p-2">
        {renderPlateArtwork()}
      </div>

      {/* Plate Caption Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-3 py-1.5 bg-[#FAF8F5]/95 border-t border-[#1C1917]/8 text-[11px] text-[#1C1917] font-serif italic">
        <span className="truncate pr-2">Fig. {accessionCode.replace(/[^0-9]/g, '').slice(-2) || '01'} — {title}</span>
        <span className="text-[9px] uppercase tracking-wider text-[#78716C] not-italic font-sans shrink-0">Plate Ref</span>
      </div>
    </div>
  );
};
