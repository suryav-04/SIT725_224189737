/**
 * SIT725 – 5.4D Validation Tests (MANDATORY TEMPLATE)
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_BASE = "/api/books";

// =============================
// INTERNAL STATE (DO NOT MODIFY)
// =============================

const results = [];

const coverageTracker = {
  CREATE_FAIL: 0,
  UPDATE_FAIL: 0,
  TYPE: 0,
  REQUIRED: 0,
  BOUNDARY: 0,
  LENGTH: 0,
  TEMPORAL: 0,
  UNKNOWN_CREATE: 0,
  UNKNOWN_UPDATE: 0,
  IMMUTABLE: 0,
};

// =============================
// OUTPUTS FORMAT (DO NOT MODIFY)
// =============================

function logHeader(uniqueId) {
  console.log("SIT725_VALIDATION_TESTS");
  console.log(`BASE_URL=${BASE_URL}`);
  console.log(`API_BASE=${API_BASE}`);
  console.log(`INFO|Generated uniqueId=${uniqueId}`);
}

function logResult(r) {
  console.log(
    `TEST|${r.id}|${r.name}|${r.method}|${r.path}|expected=${r.expected}|actual=${r.actual}|pass=${r.pass ? "Y" : "N"}`
  );
}

function logSummary() {
  const failed = results.filter(r => !r.pass).length;

  console.log(
    `SUMMARY|pass=${failed === 0 ? "Y" : "N"}|failed=${failed}|total=${results.length}`
  );

  return failed === 0;
}

function logCoverage() {
  console.log(
    `COVERAGE|CREATE_FAIL=${coverageTracker.CREATE_FAIL}` +
    `|UPDATE_FAIL=${coverageTracker.UPDATE_FAIL}` +
    `|TYPE=${coverageTracker.TYPE}` +
    `|REQUIRED=${coverageTracker.REQUIRED}` +
    `|BOUNDARY=${coverageTracker.BOUNDARY}` +
    `|LENGTH=${coverageTracker.LENGTH}` +
    `|TEMPORAL=${coverageTracker.TEMPORAL}` +
    `|UNKNOWN_CREATE=${coverageTracker.UNKNOWN_CREATE}` +
    `|UNKNOWN_UPDATE=${coverageTracker.UNKNOWN_UPDATE}` +
    `|IMMUTABLE=${coverageTracker.IMMUTABLE}`
  );
}

// =============================
// HTTP HELPER
// =============================

async function http(method, path, body) {

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();

  return {
    status: res.status,
    text
  };
}

// =============================
// TEST REGISTRATION FUNCTION
// =============================

async function test({ id, name, method, path, expected, body, tags }) {

  const { status } = await http(method, path, body);

  const pass = status === expected;

  const result = {
    id,
    name,
    method,
    path,
    expected,
    actual: status,
    pass
  };

  results.push(result);

  logResult(result);

  const safeTags = Array.isArray(tags) ? tags : [];

  safeTags.forEach(tag => {
    if (Object.prototype.hasOwnProperty.call(coverageTracker, tag)) {
      coverageTracker[tag]++;
    }
  });
}

// =============================
// VALID DATA
// =============================

function makeValidBook(id) {
  return {
    id,
    title: "Valid Title",
    author: "Valid Author",
    year: 2020,
    genre: "Fantasy",
    summary: "Valid summary text that satisfies schema rules.",
    price: "9.99"
  };
}

function makeValidUpdate() {
  return {
    title: "Updated Title",
    author: "Updated Author",
    year: 2021,
    genre: "Fantasy",
    summary: "Updated summary text.",
    price: "10.50"
  };
}

// =============================
// TESTS
// =============================

async function run() {

  const uniqueId = `b${Date.now()}`;

  logHeader(uniqueId);

  const createPath = API_BASE;

  const updatePath = (id) => `${API_BASE}/${id}`;

  // T01 VALID CREATE
  await test({
    id: "T01",
    name: "Valid create",
    method: "POST",
    path: createPath,
    expected: 201,
    body: makeValidBook(uniqueId),
    tags: []
  });

  // T02 DUPLICATE
  await test({
    id: "T02",
    name: "Duplicate ID",
    method: "POST",
    path: createPath,
    expected: 409,
    body: makeValidBook(uniqueId),
    tags: ["CREATE_FAIL"]
  });

  // T03 IMMUTABLE ID
  await test({
    id: "T03",
    name: "Immutable ID update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), id: "b999" },
    tags: ["UPDATE_FAIL", "IMMUTABLE"]
  });

  // T04 UNKNOWN CREATE
  await test({
    id: "T04",
    name: "Unknown field CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+1}`),
      hack: true
    },
    tags: ["CREATE_FAIL", "UNKNOWN_CREATE"]
  });

  // T05 UNKNOWN UPDATE
  await test({
    id: "T05",
    name: "Unknown field UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      hack: true
    },
    tags: ["UPDATE_FAIL", "UNKNOWN_UPDATE"]
  });

  // T06 REQUIRED FIELD
  await test({
    id: "T06",
    name: "Missing required title",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+2}`),
      title: undefined
    },
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  // T07 INVALID TYPE
  await test({
    id: "T07",
    name: "Invalid year type",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+3}`),
      year: "wrong"
    },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  // T08 BOUNDARY
  await test({
    id: "T08",
    name: "Negative price",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+4}`),
      price: "-5"
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  // T09 LENGTH
  await test({
    id: "T09",
    name: "Short title",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+5}`),
      title: "A"
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // T10 TEMPORAL
  await test({
    id: "T10",
    name: "Future year",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+6}`),
      year: 3000
    },
    tags: ["CREATE_FAIL", "TEMPORAL"]
  });

  // T11 FLOAT YEAR
  await test({
    id: "T11",
    name: "Float year",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+7}`),
      year: 2020.5
    },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  // T12 INVALID GENRE
  await test({
    id: "T12",
    name: "Invalid genre",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+8}`),
      genre: "Horror"
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  // T13 UPDATE NOT FOUND
  await test({
    id: "T13",
    name: "Update missing record",
    method: "PUT",
    path: updatePath("unknown"),
    expected: 404,
    body: makeValidUpdate(),
    tags: ["UPDATE_FAIL"]
  });

  const pass = logSummary();

  logCoverage();

  process.exit(pass ? 0 : 1);
}

run().catch(err => {
  console.error("ERROR", err);
  process.exit(2);
});
