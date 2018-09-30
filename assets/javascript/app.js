


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDEYTPriEMfcmwlXoWgHqntOgbTagpyH4w",
  authDomain: "train-scheduler-45467.firebaseapp.com",
  databaseURL: "https://train-scheduler-45467.firebaseio.com",
  projectId: "train-scheduler-45467",
  storageBucket: "",
  messagingSenderId: "168543394099"
};

firebase.initializeApp(config);
console.log(firebase);

var database = firebase.database();

$("#submitBtn").on("click", function (event) {
  event.preventDefault();
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTime = moment($("#firstTime").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency").val().trim();

  var train = {
    name: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency
  }

  database.ref().push(train);

  console.log(train.name);
  console.log(train.destination);
  console.log(train.firstTime);
  console.log(train.frequency);

  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTime").val("");
  $("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(destination);
  console.log("------------")
  console.log(firstTime);
  console.log(frequency);
  console.log("------------")

  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // // Minute Until Train
  var minAway = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minAway);

  // // Next Train
  var nextTrain = moment().add(minAway, "minutes").format("hh:mm");
  console.log("ARRIVAL TIME: " + nextTrain);

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minAway)
  );

  $("#trainTable > tbody").append(newRow);

});

