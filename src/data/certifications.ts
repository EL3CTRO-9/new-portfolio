export type Certification = {
  code: string;
  name: string;
  fullName: string;
  year: string;
  credlyUuid: string | null;
  badgeImage: string;
  focusArea: "defense" | "cloud" | "development" | "foundations";
};

export const certifications: Certification[] = [
  // CYBER DEFENSE
  {
    code: "GSEC",
    name: "Security Essentials",
    fullName: "GIAC Security Essentials",
    year: "2022",
    credlyUuid: "7bc21f2b-29b3-4c92-a3c3-7ebe740169cf",
    badgeImage: "/credly/gsec.png",
    focusArea: "defense",
  },
  {
    code: "GCIH",
    name: "Incident Handler",
    fullName: "GIAC Certified Incident Handler",
    year: "2023",
    credlyUuid: "154ce60b-b07e-481a-bb90-eb8903d9254a",
    badgeImage: "/credly/gcih.png",
    focusArea: "defense",
  },
  {
    code: "GCIA",
    name: "Intrusion Analyst",
    fullName: "GIAC Certified Intrusion Analyst",
    year: "2024",
    credlyUuid: "fc83e520-e755-4120-9566-9ba3971ca3b6",
    badgeImage: "/credly/gcia.png",
    focusArea: "defense",
  },
  {
    code: "GFACT",
    name: "Foundational Cybersecurity",
    fullName: "GIAC Foundational Cybersecurity Technologies",
    year: "2022",
    credlyUuid: "067b6957-1046-49d2-ba50-53a62ada6653",
    badgeImage: "/credly/gfact.png",
    focusArea: "defense",
  },

  // CLOUD
  {
    code: "GCLD",
    name: "Cloud Security Essentials",
    fullName: "GIAC Cloud Security Essentials",
    year: "2024",
    credlyUuid: "c49f4bbe-8387-4b0b-b3b3-aa25c5ca91f6",
    badgeImage: "/credly/gcld.png",
    focusArea: "cloud",
  },
  {
    code: "GCSA",
    name: "Cloud Security Automation",
    fullName: "GIAC Cloud Security Automation",
    year: "2024",
    credlyUuid: "17977ed3-a732-4969-98c5-00d79bfa70ad",
    badgeImage: "/credly/gcsa.png",
    focusArea: "cloud",
  },

  // DEVELOPMENT & ML
  {
    code: "GPYC",
    name: "Python Coder",
    fullName: "GIAC Python Coder",
    year: "2024",
    credlyUuid: "cd38a0b8-7ce5-4692-aadd-82140a6608f1",
    badgeImage: "/credly/gpyc.png",
    focusArea: "development",
  },
  {
    code: "GMLE",
    name: "Machine Learning Engineer",
    fullName: "GIAC Machine Learning Engineer",
    year: "2024",
    credlyUuid: "6f400756-23ac-4c4d-9b6e-32ac942e7903",
    badgeImage: "/credly/gmle.png",
    focusArea: "development",
  },

  // FOUNDATIONS
  {
    code: "GISF",
    name: "Information Security Fundamentals",
    fullName: "GIAC Information Security Fundamentals",
    year: "2022",
    credlyUuid: "2fc2493a-1b40-4d2a-8966-c171f4e9c40a",
    badgeImage: "/credly/gisf.png",
    focusArea: "foundations",
  },
  {
    code: "GAB",
    name: "Advisory Board",
    fullName: "GIAC Advisory Board",
    year: "2024",
    credlyUuid: "77fa71b1-996e-4bee-bee5-7818e8235b0f",
    badgeImage: "/credly/giac-advisory-board.png",
    focusArea: "foundations",
  },
];

export const focusAreaLabels: Record<Certification["focusArea"], string> = {
  defense: "Cyber Defense",
  cloud: "Cloud",
  development: "Development & ML",
  foundations: "Foundations",
};

export const focusAreaOrder: Certification["focusArea"][] = [
  "defense",
  "cloud",
  "development",
  "foundations",
];

export function buildCredlyUrl(uuid: string): string {
  return `https://www.credly.com/badges/${uuid}/public_url`;
}
