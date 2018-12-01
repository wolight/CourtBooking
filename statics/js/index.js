$(document).ready(function(){
    $.get("/news", function(data, status){
      let news =  data.news;
      let length = news.length;
      let table = '<table>';
      table += '<tr>';
      table += '<th id="th">' + 'Title' + '</th>';
      table += '<th>' + 'date' + '</th>';
      table += '</tr>';
      for(let i = 0; i < length; i++){
            let n = news[i];
            table += '<tr>';
            table += '<td>' + n['news_title'] + '</td>';
            table += '<td>' + n['date'] + '</td>';
            table += '</tr>';
      }
      table += '</table>';
      $('#output').append(table);
    });

    $.get("/courts", function(data, status){
            let courts =  data.courts;
            let length = courts.length;
            let table = '';
            for(let i = 0; i < length; i++){
                  let n = courts[i];
                  if(i == 0){
                        table += '<div class="item active"><a href="court?id=' + n['_id'] + '">' +
                        '<img src="' + n['photo'] + '"alt="Court:' + n['courtName'] + '">' + '</a></div>';
                  }
                  else{
                        table += '<div class="item"><a href="court?id=' + n['_id'] + '">';
                        table += '<img src="' + n['photo'] + '"alt="Court:' +
                        n['courtName'] + '">' + '</a></div>';
                  }
            }
            table += '</select><br>';
            $('#inner').append(table);
    });
});
