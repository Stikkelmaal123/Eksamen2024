function toggleRow(row) {
  // Toggle the 'expanded' class on the clicked row
  row.classList.toggle("expanded");

  // Collapse other rows if they are open
  document.querySelectorAll('.table-row').forEach(function(r) {
    if (r !== row) {
      r.classList.remove('expanded');
    }
  });
}