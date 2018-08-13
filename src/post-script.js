// import { $, jQuery } from "jquery";
let markdownFile;

document.forms["postform"].elements["mdfile"].onchange = function(evt) {
  if (!window.FileReader) return; // Browser is not compatible

  var reader = new FileReader();

  reader.onload = function(evt) {
    if (evt.target.readyState != 2) return;
    if (evt.target.error) {
      alert("Error while reading file");
      return;
    }

    filecontent = evt.target.result;

    document.forms["postform"].elements["rawmd"].value =
      "Raw Markdown: \n" + evt.target.result;

    document.getElementById("postpreview").innerHTML = marked(
      evt.target.result
    );
  };

  reader.readAsText(evt.target.files[0]);
};

document.forms["postform"].elements["rawmd"].onchange = function(evt) {
  document.getElementById("postpreview").innerHTML =
    "Post Preview: \n" +
    marked(document.forms["postform"].elements["rawmd"].value);
};

$("#getIdButton").click(function() {
  let authCode = getElementById("authcode").value;
  let myAuthCode =
    "218800e8caf5ef6ff60fe81916ba76d1d6f6ebc995256234a8ae6eb2b7a393a0e";
  $.ajax({
    type: "GET",
    url: "https://cors-anywhere.herokuapp.com/https://api.medium.com/v1/me",
    headers: {
      Authorization: "Bearer " + authCode,
      contentType: "application/json;charset=utf-8",
      Accept: "application / json",
      acceptCharset: "utf-8"
    },
    success: function(response) {
      console.log(response);
      $("#userId").val = response.data.id;
    },
    error: function(xhr, status, error) {
      var err = eval("(" + xhr.responseText + ")");
      console.log(err);
    }
  });
});

$("#submitPostButton").click(function() {
  let postTitle = $("input[name=title]").val();
  let markdownFile = document.forms["postform"].elements["rawmd"].value;
  let originalUrl = $("input[name = canonicalUrl]").val();

  console.log("Posted.");

  // If you need to get your ID, use this!
});
