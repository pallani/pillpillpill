// Make a request for a user with a given ID
setInterval(function(){
  axios.get('http://pillpillpill.herokuapp.com/usage')
    .then(function (response) {
      console.log(response.data.pills_left);
      var numPills = response.data.pills_left;
      var lastUpdated = response.data.last_update;
      var lastConsumed = response.data.last_consumed;

      document.getElementById('lastupdated').innerHTML = lastUpdated;
      document.getElementById('lastconsumed').innerHTML = lastConsumed;

      // handle success
      if (numPills === '3') {
        console.log(numPills);
        console.log('here');
        resetImages();
        document.getElementById('3left').style.display = 'block';
      }
      if (numPills === '2') {
        console.log(numPills);
        resetImages();
        document.getElementById('2left').style.display = 'block';
      }
      if (numPills === '1') {
        console.log(numPills);
        resetImages();
        document.getElementById('1left').style.display = 'block';
      }
      if (numPills === '0') {
        console.log(numPills);
        resetImages();
        document.getElementById('0left').style.display = 'block';
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, 500);


function resetImages() {
  document.getElementById('0left').style.display = 'none';
  document.getElementById('1left').style.display = 'none';
  document.getElementById('2left').style.display = 'none';
  document.getElementById('3left').style.display = 'none';
}