$(document).ready(function(){
    var isPlaying = false;
    var bpm = 100;
    var beat = 4;
    const url = "Music/MetronomeShort.mp3";
    var met_buffer;
    var chordsBuffer = [];
    var chordsName = [];
    var chordsSelected = [];
    const folder = "Music/Chords/";
    var audioSource;
    const audioContext = new AudioContext();
    
    var first = false;
    $.get("php/getChords.php", function(data){
        chordsName = jQuery.parseJSON(data);
        $.each(chordsName, function(index,val){
                var btn_name = val;
                var request = new XMLHttpRequest();
                            request.open('get', folder+ btn_name,true);
                            request.responseType = 'arraybuffer';
                            request.onload = function(){
                                audioContext.decodeAudioData(request.response, function(buffer){
                                    chordsBuffer.push(buffer);
                                    //audioSource.buffer = chordsBuffer[chordsBuffer.length-1];
                                    //audioSource.connect(audioContext.destination);
                                });
                            }
                            request.send();
                //Button stuffs
                btn_name = btn_name.substring(0,btn_name.length -4);
                var btn = document.createElement("BUTTON");
                btn_display_name = btn_name.replace("Sharp", "#");
                btn_display_name = btn_display_name.replace("maj", "major");
                btn_display_name = btn_display_name.replace("min", "minor");
                btn.innerHTML = btn_display_name;
                btn.className = "song btn btn-outline-primary";
                chordsName.push[btn_name];
                btn.id = btn_name;
                // $("#NotesContainer").appendChild(btn);
                 $("#NotesContainer").append(btn);
            })
    });
    
    $("#metronome_btn").click(function(){
        if (!first){
            loadMp3(url);
            first = true;
        }
        if (isPlaying){
            $(this).removeClass("btn-danger");
            $(this).addClass("btn-success");
            $(this).html("Play");
            isPlaying = false;
        }
        else {
            $(this).html("Stop");
            $(this).removeClass("btn-success");
            $(this).addClass("btn-danger");
            isPlaying = true;
            metronomePlay();
           
    }
    });

    $("#bpm_input").change(function(){
        bpm = this.value;
    });
    $("#beats").change(function(){
        beat = this.value;
    });
    function loadMp3(url){
        //audioSource = audioContext.createBufferSource();
        var request = new XMLHttpRequest();
        request.open('get',url,true);
        request.responseType = 'arraybuffer';
        request.onload = function(){
            var audioData = request.response;
            audioContext.decodeAudioData(audioData, function(buffer){
                met_buffer = buffer;
                audioSource.buffer = met_buffer;
                audioSource.connect(audioContext.destination);
            });
        }
        request.send();
    }
    function metronomePlay(){
        var count = 0;
        var currtime = audioContext.currentTime;
        function recursivelyPlay(){
            if (!isPlaying){
                return;
            }
            if (count >= beat){
                count = 0;
            }
            if (count == 0){
                playRandomChord(currtime);
            }
            count++;
            audioSource = audioContext.createBufferSource();
            audioSource.buffer = met_buffer;
            audioSource.connect(audioContext.destination);
            audioSource.onended = recursivelyPlay;
            audioSource.start(currtime);
            currtime += 60/bpm;
            
        }
        recursivelyPlay();
    }
    function playRandomChord(currtime){
        audioSource = audioContext.createBufferSource();
        var currentNotes = [];
        $("button.song.btn-primary").each(function(){
            currentNotes.push(this.id + ".mp3");
        });
        
            var bufferSelected = [];
            var namesSelected = [];
            currentNotes.forEach(function(val){
            var i = chordsName.indexOf(val);
                bufferSelected.push(chordsBuffer[i]);
                namesSelected.push(chordsName[i]);
            })
            var rand = Math.floor(Math.random() * Math.floor(bufferSelected.length));
            audioSource.buffer = bufferSelected[rand];
            if (namesSelected.length > 0){
                var text = namesSelected[rand];
                text = text.substring(0,text.length -4);
                text = text.replace("Sharp", "#");
                text = text.replace("maj", "major");
                text = text.replace("min", "minor");
                $("#current_note").text(text);
            } else {
                $("#current_note").text("");
            }
            audioSource.connect(audioContext.destination);
            audioSource.start(currtime);
    
    }

    //Handles Visual adding notes to the note queue
    $(document).on("click", "button.song",function(){
            var audio_element = $(this)[0];
            var index = $.inArray(audio_element.id,chordsSelected);
            if ($(audio_element).hasClass("btn-primary")){
                $(this).removeClass("btn-primary");
                $(this).addClass("btn-outline-primary");
                var i = chordsSelected.indexOf(audio_element.id);
                
            } else {
                $(this).removeClass("btn-outline-primary");
                $(this).addClass("btn-primary");
            }
    });
    // $("#selectAll").click(function(){
    //     if ($(this).hasClass("btn-primary")){
    //         $(this).removeClass("btn-primary");
    //         $(this).addClass("btn-outline-primary");            
    //     } else {
    //         $(this).removeClass("btn-outline-primary");
    //         $(this).addClass("btn-primary");
    //     }
    // });
});