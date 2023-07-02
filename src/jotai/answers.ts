import { type Prisma } from "@prisma/client";
import { atom } from "jotai";

type Answer = Prisma.generalDisclosureListedEntityGetPayload<{
  select: {
    id: true;
    cin: true;
    name: true;
    yearOfIncorporation: true;
    registeredOfficeAddress: true;
    corporateAddress: true;
    email: true;
    telephone: true;
    website: true;
    financialYear: true;
    stockExchanges: true;
    paidUpCapital: true;
    reportingBoundaryText: true;
    detailsOfBusinessActivities: true;
    productsServicesSoldByEntity: true;
    numOfLocWhereOffices: true;
    marketsServedA: true;
    marketsServedB: true;
    marketsServedC: true;
    detailsEndFinYrA: true;
    detailsEndFinYrB: true;
    participationOfWomen: true;
    turnoverRate: true;
    namesOfVentures: true;
    csrDetailsI: true;
    csrDetailsII: true;
    csrDetailsIII: true;
    complaintsOnAnyPrinciples: true;
    overviewOfMaterialResponsibleBusinessIssues: true;
    contactPerson: true;
  };
}>;

export const answerAtom = atom<Answer>({
  id: "",
  name: "",
  cin: "",
  yearOfIncorporation: 0,
  registeredOfficeAddress: "",
  corporateAddress: "",
  email: "",
  telephone: "",
  website: "",
  financialYear: "",
  stockExchanges: "",
  paidUpCapital: "",
  reportingBoundaryText: "",
  detailsOfBusinessActivities: "",
  productsServicesSoldByEntity: "",
  numOfLocWhereOffices: "",
  marketsServedA: "",
  marketsServedB: "",
  marketsServedC: "",
  detailsEndFinYrA: "",
  detailsEndFinYrB: "",
  participationOfWomen: "",
  turnoverRate: "",
  namesOfVentures: "",
  csrDetailsI: true,
  csrDetailsII: 0,
  csrDetailsIII: 0,
  complaintsOnAnyPrinciples: "",
  overviewOfMaterialResponsibleBusinessIssues: "",
  contactPerson: "",
} as Answer);
