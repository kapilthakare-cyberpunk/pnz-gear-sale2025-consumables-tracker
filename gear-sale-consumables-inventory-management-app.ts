// Google Apps Script Web App for Google Sheets Integration
const SPREADSHEET_ID = '1nSMFVogU3QKZJX0HDWvIL63rqFgEG8lyjB4z8Z5l8EI'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Inventory';

// Function to get the active spreadsheet
function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

// Function to get the inventory sheet
function getSheet() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Set up header row
    sheet.appendRow([
      'Item Code', 'Name', 'Category', 'Description',
      'Quantity', 'Price', 'Cost', 'Vendor', 'Last Updated'
    ]);
  }

  return sheet;
}

// Get all inventory items
function doGet(e) {
  try {
    const sheet = getSheet();
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const items = [];

    // Convert sheet data to array of objects
    for (let i = 1; i < data.length; i++) {
      const item = {};
      for (let j = 0; j < headers.length; j++) {
        item[headers[j].toLowerCase().replace(/\s+/g, '_')] = data[i][j];
      }
      items.push(item);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      data: items
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Add or update inventory item
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet();
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Find if item exists
    const itemCode = data.item_code;
    const itemCodes = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat();
    const rowIndex = itemCodes.indexOf(itemCode) + 2; // +2 for 1-based index and header row

    const rowData = [];
    headers.forEach(header => {
      const key = header.toLowerCase().replace(/\s+/g, '_');
      rowData.push(data[key] || '');
    });

    if (rowIndex > 1) {
      // Update existing item
      sheet.getRange(rowIndex, 1, 1, headers.length).setValues([rowData]);
    } else {
      // Add new item
      sheet.appendRow(rowData);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Item saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
