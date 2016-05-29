var socket = io();

$(function() {
	$("body").prepend("<h1 id='chat_name' style='font-family: Verdana, Helvetica, Arial'>" + localStorage.getItem("pkChat") + "</h1>");
});

socket.on("serve names", function(data) {
	var valid = true;
	for (i = 0; i < data.length; i++) {
		name = data[i].split(":")[1];
		console.log(name);
		if (name == $("#n").val()) {
			valid = false;
			break;
		}
	}
	if (valid && $("#n").val() != "") {
		socket.emit("user joined", $("#chat_name").html() + ":" + $("#n").val());
		$("#login").css("display", "none");
		$("#invalid").css("display", "none");
		$("#chat_textfield").css("display", "block");
		$("#user_list_caption").css("display", "block");
		$("#names").css("display", "block");
	} else {
		$("body").append($("<h2>").html("<span style='float: left;color:red;position:absolute;top:81px;left:228px' id='invalid'>Invalid Name</span>"));
	}
});

$("#name_textfield").submit(function() {
	socket.emit("request names");
	return false;
});

$("#name_textfield").onkeypress = function(e) {
	if (e.which == 13 && $(this).is(":focus")) {
		socket.emit("request names");
	}
}

socket.on("update list", function(userdata) {
	$("#names li").remove();
	for (i = 0; i < userdata.length; i++) {
		split = userdata[i].split(":");
		curChat = split[0];
		curName = split[1];
		curColor = split[2];
		if ($("#chat_name").html() == curChat) {
			$("#names").append("<li style='color:rgb(" + curColor + ");'>" + curName + "</li>");
		}
	}
});

//

function correct(time) {
	if (time < 10) {
		return "0" + time;
	}
	return time;
}

function sendMessage(val) {
	if (val == "") {
		return;
	}
	socket.emit("chat message", val);
	$("#m").val("");
}

$("#chat_textfield").submit(function() {
	sendMessage($("#m").val());
	return false;
});

$("#chat_textfield").onkeypress = function(e) {
	if (e.which == 13 && $(this).is(":focus")) {
		sendMessage($("#m").val());
	}
}

socket.on("chat message", function(msg) {
	split = msg.split(":");
	chat = split[0];
	name = split[1];
	color = split[2];
	message = split[3];
	if (chat == $("#chat_name").html()) {
		time = new Date();
		hour = correct(time.getHours());
		minute = correct(time.getMinutes());
		second = correct(time.getSeconds());
		newMessage = $("<div>").html("<span style='font: 15px Verdana, Helvetica, Arial;'><small style='color:gray;'>[" + hour + ":" + minute + ":" + second + "]</small><span style='color:rgb(" + color + ");'>" + name + "</span>" + ": " + message + "</span");
		$("#messages").append(newMessage);
		$("#messages").scrollTop(999999999999);
	}
});