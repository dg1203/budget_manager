import {
  randomId,
  addLog,
  addResource,
  removeResource,
  getJarHistory,
  getFormatDate,
  getAvailableJars,
  transferResources,
  getAllHistory
} from "./index";

const header = [
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Kod operacji"
  },
  { id: "description", numeric: false, disablePadding: false, label: "Opis" },
  { id: "title", numeric: false, disablePadding: false, label: "Tytuł" },
  { id: "amount", numeric: false, disablePadding: false, label: "Kwota" },
  { id: "currency", numeric: false, disablePadding: false, label: "Waluta" },
  {
    id: "time",
    numeric: false,
    disablePadding: false,
    label: "Data operacji"
  }
];

const headerAllHistory = [
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Kod operacji"
  },
  { id: "description", numeric: false, disablePadding: false, label: "Opis" },
  {
    id: "time",
    numeric: false,
    disablePadding: false,
    label: "Data operacji"
  },
  { id: "title", numeric: false, disablePadding: false, label: "Tytuł" },
  { id: "amount", numeric: false, disablePadding: false, label: "Kwota" },
  { id: "currency", numeric: false, disablePadding: false, label: "Waluta" }
];

const rows = [
  {
    type: "ADD_RESOURCES",
    description: "Dodanie środków do słoika",
    title: "Title",
    amount: 120,
    currency: "PLN",
    time: "12365447"
  },
  {
    type: "ADD_JAR",
    description: "Dodanie słoika",
    title: "Title",
    amount: "",
    currency: "",
    time: "12365447"
  }
];

const rowsAllHistory = [
  {
    type: "ADD_JAR",
    description: "Dodanie słoika",
    time: "12365447",
    title: "Title",
    amount: "",
    currency: ""
  },
  {
    type: "ADD_RESOURCES",
    description: "Dodanie środków do słoika",
    time: "12365447",
    title: "Title",
    amount: 120,
    currency: "PLN"
  }
];

const mockedResource = {
  id: "adsa",
  amount: 120,
  currency: "EUR",
  title: "title"
};

const jarsState = [
  {
    id: "aaa",
    name: "aaa",
    description: "aaa",
    isDefault: false,
    currency: "PLN",
    resources: []
  },
  {
    id: "bbb",
    name: "bbb",
    description: "bbb",
    isDefault: false,
    resources: [{ PLN: 200 }, { USD: 300 }, { GBP: 100 }, { CHF: 150 }]
  },
  {
    id: "ccc",
    name: "ccc",
    description: "ccc",
    isDefault: false,
    resources: [{ EUR: 200 }]
  }
];

const logs = [
  {
    id: "aaa",
    type: "ADD_JAR",
    description: "Dodanie słoika",
    time: "12365447",
    0: "Title",
  },
  {
    id: "aaa",
    type: "ADD_RESOURCES",
    description: "Dodanie środków do słoika",
    time: "12365447",
    0: "Title",
    1: 120,
    2: "PLN"
  }
];

describe("Test service file", () => {
  it("test random id method", () => {
    const returnedVal = randomId();
    expect(typeof returnedVal).toBe("string");
  });
  it("test add log method", () => {
    const returnedValue = addLog("testid", "ADD_JAR");
    expect(returnedValue).toStrictEqual({
      id: "testid",
      type: "ADD_JAR",
      description: "Dodanie słoika",
      time: returnedValue.time
    });
  });
  describe("test add resource method", () => {
    it("add resource to jar with empty resources array", () => {
      const expectedValue = jarsState;
      const renturnedValue = addResource(jarsState, "aaa", mockedResource);
      expectedValue[0].resources.push({ EUR: 120 });
      expect(renturnedValue).toStrictEqual(expectedValue);
    });
    it("add resource to jar with not empty resources array and not this currency", () => {
      const expectedValue = jarsState;
      const renturnedValue = addResource(jarsState, "bbb", mockedResource);
      expectedValue[1].resources.push({ EUR: 120 });
      expect(renturnedValue).toStrictEqual(expectedValue);
    });
    it("add resource to jar with not empty resources array and has this currency", () => {
      const expectedValue = jarsState;
      const renturnedValue = addResource(jarsState, "ccc", mockedResource);
      expectedValue[2].resources = [{ EUR: 320 }];
      expect(renturnedValue).toStrictEqual(expectedValue);
    });
  });
  it("test remove resource method", () => {
    const expectedValue = jarsState;
    const renturnedValue = removeResource(jarsState, "EUR", 120, "bbb");
    expectedValue[2].resources = [{ EUR: 80 }];
    expect(renturnedValue).toStrictEqual(expectedValue);
  });
  it("get specific jar history", () => {
    const returnedValue = getJarHistory(logs, "aaa");
    const expectedValue = {
      header,
      rows: [rows[0]]
    };
    expect(returnedValue).toStrictEqual(expectedValue);
  });
  it("get all history", () => {
    const returnedValue = getAllHistory(logs, "");
    const expectedValue = {
      header: headerAllHistory,
      rows: rowsAllHistory
    };
    expect(returnedValue).toStrictEqual(expectedValue);
  });
  it("get all history with selectedJar", () => {
    const returnedValue = getAllHistory(logs, "aaa");
    const expectedValue = {
      header: headerAllHistory,
      rows: rowsAllHistory
    };
    expect(returnedValue).toStrictEqual(expectedValue);
  });
  it("test get format date", () => {
    const returnedValue = getFormatDate(1591632321456);
    expect(returnedValue).toBe("2020-6-8 18:05:21");
  })
  it("test get available jars method", () => {
    const returnedValue = getAvailableJars(jarsState, "PLN", "bbb");
    expect(returnedValue).toStrictEqual([jarsState[0]]);
  });
});
