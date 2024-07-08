const playerInstance = jwplayer("player").setup({
  controls: true,
  sharing: true,
  displaytitle: true,
  displaydescription: true,

  skin: {
    name: "netflix"
  },

  logo: {
    file: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    link: "https://ambontv.my.id"
  },

  playlist: [
    {
      title: "Sprite Fright - Open Movie by Blender Studio",
      description: "You're Watching",
      image: "https://i.ytimg.com/vi/_cMxraX_5RE/maxresdefault.jpg",
      sources: [
        {
          file: "https://linear301-it-dash1-prd-akg0.cdn13.skycdp.com/016a/31023/FHD/skysportuno/master_stereo.mpd", // Ganti dengan URL MPD kamu
          type: "dash",
          label: "DASH",
          default: true,
          drm: {
            clearkey: {
              key: "55517f806b6be917c2bf0e9cf9acc44f", // Ganti dengan kunci Clear Key kamu
              keyId: "0036dc70e4d659fe5ae57b52793a1ff3"   // Ganti dengan ID kunci Clear Key kamu
            }
          }
        }
      ]
    }
  ]
});

playerInstance.on("ready", function () {
  // Move the timeslider in-line with other controls
  const playerContainer = playerInstance.getContainer();
  const buttonContainer = playerContainer.querySelector(".jw-button-container");
  const spacer = buttonContainer.querySelector(".jw-spacer");
  const timeSlider = playerContainer.querySelector(".jw-slider-time");
  buttonContainer.replaceChild(timeSlider, spacer);

  // Forward 10 seconds
  const rewindContainer = playerContainer.querySelector(".jw-display-icon-rewind");
  const forwardContainer = rewindContainer.cloneNode(true);
  const forwardDisplayButton = forwardContainer.querySelector(".jw-icon-rewind");
  forwardDisplayButton.style.transform = "scaleX(-1)";
  forwardDisplayButton.ariaLabel = "Forward 10 Seconds";
  const nextContainer = playerContainer.querySelector(".jw-display-icon-next");
  nextContainer.parentNode.insertBefore(forwardContainer, nextContainer);

  // control bar icon
  playerContainer.querySelector(".jw-display-icon-next").style.display = "none"; // hide next button
  const rewindControlBarButton = buttonContainer.querySelector(".jw-icon-rewind");
  const forwardControlBarButton = rewindControlBarButton.cloneNode(true);
  forwardControlBarButton.style.transform = "scaleX(-1)";
  forwardControlBarButton.ariaLabel = "Forward 10 Seconds";
  rewindControlBarButton.parentNode.insertBefore(forwardControlBarButton, rewindControlBarButton.nextElementSibling);

  // add onclick handlers
  [forwardDisplayButton, forwardControlBarButton].forEach((button) => {
    button.onclick = () => {
      playerInstance.seek(playerInstance.getPosition() + 10);
    };
  });
});
