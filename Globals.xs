var editingUserId = null;
var searchTerm = "";
var filterPhone = "";
var filteredUsers = [];
var showEmail = true;
var pageSize = 10;
var notes = "";

// Scripting & Reactivity group
var userCount = null;
var xsCounter = 0;
var threshold = 2;

function getUserCount() {
  return userCount;
}

function isAboveThreshold() {
  return getUserCount() > threshold;
}

function formatCount(n) {
  return n + " users loaded";
}

function incrementCounter() {
  xsCounter = xsCounter + 1;
}

function getCounter() {
  return xsCounter;
}

function applyFilter(allUsers) {
  if (filterPhone === "has-phone") filteredUsers = allUsers.filter(u => u.phone && u.phone !== "");
  else if (filterPhone === "no-phone") filteredUsers = allUsers.filter(u => !u.phone || u.phone === "");
  else filteredUsers = allUsers;
}
