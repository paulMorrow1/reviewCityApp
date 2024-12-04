import { faker } from "@faker-js/faker";
import {
  PrismaClient,
  type BusinessCategory,
  type BusinessType,
  type Prisma,
} from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

type RandomNumberArgs = { max: number };
const randomNumber = ({ max }: RandomNumberArgs) =>
  Math.floor(Math.random() * max);

function generateRandomType({
  businessTypes,
}: {
  businessTypes: BusinessType[];
}): BusinessType["id"] {
  const number = randomNumber({ max: 16 });
  return businessTypes[number].id;
}

async function createRandomUser({
  num,
}: {
  num: number;
}): Promise<Prisma.UserCreateInput> {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `test${num}@test.com`,
    password: await bcrypt.hash("password123", 10),
    dob: faker.date.birthdate(),
  };
}

function businessNameSlug(name: string) {
  name = name.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  name = name.toLowerCase(); // convert string to lowercase
  name = name
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return name;
}

function generateRandomCategories({
  businessCategories,
}: {
  businessCategories: BusinessCategory[];
}): Array<{ id: BusinessCategory["id"] }> {
  const amountOfCategories = randomNumber({ max: 3 });
  const categories = Array.from({ length: amountOfCategories }).reduce(
    (accum: Array<{ id: BusinessCategory["id"] }>) => {
      const randomNum = randomNumber({ max: 77 });
      const chosenCategory = businessCategories[randomNum];
      if (accum.includes(chosenCategory)) return accum;
      return [...accum, chosenCategory];
    },
    []
  );
  return categories;
}

function createRandomBusiness({
  businessTypes,
  businessCategories,
}: {
  businessTypes: BusinessType[];
  businessCategories: BusinessCategory[];
}): Prisma.BusinessCreateInput {
  const name = faker.company.name();
  return {
    name,
    slug: businessNameSlug(name),
    phoneNumber: faker.phone.number("###-###-####"),
    address: faker.location.streetAddress(true),
    type: {
      connect: {
        id: generateRandomType({ businessTypes }),
      },
    },
    category: {
      connect: generateRandomCategories({ businessCategories }),
    },
  };
}

async function createBusinesses({
  businessTypes,
  businessCategories,
}: {
  businessTypes: BusinessType[];
  businessCategories: BusinessCategory[];
}) {
  const businessPromiseArray = Array.from({ length: 10 }).map(() => {
    const data = createRandomBusiness({ businessTypes, businessCategories });
    return prisma.business.create({ data });
  });
  return await Promise.all(businessPromiseArray);
}

function createBusinessType() {
  return [
    "RETAIL",
    "PROFESSIONAL_SERVICES",
    "CREATIVE_INDUSTRIES",
    "OTHER_BUSINESSES",
    "TECHNOLOGY",
    "MANUFACTURING",
    "SERVICES",
    "NON_PROFIT_ORGANIZATIONS",
    "GOVERNMENT_AND_PUBLIC_ADMINISTRATION",
    "TOURISM_AND_HOSPITALITY",
    "MEDIA_AND_ENTERTAINMENT",
    "HEALTHCARE",
    "EDUCATION",
    "FINANCE_AND_INSURANCE",
    "CONSTRUCTION_AND_REAL_ESTATE",
    "TRANSPORTATION_AND_LOGISTICS",
    "HOSPITALITY_AND_TOURISM",
  ].map((name) => ({
    name,
  }));
}

function createBusinessCategory() {
  return [
    "CLOTHING_AND_ACCESSORIES",
    "ELECTRONICS",
    "GROCERY_AND_FOOD",
    "HOME_AND_GARDEN",
    "BEAUTY_AND_PERSONAL_CARE",
    "HEALTHCARE",
    "FINANCE",
    "LEGAL",
    "EDUCATION",
    "CONSULTING",
    "DESIGN",
    "MEDIA",
    "ARTS_AND_ENTERTAINMENT",
    "PHOTOGRAPHY",
    "WRITING_AND_EDITING",
    "CONSTRUCTION",
    "TRANSPORTATION",
    "HOSPITALITY",
    "FITNESS_AND_WELLNESS",
    "AUTOMOTIVE",
    "SOFTWARE_DEVELOPMENT",
    "HARDWARE",
    "E-COMMERCE",
    "INTERNET_SERVICES",
    "ARTIFICIAL_INTELLIGENCE",
    "FOOD_AND_BEVERAGE_MANUFACTURING",
    "TEXTILE_MANUFACTURING",
    "AUTOMOTIVE_MANUFACTURING",
    "ELECTRONICS_MANUFACTURING",
    "INDUSTRIAL_MANUFACTURING",
    "CLEANING_SERVICES",
    "PERSONAL_SERVICES",
    "EVENT_PLANNING",
    "PROPERTY_MANAGEMENT",
    "CUSTOMER_SERVICE",
    "CHARITY",
    "SOCIAL_SERVICES",
    "ENVIRONMENTAL_ORGANIZATIONS",
    "EDUCATIONAL_ORGANIZATIONS",
    "HEALTH_ORGANIZATIONS",
    "GOVERNMENT_AGENCIES",
    "PUBLIC_ADMINISTRATION",
    "PUBLIC_SAFETY",
    "PUBLIC_UTILITIES",
    "PUBLIC_WORKS",
    "HOTELS_AND_RESORTS",
    "RESTAURANTS_AND_CAFES",
    "TRAVEL_AGENCIES_AND_TOUR_OPERATORS",
    "ATTRACTIONS_AND_THEME_PARKS",
    "EVENT_VENUES_AND_CONFERENCE_CENTERS",
    "FILM_AND_TELEVISION",
    "MUSIC",
    "PUBLISHING",
    "GAMING",
    "ADVERTISING_AND_MARKETING",
    "HOSPITALS_AND_CLINICS",
    "HEALTHCARE_PROVIDERS",
    "HEALTHCARE_SERVICES",
    "PHARMACEUTICAL_INDUSTRY",
    "HEALTH_INSURANCE",
    "PRIMARY_AND_SECONDARY_EDUCATION",
    "HIGHER_EDUCATION",
    "ADULT_EDUCATION",
    "EDUCATIONAL_SERVICES",
    "EDUCATIONAL_TECHNOLOGY",
    "BANKING",
    "INSURANCE",
    "INVESTMENT",
    "FINANCIAL_SERVICES",
    "FINANCIAL_TECHNOLOGY",
    "CONSTRUCTION",
    "REAL_ESTATE",
    "ARCHITECTURE_AND_ENGINEERING",
    "LAND_DEVELOPMENT",
    "HOME_IMPROVEMENT",
    "LOGISTICS",
    "AUTOMOTIVE",
    "TRAVEL",
    "SHIPPING_AND_DELIVERY",
    "RESTAURANTS_AND_CAFES",
  ].reduce(
    (
      accum: Array<{ name: string }>,
      category: string
    ): Array<{ name: string }> => {
      if (accum.some(({ name }) => name === category)) return accum;
      return [...accum, { name: category }];
    },
    []
  );
}

async function main() {
  const randomUsers = await Promise.all(
    Array.from({ length: 10 }, (_, i) => i + 1).map(async (num) => {
      const randomUser = await createRandomUser({ num });
      return randomUser;
    })
  );
  const users = await prisma.user.createManyAndReturn({
    data: randomUsers,
  });
  console.log({ users });

  const businessTypes = await prisma.businessType.createManyAndReturn({
    data: createBusinessType(),
  });

  const businessCategories = await prisma.businessCategory.createManyAndReturn({
    data: createBusinessCategory(),
  });

  const businesses = await createBusinesses({
    businessTypes,
    businessCategories,
  });
  console.log({ businesses });

  const randomBusinessReview: Prisma.ReviewCreateManyInput[] =
    businesses.reduce<Prisma.ReviewCreateManyInput[]>((accum, business) => {
      const amountOfReviews = randomNumber({ max: 3 });
      // const randomBusiness = randomNumber({ max: 10 });
      const randomUser = randomNumber({ max: 10 });
      const randomReviews: Prisma.ReviewCreateManyInput[] = Array.from({
        length: amountOfReviews,
      }).map((): Prisma.ReviewCreateManyInput => {
        return {
          businessId: business.id,
          content: faker.lorem.sentences(3),
          rating: faker.number.int({ min: 1, max: 5 }),
          userId: users[randomUser].id,
        };
      });
      return [...accum, ...randomReviews];
    }, []);
  const reviews = await prisma.review.createManyAndReturn({
    data: randomBusinessReview,
  });
  console.log({ reviews });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
