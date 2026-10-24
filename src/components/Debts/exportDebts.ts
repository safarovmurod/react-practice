function getRows() {
  const table = document.querySelector<HTMLTableElement>(
    ".debt-table .desktop-table table",
  );
  if (!table) throw new Error("Ҷадвали қарзҳо ёфт нашуд.");
  const rows: string[][] = [];
  for (const row of Array.from(table.rows)) {
    const cells = Array.from(row.cells).slice(0, -1);
    const values = cells.map((cell) => (cell.textContent || "").trim());
    rows.push(values);
  }
  return rows;
}
export async function downloadDebtExcel() {
  const { Workbook } = await import("exceljs");
  const workbook = new Workbook();
  const sheet = workbook.addWorksheet("Debts");
  for (const row of getRows()) sheet.addRow(row);
  sheet.getRow(1).font = { bold: true };
  sheet.columns.forEach((column) => {
    column.width = 32;
  });
  const data = await workbook.xlsx.writeBuffer();
  const blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "debts.xlsx";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export async function downloadDebtPdf() {
  const pdfMake = (await import("pdfmake/build/pdfmake")).default;
  const fonts = (await import("pdfmake/build/vfs_fonts")).default;
  pdfMake.addVirtualFileSystem(fonts);
  await pdfMake
    .createPdf({
      pageOrientation: "landscape",
      pageSize: "A4",
      defaultStyle: { font: "Roboto", fontSize: 10 },
      content: [
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto", "*"],
            body: getRows(),
          },
          layout: "lightHorizontalLines",
        },
      ],
    })
    .download("debts.pdf");
}
