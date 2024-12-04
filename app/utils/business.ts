import { BusinessType } from "@prisma/client";

type ReplaceUnderscoreWithHyphen<T extends string> =
  T extends `${infer First}_${infer Rest}`
    ? `${First}-${ReplaceUnderscoreWithHyphen<Rest>}`
    : T;
export type TransformedBusinessType = ReplaceUnderscoreWithHyphen<
  Lowercase<BusinessType["name"]>
>;

// LAYWER => layer
// CAR_WASH => car-wash
export function createPrettyBusinessType({
  businessType,
}: {
  businessType: BusinessType["name"];
}) {
  return businessType.toLowerCase().replace(/_/g, "-");
}

// layer => LAWYER
// car-wash => CAR_WASH
export function createStandardBusinessType({
  businessType,
}: {
  businessType: TransformedBusinessType;
}): BusinessType["name"] {
  return businessType.toUpperCase().replace(/-/g, "_") as BusinessType["name"];
}

export function createBusinessTypeLabel({
  businessType,
}: {
  businessType: BusinessType["name"];
}) {
  const excludedWords = ["and", "the", "a", "to", "an"];
  return businessType
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .map((word) =>
      excludedWords.includes(word)
        ? word
        : word[0].toUpperCase() + word.slice(1)
    )
    .join(" ");
}
// businessTypesAndCategories.map((item) => <Icon name={businessTypeIconMap[item.name]} />)

// CONTINUE ADDING ICONS!!!!
export const businessTypeIconMap = {
  RETAIL: "FaStore",
  PROFESSIONAL_SERVICES: "FaRegStickyNote",
  CREATIVE_INDUSTRIES: "FaMusic",
  OTHER_BUSINESSES: "FaTractor",
  TECHNOLOGY: "FaComputer",
  MANUFACTURING: "FaTools",
  SERVICES: "FaTools",
  NON_PROFIT_ORGANIZATIONS: "FaMoneyBillWave",
  GOVERNMENT_AND_PUBLIC_ADMINISTRATION: "FaGavel",
  TOURISM_AND_HOSPITALITY: "FaCartFlatbedSuitcase",
  MEDIA_AND_ENTERTAINMENT: "FaFilm",
  HEALTHCARE: "FaHospital",
  EDUCATION: "FaGraduationCap",
  FINANCE_AND_INSURANCE: "FaDollarSign",
  CONSTRUCTION_AND_REAL_ESTATE: "FaHammer",
  TRANSPORTATION_AND_LOGISTICS: "FaBus",
  HOSPITALITY_AND_TOURISM: "FaSuitcase",
  CLOTHING_AND_ACCESSORIES: "FaTshirt",
  ELECTRONICS: "FaPlugCircleBolt",
  GROCERY_AND_FOOD: "FaShoppingCart",
  HOME_AND_GARDEN: "FaSunPlantWilt",
  BEAUTY_AND_PERSONAL_CARE: "FaRegEye",
  FINANCE: "FaFileInvoiceDollar",
  LEGAL: "FaGavel",
  CONSULTING: "FaPenAlt",
  DESIGN: "FaRegFontAwesomeLogoFull",
  MEDIA: "FaFilm",
  ARTS_AND_ENTERTAINMENT: "FaTheaterMasks",
  PHOTOGRAPHY: "FaCamera",
  WRITING_AND_EDITING: "FaPencilAlt",
  CONSTRUCTION: "FaHammer",
  TRANSPORTATION: "FaBus",
  HOSPITALITY: "FaPeopleRoof",
  FITNESS_AND_WELLNESS: "FaHeartbeat",
  AUTOMOTIVE: "FaCar",
  SOFTWARE_DEVELOPMENT: "FaCode",
  HARDWARE: "FaComputer",
  "E-COMMERCE": "FaCartArrowDown",
  INTERNET_SERVICES: "FaWifi",
  ARTIFICIAL_INTELLIGENCE: "FaBrain",
  FOOD_AND_BEVERAGE_MANUFACTURING: "IoFastFoodOutline",
  TEXTILE_MANUFACTURING: "FaTools",
  AUTOMOTIVE_MANUFACTURING: "FaCar",
  ELECTRONICS_MANUFACTURING: "FaPlugCircleBolt",
  INDUSTRIAL_MANUFACTURING: "FaTools",
  CLEANING_SERVICES: "FaSprayCan",
  PERSONAL_SERVICES: "FaTools",
  EVENT_PLANNING: "FaCalendarAlt",
  PROPERTY_MANAGEMENT: "FaBuilding",
  CUSTOMER_SERVICE: "FaHeadset",
  CHARITY: "FaDonate",
  SOCIAL_SERVICES: "FaPeopleArrows",
  ENVIRONMENTAL_ORGANIZATIONS: "FaTreeCity",
  EDUCATIONAL_ORGANIZATIONS: "FaGraduationCap",
  HEALTH_ORGANIZATIONS: "FaShieldHeart",
  GOVERNMENT_AGENCIES: "FaFlagUsa",
  PUBLIC_ADMINISTRATION: "FaGavel",
  PUBLIC_SAFETY: "MdLocalPolice",
  PUBLIC_UTILITIES: "FaWater",
  PUBLIC_WORKS: "FaTools",
  HOTELS_AND_RESORTS: "FaHotel",
  RESTAURANTS_AND_CAFES: "IoFastFoodOutline",
  TRAVEL_AGENCIES_AND_TOUR_OPERATORS: "FaPlane",
  ATTRACTIONS_AND_THEME_PARKS: "TbRollercoaster",
  EVENT_VENUES_AND_CONFERENCE_CENTERS: "FaBuildingFlag",
  FILM_AND_TELEVISION: "FaFilm",
  MUSIC: "FaMusic",
  PUBLISHING: "FaBookReader",
  GAMING: "FaGamepad",
  ADVERTISING_AND_MARKETING: "FaAdversal",
  HOSPITALS_AND_CLINICS: "FaHospital",
  HEALTHCARE_PROVIDERS: "FaHospital",
  HEALTHCARE_SERVICES: "FaHospital",
  PHARMACEUTICAL_INDUSTRY: "FaPills",
  HEALTH_INSURANCE: "FaShieldHeart",
  PRIMARY_AND_SECONDARY_EDUCATION: "FaGraduationCap",
  HIGHER_EDUCATION: "FaGraduationCap",
  ADULT_EDUCATION: "FaGraduationCap",
  EDUCATIONAL_SERVICES: "FaGraduationCap",
  EDUCATIONAL_TECHNOLOGY: "FaGraduationCap",
  BANKING: "FaDollarSign",
  INSURANCE: "FaShieldAlt",
  INVESTMENT: "FaDollarSign",
  FINANCIAL_SERVICES: "FaDollarSign",
  FINANCIAL_TECHNOLOGY: "FaDollarSign",
  REAL_ESTATE: "FaHome",
  ARCHITECTURE_AND_ENGINEERING: "FaRulerCombined",
  LAND_DEVELOPMENT: "FaTractor",
  HOME_IMPROVEMENT: "FaHome",
  LOGISTICS: "FaGears",
  TRAVEL: "FaPlane",
  SHIPPING_AND_DELIVERY: "FaTruck",
};

export async function searchTypeAhead(
  inputValue: string
): Promise<Array<{ label: string; value: string }>> {
  "use client";
  const res = await fetch(`/api/search?inputValue=${inputValue}`);
  const data = await res.json();
  return data.results;
}
