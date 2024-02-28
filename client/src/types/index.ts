export interface IFinancialList {
  symbol: string;
  name: string;
  country: string;
  type: string;
  currency: string;
  nameExchange: string;
  code: string;
  code_exchange: string;
  id: number;
  operating_mic: string;
  ticker: string;
}

export interface IMarketMetadata {
  symbol: string;
  source: string;
  ticker: string;
  code: string;
  type: string;
  name: string;
  exchange: string;
  currency: string;
  countryname: string;
  countryiso: string;
  sector: string;
  industry: string;
  description: string;
  isin: string;
  primaryticker: string;
  fullTimeemployees: number;
  updatedat: string;
  cusip: string;
  logourl: string;
  cik: string;
  employeridnumber: string;
  fiscalyearEnd: string;
  ipoDate: string;
  validUntil: string;
  internationalDomestic: string;
  gicSector: string;
  gicGroup: string;
  gicIndustry: string;
  gicSubIndustry: string;
  addressDetails: any;
  phone: string;
  webUrl: string;
  category: string;
  fundSummary: string;
  fundFamily: string;
  fundFiscalYearEnd: string;
  officers: any[];
  exchangemarket: string;
  fundcategory: string;
  fundstyle: string;
  homecategory: string;
  isdelisted: boolean;
  listings: any[];
  marketcapitalization: IMarketCapitalization;
  statistics: any;
  highlights: any;
  technicals: {
    beta: number;
    "52WeekHigh": number;
    "52WeekLow": number;
    "50DayMA": number;
    "200DayMA": number;
    sharesShort: number;
    sharesShortPriorMonth: number;
    shortRatio: number;
    shortPercent: number;
  };
  valuation: any;
  sharesstatistics: any;
  analystratings: any[];
  splitsdividends: any;
  dividends: any[];
  splits: any[];
  earnings: any;
  financials: any;
  insidertransactions: any[];
  holders: any;
  outstandingshares: any;
  indexcomponents: IIndexComponent[];
  exchangetradedfunddetails?: IExchangeTradedFundDetails;
  mutualfunddetails?: {
    domicile:string,
    yield:number,
    yieldYtd:number,
    yield1YearYtd:number,
    yield3YearYtd:number,
    yield5YearYtd:number,
    nav:string,
    prevClosePrice:string,
    updateDate:string,
    portfolioNetAssets:number,
    shareClassNetAssets:number,
    expenseRatio:number,
    expenseRatioDate:string,
    topCountries:any[],
    inceptionDate:string,
    morningStarRating:string,
    morningStarRiskRating:string,
    morningStarCategory:string
    assetAllocation:{
      type:string
      netPercent:number
      longPercent:number
      shortPercent:number
      categoryAverage:number
      benchmark:number
    }[],
    valueGrowth:{
      name:string
      categoryAverage:number
      benchmark:number
      stockPortfolio:number
    }[]
  };
}

export interface IMarketCapitalizationBucket {
  category: string;
  size: string;
  categoryAverage: number;
  benchmark: number;
  portfolioPercent: number;
  value: number;
}

export interface IMarketCapitalization {
  value: number;
  dominance: number;
  diluted: number;
  average: number;
  bucket: IMarketCapitalizationBucket[];
};

export interface IIndexComponent {
  code: string,
  exchange: string,
  name: string,
  sector: string,
  industry: string
}

export interface IExchangeTradedFundDetails {
  domicile: string;
  yield: number;
  companyName: string;
  companyURL: string;
  etfUrl: string;
  indexName: string;
  dividendPayingFrequency: string;
  maxAnnualManagementCharge: string;
  ongoingCharge: string;
  dateOngoingCharge: string;
  netExpenseRatio: number;
  annualHoldingsTurnover: string;
  totalAssets: number;
  holdingsCount: number;
  performance: IPerformance;
  fixedIncome: IFixedIncome[];
  inceptionDate: string;
  morningStar: {
      ratio: number;
      categoryBenchmark: string;
      sustainabilityRatio: number;
  };
  assetAllocation: IAssetsAllocation[];
  valuationsGrowth: {
      growthRatesPortfolio: {
          salesGrowth: number;
          cashFlowGrowth: number;
          bookValueGrowth: number;
          historicalEarningsGrowth: number;
          longTermProjectedEarningsGrowth: number;
      };
      growthRatesToCategory: {
          salesGrowth: number;
          cashFlowGrowth: number;
          bookValueGrowth: number;
          historicalEarningsGrowth: number;
          longTermProjectedEarningsGrowth: number;
      };
      valuationsRatesPortfolio: {
          priceBook: number;
          priceSales: number;
          priceCashFlow: number;
          dividendYieldFactor: number;
          priceProspectiveEarnings: number;
      };
      valuationsRatesToCategory: {
          priceBook: number;
          priceSales: number;
          priceCashFlow: number;
          dividendYieldFactor: number;
          priceProspectiveEarnings: number;
      };
  };
  sectorWeights: ISectorWeight[];
  worldRegions: IWorldRegion[];
  top10Holdings: {
      code: string;
      name: string;
      region: string;
      sector: string;
      country: string;
      assetsPercent: number;
      exchange: string;
      industry: string;
  }[];
  holdings: {
      code: string;
      name: string;
      region: string;
      sector: string;
      country: string;
      assetsPercent: number;
      exchange: string;
      industry: string;
  }[];
}

export interface IPerformance {
  "1YVolatility": number;
  "3YVolatility": number;
  "3YExpReturn": number;
  "3YSharpRatio": number;
  returnsYtd: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  returns10Y: number;
};

export interface IFixedIncome {
  name: string;
  fundPercent: number;
  relativeToCategory: number;
}

export interface IAssetsAllocation {
  type?: string,
  name?: string;
  category?: string;
  netPercent?: number
  longPercent: number;
  shortPercent: number;
  netAssetsPercent?: number;
  benchmark?: number;
  categoryAverage?: number;
}

export interface ISectorWeight {
  name: string;
  category: string;
  equityPercent: number;
  relativeToCategory: number;
}

export interface IWorldRegion {
  name: string;
  category: string;
  equityPercent: number;
  relativeToCategory: number;
}

export interface ICandleSticks {
  x: Date,
  y: number[]
}