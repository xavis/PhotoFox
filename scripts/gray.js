
self.addEventListener('message', function (e) {
    var imagen = e.data.img.data;
    for (k = 0; k < imagen.length; k += 4) {
        
        var graytone = (imagen[k]+imagen[k+1]+imagen[k+2])/3;
        imagen[k] = graytone;
        imagen[k+1] = graytone;
        imagen[k+2] = graytone;

    }

    e.data.img.data = imagen;
    self.postMessage(e.data.img);
    self.close();
}, false);
