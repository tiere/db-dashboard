(function () {
  $(function () {
    $('a[data-table-name]').on('click', function (e) {
      e.preventDefault();

      $('a[data-table-name]').removeClass('active');
      $(e.target).addClass('active');

      var tableName = $(e.target).data('tableName');

      $.get('/tables/' + tableName + '/rows', function (data) {
        updateTable($('#tableRows'), data);
      });
    });
  });

  function updateTable ($table, data) {
    var table = [];

    table.push('<thead><tr>');

    for (var i = 0; i < data.fields.length; i++) {
      table.push('<th>' + data.fields[i].name + '</th>');
    }

    table.push('</tr></thead><tbody>');

    for (i = 0; i < data.rows.length; i++) {
      table.push('<tr>');

      for (var col in data.rows[i]) {
        if (data.rows[i].hasOwnProperty(col)) {
          table.push('<td class="no-wrap">' + data.rows[i][col] + '</td>');
        }
      }

      table.push('</tr>');
    }

    $table.html(table.join(''));
  }
}());
