self.addEventListener('message', function (e) {
    var imagen = e.data.img.data;
   for(k=0;k<imagen.length;k+=4){
           if (imagen[k] < 123) { imagen[k] = 0; }
        else imagen[k] = imagen[k];

        if (imagen[k+1] < 123) { imagen[k+1] = 0; }
        else imagen[k+1] = imagen[k+1];

        if (imagen[k+2] < 123) { imagen[k+2] = 0; }
        else imagen[k+2] = imagen[k+2];
    }

    e.data.img.data = imagen;
    self.postMessage(e.data.img);
    self.close();
}, false);
