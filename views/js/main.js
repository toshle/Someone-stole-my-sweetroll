$(window).load(function(e) {

  var openModal = function() {
    $("#page-cover").css("opacity", 0.6).fadeIn(300, function() {
      $('#publish').css({
        'visibility': 'visible'
      });
    });
  };

  var closeModal = function() {
    $("#page-cover").css("display", "none").fadeOut(300, function() {
      $('#publish').css({
        'visibility': 'hidden'
      });
    });
  };

  $('#add_comment').on('click', function(e) {
    e.preventDefault();
    openModal();
  });

  $('#refresh').on('click', function(e) {
    e.preventDefault();
    refreshComments();
  });

  $('#close').on('click', function(e) {
    e.preventDefault();
    closeModal();
  });

  $('form#newComment').submit(function(e) {
    e.preventDefault();

    var d = {};
    var Form = this;

    $.each(this.elements, function(i, v) {
      var input = $(v);
      var val = input.val();
      d[input.attr("name")] = val;
      delete d["submit"];
      delete d["undefined"];
    });

    $.ajax({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      cache: false,
      url: "/",
      type: "POST",
      dataType: "text",
      data: JSON.stringify(d),
      context: Form
    }).done(function(data, status, jqXHR) {
      console.log("Done", jqXHR);
    }).fail(function(jqXHR, status, error) {
      console.log("Fail", error);
    });

    closeModal();
    refreshComments();
  });

  var refreshComments = function() {

    $.ajax({
      accept: 'application/json',
      dataType: 'text',
      success: function(data, textStatus, xhr) {
        html = '';

        JSON.parse(data).forEach(function(entry) {
          html += '<p>' + entry.name + ': ' + entry.comment + '</p>';
        });
        console.log(html);
        $('#comments').html(html);
      },
      error: function(xhr, textStatus, errorThrown) {
        $('#errors').html(
          "Error: Request was not successful!<br />" + xhr.status + " - " + textStatus + xhr.responseText).show();
      },
      type: 'GET',
      url: "/all"
    });

  };

});