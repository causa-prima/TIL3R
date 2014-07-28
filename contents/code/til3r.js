var clients = workspace.clientList();
var activeClient;

for (var i=0; i<clients.length; i++) {
    if (clients[i].active) {
      activeClient = clients[i];      
    }
}

workspace.clientActivated.connect(function(client){
  activeClient = client;
});

// function to check for valid clients taken from the tiling-kwin-script
// Copyright (C) 2012 Mathias Gottschlag <mgottschlag@gmail.com>
// Copyright (C) 2013-2014 Fabian Homborg <FHomborg@gmail.com>
var isIgnored = function(client) {
	// TODO: Add regex and more options (by title/caption, override a floater, maybe even a complete scripting language / code)
	// Application workarounds should be put here
	// HACK: Qt gives us a method-less QVariant(QStringList) if we ask for an array
	// Ask for a string instead (which can and should still be a StringList for the UI)
	var fl = "yakuake,krunner,plasma,plasma-desktop,plugin-container,Wine,klipper";
	// TODO: This could break if an entry contains whitespace or a comma - it needs to be validated on the qt side
	var floaters = String(readConfig("floaters", fl)).replace(/ /g,"").split(",");
	if (floaters.indexOf(client.resourceClass.toString()) > -1) {
		return true;
	}
	// HACK: Steam doesn't set the windowtype properly
	// Everything that isn't captioned "Steam" should be a dialog - these resize worse than the main window does
	// With the exception of course of the class-less update/start dialog with the caption "Steam" (*Sigh*)
	if (client.resourceClass.toString() == "steam" && client.caption != "Steam") {
		return true;
	} else if (client.resourceClass.toString() != "steam" && client.caption == "Steam") {
		return true;
	}
	if (client.specialWindow == true) {
		return true;
	}
	if (client.desktopWindow == true) {
		return true;
	}
	if (client.dock == true) {
		return true;
	}
	if (client.toolbar == true) {
		return true;
	}
	if (client.menu == true) {
		return true;
	}
	if (client.dialog == true) {
		return true;
	}
	if (client.splash == true) {
		return true;
	}
	if (client.utility == true) {
		return true;
	}
	if (client.dropdownMenu == true) {
		return true;
	}
	if (client.popupMenu == true) {
		return true;
	}
	if (client.tooltip == true) {
		return true;
	}
	if (client.notification == true) {
		return true;
	}
	if (client.comboBox == true) {
		return true;
	}
	if (client.dndIcon == true) {
		return true;
	}

    return false;
};

var resizeAndMove = function(choice){
  if (isIgnored(activeClient)) {
    print("client ignored, no resize and move");
    return;
  }
  wide = Math.floor(choice / 10);
  choice = choice % 10;
  print("TIL3R called with wide: " + wide + ", choice " + choice);
  var workGeo = workspace.clientArea(KWin.WorkArea, 1, 1);
  var geo = activeClient.geometry;
  geo.x = workGeo.x + (choice - 1) % 3 * workGeo.width / 3;      
  geo.width = wide * workGeo.width / 3;
  geo.y = workGeo.y;
  if (choice>6) {
    geo.y = workGeo.y + workGeo.height / 2;
  }
  geo.height = workGeo.height;
  if (choice>3) {
    geo.height = workGeo.height/2;
  }
  print("new geometry, x: " + geo.x + " y: " + geo.y + " width: " + geo.width + " height: " + geo.height);
  activeClient.geometry = geo;
}

print("TIL3R active");

registerShortcut("TIL3R: left third, full height", "TIL3R: left third, full height", "Meta+Alt+1", function () {resizeAndMove(11)});
registerShortcut("TIL3R: middle third, full height", "TIL3R: middle third, full height", "Meta+Alt+2", function () {resizeAndMove(12)});
registerShortcut("TIL3R: right third, full height", "TIL3R: right third, full height", "Meta+Alt+3", function () {resizeAndMove(13)});
registerShortcut("TIL3R: left third, upper half", "TIL3R: left third, upper half", "Meta+Alt+4", function () {resizeAndMove(14)});
registerShortcut("TIL3R: middle third, upper half", "TIL3R: middle third, upper half", "Meta+Alt+5", function () {resizeAndMove(15)});
registerShortcut("TIL3R: right third, upper half", "TIL3R: right third, upper half", "Meta+Alt+6", function () {resizeAndMove(16)});
registerShortcut("TIL3R: left third, lower half", "TIL3R: left third, lower half", "Meta+Alt+7", function () {resizeAndMove(17)});
registerShortcut("TIL3R: middle third, lower half", "TIL3R: middle third, lower half", "Meta+Alt+8", function () {resizeAndMove(18)});
registerShortcut("TIL3R: right third, lower half", "TIL3R: right third, lower half", "Meta+Alt+9", function () {resizeAndMove(19)});

registerShortcut("TIL3R: left two thirds, full height", "TIL3R: left third, full height", "Meta+Ctrl+1", function () {resizeAndMove(21)});
registerShortcut("TIL3R: right two thirds, full height", "TIL3R: middle third, full height", "Meta+Ctrl+2", function () {resizeAndMove(22)});
registerShortcut("TIL3R: left two thirds, upper half", "TIL3R: left third, upper half", "Meta+Ctrl+4", function () {resizeAndMove(24)});
registerShortcut("TIL3R: right two thirds, upper half", "TIL3R: middle third, upper half", "Meta+Ctrl+5", function () {resizeAndMove(25)});
registerShortcut("TIL3R: left two thirds, lower half", "TIL3R: left third, lower half", "Meta+Ctrl+7", function () {resizeAndMove(27)});
registerShortcut("TIL3R: right two thirds, lower half", "TIL3R: middle third, lower half", "Meta+Ctrl+8", function () {resizeAndMove(28)});