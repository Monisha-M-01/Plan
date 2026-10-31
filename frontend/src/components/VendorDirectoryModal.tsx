import { useState } from "react";
import { Briefcase, Mail, Copy, Check, X, Search, Filter, Phone, Star } from "lucide-react";

interface VendorDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VendorDirectoryItem {
  id: string;
  role: string;
  category: string;
  typicalBudgetPct: string;
  rating: number;
  description: string;
  inquiryTemplate: string;
  keyQuestions: string[];
}

const DIRECTORY_DATA: VendorDirectoryItem[] = [
  {
    id: "v1",
    role: "Artisan Farm-to-Table Caterer",
    category: "Catering & Hospitality",
    typicalBudgetPct: "35% – 48%",
    rating: 4.9,
    description: "Multi-course seasonal dining, wine-pairing service, curated antipasti grazing stations, and full bar staff.",
    inquiryTemplate: "Hello, We are organizing an upcoming event and love your seasonal farm-to-table culinary focus. We would like to inquire about your availability and request sample menus and beverage package pricing for our date. Thank you!",
    keyQuestions: [
      "Are barware, plates, flatware, and service linens included in the quote?",
      "What is your dedicated staff-to-guest ratio for seated service?",
      "Do you provide a complimentary tasting session prior to contract signing?"
    ]
  },
  {
    id: "v2",
    role: "Editorial Fine Art Photographer",
    category: "Photography & Media",
    typicalBudgetPct: "12% – 15%",
    rating: 4.9,
    description: "Documentary-style natural light storytelling, 35mm film captures, golden hour portraits, and drone aerials.",
    inquiryTemplate: "Dear Studio Team, We are planning our event and love your organic editorial aesthetic. We are seeking an 8-hour documentary photography package. Could you kindly share your availability and package options?",
    keyQuestions: [
      "How many high-resolution edited images are delivered in the final gallery?",
      "What is your turnaround timeframe for sneak-peek highlights?",
      "Do you carry comprehensive commercial general liability insurance?"
    ]
  },
  {
    id: "v3",
    role: "Botanical Stylist & Tablescape Designer",
    category: "Florals & Styling",
    typicalBudgetPct: "10% – 12%",
    rating: 4.8,
    description: "Organic potted olive foliage, terracotta vessels, seasonal garden blooms, and warm ambient festoon lighting.",
    inquiryTemplate: "Hi there, We are curating our event aesthetic and would love to collaborate on floral styling, tablescapes, and ambient festoon lighting. Could you share your portfolio and consultation process?",
    keyQuestions: [
      "Can floral arrangements be repurposed from ceremony to dining tables?",
      "Do you handle complete breakdown and strike at the end of the evening?",
      "Do you provide rental vessels, terracotta pots, and taper candles directly?"
    ]
  },
  {
    id: "v4",
    role: "Acoustic Soloist & Live DJ Duo",
    category: "Music & Entertainment",
    typicalBudgetPct: "8% – 10%",
    rating: 4.9,
    description: "Acoustic guitar and vocals for daytime reception transitioning into open-format terrace dance party.",
    inquiryTemplate: "Hello, We are seeking musical entertainment for our upcoming celebration—specifically acoustic accompaniment transitioning into an evening dance DJ. Please let us know if you have availability on our date.",
    keyQuestions: [
      "Do you provide wireless lapel microphones for speeches and vows?",
      "Can you learn customized song requests for milestone moments?",
      "What backup sound equipment and power generators do you bring on-site?"
    ]
  },
  {
    id: "v5",
    role: "Stage, Audio & Lighting Production",
    category: "Production & AV",
    typicalBudgetPct: "20% – 35%",
    rating: 4.8,
    description: "Outdoor concert stages, line-array audio systems, wireless mic arrays, and safety-certified power distribution.",
    inquiryTemplate: "Dear Production Team, We are organizing a gathering and require stage rentals, comprehensive line-array audio, and sound engineering for our live performances. Please provide pricing and specs.",
    keyQuestions: [
      "Are generators and fuel included in the production quote?",
      "Is a dedicated sound technician on-site throughout the entire run of show?",
      "What wind-load ratings and engineering certifications do your stages hold?"
    ]
  },
  {
    id: "v6",
    role: "Municipal Permit & Safety Officers",
    category: "Permits & Safety",
    typicalBudgetPct: "15% – 25%",
    rating: 5.0,
    description: "City special event filing, crowd management, on-site EMT first-aid stations, and security personnel.",
    inquiryTemplate: "Hello, We are organizing a public gathering and require assistance with municipal permit filings, crowd management plans, and dedicated certified event security staffing.",
    keyQuestions: [
      "Are security personnel certified in crowd management and emergency protocols?",
      "Do you coordinate directly with the local fire marshal and police department?",
      "What is the required lead time for city permit approvals?"
    ]
  }
];

export function VendorDirectoryModal({ isOpen, onClose }: VendorDirectoryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ["ALL", "Catering & Hospitality", "Photography & Media", "Florals & Styling", "Music & Entertainment", "Production & AV", "Permits & Safety"];

  const filtered = DIRECTORY_DATA.filter((v) => {
    const matchesCat = selectedCategory === "ALL" || v.category === selectedCategory;
    const matchesSearch =
      v.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B2118]/40 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-warm-lg border border-[#F3D3B8] bg-white/95">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#F3D3B8]/80 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFE9D6] border border-[#F3D3B8] text-[10px] font-bold uppercase tracking-wider text-[#C2561A] mb-1">
              Curated Partners
            </div>
            <h2 className="text-xl font-bold text-[#2B2118]">Vendor Directory & RFP Standards</h2>
            <p className="text-xs text-[#6B5B4E]">
              Pre-vetted event service specifications, budget allocations, and ready-to-dispatch RFP templates.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white hover:bg-[#FFE9D6]/60 border border-[#F3D3B8] flex items-center justify-center text-[#6B5B4E] hover:text-[#2B2118] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-3.5 border-b border-[#F3D3B8]/60 bg-[#FFE9D6]/20 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#9A8878] pointer-events-none" />
            <input
              type="text"
              placeholder="Search by role, specialty, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3.5 bg-white border border-[#F3D3B8] rounded-xl text-xs text-[#2B2118] placeholder-[#9A8878] focus:outline-none focus:ring-2 focus:ring-[#F9A66C]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#C2561A] text-white shadow-xs"
                    : "bg-white text-[#6B5B4E] hover:text-[#2B2118] border border-[#F3D3B8]"
                }`}
              >
                {cat === "ALL" ? "All Categories" : cat.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* List of Vendors */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((v) => (
              <div
                key={v.id}
                className="p-5 rounded-2xl bg-white/80 border border-[#F3D3B8] shadow-2xs space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C2561A] bg-[#FFE9D6] px-2 py-0.5 rounded-full border border-[#F3D3B8]">
                      {v.category}
                    </span>
                    <span className="text-xs font-bold text-[#2B2118] bg-white px-2 py-0.5 rounded-lg border border-[#F3D3B8]">
                      Benchmark: {v.typicalBudgetPct}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#2B2118] flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#C2561A]" />
                    {v.role}
                  </h3>

                  <p className="text-xs text-[#6B5B4E] leading-relaxed">
                    {v.description}
                  </p>
                </div>

                {/* Key Questions */}
                <div className="space-y-1.5 pt-2 border-t border-[#F3D3B8]/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A8878]">
                    Essential Interview Questions:
                  </span>
                  <ul className="space-y-1 text-xs text-[#6B5B4E]">
                    {v.keyQuestions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#C2561A] font-bold">•</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Copy Template Button */}
                <div className="pt-2">
                  <button
                    onClick={() => handleCopy(v.id, v.inquiryTemplate)}
                    className="w-full h-9 bg-white hover:bg-[#FFE9D6]/50 text-[#C2561A] border border-[#F3D3B8] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedId === v.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">RFP Template Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email RFP Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#F3D3B8]/80 bg-[#FFE9D6]/20 flex justify-between items-center text-xs text-[#6B5B4E]">
          <span>{filtered.length} service provider categories available</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-[#F3D3B8] rounded-xl font-bold text-[#2B2118] hover:bg-[#FFE9D6]/40 cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

