const axios = require("axios");

const BASE_URL = "http://localhost:3000/api";

let pass = 0;
let total = 0;

// ⭐ dynamic ID
const testId = "test_" + Date.now();

async function test(name, fn) {
  total++;
  try {
    await fn();
    console.log(`PASS: ${name}`);
    pass++;
  } catch (err) {
    console.log(`FAIL: ${name}`);
  }
}

async function runTests() {

  // 1. VALID CREATE
  await test("Create valid book", async () => {
    const res = await axios.post(`${BASE_URL}/books`, {
      id: testId,   // ✅ dynamic
      title: "Test Book",
      author: "Tester",
      year: 2020,
      genre: "Fantasy",
      summary: "This is a valid test summary.",
      price: "10.00"
    });

    if (res.status !== 201) throw new Error();
  });

  // 2. DUPLICATE ID
  await test("Duplicate ID", async () => {
    try {
      await axios.post(`${BASE_URL}/books`, {
        id: testId,  // same ID again
        title: "Test Book",
        author: "Tester",
        year: 2020,
        genre: "Fantasy",
        summary: "Duplicate test summary.",
        price: "10.00"
      });
      throw new Error();
    } catch (err) {
      if (err.response.status !== 409) throw new Error();
    }
  });

  // 3. INVALID DATA
  await test("Invalid data", async () => {
    try {
      await axios.post(`${BASE_URL}/books`, {
        id: "bad_" + Date.now(),
        title: "",
        price: 5
      });
      throw new Error();
    } catch (err) {
      if (err.response.status !== 400) throw new Error();
    }
  });

  // 4. UPDATE VALID
  await test("Update valid book", async () => {
    const res = await axios.put(`${BASE_URL}/books/${testId}`, {
      title: "Updated Title"
    });

    if (res.status !== 200) throw new Error();
  });

  // 5. UPDATE NOT FOUND
  await test("Update non-existing book", async () => {
    try {
      await axios.put(`${BASE_URL}/books/unknown`, {
        title: "Test"
      });
      throw new Error();
    } catch (err) {
      if (err.response.status !== 404) throw new Error();
    }
  });

  console.log("\nSUMMARY:");
  console.log(`${pass}/${total} tests passed`);

  if (pass === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
