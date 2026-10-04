// Inhoud van de About-sectie. Teksten door Rinke goedgekeurd (4 okt).
export const about = {
  statement: "I build brands and design to let people see, feel and hold on to. Made to stand out and built to last.",
  services: ["Brand Identity", "Packaging", "Product Development", "Art Direction", "Graphic Design", "Digital Design", "Web Design", "Social Content"],
  experience: [
    { name: "JaJa", lines: ["Creative Director & Designer", "7 years"] },
    { name: "Design by Rink", lines: ["Digital, Packaging & Social", "3 years"] },
    { name: "Code d’Azur", lines: ["Internship", "Marketing & Creative", "6 months"] },
    { name: "Wessel de Groot", lines: ["Internship", "Assistant Photography & Design", "6 months"] },
  ],
  education: [
    { name: "AMFI", lines: ["Fashion & Branding", "4 years"] },
    { name: "Sint Lucas", lines: ["Graphic Design & Photography", "4 years"] },
  ],
  numbers: [{ to: 38, label: "Projects" }, { to: 7, label: "Years of experience" }],
  // Officiële logo's via Iconify (public/tools). Magnific heeft er nog geen: tijdelijke letter-tegel.
  tools: [
    { name: "Illustrator", logo: "/tools/illustrator.svg" }, { name: "Photoshop", logo: "/tools/photoshop.svg" },
    { name: "InDesign", logo: "/tools/indesign.svg" }, { name: "Figma", logo: "/tools/figma.svg" },
    { name: "CapCut", logo: "/tools/capcut.svg" }, { name: "Shopify", logo: "/tools/shopify.svg" },
    { name: "Claude", logo: "/tools/claude.svg" }, { name: "ChatGPT", logo: "/tools/chatgpt.svg" },
    { name: "Midjourney", logo: "/tools/midjourney.svg" }, { name: "Magnific", mark: "Ma" },
    { name: "Automation", logo: "/tools/automation.svg" },
  ] as { name: string; logo?: string; mark?: string }[],
};
