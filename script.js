var token;
var tokenGen = new XMLHttpRequest();
tokenGen.onload = function (){
    if(tokenGen.status == 200){
        console.log(JSON.parse(tokenGen.response))
        var tokenJ = JSON.parse(tokenGen.response);
        token = tokenJ.access_token;
        $( ".input" ).ready(onLoad1(token))   
}
}
    tokenGen.open('POST', 'https://bhagavadgita.io/auth/oauth/token?client_id=8q89EsvzBRWu4B867Jm0OfMnaGDwPcrkfvFw7uC1&client_secret=7RE72ANEu5kM9p7Rg0kkJ7gtFXDZM0i76SA3K7GVSgmvioQnPf&grant_type=client_credentials&scope=verse chapter');
    tokenGen.setRequestHeader('accept','application/json');
    tokenGen.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    tokenGen.send()
    
 function onLoad1(token){
    $( ".headDisplay" ).hide();
    $( ".textDisplay" ).hide();
    $("#verse").hide();
    $("#button2").hide();
    var chapter_verse;
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', 'https://bhagavadgita.io/api/v1/chapters?access_token=' + token);
    xhr.send()
    xhr.onload = function (){
        if(xhr.status == 200){
            // console.log(xhr.response);
            chapter_verse = JSON.parse(xhr.response);
            // console.log(chapter_verse)
            // console.log("Length is "+chapter_verse.length)
        }
        else{
            alert("Error Code is:" + xhr.status);
    }
  
    for (var i=0; i<chapter_verse.length;i++){
        var chapter = "<option>" + "Chapter "+chapter_verse[i].chapter_number + "</option>";             
        $("#chapter").append(chapter);
    }
}
}

//$("#button1").click(function(){
    function chapter(){
    console.log("khdcbdk")
    $("#summary").empty();
    $("#verse").empty();
    $("#title").empty();
    var chapter_verse1;
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', 'https://bhagavadgita.io/api/v1/chapters?access_token=' + token);
    xhr.send()
    xhr.onload = function (){
        if(xhr.status == 200){
            chapter_verse1 = JSON.parse(xhr.response);
            console.log(chapter_verse1)
            console.log("Length is "+chapter_verse1.length)
        }
        console.log(chapter_verse1);
        $( ".headDisplay" ).show(200);
        for (var i = 0; i< chapter_verse1.length ; i++){
            var j = i+1;
            if(document.getElementById("chapter").value == "Chapter " + j){
                console.log(document.getElementById("chapter").innerHTML)
                var chapterSummary = chapter_verse1[i].chapter_summary;             
                $("#summary").append(chapterSummary);
                $("#header").append("Chapter: "+ j + " "+chapter_verse1[i].name_meaning);
                $("#title").append(chapter_verse1[i].name+" (" + chapter_verse1[i].name_translation+ ")");
            }
        }
        $("#verse").show();
        $("#button2").show();
    for (i = 1; i <= chapter_verse1.length; i++) {
            if(document.getElementById("chapter").value == "Chapter " + i) {
                var verseNumber = Number(chapter_verse1[i-1].verses_count);
                for(var j=1; j<=verseNumber; j++){
                    var verse = "<option>Verse " + j + "</option>"
                    $("#verse").append(verse);
                }
                }
            }
        }
}
function verse() {
    $("#summaryVerse").empty();
    $("#titleVerse").empty();
    var chapter_verse2;
    var xhr = new XMLHttpRequest();
    var xhr1 = new XMLHttpRequest();
    for (var i = 1; i< 19 ; i++){
        if(document.getElementById("chapter").value == "Chapter " + i){
            xhr.open('GET', 'https://bhagavadgita.io/api/v1/chapters/' + i + '/verses?access_token=' + token);
            xhr.send()
            xhr.onload = function (){
                if(xhr.status == 200){
                    chapter_verse2 = JSON.parse(xhr.response);
                    console.log(chapter_verse2)
                    console.log("Length is "+chapter_verse2.length)
                }
                xhr1.open('GET', 'https://bhagavadgita.io/api/v1/chapters/' + i + '/verses?access_token=' + token + "&language=hi");
                xhr1.send()
                xhr1.onload = function (){
                if(xhr1.status == 200){
                    chapter_verse3 = JSON.parse(xhr1.response);
                    console.log(chapter_verse3)
                    console.log("Length is "+chapter_verse3.length)
                }
                $( ".textDisplay" ).show(200);
                for (var i = 1; i<= chapter_verse2.length ; i++){
                    if(document.getElementById("verse").value == "Verse " + i){
                        console.log(document.getElementById("chapter").innerHTML)
                        var verseSummary = chapter_verse2[i-1].meaning;             
                        $("#summaryVerse").append("Meaning: " +verseSummary);
                        $("#headerVerse").append(chapter_verse2[i-1].text);
                        $("#titleVerse").append(chapter_verse2[i-1].transliteration);
                    }
                }
            }
        }
    }
}
}
