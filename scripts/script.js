;

var normal;
var normalBig;
var startHTML;
var peque;
var loading;

function selectFile() {

    var pick = new MozActivity({
   name: "pick",
   data: {
       type: ["image/png", "image/jpg", "image/jpeg"]
    }
});

pick.onsuccess = function () { handleFiles(window.URL.createObjectURL(this.result.blob)); }


}


function handleFiles(file){
        startHTML = document.body.innerHTML;
        document.body.style.backgroundImage = "url('')";
        var canvas = document.getElementById("canvas");
        var canvasc = canvas.getContext('2d');
        var canvasBig = document.getElementById("canvasBig");
        var canvasBigc = canvasBig.getContext('2d');
        loading = document.getElementById('loading');
        var overcanvas = document.getElementById('overcanvas');
        var menu = document.getElementById("menu");
        var menu2 = document.getElementById('menubuttons');
        var image = new Image();

        image.src = file;
        image.onload = function () {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientWidth;
            loading.style.width = canvas.width + 'px';
            loading.style.height = canvas.height + 'px';
            overcanvas.width = canvas.width;
            overcanvas.height = canvas.height;
            canvasBig.width = image.height;
            canvasBig.height = image.height;
            heightsize = canvas.height / image.height;
            width2 = Math.round(Math.abs(heightsize * image.width - canvas.width) / 2);
            width2Big = Math.round(Math.abs(image.width - canvasBig.width) / 2);
            w = heightsize * image.width - canvas.width;
            document.body.style.backgroundImage = "url('../resources/back.jpg')";

            menu2.innerHTML = '<a href="javascript:void(0)" onclick="cancel()"><span class="icon icon-close">edit</span></a><a href="javascript:void(0)" onclick="save()">Done</a>';

            if (w < 0) {
                width2 *= -1;
                width2Big *= -1;
            }

            canvasc.translate(-width2, 0);
            canvasc.scale(heightsize, heightsize);

            canvasc.drawImage(image, 0, 0);

            canvasc.scale(1 / heightsize, 1 / heightsize);
            canvasc.translate(width2, 0);

            canvasBigc.translate(-width2Big, 0);
            canvasBigc.drawImage(image, 0, 0);
            canvasBigc.translate(width2Big, 0);

            string = "<div id='fContainer'>";
            string = string + "<div class='filters' onclick='setNormal()'><img src='resources/filters/noEffect.jpg' alt='No effect' /> <p>Normal</p></div>";
            string = string + "<div class='filters' onclick='setSepia()'><img src='resources/filters/sepia.jpg' alt='Sepia effect' /> <p>Sepia</p></div>";
            string = string + "<div class='filters' onclick='setGray()'><img src='resources/filters/grayscale.jpg' alt='B&W effect' /> <p>B&W</p></div>";
            string = string + "<div class='filters' onclick='setXflash()'><img src='resources/filters/xFlash.jpg' alt='xFlash effect' /> <p>xFlash</p></div>";
            string = string + "<div class='filters' onclick='setMyner()'><img src='resources/filters/myner.jpg' alt='Myner effect' /> <p>Myner</p></div>";
            string = string + "<div class='filters' onclick='setUrbahip()'><img src='resources/filters/urbahip.jpg' alt='Urbahip effect' /> <p>Urbahip</p></div>";
            string = string + "</div>"
            filters = document.getElementsByClassName('filters');
            menu.innerHTML = string;
            document.getElementById('fContainer').width = 6 * (filters[0].width);
            normal = canvasc.getImageData(0, 0, canvas.width, canvas.height);
            normalBig = canvasBigc.getImageData(0, 0, canvasBig.width, canvasBig.height);
        }

}



function setMyner(){
    loading.style.display = "inline";
    var canvas = document.getElementById("canvas");
    var canvasc = canvas.getContext('2d');
    w = new Worker("scripts/myner.js");
    
    w.addEventListener('message', function(e) {
        peque = e.data;
  }, false);
   w.postMessage({'img': normal});
   setMyner2();
}

function setMyner2(){
    var canvas = document.getElementById("canvasBig");
    var canvasc = canvas.getContext('2d');
    var canvas2 = document.getElementById("canvas");
    var canvasc2 = canvas2.getContext('2d');
    w = new Worker("scripts/myner.js");

    w.addEventListener('message', function (e) {
        imagendata = e.data;
        canvasc.putImageData(imagendata, 0, 0);
        canvasc2.putImageData(peque, 0, 0);
        loading.style.display = "none";
    }, false);
   w.postMessage({'img': normalBig});
}

function setNormal2(){
    var canvas = document.getElementById("canvasBig");
    var canvasc = canvas.getContext('2d');
        canvasc.putImageData(normalBig,0,0);
}

function setNormal(){
    var canvas = document.getElementById("canvas");
    var canvasc = canvas.getContext('2d');
        canvasc.putImageData(normal,0,0);
        setNormal2();
}

function setXflash(){
    loading.style.display = "inline";
    var canvas = document.getElementById("canvas");
    var canvasc = canvas.getContext('2d');
    w = new Worker("scripts/xflash.js");
    
    w.addEventListener('message', function(e) {
        peque = e.data;
  }, false);
   w.postMessage({'img': normal});
   setXflash2();
}


function setXflash2(){
    var canvas = document.getElementById("canvasBig");
    var canvasc = canvas.getContext('2d');
    var canvas2 = document.getElementById("canvas");
    var canvasc2 = canvas2.getContext('2d');
    w = new Worker("scripts/xflash.js");
    
    w.addEventListener('message', function(e) {
        imagendata = e.data;
        canvasc.putImageData(imagendata,0,0);
        canvasc2.putImageData(peque, 0, 0);
        loading.style.display = "none";
  }, false);
   w.postMessage({'img': normalBig});
}

function setSepia(){
    loading.style.display = "inline";
    var canvas = document.getElementById("canvas");
    var canvasc = canvas.getContext('2d');
    w = new Worker("scripts/sepia.js");

    w.addEventListener('message', function (e) {
        peque = e.data;
    }, false);
   w.postMessage({'img': normal});
   setSepia2();
}

function setSepia2(){
    var canvas = document.getElementById("canvasBig");
    var canvasc = canvas.getContext('2d');
    var canvas2 = document.getElementById("canvas");
    var canvasc2 = canvas2.getContext('2d');
    w = new Worker("scripts/sepia.js");

    w.addEventListener('message', function (e) {
        imagendata = e.data;
        canvasc.putImageData(imagendata, 0, 0);
        canvasc2.putImageData(peque, 0, 0);
        loading.style.display = "none";
    }, false);
   w.postMessage({'img': normalBig});
}

function setGray(){
    loading.style.display = "inline";
    var canvas = document.getElementById("canvas");
    var canvasc = canvas.getContext('2d');
    w = new Worker("scripts/gray.js");
    
    w.addEventListener('message', function(e) {
        peque = e.data;
  }, false);
   w.postMessage({'img': normal});
   setGray2();
}

function setGray2(){
    var canvas = document.getElementById("canvasBig");
    var canvasc = canvas.getContext('2d');
    var canvas2 = document.getElementById("canvas");
    var canvasc2 = canvas2.getContext('2d');
    w = new Worker("scripts/gray.js");
    
    w.addEventListener('message', function(e) {
        imagendata = e.data;
        canvasc.putImageData(imagendata,0,0);
        canvasc2.putImageData(peque, 0, 0);
        loading.style.display = "none";
  }, false);
   w.postMessage({'img': normalBig});
}

function setUrbahip(){
    loading.style.display = "inline";
    var canvas = document.getElementById("canvas");
    var canvasc = canvas.getContext('2d');
    w = new Worker("scripts/urbahip.js");
    
    w.addEventListener('message', function(e) {
        peque = e.data;
  }, false);
   w.postMessage({'img': normal});
   setUrbahip2();     
}

function setUrbahip2(){
    var canvas = document.getElementById("canvasBig");
    var canvasc = canvas.getContext('2d');
    var canvas2 = document.getElementById("canvas");
    var canvasc2 = canvas2.getContext('2d');
    w = new Worker("scripts/urbahip.js");
    
    w.addEventListener('message', function(e) {
        imagendata = e.data;
        canvasc.putImageData(imagendata,0,0);
        canvasc2.putImageData(peque, 0, 0);
        loading.style.display = "none";
  }, false);
   w.postMessage({'img': normalBig});
}

function save() {
    var canvas = document.getElementById("canvasBig");
    var canvasc = canvas.getContext('2d');
    var deviceStorage = navigator.getDeviceStorage('pictures');
    f = deviceStorage.enumerate("");
    
    var now = new Date();
    var name = now.getDate()+'-'+(now.getMonth()+1)+'-'+(now.getFullYear())+now.getHours()+'-'+now.getMinutes();
    var saved = deviceStorage.addNamed(dataURItoBlob(canvas.toDataURL()), name+'.png');
    saved.onsuccess = function(){
    console.log(f[0]);
    alert("You will find your photo in your SD card");
    cancel();
    
    }

     saved.onerror = function(){
        alert("Error guardando la foto");
    }
}

function cancel() {
    
    document.body.innerHTML = startHTML;
    document.body.style.backgroundImage = "url('/resources/back.png')";


}

function dataURItoBlob(dataURI, callback) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs

        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = unescape(dataURI.split(',')[1]);
        }

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        try {
        return new Blob([ab], {type: mimeString});
    } catch (e) {
        // The BlobBuilder API has been deprecated in favour of Blob, but older
        // browsers don't know about the Blob constructor
        // IE10 also supports BlobBuilder, but since the `Blob` constructor
        //  also works, there's no need to add `MSBlobBuilder`.
        var BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder;
        var bb = new BlobBuilder();
        bb.append(ab);
        return bb.getBlob(mimeString);
    }
    }