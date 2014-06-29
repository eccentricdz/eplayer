// JavaScript Document
$(document).ready(function(){
	
	var eplayer =document.getElementById('eplayer');
	eplayer.volume=0.5;var ct =0;
	eplayer.preload=false;
	var loading = document.getElementById('loading');
	loading.style.height = screen.height+'px';
	
	$(window).on('load',function(){
		$('#loading').fadeOut('slow');
	});
	
var eplay=document.getElementById('play');
var epause= document.getElementById('pause');
var playbar =document.getElementById('playbar');
var seekbar =document.getElementById('seekbar');
var bars =document.getElementById('bars');
var mute =document.getElementById('mute');
var unmute = document.getElementById('unmute');
var vbarvalue = document.getElementById('volume-bar-value');
var vbar = document.getElementById('vbar');
var duration =document.getElementById('duration');
var current = document.getElementById('current');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var song = document.getElementById('song');
var artist = document.getElementById('artist');
var cover = document.getElementById('cover');
var plist = document.getElementById('playlist');
var pl = document.getElementById('pl');
var pltrak = document.getElementsByClassName('pltrak');
var vstore;

mute.onclick = function(){
	eplayer.muted= true;
	this.style.display = 'none';
	vstore = vbarvalue.style.width;
	vbarvalue.style.width= '0%';
};
unmute.onclick = function(){
	eplayer.muted= false;
	mute.style.display = 'block';
		vbarvalue.style.width= vstore;
};
vbar.onmousedown = function(event){
						var vp = event.offsetX/300*100;
						vbarvalue.style.width= vp+'%';
						var v = event.offsetX/246;
						eplayer.volume = v;
						window.document.onmousemove = function(event){
							event.preventDefault();
							var x= (event.offsetX>300)?246:event.offsetX;
								var vp = x/300*100;
						vbarvalue.style.width= vp+'%';
						var v = event.offsetX/246;
						eplayer.volume = v;
						}
						
						
};
eplay.onclick= play;
function pause(event)
{
			eplayer.pause();
			eplay.style.display='block';
};
 function play()
{
							eplayer.play();
							eplay.style.display='none';
};
function toaudiotime(time)
{
	var mint = Math.floor(time/60);
	var sec = Math.floor(time-(mint*60));
	if(mint<10)
	mint = '0'+mint;
	if(sec<10)
	sec ='0'+sec;
	var res = mint+":"+sec;
	return(res);
};
epause.onclick= pause;
eplayer.addEventListener('timeupdate',function(){
							var pb = ((eplayer.currentTime)/(eplayer.duration)*100);
							playbar.style.width =pb+'%';
							var ct = toaudiotime(Math.floor(eplayer.currentTime));
							current.innerHTML = ct;
							
},true);
		eplayer.addEventListener('ended',function(){
			nexttrak();
			play();},false);										
			eplayer.addEventListener('progress',function(){
												var sb = ((eplayer.buffered.end(0))/(eplayer.duration)*100);
														seekbar.style.width= sb+'%';
														bars.style.width= sb+'%';
			},true);

/*bars.onclick = function updateplaybar(event){
								var np = (event.offsetX)/687*(eplayer.duration);
								eplayer.currentTime = np;
								
};*/
bars.onmousedown = function(event){
	
	var np = (event.offsetX)/687*(eplayer.duration);
								eplayer.currentTime = np;
								document.onmousemove = function(event){
									event.preventDefault();
								
							var x= (event.offsetX>687)?687:event.offsetX;	
	var np = (x)/687*(eplayer.duration);
								eplayer.currentTime = np;
								};
								
};
document.onmouseup= function(){
	bars.onmousemove = null;
		document.onmousemove = null;
};

eplayer.addEventListener('durationchange',function(){
							var d = toaudiotime(Math.floor(eplayer.duration));
							duration.innerHTML = d;
								playbar.style.width = '0%';
});

var playlist = new Array();
playlist[0] = {src :'http://mp3.com.ua/audio/88364173/10450880/Eminem_amp_Green_Day_amp_Oasis_amp_Travis_amp_Aerosmith-Boulevard_of_Broken_Dreams___Wonderwall___Writing_To_Reach_You___Dream_On_Boulevard_of_broken_songs(mp3.com.ua).mp3',song :'Boulevard Of Broken Dreams', artist: 'GreenDay', poster: 'cover/Green-Day.png'};
playlist[1] = {src :'http://fileraja.info/Hindi/B/Barfi_160kbps/Main_Kya_Karoon-VmusiQ.Com.mp3',song :'Main Kya Karoon', artist: 'Barfi', poster: 'cover/barfi.jpg'};
playlist[2] = {src: 'http://www.radekf.net/projekty-data/mobil/tony-melodie-vyzvaneni/mp3/vyzvaneni a tony/GREENDAY - Holiday.mp3',song: 'Holiday',artist: 'GreenDay',poster: 'cover/Green-Day.png'};
/*playlist[3] = {src: 'songs/audio4.mp3',song: 'Are We The Waiting',artist: 'GreenDay',poster: 'cover/Green-Day.png'};
playlist[4] = {src: 'songs/audio5.mp3',song: 'American Idiot',artist: 'GreenDay',poster: 'cover/Green-Day.png'};
playlist[5] = {src: 'songs/audio6.mp3',song: 'Barfi!',artist: 'Barfi',poster: 'cover/barfi.jpg'};
playlist[6] = {src: 'songs/audio7.mp3',song: 'Saiyaara',artist: 'Ek Tha Tiger',poster: 'cover/etg.jpg'};
playlist[7] = {src: 'songs/audio8.mp3',song: 'O Wominya',artist: 'Gangs Of Wasseypur',poster: 'cover/default.png'};
playlist[8] = {src: 'songs/audio9.mp3',song: 'Wavin Flag',artist: 'KNaan',poster: 'cover/default.png'};
playlist[9] = {src: 'songs/audio10.mp3',song: 'Shot',artist: 'LMFAO',poster: 'cover/default.png'};
playlist[10] = {src: 'songs/audio11.mp3',song: 'Hey Baby',artist: 'Pitbull',poster: 'cover/default.png'};
playlist[11] = {src: 'songs/audio12.mp3',song: 'Dynamite',artist: 'Taio Cruz',poster: 'cover/default.png'};
playlist[12] = {src: 'songs/audio13.mp3',song: 'Raabta',artist: 'Agent Vinod',poster: 'cover/default.png'};
playlist[13] = {src: 'songs/audio14.mp3',song: 'Maahiyan',artist: 'Vicky Donor',poster: 'cover/default.png'};*/



//songs/Boulevard Of Broken Dreams.mp3




							
							var plength = playlist.length;
							
							next.onclick = nexttrak;
							prev.onclick = prevtrak;
							
							
function nexttrak(event)
{  var p = eplayer.paused;
	ct = (ct+1)%plength;
	song.innerHTML = playlist[ct].song;
	artist.innerHTML = playlist[ct].artist;
    cover.setAttribute('src',playlist[ct].poster);
	eplayer.src = playlist[ct].src;
	eplayer.load();
	if(p)
	{
	pause();
	}
	else 
	play();
}

function prevtrak(event)
{  var p = eplayer.paused;
	ct = ((ct-1)==-1)?(plength-1):(ct-1);
	song.innerHTML = playlist[ct].song;
	artist.innerHTML = playlist[ct].artist;
    cover.setAttribute('src',playlist[ct].poster);
	eplayer.src = playlist[ct].src;
	eplayer.load();
	if(p)
	{
	pause();

	}
	else
	play();
}



/*var plitem = document.createElement('li');
var plitemsong = document.createElement('h3');
var plitemart = document.createElement('p').setAttribute('class','part');
var plsong = document.createTextNode(playlist[i].song);
var plart = document.createTextNode(playlist[i].artist); 
plitemsong.appendChild(plsong);
plitemart.appendChild(plart);
plitem.appendChild(plitemsong);
plitem.appendChild(plitemart);
document.body.plist.appendChild(plitem)*/
for(var i=1;i<plength;i++)
{
	var plitem = pl.cloneNode(false);
	plitem.setAttribute('trackid',i);
	plitem.innerHTML = ' <h3>'+playlist[i].song+'</h3> <p class="part">'+playlist[i].artist+'</p>';
plist.appendChild(plitem);
}

$('.pltrak').on('click',function(){
	ct = this.getAttribute('trackid')-1;
	nexttrak();
});


});


