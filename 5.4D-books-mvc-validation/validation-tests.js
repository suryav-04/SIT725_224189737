const axios = require("axios");

const BASE_URL = "http://localhost:3000/api";

let total = 0;
let passed = 0;

function log(result, name) {
  console.log(`TEST|${name}|${result}`);
}

async function test(name, fn) {
  total++;
  try {
    await fn();
    log("PASS", name);
    passed++;
  } catch (err) {
    log("FAIL", name);
  }
}

const id = "test_" + Date.now();

async function run() {

  // CREATE SUCCESS
  await test("CREATE_VALID", async () => {
    const res = await axios.post(`${BASE_URL}/books`, {
      id,
      title: "Test Book",
      author: "Tester",
      year: 2020,
      genre: "Fantasy",
      summary: "This is a valid summary text.",
      price: "10.00"
    });
    if (res.status !== 201) throw new Error();
  });

  // DUPLICATE
  await test("CREATE_FAIL_DUPLICATE", async () => {
    try {
      await axios.post(`${BASE_URL}/books`, {
        id,
        title: "Test",
        author: "Tester",
        year: 2020,
        genre: "Fantasy",
        summary: "Duplicate summary.",
        price: "10.00"
      });
      throw new Error();
    } catch (err) {
      if (err.response.status !== 409) throw new Error();
    }
  });

  // REQUIRED
  await test("REQUIRED", async () => {
    try {
      await axios.post(`${BASE_URL}/books`, {
        id: "bad_" + Date.now()
      });
      throw new Error();
    } catch (err) {
      if (err.response.status !== 400) throw new Error();
    }
  });

  // TYPE
  await test("TYPE", async () => {
    try {
      await axios.post(`${BASE_URL}/books`, {
        id: "bad_" + Date.now(),
        title: "Test",
        author: "Tester",
        year: "wrong",
        genre: "Fantasy",
        summary: "Valid summary text here",
        price: "10.00"
      });
      throw new Error();
    } catch (err) {
      if (err.response.status !== 400) throw new Error();
    }
  });

  // BOUNDARY (future year)
  await test("TEMPORAL", async () => {
    try {
      await axios.post(`${BASE_URL}/books`, {
        id: "bad_" + Date.now(),
        title: "Test",
        author: "Tester",
        year: 3000,
        genre: "Fantasy",
        summary: "Valid summary text here",
        price: "10.00"
      });
      throw new Error();
    } catch (err) {
      if (err.response.status !== 400) throw new Error();
    }
  });

  // LENGTH
  await test("LENGTH", async () => {
    try {
      await axios.post(`${BASE_URL}/books`, {
        id: "bad_" + Date.now(),
        title: "A",
        author: "Tester",
        year: 2020,
        genre: "Fantasy",
        summary: "short",
        price: "10.00"
      });
      throw new Error();
    } catch (err) {
      if (err.response.status !== 400) throw new Error();
    }
  });

  // UNKNOWN FIELD
  await test("UNKNOWN_CREATE", async () => {
    try {
      await axios.post(`${BASE_URL}/books`, {
        id: "bad_" + Date.now(),
        title: "Test",
        author: "Tester",
        year: 2020,
        genre: "Fantasy",
        summary: "Valid summary text here",
        price: "10.00",
        hack: "bad"
      });
      throw new Error();
    } catch (err) {
      if (err.response.status !== 400) throw new Error();
    }
  });

  // UPDATE SUCCESS
  await test("UPDATE_VALID", async () => {
    const res = await axios.put(`${BASE_URL}/books/${id}`, {
      title: "Updated Title"
    });
    if (res.status !== 200) throw new Error();
  });

  // IMMUTABLE
  await test("IMMUTABLE", async () => {
    try {
      await axios.put(`${BASE_URL}/books/${id}`, {
        id: "newId"
      });
      throw new Error();
    } catch (err) {
      if (err.response.status !== 400) throw new Error();
    }
  });

  // UPDATE NOT FOUND
  await test("UPDATE_FAIL", async () => {
    try {
      await axios.put(`${BASE_URL}/books/unknown`, {
        title: "Test"
      });
      throw new Error();
    } catch (err) {
      if (err.response.status !== 404) throw new Error();
    }
  });

  console.log(`SUMMARY|${passed}/${total}`);

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

run();