let firstTable;
let secondTable;
let proteomics;
let proteomics2;
let selectedWave = "Wave 1";
let selectedWave2 = "Wave 1";
let selectedType = "Plasma";

async function SetTableOne() {
  const response = await fetch("data/ProteomicsTableOne.json");
  proteomics = await response.json();

  updateTableOne();

  document.querySelectorAll(".wave-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedWave = btn.dataset.wave;

      document
        .querySelectorAll(".wave-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      updateTableOne();
    });
  });

  document.querySelectorAll(".type-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedType = btn.dataset.type;

      document
        .querySelectorAll(".type-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      updateTableOne();
    });
  });
}

async function updateTableOne() {
  const data = proteomics[selectedWave].filter(
    (row) => row.Type === selectedType,
  );

  if (firstTable) {
    firstTable.setData(data);
  } else {
    firstTable = new Tabulator("#variable-table", {
      data: data,
      pagination: "local", //paginate the data
      paginationSize: 5, //allow 7 rows per page of data
      paginationCounter: "rows", //display count of paginated rows in footer
      movableColumns: true, //allow column order to be changed
      initialSort: [
        //set the initial sort order of the data
        { column: "name", dir: "asc" },
      ],
      columnDefaults: {
        tooltip: true, //show tool tips on cells
      },

      columns: [
        {
          formatter: "rowSelection",
          titleFormatter: "rowSelection",
          hozAlign: "center",
          headerSort: false,
          width: 50,
        },
        { title: "Type", field: "Type" },
        { title: "Analyte", field: "Analyte" },
        { title: "Assay range (pg/mL)", field: "Assay range (pg/mL)" },
        { title: "Lot Number", field: "Lot Number" },
        { title: "CV (%)", field: "CV (%)" },
        { title: "LLOD", field: "LLOD" },
        { title: "HLOD", field: "HLOD" },
        { title: "Concentration", field: "Concentration" },
        { title: "Kit Information", field: "Kit Information" },
      ],
    });
  }
}

SetTableOne();

async function SetTableTwo() {
  const response2 = await fetch("data/ProteomicsTableTwo.json");
  proteomics2 = await response2.json();

  updateTableTwo();

  document.querySelectorAll(".wave-btn-2").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedWave2 = btn.dataset.wave;

      document
        .querySelectorAll(".wave-btn-2")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      updateTableTwo();
    });
  });
}

async function updateTableTwo() {
  const data2 = proteomics2[selectedWave2].filter(
    (row) => row.Type === "Plasma",
  );

  const columns = [
    {
      formatter: "rowSelection",
      titleFormatter: "rowSelection",
      hozAlign: "center",
      headerSort: false,
      width: 50,
    },
    { title: "Type", field: "Type" },
    { title: "Analyte", field: "Analyte" },
    { title: "Assay range (pg/mL)", field: "Assay range (pg/mL)" },
    { title: "Lot Number", field: "Lot Number" },
    { title: "CV (%)", field: "CV (%)" },
    {
      title: selectedWave2 === "Wave 4" ? "Average" : "LLOD",
      field: selectedWave2 === "Wave 4" ? "Average" : "LLOD",
    },
    {
      title: selectedWave2 === "Wave 4" ? "SD" : "HLOD",
      field: selectedWave2 === "Wave 4" ? "Standard Deviation" : "HLOD",
    },
    { title: "Concentration", field: "Concentration" },
    { title: "Kit Information", field: "Kit Information" },
  ];

  if (secondTable) {
    secondTable.setColumns(columns);
    secondTable.setData(data2);
  } else {
    secondTable = new Tabulator("#variable-table2", {
      data: data2,
      pagination: "local", //paginate the data
      paginationSize: 20, //allow 7 rows per page of data
      paginationCounter: "rows", //display count of paginated rows in footer
      movableColumns: true, //allow column order to be changed
      initialSort: [
        //set the initial sort order of the data
        { column: "name", dir: "asc" },
      ],
      columnDefaults: {
        tooltip: true, //show tool tips on cells
      },

      columns: columns,
    });
  }
}

SetTableTwo();
