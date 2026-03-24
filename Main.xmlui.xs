var editingUserId = null;
var filterPhone = "";
var filteredUsers = [];
var showEmail = true;
var pageSize = 10;
var notes = "";

function applyFilter(allUsers) {
  if (filterPhone === "has-phone") filteredUsers = allUsers.filter(u => u.phone && u.phone !== "");
  else if (filterPhone === "no-phone") filteredUsers = allUsers.filter(u => !u.phone || u.phone === "");
  else filteredUsers = allUsers;
}
