if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
  .then(function(registration) {

    if (registration.waiting){
      updateReady(registration.waiting);
      return;
    }

    if (registration.installing){
      trackInstalling(registration.installing);
      return;
    }
    
    registration.addEventListener('updatefound',()=> {
      trackInstalling(registration.installing);
    });

  })
  .catch(function(error) {
    console.log('Service worker registration failed:', error);
  });

  let ref;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (ref) return;
    window.location.reload();
    ref = true;
  });

  function updateReady(worker) {
    (
      function myFunction() {
        let snackbarWrapper = document.getElementById("snackbar");
        snackbarWrapper.className = "show";

        let refreshBtn = document.getElementById ('refresh').addEventListener('click', () =>{
          worker.postMessage({action: 'skipWaiting'});
          setTimeout(function(){ snackbarWrapper.className = snackbarWrapper.className.replace("show", ""); }, 500);
        })

        let dismissBtn = document.getElementById('dismiss').addEventListener('click', ()=>{
          setTimeout(function(){ snackbarWrapper.className = snackbarWrapper.className.replace("show", ""); }, 500);
        })
      }
      ()
    );
  }

  function trackInstalling(worker) {
    worker.addEventListener('statechange', () => {
      if (worker.state === 'installed') {
        updateReady(worker);
      }
    });
  }
}